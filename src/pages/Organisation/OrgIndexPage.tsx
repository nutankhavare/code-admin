import React, { useState } from 'react';
import { Eye, Pencil, Plus, Trash2 } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import './Organisation.css';
import DeleteModal from '../../Components/UI/DeleteModal';
import {
    initialOrganisations,
    ORG_TYPE_LABELS,
    ORG_TYPES,
    type Organisation,
    type OrgType,
} from './organisation.types';

const OrgIndexPage: React.FC = () => {
    const navigate = useNavigate();

    const [organisations, setOrganisations] = useState<Organisation[]>(initialOrganisations);

    const [deleteTarget, setDeleteTarget] = useState<Organisation | null>(null);
    const [search, setSearch] = useState('');
    const [typeFilter, setTypeFilter] = useState<'ALL' | OrgType>('ALL');

    const handleDeleteConfirm = () => {
        if (deleteTarget) {
            setOrganisations((prev) => prev.filter((o) => o.id !== deleteTarget.id));
            setDeleteTarget(null);
        }
    };

    const filtered = organisations.filter((org) => {
        const searchText = search.toLowerCase();

        const matchSearch =
            org.name.toLowerCase().includes(searchText) ||
            org.domain.toLowerCase().includes(searchText) ||
            org.regNumber.toLowerCase().includes(searchText);

        const matchType = typeFilter === 'ALL' || org.type === typeFilter;

        return matchSearch && matchType;
    });

    const deleteOrganisation = (org: Organisation) => {
        setDeleteTarget(org);
    };

    const counts = {
        OFFICE: organisations.filter(o => o.type === 'OFFICE').length,
        VENDOR: organisations.filter(o => o.type === 'VENDOR').length,
        INSTITUTION: organisations.filter(o => o.type === 'INSTITUTION').length,
        MOTOR_DRIVING_SCHOOL: organisations.filter(o => o.type === 'MOTOR_DRIVING_SCHOOL').length,
    };

    return (
        <div className="page-container">
            {deleteTarget && (
                <DeleteModal
                    itemName={deleteTarget.name}
                    itemLabel="organisation"
                    onConfirm={handleDeleteConfirm}
                    onCancel={() => setDeleteTarget(null)}
                />
            )}
            
            {/* HEADER */}
            <div className="page-header-bar">
                <div className="breadcrumb-container">
                    <span className="breadcrumb-current">ORGANISATION MANAGEMENT</span>
                </div>

                <div style={{ display: 'flex', gap: '0.5rem' }}>
                    <button
                        className="btn btn--header-add"
                        onClick={() => navigate('/Organisation/create')}
                    >
                        <Plus size={16} /> Onboard Organisation
                    </button>
                </div>
            </div>

            {/* SUMMARY CARDS */}
            <div style={{ 
                display: 'grid', 
                gridTemplateColumns: 'repeat(4, 1fr)', 
                gap: '20px', 
                marginBottom: '10px' 
            }}>
                {[
                    { label: 'Offices', count: counts.OFFICE, color: '#6366f1' },
                    { label: 'Vendors', count: counts.VENDOR, color: '#f59e0b' },
                    { label: 'Institutions', count: counts.INSTITUTION, color: '#ef4444' },
                    { label: 'MDS', count: counts.MOTOR_DRIVING_SCHOOL, color: '#10b981' }
                ].map((card) => (
                    <div key={card.label} className="card" style={{ 
                        padding: '24px', 
                        display: 'flex', 
                        flexDirection: 'column', 
                        alignItems: 'center', 
                        justifyContent: 'center',
                        position: 'relative',
                        overflow: 'hidden'
                    }}>
                        <div style={{ 
                            position: 'absolute', 
                            top: '-10px', 
                            right: '-10px', 
                            width: '40px', 
                            height: '40px', 
                            borderRadius: '50%', 
                            background: card.color + '15' 
                        }} />
                        <div style={{ fontSize: '12px', color: 'var(--muted)', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.05em' }}>{card.label}</div>
                        <div style={{ fontSize: '28px', fontWeight: 900, color: 'var(--text)', marginTop: '4px' }}>{card.count}</div>
                    </div>
                ))}
            </div>

            {/* TABLE SECTION */}
            <div className="card">
                <div style={{ 
                    padding: '16px 20px', 
                    borderBottom: '1px solid var(--border)',
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    gap: '12px',
                    background: '#f8fafc'
                }}>
                    <div style={{ position: 'relative', flex: 1, maxWidth: '400px' }}>
                        <input
                            style={{ 
                                width: '100%',
                                padding: '10px 14px',
                                borderRadius: '8px',
                                border: '1.5px solid var(--border)',
                                fontSize: '13px',
                                outline: 'none'
                            }}
                            placeholder="Search name, domain or reg number..."
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                        />
                    </div>

                    <select
                        style={{ 
                            padding: '10px 14px',
                            borderRadius: '8px',
                            border: '1.5px solid var(--border)',
                            fontSize: '13px',
                            outline: 'none',
                            background: 'white',
                            cursor: 'pointer'
                        }}
                        value={typeFilter}
                        onChange={(e) => setTypeFilter(e.target.value as 'ALL' | OrgType)}
                    >
                        <option value="ALL">All Types</option>
                        {ORG_TYPES.map((t) => (
                            <option key={t} value={t}>
                                {ORG_TYPE_LABELS[t]}
                            </option>
                        ))}
                    </select>
                </div>

                <div style={{ overflowX: 'auto' }}>
                    <table className="data-table">
                        <thead>
                            <tr>
                                <th style={{ width: '50px' }}>#</th>
                                <th>Organisation</th>
                                <th>Type</th>
                                <th>Domain</th>
                                <th>Registration</th>
                                <th>Status</th>
                                <th style={{ textAlign: 'right' }}>Actions</th>
                            </tr>
                        </thead>

                        <tbody>
                            {filtered.length === 0 ? (
                                <tr>
                                    <td colSpan={7} style={{ padding: '40px', textAlign: 'center', color: 'var(--muted)' }}>
                                        No organisations found matching your filters.
                                    </td>
                                </tr>
                            ) : (
                                filtered.map((org, index) => (
                                    <tr key={org.id}>
                                        <td>{index + 1}</td>

                                        <td>
                                            <div style={{ fontWeight: 800, color: 'var(--text)' }}>{org.name}</div>
                                            <div style={{ fontSize: '11px', color: 'var(--muted)', fontWeight: 600 }}>
                                                {org.city}, {org.state}
                                            </div>
                                        </td>

                                        <td>
                                            <span style={{ 
                                                fontSize: '10px', 
                                                fontWeight: 800, 
                                                padding: '4px 8px', 
                                                borderRadius: '6px',
                                                background: '#f1f5f9',
                                                color: '#475569',
                                                textTransform: 'uppercase'
                                            }}>
                                                {org.type.replace(/_/g, ' ')}
                                            </span>
                                        </td>

                                        <td>
                                            <span style={{ 
                                                fontSize: '12px', 
                                                fontWeight: 600, 
                                                color: 'var(--primary)',
                                                textDecoration: 'underline'
                                            }}>{org.domain}</span>
                                        </td>

                                        <td>
                                            <div style={{ fontSize: '12px', fontWeight: 600 }}>{org.regNumber}</div>
                                        </td>

                                        <td>
                                            <span
                                                className="status-badge"
                                                style={{
                                                    background: org.status === 'Active' ? '#10b98115' : '#ef444415',
                                                    color: org.status === 'Active' ? '#10b981' : '#ef4444',
                                                }}
                                            >
                                                {org.status}
                                            </span>
                                        </td>

                                        <td>
                                            <div className="table-actions" style={{ justifyContent: 'flex-end' }}>
                                                <button
                                                    className="action-btn action-btn--view"
                                                    title="View"
                                                    onClick={() => navigate(`/Organisation/view/${org.id}`)}
                                                >
                                                    <Eye size={15} />
                                                </button>

                                                <button
                                                    className="action-btn action-btn--edit"
                                                    title="Edit"
                                                    onClick={() => {
                                                        const typeRoute: Record<string, string> = {
                                                            OFFICE: 'office',
                                                            INSTITUTION: 'institution',
                                                            MOTOR_DRIVING_SCHOOL: 'mds',
                                                            VENDOR: 'vendor',
                                                        };
                                                        const route = typeRoute[org.type] ?? 'office';
                                                        navigate(`/Organisation/edit/${route}/${org.id}`);
                                                    }}
                                                >
                                                    <Pencil size={15} />
                                                </button>

                                                <button
                                                    className="action-btn action-btn--delete"
                                                    title="Delete"
                                                    onClick={() => deleteOrganisation(org)}
                                                >
                                                    <Trash2 size={15} />
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
    );
};

export default OrgIndexPage;
