import { getLogger, handlers, Logger as Log, setup } from "../deps.ts";
import { config } from "./config.ts";

export type Logger = Log;

setup({
  handlers: {
    console: new handlers.ConsoleHandler("DEBUG"),
  },
  loggers: {
    litecom2mqtt: {
      handlers: ["console"],
      level: config.LITECOM2MQTT_LOG_LEVEL,
    },
  },
});

export const log = getLogger("litecom2mqtt");
