import { Logger } from './logger.js';

type QueueableFunction = () => Promise<void>;

export class ExecutionQueue {
    private queue: (() => void)[] = [];
    private running = false;

    constructor(
        private readonly log: Logger,
        private readonly delayInMilliseconds: number = 200,
    ) {}

    queueExecution(fn: QueueableFunction): void {
        this.log.debug(`Queue function for execution. Queue size: ${this.queue.length + 1}`);

        this.queue.push(async () => {
            try {
                await fn();
                await new Promise((resolve) => setTimeout(resolve, this.delayInMilliseconds));
            } catch (e) {
                this.log.error(`Queued function failed during execution: ${e}`, { error: JSON.stringify(e) });
            } finally {
                this.log.debug(`Function executed`);
                this.checkQueue();
            }
        });

        if (!this.running) {
            this.checkQueue();
        }
    }

    private checkQueue() {
        this.log.debug(`Checking Queue. Queue size ${this.queue.length}`);
        const fn = this.queue.shift();
        if (fn) {
            this.running = true;
            this.log.debug(`Execute function. Left in queue: ${this.queue.length}`);
            fn();
        } else {
            this.running = false;
        }
    }
}
