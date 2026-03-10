export interface GpsDevice {
  id: number;
  deviceId: string;
  imei: string;
  model: string;
  organisation: string;
  assignedTo: string;
  lat: string;
  lng: string;
  speed: number;
  status: "Moving" | "Stationary" | "Offline";
  lastUpdate: string;
}
