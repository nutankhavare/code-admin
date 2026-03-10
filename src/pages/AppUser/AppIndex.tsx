import React, { useState } from 'react';
import './AppUsers.css';
import { Eye, Pencil, Trash2 } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import Pagination from '../../Components/Table/Pagination';
import Table, { type Column } from '../../Components/Table/Table';
import DeleteModal from '../../Components/UI/DeleteModal';
import { type AppUser, initialUsers } from './appuser.types';

const statusColors: Record<string, string> = {
    Active: '#10b981',
    Inactive: '#f59e0b',
    Blocked: '#ef4444',
};

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
            key: 'device',
            label: 'Device',
            render: (val) => (
                <span
                    className="status-badge"
                    style={{
                        background: val === 'Android' ? '#10b98120' : '#7c3aed20',
                        color: val === 'Android' ? '#10b981' : '#7c3aed',
                    }}
                >
                    {String(val)}
                </span>
            ),
        },

        { key: 'lastActive', label: 'Last Active' },

        {
            key: 'status',
            label: 'Status',
            render: (val) => (
                <span
                    className="status-badge"
                    style={{
                        background: statusColors[val as AppUser['status']] + '20',
                        color: statusColors[val as AppUser['status']],
                        border: `1px solid ${statusColors[val as AppUser['status']]}40`,
                    }}
                >
                    {String(val)}
                </span>
            ),
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
        <div className="page-container">
            {deleteTarget && (
                <DeleteModal
                    itemName={deleteTarget.name}
                    itemLabel="user"
                    onConfirm={handleDeleteConfirm}
                    onCancel={() => setDeleteTarget(null)}
                />
            )}

            <div className="page-header-bar">
                <div className="breadcrumb-container">
                    <span className="breadcrumb-current">APP USERS</span>
                </div>
            </div>

            <div className="card">
                <div className="table-toolbar">
                    <input
                        className="search-input"
                        placeholder="Search users..."
                        value={search}
                        onChange={(e) => {
                            setSearch(e.target.value);
                            setPage(1);
                        }}
                    />

                    <select
                        className="filter-select"
                        value={statusFilter}
                        onChange={(e) => {
                            setStatusFilter(e.target.value);
                            setPage(1);
                        }}
                    >
                        <option value="All">All Status</option>
                        <option value="Active">Active</option>
                        <option value="Inactive">Inactive</option>
                        <option value="Blocked">Blocked</option>
                    </select>
                </div>

                <Table columns={columns} data={paginated} />

                <Pagination
                    currentPage={page}
                    totalPages={Math.ceil(filtered.length / perPage)}
                    onPageChange={setPage}
                    totalItems={filtered.length}
                    itemsPerPage={perPage}
                />
            </div>
        </div>
    );
};

export default AppIndex;
