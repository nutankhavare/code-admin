import React from 'react';
import { ChevronLeft } from 'lucide-react';
import { useNavigate, useParams } from 'react-router-dom';
import { initialUsers } from './appuser.types';
import './AppUsers.css';

const statusColors: Record<string, string> = {
    Active: '#10b981',
    Inactive: '#f59e0b',
    Blocked: '#ef4444',
};

const ViewUser: React.FC = () => {
    const navigate = useNavigate();
    const { id } = useParams<{ id: string }>();

    const user = initialUsers.find((u) => u.id === Number(id));

    if (!user) {
        return (
            <div className="page-container">
                <p>User not found</p>
                <button className="btn btn--outline" onClick={() => navigate('/app-users')}>
                    Back
                </button>
            </div>
        );
    }

    return (
        <div className="page-container">
            <div className="page-header-bar">
                <div className="breadcrumb-container">
                    <button className="breadcrumb-link" onClick={() => navigate('/app-users')}>
                        App Users
                    </button>
                    <span className="breadcrumb-sep">›</span>
                    <span className="breadcrumb-current">{user.name}</span>
                </div>
                <button className="btn btn--back" onClick={() => navigate('/app-users')}>
                    <ChevronLeft size={16} /> Back
                </button>
            </div>

            {/* Profile Card */}
            <div className="user-profile-card">
                {/* Top Banner */}
                <div className="user-profile-banner">
                    <div className="user-profile-avatar">{user.name.charAt(0)}</div>
                    <div className="user-profile-name">{user.name}</div>
                    <div className="user-profile-email">{user.email}</div>
                </div>

                {/* Details */}
                <div className="user-profile-body">
                    <div className="user-profile-grid">
                        <Info label="Phone" value={user.phone} />
                        <Info label="Organisation" value={user.organisation} />
                        <Info label="Joined Date" value={user.joinedDate} />

                        <div className="user-info-item">
                            <div className="user-info-label">Status</div>
                            <span
                                className="status-badge"
                                style={{
                                    background: statusColors[user.status] + '20',
                                    color: statusColors[user.status],
                                    border: `1px solid ${statusColors[user.status]}40`,
                                }}
                            >
                                {user.status}
                            </span>
                        </div>
                    </div>
                </div>

                {/* Actions */}
                <div className="user-profile-footer">
                    <button className="btn btn--outline" onClick={() => navigate('/app-users')}>
                        Back
                    </button>
                </div>
            </div>
        </div>
    );
};

const Info: React.FC<{ label: string; value: string }> = ({ label, value }) => (
    <div className="user-info-item">
        <div className="user-info-label">{label}</div>
        <div className="user-info-value">{value}</div>
    </div>
);

export default ViewUser;
