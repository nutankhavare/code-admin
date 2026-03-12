
import React, { useState } from 'react';
import { ChevronLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import './Plan.css';

const AddPlan: React.FC = () => {
    const navigate = useNavigate();

    const [form, setForm] = useState({
        name: '',
        priceMonthly: '',
        priceYearly: '',
        type: '',
        status: 'Active',
        trialDays: '',
        description: '',
    });

    const [features, setFeatures] = useState<
        { name: string; description: string }[]
    >([{ name: '', description: '' }]);

    const [error, setError] = useState('');

    const featureDescriptions: Record<string, string> = {
        basic: 'Normal report + Normal dashboard + 2 roles',
        advanced: 'Basic features + Advanced reports + 5 roles',
        premium: 'Advanced features + Analytics dashboard + Unlimited roles',
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
        setForm({ ...form, [e.target.name]: e.target.value });
        setError('');
    };

    const handleFeatureChange = (index: number, value: string) => {
        const updated = [...features];

        updated[index].name = value;
        updated[index].description = featureDescriptions[value] || '';

        setFeatures(updated);
    };

    const addFeature = () => {
        setFeatures([...features, { name: '', description: '' }]);
    };

    const removeFeature = (index: number) => {
        setFeatures(features.filter((_, i) => i !== index));
    };

    const handleSave = () => {
        if (!form.name.trim() || !form.type) {
            setError('Plan name and type are required');
            return;
        }

        console.log({
            ...form,
            features,
        });

        navigate('/Plan');
    };

    return (
        <div className="page-container">
            <div className="page-header-bar">
                <div className="breadcrumb-container">
                    <button className="breadcrumb-link" onClick={() => navigate('/Plan')}>
                        Plans
                    </button>
                    <span className="breadcrumb-sep">›</span>
                    <span className="breadcrumb-current">Add New Plan</span>
                </div>
                <button className="btn btn--back" onClick={() => navigate('/Plan')}>
                    <ChevronLeft size={16} /> Back
                </button>
            </div>

            <div className="rp-form-wrapper">
                <div className="rp-form-card">

                    {/* HEADER */}
                    <div className="rp-form-header">
                        <span className="rp-form-icon">💳</span>
                        <span>ADD NEW PLAN</span>
                    </div>

                    {/* PRICING */}
                    <div className="rp-section">
                        <div className="rp-section-title">
                            <span className="rp-section-icon" style={{ color: '#10b981' }}>₹</span>
                            PRICING STRATEGY
                        </div>

                        <div className="rp-section-body">
                            <div className="form-group">
                                <label className="form-label">MONTHLY PRICE (₹)</label>
                                <input
                                    className="form-input"
                                    type="number"
                                    name="priceMonthly"
                                    value={form.priceMonthly}
                                    onChange={handleChange}
                                    placeholder="0"
                                />
                            </div>

                            <div className="form-group">
                                <label className="form-label">YEARLY PRICE (₹)</label>
                                <input
                                    className="form-input"
                                    type="number"
                                    name="priceYearly"
                                    value={form.priceYearly}
                                    onChange={handleChange}
                                    placeholder="0"
                                />
                            </div>
                        </div>
                    </div>

                    {/* PLAN DETAILS */}
                    <div className="rp-section">
                        <div className="rp-section-title">
                            <span className="rp-section-icon" style={{ color: '#ef4444' }}>📄</span>
                            PLAN DETAILS
                        </div>

                        <div className="rp-section-body">
                            <div className="form-group">
                                <label className="form-label">
                                    PLAN NAME <span className="required-mark">*</span>
                                </label>
                                <input
                                    className={`form - input ${error ? 'input-error' : ''} `}
                                    placeholder="e.g. Pro, Enterprise"
                                    name="name"
                                    value={form.name}
                                    onChange={handleChange}
                                />
                                {error && <div className="input-error-msg">{error}</div>}
                            </div>

                            <div className="form-group">
                                <label className="form-label">
                                    TYPE <span className="required-mark">*</span>
                                </label>
                                <select
                                    className="form-input"
                                    name="type"
                                    value={form.type}
                                    onChange={handleChange}
                                >
                                    <option value="">Select</option>
                                    <option value="office">Office</option>
                                    <option value="institution">Institution</option>
                                    <option value="driving">Driving School</option>
                                </select>
                            </div>

                            <div className="form-group">
                                <label className="form-label">STATUS</label>
                                <select
                                    className="form-input"
                                    name="status"
                                    value={form.status}
                                    onChange={handleChange}
                                >
                                    <option>Active</option>
                                    <option>Inactive</option>
                                </select>
                            </div>

                            <div className="form-group">
                                <label className="form-label">TRIAL PERIOD (DAYS)</label>
                                <input
                                    className="form-input"
                                    type="number"
                                    name="trialDays"
                                    value={form.trialDays}
                                    onChange={handleChange}
                                />
                            </div>

                            <div className="form-group">
                                <label className="form-label">DESCRIPTION</label>
                                <textarea
                                    className="form-input"
                                    rows={3}
                                    name="description"
                                    value={form.description}
                                    onChange={handleChange}
                                />
                            </div>
                        </div>
                    </div>

                    {/* PLAN FEATURES */}
                    <div className="rp-section">
                        <div className="rp-section-title">
                            <span className="rp-section-icon" style={{ color: '#f59e0b' }}>⭐</span>
                            PLAN FEATURES
                        </div>

                        <div className="rp-section-body">
                            {features.map((feature, index) => (
                                <div
                                    key={index}
                                    style={{
                                        display: 'grid',
                                        gridTemplateColumns: '200px 1fr auto',
                                        gap: '10px',
                                        marginBottom: '10px',
                                    }}
                                >

                                    <select
                                        className="form-input"
                                        value={feature.name}
                                        onChange={(e) =>
                                            handleFeatureChange(index, e.target.value)
                                        }
                                    >
                                        <option value="">Select Feature Level</option>
                                        <option value="basic">Basic</option>
                                        <option value="advanced">Advanced</option>
                                        <option value="premium">Premium</option>
                                    </select>

                                    <textarea
                                        className="form-input"
                                        rows={2}
                                        value={feature.description}
                                        readOnly
                                    />

                                    <button
                                        className="btn btn--danger"
                                        type="button"
                                        onClick={() => removeFeature(index)}
                                    >
                                        Remove
                                    </button>

                                </div>
                            ))}

                            <button className="rp-select-all-btn" onClick={addFeature}>
                                + ADD FEATURE
                            </button>
                        </div>
                    </div>

                    {/* FOOTER */}
                    <div className="plan-actions pt-4 border-t">
                        <button
                            type="button"
                            className="btn btn--outline"
                            onClick={() => navigate('/Plan')}
                        >
                            Cancel
                        </button>

                        <button
                            type="button"
                            className="btn btn--outline"
                            onClick={() => {
                                setForm({
                                    name: '',
                                    priceMonthly: '',
                                    priceYearly: '',
                                    type: '',
                                    status: 'Active',
                                    trialDays: '',
                                    description: '',
                                });

                                setFeatures([{ name: '', description: '' }]);
                            }}
                        >
                            Reset
                        </button>

                        <button className="btn btn--primary" onClick={handleSave}>
                            Save Plan
                        </button>
                    </div>

                </div>
            </div>
        </div>
    );
};

export default AddPlan;
