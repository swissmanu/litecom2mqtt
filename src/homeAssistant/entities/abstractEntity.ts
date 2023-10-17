import { Device, Zone } from "../../litecom/restClient/index.ts";
import { config } from "../../util/config.ts";
import { log } from "../../util/logger.ts";
import { MqttClient } from "../mqttClient.ts";

export abstract class AbstractEntity {
  get objectId(): string {
    return AbstractEntity.createObjectId(this.device ?? this.zone);
  }

  get name(): string {
    return this.device?.name ?? this.zone.name;
  }

  get uniqueId(): string {
    return `${this.objectId}_${this.litecomServiceType}`;
  }

  abstract get homeAssistantEntityType(): "light";
  abstract get homeAssistantCommandTopics(): Record<string, string>;
  abstract get homeAssistantEntityConfig(): Record<
    string,
    string | number | boolean
  >;
  abstract get litecomServiceType(): "lighting";

  constructor(
    private readonly mqttClient: MqttClient,
    protected readonly zone: Zone,
    protected readonly device?: Device,
  ) {
    this.subscribe();
  }

  private subscribe() {
    for (const topic of Object.values(this.homeAssistantCommandTopics)) {
      log.debug(`Subscribe ${topic}`);
      this.mqttClient.subscribe(topic);
    }
  }

  public announce(): Promise<void> {
    const uniqueId = this.uniqueId;
    const name = this.name;

    const device = {
      name,
      identifiers: uniqueId,
      sw_version: "0.0.1",
      manufacturer: "Zumtobel Lighting GmbH",
      configuration_url: `https://${config.LITECOM_HOST}`,
      ...(this.device
        ? { via_device: AbstractEntity.createObjectId(this.zone) }
        : {}),
    };

    const topic =
      `${config.HOMEASSISTANT_MQTT_DISCOVERY_PREFIX}/${this.homeAssistantEntityType}/${uniqueId}/config`;

    const payload = {
      name,
      uniq_id: uniqueId,
      object_id: uniqueId,
      device,
      ...this.homeAssistantCommandTopics,
      ...this.homeAssistantEntityConfig,
    };

    log.debug(`Announce Home Assistant entity on topic "${topic}"`, {
      topic,
      payload,
    });
    return this.mqttClient.publish(
      topic,
      JSON.stringify(payload),
      { retain: false },
    );
  }

  static createObjectId(x: Zone | Device): string {
    return x.id;
  }
}
