import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import './Gps.css';

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

const ViewField = ({ label, value }: { label: string; value: string }) => (
    <div className="form-group">
        <Label>{label}</Label>
        <div style={{ fontWeight: 600, fontSize: 14, color: 'var(--text)', padding: '8px 0' }}>{value}</div>
    </div>
);

const ViewGpsDevice: React.FC = () => {
    const navigate = useNavigate();
    const { id } = useParams();

    const device = {
        deviceId: `GPS-${id}`,
        imei: '352094081234567',
        model: 'Teltonika FMB920',
        organisation: 'TechCorp',
        assignedTo: 'Vehicle 1',
        status: 'Stationary',
    };

    return (
        <div className="page-container">
            {/* ── HEADER & BREADCRUMBS ── */}
            <div className="page-header">
                <div>
                    <div className="page-title">
                        <span className="material-symbols-outlined ms" style={{ fontSize: 18 }}>
                            location_on
                        </span>
                        View GPS Device
                    </div>
                    <div className="breadcrumb">
                        <span
                            style={{ cursor: 'pointer', color: 'var(--primary)', fontWeight: 700 }}
                            onClick={() => navigate('/masters/gps-devices')}
                        >
                            GPS DEVICES
                        </span>
                        <span>/</span> {device.deviceId.toUpperCase()}
                    </div>
                </div>
                <div style={{ display: 'flex', gap: 12 }}>
                    <button className="btn btn-secondary" onClick={() => navigate('/masters/gps-devices')}>
                        <span className="material-symbols-outlined ms">arrow_back</span> BACK
                    </button>
                    <button className="btn btn-primary" onClick={() => navigate(`/masters/gps-devices/edit/${id}`)}>
                        <span className="material-symbols-outlined ms">edit</span> EDIT DEVICE
                    </button>
                </div>
            </div>

            {/* ── PAGE BODY ── */}
            <div className="page-body">
                <div style={{ maxWidth: 860, width: '100%', margin: '0 auto', paddingBottom: 40 }}>

                    {/* ── DEVICE IDENTIFICATION ── */}
                    <Card>
                        <SectionHeader icon="fingerprint" title="DEVICE IDENTIFICATION" />
                        <Body>
                            <Grid cols="1fr 1fr">
                                <ViewField label="DEVICE ID" value={device.deviceId} />
                                <ViewField label="IMEI NUMBER" value={device.imei} />
                            </Grid>

                            <Grid cols="1fr 1fr" style={{ marginTop: 24 }}>
                                <ViewField label="MODEL NAME" value={device.model} />
                                <ViewField label="ORGANISATION" value={device.organisation} />
                            </Grid>
                        </Body>
                    </Card>

                    {/* ── ASSIGNMENT & STATUS ── */}
                    <Card>
                        <SectionHeader icon="assignment_ind" title="ASSIGNMENT & STATUS" />
                        <Body>
                            <Grid cols="1fr 1fr">
                                <ViewField label="ASSIGNED TO (VEHICLE)" value={device.assignedTo} />
                                <ViewField label="CURRENT STATUS" value={device.status} />
                            </Grid>
                        </Body>
                    </Card>

                    {/* ── FOOTER ── */}
                    <div style={{ display: 'flex', justifyContent: 'flex-end', gap: 12 }}>
                        <button
                            className="btn btn-secondary"
                            onClick={() => navigate('/masters/gps-devices')}
                        >
                            RETURN TO LIST
                        </button>
                        <button
                            className="btn btn-primary"
                            style={{ minWidth: 160 }}
                            onClick={() => navigate(`/masters/gps-devices/edit/${id}`)}
                        >
                            <span className="material-symbols-outlined ms">edit</span> EDIT DETAILS
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ViewGpsDevice;
