import { useLocation, useNavigate } from "react-router-dom"
import type { Device } from "../../types/supplier"
import './Supplier.css'

export default function SupplierDevicesPage() {
    const location = useLocation();
    const navigate = useNavigate();

    const devices = location.state as Device[];

    return (
        <div className="page-container">
            {/* ── HEADER & BREADCRUMBS ── */}
            <div className="page-header">
                <div>
                    <div className="page-title">
                        <span className="material-symbols-outlined ms" style={{ fontSize: 18 }}>
                            devices
                        </span>
                        Supplier Devices
                    </div>
                    <div className="breadcrumb">
                        <span
                            style={{ cursor: 'pointer', color: 'var(--primary)', fontWeight: 700 }}
                            onClick={() => navigate('/suppliers')}
                        >
                            SUPPLIERS
                        </span>
                        <span>/</span> SUPPLIER DEVICES
                    </div>
                </div>
                <button className="btn btn-secondary" onClick={() => navigate('/suppliers')}>
                    <span className="material-symbols-outlined ms">arrow_back</span> BACK
                </button>
            </div>

            <div className="card">
                <table className="data-table">
                    <thead>
                        <tr>
                            <th style={{ paddingLeft: '24px' }}>ID</th>
                            <th>Device Name</th>
                            <th>Type</th>
                        </tr>
                    </thead>
                    <tbody>
                        {devices?.map((device) => (
                            <tr key={device.id}>
                                <td style={{ paddingLeft: '24px' }}>#{device.id}</td>
                                <td>
                                    <strong>{device.name}</strong>
                                </td>
                                <td>
                                    <span
                                        className="status-badge"
                                        style={{
                                            background: device.type.toLowerCase().includes('beacon') ? '#8b5cf620' : '#10b98120',
                                            color: device.type.toLowerCase().includes('beacon') ? '#7c3aed' : '#10b981',
                                            fontSize: '10px',
                                            fontWeight: 800,
                                            textTransform: 'uppercase',
                                            padding: '4px 10px',
                                            borderRadius: '6px'
                                        }}
                                    >
                                        {device.type}
                                    </span>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
