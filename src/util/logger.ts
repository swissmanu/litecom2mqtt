import {
  getLogger,
  handlers,
  setup,
} from "https://deno.land/std@0.204.0/log/mod.ts";
import { config } from "../config.ts";

setup({
  handlers: {
    console: new handlers.ConsoleHandler("DEBUG"),
  },
  loggers: {
    litecom2mqtt: {
      handlers: ["console"],
      level: config.LOG_LEVEL,
    },
  },
});

export const log = getLogger("litecom2mqtt");
