import React from 'react';
import { useFormContext } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import InputField from '../../../Components/Form/InputField';

import {
    FiFileText,
    FiMapPin,
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    FiUser,
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    FiSettings,
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    FiAlignLeft,
    FiInfo,
    FiBriefcase,
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    FiLock,
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    FiFolder,
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    FiMap,
    FiPhone,
    FiCheckCircle,
    FiShoppingCart,
    FiCreditCard,
    FiTruck,
} from 'react-icons/fi';
import type { VendorData } from '../organisation.types';

import '../../Organisation/Organisation.css';

const VendorCreateForm: React.FC = () => {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const navigate = useNavigate();
    const {
        register,
        formState: { errors },
    } = useFormContext<VendorData>();

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
                                Onboarding New Vendor
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

            {/* 1. Vendor Details */}
            <div className="rp-section">
                <div className="rp-section-title">
                    <FiShoppingCart className="rp-section-icon" style={{ color: '#8b5cf6' }} />{' '}
                    VENDOR DETAILS
                </div>
                <div className="rp-section-body">
                    <div className="rp-grid-2">
                        <InputField
                            label="Vendor Name"
                            name="organisation_name"
                            register={register}
                            errors={errors}
                            required
                        />
                        {/* Removed redundant Vendor Type field */}
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
                            name="contact_mobile"
                            register={register}
                            errors={errors}
                            required
                        />
                        <InputField
                            label="Contact Email"
                            name="organisation_email"
                            type="email"
                            register={register}
                            errors={errors}
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

            {/* 3. OFFICE ADDRESS */}
            <div className="rp-section">
                <div className="rp-section-title">
                    <FiMapPin className="rp-section-icon" style={{ color: '#10b981' }} /> OFFICE
                    ADDRESS
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
                        <InputField
                            label="City / Town"
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

            {/* 4. COMPLIANCE DETAILS */}
            <div className="rp-section">
                <div className="rp-section-title">
                    <FiFileText className="rp-section-icon" style={{ color: '#3b82f6' }} />{' '}
                    COMPLIANCE DETAILS
                </div>
                <div className="rp-section-body">
                    <div className="rp-grid-2">
                        <InputField
                            label="GST Number"
                            name="gst_number"
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
                            label="Aadhaar Number (if Individual)"
                            name="aadhaar_number"
                            register={register}
                            errors={errors}
                        />
                        <InputField
                            label="UDYAM / MSME Registration No"
                            name="msme_number"
                            register={register}
                            errors={errors}
                        />
                    </div>
                </div>
            </div>

            {/* 5. BANK DETAILS */}
            <div className="rp-section">
                <div className="rp-section-title">
                    <FiCreditCard className="rp-section-icon" style={{ color: '#059669' }} /> BANK
                    DETAILS
                </div>
                <div className="rp-section-body">
                    <div className="rp-grid-3">
                        <InputField
                            label="Bank Account Number"
                            name="bank_account_number"
                            register={register}
                            errors={errors}
                            required
                        />
                        <InputField
                            label="IFSC Code"
                            name="bank_ifsc"
                            register={register}
                            errors={errors}
                            required
                        />
                        <InputField
                            label="Account Holder Name"
                            name="account_holder_name"
                            register={register}
                            errors={errors}
                            required
                        />
                    </div>
                </div>
            </div>

            {/* 6. CONTRACT DETAILS */}
            <div className="rp-section">
                <div className="rp-section-title">
                    <FiBriefcase className="rp-section-icon" style={{ color: '#eab308' }} />{' '}
                    CONTRACT DETAILS
                </div>
                <div className="rp-section-body">
                    <div className="rp-grid-3">
                        <InputField
                            label="Contract Start Date"
                            name="contract_start_date"
                            type="date"
                            register={register}
                            errors={errors}
                            required
                        />
                        <InputField
                            label="Contract End Date"
                            name="contract_end_date"
                            type="date"
                            register={register}
                            errors={errors}
                            required
                        />
                        <InputField
                            label="Insurance Liability Coverage"
                            name="insurance_coverage"
                            register={register}
                            errors={errors}
                            placeholder="Yes / No"
                            required
                        />
                    </div>
                </div>
            </div>

            {/* 7. VEHICLE DETAILS */}
            <div className="rp-section">
                <div className="rp-section-title">
                    <FiTruck className="rp-section-icon" style={{ color: '#dc2626' }} /> VEHICLE
                    DETAILS
                </div>
                <div className="rp-section-body">
                    <div className="rp-grid-3">
                        <InputField
                            label="Vehicle Count"
                            name="vehicle_count"
                            type="number"
                            register={register}
                            errors={errors}
                            required
                        />
                        <InputField
                            label="Vehicle Numbers"
                            name="vehicle_numbers"
                            register={register}
                            errors={errors}
                            placeholder="KA01AB1234, KA02CD5678"
                            required
                        />
                        <InputField
                            label="Vehicle Types"
                            name="vehicle_types"
                            register={register}
                            errors={errors}
                            placeholder="Bus / Van / Car / Auto"
                            required
                        />
                    </div>
                </div>
            </div>

            {/* 8. CONSENT & REMARKS */}
            <div className="rp-section">
                <div className="rp-section-title">
                    <FiCheckCircle className="rp-section-icon" style={{ color: '#64748b' }} />{' '}
                    CONSENT & REMARKS
                </div>
                <div className="rp-section-body">
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                        <div className="rp-consent-box">
                            <label className="rp-consent-label">
                                <input
                                    type="checkbox"
                                    className="rp-consent-checkbox"
                                    // eslint-disable-next-line @typescript-eslint/no-explicit-any
                                    {...register('consent' as any, {
                                        required: 'Consent is required',
                                    })}
                                />
                                I agree to compliance and safety protocols
                            </label>
                            {errors.consent && (
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
                                VENDOR REMARKS / NOTES
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

export default VendorCreateForm;
