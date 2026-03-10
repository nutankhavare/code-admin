import { useFormContext } from 'react-hook-form';
import InputField from '../../../Components/Form/InputField';
import SelectField from '../../../Components/Form/SelectField';
import { useAlert } from '../../../Context/AlertContext';
import { useEffect, useState } from 'react';
import type { Plan } from '../../Plan/plan.types';
import adminApi from '../../../Services/apiservice';
import type { InstitutionData } from '../organisation.types';
import {
    FiBookOpen,
    FiFileText,
    FiMapPin,
    FiUser,
    FiSettings,
    FiAlignLeft,
    FiInfo,
} from 'react-icons/fi';
import FileInputField from '../../../Components/Form/FileInputField';

const InstitutionEditForm = () => {
    const {
        register,
        formState: { errors, isDirty },
        watch,
    } = useFormContext<InstitutionData>();

    const { showAlert } = useAlert();
    const [plans, setPlans] = useState<Plan[]>([]);
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const [loadingPlans, setLoadingPlans] = useState(true);

    // Watch for existing document paths to show current files
    const existingDocs = {
        pan_card_doc: watch('pan_card_doc'),
        registration_certificate_doc: watch('registration_certificate_doc'),
        udise_code_college_code_doc: watch('udise_code_college_code_doc'),
        transport_policy_doc: watch('transport_policy_doc'),
        safety_sop_doc: watch('safety_sop_doc'),
        insurance_certificate_doc: watch('insurance_certificate_doc'),
        vendor_policy_doc: watch('vendor_policy_doc'),
        driver_vetting_policy_doc: watch('driver_vetting_policy_doc'),
        subscription_agreement_doc: watch('subscription_agreement_doc'),
        additional_doc: watch('additional_doc'),
    };

    // Fetch plans from backend
    useEffect(() => {
        const fetchPlans = async () => {
            try {
                setLoadingPlans(true);
                const response = await adminApi.get('/plans-by-type?type=institution');
                setPlans(response.data.data || []);
            } catch (error) {
                // eslint-disable-next-line no-console
                console.error('Error fetching plans:', error);
                showAlert('error', 'Failed to load subscription plans');
            } finally {
                setLoadingPlans(false);
            }
        };

        fetchPlans();
    }, [showAlert]);

    return (
        <div className="rp-form-card rp-form-wide">
            {/* 0. Info & Dirty State */}
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
                                Editing Institution Details
                            </p>
                            <p
                                style={{
                                    fontSize: '0.72rem',
                                    color: '#3b82f6',
                                    textTransform: 'uppercase',
                                    marginTop: '0.125rem',
                                }}
                            >
                                Update fields as needed. Leave document uploads empty to keep
                                existing files.
                            </p>
                        </div>
                    </div>

                    {isDirty && (
                        <div
                            style={{
                                background: '#fffbeb',
                                border: '1px solid #fef3c7',
                                padding: '0.75rem 1rem',
                                borderRadius: '10px',
                                display: 'flex',
                                alignItems: 'center',
                                gap: '0.5rem',
                                animation: 'pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite',
                            }}
                        >
                            <div
                                style={{
                                    width: '8px',
                                    height: '8px',
                                    background: '#f59e0b',
                                    borderRadius: '50%',
                                }}
                            ></div>
                            <span
                                style={{
                                    fontSize: '0.72rem',
                                    fontWeight: 700,
                                    color: '#92400e',
                                    textTransform: 'uppercase',
                                }}
                            >
                                You have unsaved changes
                            </span>
                        </div>
                    )}
                </div>
            </div>

            {/* 1. Basic Information */}
            <div className="rp-section">
                <div className="rp-section-title">
                    <FiBookOpen className="rp-section-icon" style={{ color: '#3b82f6' }} /> BASIC
                    INFORMATION
                </div>
                <div className="rp-section-body">
                    <div className="rp-grid-4">
                        <InputField
                            label="Institution Name"
                            name="institution_name"
                            register={register}
                            errors={errors}
                            required
                        />
                        <InputField
                            label="Institution Type"
                            name="institution_type"
                            register={register}
                            errors={errors}
                        />
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
                            label="Institution Phone"
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
                            placeholder="e.g. greenvalley"
                        />

                        <SelectField
                            label="Subscription Plan"
                            name="subscription_plan"
                            register={register}
                            errors={errors}
                            options={plans.map((p) => ({ label: p.name, value: p.id }))}
                            placeholder="Select Plan"
                            required
                        />
                    </div>
                </div>
            </div>

            {/* 2. Operational Details */}
            <div className="rp-section">
                <div className="rp-section-title">
                    <FiSettings className="rp-section-icon" style={{ color: '#64748b' }} />{' '}
                    OPERATIONAL METRICS
                </div>
                <div className="rp-section-body">
                    <div className="rp-grid-4">
                        <InputField
                            label="Students"
                            name="number_of_students"
                            type="number"
                            register={register}
                            errors={errors}
                        />
                        <InputField
                            label="Staff"
                            name="number_of_staff"
                            type="number"
                            register={register}
                            errors={errors}
                        />
                        <InputField
                            label="Vehicles"
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
                            label="Beacons"
                            name="number_of_beacons"
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
                    </div>
                </div>
            </div>

            {/* 3. Address Details */}
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
            <div className="rp-section">
                <div className="rp-section-title">
                    <FiUser className="rp-section-icon" style={{ color: '#6366f1' }} /> CONTACT
                    PERSONS
                </div>
                <div className="rp-section-body">
                    <div className="rp-grid-2" style={{ gap: '2.5rem' }}>
                        {/* Primary Contact */}
                        <div>
                            <h4
                                style={{
                                    fontSize: '0.7rem',
                                    fontWeight: 700,
                                    color: '#3b82f6',
                                    textTransform: 'uppercase',
                                    borderBottom: '1px solid #dbeafe',
                                    paddingBottom: '0.5rem',
                                    marginBottom: '1rem',
                                }}
                            >
                                Primary Contact
                            </h4>
                            <div className="rp-grid-2">
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
                        </div>

                        {/* Secondary Contact */}
                        <div>
                            <h4
                                style={{
                                    fontSize: '0.7rem',
                                    fontWeight: 700,
                                    color: '#10b981',
                                    textTransform: 'uppercase',
                                    borderBottom: '1px solid #d1fae5',
                                    paddingBottom: '0.5rem',
                                    marginBottom: '1rem',
                                }}
                            >
                                Secondary Contact
                            </h4>
                            <div className="rp-grid-2">
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
                </div>
            </div>

            {/* 5. Documents */}
            <div className="rp-section">
                <div className="rp-section-title">
                    <FiFileText className="rp-section-icon" style={{ color: '#a855f7' }} /> UPDATE
                    DOCUMENTS
                </div>
                <div className="rp-section-body">
                    <div className="rp-grid-3">
                        <FileInputField
                            label="Registration Certificate"
                            name="registration_certificate_doc"
                            register={register}
                            errors={errors}
                            existingFile={
                                typeof existingDocs.registration_certificate_doc === 'string'
                                    ? existingDocs.registration_certificate_doc
                                    : undefined
                            }
                        />
                        <FileInputField
                            label="PAN Card"
                            name="pan_card_doc"
                            register={register}
                            errors={errors}
                            existingFile={
                                typeof existingDocs.pan_card_doc === 'string'
                                    ? existingDocs.pan_card_doc
                                    : undefined
                            }
                        />
                        <FileInputField
                            label="UDISE / College Code Proof"
                            name="udise_code_college_code_doc"
                            register={register}
                            errors={errors}
                            existingFile={
                                typeof existingDocs.udise_code_college_code_doc === 'string'
                                    ? existingDocs.udise_code_college_code_doc
                                    : undefined
                            }
                        />
                        <FileInputField
                            label="Transport Policy"
                            name="transport_policy_doc"
                            register={register}
                            errors={errors}
                            existingFile={
                                typeof existingDocs.transport_policy_doc === 'string'
                                    ? existingDocs.transport_policy_doc
                                    : undefined
                            }
                        />
                        <FileInputField
                            label="Safety SOP"
                            name="safety_sop_doc"
                            register={register}
                            errors={errors}
                            existingFile={
                                typeof existingDocs.safety_sop_doc === 'string'
                                    ? existingDocs.safety_sop_doc
                                    : undefined
                            }
                        />
                        <FileInputField
                            label="Insurance Certificate"
                            name="insurance_certificate_doc"
                            register={register}
                            errors={errors}
                            existingFile={
                                typeof existingDocs.insurance_certificate_doc === 'string'
                                    ? existingDocs.insurance_certificate_doc
                                    : undefined
                            }
                        />
                        <FileInputField
                            label="Vendor Policy"
                            name="vendor_policy_doc"
                            register={register}
                            errors={errors}
                            existingFile={
                                typeof existingDocs.vendor_policy_doc === 'string'
                                    ? existingDocs.vendor_policy_doc
                                    : undefined
                            }
                        />
                        <FileInputField
                            label="Driver Vetting Policy"
                            name="driver_vetting_policy_doc"
                            register={register}
                            errors={errors}
                            existingFile={
                                typeof existingDocs.driver_vetting_policy_doc === 'string'
                                    ? existingDocs.driver_vetting_policy_doc
                                    : undefined
                            }
                        />
                        <FileInputField
                            label="Subscription Agreement"
                            name="subscription_agreement_doc"
                            register={register}
                            errors={errors}
                            existingFile={
                                typeof existingDocs.subscription_agreement_doc === 'string'
                                    ? existingDocs.subscription_agreement_doc
                                    : undefined
                            }
                        />
                        <FileInputField
                            label="Additional Document"
                            name="additional_doc"
                            register={register}
                            errors={errors}
                            existingFile={
                                typeof existingDocs.additional_doc === 'string'
                                    ? existingDocs.additional_doc
                                    : undefined
                            }
                        />
                    </div>
                </div>
            </div>

            {/* 6. Remarks */}
            <div className="rp-section">
                <div className="rp-section-title">
                    <FiAlignLeft className="rp-section-icon" style={{ color: '#64748b' }} /> REMARKS
                </div>
                <div className="rp-section-body">
                    <textarea
                        {...register('remarks')}
                        style={{
                            width: '100%',
                            maxWidth: '600px',
                            padding: '0.75rem 1rem',
                            border: '1.5px solid #e2e8f0',
                            borderRadius: '10px',
                            fontSize: '0.875rem',
                            outline: 'none',
                            resize: 'none',
                            fontFamily: 'inherit',
                        }}
                        rows={2}
                        placeholder="Add any internal notes..."
                    />
                </div>
            </div>
        </div>
    );
};

export default InstitutionEditForm;
