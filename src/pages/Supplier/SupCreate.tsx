import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { ChevronLeft } from "lucide-react"
import './Supplier.css'

export default function SupplierManagementCreate() {

    const navigate = useNavigate()

    const [form, setForm] = useState({
        name: '',
        location: '',
        status: 'Active'
    })

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const submit = (e: React.FormEvent) => {
        e.preventDefault()

        if (!form.name.trim() || !form.location.trim()) {
            alert('Supplier Name and Location are required');
            return;
        }

        console.log(form)
        alert("Supplier Created (Dummy)")
        navigate("/suppliers")
    }

    return (
        <div className="page-container">
            <div className="page-header-bar">
                <div className="breadcrumb-container">
                    <button className="breadcrumb-link" onClick={() => navigate('/suppliers')}>
                        Suppliers
                    </button>
                    <span className="breadcrumb-sep">›</span>
                    <span className="breadcrumb-current">Add New Supplier</span>
                </div>
                <button className="btn btn--back" onClick={() => navigate('/suppliers')}>
                    <ChevronLeft size={16} /> Back
                </button>
            </div>

            <div className="sp-form-wrapper">
                <div className="sp-form-card">
                    {/* HEADER */}
                    <div className="sp-form-header">
                        <span className="sp-form-icon">🏢</span>
                        <span>ADD NEW SUPPLIER</span>
                    </div>

                    <form onSubmit={submit}>
                        {/* SUPPLIER DETAILS */}
                        <div className="sp-section">
                            <div className="sp-section-title">
                                <span className="sp-section-icon" style={{ color: '#ef4444' }}>📄</span>
                                SUPPLIER DETAILS
                            </div>

                            <div className="sp-section-body">
                                <div className="form-group">
                                    <label className="form-label">
                                        SUPPLIER NAME <span className="required-mark">*</span>
                                    </label>
                                    <input
                                        className="form-input"
                                        placeholder="e.g. Acme Corp"
                                        name="name"
                                        value={form.name}
                                        onChange={handleChange}
                                    />
                                </div>

                                <div className="form-group">
                                    <label className="form-label">
                                        LOCATION <span className="required-mark">*</span>
                                    </label>
                                    <input
                                        className="form-input"
                                        placeholder="e.g. Bangalore, Mumbai"
                                        name="location"
                                        value={form.location}
                                        onChange={handleChange}
                                    />
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
                            </div>
                        </div>

                        {/* FOOTER */}
                        <div className="sp-form-footer">
                            <button
                                type="button"
                                className="btn sp-cancel-btn"
                                onClick={() => navigate('/suppliers')}
                            >
                                Cancel
                            </button>

                            <button type="submit" className="btn sp-save-btn">
                                Save Supplier
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}