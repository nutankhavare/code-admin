import React from "react";
import { ChevronLeft } from "lucide-react";
import { useNavigate, useParams } from "react-router-dom";
import "./Gps.css";

const ViewGpsDevice: React.FC = () => {
  const navigate = useNavigate();
  const { id } = useParams();

  return (
    <div className="page-container">
      <div className="page-header-bar">
        <div className="breadcrumb-container">
          <button className="breadcrumb-link" onClick={() => navigate("/masters/gps-devices")}>GPS Devices</button>
          <span className="breadcrumb-sep">›</span>
          <span className="breadcrumb-current">GPS-{id}</span>
        </div>
        <button
          className="btn btn--back"
          onClick={() => navigate("/masters/gps-devices")}
        >
          <ChevronLeft size={16} /> Back
        </button>
      </div>

      <div className="gd-form-wrapper">
        <div className="gd-form-card">
          <div className="gd-form-header">
            <span className="gd-form-icon">📍</span>
            <span>VIEW GPS DEVICE</span>
          </div>

          <div className="gd-section">
            <div className="gd-section-title">DEVICE INFORMATION</div>

            <div className="gd-section-body">
              <div className="gd-view-row">
                <div className="gd-view-label">DEVICE ID</div>
                <div className="gd-view-value">GPS-{id}</div>
              </div>

              <div className="gd-view-row">
                <div className="gd-view-label">MODEL</div>
                <div className="gd-view-value">Teltonika FMB920</div>
              </div>

              <div className="gd-view-row">
                <div className="gd-view-label">IMEI</div>
                <div className="gd-view-value">352094081234567</div>
              </div>

              <div className="gd-view-row">
                <div className="gd-view-label">ORGANISATION</div>
                <div className="gd-view-value">TechCorp</div>
              </div>

              <div className="gd-view-row">
                <div className="gd-view-label">ASSIGNED TO</div>
                <div className="gd-view-value">Vehicle 1</div>
              </div>
            </div>
          </div>

          <div className="gd-form-footer">
            <button
              className="btn btn--outline"
              onClick={() => navigate("/masters/gps-devices")}
            >
              Back
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ViewGpsDevice;
