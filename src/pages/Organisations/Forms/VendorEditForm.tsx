import React from 'react';
import { useFormContext } from 'react-hook-form';
import InputField from '../../../Components/Form/InputField';
import {
    FiShoppingBag,
    FiPhone,
    FiMapPin,
    FiFileText,
    FiCreditCard,
    FiBriefcase,
    FiTruck,
    FiAlignLeft,
    FiInfo,
} from 'react-icons/fi';
import type { VendorData } from '../organisation.types';

const VendorEditForm: React.FC = () => {
    const {
        register,
        formState: { errors, isDirty },
    } = useFormContext<VendorData>();

    return (
        <div className="rp-form-card rp-form-wide">
            {/* 0. Info & Dirty State */}
            <div className="rp-section" style={{ borderBottom: 'none', paddingBottom: 0 }}>
                <div className="rp-section-body">
                    <div
                        style={{
                            background: '#fff7ed',
                            border: '1px solid #ffedd5',
                            padding: '1rem',
                            borderRadius: '12px',
                            display: 'flex',
                            gap: '0.75rem',
                            alignItems: 'flex-start',
                            marginBottom: '1rem',
                        }}
                    >
                        <FiInfo style={{ marginTop: '0.25rem', color: '#ea580c' }} />
                        <div>
                            <p
                                style={{
                                    fontSize: '0.75rem',
                                    fontWeight: 700,
                                    color: '#9a3412',
                                    textTransform: 'uppercase',
                                }}
                            >
                                Editing Vendor Details
                            </p>
                            <p
                                style={{
                                    fontSize: '0.72rem',
                                    color: '#c2410c',
                                    textTransform: 'uppercase',
                                    marginTop: '0.125rem',
                                }}
                            >
                                Update fields as needed. All changes are tracked.
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

            {/* 1. Vendor Details */}
            <div className="rp-section">
                <div className="rp-section-title">
                    <FiShoppingBag className="rp-section-icon" style={{ color: '#f97316' }} />{' '}
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
                        <InputField
                            label="Vendor Type"
                            name="vendor_type"
                            register={register}
                            errors={errors}
                            placeholder="Individual / Company / Trust / Cooperative"
                            required
                        />
                    </div>
                </div>
            </div>

            {/* 2. Contact Details */}
            <div className="rp-section">
                <div className="rp-section-title">
                    <FiPhone className="rp-section-icon" style={{ color: '#3b82f6' }} /> CONTACT
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
                            label="Contact Mobile"
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

            {/* 3. Address Details */}
            <div className="rp-section">
                <div className="rp-section-title">
                    <FiMapPin className="rp-section-icon" style={{ color: '#ef4444' }} /> OFFICE
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

            {/* 4. Compliance */}
            <div className="rp-section">
                <div className="rp-section-title">
                    <FiFileText className="rp-section-icon" style={{ color: '#6366f1' }} />{' '}
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
                            label="Aadhaar Number"
                            name="aadhaar_number"
                            register={register}
                            errors={errors}
                        />
                        <InputField
                            label="UDYAM / MSME No."
                            name="msme_number"
                            register={register}
                            errors={errors}
                        />
                    </div>
                </div>
            </div>

            {/* 5. Bank Details */}
            <div className="rp-section">
                <div className="rp-section-title">
                    <FiCreditCard className="rp-section-icon" style={{ color: '#10b981' }} /> BANK
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

            {/* 6. Contract Details */}
            <div className="rp-section">
                <div className="rp-section-title">
                    <FiBriefcase className="rp-section-icon" style={{ color: '#f59e0b' }} />{' '}
                    CONTRACT DETAILS
                </div>
                <div className="rp-section-body">
                    <div className="rp-grid-3">
                        <InputField
                            label="Start Date"
                            name="contract_start_date"
                            type="date"
                            register={register}
                            errors={errors}
                            required
                        />
                        <InputField
                            label="End Date"
                            name="contract_end_date"
                            type="date"
                            register={register}
                            errors={errors}
                            required
                        />
                        <InputField
                            label="Insurance Coverage"
                            name="insurance_coverage"
                            register={register}
                            errors={errors}
                            placeholder="Yes / No"
                            required
                        />
                    </div>
                </div>
            </div>

            {/* 7. Vehicle Details */}
            <div className="rp-section">
                <div className="rp-section-title">
                    <FiTruck className="rp-section-icon" style={{ color: '#ef4444' }} /> VEHICLE
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

            {/* 8. Remarks */}
            <div className="rp-section">
                <div className="rp-section-title">
                    <FiAlignLeft className="rp-section-icon" style={{ color: '#64748b' }} /> REMARKS
                </div>
                <div className="rp-section-body">
                    <textarea
                        {...register('vendor_notes')}
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

export default VendorEditForm;
