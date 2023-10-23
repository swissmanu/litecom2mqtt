import { Logger } from '../logger';

class Noop implements Logger {
    critical() {}
    error() {}
    warning() {}
    info() {}
    debug() {}
}
export const NoopLogger = new Noop();
