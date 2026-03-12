export interface Device {
    id: number
    name: string
    type: string
}

export interface Supplier {
    id: number
    name: string
    location: string
    devices: Device[]
}