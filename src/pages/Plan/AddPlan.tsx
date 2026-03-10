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
        { name: string; type: string; value: string; [key: string]: string }[]
    >([{ name: '', type: 'text', value: '' }]);

    const [error, setError] = useState('');

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const handleChange = (e: any) => {
        setForm({ ...form, [e.target.name]: e.target.value });
        setError('');
    };

    const handleFeatureChange = (index: number, field: string, value: string) => {
        const updated = [...features];
        updated[index][field] = value;
        setFeatures(updated);
    };

    const addFeature = () => {
        setFeatures([...features, { name: '', type: 'text', value: '' }]);
    };

    const removeFeature = (index: number) => {
        setFeatures(features.filter((_, i) => i !== index));
    };

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const handleSave = () => {
        if (!form.name.trim() || !form.type) {
            setError('Plan name and type are required');
            return;
        }

        // eslint-disable-next-line no-console
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
                            <span className="rp-section-icon" style={{ color: '#10b981' }}>
                                ₹
                            </span>
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
                            <span className="rp-section-icon" style={{ color: '#ef4444' }}>
                                📄
                            </span>
                            PLAN DETAILS
                        </div>

                        <div className="rp-section-body">
                            <div className="form-group">
                                <label className="form-label">
                                    PLAN NAME <span className="required-mark">*</span>
                                </label>
                                <input
                                    className={`form-input ${error ? 'input-error' : ''}`}
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

                    {/* FEATURES */}
                    <div className="rp-section">
                        <div className="rp-section-title">
                            <span className="rp-section-icon" style={{ color: '#f59e0b' }}>
                                ⭐
                            </span>
                            PLAN FEATURES
                        </div>

                        <div className="rp-section-body">
                            {features.map((feature, index) => (
                                <div
                                    key={index}
                                    style={{
                                        display: 'grid',
                                        gridTemplateColumns: '1fr 120px 120px auto',
                                        gap: '10px',
                                        marginBottom: '10px',
                                    }}
                                >
                                    <input
                                        className="form-input"
                                        placeholder="Feature Name"
                                        value={feature.name}
                                        onChange={(e) =>
                                            handleFeatureChange(index, 'name', e.target.value)
                                        }
                                    />

                                    <select
                                        className="form-input"
                                        value={feature.type}
                                        onChange={(e) =>
                                            handleFeatureChange(index, 'type', e.target.value)
                                        }
                                    >
                                        <option value="text">Text</option>
                                        <option value="number">Number</option>
                                        <option value="boolean">Boolean</option>
                                    </select>

                                    <input
                                        className="form-input"
                                        placeholder="Value"
                                        value={feature.value}
                                        onChange={(e) =>
                                            handleFeatureChange(index, 'value', e.target.value)
                                        }
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

                                setFeatures([{ name: '', type: 'text', value: '' }]);
                            }}
                        >
                            Reset
                        </button>

                        <button className="btn btn--primary">Save Plan</button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AddPlan;
