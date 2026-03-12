import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import ConfirmationModal from '../../Components/UI/ConfirmationModal';
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

interface EditRoleProps {
    roles: Role[];
    onEdit: (id: number, updated: Omit<Role, 'id' | 'createdAt'>) => void;
}

const EditRole: React.FC<EditRoleProps> = ({ roles, onEdit }) => {
    const navigate = useNavigate();
    const { id } = useParams<{ id: string }>();
    const role = roles.find((r) => r.id === Number(id));

    const [roleName, setRoleName] = useState(role?.name || '');
    const [selected, setSelected] = useState<string[]>(role?.permissions || []);
    const [error, setError] = useState('');
    const [showUpdateConfirm, setShowUpdateConfirm] = useState(false);

    if (!role)
        return (
            <div className="page-container">
                <div className="page-body" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '60vh' }}>
                    <Card>
                        <div style={{ textAlign: 'center', padding: '40px' }}>
                            <span className="material-symbols-outlined" style={{ fontSize: 48, color: '#94A3B8', marginBottom: 16 }}>error</span>
                            <div style={{ fontWeight: 900, fontSize: 18, marginBottom: 12 }}>Role Not Found</div>
                            <button className="btn btn-secondary" onClick={() => navigate('/roles-permissions')}>
                                <span className="material-symbols-outlined ms">arrow_back</span> BACK TO LIST
                            </button>
                        </div>
                    </Card>
                </div>
            </div>
        );

    const togglePermission = (perm: string) => {
        setSelected((prev) => prev.includes(perm) ? prev.filter((p) => p !== perm) : [...prev, perm]);
    };

    const selectAll = () => {
        setSelected(selected.length === ALL_PERMISSIONS.length ? [] : [...ALL_PERMISSIONS]);
    };

    const handleUpdateClick = () => {
        if (!roleName.trim()) {
            setError('Role name is required');
            return;
        }
        setShowUpdateConfirm(true);
    };

    const handleConfirmUpdate = () => {
        onEdit(role.id, {
            name: roleName.trim().toUpperCase(),
            permissions: selected,
        });
        setShowUpdateConfirm(false);
        navigate('/roles-permissions');
    };

    return (
        <div className="page-container">
            {showUpdateConfirm && (
                <ConfirmationModal
                    title="Update Role?"
                    message={`Are you sure you want to save the changes for the role "${role.name}"?`}
                    confirmLabel="Update"
                    onConfirm={handleConfirmUpdate}
                    onCancel={() => setShowUpdateConfirm(false)}
                    type="update"
                />
            )}

            <div className="page-header" style={{ maxWidth: 800, margin: '0 auto 20px auto', width: '100%' }}>
                <div>
                    <div className="page-title">
                        <span className="material-symbols-outlined ms" style={{ fontSize: 18 }}>verified_user</span>
                        Update Role
                    </div>
                    <div className="breadcrumb">
                        <span style={{ cursor: 'pointer', color: 'var(--primary)', fontWeight: 700 }} onClick={() => navigate('/masters/roles-permissions')}>Roles & Permissions</span>
                        <span>/</span> Update Role
                    </div>
                </div>
                <button className="btn btn-secondary" onClick={() => navigate('/masters/roles-permissions')} style={{ flexShrink: 0 }}>
                    <span className="material-symbols-outlined ms">arrow_back</span> Back to List
                </button>
            </div>

            <div className="page-body">
                <div style={{ maxWidth: 800, width: '100%', margin: '0 auto', paddingBottom: 40 }}>
                    <Card>
                        <SectionHeader icon="shield" title="Edit Role Information" />
                        <Body>
                            <Grid cols="1fr 2fr">
                                <div className="form-group">
                                    <Label>Role Name *</Label>
                                    <input
                                        className="form-input"
                                        placeholder="e.g. CONTENT MANAGER"
                                        value={roleName}
                                        onChange={(e) => { setRoleName(e.target.value.toUpperCase()); setError(''); }}
                                        required
                                    />
                                    {error && <div style={{ color: 'var(--danger)', fontSize: 10, marginTop: 4 }}>{error}</div>}
                                </div>
                                <div style={{ paddingTop: 24, color: '#64748B', fontSize: 11, fontWeight: 600 }}>
                                    Manage the name and permissions assigned to this role. Changes will take effect immediately for all users assigned to this role.
                                </div>
                            </Grid>
                        </Body>
                    </Card>

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
                        <button type="button" className="btn btn-primary" style={{ minWidth: 160 }} onClick={handleUpdateClick}>
                            <span className="material-symbols-outlined ms">save</span> UPDATE ROLE
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default EditRole;
