import { Client } from "https://deno.land/x/mqtt@0.1.2/deno/mod.ts";
import { config } from "../config.ts";
import { Zone } from "../restClient/index.ts";

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

    return this.mqttClient.publish(
      `${config.HOMEASSISTANT_MQTT_DISCOVERY_PREFIX}/${this.homeAssistantEntityType}/${uniqueId}/config`,
      JSON.stringify({
        name: this.zone.name,
        uniq_id: uniqueId,
        object_id: uniqueId,
        device,
        ...this.homeAssistantCommandTopics,
        ...this.homeAssistantEntityConfig,
      }),
      { retain: false },
    );
  }
}
