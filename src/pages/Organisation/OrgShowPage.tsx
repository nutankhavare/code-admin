import React, { useState } from 'react';
import { ChevronLeft, Trash2, LayoutDashboard, Users, Car, Radio, MapPin, CreditCard, Plane } from 'lucide-react';
import { useNavigate, useParams } from 'react-router-dom';
import { useAuth } from '../../Context/AuthContext';
import './Organisation.css';
import { initialOrganisations } from './organisation.types';

type Tab = 'overview' | 'staff' | 'vehicles' | 'beacons' | 'gps' | 'plans' | 'travellers';

const TABS: { key: Tab; label: string; icon: React.ReactNode }[] = [
    { key: 'overview', label: 'OVERVIEW', icon: <LayoutDashboard size={18} /> },
    { key: 'staff', label: 'STAFF', icon: <Users size={18} /> },
    { key: 'vehicles', label: 'VEHICLES', icon: <Car size={18} /> },
    { key: 'beacons', label: 'BEACONS', icon: <Radio size={18} /> },
    { key: 'gps', label: 'GPS DEVICES', icon: <MapPin size={18} /> },
    { key: 'plans', label: 'PLANS', icon: <CreditCard size={18} /> },
    { key: 'travellers', label: 'TRAVELLERS', icon: <Plane size={18} /> },
];

