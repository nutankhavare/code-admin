import { useFormContext } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
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
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    FiBriefcase,
    FiLock,
    FiFolder,
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    FiMap,
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    FiAward,
} from 'react-icons/fi';
import type { InstitutionData } from '../organisation.types';

const InstitutionCreateForm = () => {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const navigate = useNavigate();
    const {
        register,
        formState: { errors },
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        control,
    } = useFormContext<InstitutionData>();

    const plans = [
        { label: 'Basic', value: 1 },
        { label: 'Premium', value: 2 },
    ];

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
        <div className="rp-form-card rp-form-wide">
            {/* 0. Info Banner */}
            <div className="form-section" style={{ borderBottom: 'none', paddingBottom: 0 }}>
                <div className="form-section-body">
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
            <div className="form-section">
                <div className="rp-section-title">
                    <FiFileText className="rp-section-icon" style={{ color: '#6366f1' }} /> BASIC
                    INFORMATION
                </div>
                <div className="form-section-body">
                    <div className="form-grid">
                        <InputField
                            label="Institution Name"
                            name="institution_name"
                            register={register}
                            errors={errors}
                            required
                        />
                        {/* Removed redundant Institution Type field as per user request */}
                        <InputField
                            label="Affiliation Board / University"
                            name="affiliation_board_university"
                            register={register}
                            errors={errors}
                        />
                        <InputField
                            label="Registration Type"
                            name="registration_type"
                            register={register}
                            errors={errors}
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
                        />
                        <InputField
                            label="PAN Number"
                            name="pan_number"
                            register={register}
                            errors={errors}
                        />
                        <InputField
                            label="Institution Email"
                            name="institution_email"
                            type="email"
                            register={register}
                            errors={errors}
                            required
                        />
                        <InputField
                            label="Institution Phone Number"
                            name="institution_phone"
                            register={register}
                            errors={errors}
                            required
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
                            options={plans}
                            placeholder="Select Plan"
                            required
                        />
                    </div>
                </div>
            </div>

            {/* 2. Operational Details */}
            <div className="form-section">
                <div className="rp-section-title">
                    <FiSettings className="rp-section-icon" style={{ color: '#f59e0b' }} />{' '}
                    OPERATIONAL DETAILS
                </div>
                <div className="form-section-body">
                    <div className="form-grid">
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
            <div className="form-section">
                <div className="rp-section-title">
                    <FiMapPin className="rp-section-icon" style={{ color: '#ef4444' }} /> ADDRESS
                    DETAILS
                </div>
                <div className="form-section-body">
                    <div className="form-grid">
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
                            label="Landmark"
                            name="landmark"
                            register={register}
                            errors={errors}
                        />
                        <InputField
                            label="City"
                            name="city"
                            register={register}
                            errors={errors}
                            required
                        />
                        <InputField
                            label="District"
                            name="district"
                            register={register}
                            errors={errors}
                            required
                        />
                        <InputField
                            label="State"
                            name="state"
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

            {/* 4. Contact Persons */}
            <div className="form-section">
                <div className="rp-section-title">
                    <FiUser className="rp-section-icon" style={{ color: '#3b82f6' }} /> CONTACT
                    PERSONS
                </div>
                <div className="form-section-body">
                    <div style={{ marginBottom: '1rem' }}>
                        <b>Primary</b>
                    </div>
                    <div className="form-grid">
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
                        />
                        <InputField
                            label="Primary Phone"
                            name="primary_person_phone_1"
                            register={register}
                            errors={errors}
                            required
                        />
                        <InputField
                            label="Secondary Phone"
                            name="primary_person_phone_2"
                            register={register}
                            errors={errors}
                        />
                    </div>
                    <div style={{ margin: '1.5rem 0 1rem 0' }}>
                        <b>Secondary</b>
                    </div>
                    <div className="form-grid">
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
                        />
                        <InputField
                            label="Primary Phone"
                            name="secondary_person_phone_1"
                            register={register}
                            errors={errors}
                        />
                        <InputField
                            label="Secondary Phone"
                            name="secondary_person_phone_2"
                            register={register}
                            errors={errors}
                        />
                    </div>
                </div>
            </div>

            {/* 5. Login Credentials */}
            <div className="form-section">
                <div className="rp-section-title">
                    <FiLock className="rp-section-icon" style={{ color: '#10b981' }} /> LOGIN
                    CREDENTIALS
                </div>
                <div className="form-section-body">
                    <div className="form-grid">
                        <InputField
                            label="Email (Username)"
                            name="email"
                            type="email"
                            register={register}
                            errors={errors}
                            required
                            placeholder="admin@admin.com"
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
                        className="rp-info-banner"
                        style={{ background: '#fef3c7', color: '#92400e', marginTop: '1rem' }}
                    >
                        <span style={{ color: '#f59e0b', fontSize: '1.25rem' }}>⚠️</span>
                        <span className="rp-info-text">
                            Ensure the password is strong and shared securely with the institution
                            admin.
                        </span>
                    </div>
                </div>
            </div>

            {/* 6. Documents Section */}
            <div className="form-section">
                <div className="rp-section-title">
                    <FiFolder className="rp-section-icon" style={{ color: '#a855f7' }} /> DOCUMENTS
                </div>
                <div className="form-section-body">
                    <div
                        className="rp-info-banner"
                        style={{ background: '#e0f2fe', color: '#0369a1', marginBottom: '1.5rem' }}
                    >
                        <span className="rp-info-icon">ℹ️</span>
                        <span className="rp-info-text">
                            <b>Document Upload Guidelines</b> Accepted formats: PDF, JPG, PNG (Max
                            5MB per file). Ensure all documents are clear and readable.
                        </span>
                    </div>
                    <div className="form-grid">
                        {uploadFields.map((field) => (
                            <div key={field.name} className="rp-upload-box">
                                <div className="rp-upload-icon">⬆️</div>
                                <div className="rp-upload-label">{field.label}</div>
                                <div className="rp-upload-desc">Click to upload</div>
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
            <div className="form-section">
                <div className="rp-section-title">
                    <FiAlignLeft className="rp-section-icon" style={{ color: '#64748b' }} /> REMARKS
                    / NOTES
                </div>
                <div className="form-section-body">
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
