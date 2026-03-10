import React from "react";
import { ChevronLeft } from "lucide-react";
import { useNavigate, useParams } from "react-router-dom";
import "./Plan.css";

const ViewPlan: React.FC = () => {
  const navigate = useNavigate();
  const { id } = useParams();

  const plan = {
    id: 1,
    name: "Starter Plan",
    priceMonthly: "999",
    priceYearly: "9999",
    status: "Active",
    trialDays: "7",
    description: "Starter subscription plan",
    features: [
      "Basic Tracking",
      "Email Support",
      "5 GPS Devices",
      "Basic Reports",
    ],
  };

  return (
    <div className="page-container">
      <div className="page-header-bar">
        <div className="breadcrumb-container">
          <button className="breadcrumb-link" onClick={() => navigate("/Plan")}>Plans</button>
          <span className="breadcrumb-sep">›</span>
          <span className="breadcrumb-current">{plan.name}</span>
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
            <span className="rp-form-icon">👁️</span>
            <span>VIEW PLAN</span>
          </div>

          {/* PLAN INFORMATION */}
          <div className="rp-section">
            <div className="rp-section-title">
              <span className="rp-section-icon" style={{ color: "#ef4444" }}>
                📄
              </span>
              PLAN INFORMATION
            </div>

            <div className="rp-section-body">

              <div className="rp-view-row">
                <div className="rp-view-label">PLAN NAME</div>
                <div className="rp-view-value">
                  <span className="rp-role-chip">💳 {plan.name}</span>
                </div>
              </div>

              <div className="rp-view-row">
                <div className="rp-view-label">MONTHLY PRICE</div>
                <div className="rp-view-value">₹{plan.priceMonthly}</div>
              </div>

              <div className="rp-view-row">
                <div className="rp-view-label">YEARLY PRICE</div>
                <div className="rp-view-value">₹{plan.priceYearly}</div>
              </div>

              <div className="rp-view-row">
                <div className="rp-view-label">STATUS</div>
                <div className="rp-view-value">{plan.status}</div>
              </div>

              <div className="rp-view-row">
                <div className="rp-view-label">TRIAL DAYS</div>
                <div className="rp-view-value">{plan.trialDays}</div>
              </div>

              <div className="rp-view-row">
                <div className="rp-view-label">DESCRIPTION</div>
                <div className="rp-view-value">{plan.description}</div>
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

              {plan.features.length === 0 ? (
                <p
                  style={{
                    color: "var(--text-secondary)",
                    fontSize: "0.875rem",
                  }}
                >
                  No features added.
                </p>
              ) : (
                <div className="rp-perms-view-grid">
                  {plan.features.map((feature) => (
                    <div key={feature} className="rp-perm-tag">
                      ✓ {feature}
                    </div>
                  ))}
                </div>
              )}

            </div>
          </div>

          {/* FOOTER */}
          <div className="rp-form-footer">

            <button
              className="btn rp-cancel-btn"
              onClick={() => navigate("/Plan")}
            >
              ← BACK
            </button>

          </div>

        </div>
      </div>
    </div>
  );
};

export default ViewPlan;