import React, { useState } from 'react';
import './AppUsers.css';
import { Eye, Pencil, Trash2 } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import Pagination from '../../Components/Table/Pagination';
import Table, { type Column } from '../../Components/Table/Table';
import ConfirmationModal from '../../Components/UI/ConfirmationModal';
import { type AppUser, initialUsers } from './appuser.types';
import { Badge } from '../../Components/UI/Badge';



const AppIndex: React.FC = () => {
    const navigate = useNavigate();

    const [users, setUsers] = useState<AppUser[]>(initialUsers);
    const [search, setSearch] = useState('');
    const [statusFilter, setStatusFilter] = useState('All');
    const [page, setPage] = useState(1);
    const [deleteTarget, setDeleteTarget] = useState<AppUser | null>(null);

    const perPage = 10;

    const handleDeleteConfirm = () => {
        if (deleteTarget) {
            setUsers((prev) => prev.filter((u) => u.id !== deleteTarget.id));
            setDeleteTarget(null);
        }
    };

    const filtered = users
        .filter(
            (u) =>
                u.name.toLowerCase().includes(search.toLowerCase()) ||
                u.email.toLowerCase().includes(search.toLowerCase())
        )
        .filter((u) => (statusFilter === 'All' ? true : u.status === statusFilter));

    const paginated = filtered.slice((page - 1) * perPage, page * perPage);

    const columns: Column<AppUser>[] = [
        { key: 'id', label: '#', width: '50px' },

        {
            key: 'name',
            label: 'User',
            render: (_, row) => (
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    <div
                        style={{
                            width: 32,
                            height: 32,
                            borderRadius: '50%',
                            background: '#6366f1',
                            color: '#fff',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            fontSize: '0.8rem',
                            fontWeight: 600,
                        }}
                    >
                        {row.name.charAt(0)}
                    </div>
                    <div>
                        <div style={{ fontWeight: 600 }}>{row.name}</div>
                        <div style={{ fontSize: '0.75rem', color: '#6b7280' }}>{row.email}</div>
                    </div>
                </div>
            ),
        },

        { key: 'phone', label: 'Phone' },

        { key: 'organisation', label: 'Organisation' },

        {
            key: 'orgType',
            label: 'Org Type',
            render: (val) => {
                const variantMap: Record<string, 'blue' | 'purple' | 'orange'> = {
                    'Office': 'blue',
                    'Institute': 'purple',
                    'Motor Driving School': 'orange'
                };
                return <Badge variant={variantMap[val as string] || 'slate'}>{String(val)}</Badge>;
            },
        },

        {
            key: 'device',
            label: 'Device',
            render: (val) => (
                <Badge variant={val === 'Android' ? 'green' : 'purple'}>
                    {String(val)}
                </Badge>
            ),
        },

        { key: 'lastActive', label: 'Last Active' },

        {
            key: 'status',
            label: 'Status',
            render: (val) => {
                const variantMap: Record<string, 'green' | 'amber' | 'red'> = {
                    'Active': 'green',
                    'Inactive': 'amber',
                    'Blocked': 'red'
                };
                return <Badge variant={variantMap[val as string] || 'slate'}>{String(val)}</Badge>;
            },
        },

        {
            key: 'actions',
            label: 'Actions',
            render: (_, row) => (
                <div className="table-actions">
                    <button
                        className="action-btn action-btn--view"
                        title="View"
                        onClick={() => navigate(`/app-users/view/${row.id}`)}
                    >
                        <Eye size={15} />
                    </button>

                    <button
                        className="action-btn action-btn--edit"
                        title="Edit"
                        onClick={() => navigate(`/app-users/edit/${row.id}`)}
                    >
                        <Pencil size={15} />
                    </button>

                    <button
                        className="action-btn action-btn--delete"
                        title="Delete"
                        onClick={() => setDeleteTarget(row)}
                    >
                        <Trash2 size={15} />
                    </button>
                </div>
            ),
        },
    ];

    return (
        <div className="page">
            <div className="page-header">
                <div className="breadcrumb">
                    APP <span>/ USERS</span>
                </div>
            </div>

            <div className="page-body">
                {deleteTarget && (
                    <ConfirmationModal
                        title="Delete User?"
                        message={`Are you sure you want to delete ${deleteTarget.name}? This action cannot be undone.`}
                        confirmLabel="Delete"
                        onConfirm={handleDeleteConfirm}
                        onCancel={() => setDeleteTarget(null)}
                        type="delete"
                    />
                )}

                <div className="card">
                    <div className="filter-bar">
                        <div style={{ position: 'relative', flex: 1, maxWidth: '400px' }}>
                            <input
                                className="search-input"
                                placeholder="Search users..."
                                value={search}
                                onChange={(e) => {
                                    setSearch(e.target.value);
                                    setPage(1);
                                }}
                                style={{ width: '100%' }}
                            />
                        </div>

                        <select
                            className="form-select"
                            value={statusFilter}
                            onChange={(e) => {
                                setStatusFilter(e.target.value);
                                setPage(1);
                            }}
                            style={{ width: 'auto' }}
                        >
                            <option value="All">All Status</option>
                            <option value="Active">Active</option>
                            <option value="Inactive">Inactive</option>
                            <option value="Blocked">Blocked</option>
                        </select>
                    </div>

                    <div className="table-card">
                        <Table columns={columns} data={paginated} />
                    </div>

                    <div className="table-footer">
                        <Pagination
                            currentPage={page}
                            totalPages={Math.ceil(filtered.length / perPage)}
                            onPageChange={setPage}
                            totalItems={filtered.length}
                            itemsPerPage={perPage}
                        />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AppIndex;