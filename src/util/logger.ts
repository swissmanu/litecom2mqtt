import { z } from 'zod';
import { config } from './config.js';

type LogFn = (message: string, context?: Context) => void;
type LogHandler = (level: LogLevel, timestamp: number, message: string, context?: Context) => void;
type Context = Record<string, string | number | boolean | object>;

export interface Logger {
    critical: LogFn;
    error: LogFn;
    warning: LogFn;
    info: LogFn;
    debug: LogFn;
}

export enum LogLevel {
    CRITICAL = 1,
    ERROR,
    WARNING,
    INFO,
    DEBUG,
}

const LogLevelSchema = z
    .custom<'critical' | 'error' | 'warning' | 'info' | 'debug'>((x) => {
        if (typeof x === 'string') {
            switch (x.toLowerCase()) {
                case 'critical':
                case 'error':
                case 'warning':
                case 'info':
                case 'debug':
                    return true;
            }
        }
        return false;
    })
    .transform<LogLevel>((x) => {
        switch (x) {
            case 'critical':
                return LogLevel.CRITICAL;
            case 'error':
                return LogLevel.ERROR;
            case 'warning':
                return LogLevel.WARNING;
            case 'info':
                return LogLevel.INFO;
            case 'debug':
                return LogLevel.DEBUG;
        }
    });

export class Log implements Logger {
    constructor(
        private readonly level: LogLevel,
        private readonly handlers: ReadonlyArray<LogHandler> = [],
    ) {}

    log(level: LogLevel, message: string, context?: Context): void {
        const now = Date.now();
        if (level <= this.level) {
            for (const handler of this.handlers) {
                handler(level, now, message, context);
            }
        }
    }

    critical(message: string, context?: Context): void {
        this.log(LogLevel.CRITICAL, message, context);
    }
    error(message: string, context?: Context): void {
        this.log(LogLevel.ERROR, message, context);
    }
    warning(message: string, context?: Context): void {
        this.log(LogLevel.WARNING, message, context);
    }
    info(message: string, context?: Context): void {
        this.log(LogLevel.INFO, message, context);
    }
    debug(message: string, context?: Context): void {
        this.log(LogLevel.DEBUG, message, context);
    }
}

export const log = new Log(LogLevelSchema.parse(config.LITECOM2MQTT_LOG_LEVEL), [
    (_, timestamp, message) => console.log(timestamp, message),
]);
