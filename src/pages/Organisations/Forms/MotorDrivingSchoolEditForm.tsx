import { useFormContext } from "react-hook-form";
import InputField from "../../../Components/Form/InputField";
import SelectField from "../../../Components/Form/SelectField";
import type { MotorDrivingSchoolData } from "../organisation.types";
import { useEffect, useState } from "react";
import adminApi from "../../../Services/apiservice";
import type { Plan } from "../../Plan/plan.types";
import { useAlert } from "../../../Context/AlertContext";
import { FiBookOpen, FiFileText, FiMapPin, FiUser, FiSettings, FiAlignLeft, FiInfo } from "react-icons/fi";
import FileInputField from "../../../Components/Form/FileInputField";

const MotorDrivingSchoolEditForm = () => {
  const {
    register,
    formState: { errors, isDirty },
    watch,
  } = useFormContext<MotorDrivingSchoolData>();

  const [plans, setPlans] = useState<Plan[]>([]);
  const [loadingPlans, setLoadingPlans] = useState(true);
  const { showAlert } = useAlert();

  // Watch for existing document paths to show current files
  const existingDocs = {
    registration_certificate_doc: watch("registration_certificate_doc"),
    license_certificate_doc: watch("license_certificate_doc"),
    gst_certificate_doc: watch("gst_certificate_doc"),
    pan_card_doc: watch("pan_card_doc"),
    udyam_msme_certificate_doc: watch("udyam_msme_certificate_doc"),
    additional_doc: watch("additional_doc"),
  };

  // Fetch plans from backend
  useEffect(() => {
    const fetchPlans = async () => {
      try {
        setLoadingPlans(true);
        const response = await adminApi.get("/plans-by-type?type=motor_driving_school");
        setPlans(response.data.data || []);
      } catch (error) {
        console.error("Error fetching plans:", error);
        showAlert("error", "Failed to load subscription plans");
      } finally {
        setLoadingPlans(false);
      }
    };

    fetchPlans();
  }, [showAlert]);


  return (
    <div className="rp-form-card rp-form-wide">
      {/* 0. Info & Dirty State */}
      <div className="rp-section" style={{ borderBottom: "none", paddingBottom: 0 }}>
        <div className="rp-section-body">
          <div style={{
            background: "#eff6ff",
            border: "1px solid #dbeafe",
            padding: "1rem",
            borderRadius: "12px",
            display: "flex",
            gap: "0.75rem",
            alignItems: "flex-start",
            marginBottom: "1rem"
          }}>
            <FiInfo style={{ marginTop: "0.25rem", color: "#2563eb" }} />
            <div>
              <p style={{ fontSize: "0.75rem", fontWeight: 700, color: "#1e40af", textTransform: "uppercase" }}>Editing Driving School Details</p>
              <p style={{ fontSize: "0.72rem", color: "#3b82f6", textTransform: "uppercase", marginTop: "0.125rem" }}>Update fields as needed. Leave document uploads empty to keep existing files.</p>
            </div>
          </div>

          {isDirty && (
            <div style={{
              background: "#fffbeb",
              border: "1px solid #fef3c7",
              padding: "0.75rem 1rem",
              borderRadius: "10px",
              display: "flex",
              alignItems: "center",
              gap: "0.5rem",
              animation: "pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite"
            }}>
              <div style={{ width: "8px", height: "8px", background: "#f59e0b", borderRadius: "50%" }}></div>
              <span style={{ fontSize: "0.72rem", fontWeight: 700, color: "#92400e", textTransform: "uppercase" }}>You have unsaved changes</span>
            </div>
          )}
        </div>
      </div>

      {/* 1. Basic Information */}
      <div className="rp-section">
        <div className="rp-section-title">
          <FiBookOpen className="rp-section-icon" style={{ color: "#3b82f6" }} /> BASIC INFORMATION
        </div>
        <div className="rp-section-body">
          <div className="rp-grid-4">
            <InputField label="Driving School Name" name="driving_school_name" register={register} errors={errors} required />
            <InputField label="License No. (RTO)" name="license_number_rto" register={register} errors={errors} required />
            <InputField label="Issue Date" name="license_issue_date" type="date" register={register} errors={errors} required />
            <InputField label="Expiry Date" name="license_expiry_date" type="date" register={register} errors={errors} required />
            <InputField label="UDYAM / MSME No." name="udyam_msme_registration_no" register={register} errors={errors} />
            <InputField label="Registration Type" name="registration_type" register={register} errors={errors} required />
            <InputField label="Registration Number" name="registration_number" register={register} errors={errors} required />
            <InputField label="Registration Date" name="registration_date" type="date" register={register} errors={errors} required />
            <InputField label="PAN Number" name="pan_number" register={register} errors={errors} required />
            <InputField label="GST Number" name="gst_number" register={register} errors={errors} />
            <InputField label="Phone Number" name="driving_school_phone" register={register} errors={errors} required />
            <InputField label="Email Address" name="driving_school_email" register={register} errors={errors} required />
            <InputField label="Website Domain" name="domain" register={register} errors={errors} placeholder="e.g. herodrive" />

            <SelectField
              label="Subscription Plan"
              name="subscription_plan"
              register={register}
              errors={errors}
              options={plans.map(p => ({ label: p.name, value: p.id }))}
              placeholder="Select Plan"
              required
            />
          </div>
        </div>
      </div>

      {/* 2. Operational Details */}
      <div className="rp-section">
        <div className="rp-section-title">
          <FiSettings className="rp-section-icon" style={{ color: "#64748b" }} /> OPERATIONAL METRICS
        </div>
        <div className="rp-section-body">
          <div className="rp-grid-4">
            <InputField label="Vehicles" name="number_of_vehicles" type="number" register={register} errors={errors} required />
            <InputField label="Trainers" name="number_of_trainers" type="number" register={register} errors={errors} required />
            <InputField label="Students" name="number_of_students" type="number" register={register} errors={errors} required />
            <InputField label="GPS Devices" name="number_of_gps" type="number" register={register} errors={errors} required />
            <InputField label="Beacons" name="number_of_beacons" type="number" register={register} errors={errors} />
            <InputField label="Working Hours" name="working_hours" type="number" register={register} errors={errors} />
            <InputField label="Units / Branches" name="units_branches" type="number" register={register} errors={errors} />
            <InputField label="Shifts" name="shifts" type="number" register={register} errors={errors} />
          </div>
        </div>
      </div>

      {/* 3. Address Details */}
      <div className="rp-section">
        <div className="rp-section-title">
          <FiMapPin className="rp-section-icon" style={{ color: "#ef4444" }} /> ADDRESS DETAILS
        </div>
        <div className="rp-section-body">
          <div className="rp-grid-3">
            <InputField label="Address Line 1" name="address_line_1" register={register} errors={errors} required />
            <InputField label="Address Line 2" name="address_line_2" register={register} errors={errors} />
            <InputField label="Landmark" name="landmark" register={register} errors={errors} />
            <InputField label="City" name="city" register={register} errors={errors} required />
            <InputField label="District" name="district" register={register} errors={errors} required />
            <InputField label="State" name="state" register={register} errors={errors} required />
            <InputField label="PIN Code" name="pin_code" register={register} errors={errors} required />
          </div>
        </div>
      </div>

      {/* 4. Contact Persons */}
      <div className="rp-section">
        <div className="rp-section-title">
          <FiUser className="rp-section-icon" style={{ color: "#6366f1" }} /> CONTACT PERSONS
        </div>
        <div className="rp-section-body">
          <div className="rp-grid-2" style={{ gap: "2.5rem" }}>
            {/* Primary Contact */}
            <div>
              <h4 style={{ fontSize: "0.7rem", fontWeight: 700, color: "#3b82f6", textTransform: "uppercase", borderBottom: "1px solid #dbeafe", paddingBottom: "0.5rem", marginBottom: "1rem" }}>Primary Contact</h4>
              <div className="rp-grid-2">
                <InputField label="Full Name" name="primary_person_name" register={register} errors={errors} required />
                <InputField label="Email" name="primary_person_email" type="email" register={register} errors={errors} required />
                <InputField label="Phone 1" name="primary_person_phone_1" register={register} errors={errors} required />
                <InputField label="Phone 2" name="primary_person_phone_2" register={register} errors={errors} />
              </div>
            </div>

            {/* Secondary Contact */}
            <div>
              <h4 style={{ fontSize: "0.7rem", fontWeight: 700, color: "#10b981", textTransform: "uppercase", borderBottom: "1px solid #d1fae5", paddingBottom: "0.5rem", marginBottom: "1rem" }}>Secondary Contact</h4>
              <div className="rp-grid-2">
                <InputField label="Full Name" name="secondary_person_name" register={register} errors={errors} required />
                <InputField label="Email" name="secondary_person_email" type="email" register={register} errors={errors} required />
                <InputField label="Phone 1" name="secondary_person_phone_1" register={register} errors={errors} required />
                <InputField label="Phone 2" name="secondary_person_phone_2" register={register} errors={errors} />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 5. Documents */}
      <div className="rp-section">
        <div className="rp-section-title">
          <FiFileText className="rp-section-icon" style={{ color: "#a855f7" }} /> UPDATE DOCUMENTS
        </div>
        <div className="rp-section-body">
          <div className="rp-grid-3">
            <FileInputField label="Registration Certificate" name="registration_certificate_doc" register={register} errors={errors} existingFile={typeof existingDocs.registration_certificate_doc === 'string' ? existingDocs.registration_certificate_doc : undefined} />
            <FileInputField label="RTO License Doc" name="license_certificate_doc" register={register} errors={errors} existingFile={typeof existingDocs.license_certificate_doc === 'string' ? existingDocs.license_certificate_doc : undefined} />
            <FileInputField label="GST Certificate" name="gst_certificate_doc" register={register} errors={errors} existingFile={typeof existingDocs.gst_certificate_doc === 'string' ? existingDocs.gst_certificate_doc : undefined} />
            <FileInputField label="PAN Card" name="pan_card_doc" register={register} errors={errors} existingFile={typeof existingDocs.pan_card_doc === 'string' ? existingDocs.pan_card_doc : undefined} />
            <FileInputField label="MSME Certificate" name="udyam_msme_certificate_doc" register={register} errors={errors} existingFile={typeof existingDocs.udyam_msme_certificate_doc === 'string' ? existingDocs.udyam_msme_certificate_doc : undefined} />
            <FileInputField label="Additional Document" name="additional_doc" register={register} errors={errors} existingFile={typeof existingDocs.additional_doc === 'string' ? existingDocs.additional_doc : undefined} />
          </div>
        </div>
      </div>

      {/* 6. Remarks */}
      <div className="rp-section">
        <div className="rp-section-title">
          <FiAlignLeft className="rp-section-icon" style={{ color: "#64748b" }} /> REMARKS
        </div>
        <div className="rp-section-body">
          <textarea
            {...register("remarks")}
            style={{
              width: "100%",
              maxWidth: "600px",
              padding: "0.75rem 1rem",
              border: "1.5px solid #e2e8f0",
              borderRadius: "10px",
              fontSize: "0.875rem",
              outline: "none",
              resize: "none",
              fontFamily: "inherit"
            }}
            rows={2}
            placeholder="Add any internal notes..."
          />
        </div>
      </div>
    </div>
  );
};

export default MotorDrivingSchoolEditForm;
