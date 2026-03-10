import React, { useState } from "react";
import { ChevronLeft } from "lucide-react";
import { useNavigate, useParams } from "react-router-dom";
import "./AppUsers.css";
import { initialUsers } from "./appuser.types";

const EditUser: React.FC = () => {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();

  const user = initialUsers.find((u) => u.id === Number(id));

  const [form, setForm] = useState({
    name: user?.name || "",
    email: user?.email || "",
    phone: user?.phone || "",
    organisation: user?.organisation || "",
    status: user?.status || "Active",
  });

  const [error, setError] = useState("");

  if (!user) {
    return (
      <div className="page-container">
        <p>
          User not found{" "}
          <button
            className="btn btn--outline"
            onClick={() => navigate("/app-users")}
          >
            ← Back
          </button>
        </p>
      </div>
    );
  }

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setError("");
  };

  const handleReset = () => {
    setForm({
      name: user.name,
      email: user.email,
      phone: user.phone,
      organisation: user.organisation,
      status: user.status,
    });
  };

  const handleSave = () => {
    if (!form.name.trim() || !form.email.trim()) {
      setError("Name and Email are required");
      return;
    }

    console.log("Updated user:", form);

    navigate("/app-users");
  };

  return (
    <div className="page-container">
      <div className="page-header-bar">
        <div className="breadcrumb-container">
          <button className="breadcrumb-link" onClick={() => navigate("/app-users")}>App Users</button>
          <span className="breadcrumb-sep">›</span>
          <span className="breadcrumb-current">Edit: {form.name}</span>
        </div>
        <button className="btn btn--back" onClick={() => navigate("/app-users")}>
          <ChevronLeft size={16} /> Back
        </button>
      </div>

      <div className="au-form-wrapper">
        <div className="au-form-card">
          <div className="au-form-header">
            <span className="au-form-icon">✏️</span>
            <span>EDIT APP USER</span>
          </div>

          {/* User Information */}
          <div className="au-section">
            <div className="au-section-title">USER INFORMATION</div>

            <div className="au-section-body">
              <div className="form-group">
                <label className="form-label">
                  NAME <span style={{ color: "#ef4444" }}>*</span>
                </label>

                <input
                  className={`form-input ${error ? "input-error" : ""}`}
                  name="name"
                  value={form.name}
                  onChange={handleChange}
                />
              </div>

              <div className="form-group">
                <label className="form-label">
                  EMAIL <span style={{ color: "#ef4444" }}>*</span>
                </label>

                <input
                  className="form-input"
                  name="email"
                  value={form.email}
                  onChange={handleChange}
                />
              </div>

              <div className="form-group">
                <label className="form-label">PHONE</label>

                <input
                  className="form-input"
                  name="phone"
                  value={form.phone}
                  onChange={handleChange}
                />
              </div>

              <div className="form-group">
                <label className="form-label">ORGANISATION</label>

                <input
                  className="form-input"
                  name="organisation"
                  value={form.organisation}
                  onChange={handleChange}
                />
              </div>

              <div className="form-group">
                <label className="form-label">STATUS</label>

                <select
                  className="form-input"
                  name="status"
                  value={form.status}
                  onChange={handleChange}
                >
                  <option>Active</option>
                  <option>Inactive</option>
                  <option>Blocked</option>
                </select>
              </div>
            </div>
          </div>

          {error && <div className="input-error-msg">{error}</div>}

          {/* Footer Buttons */}
          <div className="au-form-footer">
            <button
              className="btn au-cancel-btn"
              onClick={() => navigate("/app-users")}
            >
              ❌ CANCEL
            </button>

            <button className="btn btn--outline" onClick={handleReset}>
              🔄 RESET
            </button>

            <button className="btn au-save-btn" onClick={handleSave}>
              💾 UPDATE USER
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditUser;
