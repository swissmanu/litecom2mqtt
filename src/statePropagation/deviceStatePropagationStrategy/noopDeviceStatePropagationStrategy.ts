import { DeviceStatePropagationStrategy } from './deviceStatePropagationStrategy';

export class NoopDeviceStatePropagationStrategy implements DeviceStatePropagationStrategy {
    propagateDeviceState(): Promise<void> {
        return Promise.resolve();
    }
}
