import React, { useState } from 'react';
import { Pencil, Plus, Trash2 } from 'lucide-react';
import Table, { type Column } from '../../Components/Table/Table';
import Pagination from '../../Components/Table/Pagination';

interface Staff {
    id: number;
    name: string;
    email: string;
    phone: string;
    role: string;
    department: string;
    status: 'Active' | 'Inactive';
    joinedDate: string;
}

const mockStaff: Staff[] = Array.from({ length: 20 }, (_, i) => ({
    id: i + 1,
    name:
        ['Arjun Verma', 'Kavya Nair', 'Rohan Das', 'Meena Iyer', 'Suresh Pillai'][i % 5] +
        ` ${i + 1}`,
    email: `staff${i + 1}@vanloka.com`,
    phone: `+91 ${9600000000 + i}`,
    role: ['Admin', 'Manager', 'Staff', 'Viewer', 'Manager'][i % 5],
    department: ['Operations', 'Tech', 'Support', 'Finance', 'HR'][i % 5],
    status: (i % 4 === 0 ? 'Inactive' : 'Active') as Staff['status'],
    joinedDate: new Date(2023, i % 12, (i % 28) + 1).toLocaleDateString('en-IN'),
}));

const Staffs: React.FC = () => {
    const [search, setSearch] = useState('');
    const [page, setPage] = useState(1);
    const perPage = 10;
    const filtered = mockStaff.filter(
        (s) =>
            s.name.toLowerCase().includes(search.toLowerCase()) ||
            s.role.toLowerCase().includes(search.toLowerCase())
    );
    const paginated = filtered.slice((page - 1) * perPage, page * perPage);

    const columns: Column<Staff>[] = [
        { key: 'id', label: '#', width: '60px' },
        { key: 'name', label: 'Name' },
        { key: 'email', label: 'Email' },
        { key: 'phone', label: 'Phone' },
        {
            key: 'role',
            label: 'Role',
            render: (val) => (
                <span
                    className="status-badge"
                    style={{ background: '#7c3aed20', color: '#7c3aed' }}
                >
                    {String(val)}
                </span>
            ),
        },
        { key: 'department', label: 'Department' },
        {
            key: 'status',
            label: 'Status',
            render: (val) => (
                <span
                    className="status-badge"
                    style={{
                        background: val === 'Active' ? '#10b98120' : '#ef444420',
                        color: val === 'Active' ? '#10b981' : '#ef4444',
                    }}
                >
                    {String(val)}
                </span>
            ),
        },
        { key: 'joinedDate', label: 'Joined' },
        {
            key: 'actions',
            label: 'Actions',
            render: () => (
                <div className="table-actions">
                    <button className="action-btn action-btn--edit" title="Edit">
                        <Pencil size={15} />
                    </button>
                    <button className="action-btn action-btn--delete" title="Remove">
                        <Trash2 size={15} />
                    </button>
                </div>
            ),
        },
    ];

    return (
        <div className="page-container">
            <div className="page-header-bar">
                <div className="breadcrumb-container">
                    <span className="breadcrumb-current">STAFF MANAGEMENT</span>
                </div>
                <button className="btn btn--header-add">
                    <Plus size={16} /> Add Staff
                </button>
            </div>
            <div className="card">
                <div className="table-toolbar">
                    <input
                        className="search-input"
                        placeholder="Search staff..."
                        value={search}
                        onChange={(e) => {
                            setSearch(e.target.value);
                            setPage(1);
                        }}
                    />
                    <select className="filter-select">
                        <option>All Roles</option>
                        <option>Admin</option>
                        <option>Manager</option>
                        <option>Staff</option>
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

export default Staffs;
