import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import './Beacon.css';

/* ── StaffCreate style helpers ────────────────────────── */
const SectionHeader = ({ icon, title }: { icon: string; title: string }) => (
    <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 24, paddingBottom: 12, borderBottom: '1.5px solid var(--border)' }}>
        <span className="material-symbols-outlined ms" style={{ color: 'var(--primary)', fontSize: 24 }}>{icon}</span>
        <span style={{ fontWeight: 900, fontSize: 13, letterSpacing: '0.02em', color: 'var(--text)' }}>{title}</span>
    </div>
);

const Card = ({ children }: { children: React.ReactNode }) => (
    <div className="card" style={{ marginBottom: 24, padding: 32, borderRadius: 16, border: '1.5px solid var(--border)', background: '#fff' }}>
        {children}
    </div>
);

const Body = ({ children, style }: { children: React.ReactNode; style?: React.CSSProperties }) => (
    <div style={{ padding: '0 8px', ...style }}>{children}</div>
);

const Grid = ({ cols, children, style }: { cols: string; children: React.ReactNode; style?: React.CSSProperties }) => (
    <div style={{ display: 'grid', gridTemplateColumns: cols, gap: '24px 32px', ...style }}>{children}</div>
);

const Label = ({ children }: { children: React.ReactNode }) => (
    <div className="form-label" style={{ marginBottom: 8, fontWeight: 700, fontSize: 11, color: 'var(--text-muted)' }}>{children}</div>
);

const ViewField = ({ label, value }: { label: string; value: string | React.ReactNode }) => (
    <div className="form-group">
        <Label>{label}</Label>
        <div style={{ fontWeight: 600, fontSize: 14, color: 'var(--text)', padding: '8px 0' }}>{value}</div>
    </div>
);

const ViewBeaconDevice: React.FC = () => {
    const navigate = useNavigate();
    const { id } = useParams();

    const device = {
        deviceId: `BCN-${id}`,
        name: `Beacon ${id}`,
        macAddress: 'AA:BB:CC:DD:EE:FF',
        organisation: 'TechCorp',
        battery: '80%',
        status: 'Online',
        description: 'Beacon device used for indoor tracking',
    };

    return (
        <div className="page-container">
            {/* ── HEADER & BREADCRUMBS ── */}
            <div className="page-header">
                <div>
                    <div className="page-title">
                        <span className="material-symbols-outlined ms" style={{ fontSize: 18 }}>
                            sensors
                        </span>
                        View Beacon Device
                    </div>
                    <div className="breadcrumb">
                        <span
                            style={{ cursor: 'pointer', color: 'var(--primary)', fontWeight: 700 }}
                            onClick={() => navigate('/masters/beacon-devices')}
                        >
                            BEACON DEVICES
                        </span>
                        <span>/</span> {device.deviceId.toUpperCase()}
                    </div>
                </div>
                <div style={{ display: 'flex', gap: 12 }}>
                    <button className="btn btn-secondary" onClick={() => navigate('/masters/beacon-devices')}>
                        <span className="material-symbols-outlined ms">arrow_back</span> BACK
                    </button>
                    <button className="btn btn-primary" onClick={() => navigate(`/masters/beacon-devices/edit/${id}`)}>
                        <span className="material-symbols-outlined ms">edit</span> EDIT DEVICE
                    </button>
                </div>
            </div>

            {/* ── PAGE BODY ── */}
            <div className="page-body">
                <div style={{ maxWidth: 860, width: '100%', margin: '0 auto', paddingBottom: 40 }}>

                    {/* ── DEVICE INFORMATION ── */}
                    <Card>
                        <SectionHeader icon="inventory" title="DEVICE INFORMATION" />
                        <Body>
                            <Grid cols="1fr 1fr 1fr">
                                <ViewField label="DEVICE ID" value={device.deviceId} />
                                <ViewField label="DEVICE NAME" value={device.name} />
                                <ViewField label="MAC ADDRESS" value={device.macAddress} />
                            </Grid>
                        </Body>
                    </Card>

                    {/* ── DEVICE DETAILS ── */}
                    <Card>
                        <SectionHeader icon="settings_suggest" title="DEVICE DETAILS" />
                        <Body>
                            <Grid cols="1fr 1fr">
                                <ViewField label="ORGANISATION" value={device.organisation} />
                                <ViewField label="BATTERY LEVEL" value={device.battery} />
                            </Grid>

                            <Grid cols="1fr" style={{ marginTop: 24 }}>
                                <ViewField
                                    label="CURRENT STATUS"
                                    value={
                                        <span style={{
                                            background: '#ECFDF5',
                                            color: '#059669',
                                            padding: '4px 12px',
                                            borderRadius: 20,
                                            fontSize: 12,
                                            fontWeight: 800,
                                            border: '1px solid #10B98133'
                                        }}>
                                            {device.status}
                                        </span>
                                    }
                                />

                                <div style={{ marginTop: 24 }}>
                                    <ViewField label="DESCRIPTION" value={device.description} />
                                </div>
                            </Grid>
                        </Body>
                    </Card>

                    {/* ── FOOTER ── */}
                    <div style={{ display: 'flex', justifyContent: 'flex-end', gap: 12 }}>
                        <button
                            className="btn btn-secondary"
                            onClick={() => navigate('/masters/beacon-devices')}
                        >
                            RETURN TO LIST
                        </button>
                        <button
                            className="btn btn-primary"
                            style={{ minWidth: 160 }}
                            onClick={() => navigate(`/masters/beacon-devices/edit/${id}`)}
                        >
                            <span className="material-symbols-outlined ms">edit</span> EDIT DETAILS
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ViewBeaconDevice;
