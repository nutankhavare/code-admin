import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import './AppUsers.css';
import { initialUsers } from './appuser.types';
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

const EditUser: React.FC = () => {
    const navigate = useNavigate();
    const { id } = useParams<{ id: string }>();

    const user = initialUsers.find((u) => u.id === Number(id));

    const [form, setForm] = useState({
        name: user?.name || '',
        email: user?.email || '',
        phone: user?.phone || '',
        organisation: user?.organisation || '',
        status: user?.status || 'Active',
    });

    const [error, setError] = useState('');
    const [showUpdateConfirm, setShowUpdateConfirm] = useState(false);

    if (!user) {
        return (
            <div className="page-container">
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '60vh' }}>
                    <Card>
                        <div style={{ textAlign: 'center', padding: '40px' }}>
                            <span className="material-symbols-outlined" style={{ fontSize: 48, color: '#94A3B8', marginBottom: 16 }}>error</span>
                            <div style={{ fontWeight: 900, fontSize: 18, marginBottom: 12 }}>User Not Found</div>
                            <button className="btn btn-secondary" onClick={() => navigate('/app-users')}>
                                <span className="material-symbols-outlined ms">arrow_back</span> BACK TO LIST
                            </button>
                        </div>
                    </Card>
                </div>
            </div>
        );
    }

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        setForm({ ...form, [e.target.name]: e.target.value });
        setError('');
    };

    const handleSaveClick = () => {
        if (!form.name.trim() || !form.email.trim()) {
            setError('Name and Email are required');
            return;
        }
        setShowUpdateConfirm(true);
    };

    const handleConfirmSave = () => {
        // eslint-disable-next-line no-console
        console.log('Updated user:', form);
        setShowUpdateConfirm(false);
        navigate('/app-users');
    };

    const handleReset = () => {
        setForm({
            name: user.name,
            email: user.email,
            phone: user.phone,
            organisation: user.organisation,
            status: user.status,
        });
    };

    return (
        <div className="page-container">
            {showUpdateConfirm && (
                <ConfirmationModal
                    title="Update User?"
                    message={`Are you sure you want to save the changes for ${user.name}?`}
                    confirmLabel="Update"
                    onConfirm={handleConfirmSave}
                    onCancel={() => setShowUpdateConfirm(false)}
                    type="update"
                />
            )}

            <div className="page-header" style={{ maxWidth: 800, margin: '0 auto 20px auto', width: '100%' }}>
                <div>
                    <div className="page-title">
                        <span className="material-symbols-outlined ms" style={{ fontSize: 18 }}>person</span>
                        Edit App User
                    </div>
                    <div className="breadcrumb">
                        <span style={{ cursor: 'pointer', color: 'var(--primary)', fontWeight: 700 }} onClick={() => navigate('/app-users')}>App Users</span>
                        <span>/</span> Update App User
                    </div>
                </div>
                <button className="btn btn-secondary" onClick={() => navigate('/app-users')} style={{ flexShrink: 0 }}>
                    <span className="material-symbols-outlined ms">arrow_back</span> Back to List
                </button>
            </div>

            <div className="page-body">
                <div style={{ maxWidth: 800, width: '100%', margin: '0 auto', paddingBottom: 40 }}>
                    <Card>
                        <SectionHeader icon="manage_accounts" title="User Information" />
                        <Body>
                            <Grid cols="1fr 1fr">
                                <div className="form-group">
                                    <Label>Name *</Label>
                                    <input className="form-input" name="name" value={form.name} onChange={handleChange} required />
                                </div>
                                <div className="form-group">
                                    <Label>Email *</Label>
                                    <input className="form-input" name="email" value={form.email} onChange={handleChange} required />
                                </div>
                                <div className="form-group">
                                    <Label>Phone</Label>
                                    <input className="form-input" name="phone" value={form.phone} onChange={handleChange} />
                                </div>
                                <div className="form-group">
                                    <Label>Organisation</Label>
                                    <input className="form-input" name="organisation" value={form.organisation} onChange={handleChange} />
                                </div>
                                <div className="form-group">
                                    <Label>Status</Label>
                                    <select className="form-input" name="status" value={form.status} onChange={handleChange}>
                                        <option>Active</option>
                                        <option>Inactive</option>
                                        <option>Blocked</option>
                                    </select>
                                </div>
                            </Grid>
                            {error && <div style={{ color: '#ef4444', fontSize: 11, fontWeight: 600, marginTop: 12 }}>⚠ {error}</div>}
                        </Body>
                    </Card>

                    <div style={{ display: 'flex', justifyContent: 'flex-end', gap: 12, marginTop: 8 }}>
                        <button className="btn btn-secondary" onClick={handleReset} style={{ border: '1.5px solid var(--border)' }}>
                            <span className="material-symbols-outlined ms">restart_alt</span> RESET
                        </button>
                        <button className="btn btn-primary" style={{ minWidth: 160 }} onClick={handleSaveClick}>
                            <span className="material-symbols-outlined ms">save</span> UPDATE USER
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default EditUser;
