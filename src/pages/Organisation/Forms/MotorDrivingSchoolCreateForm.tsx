import { useEffect, useState } from 'react';
import { useFormContext, useWatch } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';

import FileInputField from '../../../Components/Form/FileInputField';
import InputField from '../../../Components/Form/InputField';
import SelectField from '../../../Components/Form/SelectField';

import { useAlert } from '../../../Context/AlertContext';
import adminApi from '../../../Services/apiservice';

import {
    FiFileText,
    FiMapPin,
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    FiUser,
    FiSettings,
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    FiAlignLeft,
    FiInfo,
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    FiBriefcase,
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    FiLock,
    FiFolder,
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    FiMap,
    FiPhone,
    FiCheckCircle,
} from 'react-icons/fi';

import type { FormDropdown, StateDistrict, MotorDrivingSchoolData } from '../organisation.types';
import type { Plan } from '../../Plan/plan.types';

import '../../Organisation/Organisation.css';

const MotorDrivingSchoolCreateForm = () => {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const navigate = useNavigate();

    const {
        register,
        control,
        setValue,
        formState: { errors },
    } = useFormContext<MotorDrivingSchoolData>();

    const { showAlert } = useAlert();

    const [plans, setPlans] = useState<Plan[]>([]);
    const [registrationTypes, setRegistrationTypes] = useState<FormDropdown[]>([]);
    const [states, setStates] = useState<StateDistrict[]>([]);
    const [districts, setDistricts] = useState<StateDistrict[]>([]);
    const [loading, setLoading] = useState(true);

    const selectedState = useWatch({ control, name: 'state' });

    useEffect(() => {
        setValue('consent_timestamp', new Date().toISOString());
    }, [setValue]);

    useEffect(() => {
        const fetchInitialData = async () => {
            try {
                const [plansRes, regTypesRes, statesRes] = await Promise.all([
                    adminApi.get('/plans-by-type?type=motor_driving_school'),
                    adminApi.get(
                        '/masters/forms/dropdowns/fields?type=motor_driving_school&field=registration_type'
                    ),
                    adminApi.get('/masters/forms/dropdowns/states'),
                ]);

                setPlans(plansRes.data.data || []);
                setRegistrationTypes(regTypesRes.data || []);
                setStates(statesRes.data || []);
            } catch {
                showAlert('Failed to load form data', 'error');
            } finally {
                setLoading(false);
            }
        };

        fetchInitialData();
    }, [showAlert]);

    useEffect(() => {
        const fetchDistricts = async () => {
            if (!selectedState) {
                setDistricts([]);
                setValue('district', '');
                return;
            }

            try {
                const res = await adminApi.get(
                    `/masters/forms/dropdowns/districts/${selectedState}`
                );
                setDistricts(res.data || []);
                setValue('district', '');
            } catch {
                setDistricts([]);
            }
        };

        fetchDistricts();
    }, [selectedState, setValue]);

    if (loading) return <div className="p-10 text-center">Loading...</div>;

    const uploadFields = [
        { label: 'RTO License Copy', name: 'license_certificate_doc' },
        { label: 'PAN Card', name: 'pan_card_doc' },
        { label: 'Registration Certificate', name: 'registration_certificate_doc' },
        { label: 'GST Certificate', name: 'gst_certificate_doc' },
        { label: 'UDYAM / MSME Certificate', name: 'udyam_msme_certificate_doc' },
        { label: 'Safety SOP', name: 'safety_sop_doc' },
        { label: 'Trainer Certification List', name: 'trainer_certification_list_doc' },
        { label: 'Vehicle Insurance Certificates', name: 'vehicle_insurance_doc' },
        { label: 'Vehicle Fitness Certificates', name: 'vehicle_fitness_doc' },
        { label: 'Driver Vetting Policy', name: 'driver_vetting_policy_doc' },
        { label: 'CCTV / Panic Button Policy', name: 'cctv_policy_doc' },
        { label: 'Subscription Agreement', name: 'subscription_agreement_doc' },
    ];

    return (
        <div className="rp-form-card rp-form-wide">
            {/* 0. Info Banner */}
            <div className="rp-section" style={{ borderBottom: 'none', paddingBottom: 0 }}>
                <div className="rp-section-body">
                    <div
                        style={{
                            background: '#eff6ff',
                            border: '1px solid #dbeafe',
                            padding: '1rem',
                            borderRadius: '12px',
                            display: 'flex',
                            gap: '0.75rem',
                            alignItems: 'flex-start',
                            marginBottom: '1rem',
                        }}
                    >
                        <FiInfo style={{ marginTop: '0.25rem', color: '#2563eb' }} />
                        <div>
                            <p
                                style={{
                                    fontSize: '0.75rem',
                                    fontWeight: 700,
                                    color: '#1e40af',
                                    textTransform: 'uppercase',
                                }}
                            >
                                Onboarding New MDS
                            </p>
                            <p
                                style={{
                                    fontSize: '0.72rem',
                                    color: '#3b82f6',
                                    textTransform: 'uppercase',
                                    marginTop: '0.125rem',
                                }}
                            >
                                Fill in all required fields marked with asterisk (*) to complete the
                                onboarding process.
                            </p>
                        </div>
                    </div>
                </div>
            </div>

            {/* 1. BASIC INFORMATION */}
            <div className="rp-section">
                <div className="rp-section-title">
                    <FiFileText className="rp-section-icon" style={{ color: '#6366f1' }} /> BASIC
                    INFORMATION
                </div>
                <div className="rp-section-body">
                    <div className="rp-grid-3">
                        <InputField
                            label="Driving School Name"
                            name="driving_school_name"
                            register={register}
                            errors={errors}
                            required
                        />
                        <InputField
                            label="License Number (RTO)"
                            name="license_number_rto"
                            register={register}
                            errors={errors}
                            required
                        />
                        <InputField
                            label="License Issue Date"
                            name="license_issue_date"
                            type="date"
                            register={register}
                            errors={errors}
                            required
                        />
                        <InputField
                            label="License Expiry Date"
                            name="license_expiry_date"
                            type="date"
                            register={register}
                            errors={errors}
                            required
                        />
                        <SelectField
                            label="Registration Type"
                            name="registration_type"
                            register={register}
                            errors={errors}
                            options={registrationTypes}
                            required
                        />
                        <InputField
                            label="Registration Number"
                            name="registration_number"
                            register={register}
                            errors={errors}
                            required
                        />
                        <InputField
                            label="PAN Number"
                            name="pan_number"
                            register={register}
                            errors={errors}
                            required
                        />
                        <InputField
                            label="GST Number"
                            name="gst_number"
                            register={register}
                            errors={errors}
                        />
                        <InputField
                            label="UDYAM / MSME Number"
                            name="udyam_msme_registration_no"
                            register={register}
                            errors={errors}
                        />
                        <SelectField
                            label="Subscription Plan"
                            name="subscription_plan"
                            register={register}
                            errors={errors}
                            options={plans.map((p) => ({ label: p.name, value: p.id }))}
                            required
                        />
                    </div>
                </div>
            </div>

            {/* 2. CONTACT DETAILS */}
            <div className="rp-section">
                <div className="rp-section-title">
                    <FiPhone className="rp-section-icon" style={{ color: '#f59e0b' }} /> CONTACT
                    DETAILS
                </div>
                <div className="rp-section-body">
                    <div className="rp-grid-3">
                        <InputField
                            label="Contact Person Name"
                            name="primary_person_name"
                            register={register}
                            errors={errors}
                            required
                        />
                        <InputField
                            label="Contact Mobile Number"
                            name="primary_person_phone_1"
                            register={register}
                            errors={errors}
                            required
                        />
                        <InputField
                            label="Contact Email"
                            name="primary_person_email"
                            type="email"
                            register={register}
                            errors={errors}
                            required
                        />
                        <InputField
                            label="Emergency Contact Name"
                            name="secondary_person_name"
                            register={register}
                            errors={errors}
                            required
                        />
                        <InputField
                            label="Emergency Contact Number"
                            name="secondary_person_phone_1"
                            register={register}
                            errors={errors}
                            required
                        />
                    </div>
                </div>
            </div>

            {/* 3. ADDRESS DETAILS */}
            <div className="rp-section">
                <div className="rp-section-title">
                    <FiMapPin className="rp-section-icon" style={{ color: '#ef4444' }} /> ADDRESS
                    DETAILS
                </div>
                <div className="rp-section-body">
                    <div className="rp-grid-3">
                        <InputField
                            label="Address Line 1"
                            name="address_line_1"
                            register={register}
                            errors={errors}
                            required
                        />
                        <InputField
                            label="Address Line 2"
                            name="address_line_2"
                            register={register}
                            errors={errors}
                        />
                        <InputField
                            label="Village / Locality"
                            name="landmark"
                            register={register}
                            errors={errors}
                            required
                        />
                        <SelectField
                            label="State"
                            name="state"
                            register={register}
                            errors={errors}
                            options={states.map((s) => ({ label: s.state, value: s.state }))}
                            required
                        />
                        <SelectField
                            label="District"
                            name="district"
                            register={register}
                            errors={errors}
                            options={districts.map((d) => ({
                                label: d.district,
                                value: d.district,
                            }))}
                            required
                        />
                        <InputField
                            label="City"
                            name="city"
                            register={register}
                            errors={errors}
                            required
                        />
                        <InputField
                            label="PIN Code"
                            name="pin_code"
                            register={register}
                            errors={errors}
                            required
                        />
                    </div>
                </div>
            </div>

            {/* 4. OPERATIONAL DETAILS */}
            <div className="rp-section">
                <div className="rp-section-title">
                    <FiSettings className="rp-section-icon" style={{ color: '#8b5cf6' }} />{' '}
                    OPERATIONAL & SAFETY MAPPING
                </div>
                <div className="rp-section-body">
                    <div className="rp-grid-3">
                        <InputField
                            label="Training Vehicles Count"
                            name="training_vehicle_count"
                            type="number"
                            register={register}
                            errors={errors}
                            required
                        />
                        <InputField
                            label="Trainers Count"
                            name="trainer_count"
                            type="number"
                            register={register}
                            errors={errors}
                            required
                        />
                        <InputField
                            label="Students Enrolled"
                            name="student_count"
                            type="number"
                            register={register}
                            errors={errors}
                            required
                        />
                        <InputField
                            label="GPS Devices Assigned"
                            name="number_of_gps"
                            type="number"
                            register={register}
                            errors={errors}
                            required
                        />
                        <InputField
                            label="Beacons Assigned"
                            name="number_of_beacons"
                            type="number"
                            register={register}
                            errors={errors}
                        />
                    </div>
                </div>
            </div>

            {/* 5. DOCUMENTS */}
            <div className="rp-section">
                <div className="rp-section-title">
                    <FiFolder className="rp-section-icon" style={{ color: '#f43f5e' }} /> DOCUMENTS
                </div>
                <div className="rp-section-body">
                    <div className="rp-grid-3">
                        {uploadFields.map((doc) => (
                            <div key={doc.name} className="rp-upload-box">
                                <div className="rp-upload-icon">⬆️</div>
                                <div className="rp-upload-label">{doc.label}</div>
                                <FileInputField
                                    label=""
                                    name={doc.name}
                                    register={register}
                                    errors={errors}
                                />
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* 6. REMARKS & CONSENT */}
            <div className="rp-section">
                <div className="rp-section-title">
                    <FiCheckCircle className="rp-section-icon" style={{ color: '#64748b' }} />{' '}
                    REMARKS & CONSENT
                </div>
                <div className="rp-section-body">
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                        <div className="rp-consent-box">
                            <label className="rp-consent-label">
                                <input
                                    type="checkbox"
                                    className="rp-consent-checkbox"
                                    // eslint-disable-next-line @typescript-eslint/no-explicit-any
                                    {...register('consent_checkbox' as any, {
                                        required: 'Consent is required',
                                    })}
                                />
                                I agree to VanLoka's safety and compliance onboarding rules and
                                policies
                            </label>
                            {errors.consent_checkbox && (
                                <div className="rp-consent-error">Consent is required!</div>
                            )}
                        </div>

                        <div>
                            <label
                                className="form-label"
                                style={{
                                    fontSize: '0.8rem',
                                    fontWeight: 700,
                                    color: '#475569',
                                    marginBottom: '0.5rem',
                                    display: 'block',
                                }}
                            >
                                REMARKS / NOTES
                            </label>
                            <textarea
                                className="form-input"
                                rows={3}
                                placeholder="Provide any additional notes or instructions..."
                                {...register('remarks')}
                            />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default MotorDrivingSchoolCreateForm;
