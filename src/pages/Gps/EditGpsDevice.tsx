import React, { useState } from 'react';
import { ChevronLeft } from 'lucide-react';
import { useNavigate, useParams } from 'react-router-dom';
import './Gps.css';

const EditGpsDevice: React.FC = () => {
    const navigate = useNavigate();
    const { id } = useParams();

    const [form, setForm] = useState({
        deviceId: `GPS-${id}`,
        imei: '352094081234567',
        model: 'Teltonika FMB920',
        organisation: 'TechCorp',
        assignedTo: 'Vehicle 1',
        lat: '12.9716',
        lng: '77.5946',
        speed: '0',
        status: 'Stationary',
    });

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const handleChange = (e: any) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSave = () => {
        // eslint-disable-next-line no-console
        console.log('Updated GPS Device:', form);
        navigate('/masters/gps-devices');
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
                    <span className="breadcrumb-current">Edit: {form.deviceId}</span>
                </div>
                <button className="btn btn--back" onClick={() => navigate('/masters/gps-devices')}>
                    <ChevronLeft size={16} /> Back
                </button>
            </div>

            <div className="gd-form-wrapper">
                <div className="gd-form-card">
                    <div className="gd-form-header">
                        <span className="gd-form-icon">✏️</span>
                        <span>EDIT GPS DEVICE</span>
                    </div>

                    <div className="gd-section">
                        <div className="gd-section-body">
                            <div className="form-group">
                                <label className="form-label">DEVICE ID</label>
                                <input
                                    className="form-input"
                                    name="deviceId"
                                    value={form.deviceId}
                                    onChange={handleChange}
                                />
                            </div>

                            <div className="form-group">
                                <label className="form-label">IMEI</label>
                                <input
                                    className="form-input"
                                    name="imei"
                                    value={form.imei}
                                    onChange={handleChange}
                                />
                            </div>

                            <div className="form-group">
                                <label className="form-label">MODEL</label>
                                <input
                                    className="form-input"
                                    name="model"
                                    value={form.model}
                                    onChange={handleChange}
                                />
                            </div>

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
                                <label className="form-label">ASSIGNED TO</label>
                                <input
                                    className="form-input"
                                    name="assignedTo"
                                    value={form.assignedTo}
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
                                    <option>Moving</option>
                                    <option>Stationary</option>
                                    <option>Offline</option>
                                </select>
                            </div>
                        </div>
                    </div>

                    <div className="gd-form-footer">
                        <button
                            className="btn btn--outline"
                            onClick={() => navigate('/masters/gps-devices')}
                        >
                            Cancel
                        </button>

                        <button className="btn gd-save-btn" onClick={handleSave}>
                            💾 SAVE
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default EditGpsDevice;
