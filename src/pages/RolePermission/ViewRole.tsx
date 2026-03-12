import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import './RolePermission.css';
import type { Role } from './types';

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

const Grid = ({ cols, children }: { cols: string; children: React.ReactNode }) => (
    <div style={{ display: 'grid', gridTemplateColumns: cols, gap: '24px 32px' }}>{children}</div>
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

interface ViewRoleProps {
    roles: Role[];
}

const ViewRole: React.FC<ViewRoleProps> = ({ roles }) => {
    const navigate = useNavigate();
    const { id } = useParams<{ id: string }>();
    const role = roles.find((r) => r.id === Number(id));

    if (!role)
        return (
            <div className="page-container">
                <div className="page-body" style={{ alignItems: 'center', justifyContent: 'center' }}>
                    <Card>
                        <div style={{ textAlign: 'center', padding: '20px' }}>
                            <span className="material-symbols-outlined ms" style={{ fontSize: 48, color: 'var(--muted)', marginBottom: 16 }}>error</span>
                            <div style={{ fontWeight: 900, fontSize: 18, marginBottom: 8 }}>Role Not Found</div>
                            <button className="btn btn-secondary" onClick={() => navigate('/roles-permissions')}>
                                <span className="material-symbols-outlined ms">arrow_back</span> BACK TO LIST
                            </button>
                        </div>
                    </Card>
                </div>
            </div>
        );

    return (
        <div className="page-container">
            {/* ── HEADER & BREADCRUMBS ── */}
            <div className="page-header">
                <div>
                    <div className="page-title">
                        <span className="material-symbols-outlined ms" style={{ fontSize: 18 }}>
                            verified_user
                        </span>
                        View Role: {role.name}
                    </div>
                    <div className="breadcrumb">
                        <span
                            style={{ cursor: 'pointer', color: 'var(--primary)', fontWeight: 700 }}
                            onClick={() => navigate('/roles-permissions')}
                        >
                            ROLES & PERMISSIONS
                        </span>
                        <span>/</span> {role.name.toUpperCase()}
                    </div>
                </div>
                <div style={{ display: 'flex', gap: 12 }}>
                    <button className="btn btn-secondary" onClick={() => navigate('/roles-permissions')}>
                        <span className="material-symbols-outlined ms">arrow_back</span> BACK
                    </button>
                    <button className="btn btn-primary" onClick={() => navigate(`/roles-permissions/edit/${role.id}`)}>
                        <span className="material-symbols-outlined ms">edit</span> EDIT ROLE
                    </button>
                </div>
            </div>

            {/* ── PAGE BODY ── */}
            <div className="page-body">
                <div style={{ maxWidth: 860, width: '100%', margin: '0 auto', paddingBottom: 40 }}>

                    {/* ── ROLE INFORMATION ── */}
                    <Card>
                        <SectionHeader icon="shield" title="ROLE INFORMATION" />
                        <Body>
                            <Grid cols="1fr 1fr">
                                <ViewField label="ROLE NAME" value={<span style={{ color: 'var(--primary)', fontWeight: 800 }}>{role.name}</span>} />
                                <ViewField label="CREATED ON" value={role.createdAt || 'N/A'} />
                            </Grid>

                            {role.description && (
                                <div style={{ marginTop: 24 }}>
                                    <ViewField label="DESCRIPTION" value={role.description} />
                                </div>
                            )}
                        </Body>
                    </Card>

                    {/* ── PERMISSIONS ── */}
                    <Card>
                        <SectionHeader icon="key" title="PERMISSIONS ASSIGNED" />
                        <Body>
                            {role.permissions.length === 0 ? (
                                <div style={{ color: 'var(--text-muted)', fontSize: 13 }}>No permissions assigned to this role.</div>
                            ) : (
                                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: 12 }}>
                                    {role.permissions.map((perm) => (
                                        <div
                                            key={perm}
                                            style={{
                                                display: 'flex',
                                                alignItems: 'center',
                                                gap: 10,
                                                padding: '10px 14px',
                                                background: '#f8fafc',
                                                borderRadius: 10,
                                                border: '1.5px solid var(--border)'
                                            }}
                                        >
                                            <span className="material-symbols-outlined" style={{ color: 'var(--primary)', fontSize: 18 }}>check_circle</span>
                                            <span style={{ fontWeight: 700, fontSize: 12, color: 'var(--text)' }}>{perm.replace(/_/g, ' ')}</span>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </Body>
                    </Card>

                    {/* ── FOOTER ── */}
                    <div style={{ display: 'flex', justifyContent: 'flex-end', gap: 12 }}>
                        <button
                            className="btn btn-secondary"
                            onClick={() => navigate('/roles-permissions')}
                        >
                            RETURN TO LIST
                        </button>
                        <button
                            className="btn btn-primary"
                            style={{ minWidth: 160 }}
                            onClick={() => navigate(`/roles-permissions/edit/${role.id}`)}
                        >
                            <span className="material-symbols-outlined ms">edit</span> EDIT DETAILS
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ViewRole;
