import React from "react";
import "./RolePermission.css";
import type { Role } from "./types";

interface DeleteRoleProps {
  role: Role;
  onConfirm: () => void;
  onCancel: () => void;
}

const DeleteRole: React.FC<DeleteRoleProps> = ({
  role,
  onConfirm,
  onCancel,
}) => {
  return (
    <div className="rp-modal-overlay" onClick={onCancel}>
      <div className="rp-modal-box" onClick={(e) => e.stopPropagation()}>
        <div className="rp-modal-icon">🗑️</div>
        <h2 className="rp-modal-title">Delete Role</h2>
        <p className="rp-modal-message">
          Are you sure you want to delete the role{" "}
          <strong>"{role.name}"</strong>?
          <br />
          <span style={{ color: "#ef4444", fontSize: "0.8rem" }}>
            This action cannot be undone.
          </span>
        </p>
        <div className="rp-modal-actions">
          <button className="btn btn--outline" onClick={onCancel}>
            Cancel
          </button>
          <button className="btn btn--danger" onClick={onConfirm}>
            Delete
          </button>
        </div>
      </div>
    </div>
  );
};

export default DeleteRole;
