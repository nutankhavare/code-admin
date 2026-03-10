import React, { useState } from "react";
import { Eye, Pencil, Plus, Trash2 } from "lucide-react";
import { useNavigate } from "react-router-dom";
import DeleteRole from "./DeleteRole";
import "./RolePermission.css";
import type { Role } from "./types";
interface RolesPermissionsProps {
  roles: Role[];
  onDelete: (id: number) => void;
}

const RolesPermissions: React.FC<RolesPermissionsProps> = ({
  roles,
  onDelete,
}) => {
  const navigate = useNavigate();
  const [search, setSearch] = useState("");
  const [deleteTarget, setDeleteTarget] = useState<Role | null>(null);

  const filtered = roles.filter((r) =>
    r.name.toLowerCase().includes(search.toLowerCase()),
  );

  const handleDeleteConfirm = () => {
    if (deleteTarget) {
      onDelete(deleteTarget.id);
      setDeleteTarget(null);
    }
  };

  return (
    <div className="page-container">
      {deleteTarget && (
        <DeleteRole
          role={deleteTarget}
          onConfirm={handleDeleteConfirm}
          onCancel={() => setDeleteTarget(null)}
        />
      )}

      <div className="page-header-bar">
        <div className="breadcrumb-container">
          <span className="breadcrumb-current">ROLES & PERMISSIONS</span>
        </div>
        <button
          className="btn btn--header-add"
          onClick={() => navigate("/roles-permissions/add")}
        >
          <Plus size={16} /> Add Role
        </button>
      </div>

      <div className="rp-search-card card">
        <div className="rp-search-header">
          <span className="rp-search-icon">🔍</span>
          <span>SEARCH ROLES</span>
        </div>
        <div className="form-group" style={{ marginBottom: 0 }}>
          <label className="form-label">SEARCH BY NAME</label>
          <div style={{ position: "relative" }}>
            <span
              style={{
                position: "absolute",
                left: "0.75rem",
                top: "50%",
                transform: "translateY(-50%)",
                color: "#9ca3af",
              }}
            >
              🔍
            </span>
            <input
              className="form-input"
              style={{ paddingLeft: "2.25rem" }}
              placeholder="e.g. Manager, Admin..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
        </div>
      </div>

      <div className="rp-table-card">
        <table className="rp-table">
          <thead>
            <tr>
              <th>S.NO</th>
              <th>ROLE NAME</th>
              <th>ACTIONS</th>
            </tr>
          </thead>
          <tbody>
            {filtered.length === 0 ? (
              <tr>
                <td
                  colSpan={3}
                  style={{
                    textAlign: "center",
                    padding: "2rem",
                    color: "var(--text-secondary)",
                  }}
                >
                  No roles found
                </td>
              </tr>
            ) : (
              filtered.map((role, index) => (
                <tr key={role.id}>
                  <td>{index + 1}</td>
                  <td>
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "0.625rem",
                      }}
                    >
                      <span className="rp-role-avatar">👤</span>
                      <strong>{role.name}</strong>
                    </div>
                  </td>
                  <td>
                    <div className="rp-action-btns">
                      <button
                        className="action-btn action-btn--view"
                        title="View"
                        onClick={() =>
                          navigate(`/roles-permissions/view/${role.id}`)
                        }
                      >
                        <Eye size={15} />
                      </button>
                      <button
                        className="action-btn action-btn--edit"
                        title="Edit"
                        onClick={() =>
                          navigate(`/roles-permissions/edit/${role.id}`)
                        }
                      >
                        <Pencil size={15} />
                      </button>
                      <button
                        className="action-btn action-btn--delete"
                        title="Delete"
                        onClick={() => setDeleteTarget(role)}
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
  );
};

export default RolesPermissions;
