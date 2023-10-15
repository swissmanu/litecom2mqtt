import { Client } from "https://deno.land/x/mqtt@0.1.2/deno/mod.ts";
import { config } from "../config.ts";
import { Zone } from "../restClient/index.ts";
import { log } from "../util/logger.ts";

export abstract class AbstractEntity {
  get objectId(): string {
    return this.zone.id;
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
  abstract get litecomServiceType(): "lightning";

  constructor(
    private readonly mqttClient: Client,
    private readonly zone: Zone,
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

    const device = {
      name: this.zone.name,
      identifiers: uniqueId,
      sw_version: "0.0.1",
      manufacturer: "Zumtobel Lighting GmbH",
      configuration_url: `https://${config.LITECOM_HOST}`,
    };

    const topic =
      `${config.HOMEASSISTANT_MQTT_DISCOVERY_PREFIX}/${this.homeAssistantEntityType}/${uniqueId}/config`;

    const payload = {
      name: this.zone.name,
      uniq_id: uniqueId,
      object_id: uniqueId,
      device,
      ...this.homeAssistantCommandTopics,
      ...this.homeAssistantEntityConfig,
    };

    log.debug(`Announce Home Assistant device on topic "${topic}"`, {
      topic,
      payload,
    });
    return this.mqttClient.publish(
      topic,
      JSON.stringify(payload),
      { retain: false },
    );
  }
}
