import { ZoneWithoutAvailableServices } from "../../litecom/interrogateLitecomSystem.ts";
import { Device, Zone } from "../../litecom/restClient/index.ts";
import { config } from "../../util/config.ts";
import { log } from "../../util/logger.ts";
import { MqttClient } from "../mqttClient.ts";

export abstract class AbstractEntity {
  protected readonly name: string;

  constructor(
    private readonly mqttClient: MqttClient,
    protected readonly zone: Zone,
    parentZones: ReadonlyArray<ZoneWithoutAvailableServices>,
    protected readonly device?: Device,
  ) {
    const entityName = device?.name ?? zone.name;
    this.name = parentZones.length > 0
      ? `${parentZones.map(({ zone }) => zone.name).join("/")}/${entityName}`
      : entityName;

    this.subscribe();
  }

  get objectId(): string {
    return AbstractEntity.createObjectId(this.device ?? this.zone);
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
      configuration_url: `https://${config.LITECOM2MQTT_LITECOM_HOST}`,
      ...(this.device ? { via_device: AbstractEntity.createObjectId(this.zone) } : {}),
    };

    const topic =
      `${config.LITECOM2MQTT_HOMEASSISTANT_DISCOVERY_MQTT_TOPIC_PREFIX}/${this.homeAssistantEntityType}/${uniqueId}/config`;

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
