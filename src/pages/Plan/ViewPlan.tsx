import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Badge } from '../../Components/UI/Badge';
import './Plan.css';

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

const ViewPlan: React.FC = () => {
    const navigate = useNavigate();
    const { id } = useParams();

    const plan = {
        id: id || '1',
        name: 'Starter Plan',
        priceMonthly: '999',
        priceYearly: '9999',
        status: 'Active',
        trialDays: '7',
        description: 'Starter subscription plan provides essentials for small businesses.',
        features: ['Basic Tracking', 'Email Support', '5 GPS Devices', 'Basic Reports'],
    };

    return (
        <div className="page-container">
            {/* ── HEADER & BREADCRUMBS ── */}
            <div className="page-header">
                <div>
                    <div className="page-title">
                        <span className="material-symbols-outlined ms" style={{ fontSize: 18 }}>
                            payments
                        </span>
                        View Subscription Plan
                    </div>
                    <div className="breadcrumb">
                        <span
                            style={{ cursor: 'pointer', color: 'var(--primary)', fontWeight: 700 }}
                            onClick={() => navigate('/Plan')}
                        >
                            PLAN MANAGEMENT
                        </span>
                        <span>/</span> {plan.name.toUpperCase()}
                    </div>
                </div>
                <div style={{ display: 'flex', gap: 12 }}>
                    <button className="btn btn-secondary" onClick={() => navigate('/Plan')}>
                        <span className="material-symbols-outlined ms">arrow_back</span> BACK
                    </button>
                    <button className="btn btn-primary" onClick={() => navigate(`/Plan/edit/${plan.id}`)}>
                        <span className="material-symbols-outlined ms">edit</span> EDIT PLAN
                    </button>
                </div>
            </div>

            {/* ── PAGE BODY ── */}
            <div className="page-body">
                <div style={{ maxWidth: 860, width: '100%', margin: '0 auto', paddingBottom: 40 }}>

                    {/* ── PLAN INFORMATION ── */}
                    <Card>
                        <SectionHeader icon="description" title="PLAN INFORMATION" />
                        <Body>
                            <Grid cols="1fr 1fr">
                                <ViewField label="PLAN NAME" value={<span style={{ color: 'var(--primary)', fontWeight: 800 }}>{plan.name}</span>} />
                                <ViewField
                                    label="STATUS"
                                    value={
                                        <Badge variant={plan.status === 'Active' ? 'success' : 'error'}>
                                            {plan.status}
                                        </Badge>
                                    }
                                />
                                <ViewField label="MONTHLY PRICE" value={`₹${plan.priceMonthly}`} />
                                <ViewField label="YEARLY PRICE" value={`₹${plan.priceYearly}`} />
                                <ViewField label="TRIAL PERIOD" value={`${plan.trialDays} Days`} />
                            </Grid>

                            <div style={{ marginTop: 24 }}>
                                <ViewField label="DESCRIPTION" value={plan.description} />
                            </div>
                        </Body>
                    </Card>

                    {/* ── PLAN FEATURES ── */}
                    <Card>
                        <SectionHeader icon="star" title="PLAN FEATURES" />
                        <Body>
                            {plan.features.length === 0 ? (
                                <div style={{ color: 'var(--text-muted)', fontSize: 13 }}>No features defined for this plan.</div>
                            ) : (
                                <Grid cols="1fr 1fr" style={{ gap: 16 }}>
                                    {plan.features.map((feature) => (
                                        <div
                                            key={feature}
                                            style={{
                                                display: 'flex',
                                                alignItems: 'center',
                                                gap: 10,
                                                padding: '12px 16px',
                                                background: '#f8fafc',
                                                borderRadius: 12,
                                                border: '1.5px solid var(--border)'
                                            }}
                                        >
                                            <span className="material-symbols-outlined" style={{ color: '#10B981', fontSize: 20 }}>check_circle</span>
                                            <span style={{ fontWeight: 600, fontSize: 13, color: 'var(--text)' }}>{feature}</span>
                                        </div>
                                    ))}
                                </Grid>
                            )}
                        </Body>
                    </Card>

                    {/* ── FOOTER ── */}
                    <div style={{ display: 'flex', justifyContent: 'flex-end', gap: 12 }}>
                        <button
                            className="btn btn-secondary"
                            onClick={() => navigate('/Plan')}
                        >
                            RETURN TO LIST
                        </button>
                        <button
                            className="btn btn-primary"
                            style={{ minWidth: 160 }}
                            onClick={() => navigate(`/Plan/edit/${plan.id}`)}
                        >
                            <span className="material-symbols-outlined ms">edit</span> EDIT PLAN
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ViewPlan;
