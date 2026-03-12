import React, { useEffect } from 'react';
import { ChevronLeft } from 'lucide-react';
import { useNavigate, useParams } from 'react-router-dom';
import { useForm, FormProvider } from 'react-hook-form';
import InstitutionEditForm from './Forms/InstitutionEditForm';
import './Organisation.css';
import { initialOrganisations } from './organisation.types';

const InstitutionEditPage: React.FC = () => {
    const navigate = useNavigate();
    const { id } = useParams<{ id: string }>();
    const org = initialOrganisations.find((o) => o.id === Number(id));
    
    const methods = useForm({ mode: 'onChange' });

    useEffect(() => {
        if (org) {
            methods.reset(org);
        }
    }, [org, methods]);

    const handleUpdate = methods.handleSubmit((data) => {
        console.log('Institution Updated:', data);
        navigate('/Organisation');
    });

    if (!org) {
        return (
            <div className="page-container">
                <div className="card" style={{ padding: '40px', textAlign: 'center' }}>
                    <div style={{ fontSize: '1.2rem', fontWeight: 800, color: 'var(--text)', marginBottom: '1rem' }}>Organisation not found</div>
                    <button className="btn btn--outline" onClick={() => navigate('/Organisation')}>
                        <ChevronLeft size={16} /> BACK TO LIST
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div className="page-container">
            <div className="page-header-bar">
                <div className="breadcrumb-container">
                    <button className="breadcrumb-link" onClick={() => navigate('/Organisation')}>
                        ORGANISATIONS
                    </button>
                    <span className="breadcrumb-sep">/</span>
                    <span className="breadcrumb-current">EDIT {org.name.toUpperCase()}</span>
                </div>
                <button className="btn btn--back" onClick={() => navigate('/Organisation')}>
                    <ChevronLeft size={16} /> BACK
                </button>
            </div>

            <div className="org-form-wrapper" style={{ paddingBottom: '40px' }}>
                <div className="org-form-card" style={{ maxWidth: 880 }}>
                    <div
                        className="org-form-header"
                        style={{
                            borderLeft: `5px solid #0ea5e9`,
                            padding: '24px 32px',
                            background: '#f8fafc'
                        }}
                    >
                        <div>
                            <div style={{ fontWeight: 900, fontSize: '14px', letterSpacing: '0.02em', color: 'var(--text)' }}>
                                EDIT INSTITUTION PROFILE
                            </div>
                            <div style={{ fontSize: '12px', color: 'var(--muted)', fontWeight: 600, marginTop: '2px' }}>
                                Update school/college details and campus metrics.
                            </div>
                        </div>
                    </div>

                    <FormProvider {...methods}>
                        <form onSubmit={handleUpdate}>
                            <div style={{ padding: '32px' }}>
                                <InstitutionEditForm organisationData={org as any} />
                            </div>

                            <div className="org-form-footer" style={{ padding: '24px 32px' }}>
                                <button
                                    type="button"
                                    className="btn btn--outline"
                                    onClick={() => navigate('/Organisation')}
                                >
                                    Cancel
                                </button>
                                <button
                                    type="button"
                                    className="btn btn--outline"
                                    onClick={() => methods.reset(org)}
                                >
                                    Reset Changes
                                </button>
                                <button
                                    type="submit"
                                    className="btn btn--primary"
                                    style={{
                                        background: '#0ea5e9',
                                        boxShadow: `0 8px 20px rgba(14, 165, 233, 0.3)`,
                                    }}
                                >
                                    Update Institution
                                </button>
                            </div>
                        </form>
                    </FormProvider>
                </div>
            </div>
        </div>
    );
};

export default InstitutionEditPage;
