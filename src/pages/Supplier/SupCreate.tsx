import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import './Supplier.css';

/* ── StaffCreate style helpers ────────────────────────── */
const SectionHeader = ({ icon, title }: { icon: string; title: string }) => (
    <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 24, paddingBottom: 12, borderBottom: '1.5px solid var(--border)' }}>
        <span className="material-symbols-outlined ms" style={{ color: 'var(--primary)', fontSize: 24 }}>{icon}</span>
        <span style={{ fontWeight: 900, fontSize: 13, letterSpacing: '0.02em', color: 'var(--text)' }}>{title}</span>
    </div>
);

const Card = ({ children }: { children: React.ReactNode }) => (
    <div className="card" style={{ marginBottom: 24, padding: 32, borderRadius: 16, border: '1.5px solid var(--border)', background: '#fff' }}>
        {children}
    </div>
);

const Body = ({ children, style }: { children: React.ReactNode; style?: React.CSSProperties }) => (
    <div style={{ padding: '0 8px', ...style }}>{children}</div>
);

const Grid = ({ cols, children }: { cols: string; children: React.ReactNode }) => (
    <div style={{ display: 'grid', gridTemplateColumns: cols, gap: '24px 32px' }}>{children}</div>
);

const Label = ({ children }: { children: React.ReactNode }) => (
    <div className="form-label" style={{ marginBottom: 8, fontWeight: 700, fontSize: 11, color: 'var(--text-muted)' }}>{children}</div>
);

export default function SupplierManagementCreate() {
    const navigate = useNavigate();
    const location = useLocation();

    // Check for ID in query params to determine Edit vs Create
    const queryParams = new URLSearchParams(location.search);
    const supplierId = queryParams.get('id');
    const isEdit = !!supplierId;

    const [form, setForm] = useState({
        name: '',
        location: '',
        status: 'Active'
    });

    useEffect(() => {
        if (isEdit) {
            // In a real app, you'd fetch supplier data here.
            // For now, we'll simulate it.
            setForm({
                name: 'iTriangle',
                location: 'Bangalore',
                status: 'Active'
            });
        }
    }, [isEdit]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const submit = (e: React.FormEvent) => {
        e.preventDefault();

        if (!form.name.trim() || !form.location.trim()) {
            alert('Supplier Name and Location are required');
            return;
        }

        console.log(form);
        alert(isEdit ? "Supplier Updated (Dummy)" : "Supplier Created (Dummy)");
        navigate("/suppliers");
    };

    return (
        <div className="page-container">
            {/* ── HEADER & BREADCRUMBS ── */}
            <div className="page-header">
                <div>
                    <div className="page-title">
                        <span className="material-symbols-outlined ms" style={{ fontSize: 18 }}>
                            storefront
                        </span>
                        {isEdit ? 'Edit Supplier' : 'Add New Supplier'}
                    </div>
                    <div className="breadcrumb">
                        <span
                            style={{ cursor: 'pointer', color: 'var(--primary)', fontWeight: 700 }}
                            onClick={() => navigate('/suppliers')}
                        >
                            SUPPLIERS
                        </span>
                        <span>/</span> {isEdit ? 'EDIT SUPPLIER' : 'ADD NEW SUPPLIER'}
                    </div>
                </div>
                <button className="btn btn-secondary" onClick={() => navigate('/suppliers')}>
                    <span className="material-symbols-outlined ms">arrow_back</span> BACK
                </button>
            </div>

            {/* ── FORM CONTENT ── */}
            <div className="org-form-wrapper" style={{ paddingBottom: '40px' }}>
                <div className="org-form-card" style={{ maxWidth: 880, margin: '0 auto' }}>
                    <form onSubmit={submit}>
                        <div style={{ padding: '32px' }}>
                            <Card>
                                <SectionHeader icon="business_center" title="SUPPLIER DETAILS" />
                                <Body>
                                    <Grid cols="repeat(3, 1fr)">
                                        <div className="form-group">
                                            <Label>SUPPLIER NAME <span className="required-mark">*</span></Label>
                                            <input
                                                className="form-input"
                                                placeholder="e.g. Acme Corp"
                                                name="name"
                                                value={form.name}
                                                onChange={handleChange}
                                                required
                                            />
                                        </div>

                                        <div className="form-group">
                                            <Label>LOCATION <span className="required-mark">*</span></Label>
                                            <input
                                                className="form-input"
                                                placeholder="e.g. Bangalore, Mumbai"
                                                name="location"
                                                value={form.location}
                                                onChange={handleChange}
                                                required
                                            />
                                        </div>

                                        <div className="form-group">
                                            <Label>STATUS</Label>
                                            <select
                                                className="form-input"
                                                name="status"
                                                value={form.status}
                                                onChange={handleChange}
                                            >
                                                <option value="Active">Active</option>
                                                <option value="Inactive">Inactive</option>
                                            </select>
                                        </div>
                                    </Grid>
                                </Body>
                            </Card>
                        </div>

                        {/* ── FOOTER ACTIONS ── */}
                        <div
                            className="org-form-footer"
                            style={{
                                display: 'flex',
                                justifyContent: 'flex-end',
                                gap: 12,
                                borderTop: '1.5px solid var(--border)',
                                padding: '24px 32px'
                            }}
                        >
                            <button
                                type="button"
                                className="btn btn-secondary"
                                onClick={() => navigate('/suppliers')}
                            >
                                CANCEL
                            </button>
                            <button type="submit" className="btn btn-primary" style={{ minWidth: 160 }}>
                                <span className="material-symbols-outlined ms">save</span>
                                {isEdit ? 'SAVE CHANGES' : 'CREATE SUPPLIER'}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}
