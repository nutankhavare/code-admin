import React, { useState } from 'react';
import { ChevronLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import './Gps.css';

const AddGpsDevice: React.FC = () => {
    const navigate = useNavigate();

    const [form, setForm] = useState({
        deviceId: '',
        imei: '',
        model: '',
        organisation: '',
        assignedTo: '',
        lat: '',
        lng: '',
        speed: '',
        status: 'Stationary',
    });

    const [error, setError] = useState('');

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const handleChange = (e: any) => {
        setForm({ ...form, [e.target.name]: e.target.value });
        setError('');
    };

    const handleSave = () => {
        if (!form.deviceId || !form.imei || !form.model) {
            setError('Device ID, IMEI and Model are required');
            return;
        }

        // eslint-disable-next-line no-console
        console.log('GPS Device Added:', form);

        navigate('/masters/gps-devices');
    };

    const handleReset = () => {
        setForm({
            deviceId: '',
            imei: '',
            model: '',
            organisation: '',
            assignedTo: '',
            lat: '',
            lng: '',
            speed: '',
            status: 'Stationary',
        });
        setError('');
    };

    return (
        <div className="page-container">
            <div className="page-header-bar">
                <div className="breadcrumb-container">
                    <button
                        className="breadcrumb-link"
                        onClick={() => navigate('/masters/gps-devices')}
                    >
                        GPS Devices
                    </button>
                    <span className="breadcrumb-sep">›</span>
                    <span className="breadcrumb-current">Add New Device</span>
                </div>
                <button className="btn btn--back" onClick={() => navigate('/masters/gps-devices')}>
                    <ChevronLeft size={16} /> Back
                </button>
            </div>

            <div className="gd-form-wrapper">
                <div className="gd-form-card">
                    <div className="gd-form-header">
                        <span className="gd-form-icon">📍</span>
                        <span>ADD GPS DEVICE</span>
                    </div>

                    {/* DEVICE INFO */}
                    <div className="gd-section">
                        <div className="gd-section-title">
                            <span className="gd-section-icon" style={{ color: '#ef4444' }}>
                                📋
                            </span>
                            DEVICE INFORMATION
                        </div>

                        <div className="gd-section-body">
                            <div className="form-group">
                                <label className="form-label">
                                    DEVICE ID <span className="required-mark">*</span>
                                </label>
                                <input
                                    className="form-input"
                                    name="deviceId"
                                    value={form.deviceId}
                                    onChange={handleChange}
                                    placeholder="e.g. GPS-2001"
                                />
                            </div>

                            <div className="form-group">
                                <label className="form-label">
                                    IMEI <span className="required-mark">*</span>
                                </label>
                                <input
                                    className="form-input"
                                    name="imei"
                                    value={form.imei}
                                    onChange={handleChange}
                                    placeholder="15 digit IMEI"
                                />
                            </div>

                            <div className="form-group">
                                <label className="form-label">
                                    MODEL <span className="required-mark">*</span>
                                </label>
                                <input
                                    className="form-input"
                                    name="model"
                                    value={form.model}
                                    onChange={handleChange}
                                    placeholder="e.g. Teltonika FMB920"
                                />
                            </div>
                        </div>
                    </div>

                    {/* GPS DETAILS */}
                    <div className="gd-section">
                        <div className="gd-section-title">
                            <span className="gd-section-icon" style={{ color: '#f59e0b' }}>
                                ⚙️
                            </span>
                            GPS DETAILS
                        </div>

                        <div className="gd-section-body">
                            <div className="form-group">
                                <label className="form-label">ORGANISATION</label>
                                <input
                                    className="form-input"
                                    name="organisation"
                                    value={form.organisation}
                                    onChange={handleChange}
                                    placeholder="Organisation name"
                                />
                            </div>

                            <div className="form-group">
                                <label className="form-label">ASSIGNED TO</label>
                                <input
                                    className="form-input"
                                    name="assignedTo"
                                    value={form.assignedTo}
                                    onChange={handleChange}
                                    placeholder="Vehicle / Driver"
                                />
                            </div>

                            <div className="form-group">
                                <label className="form-label">LATITUDE</label>
                                <input
                                    className="form-input"
                                    name="lat"
                                    value={form.lat}
                                    onChange={handleChange}
                                    placeholder="12.9716"
                                />
                            </div>

                            <div className="form-group">
                                <label className="form-label">LONGITUDE</label>
                                <input
                                    className="form-input"
                                    name="lng"
                                    value={form.lng}
                                    onChange={handleChange}
                                    placeholder="77.5946"
                                />
                            </div>

                            <div className="form-group">
                                <label className="form-label">SPEED</label>
                                <input
                                    className="form-input"
                                    name="speed"
                                    value={form.speed}
                                    onChange={handleChange}
                                    placeholder="km/h"
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
                                    <option>Moving</option>
                                    <option>Stationary</option>
                                    <option>Offline</option>
                                </select>
                            </div>
                        </div>
                    </div>

                    {error && <div className="input-error-msg">{error}</div>}

                    {/* FOOTER */}
                    <div className="gd-form-footer">
                        <button
                            className="btn gd-cancel-btn"
                            onClick={() => navigate('/masters/gps-devices')}
                        >
                            ❌ CANCEL
                        </button>

                        <button className="btn btn--outline" onClick={handleReset}>
                            🔄 RESET
                        </button>

                        <button className="btn gd-save-btn" onClick={handleSave}>
                            💾 SAVE DEVICE
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AddGpsDevice;
