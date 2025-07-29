import { DeviceStateTopicInformation } from '../../litecom/stateMqttTopicFactory';

export interface DeviceStatePropagationStrategy {
    propagateDeviceState(deviceStateTopic: DeviceStateTopicInformation, payload: Buffer): Promise<void>;
}
