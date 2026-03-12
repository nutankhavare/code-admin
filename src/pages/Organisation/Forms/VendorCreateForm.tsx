import React from 'react';
import { useFormContext } from 'react-hook-form';

import InputField from '../../../Components/Form/InputField';

import {
    FiFileText,
    FiMapPin,
    FiInfo,
    FiPhone,
    FiCheckCircle,
    FiShoppingCart,
    FiCreditCard,
    FiTruck,
    FiBriefcase,
} from 'react-icons/fi';

import type { VendorData } from '../organisation.types';

import '../../Organisation/Organisation.css';

const VendorCreateForm: React.FC = () => {
    const {
        register,
        formState: { errors },
    } = useFormContext<VendorData>();

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
            <div className="org-section">
                <div className="org-section-title">
                    <FiShoppingCart className="org-section-icon" style={{ color: '#8b5cf6' }} />{' '}
                    VENDOR DETAILS
                </div>
                <div className="org-section-body">
                    <div className="form-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '1rem' }}>
                        <InputField
                            label="Vendor Name"
                            name="organisation_name"
                            register={register}
                            errors={errors}
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
                            name="contact_mobile"
                            register={register}
                            errors={errors}
                            required
                            validation={{ pattern: { value: /^[0-9]{10}$/, message: 'Must be exactly 10 digits' } }}
                        />
                        <InputField
                            label="Contact Email"
                            name="organisation_email"
                            type="email"
                            register={register}
                            errors={errors}
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

            {/* 3. OFFICE ADDRESS */}
            <div className="org-section">
                <div className="org-section-title">
                    <FiMapPin className="org-section-icon" style={{ color: '#10b981' }} /> OFFICE
                    ADDRESS
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
                            validation={{ pattern: { value: /^[0-9]{6}$/, message: 'Must be exactly 6 digits' } }}
                        />
                    </div>
                </div>
            </div>

            {/* 4. COMPLIANCE DETAILS */}
            <div className="org-section">
                <div className="org-section-title">
                    <FiFileText className="org-section-icon" style={{ color: '#3b82f6' }} />{' '}
                    COMPLIANCE DETAILS
                </div>
                <div className="org-section-body">
                    <div className="form-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '1rem' }}>
                        <InputField
                            label="GST Number"
                            name="gst_number"
                            register={register}
                            errors={errors}
                            required
                            validation={{ pattern: { value: /^[0-9]{2}[A-Z]{5}[0-9]{4}[A-Z]{1}[1-9A-Z]{1}Z[0-9A-Z]{1}$/, message: 'Invalid GST format' } }}
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
            <div className="org-section">
                <div className="org-section-title">
                    <FiCreditCard className="org-section-icon" style={{ color: '#059669' }} /> BANK
                    DETAILS
                </div>
                <div className="org-section-body">
                    <div className="form-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '1rem' }}>
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
            <div className="org-section">
                <div className="org-section-title">
                    <FiBriefcase className="org-section-icon" style={{ color: '#eab308' }} />{' '}
                    CONTRACT DETAILS
                </div>
                <div className="org-section-body">
                    <div className="form-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '1rem' }}>
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
            <div className="org-section">
                <div className="org-section-title">
                    <FiTruck className="org-section-icon" style={{ color: '#dc2626' }} /> VEHICLE
                    DETAILS
                </div>
                <div className="org-section-body">
                    <div className="form-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '1rem' }}>
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
            <div className="org-section">
                <div className="org-section-title">
                    <FiCheckCircle className="org-section-icon" style={{ color: '#64748b' }} />{' '}
                    CONSENT & REMARKS
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
                                I agree to compliance and safety protocols
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
