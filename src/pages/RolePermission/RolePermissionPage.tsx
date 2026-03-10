import React, { useState } from 'react';
import { Route, Routes } from 'react-router-dom';
import RolesPermissions from './RolePermission';
import AddRole from './AddRole';
import EditRole from './EditRole';
import ViewRole from './ViewRole';
import { initialRoles, type Role } from './types';

// This is the top-level wrapper that holds roles state and passes it to sub-pages
const RolePermissionPage: React.FC = () => {
    const [roles, setRoles] = useState<Role[]>(initialRoles);

    const handleAdd = (newRole: Omit<Role, 'id' | 'createdAt'>) => {
        const role: Role = {
            id: Date.now(),
            createdAt: new Date().toISOString().slice(0, 10),
            ...newRole,
        };
        setRoles((prev) => [...prev, role]);
    };

    const handleEdit = (id: number, updated: Omit<Role, 'id' | 'createdAt'>) => {
        setRoles((prev) => prev.map((r) => (r.id === id ? { ...r, ...updated } : r)));
    };

    const handleDelete = (id: number) => {
        setRoles((prev) => prev.filter((r) => r.id !== id));
    };

    return (
        <Routes>
            <Route path="/" element={<RolesPermissions roles={roles} onDelete={handleDelete} />} />
            <Route path="/add" element={<AddRole onAdd={handleAdd} />} />
            <Route path="/edit/:id" element={<EditRole roles={roles} onEdit={handleEdit} />} />
            <Route path="/view/:id" element={<ViewRole roles={roles} />} />
        </Routes>
    );
};

export default RolePermissionPage;
