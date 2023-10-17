import * as sinon from "https://cdn.skypack.dev/sinon";
import {
  assert,
  assertEquals,
} from "https://deno.land/std@0.204.0/assert/mod.ts";
import { getLogger } from "https://deno.land/std@0.204.0/log/mod.ts";
import { cleanupFakes } from "../util/testing/cleanupFakes.ts";
import { LightingServiceMQTTHandler } from "./lightingServiceMqttHandler.ts";

Deno.test("LightingServiceMQTTHandler", async (t) => {
  const zoneId = "47619c98-e8a1-469b-9068-15b23b54d980";
  const fakes = {
    putLightingServiceByZone: sinon.fake(),
    putLightingServiceByZoneAndDevice: sinon.fake(),
  };
  const handler = new LightingServiceMQTTHandler(
    {
      putLightingServiceByZone: fakes.putLightingServiceByZone,
      putLightingServiceByZoneAndDevice:
        fakes.putLightingServiceByZoneAndDevice,
    },
    getLogger("test"),
  );

  await t.step('handles "set" "ON" zone commands', async () => {
    await handler.handleZoneCommand(zoneId, {
      command: "set",
      payload: "ON",
    });

    assert(fakes.putLightingServiceByZone.calledOnce);
    assertEquals(fakes.putLightingServiceByZone.getCall(0).args, [
      zoneId,
      { intensity: 100 },
    ]);

    cleanupFakes(fakes);
  });
  await t.step('handles "set" "OFF" zone commands', async () => {
    await handler.handleZoneCommand(zoneId, {
      command: "set",
      payload: "OFF",
    });

    assert(fakes.putLightingServiceByZone.calledOnce);
    assertEquals(fakes.putLightingServiceByZone.getCall(0).args, [
      zoneId,
      { intensity: 0 },
    ]);

    cleanupFakes(fakes);
  });

  await t.step('handles "brightness" zone commands', async () => {
    await handler.handleZoneCommand(zoneId, {
      command: "brightness",
      payload: 42,
    });

    assert(fakes.putLightingServiceByZone.calledOnce);
    assertEquals(fakes.putLightingServiceByZone.getCall(0).args, [
      zoneId,
      { intensity: 42 },
    ]);

    cleanupFakes(fakes);
  });
});