// src/components/Organisation/forms/OfficeEditForm.tsx
import { useState, useEffect, useRef } from "react";
import { useFormContext, useWatch } from "react-hook-form";

// Icons
import { FiBriefcase, FiFileText, FiMapPin, FiUser, FiSettings, FiAlignLeft, FiInfo } from "react-icons/fi";

// Components
import InputField from "../../../Components/Form/InputField";
import SelectField from "../../../Components/Form/SelectField";
import LoadingSpinner from "../../../Components/UI/LoadingSpinner.tsx";

// Services & Context
import adminApi from "../../../Services/apiservice";
import { useAlert } from "../../../Context/AlertContext";

// Types
import type { OfficeData, FormDropdown, StateDistrict } from "../organisation.types";
import type { Plan } from "../../Plan/plan.types";
import FileInputField from "../../../Components/Form/FileInputField";
import DaysCheckboxGroup from "../../../Components/Form/DaysCheckboxGroup";

interface OfficeEditFormProps {
  organisationData: OfficeData;
}

const OfficeEditForm = ({ organisationData }: OfficeEditFormProps) => {
  const {
    register,
    control,
    setValue,
    watch,
    getValues,
    reset,
    formState: { errors, isDirty }
  } = useFormContext<OfficeData>();

  const { showAlert } = useAlert();

  // Data State
  const [plans, setPlans] = useState<Plan[]>([]);
  const [organisationTypes, setOrganisationTypes] = useState<FormDropdown[]>([]);
  const [registrationTypes, setRegistrationTypes] = useState<FormDropdown[]>([]);
  const [states, setStates] = useState<StateDistrict[]>([]);
  const [statuses, setStatus] = useState<FormDropdown[]>([]);
  const [districts, setDistricts] = useState<StateDistrict[]>([]);
  const [loading, setLoading] = useState(true);
  const [optionsLoaded, setOptionsLoaded] = useState(false);

  // Refs
  const initialDistrictLoadedRef = useRef(false);

  // Watch for existing document paths
  const existingDocs = {
    pan_card_doc: watch("pan_card_doc"),
    gst_certificate_doc: watch("gst_certificate_doc"),
    registration_certificate_doc: watch("registration_certificate_doc"),
    udyam_msme_certificate_doc: watch("udyam_msme_certificate_doc"),
    transport_policy_doc: watch("transport_policy_doc"),
    safety_sop_doc: watch("safety_sop_doc"),
    vendor_policy_doc: watch("vendor_policy_doc"),
    driver_vetting_policy_doc: watch("driver_vetting_policy_doc"),
    insurance_certificate_doc: watch("insurance_certificate_doc"),
    subscription_agreement_doc: watch("subscription_agreement_doc"),
    additional_doc: watch("additional_doc"),
  };

  // 1. Fetch Dropdown Options
  useEffect(() => {
    const fetchInitialData = async () => {
      try {
        setLoading(true);
        const [
          plansRes,
          orgTypesRes,
          regTypesRes,
          statesRes,
          statusesRes
        ] = await Promise.all([
          adminApi.get("/plans-by-type?type=office"),
          adminApi.get(`/masters/forms/dropdowns/fields?type=office&field=organisation_type`),
          adminApi.get(`/masters/forms/dropdowns/fields?type=office&field=registration_type`),
          adminApi.get(`/masters/forms/dropdowns/states`),
          adminApi.get(`/masters/forms/dropdowns/fields?type=common&field=status`),

        ]);

        setPlans(plansRes.data.data || []);
        setOrganisationTypes(orgTypesRes.data || []);
        setRegistrationTypes(regTypesRes.data || []);
        setStates(statesRes.data || []);
        setStatus(statusesRes.data || []);

        setOptionsLoaded(true);
      } catch (error) {
        console.error("Error fetching form data:", error);
        showAlert("error", "Failed to load form data");
      } finally {
        setLoading(false);
      }
    };

    fetchInitialData();
  }, [showAlert]);

  // 2. Reset Form
  useEffect(() => {
    if (optionsLoaded && organisationData) {
      reset(organisationData);
    }
  }, [optionsLoaded, organisationData, reset]);

  // 3. Initial District Load

  useEffect(() => {
    const initializeForm = async () => {
      if (!optionsLoaded || !organisationData) return;

      const existingState = organisationData.state;

      // Load districts first if state exists
      if (existingState) {
        try {
          const response = await adminApi.get(`/masters/forms/dropdowns/districts/${existingState}`);
          setDistricts(response.data || []);
          initialDistrictLoadedRef.current = true;
        } catch (err) {
          showAlert("error", "Failed to load districts");
        }
      }

      // Then reset form with all data (including district)
      reset(organisationData);
    };

    initializeForm();
  }, [optionsLoaded, organisationData, reset, showAlert]);

  console.log('Organisation Data:', organisationData);

  // 4. District Cascade on Change
  const selectedState = useWatch({ control, name: "state" });

  useEffect(() => {
    const fetchDistricts = async () => {
      if (!selectedState) {
        setDistricts([]);
        setValue('district', "");
        return;
      }

      try {
        const response = await adminApi.get(`/masters/forms/dropdowns/districts/${selectedState}`);
        setDistricts(response.data || []);

        if (initialDistrictLoadedRef.current) {
          const currentDistrict = getValues("district");
          const districtExists = response.data?.some(
            (d: StateDistrict) => d.district === currentDistrict
          );
          if (!districtExists) {
            setValue('district', '');
          }
        }
      } catch (err) {
        setDistricts([]);
      }
    };

    if (optionsLoaded && selectedState) {
      fetchDistricts();
    }
  }, [selectedState, optionsLoaded, setValue, getValues]);

  if (loading) return <div className="p-10 flex justify-center"><LoadingSpinner /></div>;

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
              <p style={{ fontSize: "0.75rem", fontWeight: 700, color: "#1e40af", textTransform: "uppercase" }}>Editing Office Details</p>
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
          <FiBriefcase className="rp-section-icon" style={{ color: "#3b82f6" }} /> BASIC INFORMATION
        </div>
        <div className="rp-section-body">
          <div className="rp-grid-4">
            <InputField label="Organisation Name" name="organisation_name" register={register} errors={errors} required />

            <SelectField
              label="Organisation Type"
              name="organisation_type"
              register={register}
              errors={errors}
              options={organisationTypes.map(d => ({ label: d.value, value: d.value }))}
            />

            <SelectField
              label="Registration Type"
              name="registration_type"
              register={register}
              errors={errors}
              options={registrationTypes.map(d => ({ label: d.value, value: d.value }))}
              required
            />

            <InputField label="Registration No." name="registration_number" register={register} errors={errors} required />
            <InputField label="Registration Date" name="registration_date" type="date" register={register} errors={errors} required />
            <InputField label="UDYAM / MSME No." name="udyam_msme_registration_no" register={register} errors={errors} />
            <InputField label="GST Number" name="gst_number" register={register} errors={errors} />
            <InputField label="PAN Number" name="pan_number" register={register} errors={errors} />
            <InputField label="TAN Number" name="tan_number" register={register} errors={errors} />
            <InputField label="Email Address" name="organisation_email" register={register} errors={errors} required />
            <InputField label="Phone Number" name="organisation_phone" register={register} errors={errors} required />
            <InputField label="Website Domain" name="domain" register={register} errors={errors} placeholder="e.g. company-name" />

            <SelectField
              label="Subscription Plan"
              name="subscription_plan"
              register={register}
              errors={errors}
              options={plans.map(p => ({ label: p.name, value: p.id }))}
              required
            />

            <SelectField
              label="STATUS"
              name="status"
              register={register}
              errors={errors}
              options={statuses.map(p => ({ label: p.value, value: p.value }))}
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
            <InputField label="Employees" name="number_of_employees" type="number" register={register} errors={errors} />
            <InputField label="Vehicles" name="number_of_vehicles" type="number" register={register} errors={errors} />
            <InputField label="GPS Devices" name="number_of_gps" type="number" register={register} errors={errors} />
            <InputField label="Beacons" name="number_of_beacons" type="number" register={register} errors={errors} />
            <InputField label="Shifts" name="shifts" type="number" register={register} errors={errors} />
            <InputField label="Branches" name="units_branches" type="number" register={register} errors={errors} />
            <InputField label="Working Hours" name="working_hours" type="number" register={register} errors={errors} />
            <div style={{ gridColumn: "span 4" }}>
              <DaysCheckboxGroup
                name="working_days"
                control={control}
                errors={errors}
                label="Working Days"
              />
            </div>
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

            <SelectField
              label="State"
              name="state"
              register={register}
              errors={errors}
              options={states.map(s => ({ label: s.state, value: s.state }))}
              required
            />

            <SelectField
              label="District"
              name="district"
              register={register}
              errors={errors}
              options={districts.map(d => ({ label: d.district, value: d.district }))}
              disabled={!selectedState}
              required
            />

            <InputField label="City" name="city" register={register} errors={errors} required />
            <InputField label="Pincode" name="pin_code" register={register} errors={errors} required />
            <InputField label="Landmark" name="landmark" register={register} errors={errors} />
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
                <InputField label="Full Name" name="secondary_person_name" register={register} errors={errors} />
                <InputField label="Email" name="secondary_person_email" type="email" register={register} errors={errors} />
                <InputField label="Phone 1" name="secondary_person_phone_1" register={register} errors={errors} />
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
            <FileInputField label="GST Certificate" name="gst_certificate_doc" register={register} errors={errors} existingFile={typeof existingDocs.gst_certificate_doc === 'string' ? existingDocs.gst_certificate_doc : undefined} />
            <FileInputField label="PAN Card" name="pan_card_doc" register={register} errors={errors} existingFile={typeof existingDocs.pan_card_doc === 'string' ? existingDocs.pan_card_doc : undefined} />
            <FileInputField label="UDYAM / MSME Certificate" name="udyam_msme_certificate_doc" register={register} errors={errors} existingFile={typeof existingDocs.udyam_msme_certificate_doc === 'string' ? existingDocs.udyam_msme_certificate_doc : undefined} />
            <FileInputField label="Transport Policy" name="transport_policy_doc" register={register} errors={errors} existingFile={typeof existingDocs.transport_policy_doc === 'string' ? existingDocs.transport_policy_doc : undefined} />
            <FileInputField label="Safety SOP" name="safety_sop_doc" register={register} errors={errors} existingFile={typeof existingDocs.safety_sop_doc === 'string' ? existingDocs.safety_sop_doc : undefined} />
            <FileInputField label="Vendor Policy" name="vendor_policy_doc" register={register} errors={errors} existingFile={typeof existingDocs.vendor_policy_doc === 'string' ? existingDocs.vendor_policy_doc : undefined} />
            <FileInputField label="Driver Vetting" name="driver_vetting_policy_doc" register={register} errors={errors} existingFile={typeof existingDocs.driver_vetting_policy_doc === 'string' ? existingDocs.driver_vetting_policy_doc : undefined} />
            <FileInputField label="Insurance Certificate" name="insurance_certificate_doc" register={register} errors={errors} existingFile={typeof existingDocs.insurance_certificate_doc === 'string' ? existingDocs.insurance_certificate_doc : undefined} />
            <FileInputField label="Sub. Agreement" name="subscription_agreement_doc" register={register} errors={errors} existingFile={typeof existingDocs.subscription_agreement_doc === 'string' ? existingDocs.subscription_agreement_doc : undefined} />
            <FileInputField label="Additional Doc" name="additional_doc" register={register} errors={errors} existingFile={typeof existingDocs.additional_doc === 'string' ? existingDocs.additional_doc : undefined} />
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

export default OfficeEditForm;
