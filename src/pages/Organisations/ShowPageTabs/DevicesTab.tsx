import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import adminApi from "../../../Services/apiservice";
import { useAlert } from "../../../Context/AlertContext";
import { formatDate } from "../../../Utils/Toolkit";
import EmptyState from "../../../Components/UI/EmptyState";
import CirclularLoader from "../../../Components/UI/CircularLoader";

interface DevicesTabProps {
  organisationId: string | undefined;
}

interface Device {
  id: number;
  device_type: string;
  device_id: string;
  imei_number?: string;
  serial_number: string;
  sim_number?: string;
  assigned_to?: string;
  assigned_vehicle?: string;
  status: string;
  installation_date?: string;
  last_maintenance?: string;
  created_at: string;
}

const DevicesTab = ({ organisationId }: DevicesTabProps) => {
  const [searchParams] = useSearchParams();
  const typeFromUrl = searchParams.get('type') as 'office' | 'institution' | 'motor_driving_school' | null;

  const [devices, setDevices] = useState<Device[]>([]);
  const [loading, setLoading] = useState(true);
  const { showAlert } = useAlert();

  useEffect(() => {
    const fetchDevices = async () => {
      if (!organisationId || !typeFromUrl) {
        showAlert("Organisation ID and type are required", "error");
        return;
      }

      try {
        setLoading(true);
        const response = await adminApi.get(
          `/Organisation/${organisationId}/devices?type=${typeFromUrl}`
        );

        if (response.data.success) {
          setDevices(response.data.data);
        }
      } catch (error: any) {
        console.error('Fetch devices error:', error);
        showAlert(
          error.response?.data?.message || "Failed to fetch devices",
          "error"
        );
      } finally {
        setLoading(false);
      }
    };

    fetchDevices();
  }, [organisationId, typeFromUrl]);

  if (loading) {
    return (
      <CirclularLoader />
    );
  }

  return (
    <div className="space-y-4">
      <div className="flex justify-end items-center mt-2">

        <button
          onClick={() => window.location.href = `/Organisation/${organisationId}/devices/create?type=${typeFromUrl}`}
          className="p-1 bg-green-600 text-white text-sm rounded-md hover:bg-green-700 uppercase font-semibold"
        >
          Add Device
        </button>
      </div>

      {devices.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {devices.map((device) => (
            <div
              key={device.id}
              className="p-4 bg-white border border-gray-200 rounded-lg hover:shadow-md transition-shadow"
            >
              <div className="flex justify-between items-start mb-3">
                <div>
                  <h4 className="font-bold text-gray-800 uppercase text-sm">{device.device_type}</h4>
                  <p className="text-xs text-gray-500">{device.device_id}</p>
                </div>
                <span className={`inline-block px-2 py-1 text-xs font-semibold rounded ${device.status === 'active'
                  ? 'bg-green-100 text-green-800'
                  : device.status === 'inactive'
                    ? 'bg-gray-100 text-gray-800'
                    : 'bg-yellow-100 text-yellow-800'
                  }`}>
                  {device.status}
                </span>
              </div>

              <div className="space-y-2">
                {device.imei_number && (
                  <div>
                    <p className="text-xs text-gray-500 uppercase">IMEI</p>
                    <p className="text-sm font-medium text-gray-800">{device.imei_number}</p>
                  </div>
                )}
                <div>
                  <p className="text-xs text-gray-500 uppercase">Serial Number</p>
                  <p className="text-sm font-medium text-gray-800">{device.serial_number}</p>
                </div>
                {device.sim_number && (
                  <div>
                    <p className="text-xs text-gray-500 uppercase">SIM Number</p>
                    <p className="text-sm font-medium text-gray-800">{device.sim_number}</p>
                  </div>
                )}
                {device.assigned_vehicle && (
                  <div>
                    <p className="text-xs text-gray-500 uppercase">Assigned Vehicle</p>
                    <p className="text-sm font-medium text-gray-800">{device.assigned_vehicle}</p>
                  </div>
                )}
                {device.installation_date && (
                  <div>
                    <p className="text-xs text-gray-500 uppercase">Installation Date</p>
                    <p className="text-sm font-medium text-gray-800">{formatDate(device.installation_date)}</p>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      ) : (

        <EmptyState
        />
      )}
    </div>
  );
};

export default DevicesTab;
