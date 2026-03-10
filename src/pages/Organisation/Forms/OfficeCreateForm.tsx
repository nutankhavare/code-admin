import { useEffect, useState } from 'react';
import adminApi from '../../../Services/apiservice';
import { useFormContext, useWatch } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';

// Components
import DaysCheckboxGroup from '../../../Components/Form/DaysCheckboxGroup';
import FileInputField from '../../../Components/Form/FileInputField';
import InputField from '../../../Components/Form/InputField';
import SelectField from '../../../Components/Form/SelectField';

import { useAlert } from '../../../Context/AlertContext';

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
} from 'react-icons/fi';

// Types
import type { FormDropdown, StateDistrict, OfficeData } from '../organisation.types';
import type { Plan } from '../../Plan/plan.types';

const OfficeCreateForm = () => {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const navigate = useNavigate();
    const {
        register,
        control,
        setValue,
        formState: { errors },
    } = useFormContext<OfficeData>();

    const { showAlert } = useAlert();

    // Data State
    const [plans, setPlans] = useState<Plan[]>([]);
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const [organisationTypes, setOrganisationTypes] = useState<FormDropdown[]>([]);
    const [registrationTypes, setRegistrationTypes] = useState<FormDropdown[]>([]);
    const [states, setStates] = useState<StateDistrict[]>([]);
    const [districts, setDistricts] = useState<StateDistrict[]>([]);
    const [loading, setLoading] = useState(true);

    // Watch State Selection
    const selectedState = useWatch({ control, name: 'state' });

    // 1. Fetch Initial Data
    useEffect(() => {
        const fetchInitialData = async () => {
            try {
                setLoading(true);
                const [plansRes, orgTypesRes, regTypesRes, statesRes] = await Promise.all([
                    adminApi.get('/plans-by-type?type=office'),
                    adminApi.get(
                        `/masters/forms/dropdowns/fields?type=office&field=organisation_type`
                    ),
                    adminApi.get(
                        `/masters/forms/dropdowns/fields?type=office&field=registration_type`
                    ),
                    adminApi.get(`/masters/forms/dropdowns/states`),
                ]);

                setPlans(plansRes.data.data || []);
                setOrganisationTypes(orgTypesRes.data || []);
                setRegistrationTypes(regTypesRes.data || []);
                setStates(statesRes.data || []);
            } catch (error) {
                // eslint-disable-next-line no-console
                console.error('Error fetching form data:', error);
                showAlert('error', 'Failed to load form data - using fallback data.');
                // Fallback data for demonstration without backend
                setPlans([
                    {
                        id: 1,
                        name: 'Starter',
                        price: 999,
                        billing: 'Monthly',
                        users: 10,
                        features: [],
                        status: 'Active',
                        subscribers: 0,
                    },
                ]);
                setOrganisationTypes([{ label: 'Private Limited', value: 'Private Limited' }]);
                setRegistrationTypes([
                    { label: 'Company', value: 'Company' },
                    { label: 'Partnership', value: 'Partnership' },
                ]);
                setStates([
                    { state: 'Karnataka', district: '' },
                    { state: 'Maharashtra', district: '' },
                ]);
            } finally {
                setLoading(false);
            }
        };

        fetchInitialData();
    }, [showAlert]);

    // 2. Fetch Districts on State Change
    useEffect(() => {
        const fetchDistricts = async () => {
            if (!selectedState) {
                setDistricts([]);
                setValue('district', '');
                return;
            }

            try {
                const response = await adminApi.get(
                    `/masters/forms/dropdowns/districts/${selectedState}`
                );
                setDistricts(response.data || []);
                setValue('district', '');
            } catch (err) {
                // eslint-disable-next-line no-console
                console.error('Error loading districts', err);
                setDistricts([]);
            }
        };

        fetchDistricts();
    }, [selectedState, setValue]);

    if (loading)
        return (
            <div className="p-10 flex justify-center">
                <div>Loading...</div>
            </div>
        );

    const uploadFields = [
        { label: 'Registration Certificate', name: 'registration_certificate_doc' },
        { label: 'GST Certificate', name: 'gst_certificate_doc' },
        { label: 'PAN Card', name: 'pan_card_doc' },
        { label: 'UDYAM / MSME Certificate', name: 'udyam_msme_certificate_doc' },
        { label: 'Transport Policy', name: 'transport_policy_doc' },
        { label: 'Safety SOP', name: 'safety_sop_doc' },
        { label: 'Vendor Policy', name: 'vendor_policy_doc' },
        { label: 'Driver Vetting Policy', name: 'driver_vetting_policy_doc' },
        { label: 'Insurance Certificate', name: 'insurance_certificate_doc' },
        { label: 'Subscription Agreement', name: 'subscription_agreement_doc' },
        { label: 'Additional Doc', name: 'additional_doc' },
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
                                Onboarding New Office
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
                            label="Organisation Name"
                            name="organisation_name"
                            register={register}
                            errors={errors}
                            required
                        />
                        {/* Removed redundant Organisation Type field */}
                        <SelectField
                            label="Registration Type"
                            name="registration_type"
                            register={register}
                            errors={errors}
                            options={registrationTypes.map((d) => ({
                                label: d.value,
                                value: d.value,
                            }))}
                            required
                        />
                        <InputField
                            label="Registration No."
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
                            label="UDYAM / MSME No."
                            name="udyam_msme_registration_no"
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
                            label="Tan Number"
                            name="tan_number"
                            register={register}
                            errors={errors}
                        />
                        <InputField
                            label="Organisation Email"
                            name="organisation_email"
                            type="email"
                            register={register}
                            errors={errors}
                            required
                        />
                        <InputField
                            label="Organisation Phone"
                            name="organisation_phone"
                            register={register}
                            errors={errors}
                            required
                        />
                        <InputField
                            label="Website / Domain"
                            name="domain"
                            register={register}
                            errors={errors}
                            placeholder="e.g. company-name"
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

            {/* 2. Operational Details */}
            <div className="form-section">
                <div className="rp-section-title">
                    <FiSettings className="rp-section-icon" style={{ color: '#f59e0b' }} />{' '}
                    OPERATIONAL DETAILS
                </div>
                <div className="form-section-body">
                    <div className="form-grid">
                        <InputField
                            label="Total Employees"
                            name="number_of_employees"
                            type="number"
                            register={register}
                            errors={errors}
                        />
                        <InputField
                            label="Total Vehicles"
                            name="number_of_vehicles"
                            type="number"
                            register={register}
                            errors={errors}
                        />
                        <InputField
                            label="GPS Devices"
                            name="number_of_gps"
                            type="number"
                            register={register}
                            errors={errors}
                        />
                        <InputField
                            label="Beacons Devices"
                            name="number_of_beacons"
                            type="number"
                            register={register}
                            errors={errors}
                        />
                        <InputField
                            label="Shifts"
                            name="shifts"
                            type="number"
                            register={register}
                            errors={errors}
                        />
                        <InputField
                            label="Branches"
                            name="units_branches"
                            type="number"
                            register={register}
                            errors={errors}
                        />
                        <InputField
                            label="Working Hours"
                            name="working_hours"
                            type="number"
                            register={register}
                            errors={errors}
                        />
                        <div style={{ gridColumn: 'span 3' }}>
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
                            label="Email"
                            name="primary_person_email"
                            type="email"
                            register={register}
                            errors={errors}
                            required
                        />
                        <InputField
                            label="Phone 1"
                            name="primary_person_phone_1"
                            register={register}
                            errors={errors}
                            required
                        />
                        <InputField
                            label="Phone 2"
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
                            label="Email"
                            name="secondary_person_email"
                            type="email"
                            register={register}
                            errors={errors}
                        />
                        <InputField
                            label="Phone 1"
                            name="secondary_person_phone_1"
                            register={register}
                            errors={errors}
                        />
                        <InputField
                            label="Phone 2"
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
                            label="Admin Email (Username)"
                            name="email"
                            type="email"
                            register={register}
                            errors={errors}
                            required
                        />
                        <InputField
                            label="Password"
                            name="password"
                            type="password"
                            register={register}
                            errors={errors}
                            required
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
                            Ensure the password is strong and shared securely with the organization
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

export default OfficeCreateForm;
