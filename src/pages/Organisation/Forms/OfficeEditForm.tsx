import { useFormContext } from 'react-hook-form';
import { FiBriefcase, FiMapPin, FiUser, FiArrowRight } from 'react-icons/fi';
import type { OfficeData } from '../organisation.types';

const OfficeEditForm = () => {
    const {
        register,
    } = useFormContext<OfficeData>();

    return (
        <div className="org-form-content">
            {/* 1. Basic Information */}
            <div className="org-section" style={{ marginBottom: '32px' }}>
                <div className="org-section-title" style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '13px', fontWeight: 900, color: 'var(--text)', marginBottom: '20px' }}>
                    <FiBriefcase style={{ color: '#6366f1' }} /> BASIC INFORMATION
                </div>
                <div className="form-row">
                    <div className="form-group">
                        <label className="form-label">OFFICE NAME <span className="required-mark">*</span></label>
                        <input
                            className="form-input"
                            {...register('organisation_name', { required: 'Office name is required' })}
                            placeholder="e.g. Headquarters"
                        />
                    </div>

                    <div className="form-group">
                        <label className="form-label">REGISTRATION NUMBER <span className="required-mark">*</span></label>
                        <input
                            className="form-input"
                            {...register('registration_number', { required: true })}
                            placeholder="CIN / Registration No."
                        />
                    </div>

                    <div className="form-group">
                        <label className="form-label">PRIMARY EMAIL <span className="required-mark">*</span></label>
                        <input
                            className="form-input"
                            type="email"
                            {...register('organisation_email', { required: true })}
                            placeholder="office@example.com"
                        />
                    </div>

                    <div className="form-group">
                        <label className="form-label">PHONE NUMBER <span className="required-mark">*</span></label>
                        <input
                            className="form-input"
                            {...register('organisation_phone', { required: true })}
                            placeholder="10-digit mobile"
                        />
                    </div>
                </div>
            </div>

            {/* 2. Address Details */}
            <div className="org-section" style={{ marginBottom: '32px' }}>
                <div className="org-section-title" style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '13px', fontWeight: 900, color: 'var(--text)', marginBottom: '20px' }}>
                    <FiMapPin style={{ color: '#ef4444' }} /> LOCATION DETAILS
                </div>
                <div className="form-row">
                    <div className="form-group">
                        <label className="form-label">CITY <span className="required-mark">*</span></label>
                        <input
                            className="form-input"
                            {...register('city', { required: true })}
                            placeholder="City name"
                        />
                    </div>
                    <div className="form-group">
                        <label className="form-label">STATE <span className="required-mark">*</span></label>
                        <input
                            className="form-input"
                            {...register('state', { required: true })}
                            placeholder="State name"
                        />
                    </div>
                    <div className="form-group" style={{ gridColumn: 'span 2' }}>
                        <label className="form-label">FULL ADDRESS <span className="required-mark">*</span></label>
                        <textarea
                            className="form-input"
                            rows={2}
                            {...register('address_line_1', { required: true })}
                            placeholder="Building, Street, Area..."
                        />
                    </div>
                </div>
            </div>

            {/* 3. Primary Contact */}
            <div className="org-section">
                <div className="org-section-title" style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '13px', fontWeight: 900, color: 'var(--text)', marginBottom: '20px' }}>
                    <FiUser style={{ color: '#10b981' }} /> PRIMARY CONTACT PERSON
                </div>
                <div className="form-row">
                    <div className="form-group">
                        <label className="form-label">FULL NAME <span className="required-mark">*</span></label>
                        <input
                            className="form-input"
                            {...register('primary_person_name', { required: true })}
                            placeholder="Contact person name"
                        />
                    </div>
                    <div className="form-group">
                        <label className="form-label">CONTACT EMAIL <span className="required-mark">*</span></label>
                        <input
                            className="form-input"
                            type="email"
                            {...register('primary_person_email', { required: true })}
                            placeholder="person@example.com"
                        />
                    </div>
                </div>
            </div>

            <div style={{ 
                marginTop: '40px', 
                padding: '20px', 
                borderRadius: '12px', 
                background: '#f1f5f9', 
                display: 'flex', 
                alignItems: 'center', 
                gap: '12px',
                fontSize: '12px',
                color: '#64748b',
                fontWeight: 600
            }}>
                <FiArrowRight size={16} /> Data is being managed locally for demonstration purposes.
            </div>
        </div>
    );
};

export default OfficeEditForm;
