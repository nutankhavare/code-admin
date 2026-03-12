import { useFormContext } from 'react-hook-form';
import { FiBookOpen, FiMapPin, FiUser } from 'react-icons/fi';
import type { InstitutionData } from '../organisation.types';

const InstitutionEditForm = () => {
    const {
        register,
    } = useFormContext<InstitutionData>();

    return (
        <div className="org-form-content">
            <div className="org-section" style={{ marginBottom: '32px' }}>
                <div className="org-section-title" style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '13px', fontWeight: 900, color: 'var(--text)', marginBottom: '20px' }}>
                    <FiBookOpen style={{ color: '#0ea5e9' }} /> INSTITUTION DETAILS
                </div>
                <div className="form-row">
                    <div className="form-group">
                        <label className="form-label">INSTITUTION NAME <span className="required-mark">*</span></label>
                        <input
                            className="form-input"
                            {...register('organisation_name', { required: true })}
                        />
                    </div>
                    <div className="form-group">
                        <label className="form-label">REGISTRATION NO. <span className="required-mark">*</span></label>
                        <input
                            className="form-input"
                            {...register('registration_number', { required: true })}
                        />
                    </div>
                </div>
            </div>
            
            <div className="org-section" style={{ marginBottom: '32px' }}>
                <div className="org-section-title" style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '13px', fontWeight: 900, color: 'var(--text)', marginBottom: '20px' }}>
                    <FiMapPin style={{ color: '#ef4444' }} /> LOCATION
                </div>
                <div className="form-row">
                    <div className="form-group">
                        <label className="form-label">CITY <span className="required-mark">*</span></label>
                        <input className="form-input" {...register('city', { required: true })} />
                    </div>
                    <div className="form-group">
                        <label className="form-label">STATE <span className="required-mark">*</span></label>
                        <input className="form-input" {...register('state', { required: true })} />
                    </div>
                </div>
            </div>

            <div className="org-section">
                <div className="org-section-title" style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '13px', fontWeight: 900, color: 'var(--text)', marginBottom: '20px' }}>
                    <FiUser style={{ color: '#10b981' }} /> CONTACT
                </div>
                <div className="form-row">
                    <div className="form-group">
                        <label className="form-label">ADMIN NAME <span className="required-mark">*</span></label>
                        <input className="form-input" {...register('primary_person_name', { required: true })} />
                    </div>
                    <div className="form-group">
                        <label className="form-label">ADMIN PHONE <span className="required-mark">*</span></label>
                        <input className="form-input" {...register('primary_person_phone_1', { required: true })} />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default InstitutionEditForm;
