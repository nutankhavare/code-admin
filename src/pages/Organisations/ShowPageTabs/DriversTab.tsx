import { useState, useEffect } from 'react';
import adminApi from '../../../Services/apiservice';
import { useAlert } from '../../../Context/AlertContext';
import EmptyState from '../../../Components/UI/EmptyState';
import { useSearchParams } from 'react-router-dom';
import CirclularLoader from '../../../Components/UI/CircularLoader';

interface DriversTabProps {
    organisationId: string | undefined;
}

const DriversTab = ({ organisationId }: DriversTabProps) => {
    const [drivers, setDrivers] = useState([]);
    const [loading, setLoading] = useState(true);
    const { showAlert } = useAlert();
    const [searchParams] = useSearchParams();
    const typeFromUrl = searchParams.get('type') as
        | 'office'
        | 'institution'
        | 'motor_driving_school'
        | null;

    useEffect(() => {
        const fetchDrivers = async () => {
            try {
                setLoading(true);
                const response = await adminApi.get(
                    `/Organisation/${organisationId}/drivers?type=${typeFromUrl}`
                );
                if (response.data.success) {
                    setDrivers(response.data.data);
                }
                // eslint-disable-next-line @typescript-eslint/no-explicit-any
            } catch (error: any) {
                showAlert(error.response?.data?.message || 'Failed to fetch drivers', 'error');
            } finally {
                setLoading(false);
            }
        };

        if (organisationId) {
            fetchDrivers();
        }
    }, [organisationId]);

    if (loading) {
        return <CirclularLoader />;
    }

    return (
        <div className="space-y-4">
            {drivers.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {/* Map through drivers and display them */}
                    <p className="text-gray-500">Driver list will be displayed here</p>
                </div>
            ) : (
                <EmptyState title="No Drivers Found..." />
            )}
        </div>
    );
};

export default DriversTab;
