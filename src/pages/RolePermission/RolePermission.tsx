import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import ConfirmationModal from '../../Components/UI/ConfirmationModal';
import './RolePermission.css';
import type { Role } from './types';

interface RolesPermissionsProps {
    roles: Role[];
    onDelete: (id: number) => void;
}

const RolesPermissions: React.FC<RolesPermissionsProps> = ({ roles, onDelete }) => {
    const navigate = useNavigate();
    const [search, setSearch] = useState('');
    const [deleteTarget, setDeleteTarget] = useState<Role | null>(null);

    const filtered = roles.filter((r) => r.name.toLowerCase().includes(search.toLowerCase()));

    const handleDeleteConfirm = () => {
        if (deleteTarget) {
            onDelete(deleteTarget.id);
            setDeleteTarget(null);
        }
    };

    return (
        <div className="page-container">
            {deleteTarget && (
                <ConfirmationModal
                    title="Delete Role?"
                    message={`Are you sure you want to delete the role "${deleteTarget.name}"? This action cannot be undone.`}
                    confirmLabel="Delete"
                    onConfirm={handleDeleteConfirm}
                    onCancel={() => setDeleteTarget(null)}
                    type="delete"
                />
            )}

            {/* ── HEADER ── */}
            <div className="page-header">
                <div>
                    <div className="page-title">
                        <span className="material-symbols-outlined ms" style={{ fontSize: 18 }}>
                            verified_user
                        </span>
                        Roles & Permissions
                    </div>
                    <div className="breadcrumb">
                        ADMINISTRATION <span>/ ROLES & PERMISSIONS</span>
                    </div>
                </div>
                <div className="header-actions">
                    <button
                        className="btn btn-primary"
                        onClick={() => navigate('/roles-permissions/add')}
                    >
                        <span className="material-symbols-outlined ms">add</span> ADD NEW ROLE
                    </button>
                </div>
            </div>

            {/* ── PAGE BODY ── */}
            <div className="page-body">
                <div className="card" style={{ padding: 0, overflow: 'hidden' }}>
                    <div className="filter-bar" style={{ padding: '24px 32px', borderBottom: '1.5px solid var(--border)' }}>
                        <div style={{ position: 'relative', flex: 1, maxWidth: '400px' }}>
                            <span className="material-symbols-outlined ms" style={{
                                position: 'absolute',
                                left: '16px',
                                top: '50%',
                                transform: 'translateY(-50%)',
                                color: 'var(--text-muted)',
                                fontSize: '20px'
                            }}>search</span>
                            <input
                                className="form-input"
                                placeholder="Search roles by name..."
                                value={search}
                                onChange={(e) => setSearch(e.target.value)}
                                style={{ width: '100%', paddingLeft: '48px' }}
                            />
                        </div>
                    </div>

                    <div className="table-card" style={{ border: 'none', borderRadius: 0 }}>
                        <table className="data-table">
                            <thead>
                                <tr>
                                    <th style={{ width: '80px', textAlign: 'center' }}>#</th>
                                    <th>ROLE NAME</th>
                                    <th style={{ textAlign: 'right', paddingRight: '40px' }}>ACTIONS</th>
                                </tr>
                            </thead>
                            <tbody>
                                {filtered.length === 0 ? (
                                    <tr>
                                        <td
                                            colSpan={3}
                                            style={{
                                                textAlign: 'center',
                                                padding: '60px',
                                                color: 'var(--text-muted)',
                                                fontSize: '14px',
                                                fontWeight: 600
                                            }}
                                        >
                                            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 12 }}>
                                                <span className="material-symbols-outlined ms" style={{ fontSize: 40, opacity: 0.5 }}>search_off</span>
                                                No roles found matching your search.
                                            </div>
                                        </td>
                                    </tr>
                                ) : (
                                    filtered.map((role, index) => (
                                        <tr key={role.id}>
                                            <td style={{ textAlign: 'center', fontWeight: 700, color: 'var(--text-muted)' }}>{index + 1}</td>
                                            <td>
                                                <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
                                                    <div style={{
                                                        width: 40,
                                                        height: 40,
                                                        borderRadius: 12,
                                                        background: 'var(--primary-light)',
                                                        color: 'var(--primary)',
                                                        display: 'flex',
                                                        alignItems: 'center',
                                                        justifyContent: 'center'
                                                    }}>
                                                        <span className="material-symbols-outlined ms" style={{ fontSize: 20 }}>shield</span>
                                                    </div>
                                                    <div>
                                                        <div style={{ fontWeight: 800, color: 'var(--text)', fontSize: 13, letterSpacing: '0.01em' }}>
                                                            {role.name}
                                                        </div>
                                                        <div style={{ fontSize: 11, color: 'var(--text-muted)', fontWeight: 600 }}>
                                                            {role.permissions.length} Permissions assigned
                                                        </div>
                                                    </div>
                                                </div>
                                            </td>
                                            <td style={{ paddingRight: '32px' }}>
                                                <div className="table-actions" style={{ justifyContent: 'flex-end', gap: 8 }}>
                                                    <button
                                                        className="action-btn action-btn--view"
                                                        title="View"
                                                        onClick={() => navigate(`/roles-permissions/view/${role.id}`)}
                                                    >
                                                        <span className="material-symbols-outlined ms" style={{ fontSize: 18 }}>visibility</span>
                                                    </button>
                                                    <button
                                                        className="action-btn action-btn--edit"
                                                        title="Edit"
                                                        onClick={() => navigate(`/roles-permissions/edit/${role.id}`)}
                                                    >
                                                        <span className="material-symbols-outlined ms" style={{ fontSize: 18 }}>edit</span>
                                                    </button>
                                                    <button
                                                        className="action-btn action-btn--delete"
                                                        title="Delete"
                                                        onClick={() => setDeleteTarget(role)}
                                                    >
                                                        <span className="material-symbols-outlined ms" style={{ fontSize: 18 }}>delete</span>
                                                    </button>
                                                </div>
                                            </td>
                                        </tr>
                                    ))
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default RolesPermissions;
