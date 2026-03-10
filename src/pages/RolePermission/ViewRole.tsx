import React from 'react';
import { ChevronLeft } from 'lucide-react';
import { useNavigate, useParams } from 'react-router-dom';
import './RolePermission.css';
import type { Role } from './types';
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
                <p>
                    Role not found.{' '}
                    <button
                        className="btn btn--back"
                        onClick={() => navigate('/roles-permissions')}
                    >
                        ← Back
                    </button>
                </p>
            </div>
        );

    return (
        <div className="page-container">
            <div className="page-header-bar">
                <div className="breadcrumb-container">
                    <button
                        className="breadcrumb-link"
                        onClick={() => navigate('/roles-permissions')}
                    >
                        Roles &amp; Permissions
                    </button>
                    <span className="breadcrumb-sep">›</span>
                    <span className="breadcrumb-current">{role.name}</span>
                </div>
                <button className="btn btn--back" onClick={() => navigate('/roles-permissions')}>
                    <ChevronLeft size={16} /> Back
                </button>
            </div>

            <div className="rp-form-wrapper">
                <div className="rp-form-card">
                    <div className="rp-form-header">
                        <span className="rp-form-icon">👁️</span>
                        <span>VIEW ROLE</span>
                    </div>

                    <div className="rp-section">
                        <div className="rp-section-title">
                            <span className="rp-section-icon" style={{ color: '#ef4444' }}>
                                🛡️
                            </span>
                            ROLE INFORMATION
                        </div>
                        <div className="rp-section-body">
                            <div className="rp-view-row">
                                <div className="rp-view-label">ROLE NAME</div>
                                <div className="rp-view-value">
                                    <span className="rp-role-chip">👤 {role.name}</span>
                                </div>
                            </div>
                            <div className="rp-view-row">
                                <div className="rp-view-label">CREATED AT</div>
                                <div className="rp-view-value">{role.createdAt}</div>
                            </div>
                            <div className="rp-view-row">
                                <div className="rp-view-label">TOTAL PERMISSIONS</div>
                                <div className="rp-view-value">{role.permissions.length}</div>
                            </div>
                        </div>
                    </div>

                    <div className="rp-section">
                        <div className="rp-section-title">
                            <span className="rp-section-icon" style={{ color: '#f59e0b' }}>
                                🔑
                            </span>
                            PERMISSIONS ASSIGNED
                        </div>
                        <div className="rp-section-body">
                            {role.permissions.length === 0 ? (
                                <p
                                    style={{
                                        color: 'var(--text-secondary)',
                                        fontSize: '0.875rem',
                                    }}
                                >
                                    No permissions assigned.
                                </p>
                            ) : (
                                <div className="rp-perms-view-grid">
                                    {role.permissions.map((perm) => (
                                        <div key={perm} className="rp-perm-tag">
                                            ✓ {perm.replace(/_/g, ' ')}
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>
                    </div>

                    <div className="rp-form-footer"></div>
                </div>
            </div>
        </div>
    );
};

export default ViewRole;
