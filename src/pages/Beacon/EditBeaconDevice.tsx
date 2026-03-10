import React, { useState } from 'react';
import { ChevronLeft } from 'lucide-react';
import { useNavigate, useParams } from 'react-router-dom';
import './Beacon.css';

const EditBeaconDevice: React.FC = () => {
    const navigate = useNavigate();
    const { id } = useParams();

    const [form, setForm] = useState({
        deviceId: `BCN-${id}`,
        name: `Beacon ${id}`,
        macAddress: 'AA:BB:CC:DD:EE:FF',
        organisation: 'TechCorp',
        battery: '80',
        status: 'Online',
        description: 'Beacon device used for indoor tracking',
    });

    const [error, setError] = useState('');

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const handleChange = (e: any) => {
        setForm({ ...form, [e.target.name]: e.target.value });
        setError('');
    };

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const handleSave = (e: any) => {
        e.preventDefault();

        if (!form.deviceId || !form.name || !form.macAddress) {
            setError('Device ID, Name and MAC Address are required');
            return;
        }

        // eslint-disable-next-line no-console
        console.log('Beacon Device Updated:', form);

        navigate('/masters/beacon-devices');
    };

    const handleReset = () => {
        setForm({
            deviceId: '',
            name: '',
            macAddress: '',
            organisation: '',
            battery: '',
            status: 'Online',
            description: '',
        });
        setError('');
    };

    return (
        <div className="page-container">
            <div className="page-header-bar">
                <div className="breadcrumb-container">
                    <button
                        className="breadcrumb-link"
                        onClick={() => navigate('/masters/beacon-devices')}
                    >
                        Beacon Devices
                    </button>
                    <span className="breadcrumb-sep">›</span>
                    <span className="breadcrumb-current">Edit: {form.deviceId}</span>
                </div>
                <button
                    className="btn btn--back"
                    onClick={() => navigate('/masters/beacon-devices')}
                >
                    <ChevronLeft size={16} /> Back
                </button>
            </div>

            <div className="bd-form-wrapper">
                <div className="bd-form-card">
                    <div className="bd-form-header">
                        <span className="bd-form-icon">✏️</span>
                        <span>EDIT BEACON DEVICE</span>
                    </div>

                    <form onSubmit={handleSave}>
                        {/* DEVICE INFORMATION */}
                        <div className="bd-section">
                            <div className="bd-section-title">
                                <span className="bd-section-icon" style={{ color: '#ef4444' }}>
                                    📋
                                </span>
                                DEVICE INFORMATION
                            </div>

                            <div className="bd-section-body">
                                <div className="form-group">
                                    <label className="form-label">
                                        DEVICE ID <span style={{ color: '#ef4444' }}>*</span>
                                    </label>
                                    <input
                                        className={`form-input ${error ? 'input-error' : ''}`}
                                        name="deviceId"
                                        value={form.deviceId}
                                        onChange={handleChange}
                                    />
                                </div>

                                <div className="form-group">
                                    <label className="form-label">
                                        DEVICE NAME <span style={{ color: '#ef4444' }}>*</span>
                                    </label>
                                    <input
                                        className="form-input"
                                        name="name"
                                        value={form.name}
                                        onChange={handleChange}
                                    />
                                </div>

                                <div className="form-group">
                                    <label className="form-label">
                                        MAC ADDRESS <span style={{ color: '#ef4444' }}>*</span>
                                    </label>
                                    <input
                                        className="form-input"
                                        name="macAddress"
                                        value={form.macAddress}
                                        onChange={handleChange}
                                    />
                                </div>
                            </div>
                        </div>

                        {/* DEVICE DETAILS */}
                        <div className="bd-section">
                            <div className="bd-section-title">
                                <span className="bd-section-icon" style={{ color: '#f59e0b' }}>
                                    ⚙️
                                </span>
                                DEVICE DETAILS
                            </div>

                            <div className="bd-section-body">
                                <div className="form-group">
                                    <label className="form-label">ORGANISATION</label>
                                    <input
                                        className="form-input"
                                        name="organisation"
                                        value={form.organisation}
                                        onChange={handleChange}
                                    />
                                </div>

                                <div className="form-group">
                                    <label className="form-label">BATTERY LEVEL (%)</label>
                                    <input
                                        className="form-input"
                                        type="number"
                                        name="battery"
                                        value={form.battery}
                                        onChange={handleChange}
                                    />
                                </div>

                                <div className="form-group">
                                    <label className="form-label">STATUS</label>
                                    <select
                                        className="form-input"
                                        name="status"
                                        value={form.status}
                                        onChange={handleChange}
                                    >
                                        <option>Online</option>
                                        <option>Offline</option>
                                        <option>Low Battery</option>
                                    </select>
                                </div>

                                <div className="form-group">
                                    <label className="form-label">DESCRIPTION</label>
                                    <textarea
                                        className="form-input"
                                        name="description"
                                        rows={3}
                                        value={form.description}
                                        onChange={handleChange}
                                    />
                                </div>
                            </div>
                        </div>

                        {error && <div className="input-error-msg">{error}</div>}

                        {/* FOOTER */}
                        <div className="bd-form-footer">
                            <button
                                type="button"
                                className="btn bd-cancel-btn"
                                onClick={() => navigate('/masters/beacon-devices')}
                            >
                                ❌ CANCEL
                            </button>

                            <button
                                type="button"
                                className="btn btn--outline"
                                onClick={handleReset}
                            >
                                🔄 RESET
                            </button>

                            <button type="submit" className="btn bd-save-btn">
                                💾 UPDATE DEVICE
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default EditBeaconDevice;
