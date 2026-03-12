import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useForm, FormProvider } from 'react-hook-form';
import VendorEditForm from './Forms/VendorEditForm';
import './Organisation.css';
import { initialOrganisations } from './organisation.types';
import ConfirmationModal from '../../Components/UI/ConfirmationModal';

const VendorEditPage: React.FC = () => {
    const navigate = useNavigate();
    const { id } = useParams<{ id: string }>();
    const org = initialOrganisations.find((o) => o.id === Number(id));

    const methods = useForm({ mode: 'onChange' });
    const [showUpdateConfirm, setShowUpdateConfirm] = useState(false);
    const [formData, setFormData] = useState<any>(null);

    useEffect(() => {
        if (org) {
            methods.reset(org);
        }
    }, [org, methods]);

    const handleUpdateClick = methods.handleSubmit((data) => {
        setFormData(data);
        setShowUpdateConfirm(true);
    });

    const handleConfirmUpdate = () => {
        console.log('Vendor Updated:', formData);
        setShowUpdateConfirm(false);
        navigate('/Organisation');
    };

    if (!org) {
        return (
            <div className="page-container">
                <div className="card" style={{ padding: '40px', textAlign: 'center' }}>
                    <div style={{ fontSize: '1.2rem', fontWeight: 800, color: 'var(--text)', marginBottom: '1rem' }}>Organisation not found</div>
                    <button className="btn btn-secondary" onClick={() => navigate('/Organisation')}>
                        <span className="material-symbols-outlined ms">arrow_back</span> BACK TO LIST
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div className="page-container">
            {showUpdateConfirm && (
                <ConfirmationModal
                    title="Update Vendor Profile?"
                    message={`Are you sure you want to save changes for ${org.name}?`}
                    confirmLabel="Update"
                    onConfirm={handleConfirmUpdate}
                    onCancel={() => setShowUpdateConfirm(false)}
                    type="update"
                />
            )}
            <div className="page-header">
                <div>
                    <div className="page-title">
                        <span className="material-symbols-outlined ms" style={{ fontSize: 18 }}>
                            edit_square
                        </span>
                        EDIT {org.name.toUpperCase()}
                    </div>
                    <div className="breadcrumb">
                        <span
                            style={{ cursor: 'pointer', color: 'var(--primary)', fontWeight: 700 }}
                            onClick={() => navigate('/Organisation')}
                        >
                            ORGANISATIONS
                        </span>
                        <span>/</span> EDIT VENDOR
                    </div>
                </div>
                <button className="btn btn-secondary" onClick={() => navigate('/Organisation')}>
                    <span className="material-symbols-outlined ms">arrow_back</span> BACK
                </button>
            </div>

            <div className="page-body">
                <div className="org-form-wrapper" style={{ paddingBottom: '40px' }}>
                    <div className="org-form-card" style={{ maxWidth: 880, margin: '0 auto' }}>
                        <div
                            className="org-form-header"
                            style={{
                                borderLeft: `5px solid #f59e0b`,
                                padding: '24px 32px',
                                background: '#f8fafc'
                            }}
                        >
                            <span className="org-form-icon" style={{
                                color: '#f59e0b',
                                background: '#f59e0b' + '12',
                                width: '48px',
                                height: '48px',
                                borderRadius: '12px',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center'
                            }}>
                                <span className="material-symbols-outlined ms" style={{ fontSize: 24 }}>storefront</span>
                            </span>
                            <div>
                                <div style={{ fontWeight: 900, fontSize: '14px', letterSpacing: '0.02em', color: 'var(--text)' }}>
                                    EDIT VENDOR PROFILE
                                </div>
                                <div style={{ fontSize: '12px', color: 'var(--muted)', fontWeight: 600, marginTop: '2px' }}>
                                    Update service details and partner metrics.
                                </div>
                            </div>
                        </div>

                        <FormProvider {...methods}>
                            <form onSubmit={(e) => { e.preventDefault(); handleUpdateClick(); }}>
                                <div style={{ padding: '32px' }}>
                                    <VendorEditForm />
                                </div>

                                <div
                                    className="org-form-footer"
                                    style={{
                                        display: 'flex',
                                        justifyContent: 'flex-end',
                                        gap: 12,
                                        paddingBottom: 8,
                                        borderTop: '1.5px solid var(--border)',
                                        padding: '24px 32px'
                                    }}
                                >
                                    <button
                                        type="button"
                                        className="btn btn-secondary"
                                        onClick={() => navigate('/Organisation')}
                                    >
                                        CANCEL
                                    </button>
                                    <button
                                        type="button"
                                        className="btn btn-secondary"
                                        onClick={() => methods.reset(org)}
                                    >
                                        RESET CHANGES
                                    </button>
                                    <button
                                        type="submit"
                                        className="btn btn-primary"
                                        style={{ minWidth: 200, background: '#f59e0b' }}
                                    >
                                        <span className="material-symbols-outlined ms">save</span> UPDATE VENDOR
                                    </button>
                                </div>
                            </form>
                        </FormProvider>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default VendorEditPage;
