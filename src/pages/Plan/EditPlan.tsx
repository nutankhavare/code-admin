import React, { useState } from "react";
import { ChevronLeft } from "lucide-react";
import { useNavigate, useParams } from "react-router-dom";
import "./Plan.css";

const EditPlan: React.FC = () => {
  const navigate = useNavigate();
  const { id } = useParams();

  const [form, setForm] = useState({
    name: "Office Basic",
    type: "",
    status: "Active",
    trialDays: "10",
    description: "Office Basic Plan",
    priceMonthly: "99.00",
    priceYearly: "1000.00",
  });

  const [features, setFeatures] = useState<{ name: string; type: string; value: string;[key: string]: string }[]>([
    { name: "Admin Dashboard", type: "text", value: "1" },
    { name: "Roles Management", type: "text", value: "2" },
    { name: "Employee Management", type: "text", value: "20" },
    { name: "Vehicle Management", type: "text", value: "5" },
    { name: "Driver Management", type: "text", value: "5" },
    { name: "Reports", type: "text", value: "5" },
  ]);

  const [error, setError] = useState("");

  const handleChange = (e: any) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setError("");
  };

  const handleFeatureChange = (index: number, field: string, value: string) => {
    const updated = [...features];
    updated[index][field] = value;
    setFeatures(updated);
  };

  const addFeature = () => {
    setFeatures([...features, { name: "", type: "text", value: "" }]);
  };

  const removeFeature = (index: number) => {
    setFeatures(features.filter((_, i) => i !== index));
  };

  const handleSave = () => {
    if (!form.name.trim()) {
      setError("Plan name is required");
      return;
    }

    console.log({
      id,
      ...form,
      features,
    });

    navigate("/Plan");
  };

  return (
    <div className="page-container">

      <div className="page-header-bar">
        <div className="breadcrumb-container">
          <button className="breadcrumb-link" onClick={() => navigate("/Plan")}>Plans</button>
          <span className="breadcrumb-sep">›</span>
          <span className="breadcrumb-current">Edit Plan: {form.name}</span>
        </div>
        <button
          className="btn btn--back"
          onClick={() => navigate("/Plan")}
        >
          <ChevronLeft size={16} /> Back
        </button>
      </div>

      <div className="rp-form-wrapper">
        <div className="rp-form-card">

          {/* HEADER */}
          <div className="rp-form-header">
            <span className="rp-form-icon">✏️</span>
            <span>EDIT PLAN</span>
          </div>

          {/* PRICING */}
          <div className="rp-section">
            <div className="rp-section-title">
              <span className="rp-section-icon" style={{ color: "#10b981" }}>
                ₹
              </span>
              PRICING STRATEGY
            </div>

            <div className="rp-section-body">

              <div className="form-group">
                <label className="form-label">MONTHLY PRICE (₹)</label>
                <input
                  className="form-input"
                  name="priceMonthly"
                  value={form.priceMonthly}
                  onChange={handleChange}
                />
              </div>

              <div className="form-group">
                <label className="form-label">YEARLY PRICE (₹)</label>
                <input
                  className="form-input"
                  name="priceYearly"
                  value={form.priceYearly}
                  onChange={handleChange}
                />
              </div>

            </div>
          </div>

          {/* PLAN DETAILS */}
          <div className="rp-section">
            <div className="rp-section-title">
              <span className="rp-section-icon" style={{ color: "#ef4444" }}>
                📄
              </span>
              PLAN DETAILS
            </div>

            <div className="rp-section-body">

              <div className="form-group">
                <label className="form-label">
                  PLAN NAME <span style={{ color: "#ef4444" }}>*</span>
                </label>

                <input
                  className={`form-input ${error ? "input-error" : ""}`}
                  name="name"
                  value={form.name}
                  onChange={handleChange}
                />

                {error && <div className="input-error-msg">{error}</div>}
              </div>

              <div className="form-group">
                <label className="form-label">TYPE</label>

                <select
                  className="form-input"
                  name="type"
                  value={form.type}
                  onChange={handleChange}
                >
                  <option value="">Select</option>
                  <option value="office">Office</option>
                  <option value="institution">Institution</option>
                </select>
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
                </select>
              </div>

              <div className="form-group">
                <label className="form-label">TRIAL DAYS</label>

                <input
                  className="form-input"
                  name="trialDays"
                  value={form.trialDays}
                  onChange={handleChange}
                />
              </div>

              <div className="form-group">
                <label className="form-label">DESCRIPTION</label>

                <textarea
                  className="form-input"
                  rows={3}
                  name="description"
                  value={form.description}
                  onChange={handleChange}
                />
              </div>

            </div>
          </div>

          {/* FEATURES */}
          <div className="rp-section">
            <div className="rp-section-title">
              <span className="rp-section-icon" style={{ color: "#f59e0b" }}>
                ⭐
              </span>
              PLAN FEATURES
            </div>

            <div className="rp-section-body">

              {features.map((feature, index) => (
                <div
                  key={index}
                  style={{
                    display: "grid",
                    gridTemplateColumns: "1fr 120px 120px auto",
                    gap: "10px",
                    marginBottom: "10px",
                  }}
                >

                  <input
                    className="form-input"
                    value={feature.name}
                    onChange={(e) =>
                      handleFeatureChange(index, "name", e.target.value)
                    }
                  />

                  <input
                    className="form-input"
                    value={feature.type}
                    onChange={(e) =>
                      handleFeatureChange(index, "type", e.target.value)
                    }
                  />

                  <input
                    className="form-input"
                    value={feature.value}
                    onChange={(e) =>
                      handleFeatureChange(index, "value", e.target.value)
                    }
                  />

                  <button
                    className="btn btn--danger"
                    type="button"
                    onClick={() => removeFeature(index)}
                  >
                    Remove
                  </button>

                </div>
              ))}

              <button
                className="rp-select-all-btn"
                onClick={addFeature}
              >
                + ADD FEATURE
              </button>

            </div>
          </div>

          {/* FOOTER */}
          <div className="rp-form-footer">

            <button
              className="btn rp-cancel-btn"
              type="button"
              onClick={() => navigate("/Plan")}
            >
              ❌ CANCEL
            </button>

            <button
              className="btn btn--outline"
              type="reset"
              onClick={() => {
                setForm({
                  name: "",
                  type: "",
                  status: "Active",
                  trialDays: "",
                  description: "",
                  priceMonthly: "",
                  priceYearly: "",
                });

                setFeatures([{ name: "", type: "text", value: "" }]);
              }}
            >
              🔄 RESET
            </button>

            <button
              className="btn rp-save-btn"
              onClick={handleSave}
            >
              💾 UPDATE PLAN
            </button>

          </div>

        </div>
      </div>
    </div>
  );
};

export default EditPlan;