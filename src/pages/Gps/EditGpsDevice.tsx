import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import './Gps.css';
import ConfirmationModal from '../../Components/UI/ConfirmationModal';

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
        deviceDoc: null as File | null,
    });

    const [showUpdateConfirm, setShowUpdateConfirm] = useState(false);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleDoc = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            setForm((v) => ({ ...v, deviceDoc: file }));
        }
    };

    const handleSaveClick = () => {
        setShowUpdateConfirm(true);
    };

    const handleConfirmSave = () => {
        console.log('Updated GPS Device:', form);
        setShowUpdateConfirm(false);
        navigate('/masters/gps-devices');
    };

    return (
        <div className="page-container">
            {showUpdateConfirm && (
                <ConfirmationModal
                    title="Update GPS Device?"
                    message={`Are you sure you want to save the changes for ${form.deviceId}?`}
                    confirmLabel="Update"
                    onConfirm={handleConfirmSave}
                    onCancel={() => setShowUpdateConfirm(false)}
                    type="update"
                />
            )}

            <div className="page-header" style={{ maxWidth: 800, margin: '0 auto 20px auto', width: '100%' }}>
                <div>
                    <div className="page-title">
                        <span className="material-symbols-outlined ms" style={{ fontSize: 18 }}>location_on</span>
                        Edit GPS Device
                    </div>
                    <div className="breadcrumb">
                        <span style={{ cursor: 'pointer', color: 'var(--primary)', fontWeight: 700 }} onClick={() => navigate('/masters/gps-devices')}>GPS Management</span>
                        <span>/</span> Update GPS Device
                    </div>
                </div>
                <button className="btn btn-secondary" onClick={() => navigate('/masters/gps-devices')} style={{ flexShrink: 0 }}>
                    <span className="material-symbols-outlined ms">arrow_back</span> Back to List
                </button>
            </div>

            <div className="page-body">
                <div style={{ maxWidth: 800, width: '100%', margin: '0 auto', paddingBottom: 40 }}>
                    <form onSubmit={(e) => { e.preventDefault(); handleSaveClick(); }}>
                        {/* 1. Device Identification */}
                        <Card>
                            <SectionHeader icon="fingerprint" title="Device Identification" />
                            <Body>
                                <Grid cols="1fr 1fr">
                                    <div className="form-group">
                                        <Label>Device ID</Label>
                                        <input className="form-input" name="deviceId" value={form.deviceId} onChange={handleChange} />
                                    </div>
                                    <div className="form-group">
                                        <Label>IMEI Number</Label>
                                        <input className="form-input" name="imei" value={form.imei} onChange={handleChange} />
                                    </div>
                                </Grid>
                                <Grid cols="1fr 1fr" style={{ marginTop: 20 }}>
                                    <div className="form-group">
                                        <Label>Model Name</Label>
                                        <input className="form-input" name="model" value={form.model} onChange={handleChange} />
                                    </div>
                                    <div className="form-group">
                                        <Label>Organisation</Label>
                                        <input className="form-input" name="organisation" value={form.organisation} onChange={handleChange} />
                                    </div>
                                </Grid>
                            </Body>
                        </Card>

                        {/* 2. Assignment & Status */}
                        <Card>
                            <SectionHeader icon="assignment_ind" title="Assignment & Status" />
                            <Body>
                                <Grid cols="1fr 1fr">
                                    <div className="form-group">
                                        <Label>Assigned To (Vehicle)</Label>
                                        <input className="form-input" name="assignedTo" value={form.assignedTo} onChange={handleChange} />
                                    </div>
                                    <div className="form-group">
                                        <Label>Current Status</Label>
                                        <select className="form-input" name="status" value={form.status} onChange={handleChange}>
                                            <option>Moving</option>
                                            <option>Stationary</option>
                                            <option>Offline</option>
                                        </select>
                                    </div>
                                </Grid>
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

                        <div style={{ display: 'flex', justifyContent: 'flex-end', gap: 12 }}>
                            <button type="button" className="btn btn-secondary" onClick={() => navigate('/masters/gps-devices')}>CANCEL</button>
                            <button type="submit" className="btn btn-primary" style={{ minWidth: 160 }}>
                                <span className="material-symbols-outlined ms">save</span> UPDATE DEVICE
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default EditGpsDevice;
