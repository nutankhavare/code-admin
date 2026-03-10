import React, { useState } from 'react';
import { useAlert } from '../Context/AlertContext';
import './Setting.css';

const SettingPage: React.FC = () => {
    const { showAlert } = useAlert();
    const [profile, setProfile] = useState({
        name: 'Admin User',
        email: 'admin@vanloka.com',
        phone: '+91 9876543210',
        timezone: 'Asia/Kolkata',
    });
    const [notifications, setNotifications] = useState({
        emailAlerts: true,
        smsAlerts: false,
        pushNotifs: true,
        weeklyReport: true,
    });

    const save = () => showAlert('success', 'Settings saved successfully', 'Saved');

    return (
        <div className="page-container">
            <div className="page-header-bar">
                <div className="breadcrumb-container">
                    <span className="breadcrumb-current">SETTINGS</span>
                </div>
            </div>

            <div className="settings-grid">
                <div className="card">
                    <h3 className="card-title" style={{ marginBottom: '1.5rem' }}>
                        Profile Settings
                    </h3>
                    <div className="settings-avatar">
                        <div className="avatar-circle">A</div>
                        <button className="btn btn--outline btn--sm">Change Photo</button>
                    </div>
                    <div className="form-group">
                        <label className="form-label">Full Name</label>
                        <input
                            className="form-input"
                            value={profile.name}
                            onChange={(e) => setProfile((p) => ({ ...p, name: e.target.value }))}
                        />
                    </div>
                    <div className="form-group">
                        <label className="form-label">Email</label>
                        <input
                            className="form-input"
                            type="email"
                            value={profile.email}
                            onChange={(e) => setProfile((p) => ({ ...p, email: e.target.value }))}
                        />
                    </div>
                    <div className="form-group">
                        <label className="form-label">Phone</label>
                        <input
                            className="form-input"
                            value={profile.phone}
                            onChange={(e) => setProfile((p) => ({ ...p, phone: e.target.value }))}
                        />
                    </div>
                    <div className="form-group">
                        <label className="form-label">Timezone</label>
                        <select
                            className="form-input"
                            value={profile.timezone}
                            onChange={(e) =>
                                setProfile((p) => ({ ...p, timezone: e.target.value }))
                            }
                        >
                            <option value="Asia/Kolkata">Asia/Kolkata (IST)</option>
                            <option value="UTC">UTC</option>
                            <option value="America/New_York">America/New_York</option>
                        </select>
                    </div>
                    <button className="btn btn--primary" onClick={save}>
                        Save Profile
                    </button>
                </div>

                <div>
                    <div className="card" style={{ marginBottom: '1.5rem' }}>
                        <h3 className="card-title" style={{ marginBottom: '1.5rem' }}>
                            Notification Preferences
                        </h3>
                        {Object.entries(notifications).map(([key, val]) => (
                            <div key={key} className="toggle-row">
                                <div>
                                    <div className="toggle-label">
                                        {key.replace(/([A-Z])/g, ' $1').trim()}
                                    </div>
                                </div>
                                <label className="toggle-check">
                                    <input
                                        type="checkbox"
                                        checked={val}
                                        onChange={() =>
                                            setNotifications((n) => ({ ...n, [key]: !val }))
                                        }
                                    />
                                    <span className="toggle-slider"></span>
                                </label>
                            </div>
                        ))}
                        <button
                            className="btn btn--primary"
                            style={{ marginTop: '1rem' }}
                            onClick={save}
                        >
                            Save Preferences
                        </button>
                    </div>

                    <div className="card">
                        <h3 className="card-title" style={{ marginBottom: '1.5rem' }}>
                            Security
                        </h3>
                        <div className="form-group">
                            <label className="form-label">Current Password</label>
                            <input className="form-input" type="password" placeholder="••••••••" />
                        </div>
                        <div className="form-group">
                            <label className="form-label">New Password</label>
                            <input className="form-input" type="password" placeholder="••••••••" />
                        </div>
                        <div className="form-group">
                            <label className="form-label">Confirm New Password</label>
                            <input className="form-input" type="password" placeholder="••••••••" />
                        </div>
                        <button
                            className="btn btn--primary"
                            onClick={() => showAlert('success', 'Password changed successfully')}
                        >
                            Change Password
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SettingPage;
