import { useEffect } from 'react';
import { useFormContext, useWatch } from 'react-hook-form';

import FileInputField from '../../../Components/Form/FileInputField';
import InputField from '../../../Components/Form/InputField';
import SelectField from '../../../Components/Form/SelectField';

import {
    FiFileText,
    FiMapPin,
    FiSettings,
    FiInfo,
    FiFolder,
    FiPhone,
    FiCheckCircle,
} from 'react-icons/fi';

import type { MotorDrivingSchoolData } from '../organisation.types';

import '../../Organisation/Organisation.css';

// Hardcoded Dummy Data
const dummyPlans = [
    { label: 'Basic MDS Plan', value: '1' },
    { label: 'Pro MDS Plan', value: '2' },
];

const dummyRegistrationTypes = [
    { label: 'Sole Proprietorship', value: 'Sole Proprietorship' },
    { label: 'Partnership', value: 'Partnership' },
    { label: 'Private Limited', value: 'Private Limited' }
];

const dummyStates = [
    { state: 'Karnataka', district: '' },
    { state: 'Maharashtra', district: '' },
    { state: 'Delhi', district: '' },
    { state: 'Tamil Nadu', district: '' }
];

const dummyDistrictsMap: Record<string, {district: string}[]> = {
    'Karnataka': [{ district: 'Bangalore' }, { district: 'Mysore' }, { district: 'Hubli' }],
    'Maharashtra': [{ district: 'Mumbai' }, { district: 'Pune' }, { district: 'Nagpur' }],
    'Delhi': [{ district: 'North Delhi' }, { district: 'South Delhi' }, { district: 'New Delhi' }],
    'Tamil Nadu': [{ district: 'Chennai' }, { district: 'Coimbatore' }, { district: 'Madurai' }]
};

const MotorDrivingSchoolCreateForm = () => {
    const {
        register,
        control,
        setValue,
        formState: { errors },
    } = useFormContext<MotorDrivingSchoolData>();

    const selectedState = useWatch({ control, name: 'state' });

     // Handle District Reset on State Change
     useEffect(() => {
        setValue('district', '');
    }, [selectedState, setValue]);

    const currentDistricts = selectedState ? dummyDistrictsMap[selectedState] || [] : [];


    useEffect(() => {
        setValue('consent_timestamp', new Date().toISOString());
    }, [setValue]);


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
        <div className="org-section-body">
            {/* 0. Info Banner */}
            <div className="org-section" style={{ borderBottom: 'none', paddingBottom: 0 }}>
                <div className="org-section-body">
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
            <div className="org-section">
                <div className="org-section-title">
                    <FiFileText className="org-section-icon" style={{ color: '#6366f1' }} /> BASIC
                    INFORMATION
                </div>
                <div className="org-section-body">
                    <div className="form-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '1rem' }}>
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
                            options={dummyRegistrationTypes}
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
                            validation={{ pattern: { value: /^[A-Z]{5}[0-9]{4}[A-Z]{1}$/, message: 'Invalid PAN format' } }}
                        />
                        <InputField
                            label="GST Number"
                            name="gst_number"
                            register={register}
                            errors={errors}
                            validation={{ pattern: { value: /^[0-9]{2}[A-Z]{5}[0-9]{4}[A-Z]{1}[1-9A-Z]{1}Z[0-9A-Z]{1}$/, message: 'Invalid GST format' } }}
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
                            options={dummyPlans}
                            required
                        />
                    </div>
                </div>
            </div>

            {/* 2. CONTACT DETAILS */}
            <div className="org-section">
                <div className="org-section-title">
                    <FiPhone className="org-section-icon" style={{ color: '#f59e0b' }} /> CONTACT
                    DETAILS
                </div>
                <div className="org-section-body">
                    <div className="form-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '1rem' }}>
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
                            validation={{ pattern: { value: /^[0-9]{10}$/, message: 'Must be exactly 10 digits' } }}
                        />
                        <InputField
                            label="Contact Email"
                            name="primary_person_email"
                            type="email"
                            register={register}
                            errors={errors}
                            required
                            validation={{ pattern: { value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/, message: 'Invalid email address' } }}
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
                            validation={{ pattern: { value: /^[0-9]{10}$/, message: 'Must be exactly 10 digits' } }}
                        />
                    </div>
                </div>
            </div>

            {/* 3. ADDRESS DETAILS */}
            <div className="org-section">
                <div className="org-section-title">
                    <FiMapPin className="org-section-icon" style={{ color: '#ef4444' }} /> ADDRESS
                    DETAILS
                </div>
                <div className="org-section-body">
                    <div className="form-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '1rem' }}>
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
                            options={dummyStates.map((s) => ({ label: s.state, value: s.state }))}
                            required
                        />
                        <SelectField
                            label="District"
                            name="district"
                            register={register}
                            errors={errors}
                            options={currentDistricts.map((d) => ({
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
                            validation={{ pattern: { value: /^[0-9]{6}$/, message: 'Must be exactly 6 digits' } }}
                        />
                    </div>
                </div>
            </div>

            {/* 4. OPERATIONAL DETAILS */}
            <div className="org-section">
                <div className="org-section-title">
                    <FiSettings className="org-section-icon" style={{ color: '#8b5cf6' }} />{' '}
                    OPERATIONAL & SAFETY MAPPING
                </div>
                <div className="org-section-body">
                    <div className="form-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '1rem' }}>
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
            <div className="org-section">
                <div className="org-section-title">
                    <FiFolder className="org-section-icon" style={{ color: '#f43f5e' }} /> DOCUMENTS
                </div>
                <div className="org-section-body">
                    <div className="form-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '1rem' }}>
                        {uploadFields.map((doc) => (
                             <div key={doc.name} style={{
                                padding: '1rem',
                                border: '1px dashed #cbd5e1',
                                borderRadius: '8px',
                                textAlign: 'center',
                                background: '#f8fafc'
                            }}>
                                <div style={{ fontSize: '12px', fontWeight: 'bold', marginBottom: '8px' }}>{doc.label}</div>
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
            <div className="org-section">
                <div className="org-section-title">
                    <FiCheckCircle className="org-section-icon" style={{ color: '#64748b' }} />{' '}
                    REMARKS & CONSENT
                </div>
                <div className="org-section-body">
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                        <div style={{ 
                            background: '#f8fafc', 
                            padding: '1rem', 
                            borderRadius: '8px', 
                            border: '1px solid #e2e8f0',
                            display: 'flex', 
                            flexDirection: 'column', 
                            gap: '0.5rem' 
                        }}>
                            <label style={{
                                display: 'flex',
                                alignItems: 'center',
                                gap: '0.75rem',
                                cursor: 'pointer',
                                fontSize: '0.9rem',
                                color: '#334155'
                            }}>
                                <input
                                    type="checkbox"
                                    style={{
                                        width: '1.25rem',
                                        height: '1.25rem',
                                        accentColor: '#3b82f6',
                                        cursor: 'pointer'
                                    }}
                                    {...register('consent_checkbox' as any, {
                                        required: 'Consent is required',
                                    })}
                                />
                                I agree to VanLoka's safety and compliance onboarding rules and policies
                            </label>
                            {errors.consent_checkbox && (
                                <div style={{ color: '#ef4444', fontSize: '0.8rem', paddingLeft: '2rem' }}>Consent is required!</div>
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
