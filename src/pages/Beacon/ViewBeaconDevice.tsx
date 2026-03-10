import React from "react";
import { ChevronLeft } from "lucide-react";
import { useNavigate, useParams } from "react-router-dom";
import "./Beacon.css";

const ViewBeaconDevice: React.FC = () => {
  const navigate = useNavigate();
  const { id } = useParams();

  const device = {
    deviceId: `BCN-${id}`,
    name: `Beacon ${id}`,
    macAddress: "AA:BB:CC:DD:EE:FF",
    organisation: "TechCorp",
    battery: "80%",
    status: "Online",
    description: "Beacon device used for indoor tracking",
  };

  return (
    <div className="page-container">

      <div className="page-header-bar">
        <div className="breadcrumb-container">
          <button className="breadcrumb-link" onClick={() => navigate("/masters/beacon-devices")}>Beacon Devices</button>
          <span className="breadcrumb-sep">›</span>
          <span className="breadcrumb-current">{device.deviceId}</span>
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
            <span>BEACON DEVICE DETAILS</span>
          </div>

          {/* DEVICE INFO */}
          <div className="bd-section">
            <div className="bd-section-title">
              <span className="bd-section-icon" style={{ color: "#ef4444" }}>
                📋
              </span>
              DEVICE INFORMATION
            </div>

            <div className="bd-section-body">

              <div className="bd-view-row">
                <div className="bd-view-label">DEVICE ID</div>
                <div className="bd-view-value">{device.deviceId}</div>
              </div>

              <div className="bd-view-row">
                <div className="bd-view-label">DEVICE NAME</div>
                <div className="bd-view-value">{device.name}</div>
              </div>

              <div className="bd-view-row">
                <div className="bd-view-label">MAC ADDRESS</div>
                <div className="bd-view-value">{device.macAddress}</div>
              </div>

            </div>
          </div>

          {/* DEVICE STATUS */}
          <div className="bd-section">
            <div className="bd-section-title">
              <span className="bd-section-icon" style={{ color: "#f59e0b" }}>
                ⚙️
              </span>
              DEVICE STATUS
            </div>

            <div className="bd-section-body">

              <div className="bd-view-row">
                <div className="bd-view-label">ORGANISATION</div>
                <div className="bd-view-value">{device.organisation}</div>
              </div>

              <div className="bd-view-row">
                <div className="bd-view-label">BATTERY</div>
                <div className="bd-view-value">{device.battery}</div>
              </div>

              <div className="bd-view-row">
                <div className="bd-view-label">STATUS</div>
                <div className="bd-view-value">
                  <span className="bd-status-chip">{device.status}</span>
                </div>
              </div>

              <div className="bd-view-row">
                <div className="bd-view-label">DESCRIPTION</div>
                <div className="bd-view-value">{device.description}</div>
              </div>

            </div>
          </div>

          {/* FOOTER */}
          <div className="bd-form-footer">

            <button
              className="btn btn--outline"
              onClick={() => navigate("/masters/beacon-devices")}
            >
              BACK
            </button>

          </div>

        </div>
      </div>
    </div>
  );
};

export default ViewBeaconDevice;