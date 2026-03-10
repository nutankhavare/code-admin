import React, { useState } from "react";
import { ChevronLeft } from "lucide-react";
import { useNavigate, useParams } from "react-router-dom";
import { useAuth } from "../../Context/AuthContext";
import "./Organisation.css";
import "./OrgCreate.css";
import type { Organisation } from "./organisation.types";

interface OrgShowPageProps {
  organisations: Organisation[];
  onDelete: (id: number) => void;
}

type Tab =
  | "overview"
  | "staff"
  | "vehicles"
  | "beacons"
  | "gps"
  | "plans"
  | "travellers";

const TABS: { key: Tab; label: string; icon: string }[] = [
  { key: "overview", label: "Overview", icon: "🏢" },
  { key: "staff", label: "Staff", icon: "👥" },
  { key: "vehicles", label: "Vehicles", icon: "🚌" },
  { key: "beacons", label: "Beacons", icon: "📡" },
  { key: "gps", label: "GPS Devices", icon: "📍" },
  { key: "plans", label: "Plans", icon: "💳" },
  { key: "travellers", label: "Travellers", icon: "✈️" },
];

const OrgShowPage: React.FC<OrgShowPageProps> = ({
  organisations,
  onDelete,
}) => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const { id } = useParams<{ id: string }>();
  const org = organisations.find((o) => o.id === Number(id));
  const [activeTab, setActiveTab] = useState<Tab>("overview");
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  const handleDeleteClick = () => {
    if (user?.role !== "Super Admin") {
      alert("Only Super Admin can delete organisations.");
      return;
    }
    setShowDeleteModal(true);
  };

  const handleDeleteConfirm = () => {
    if (!org) return;
    onDelete(org.id);
    setShowDeleteModal(false);
    navigate("/Organisation");
  };

  if (!org) {
    return (
      <div className="page-container">
        <p style={{ color: "var(--text-secondary)" }}>
          Organisation not found.{" "}
          <button
            className="org-back-btn"
            onClick={() => navigate("/Organisation")}
          >
            ← Back
          </button>
        </p>
      </div>
    );
  }

  return (
    <div className="page-container">
      <div className="page-header-bar">
        <div className="breadcrumb-container">
          <button className="breadcrumb-link" onClick={() => navigate("/Organisation")}>Organisations</button>
          <span className="breadcrumb-sep">›</span>
          <span className="breadcrumb-current">{org.name}</span>
        </div>
        <button className="btn btn--back" onClick={() => navigate("/Organisation")}>
          <ChevronLeft size={16} /> Back
        </button>
      </div>

      {/* Header card */}
      <div className="org-show-header">
        <div className="org-show-identity">
          <div className="org-show-avatar">{org.name.charAt(0)}</div>
          <div>
            <div className="org-show-name">{org.name}</div>
            <div className="org-show-meta">
              <span className="org-type-badge">
                🏢 {org.type.replace(/_/g, " ")}
              </span>
              <span className="org-show-meta-item">
                📍 {org.city}, {org.state}
              </span>
              <span className="org-domain-tag">{org.domain}</span>
              <span
                className={`org-status-badge ${org.status === "Active" ? "org-status-active" : "org-status-inactive"}`}
              >
                {org.status}
              </span>
            </div>
          </div>
        </div>
        <button className="org-onboard-btn" onClick={handleDeleteClick}>
          🗑️ DELETE
        </button>
      </div>

      {/* Tabs */}
      <div className="org-tabs-bar">
        {TABS.map((tab) => (
          <button
            key={tab.key}
            className={`org-tab-btn ${activeTab === tab.key ? "active" : ""}`}
            onClick={() => setActiveTab(tab.key)}
          >
            {tab.icon} {tab.label}
          </button>
        ))}
      </div>

      {/* Tab Content */}
      <div className="org-tab-content">
        {activeTab === "overview" && <OverviewTab org={org} />}
        {activeTab === "staff" && <EmptyTab icon="👥" label="Staff" />}
        {activeTab === "vehicles" && <EmptyTab icon="🚌" label="Vehicles" />}
        {activeTab === "beacons" && <EmptyTab icon="📡" label="Beacons" />}
        {activeTab === "gps" && <EmptyTab icon="📍" label="GPS Devices" />}
        {activeTab === "plans" && <EmptyTab icon="💳" label="Plans" />}
        {activeTab === "travellers" && (
          <EmptyTab icon="✈️" label="Travellers" />
        )}
      </div>

      {/* Delete Confirmation Modal */}
      {showDeleteModal && (
        <div
          className="modal-overlay"
          onClick={() => setShowDeleteModal(false)}
        >
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h3>Delete Organisation</h3>
            </div>
            <div className="modal-body">
              <p>Are you sure you want to delete "{org.name}"?</p>
              <p
                style={{ color: "var(--text-secondary)", fontSize: "0.875rem" }}
              >
                This action cannot be undone.
              </p>
            </div>
            <div className="modal-footer">
              <button
                className="btn modal-cancel-btn"
                onClick={() => setShowDeleteModal(false)}
              >
                Cancel
              </button>
              <button
                className="btn modal-delete-btn"
                onClick={handleDeleteConfirm}
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

/* ---- Overview Tab ---- */
const OverviewTab: React.FC<{ org: Organisation }> = ({ org }) => (
  <div>
    {/* Quick Stats */}
    <div className="org-info-grid" style={{ marginBottom: "2rem" }}>
      <div className="org-info-item">
        <div className="org-info-label">Total Staff</div>
        <div
          className="org-info-value"
          style={{
            fontSize: "1.5rem",
            fontWeight: "bold",
            color: "var(--primary)",
          }}
        >
          0
        </div>
      </div>
      <div className="org-info-item">
        <div className="org-info-label">Active Vehicles</div>
        <div
          className="org-info-value"
          style={{
            fontSize: "1.5rem",
            fontWeight: "bold",
            color: "var(--primary)",
          }}
        >
          0
        </div>
      </div>
      <div className="org-info-item">
        <div className="org-info-label">GPS Devices</div>
        <div
          className="org-info-value"
          style={{
            fontSize: "1.5rem",
            fontWeight: "bold",
            color: "var(--primary)",
          }}
        >
          0
        </div>
      </div>
      <div className="org-info-item">
        <div className="org-info-label">Beacon Devices</div>
        <div
          className="org-info-value"
          style={{
            fontSize: "1.5rem",
            fontWeight: "bold",
            color: "var(--primary)",
          }}
        >
          0
        </div>
      </div>
    </div>

    <hr className="org-section-divider" />

    <div
      style={{
        fontWeight: 700,
        fontSize: "0.8rem",
        textTransform: "uppercase",
        letterSpacing: "0.06em",
        color: "var(--text-secondary)",
        marginBottom: "1rem",
      }}
    >
      Basic Information
    </div>
    <div className="org-info-grid">
      <InfoItem label="Organisation Name" value={org.name} />
      <InfoItem label="Type" value={org.type.replace(/_/g, " ")} />
      <InfoItem label="Registration Number" value={org.regNumber} mono />
      <InfoItem label="Domain" value={org.domain} mono />
      <InfoItem label="City" value={org.city} />
      <InfoItem label="State" value={org.state} />
      {org.email && <InfoItem label="Email" value={org.email} />}
      {org.phone && <InfoItem label="Phone" value={org.phone} />}
    </div>

    {org.address && (
      <>
        <hr className="org-section-divider" />
        <div
          style={{
            fontWeight: 700,
            fontSize: "0.8rem",
            textTransform: "uppercase",
            letterSpacing: "0.06em",
            color: "var(--text-secondary)",
            marginBottom: "1rem",
          }}
        >
          Address
        </div>
        <div className="org-info-item">
          <div className="org-info-label">Full Address</div>
          <div className="org-info-value">{org.address}</div>
        </div>
      </>
    )}

    <hr className="org-section-divider" />
    <div
      style={{
        fontWeight: 700,
        fontSize: "0.8rem",
        textTransform: "uppercase",
        letterSpacing: "0.06em",
        color: "var(--text-secondary)",
        marginBottom: "1rem",
      }}
    >
      Account Details
    </div>
    <div className="org-info-grid">
      <InfoItem label="Status" value={org.status} />
      <InfoItem label="Created At" value={org.createdAt} />
    </div>
  </div>
);

const InfoItem: React.FC<{ label: string; value: string; mono?: boolean }> = ({
  label,
  value,
  mono,
}) => (
  <div className="org-info-item">
    <div className="org-info-label">{label}</div>
    <div
      className="org-info-value"
      style={
        mono
          ? { fontFamily: "'JetBrains Mono', monospace", fontSize: "0.82rem" }
          : {}
      }
    >
      {value}
    </div>
  </div>
);

/* ---- Empty Tab placeholder ---- */
const EmptyTab: React.FC<{ icon: string; label: string }> = ({
  icon,
  label,
}) => (
  <div className="org-empty-tab">
    <div className="org-empty-tab-icon">{icon}</div>
    <div style={{ fontWeight: 600, marginBottom: "0.375rem" }}>
      No {label} yet
    </div>
    <div style={{ fontSize: "0.8rem" }}>
      {label} assigned to this organisation will appear here.
    </div>
  </div>
);

export default OrgShowPage;