const OrgShowPage: React.FC = () => {
    const navigate = useNavigate();
    const { user } = useAuth();
    const { id } = useParams<{ id: string }>();
    const org = initialOrganisations.find((o) => o.id === Number(id));
    const [activeTab, setActiveTab] = useState<Tab>('overview');

    if (!org) {
        return (
            <div className="page-container">
                <div className="card" style={{ padding: '40px', textAlign: 'center' }}>
                    <div style={{ fontSize: '1.2rem', fontWeight: 800, color: 'var(--text)', marginBottom: '1rem' }}>Organisation not found</div>
                    <button className="btn btn--outline" onClick={() => navigate('/Organisation')}>
                        <ChevronLeft size={16} /> BACK TO LIST
                    </button>
                </div>
            </div>
        );
    }

    const handleDelete = () => {
        if (user?.role !== 'Super Admin') {
            alert('Only Super Admin can delete organisations.');
            return;
        }
        if (window.confirm(`Are you sure you want to delete ${org.name}?`)) {
            console.log('Deleting org:', org.id);
            navigate('/Organisation');
        }
    };

    return (
        <div className="page-container">
            <div className="page-header-bar">
                <div className="breadcrumb-container">
                    <button className="breadcrumb-link" onClick={() => navigate('/Organisation')}>
                        ORGANISATIONS
                    </button>
                    <span className="breadcrumb-sep">/</span>
                    <span className="breadcrumb-current">{org.name.toUpperCase()}</span>
                </div>
                <button className="btn btn--back" onClick={() => navigate('/Organisation')}>
                    <ChevronLeft size={16} /> BACK
                </button>
            </div>

            {/* Header Identity Card */}
            <div className="card" style={{ padding: '24px 32px', marginBottom: '20px', background: '#f8fafc', borderLeft: '5px solid var(--primary)' }}>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '20px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '24px' }}>
                        <div style={{ 
                            width: '72px', 
                            height: '72px', 
                            borderRadius: '16px', 
                            background: 'var(--primary)', 
                            color: 'white', 
                            display: 'flex', 
                            alignItems: 'center', 
                            justifyContent: 'center',
                            fontSize: '28px',
                            fontWeight: 900,
                            boxShadow: '0 8px 16px rgba(99, 102, 241, 0.2)'
                        }}>
                            {org.name.charAt(0)}
                        </div>
                        <div>
                            <div style={{ fontSize: '24px', fontWeight: 900, color: 'var(--text)', letterSpacing: '-0.02em', marginBottom: '4px' }}>{org.name}</div>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', flexWrap: 'wrap' }}>
                                <span style={{ 
                                    fontSize: '11px', 
                                    fontWeight: 800, 
                                    padding: '4px 10px', 
                                    borderRadius: '6px', 
                                    background: 'var(--white)', 
                                    color: 'var(--primary)',
                                    border: '1px solid var(--border)',
                                    textTransform: 'uppercase'
                                }}>
                                    {org.type.replace(/_/g, ' ')}
                                </span>
                                <span style={{ fontSize: '12px', color: 'var(--muted)', fontWeight: 600 }}>📍 {org.city}, {org.state}</span>
                                <span style={{ fontSize: '12px', color: 'var(--primary)', fontWeight: 700, textDecoration: 'underline' }}>{org.domain}</span>
                                <span className="status-badge" style={{ 
                                    background: org.status === 'Active' ? '#10b98115' : '#ef444415',
                                    color: org.status === 'Active' ? '#10b981' : '#ef4444'
                                }}>{org.status}</span>
                            </div>
                        </div>
                    </div>
                    <button className="btn btn--danger" onClick={handleDelete}>
                        <Trash2 size={16} /> DELETE ORGANISATION
                    </button>
                </div>
            </div>

            {/* Premium Tabs */}
            <div style={{ display: 'flex', gap: '8px', marginBottom: '20px', overflowX: 'auto', paddingBottom: '4px' }}>
                {TABS.map((tab) => (
                    <button
                        key={tab.key}
                        onClick={() => setActiveTab(tab.key)}
                        style={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: '8px',
                            padding: '12px 20px',
                            borderRadius: '12px',
                            border: 'none',
                            background: activeTab === tab.key ? 'var(--primary)' : 'var(--white)',
                            color: activeTab === tab.key ? 'white' : 'var(--muted)',
                            fontSize: '11px',
                            fontWeight: 800,
                            cursor: 'pointer',
                            transition: 'all 0.2s',
                            boxShadow: activeTab === tab.key ? '0 8px 16px rgba(99, 102, 241, 0.25)' : 'none',
                            whiteSpace: 'nowrap'
                        }}
                    >
                        {tab.icon} {tab.label}
                    </button>
                ))}
            </div>

            {/* Tab Content */}
            <div className="card">
                {activeTab === 'overview' ? (
                    <div style={{ padding: '32px' }}>
                        {/* Summary Grid */}
                        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '20px', marginBottom: '40px' }}>
                            {[
                                { label: 'TOTAL STAFF', value: 0, color: '#6366f1' },
                                { label: 'ACTIVE VEHICLES', value: 0, color: '#f59e0b' },
                                { label: 'GPS DEVICES', value: 0, color: '#10b981' },
                                { label: 'BEACONS', value: 0, color: '#ef4444' }
                            ].map(stat => (
                                <div key={stat.label} style={{ padding: '20px', borderRadius: '16px', background: '#f8fafc', border: '1px solid var(--border)' }}>
                                    <div style={{ fontSize: '10px', color: 'var(--muted)', fontWeight: 800, marginBottom: '8px' }}>{stat.label}</div>
                                    <div style={{ fontSize: '24px', fontWeight: 900, color: stat.color }}>{stat.value}</div>
                                </div>
                            ))}
                        </div>

                        <div style={{ marginBottom: '32px' }}>
                            <div style={{ fontSize: '12px', fontWeight: 900, color: 'var(--text)', marginBottom: '20px', paddingBottom: '8px', borderBottom: '1.5px solid var(--border)', display: 'inline-block' }}>BASIC INFORMATION</div>
                            <div className="form-row">
                                <div className="org-view-row">
                                    <div className="org-view-label">ORGANISATION NAME</div>
                                    <div className="org-view-value">{org.name}</div>
                                </div>
                                <div className="org-view-row">
                                    <div className="org-view-label">REGISTRATION NUMBER</div>
                                    <div className="org-view-value" style={{ fontFamily: 'monospace' }}>{org.regNumber}</div>
                                </div>
                                <div className="org-view-row">
                                    <div className="org-view-label">PRIMARY EMAIL</div>
                                    <div className="org-view-value">{org.email || 'N/A'}</div>
                                </div>
                                <div className="org-view-row">
                                    <div className="org-view-label">PHONE NUMBER</div>
                                    <div className="org-view-value">{org.phone || 'N/A'}</div>
                                </div>
                            </div>
                        </div>

                        <div>
                            <div style={{ fontSize: '12px', fontWeight: 900, color: 'var(--text)', marginBottom: '20px', paddingBottom: '8px', borderBottom: '1.5px solid var(--border)', display: 'inline-block' }}>ACCOUNT DETAILS</div>
                            <div className="form-row">
                                <div className="org-view-row">
                                    <div className="org-view-label">ACCOUNT STATUS</div>
                                    <div className="org-view-value">{org.status}</div>
                                </div>
                                <div className="org-view-row">
                                    <div className="org-view-label">ONBOARDED ON</div>
                                    <div className="org-view-value">{org.createdAt}</div>
                                </div>
                            </div>
                        </div>
                    </div>
                ) : (
                    <div style={{ padding: '80px 32px', textAlign: 'center' }}>
                        <div style={{ fontSize: '48px', marginBottom: '16px' }}>{TABS.find(t => t.key === activeTab)?.icon}</div>
                        <div style={{ fontSize: '18px', fontWeight: 900, color: 'var(--text)', marginBottom: '8px' }}>No {activeTab} available</div>
                        <div style={{ fontSize: '13px', color: 'var(--muted)', fontWeight: 500 }}>Currently there are no {activeTab} assigned to this organization.</div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default OrgShowPage;
