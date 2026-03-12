import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Beacon.css';

/* ── StaffCreate style helpers ────────────────────────── */
const SectionHeader = ({ icon, title }: { icon: string; title: string }) => (
    <div style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '12px 20px', borderBottom: '1.5px solid var(--border)', background: 'var(--surface)' }}>
        <span className="material-symbols-outlined" style={{ fontSize: 18, color: 'var(--primary)' }}>{icon}</span>
        <span style={{ fontSize: 11, fontWeight: 900, letterSpacing: '.07em', textTransform: 'uppercase' }}>{title}</span>
    </div>
);

const Card = ({ children }: { children: React.ReactNode }) => (
    <div style={{ background: 'white', border: '1.5px solid var(--border)', borderRadius: 12, marginBottom: 20, overflow: 'hidden' }}>
        {children}
    </div>
);

const Body = ({ children, style }: { children: React.ReactNode; style?: React.CSSProperties }) => (
    <div style={{ padding: '20px 22px', ...style }}>{children}</div>
);

const Grid = ({ cols, children, style }: { cols: string; children: React.ReactNode; style?: React.CSSProperties }) => (
    <div style={{ display: 'grid', gridTemplateColumns: cols, gap: 16, ...style }}>{children}</div>
);

const Label = ({ children }: { children: React.ReactNode }) => (
    <label style={{ display: 'block', fontSize: 10, fontWeight: 800, textTransform: 'uppercase', letterSpacing: '.06em', color: '#64748B', marginBottom: 5 }}>
        {children}
    </label>
);

