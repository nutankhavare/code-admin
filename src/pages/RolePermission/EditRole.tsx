import React, { useState } from "react";
import { ChevronLeft } from "lucide-react";
import { useNavigate, useParams } from "react-router-dom";
import "./RolePermission.css";
import { ALL_PERMISSIONS, type Role } from "./types";
interface EditRoleProps {
  roles: Role[];
  onEdit: (id: number, updated: Omit<Role, "id" | "createdAt">) => void;
}

const EditRole: React.FC<EditRoleProps> = ({ roles, onEdit }) => {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const role = roles.find((r) => r.id === Number(id));

  const [roleName, setRoleName] = useState(role?.name || "");
  const [selected, setSelected] = useState<string[]>(role?.permissions || []);
  const [error, setError] = useState("");

  if (!role)
    return (
      <div className="page-container">
        <p>
          Role not found.{" "}
          <button
            className="btn btn--back"
            onClick={() => navigate("/roles-permissions")}
          >
            ← Back
          </button>
        </p>
      </div>
    );

  const togglePermission = (perm: string) => {
    setSelected((prev) =>
      prev.includes(perm) ? prev.filter((p) => p !== perm) : [...prev, perm],
    );
  };

  const selectAll = () => {
    setSelected(
      selected.length === ALL_PERMISSIONS.length ? [] : [...ALL_PERMISSIONS],
    );
  };

  const handleSave = () => {
    if (!roleName.trim()) {
      setError("Role name is required");
      return;
    }
    onEdit(role.id, {
      name: roleName.trim().toUpperCase(),
      permissions: selected,
    });
    navigate("/roles-permissions");
  };

  return (
    <div className="page-container">
      <div className="page-header-bar">
        <div className="breadcrumb-container">
          <button className="breadcrumb-link" onClick={() => navigate("/roles-permissions")}>Roles &amp; Permissions</button>
          <span className="breadcrumb-sep">›</span>
          <span className="breadcrumb-current">Edit: {role.name}</span>
        </div>
        <button className="btn btn--back" onClick={() => navigate("/roles-permissions")}>
          <ChevronLeft size={16} /> Back
        </button>
      </div>

      <div className="rp-form-wrapper">
        <div className="rp-form-card">
          <div className="rp-form-header">
            <span className="rp-form-icon">✏️</span>
            <span>EDIT ROLE</span>
          </div>

          <div className="rp-section">
            <div className="rp-section-title">
              <span className="rp-section-icon" style={{ color: "#ef4444" }}>
                🛡️
              </span>
              ROLE INFORMATION
            </div>
            <div className="rp-section-body">
              <div className="form-group">
                <label className="form-label">
                  ROLE NAME <span style={{ color: "#ef4444" }}>*</span>
                </label>
                <input
                  className={`form-input ${error ? "input-error" : ""}`}
                  placeholder="e.g. Content Manager"
                  value={roleName}
                  onChange={(e) => {
                    setRoleName(e.target.value);
                    setError("");
                  }}
                />
                {error && <div className="input-error-msg">{error}</div>}
                <div className="input-hint">
                  Use a descriptive name. This will be displayed in user
                  profiles.
                </div>
              </div>
            </div>
          </div>

          <div className="rp-section">
            <div
              className="rp-section-title"
              style={{ justifyContent: "space-between" }}
            >
              <div
                style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}
              >
                <span className="rp-section-icon" style={{ color: "#f59e0b" }}>
                  🔑
                </span>
                PERMISSIONS
              </div>
              <button className="rp-select-all-btn" onClick={selectAll}>
                {selected.length === ALL_PERMISSIONS.length
                  ? "DESELECT ALL"
                  : "SELECT ALL"}
              </button>
            </div>
            <div className="rp-section-body">
              <div className="rp-perms-grid">
                {ALL_PERMISSIONS.map((perm) => (
                  <label key={perm} className="rp-perm-checkbox">
                    <input
                      type="checkbox"
                      checked={selected.includes(perm)}
                      onChange={() => togglePermission(perm)}
                    />
                    <span className="rp-perm-label">
                      {perm.replace(/_/g, " ")}
                    </span>
                  </label>
                ))}
              </div>
            </div>
          </div>

          <div className="rp-form-footer">
            <button className="btn rp-save-btn" onClick={handleSave}>
              💾 UPDATE ROLE
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditRole;
