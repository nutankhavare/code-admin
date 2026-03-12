import { useLocation, useNavigate } from "react-router-dom"
import type { Device } from "../../types/supplier"
import { ChevronLeft } from "lucide-react"
import './Supplier.css'

export default function SupplierDevicesPage() {

    const location = useLocation()
    const navigate = useNavigate()

    const devices = location.state as Device[]

    return (
        <div className="page-container">
            <div className="page-header-bar">
                <div className="breadcrumb-container">
                    <button className="breadcrumb-link" onClick={() => navigate('/suppliers')}>
                        Suppliers
                    </button>
                    <span className="breadcrumb-sep">›</span>
                    <span className="breadcrumb-current">Supplier Devices</span>
                </div>
                <button className="btn btn--back" onClick={() => navigate('/suppliers')}>
                    <ChevronLeft size={16} /> Back
                </button>
            </div>

            <div className="card">
                <table className="data-table">
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Device Name</th>
                            <th>Type</th>
                        </tr>
                    </thead>
                    <tbody>
                        {devices?.map((device) => (
                            <tr key={device.id}>
                                <td>#{device.id}</td>
                                <td>
                                    <strong>{device.name}</strong>
                                </td>
                                <td>
                                    <span
                                        className="status-badge"
                                        style={{
                                            background: device.type.toLowerCase().includes('beacon') ? '#8b5cf620' : '#10b98120',
                                            color: device.type.toLowerCase().includes('beacon') ? '#7c3aed' : '#10b981',
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
    )
}