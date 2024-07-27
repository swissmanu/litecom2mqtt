import { ExecutionQueue } from '../executionQueue';
import { NoopLogger } from './noopLogger';

class ImmediateExecution extends ExecutionQueue {
    constructor() {
        super(NoopLogger);
    }

    override queueExecution(fn: () => Promise<void>): void {
        fn();
    }
}

export const ImmediateExecutionQueue = new ImmediateExecution();
