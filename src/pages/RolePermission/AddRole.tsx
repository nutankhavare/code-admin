import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './RolePermission.css';
import { ALL_PERMISSIONS, type Role } from './types';

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

interface AddRoleProps {
    onAdd: (role: Omit<Role, 'id' | 'createdAt'>) => void;
}

const AddRole: React.FC<AddRoleProps> = ({ onAdd }) => {
    const navigate = useNavigate();
    const [roleName, setRoleName] = useState('');
    const [description, setDescription] = useState('');
    const [selected, setSelected] = useState<string[]>([]);
    const [error, setError] = useState('');

    const togglePermission = (perm: string) => {
        setSelected((prev) =>
            prev.includes(perm) ? prev.filter((p) => p !== perm) : [...prev, perm]
        );
    };

    const selectAll = () => {
        setSelected(selected.length === ALL_PERMISSIONS.length ? [] : [...ALL_PERMISSIONS]);
    };

    const handleSave = () => {
        if (!roleName.trim()) {
            setError('Role name is required');
            return;
        }
        onAdd({
            name: roleName.trim().toUpperCase(),
            description: description.trim() || undefined,
            permissions: selected,
        });
        navigate('/roles-permissions');
    };

    return (
        <div className="page-container">
            <div className="page-header" style={{ maxWidth: 800, margin: '0 auto 20px auto', width: '100%' }}>
                <div>
                    <div className="page-title">
                        <span className="material-symbols-outlined ms" style={{ fontSize: 18 }}>verified_user</span>
                        Add New Role
                    </div>
                    <div className="breadcrumb">
                        <span style={{ cursor: 'pointer', color: 'var(--primary)', fontWeight: 700 }} onClick={() => navigate('/roles-permissions')}>Roles & Permissions</span>
                        <span>/</span> Add New Role
                    </div>
                </div>
                <button className="btn btn-secondary" onClick={() => navigate('/roles-permissions')} style={{ flexShrink: 0 }}>
                    <span className="material-symbols-outlined ms">arrow_back</span> Back to List
                </button>
            </div>

            <div className="page-body">
                <div style={{ maxWidth: 800, width: '100%', margin: '0 auto', paddingBottom: 40 }}>
                    <form onSubmit={(e) => { e.preventDefault(); handleSave(); }}>
                        {/* 1. Role Information */}
                        <Card>
                            <SectionHeader icon="shield" title="Role Information" />
                            <Body>
                                <Grid cols="1fr 2fr">
                                    <div className="form-group">
                                        <Label>Role Name *</Label>
                                        <input
                                            className="form-input"
                                            placeholder="e.g. CONTENT MANAGER"
                                            value={roleName}
                                            onChange={(e) => { setRoleName(e.target.value); setError(''); }}
                                            required
                                        />
                                        {error && <div style={{ color: 'var(--danger)', fontSize: 10, marginTop: 4 }}>{error}</div>}
                                    </div>
                                    <div className="form-group">
                                        <Label>Description (Optional)</Label>
                                        <input
                                            className="form-input"
                                            placeholder="Describe the role responsibilities..."
                                            value={description}
                                            onChange={(e) => setDescription(e.target.value)}
                                        />
                                    </div>
                                </Grid>
                            </Body>
                        </Card>

                        {/* 2. Permissions */}
                        <Card>
                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '12px 20px', borderBottom: '1.5px solid var(--border)', background: 'var(--surface)' }}>
                                <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                                    <span className="material-symbols-outlined" style={{ fontSize: 18, color: 'var(--primary)' }}>key</span>
                                    <span style={{ fontSize: 11, fontWeight: 900, letterSpacing: '.07em', textTransform: 'uppercase' }}>Permissions</span>
                                </div>
                                <button type="button" className="btn btn-secondary" style={{ padding: '4px 10px', fontSize: 10, minWidth: 'unset' }} onClick={selectAll}>
                                    {selected.length === ALL_PERMISSIONS.length ? 'DESELECT ALL' : 'SELECT ALL'}
                                </button>
                            </div>
                            <Body>
                                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(180px, 1fr))', gap: 12 }}>
                                    {ALL_PERMISSIONS.map((perm) => (
                                        <label key={perm} style={{
                                            display: 'flex', alignItems: 'center', gap: 8, padding: '10px 14px', borderRadius: 8, border: '1px solid var(--border)', background: selected.includes(perm) ? '#F5F3FF' : 'transparent', borderColor: selected.includes(perm) ? 'var(--primary)' : undefined, cursor: 'pointer'
                                        }}>
                                            <input type="checkbox" checked={selected.includes(perm)} onChange={() => togglePermission(perm)} style={{ accentColor: 'var(--primary)' }} />
                                            <span style={{ fontSize: 11, fontWeight: 700, color: selected.includes(perm) ? 'var(--primary)' : 'var(--text)' }}>
                                                {perm.replace(/_/g, ' ')}
                                            </span>
                                        </label>
                                    ))}
                                </div>
                            </Body>
                        </Card>

                        <div style={{ display: 'flex', justifyContent: 'flex-end', gap: 12, marginTop: 8 }}>
                            <button type="button" className="btn btn-secondary" onClick={() => navigate('/roles-permissions')}>CANCEL</button>
                            <button type="submit" className="btn btn-primary" style={{ minWidth: 160 }}>
                                <span className="material-symbols-outlined ms">save</span> SAVE ROLE
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default AddRole;