const AddBeaconDevice: React.FC = () => {
    const navigate = useNavigate();

    const [form, setForm] = useState<{
        deviceId: string;
        name: string;
        macAddress: string;
        organisation: string;
        battery: string;
        status: string;
        description: string;
        deviceDoc: File | null;
    }>({
        deviceId: '',
        name: '',
        macAddress: '',
        organisation: '',
        battery: '',
        status: 'Online',
        description: '',
        deviceDoc: null,
    });

    const [error, setError] = useState('');

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
        setForm({ ...form, [e.target.name]: e.target.value });
        setError('');
    };

    const handleDoc = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            setForm((v) => ({ ...v, deviceDoc: file }));
        }
    };

    const handleSave = (e: React.FormEvent) => {
        e.preventDefault();
        if (!form.deviceId || !form.name || !form.macAddress) {
            setError('Device ID, Name and MAC Address are required');
            return;
        }
        console.log('Beacon Device Added:', form);
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
            deviceDoc: null,
        });
        setError('');
    };

    return (
        <div className="page-container">
            <div className="page-header" style={{ maxWidth: 800, margin: '0 auto 20px auto', width: '100%' }}>
                <div>
                    <div className="page-title">
                        <span className="material-symbols-outlined ms" style={{ fontSize: 18 }}>sensors</span>
                        Add New Beacon Device
                    </div>
                    <div className="breadcrumb">
                        <span style={{ cursor: 'pointer', color: 'var(--primary)', fontWeight: 700 }} onClick={() => navigate('/masters/beacon-devices')}>Beacon Management</span>
                        <span>/</span> Add New Device
                    </div>
                </div>
                <button className="btn btn-secondary" onClick={() => navigate('/masters/beacon-devices')} style={{ flexShrink: 0 }}>
                    <span className="material-symbols-outlined ms">arrow_back</span> Back to List
                </button>
            </div>

            <div className="page-body">
                <div style={{ maxWidth: 800, width: '100%', margin: '0 auto', paddingBottom: 40 }}>
                    <form onSubmit={handleSave}>
                        {/* 1. Device Information */}
                        <Card>
                            <SectionHeader icon="inventory" title="Device Information" />
                            <Body>
                                <Grid cols="repeat(3, 1fr)">
                                    <div className="form-group">
                                        <Label>Device ID *</Label>
                                        <input className="form-input" name="deviceId" value={form.deviceId} onChange={handleChange} placeholder="e.g. BCN-1001" required />
                                    </div>
                                    <div className="form-group">
                                        <Label>Device Name *</Label>
                                        <input className="form-input" name="name" value={form.name} onChange={handleChange} placeholder="e.g. Beacon 1" required />
                                    </div>
                                    <div className="form-group">
                                        <Label>MAC Address *</Label>
                                        <input className="form-input" name="macAddress" value={form.macAddress} onChange={handleChange} placeholder="AA:BB:CC:DD:EE:FF" required />
                                    </div>
                                </Grid>
                            </Body>
                        </Card>

                        {/* 2. Device Details */}
                        <Card>
                            <SectionHeader icon="settings_suggest" title="Device Details" />
                            <Body>
                                <Grid cols="repeat(2, 1fr)">
                                    <div className="form-group">
                                        <Label>Organisation</Label>
                                        <input className="form-input" name="organisation" value={form.organisation} onChange={handleChange} placeholder="Assign to Organisation" />
                                    </div>
                                    <div className="form-group">
                                        <Label>Battery Level (%)</Label>
                                        <input className="form-input" type="number" name="battery" value={form.battery} onChange={handleChange} placeholder="100" />
                                    </div>
                                </Grid>
                                <div className="form-group" style={{ marginTop: 20 }}>
                                    <Label>Current Status</Label>
                                    <select className="form-input" name="status" value={form.status} onChange={handleChange} style={{ maxWidth: 280 }}>
                                        <option>Online</option>
                                        <option>Offline</option>
                                        <option>Low Battery</option>
                                    </select>
                                </div>
                                <div className="form-group" style={{ marginTop: 20 }}>
                                    <Label>Description</Label>
                                    <textarea className="form-input" name="description" rows={3} value={form.description} onChange={handleChange} placeholder="Additional notes about the device..." />
                                </div>
                            </Body>
                        </Card>

                        {/* 3. Documents */}
                        <Card>
                            <SectionHeader icon="folder_open" title="Documents" />
                            <Body>
                                <div style={{ maxWidth: 300 }}>
                                    <Label>Installation Proof / Invoice</Label>
                                    <label style={{
                                        display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: 96, borderRadius: 10, border: '2px dashed var(--border)', background: form.deviceDoc ? '#F5F3FF' : 'var(--surface)', cursor: 'pointer', gap: 6, borderColor: form.deviceDoc ? 'var(--primary)' : undefined
                                    }}>
                                        <span className="material-symbols-outlined" style={{ fontSize: 26, color: form.deviceDoc ? 'var(--primary)' : '#CBD5E1' }}>cloud_upload</span>
                                        <span style={{ fontSize: 10, fontWeight: 700, color: form.deviceDoc ? 'var(--primary)' : '#94A3B8', textAlign: 'center', padding: '0 8px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', width: '100%' }}>
                                            {form.deviceDoc ? form.deviceDoc.name : 'Click to Upload Document'}
                                        </span>
                                        <input type="file" style={{ display: 'none' }} onChange={handleDoc} accept=".pdf,.jpg,.jpeg,.png" />
                                    </label>
                                </div>
                            </Body>
                        </Card>

                        {error && (
                            <div style={{ color: '#DC2626', background: '#FEF2F2', padding: '12px 16px', borderRadius: 10, fontSize: 12, fontWeight: 700, marginBottom: 20 }}>⚠ {error}</div>
                        )}

                        <div style={{ display: 'flex', justifyContent: 'flex-end', gap: 12 }}>
                            <button type="button" className="btn btn-secondary" onClick={handleReset} style={{ border: '1.5px solid var(--border)' }}>
                                <span className="material-symbols-outlined ms">restart_alt</span> RESET
                            </button>
                            <button type="submit" className="btn btn-primary" style={{ minWidth: 140 }}>
                                <span className="material-symbols-outlined ms">save</span> SAVE DEVICE
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default AddBeaconDevice;
