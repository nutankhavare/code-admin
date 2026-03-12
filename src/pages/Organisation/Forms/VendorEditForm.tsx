import { useFormContext } from 'react-hook-form';
import { FiShoppingBag, FiMapPin, FiUser } from 'react-icons/fi';
import type { VendorData } from '../organisation.types';

const VendorEditForm = () => {
    const {
        register,
    } = useFormContext<VendorData>();

    return (
        <div className="org-form-content">
            <div className="org-section" style={{ marginBottom: '32px' }}>
                <div className="org-section-title" style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '13px', fontWeight: 900, color: 'var(--text)', marginBottom: '20px' }}>
                    <FiShoppingBag style={{ color: '#f59e0b' }} /> VENDOR DETAILS
                </div>
                <div className="form-row">
                    <div className="form-group">
                        <label className="form-label">VENDOR NAME <span className="required-mark">*</span></label>
                        <input
                            className="form-input"
                            {...register('organisation_name', { required: true })}
                        />
                    </div>
                    <div className="form-group">
                        <label className="form-label">GSTIN <span className="required-mark">*</span></label>
                        <input
                            className="form-input"
                            {...register('gst_number', { required: true })}
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
                    <FiUser style={{ color: '#6366f1' }} /> CONTACT
                </div>
                <div className="form-row">
                    <div className="form-group">
                        <label className="form-label">CONTACT PERSON <span className="required-mark">*</span></label>
                        <input className="form-input" {...register('primary_person_name', { required: true })} />
                    </div>
                    <div className="form-group">
                        <label className="form-label">CONTACT PHONE <span className="required-mark">*</span></label>
                        <input className="form-input" {...register('primary_person_phone_1', { required: true })} />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default VendorEditForm;
