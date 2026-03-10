import React, { useState } from "react";
import { ChevronLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";
import "./Beacon.css";

const AddBeaconDevice: React.FC = () => {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    deviceId: "",
    name: "",
    macAddress: "",
    organisation: "",
    battery: "",
    status: "Online",
    description: "",
  });

  const [error, setError] = useState("");

  const handleChange = (e: any) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setError("");
  };

  const handleSave = (e: any) => {
    e.preventDefault();

    if (!form.deviceId || !form.name || !form.macAddress) {
      setError("Device ID, Name and MAC Address are required");
      return;
    }

    console.log("Beacon Device Added:", form);

    navigate("/masters/beacon-devices");
  };

  const handleReset = () => {
    setForm({
      deviceId: "",
      name: "",
      macAddress: "",
      organisation: "",
      battery: "",
      status: "Online",
      description: "",
    });
    setError("");
  };

  return (
    <div className="page-container">

      <div className="page-header-bar">
        <div className="breadcrumb-container">
          <button className="breadcrumb-link" onClick={() => navigate("/masters/beacon-devices")}>Beacon Devices</button>
          <span className="breadcrumb-sep">›</span>
          <span className="breadcrumb-current">Add New Device</span>
        </div>
        <button
          className="btn btn--back"
          onClick={() => navigate("/masters/beacon-devices")}
        >
          <ChevronLeft size={16} /> Back
        </button>
      </div>

      <div className="bd-form-wrapper">
        <div className="bd-form-card">

          <div className="bd-form-header">
            <span className="bd-form-icon">📡</span>
            <span>ADD BEACON DEVICE</span>
          </div>

          <form onSubmit={handleSave}>

            {/* DEVICE INFORMATION */}
            <div className="bd-section">
              <div className="bd-section-title">
                <span className="bd-section-icon" style={{ color: "#ef4444" }}>
                  📋
                </span>
                DEVICE INFORMATION
              </div>

              <div className="bd-section-body">

                <div className="form-group">
                  <label className="form-label">
                    DEVICE ID <span style={{ color: "#ef4444" }}>*</span>
                  </label>
                  <input
                    className={`form-input ${error ? "input-error" : ""}`}
                    name="deviceId"
                    value={form.deviceId}
                    onChange={handleChange}
                    placeholder="e.g. BCN-1001"
                  />
                </div>

                <div className="form-group">
                  <label className="form-label">
                    DEVICE NAME <span style={{ color: "#ef4444" }}>*</span>
                  </label>
                  <input
                    className="form-input"
                    name="name"
                    value={form.name}
                    onChange={handleChange}
                    placeholder="e.g. Beacon 1"
                  />
                </div>

                <div className="form-group">
                  <label className="form-label">
                    MAC ADDRESS <span style={{ color: "#ef4444" }}>*</span>
                  </label>
                  <input
                    className="form-input"
                    name="macAddress"
                    value={form.macAddress}
                    onChange={handleChange}
                    placeholder="AA:BB:CC:DD:EE:FF"
                  />
                </div>

              </div>
            </div>

            {/* DEVICE DETAILS */}
            <div className="bd-section">
              <div className="bd-section-title">
                <span className="bd-section-icon" style={{ color: "#f59e0b" }}>
                  ⚙️
                </span>
                DEVICE DETAILS
              </div>

              <div className="bd-section-body">

                <div className="form-group">
                  <label className="form-label">ORGANISATION</label>
                  <input
                    className="form-input"
                    name="organisation"
                    value={form.organisation}
                    onChange={handleChange}
                    placeholder="Organisation Name"
                  />
                </div>

                <div className="form-group">
                  <label className="form-label">BATTERY LEVEL (%)</label>
                  <input
                    className="form-input"
                    type="number"
                    name="battery"
                    value={form.battery}
                    onChange={handleChange}
                    placeholder="100"
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
                    <option>Online</option>
                    <option>Offline</option>
                    <option>Low Battery</option>
                  </select>
                </div>

                <div className="form-group">
                  <label className="form-label">DESCRIPTION</label>
                  <textarea
                    className="form-input"
                    name="description"
                    rows={3}
                    value={form.description}
                    onChange={handleChange}
                    placeholder="Additional notes..."
                  />
                </div>

              </div>
            </div>

            {error && <div className="input-error-msg">{error}</div>}

            {/* FOOTER */}
            <div className="bd-form-footer">

              <button
                type="button"
                className="btn bd-cancel-btn"
                onClick={() => navigate("/masters/beacon-devices")}
              >
                ❌ CANCEL
              </button>

              <button
                type="button"
                className="btn btn--outline"
                onClick={handleReset}
              >
                🔄 RESET
              </button>

              <button
                type="submit"
                className="btn bd-save-btn"
              >
                💾 SAVE DEVICE
              </button>

            </div>

          </form>

        </div>
      </div>
    </div>
  );
};

export default AddBeaconDevice;