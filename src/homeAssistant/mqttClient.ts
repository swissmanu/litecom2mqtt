import { Client } from "https://deno.land/x/mqtt@0.1.2/deno/mod.ts";
import { Config } from "../util/config.ts";
import { createAsyncDisposable } from "../util/createDisposable.ts";
import { log, Logger } from "../util/logger.ts";
import { LightingCommand, LightingServiceMQTTHandler } from "./lightingServiceMqttHandler.ts";

export class MqttClient {
  private client: Client | undefined = undefined;

  constructor(
    private readonly lightingHandler: LightingServiceMQTTHandler,
    private readonly log: Logger,
  ) {}

  async init(config: Config): Promise<AsyncDisposable> {
    const decoder = new TextDecoder();

    // PREFIX/ZONE_ID/devices/DEVICE_ID/SERVICE_TYPE/COMMAND_TOPIC
    const deviceTopicRegex = new RegExp(
      `^${config.LITECOM2MQTT_MQTT_TOPIC_PREFIX}\/(.*)\/devices\/(.*)\/(.*)\/(.*)$`,
    );

    // PREFIX/ZONE_ID/SERVICE_TYPE/COMMAND_TOPIC
    const zoneTopicRegex = new RegExp(
      `^${config.LITECOM2MQTT_MQTT_TOPIC_PREFIX}\/(.*)\/(.*)\/(.*)$`,
    );

    this.client = new Client({
      url: config.LITECOM2MQTT_MQTT_BROKER_URL,
    });
    await this.client.connect();

    this.client.on("message", (topic: string, payloadBuffer: BufferSource) => {
      const payload = decoder.decode(payloadBuffer);

      const match = topic.match(deviceTopicRegex);
      if (match) {
        const [, zoneId, deviceId, serviceType, command] = match;
        switch (serviceType) {
          case "lighting":
            this.lightingHandler.handleDeviceCommand(
              zoneId,
              deviceId,
              LightingCommand.parse({ command, payload }),
            );
            break;
          default:
            this.log.warning(
              `Cannot handle unknown serviceType "${serviceType}"`,
              {
                zoneId,
                deviceId,
                serviceType,
                command,
                payload,
              },
            );
        }
        return;
      }

      const match1 = topic.match(zoneTopicRegex);
      if (match1) {
        const [, zoneId, serviceType, command] = match1;
        switch (serviceType) {
          case "lighting":
            this.lightingHandler.handleZoneCommand(
              zoneId,
              LightingCommand.parse({
                command,
                payload,
              }),
            );
            break;
          default:
            this.log.warning(
              `Cannot handle unknown serviceType "${serviceType}"`,
              {
                zoneId,
                serviceType,
                command,
                payload,
              },
            );
        }
        return;
      }
    });

    return createAsyncDisposable(async () => {
      await this.client?.disconnect();
    });
  }

  async publish(
    topic: string,
    payload: BufferSource | string,
    options?: { retain?: boolean },
  ): Promise<void> {
    if (this.client) {
      await this.client.publish(topic, payload, options);
    } else {
      log.warning(
        "Mqtt client is not initialized. Call init() before publish().",
      );
    }
  }

  async subscribe(topic: string): Promise<AsyncDisposable> {
    if (this.client) {
      await this.client.subscribe(topic);
      return createAsyncDisposable(async () => {
        await this.client?.unsubscribe(topic);
      });
    }

    log.warning(
      "Mqtt client is not initialized. Call init() before subscribe().",
    );
    return createAsyncDisposable(() => Promise.resolve());
  }
}
