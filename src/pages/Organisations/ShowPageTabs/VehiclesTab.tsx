import { useState, useEffect } from 'react';
import adminApi from '../../../Services/apiservice';
import { useAlert } from '../../../Context/AlertContext';
import EmptyState from '../../../Components/UI/EmptyState';
import { useSearchParams } from 'react-router-dom';
import CirclularLoader from '../../../Components/UI/CircularLoader';

interface VehiclesTabProps {
    organisationId: string | undefined;
}

const VehiclesTab = ({ organisationId }: VehiclesTabProps) => {
    const [vehicles, setVehicles] = useState([]);
    const [loading, setLoading] = useState(true);
    const { showAlert } = useAlert();
    const [searchParams] = useSearchParams();
    const typeFromUrl = searchParams.get('type') as
        | 'office'
        | 'institution'
        | 'motor_driving_school'
        | null;

    useEffect(() => {
        const fetchVehicles = async () => {
            try {
                setLoading(true);
                const response = await adminApi.get(
                    `/Organisation/${organisationId}/vehicles?type=${typeFromUrl}`
                );
                if (response.data.success) {
                    setVehicles(response.data.data);
                }
                // eslint-disable-next-line @typescript-eslint/no-explicit-any
            } catch (error: any) {
                showAlert(error.response?.data?.message || 'Failed to fetch vehicles', 'error');
            } finally {
                setLoading(false);
            }
        };

        if (organisationId) {
            fetchVehicles();
        }
    }, [organisationId]);

    if (loading) {
        return <CirclularLoader />;
    }

    return (
        <div className="space-y-4">
            {vehicles.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {/* Map through vehicles and display them */}
                    <p className="text-gray-500">Vehicle list will be displayed here</p>
                </div>
            ) : (
                <EmptyState />
            )}
        </div>
    );
};

export default VehiclesTab;
