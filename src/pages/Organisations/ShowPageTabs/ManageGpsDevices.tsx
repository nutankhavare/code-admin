import { useState, useEffect } from "react";
import { useParams, useSearchParams } from "react-router-dom";
import {
    FaCheckCircle,
    FaMicrochip,
    FaSearch,
} from "react-icons/fa";
import { useAlert } from "../../../Context/AlertContext";
import adminApi from "../../../Services/apiservice";
import EmptyState from "../../../Components/UI/EmptyState";
// Ensure you have a type for GpsDevice or use BeaconDevice if identical
import type { BeaconDevice as GpsDeviceType } from "../organisation.types";
import SaveButton from "../../../Components/Form/SaveButton";
import CancelButton from "../../../Components/Form/CancelButton";
import CirclularLoader from "../../../Components/UI/CircularLoader";

const ManageGpsDevices = () => {
    const { id } = useParams<{ id: string }>();
    const [searchParams] = useSearchParams();
    const orgType = searchParams.get('type') || 'office';
    const { showAlert } = useAlert();

    const [allDevices, setAllDevices] = useState<GpsDeviceType[]>([]);
    const [assignedDeviceIds, setAssignedDeviceIds] = useState<number[]>([]);


    const [searchTerm, setSearchTerm] = useState("");
    const [statusFilter, setStatusFilter] = useState("all");
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);

    useEffect(() => {
        fetchAssignedDevices();
    }, [id]);

    useEffect(() => {
        // When ID or filter changes, we might want to refresh, but usually 
        // we just filter client side for better UX unless data is huge.
        // For now, let's keep search triggering a fetch if that's your API design.
        fetchAllDevices();
    }, [searchTerm]);


    const fetchAllDevices = async () => {
        try {
            setLoading(true);
            const params = new URLSearchParams();
            if (searchTerm) params.append('search', searchTerm);

            const response = await adminApi.get(`all/gps/devices?${params.toString()}`);

            if (response.data.success) {
                setAllDevices(response.data.data);
            }
        } catch (error: any) {
            showAlert('Failed to fetch gps devices', 'error');
        } finally {
            setLoading(false);
        }
    };

    const fetchAssignedDevices = async () => {
        try {
            const response = await adminApi.get(`/Organisation/${id}/assined/gps/devices?type=${orgType}`);
            if (response.data.success) {
                const ids = response.data.data.map((device: GpsDeviceType) => device.id);
                setAssignedDeviceIds(ids);
            }
        } catch (error: any) {
            showAlert('Failed to fetch assigned devices', 'error');
        }
    };

    const getDisplayDevices = () => {
        let devices = [...allDevices];

        if (statusFilter && statusFilter !== 'all') {
            if (statusFilter === 'assigned') {
                devices = devices.filter(d => assignedDeviceIds.includes(d.id));
            } else if (statusFilter === 'available') {
                devices = devices.filter(d => d.status === 'available');
            } else if (statusFilter === 'maintenance') {
                devices = devices.filter(d => d.status === 'maintenance');
            }
        }

        // Ensure consistent sorting by sequence
        devices.sort((a, b) => (a.sequence_number || 0) - (b.sequence_number || 0));

        if (searchTerm) {
            const lowerTerm = searchTerm.toLowerCase();
            devices = devices.filter(device =>
                (device.serial_number?.toLowerCase() || '').includes(lowerTerm) ||
                (device.device_id?.toLowerCase() || '').includes(lowerTerm) ||
                (device.imei_number?.toLowerCase() || '').includes(lowerTerm)
            );
        }

        return devices;
    };

    const filteredDevices = getDisplayDevices();

    // ---------------------------------------------------------
    // CORE LOGIC: Handle Sequential Selection with Gaps
    // ---------------------------------------------------------
    const handleDeviceToggle = (deviceId: number, sequenceNumber: number) => {
        const currentlyAssigned = assignedDeviceIds.includes(deviceId);
        const device = allDevices.find(d => d.id === deviceId);

        if (!device) return;

        // 1. Maintenance Check
        if (device.status === 'maintenance') {
            showAlert('Cannot assign devices in maintenance', 'error');
            return;
        }

        // 2. Assigned to Others Check
        if (device.status === 'assigned' && !currentlyAssigned) {
            showAlert(`Device #${sequenceNumber} is assigned to another organization.`, 'error');
            return;
        }

        if (currentlyAssigned) {
            // DESELECTING ---------------------------------------------
            // Only allow from end of sequence
            const assignedSequences = assignedDeviceIds
                .map(id => allDevices.find(d => d.id === id)?.sequence_number || 0)
                .sort((a, b) => a - b);

            const maxSequence = assignedSequences[assignedSequences.length - 1];

            if (sequenceNumber !== maxSequence) {
                showAlert(`You can only deselect devices from the end of the sequence (#${maxSequence})`, 'error');
                return;
            }

            setAssignedDeviceIds(prev => prev.filter(id => id !== deviceId));
        } else {
            // SELECTING -----------------------------------------------

            // A. Strict Availability Check
            if (device.status !== 'available') {
                showAlert('This device is not available for assignment', 'error');
                return;
            }

            // B. Gap Check
            // Find any device that is AVAILABLE, NOT SELECTED, and LOWER SEQUENCE than current
            const skippedAvailable = allDevices.find(d =>
                d.status === 'available' &&
                !assignedDeviceIds.includes(d.id) &&
                d.sequence_number < sequenceNumber
            );

            if (skippedAvailable) {
                showAlert(`Sequential Error: You must select available device #${skippedAvailable.sequence_number} before selecting #${sequenceNumber}.`, 'error');
                return;
            }

            // If we passed checks, add it (even if we skipped "Assigned to Other" devices)
            setAssignedDeviceIds(prev => [...prev, deviceId]);
        }
    };

    const handleSave = async () => {
        if (assignedDeviceIds.length === 0) {
            showAlert('Please select at least one device', 'error');
            return;
        }

        try {
            setSaving(true);

            // 1. Map IDs to Device Identifiers (Strings)
            const selectedHardwareIds = assignedDeviceIds.map(id => {
                const dev = allDevices.find(d => d.id === id);
                return dev ? dev.device_id : null;
            }).filter(Boolean);

            // 2. Send payload
            const response = await adminApi.post(
                `/Organisation/${id}/assign/gps/devices`,
                {
                    device_identifiers: selectedHardwareIds, // Sending Strings
                    type: orgType
                }
            );

            if (response.data.success) {
                showAlert(`${response.data.count} GPS devices assigned successfully!`, 'success');

                // Refresh everything
                await fetchAssignedDevices();
                await fetchAllDevices();
            }
        } catch (error: any) {
            const errorMessage = error.response?.data?.message || 'Failed to assign devices';
            showAlert(errorMessage, 'error');
        } finally {
            setSaving(false);
        }
    };

    const clearFilters = () => {
        setSearchTerm("");
        setStatusFilter("all");
    };

    const selectedCount = assignedDeviceIds.length;

    return (
        <div className="min-h-screen bg-white">
            <div className="bg-white rounded-md shadow-sm border border-gray-100 p-4 mt-4">
                <div className="mx-auto space-y-4">
                    {/* Statistics Cards */}
                    {/* {statistics && (
                        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                            
                            <div className="bg-white border-2 border-indigo-200 p-5 rounded-lg shadow-sm">
                                <p className="text-xs text-slate-600 uppercase font-bold mb-1">Total</p>
                                <p className="text-3xl font-bold text-indigo-600">{statistics.total}</p>
                            </div>
                            <div className="bg-white border-2 border-green-200 p-5 rounded-lg shadow-sm">
                                <p className="text-xs text-slate-600 uppercase font-bold mb-1">Available</p>
                                <p className="text-3xl font-bold text-green-600">{statistics.available}</p>
                            </div>
                            <div className="bg-white border-2 border-blue-200 p-5 rounded-lg shadow-sm">
                                <p className="text-xs text-slate-600 uppercase font-bold mb-1">Assigned</p>
                                <p className="text-3xl font-bold text-blue-600">{statistics.assigned}</p>
                            </div>
                            <div className="bg-white border-2 border-violet-200 p-5 rounded-lg shadow-sm">
                                <p className="text-xs text-slate-600 uppercase font-bold mb-1">Next Available</p>
                                <p className="text-3xl font-bold text-violet-600">#{statistics.next_available_sequence}</p>
                            </div>
                        </div>
                    )} */}

                    {/* Search & Filter Toolbar */}
                    <div className="bg-gray-50 rounded-lg shadow-sm border border-slate-200 p-6">
                        <div className="flex flex-wrap items-center justify-between gap-4">

                            {/* Left Side: Inputs & Actions */}
                            <div className="flex flex-1 items-center gap-3">
                                {/* Search Input - Fixed width or flex-grow */}
                                <div className="relative w-full max-w-xs">
                                    <FaSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={14} />
                                    <input
                                        type="text"
                                        value={searchTerm}
                                        onChange={(e) => setSearchTerm(e.target.value)}
                                        placeholder="Search Serial, ID, IMEI..."
                                        className="w-full bg-white pl-9 pr-4 py-2 border border-slate-300 rounded-lg text-sm focus:outline-none focus:ring focus:ring-blue-500 focus:border-blue-500 transition-all shadow-sm"
                                    />
                                </div>

                                {/* Status Select */}
                                <div className="relative">
                                    <select
                                        value={statusFilter}
                                        onChange={(e) => setStatusFilter(e.target.value)}
                                        className="h-10 pl-3 pr-8 border border-slate-300 rounded-lg text-sm bg-white focus:outline-none focus:ring focus:ring-blue-500 cursor-pointer shadow-sm uppercase font-semibold text-slate-600"
                                    >
                                        <option value="all">All</option>
                                        <option value="available">Available</option>
                                        <option value="assigned">Assigned (Me)</option>
                                    </select>
                                </div>

                                {/* Clear Button */}
                                {(searchTerm || statusFilter !== 'all') && (
                                    <CancelButton
                                        onClick={clearFilters}
                                        className="bg-amber-100! hover:bg-amber-200! text-purple-950 border border-amber-200 h-10"
                                        label="Clear"
                                    />
                                )}
                            </div>

                            {/* Right Side: Selection Summary */}
                            {selectedCount > 0 && (
                                <div className="flex items-center gap-2 px-4 py-2 bg-green-100 border border-green-200 rounded-lg text-green-800 animate-fadeIn">
                                    <FaCheckCircle size={14} />
                                    <span className="text-xs font-bold uppercase whitespace-nowrap">
                                        {selectedCount} Selected
                                    </span>
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Grid */}
                    {loading ? (
                        <CirclularLoader />
                    ) : filteredDevices.length === 0 ? (
                        <EmptyState />
                    ) : (
                        <div className="bg-white rounded-lg shadow-sm border border-slate-200 overflow-hidden">
                            <div className="max-h-[70vh] overflow-y-auto p-4">
                                <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
                                    {filteredDevices.map((device) => {
                                        const isAssignedToMe = assignedDeviceIds.includes(device.id);
                                        const isAvailable = device.status === 'available';

                                        // Status checks for UI state
                                        const isAssignedToOther = device.status === 'assigned' && !isAssignedToMe;
                                        const isMaintenance = device.status === 'maintenance';

                                        // Interaction allowed?
                                        const isClickable = isAvailable || isAssignedToMe;

                                        return (
                                            <div
                                                key={device.id}
                                                onClick={() => isClickable && handleDeviceToggle(device.id, device.sequence_number)}
                                                className={`relative p-4 border-2 rounded-lg transition-all duration-200 ${isAssignedToMe
                                                    ? 'bg-blue-50 border-blue-400 cursor-pointer'
                                                    : isAvailable
                                                        ? 'bg-white border-slate-200 hover:border-blue-300 cursor-pointer'
                                                        : 'bg-gray-100 border-gray-200 opacity-60 cursor-not-allowed'
                                                    }`}
                                            >
                                                <div className="absolute top-2 left-2">
                                                    <span className="bg-slate-200 text-slate-700 px-2 py-1 rounded-full text-xs font-bold">
                                                        #{device.sequence_number}
                                                    </span>
                                                </div>

                                                {isClickable && (
                                                    <div className="absolute top-2 right-2">
                                                        <input
                                                            type="checkbox"
                                                            checked={isAssignedToMe}
                                                            readOnly
                                                            className="w-5 h-5 text-blue-600 rounded cursor-pointer"
                                                        />
                                                    </div>
                                                )}

                                                <div className="mt-8 space-y-2">
                                                    <div className="flex items-center gap-2">
                                                        <FaMicrochip className="text-indigo-500" />
                                                        <span className="font-bold text-xs uppercase">{device.serial_number}</span>
                                                    </div>
                                                    <p className="text-xs font-mono text-slate-500">{device.device_id}</p>
                                                    <p className="text-xs font-mono text-slate-500">{device.imei_number}</p>

                                                    <span className={`inline-block px-2 py-1 rounded text-[10px] font-bold uppercase ${isAssignedToMe ? 'bg-blue-100 text-blue-700' :
                                                        isAvailable ? 'bg-green-100 text-green-700' :
                                                            isMaintenance ? 'bg-amber-100 text-amber-700' :
                                                                'bg-gray-200 text-gray-600'
                                                        }`}>
                                                        {isAssignedToMe ? 'Assigned (You)' :
                                                            isAssignedToOther ? 'Assigned (Other)' :
                                                                device.status}
                                                    </span>
                                                </div>
                                            </div>
                                        );
                                    })}
                                </div>
                            </div>
                        </div>
                    )}

                    <div className="flex items-center justify-start">
                        <SaveButton onClick={handleSave} label={saving ? "Saving..." : "Save"} />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ManageGpsDevices;