import { useState } from "react"
import { useNavigate } from "react-router-dom"
import type { Supplier } from "../../types/supplier"
import { Eye, Pencil, Trash2, Plus } from "lucide-react"
import './Supplier.css'

const dummySuppliers: Supplier[] = [
    {
        id: 1,
        name: "iTriangle",
        location: "Bangalore",
        devices: [
            { id: 1, name: "Beacon 1", type: "Beacon" },
            { id: 2, name: "Beacon 2", type: "Beacon" },
            { id: 3, name: "Beacon 3", type: "Beacon" },
            { id: 4, name: "Beacon 4", type: "Beacon" },
            { id: 5, name: "Beacon 5", type: "Beacon" },
            { id: 6, name: "Beacon 6", type: "Beacon" },
            { id: 7, name: "Beacon 7", type: "Beacon" },
            { id: 8, name: "Beacon 8", type: "Beacon" },
            { id: 9, name: "Beacon 9", type: "Beacon" },
            { id: 10, name: "Beacon 10", type: "Beacon" }
        ]
    },
    {
        id: 2,
        name: "TechSupply",
        location: "Hyderabad",
        devices: [
            { id: 11, name: "Beacon A", type: "Beacon" },
            { id: 12, name: "Beacon B", type: "Beacon" }
        ]
    }
]

export default function SupplierManagementIndex() {

    const navigate = useNavigate()

    const [search] = useState("")
    const [suppliers, setSuppliers] = useState(dummySuppliers)

    const filtered = suppliers.filter((s) =>
        s.name.toLowerCase().includes(search.toLowerCase())
    )

    const deleteSupplier = (id: number) => {
        setSuppliers(suppliers.filter((s) => s.id !== id))
    }

    return (
        <div className="page-container">
            <div className="page-header-bar">
                <div className="breadcrumb-container">
                    <span className="breadcrumb-current">SUPPLIER MANAGEMENT</span>
                </div>

                <div style={{ display: 'flex', gap: '0.5rem' }}>
                    <button className="btn btn--header-add" onClick={() => navigate('/suppliers/create')}>
                        <Plus size={16} /> Onboard Supplier
                    </button>
                </div>
            </div>

            <div className="card">
                <table className="data-table">
                    <thead>
                        <tr>
                            <th>S.No</th>
                            <th>Supplier Name</th>
                            <th>Location</th>
                            <th>Devices Provided</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filtered.map((supplier, index) => (
                            <tr key={supplier.id}>
                                <td>{index + 1}</td>
                                <td>
                                    <strong>{supplier.name}</strong>
                                </td>
                                <td>{supplier.location}</td>
                                <td>
                                    <button
                                        onClick={() =>
                                            navigate(`/suppliers/${supplier.id}/devices`, {
                                                state: supplier.devices
                                            })
                                        }
                                        className="btn btn--outline btn--sm"
                                    >
                                        {supplier.devices.length} Devices
                                    </button>
                                </td>
                                <td>
                                    <div className="table-actions">
                                        <button
                                            className="action-btn action-btn--view"
                                            title="View"
                                            onClick={() => alert("View Supplier")}
                                        >
                                            <Eye size={15} />
                                        </button>
                                        <button
                                            className="action-btn action-btn--edit"
                                            title="Edit"
                                            onClick={() => navigate(`/suppliers/create?id=${supplier.id}`)}
                                        >
                                            <Pencil size={15} />
                                        </button>
                                        <button
                                            className="action-btn action-btn--delete"
                                            title="Delete"
                                            onClick={() => deleteSupplier(supplier.id)}
                                        >
                                            <Trash2 size={15} />
                                        </button>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    )
}