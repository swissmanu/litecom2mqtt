import { Client } from "https://deno.land/x/mqtt@0.1.2/deno/mod.ts";
import { Zone } from "../restClient/index.ts";
import { AbstractEntity } from "./abstractEntity.ts";

/**
 * @see https://www.home-assistant.io/integrations/light.mqtt/
 */
export class LightEntity extends AbstractEntity {
  constructor(
    mqttClient: Client,
    zone: Zone,
  ) {
    super(mqttClient, zone);
  }

  get homeAssistantEntityType(): "light" {
    return "light";
  }

  get litecomServiceType(): "lightning" {
    return "lightning";
  }

  get homeAssistantCommandTopics(): Record<string, string> {
    return {
      command_topic:
        `litecom2mqtt/zones/${this.objectId}/${this.litecomServiceType}/set`,
      brightness_command_topic:
        `litecom2mqtt/zones/${this.objectId}/${this.litecomServiceType}/brightness`,
    };
  }

  get homeAssistantEntityConfig(): Record<string, string | number | boolean> {
    return {
      brightness_scale: 100,
      on_command_type: "brightness",
    };
  }
}
