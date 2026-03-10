export type BeaconStatus = 'Online' | 'Offline' | 'Low Battery';

export interface BeaconDevice {
    id: number;
    deviceId: string;
    name: string;
    macAddress: string;
    organisation: string;
    lastSeen: string;
    battery: number;
    status: BeaconStatus;
}
