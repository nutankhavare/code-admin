import { useEffect } from 'react';
import { useFormContext, useWatch } from 'react-hook-form';

// Components
import FileInputField from '../../../Components/Form/FileInputField';
import InputField from '../../../Components/Form/InputField';
import SelectField from '../../../Components/Form/SelectField';

import {
    FiFileText,
    FiMapPin,
    FiUser,
    FiSettings,
    FiAlignLeft,
    FiInfo,
    FiLock,
    FiFolder,
} from 'react-icons/fi';

import type { InstitutionData } from '../organisation.types';

// Hardcoded Dummy Data
const dummyPlans = [
    { label: 'Basic', value: '1' },
    { label: 'Premium', value: '2' },
];

const dummyRegistrationTypes = [
    { label: 'Trust', value: 'Trust' },
    { label: 'Society', value: 'Society' },
    { label: 'Section 8 Company', value: 'Section 8 Company' }
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

const InstitutionCreateForm = () => {
    const {
        register,
        control,
        setValue,
        formState: { errors },
    } = useFormContext<InstitutionData>();

    // Watch State Selection
    const selectedState = useWatch({ control, name: 'state' });

     // Handle District Reset on State Change
     useEffect(() => {
        setValue('district', '');
    }, [selectedState, setValue]);

    const currentDistricts = selectedState ? dummyDistrictsMap[selectedState] || [] : [];


    const uploadFields = [
        { label: 'Registration Certificate', name: 'registration_certificate_doc' },
        { label: 'PAN Card', name: 'pan_card_doc' },
        {
            label: 'UDISE / College Code Proof',
            name: 'udise_code_college_code_doc',
        },
        { label: 'Transport Policy', name: 'transport_policy_doc' },
        { label: 'Safety SOP', name: 'safety_sop_doc' },
        { label: 'Insurance Certificate', name: 'insurance_certificate_doc' },
        { label: 'Vendor Policy', name: 'vendor_policy_doc' },
        { label: 'Driver Vetting Policy', name: 'driver_vetting_policy_doc' },
        { label: 'Subscription Agreement', name: 'subscription_agreement_doc' },
        { label: 'Additional Document', name: 'additional_doc' },
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
                                Onboarding New Institution
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

            {/* 1. Basic Information */}
            <div className="org-section">
                <div className="org-section-title">
                    <FiFileText className="org-section-icon" style={{ color: '#6366f1' }} /> BASIC
                    INFORMATION
                </div>
                <div className="org-section-body">
                    <div className="form-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '1rem' }}>
                        <InputField
                            label="Institution Name"
                            name="institution_name"
                            register={register}
                            errors={errors}
                            required
                        />
                        <InputField
                            label="Affiliation Board / University"
                            name="affiliation_board_university"
                            register={register}
                            errors={errors}
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
                            label="Registration Date"
                            name="registration_date"
                            type="date"
                            register={register}
                            errors={errors}
                            required
                        />
                        <InputField
                            label="UDISE Code / College Code"
                            name="udise_code_college_code"
                            register={register}
                            errors={errors}
                        />
                        <InputField
                            label="GST Number"
                            name="gst_number"
                            register={register}
                            errors={errors}
                            validation={{ pattern: { value: /^[0-9]{2}[A-Z]{5}[0-9]{4}[A-Z]{1}[1-9A-Z]{1}Z[0-9A-Z]{1}$/, message: 'Invalid GST format' } }}
                        />
                        <InputField
                            label="PAN Number"
                            name="pan_number"
                            register={register}
                            errors={errors}
                            validation={{ pattern: { value: /^[A-Z]{5}[0-9]{4}[A-Z]{1}$/, message: 'Invalid PAN format' } }}
                        />
                        <InputField
                            label="Institution Email"
                            name="institution_email"
                            type="email"
                            register={register}
                            errors={errors}
                            required
                            validation={{ pattern: { value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/, message: 'Invalid email address' } }}
                        />
                        <InputField
                            label="Institution Phone Number"
                            name="institution_phone"
                            register={register}
                            errors={errors}
                            required
                            validation={{ pattern: { value: /^[0-9]{10}$/, message: 'Must be exactly 10 digits' } }}
                        />
                        <InputField
                            label="Website Domain"
                            name="domain"
                            register={register}
                            errors={errors}
                            placeholder="e.g., greenvalley"
                        />
                        <SelectField
                            label="Subscription Plan"
                            name="subscription_plan"
                            register={register}
                            errors={errors}
                            options={dummyPlans}
                            placeholder="Select Plan"
                            required
                        />
                    </div>
                </div>
            </div>

            {/* 2. Operational Details */}
            <div className="org-section">
                <div className="org-section-title">
                    <FiSettings className="org-section-icon" style={{ color: '#f59e0b' }} />{' '}
                    OPERATIONAL DETAILS
                </div>
                <div className="org-section-body">
                    <div className="form-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '1rem' }}>
                        <InputField
                            label="Number of Students"
                            name="number_of_students"
                            type="number"
                            register={register}
                            errors={errors}
                        />
                        <InputField
                            label="Number of Staff"
                            name="number_of_staff"
                            type="number"
                            register={register}
                            errors={errors}
                        />
                        <InputField
                            label="Number of Vehicles"
                            name="number_of_vehicles"
                            type="number"
                            register={register}
                            errors={errors}
                        />
                        <InputField
                            label="Number of GPS Devices"
                            name="number_of_gps"
                            type="number"
                            register={register}
                            errors={errors}
                        />
                        <InputField
                            label="Number of Beacons"
                            name="number_of_beacons"
                            type="number"
                            register={register}
                            errors={errors}
                        />
                        <InputField
                            label="Number of Branches"
                            name="number_of_branches"
                            type="number"
                            register={register}
                            errors={errors}
                        />
                    </div>
                </div>
            </div>

            {/* 3. Address Details */}
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
                            disabled={!selectedState}
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
                            label="Pincode"
                            name="pin_code"
                            register={register}
                            errors={errors}
                            required
                            validation={{ pattern: { value: /^[0-9]{6}$/, message: 'Must be exactly 6 digits' } }}
                        />
                        <InputField
                            label="Landmark"
                            name="landmark"
                            register={register}
                            errors={errors}
                        />
                    </div>
                </div>
            </div>

            {/* 4. Contact Persons */}
            <div className="org-section">
                <div className="org-section-title">
                    <FiUser className="org-section-icon" style={{ color: '#3b82f6' }} /> CONTACT
                    PERSONS
                </div>
                <div className="org-section-body">
                    <div style={{ marginBottom: '1rem' }}>
                         <b style={{ fontSize: '13px' }}>Primary Contact</b>
                    </div>
                    <div className="form-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '1rem' }}>
                        <InputField
                            label="Full Name"
                            name="primary_person_name"
                            register={register}
                            errors={errors}
                            required
                        />
                        <InputField
                            label="Email Address"
                            name="primary_person_email"
                            type="email"
                            register={register}
                            errors={errors}
                            required
                            validation={{ pattern: { value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/, message: 'Invalid email address' } }}
                        />
                        <InputField
                            label="Primary Phone"
                            name="primary_person_phone_1"
                            register={register}
                            errors={errors}
                            required
                            validation={{ pattern: { value: /^[0-9]{10}$/, message: 'Must be exactly 10 digits' } }}
                        />
                        <InputField
                            label="Secondary Phone"
                            name="primary_person_phone_2"
                            register={register}
                            errors={errors}
                            validation={{ pattern: { value: /^[0-9]{10}$/, message: 'Must be exactly 10 digits' } }}
                        />
                    </div>
                    <div style={{ margin: '1.5rem 0 1rem 0' }}>
                         <b style={{ fontSize: '13px' }}>Secondary Contact</b>
                    </div>
                    <div className="form-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '1rem' }}>
                        <InputField
                            label="Full Name"
                            name="secondary_person_name"
                            register={register}
                            errors={errors}
                        />
                        <InputField
                            label="Email Address"
                            name="secondary_person_email"
                            type="email"
                            register={register}
                            errors={errors}
                            validation={{ pattern: { value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/, message: 'Invalid email address' } }}
                        />
                        <InputField
                            label="Primary Phone"
                            name="secondary_person_phone_1"
                            register={register}
                            errors={errors}
                            validation={{ pattern: { value: /^[0-9]{10}$/, message: 'Must be exactly 10 digits' } }}
                        />
                        <InputField
                            label="Secondary Phone"
                            name="secondary_person_phone_2"
                            register={register}
                            errors={errors}
                            validation={{ pattern: { value: /^[0-9]{10}$/, message: 'Must be exactly 10 digits' } }}
                        />
                    </div>
                </div>
            </div>

             {/* 5. Login Credentials */}
             <div className="org-section">
                <div className="org-section-title">
                    <FiLock className="org-section-icon" style={{ color: '#10b981' }} /> LOGIN
                    CREDENTIALS
                </div>
                <div className="org-section-body">
                    <div className="form-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '1rem' }}>
                        <InputField
                            label="Email (Username)"
                            name="email"
                            type="email"
                            register={register}
                            errors={errors}
                            required
                            placeholder="admin@admin.com"
                            validation={{ pattern: { value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/, message: 'Invalid email address' } }}
                        />
                        <InputField
                            label="Password"
                            name="password"
                            register={register}
                            errors={errors}
                            required
                            type="password"
                            placeholder="••••••••"
                        />
                    </div>
                     <div
                        style={{
                            background: '#fef3c7',
                            borderRadius: '8px',
                            padding: '0.75rem',
                            marginTop: '1rem',
                            display: 'flex',
                            alignItems: 'center',
                            gap: '0.5rem',
                        }}
                    >
                        <span style={{ color: '#f59e0b', fontSize: '1.25rem' }}>⚠️</span>
                        <span style={{ fontSize: '0.9rem', color: '#92400e' }}>
                            Ensure the password is strong and shared securely with the institution
                            admin.
                        </span>
                    </div>
                </div>
            </div>

            {/* 6. Documents Section */}
            <div className="org-section">
                <div className="org-section-title">
                    <FiFolder className="org-section-icon" style={{ color: '#a855f7' }} /> DOCUMENTS
                </div>
                <div className="org-section-body">
                    <div className="form-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '1rem' }}>
                        {uploadFields.map((field) => (
                            <div key={field.name} style={{
                                padding: '1rem',
                                border: '1px dashed #cbd5e1',
                                borderRadius: '8px',
                                textAlign: 'center',
                                background: '#f8fafc'
                            }}>
                                <div style={{ fontSize: '12px', fontWeight: 'bold', marginBottom: '8px' }}>{field.label}</div>
                                <FileInputField
                                    label=""
                                    name={field.name}
                                    register={register}
                                    errors={errors}
                                />
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* 7. Remarks Section */}
            <div className="org-section">
                <div className="org-section-title">
                    <FiAlignLeft className="org-section-icon" style={{ color: '#64748b' }} /> REMARKS
                    / NOTES
                </div>
                <div className="org-section-body">
                    <textarea
                        className="form-input"
                        rows={3}
                        placeholder="Enter any additional notes, special requirements, or remarks..."
                        {...register('remarks')}
                    />
                </div>
            </div>
        </div>
    );
};

export default InstitutionCreateForm;
