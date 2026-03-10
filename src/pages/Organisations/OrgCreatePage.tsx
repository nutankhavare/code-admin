import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useForm, FormProvider } from "react-hook-form";
import {
  Building2,
  School,
  Car,
  Handshake,
  ChevronRight,
  ChevronLeft,
} from "lucide-react";
import "./Organisation.css";
import "./OrgCreate.css";
import { type OrgType, ORG_TYPE_LABELS } from "./organisation.types";

import OfficeCreateForm from "./Forms/OfficeCreateForm";
import InstitutionCreateForm from "./Forms/InstitutionCreateForm";
import MotorDrivingSchoolCreateForm from "./Forms/MotorDrivingSchoolCreateForm";
import VendorCreateForm from "./Forms/VendorCreateForm";

/* ── Type selection config ───────────────────────────── */
const ORG_OPTIONS: {
  type: OrgType;
  label: string;
  description: string;
  icon: React.ReactNode;
  color: string;
}[] = [
    {
      type: "OFFICE",
      label: "Office / Corporate",
      description: "Registered corporate office, company or business entity",
      icon: <Building2 size={32} />,
      color: "#7c3aed",
    },
    {
      type: "INSTITUTION",
      label: "Institution / School",
      description: "Educational institution, school, college or university",
      icon: <School size={32} />,
      color: "#0ea5e9",
    },
    {
      type: "MOTOR_DRIVING_SCHOOL",
      label: "Motor Driving School",
      description: "Registered MDS with RTO license number",
      icon: <Car size={32} />,
      color: "#10b981",
    },
    {
      type: "VENDOR",
      label: "Vendor / Supplier",
      description: "Third-party vendor, supplier or service provider",
      icon: <Handshake size={32} />,
      color: "#f59e0b",
    },
  ];

/* ─────────────────────────────────────────────────────── */
const OrgCreatePage: React.FC = () => {
  const navigate = useNavigate();
  const [step, setStep] = useState<1 | 2>(1);
  const [selectedType, setSelectedType] = useState<OrgType | null>(null);

  const methods = useForm({ mode: "onChange" });

  const handleSelectType = (type: OrgType) => {
    setSelectedType(type);
    methods.reset();
    setStep(2);
  };

  const handleSave = methods.handleSubmit((data) => {
    console.log("Organisation Saved:", { type: selectedType, ...data });
    navigate("/Organisation");
  });

  const selectedOption = ORG_OPTIONS.find((o) => o.type === selectedType);

  /* ──────────────────── STEP 1 ──────────────────────── */
  if (step === 1) {
    return (
      <div className="page-container">
        <div className="page-header-bar">
          <div className="breadcrumb-container">
            <button
              className="breadcrumb-link"
              onClick={() => navigate("/Organisation")}
            >
              Organisations
            </button>
            <span className="breadcrumb-sep">›</span>
            <span className="breadcrumb-current">Select Type</span>
          </div>
          <button
            className="btn btn--back"
            onClick={() => navigate("/Organisation")}
          >
            <ChevronLeft size={16} /> Back
          </button>
        </div>

        <div className="org-type-step">
          <div className="org-type-header">
            <h1 className="org-type-heading">
              What type of organisation are you onboarding?
            </h1>
            <p className="org-type-subheading">
              Select the category that best describes the organisation. You'll
              then fill in the relevant details.
            </p>
          </div>

          <div className="org-type-grid">
            {ORG_OPTIONS.map((opt) => (
              <button
                key={opt.type}
                className="org-type-card"
                style={{ "--card-color": opt.color } as React.CSSProperties}
                onClick={() => handleSelectType(opt.type)}
              >
                <div
                  className="org-type-icon"
                  style={{ color: opt.color, background: opt.color + "15" }}
                >
                  {opt.icon}
                </div>
                <div className="org-type-card-label">{opt.label}</div>
                <div className="org-type-card-desc">{opt.description}</div>
                <div className="org-type-card-arrow">
                  <ChevronRight size={20} color={opt.color} />
                </div>
              </button>
            ))}
          </div>
        </div>
      </div>
    );
  }

  /* ──────────────────── STEP 2 ──────────────────────── */
  return (
    <div className="page-container">
      {/* Breadcrumb + Back */}
      <div className="page-header-bar">
        <div className="breadcrumb-container">
          <button
            className="breadcrumb-link"
            onClick={() => navigate("/Organisation")}
          >
            Organisations
          </button>
          <span className="breadcrumb-sep">›</span>
          <button
            className="breadcrumb-link"
            onClick={() => setStep(1)}
          >
            Select Type
          </button>
          <span className="breadcrumb-sep">›</span>
          <span className="breadcrumb-current">
            {selectedOption?.label}
          </span>
        </div>
        <button className="btn btn--back" onClick={() => setStep(1)}>
          <ChevronLeft size={16} /> Back
        </button>
      </div>

      {/* Form header badge */}
      <div
        className="rp-form-header"
        style={{
          borderLeft: `4px solid ${selectedOption?.color}`,
          marginBottom: "1.5rem",
          borderRadius: "10px",
          background: "#fff",
          padding: "1rem 1.5rem",
          display: "flex",
          alignItems: "center",
          gap: "1rem",
          boxShadow: "0 1px 4px #e5e7eb",
        }}
      >
        <span
          className="rp-form-icon"
          style={{ color: selectedOption?.color }}
        >
          {selectedOption?.icon}
        </span>
        <div>
          <div style={{ fontWeight: 700, fontSize: "1rem" }}>
            CREATE {selectedType ? ORG_TYPE_LABELS[selectedType].toUpperCase() : ""}
          </div>
          <div style={{ fontSize: "0.72rem", opacity: 0.7 }}>
            {selectedOption?.description}
          </div>
        </div>
      </div>

      {/* Type-specific form wrapped in FormProvider */}
      <FormProvider {...methods}>
        <form onSubmit={handleSave}>
          {selectedType === "OFFICE" && <OfficeCreateForm />}
          {selectedType === "INSTITUTION" && <InstitutionCreateForm />}
          {selectedType === "MOTOR_DRIVING_SCHOOL" && (
            <MotorDrivingSchoolCreateForm />
          )}
          {selectedType === "VENDOR" && <VendorCreateForm />}

          {/* Footer buttons */}
          <div className="rp-form-footer" style={{ marginTop: "3rem" }}>
            <button
              type="button"
              className="btn btn--outline"
              onClick={() => setStep(1)}
              style={{ fontWeight: 700, letterSpacing: "0.05em" }}
            >
              ❌ CANCEL
            </button>
            <button
              type="button"
              className="btn btn--outline"
              onClick={() => methods.reset()}
              style={{ fontWeight: 700, letterSpacing: "0.05em" }}
            >
              🔄 RESET
            </button>
            <button
              type="submit"
              className="btn rp-save-btn"
              style={{
                background: selectedOption?.color || "#7c3aed",
                borderColor: selectedOption?.color || "#7c3aed",
                padding: "0.8rem 2.5rem",
                fontSize: "0.9rem",
              }}
            >
              💾 SAVE {selectedType ? ORG_TYPE_LABELS[selectedType].toUpperCase() : "ORGANISATION"}
            </button>
          </div>
        </form>
      </FormProvider>
    </div>
  );
};

export default OrgCreatePage;
