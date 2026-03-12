import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import ConfirmationModal from '../../Components/UI/ConfirmationModal';
import './Plan.css';

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

const EditPlan: React.FC = () => {
    const navigate = useNavigate();
    const { id } = useParams();

    const [form, setForm] = useState({
        name: 'Office Basic',
        type: 'office',
        status: 'Active',
        trialDays: '10',
        description: 'Office Basic Plan',
        priceMonthly: '99.00',
        priceYearly: '1000.00',
        planDoc: null as File | null,
    });

    const [features, setFeatures] = useState<{ name: string; type: string; value: string;[key: string]: string }[]>([
        { name: 'Admin Dashboard', type: 'text', value: '1' },
        { name: 'Roles Management', type: 'text', value: '2' },
        { name: 'Employee Management', type: 'text', value: '20' },
        { name: 'Vehicle Management', type: 'text', value: '5' },
        { name: 'Driver Management', type: 'text', value: '5' },
        { name: 'Reports', type: 'text', value: '5' },
    ]);

    const [error, setError] = useState('');
    const [showConfirm, setShowConfirm] = useState(false);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
        setForm({ ...form, [e.target.name]: e.target.value });
        setError('');
    };

    const handleDoc = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            setForm((v) => ({ ...v, planDoc: file }));
        }
    };

    const handleFeatureChange = (index: number, field: string, value: string) => {
        const updated = [...features];
        updated[index][field] = value;
        setFeatures(updated);
    };

    const addFeature = () => setFeatures([...features, { name: '', type: 'text', value: '' }]);
    const removeFeature = (index: number) => setFeatures(features.filter((_, i) => i !== index));

    const handleUpdate = () => {
        if (!form.name.trim()) {
            setError('Plan name is required');
            return;
        }
        setShowConfirm(true);
    };

    const handleConfirmUpdate = () => {
        // eslint-disable-next-line no-console
        console.log({ id, ...form, features });
        setShowConfirm(false);
        navigate('/Plan');
    };

    const handleReset = () => {
        setForm({ name: 'Office Basic', type: 'office', status: 'Active', trialDays: '10', description: 'Office Basic Plan', priceMonthly: '99.00', priceYearly: '1000.00', planDoc: null });
        setFeatures([{ name: 'Admin Dashboard', type: 'text', value: '1' }, { name: 'Roles Management', type: 'text', value: '2' }, { name: 'Employee Management', type: 'text', value: '20' }, { name: 'Vehicle Management', type: 'text', value: '5' }, { name: 'Driver Management', type: 'text', value: '5' }, { name: 'Reports', type: 'text', value: '5' }]);
        setError('');
    };

    return (
        <div className="page-container">
            {showConfirm && (
                <ConfirmationModal
                    title="Update Plan?"
                    message={`Are you sure you want to save changes to "${form.name}"?`}
                    confirmLabel="Save Changes"
                    onConfirm={handleConfirmUpdate}
                    onCancel={() => setShowConfirm(false)}
                />
            )}

            <div className="page-header" style={{ maxWidth: 800, margin: '0 auto 20px auto', width: '100%' }}>
                <div>
                    <div className="page-title">
                        <span className="material-symbols-outlined ms" style={{ fontSize: 18 }}>payments</span>
                        Edit Subscription Plan
                    </div>
                    <div className="breadcrumb">
                        <span style={{ cursor: 'pointer', color: 'var(--primary)', fontWeight: 700 }} onClick={() => navigate('/Plan')}>Plan Management</span>
                        <span>/</span> Update Plan
                    </div>
                </div>
                <button className="btn btn-secondary" onClick={() => navigate('/Plan')} style={{ flexShrink: 0 }}>
                    <span className="material-symbols-outlined ms">arrow_back</span> Back to List
                </button>
            </div>

            <div className="page-body">
                <div style={{ maxWidth: 800, width: '100%', margin: '0 auto', paddingBottom: 40 }}>
                    <form onSubmit={(e) => { e.preventDefault(); handleUpdate(); }}>
                        {/* 1. Pricing Strategy */}
                        <Card>
                            <SectionHeader icon="currency_rupee" title="Pricing Strategy" />
                            <Body>
                                <Grid cols="1fr 1fr">
                                    <div className="form-group">
                                        <Label>Monthly Price (₹)</Label>
                                        <input className="form-input" type="number" name="priceMonthly" value={form.priceMonthly} onChange={handleChange} />
                                    </div>
                                    <div className="form-group">
                                        <Label>Yearly Price (₹)</Label>
                                        <input className="form-input" type="number" name="priceYearly" value={form.priceYearly} onChange={handleChange} />
                                    </div>
                                </Grid>
                            </Body>
                        </Card>

                        {/* 2. Plan Details */}
                        <Card>
                            <SectionHeader icon="description" title="Plan Details" />
                            <Body>
                                <Grid cols="1fr 1fr">
                                    <div className="form-group">
                                        <Label>Plan Name *</Label>
                                        <input className="form-input" name="name" value={form.name} onChange={handleChange} required />
                                    </div>
                                    <div className="form-group">
                                        <Label>Plan Type</Label>
                                        <select className="form-input" name="type" value={form.type} onChange={handleChange}>
                                            <option value="">Select Category</option>
                                            <option value="office">Office</option>
                                            <option value="institution">Institution</option>
                                            <option value="driving">Driving School</option>
                                        </select>
                                    </div>
                                    <div className="form-group">
                                        <Label>Status</Label>
                                        <select className="form-input" name="status" value={form.status} onChange={handleChange}>
                                            <option>Active</option>
                                            <option>Inactive</option>
                                        </select>
                                    </div>
                                    <div className="form-group">
                                        <Label>Trial Period (Days)</Label>
                                        <input className="form-input" type="number" name="trialDays" value={form.trialDays} onChange={handleChange} />
                                    </div>
                                </Grid>
                            </Body>
                        </Card>

                        {/* 3. Documents */}
                        <Card>
                            <SectionHeader icon="folder_open" title="Documents" />
                            <Body>
                                <div style={{ maxWidth: 300 }}>
                                    <Label>Plan Brochure / Agreement</Label>
                                    <label style={{
                                        display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: 96, borderRadius: 10, border: '2px dashed var(--border)', background: form.planDoc ? '#F5F3FF' : 'var(--surface)', cursor: 'pointer', gap: 6, borderColor: form.planDoc ? 'var(--primary)' : undefined
                                    }}>
                                        <span className="material-symbols-outlined" style={{ fontSize: 26, color: form.planDoc ? 'var(--primary)' : '#CBD5E1' }}>cloud_upload</span>
                                        <span style={{ fontSize: 10, fontWeight: 700, color: form.planDoc ? 'var(--primary)' : '#94A3B8', textAlign: 'center', padding: '0 8px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', width: '100%' }}>
                                            {form.planDoc ? form.planDoc.name : 'Click to Upload Document'}
                                        </span>
                                        <input type="file" style={{ display: 'none' }} onChange={handleDoc} accept=".pdf,.jpg,.jpeg,.png" />
                                    </label>
                                </div>
                            </Body>
                        </Card>

                        {/* 4. Plan Features */}
                        <Card>
                            <SectionHeader icon="star" title="Plan Features" />
                            <Body>
                                {features.map((feature, index) => (
                                    <div key={index} style={{ display: 'grid', gridTemplateColumns: '1fr 120px 100px auto', gap: 12, marginBottom: 12, alignItems: 'start' }}>
                                        <div>
                                            <Label>Feature Name</Label>
                                            <input className="form-input" value={feature.name} onChange={(e) => handleFeatureChange(index, 'name', e.target.value)} />
                                        </div>
                                        <div>
                                            <Label>Type</Label>
                                            <input className="form-input" value={feature.type} onChange={(e) => handleFeatureChange(index, 'type', e.target.value)} />
                                        </div>
                                        <div>
                                            <Label>Value</Label>
                                            <input className="form-input" value={feature.value} onChange={(e) => handleFeatureChange(index, 'value', e.target.value)} />
                                        </div>
                                        <button type="button" className="btn btn-secondary" style={{ marginTop: 22, padding: '8px', minWidth: 'unset', color: '#dc2626', border: 'none' }} onClick={() => removeFeature(index)}>
                                            <span className="material-symbols-outlined" style={{ fontSize: 18 }}>delete</span>
                                        </button>
                                    </div>
                                ))}
                                <button type="button" className="btn btn-secondary" style={{ width: '100%', border: '1.5px dashed var(--border)', justifyContent: 'center', padding: '10px', marginTop: 8 }} onClick={addFeature}>
                                    <span className="material-symbols-outlined ms">add</span> Add Another Feature
                                </button>
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
                                <span className="material-symbols-outlined ms">save</span> UPDATE PLAN
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default EditPlan;
