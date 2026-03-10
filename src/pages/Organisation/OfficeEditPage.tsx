import React from 'react';
import { ChevronLeft } from 'lucide-react';
import { useNavigate, useParams } from 'react-router-dom';
import { useForm, FormProvider } from 'react-hook-form';
import OfficeEditForm from './Forms/OfficeEditForm';
import './OrgCreate.css';

const OfficeEditPage: React.FC = () => {
    const navigate = useNavigate();
    const { id } = useParams();
    const methods = useForm({ mode: 'onChange' });

    const handleUpdate = methods.handleSubmit((data) => {
        // eslint-disable-next-line no-console
        console.log('Office Updated:', data);
        navigate('/Organisation');
    });

    return (
        <div className="page-container">
            <div className="page-header-bar">
                <div className="breadcrumb-container">
                    <button className="breadcrumb-link" onClick={() => navigate('/Organisation')}>
                        Organisations
                    </button>
                    <span className="breadcrumb-sep">›</span>
                    <span className="breadcrumb-current">Edit Office #{id}</span>
                </div>
                <button className="btn btn--back" onClick={() => navigate('/Organisation')}>
                    <ChevronLeft size={16} /> Back
                </button>
            </div>

            <FormProvider {...methods}>
                <form onSubmit={handleUpdate}>
                    {/* eslint-disable-next-line @typescript-eslint/no-explicit-any */}
                    <OfficeEditForm organisationData={{} as any} />
                    <div className="rp-form-footer" style={{ marginTop: '2rem' }}>
                        <button
                            type="button"
                            className="btn rp-cancel-btn"
                            onClick={() => navigate('/Organisation')}
                        >
                            Cancel
                        </button>
                        <button
                            type="button"
                            className="btn btn--outline"
                            onClick={() => methods.reset()}
                        >
                            Reset
                        </button>
                        <button type="submit" className="btn rp-save-btn">
                            Update
                        </button>
                    </div>
                </form>
            </FormProvider>
        </div>
    );
};

export default OfficeEditPage;
