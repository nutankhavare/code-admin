import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useForm, FormProvider } from 'react-hook-form';
import { Building2, School, Car, Handshake, ChevronRight, ChevronLeft } from 'lucide-react';
import './Organisation.css';
import { type OrgType, ORG_TYPE_LABELS } from './organisation.types';

import OfficeCreateForm from './Forms/OfficeCreateForm';
import InstitutionCreateForm from './Forms/InstitutionCreateForm';
import MotorDrivingSchoolCreateForm from './Forms/MotorDrivingSchoolCreateForm';
import VendorCreateForm from './Forms/VendorCreateForm';

/* ── Type selection config ───────────────────────────── */
const ORG_OPTIONS: {
    type: OrgType;
    label: string;
    description: string;
    icon: React.ReactElement; // Using React.ReactElement for cloneElement compatibility
    color: string;
}[] = [
    {
        type: 'OFFICE',
        label: 'Office / Corporate',
        description: 'Registered corporate office, company or business entity',
        icon: <Building2 size={32} />,
        color: '#6366f1',
    },
    {
        type: 'INSTITUTION',
        label: 'Institution / School',
        description: 'Educational institution, school, college or university',
        icon: <School size={32} />,
        color: '#0ea5e9',
    },
    {
        type: 'MOTOR_DRIVING_SCHOOL',
        label: 'Motor Driving School',
        description: 'Registered MDS with RTO license number',
        icon: <Car size={32} />,
        color: '#10b981',
    },
    {
        type: 'VENDOR',
        label: 'Vendor / Supplier',
        description: 'Third-party vendor, supplier or service provider',
        icon: <Handshake size={32} />,
        color: '#f59e0b',
    },
];

const OrgCreatePage: React.FC = () => {
    const navigate = useNavigate();
    const [step, setStep] = useState<1 | 2>(1);
    const [selectedType, setSelectedType] = useState<OrgType | null>(null);

    const methods = useForm({ mode: 'onChange' });

    const handleSelectType = (type: OrgType) => {
        setSelectedType(type);
        methods.reset();
        setStep(2);
    };

    const handleSave = methods.handleSubmit((data) => {
        console.log('Organisation Saved:', { type: selectedType, ...data });
        navigate('/Organisation');
    });

    const selectedOption = ORG_OPTIONS.find((o) => o.type === selectedType);

    /* ──────────────────── STEP 1 ──────────────────────── */
    if (step === 1) {
        return (
            <div className="page-container">
                <div className="page-header-bar">
                    <div className="breadcrumb-container">
                        <button
                            className="breadcrumb-link"
                            onClick={() => navigate('/Organisation')}
                        >
                            ORGANISATIONS
                        </button>
                        <span className="breadcrumb-sep">/</span>
                        <span className="breadcrumb-current">SELECT TYPE</span>
                    </div>
                    <button className="btn btn--back" onClick={() => navigate('/Organisation')}>
                        <ChevronLeft size={16} /> BACK
                    </button>
                </div>

                <div className="org-type-step">
                    <div className="org-type-header">
                        <h1 className="org-type-heading">
                            Onboarding New Organisation
                        </h1>
                        <p className="org-type-subheading">
                            Choose the category that matches your entity to begin the onboarding process.
                        </p>
                    </div>

                    <div className="org-type-grid">
                        {ORG_OPTIONS.map((opt) => (
                            <button
                                key={opt.type}
                                className="org-type-card"
                                style={{ '--card-color': opt.color } as React.CSSProperties}
                                onClick={() => handleSelectType(opt.type)}
                            >
                                <div
                                    className="org-type-icon"
                                    style={{ color: opt.color, background: opt.color + '12' }}
                                >
                                    {opt.icon}
                                </div>
                                <div className="org-type-card-label">{opt.label}</div>
                                <div className="org-type-card-desc">{opt.description}</div>
                                <div className="org-type-card-arrow">
                                    <ChevronRight size={24} color={opt.color} />
                                </div>
                            </button>
                        ))}
                    </div>
                </div>
            </div>
        );
    }

    /* ──────────────────── STEP 2 ──────────────────────── */
    return (
        <div className="page-container">
            <div className="page-header-bar">
                <div className="breadcrumb-container">
                    <button className="breadcrumb-link" onClick={() => navigate('/Organisation')}>
                        ORGANISATIONS
                    </button>
                    <span className="breadcrumb-sep">/</span>
                    <button className="breadcrumb-link" onClick={() => setStep(1)}>
                        SELECT TYPE
                    </button>
                    <span className="breadcrumb-sep">/</span>
                    <span className="breadcrumb-current">CREATE {selectedOption?.label.toUpperCase()}</span>
                </div>
                <button className="btn btn--back" onClick={() => setStep(1)}>
                    <ChevronLeft size={16} /> BACK
                </button>
            </div>

            <div className="org-form-wrapper" style={{ paddingBottom: '40px' }}>
                <div className="org-form-card" style={{ maxWidth: 880 }}>
                    <div
                        className="org-form-header"
                        style={{
                            borderLeft: `5px solid ${selectedOption?.color}`,
                            padding: '24px 32px',
                            background: '#f8fafc'
                        }}
                    >
                        <span className="org-form-icon" style={{ 
                            color: selectedOption?.color, 
                            background: selectedOption?.color + '12',
                            width: '48px',
                            height: '48px',
                            borderRadius: '12px',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center'
                        }}>
                            {selectedOption ? React.cloneElement(selectedOption.icon as any, { size: 24 }) : null}
                        </span>
                        <div>
                            <div style={{ fontWeight: 900, fontSize: '14px', letterSpacing: '0.02em' }}>
                                NEW {selectedType ? ORG_TYPE_LABELS[selectedType].toUpperCase() : ''} ONBOARDING
                            </div>
                            <div style={{ fontSize: '12px', color: 'var(--muted)', fontWeight: 600, marginTop: '2px' }}>
                                {selectedOption?.description}
                            </div>
                        </div>
                    </div>

                    <FormProvider {...methods}>
                        <form onSubmit={handleSave}>
                            <div style={{ padding: '32px' }}>
                                {selectedType === 'OFFICE' && <OfficeCreateForm />}
                                {selectedType === 'INSTITUTION' && <InstitutionCreateForm />}
                                {selectedType === 'MOTOR_DRIVING_SCHOOL' && <MotorDrivingSchoolCreateForm />}
                                {selectedType === 'VENDOR' && <VendorCreateForm />}
                            </div>

                            <div className="org-form-footer" style={{ padding: '24px 32px' }}>
                                <button
                                    type="button"
                                    className="btn btn--outline"
                                    onClick={() => setStep(1)}
                                >
                                    Cancel
                                </button>
                                <button
                                    type="submit"
                                    className="btn btn--primary"
                                    style={{
                                        background: selectedOption?.color || 'var(--primary)',
                                        boxShadow: `0 8px 20px ${selectedOption?.color}40`,
                                    }}
                                >
                                    Complete Onboarding
                                </button>
                            </div>
                        </form>
                    </FormProvider>
                </div>
            </div>
        </div>
    );
};

export default OrgCreatePage;
