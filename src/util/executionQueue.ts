import { Logger } from './logger';

type QueueableFunction = () => Promise<void>;

export class ExecutionQueue {
    private queue: (() => void)[] = [];

    constructor(
        private readonly log: Logger,
        private readonly delayInMilliseconds: number = 200,
    ) {}

    queueExecution(fn: QueueableFunction): void {
        this.log.debug(`Queue function for execution. Queue size: ${this.queue.length + 1}`);

        this.queue.push(() => {
            setTimeout(async () => {
                await fn();
                this.log.debug(`Function executed`);
                this.checkQueue();
            }, this.delayInMilliseconds);
        });

        if (this.queue.length === 1) {
            this.checkQueue();
        }
    }

    private checkQueue() {
        this.log.debug(`Checking Queue. Queue size ${this.queue.length}`);
        const fn = this.queue.shift();
        if (fn) {
            this.log.debug(`Execute function. Left in queue: ${this.queue.length}`);
            fn();
        }
    }
}
