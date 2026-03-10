import React, { useState } from 'react';
import './Plan.css';
import { Eye, Pencil, Plus, Trash2 } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import DeleteModal from '../../Components/UI/DeleteModal';

interface Plan {
    id: number;
    name: string;
    price: number;
    billing: 'Monthly' | 'Yearly';
    users: number;
    features: string[];
    status: 'Active' | 'Inactive';
    subscribers: number;
}

const initialPlans: Plan[] = [
    {
        id: 1,
        name: 'Starter',
        price: 999,
        billing: 'Monthly',
        users: 25,
        features: ['Basic Tracking', 'Email Support', '5 GPS Devices', 'Basic Reports'],
        status: 'Active',
        subscribers: 142,
    },
    {
        id: 2,
        name: 'Pro',
        price: 2499,
        billing: 'Monthly',
        users: 100,
        features: [
            'Advanced Tracking',
            'Priority Support',
            '25 GPS Devices',
            'Advanced Reports',
            'API Access',
        ],
        status: 'Active',
        subscribers: 89,
    },
    {
        id: 3,
        name: 'Enterprise',
        price: 7999,
        billing: 'Monthly',
        users: 500,
        features: [
            'Unlimited Tracking',
            '24/7 Support',
            'Unlimited Devices',
            'Custom Reports',
            'API Access',
            'White Label',
        ],
        status: 'Active',
        subscribers: 34,
    },
    {
        id: 4,
        name: 'Trial',
        price: 0,
        billing: 'Monthly',
        users: 5,
        features: ['Basic Tracking', 'Community Support', '1 GPS Device'],
        status: 'Active',
        subscribers: 210,
    },
];

const planGradients = [
    'linear-gradient(135deg, #667eea, #764ba2)',
    'linear-gradient(135deg, #7c3aed, #4f46e5)',
    'linear-gradient(135deg, #0ea5e9, #0284c7)',
    'linear-gradient(135deg, #10b981, #059669)',
];

const Plans: React.FC = () => {
    const [view, setView] = useState<'cards' | 'table'>('cards');
    const [plans, setPlans] = useState<Plan[]>(initialPlans);

    const navigate = useNavigate();

    const [deleteTarget, setDeleteTarget] = useState<Plan | null>(null);

    const handleDeleteConfirm = () => {
        if (deleteTarget) {
            setPlans(plans.filter((p) => p.id !== deleteTarget.id));
            setDeleteTarget(null);
        }
    };

    const toggleStatus = (id: number) => {
        setPlans(
            plans.map((p) =>
                p.id === id ? { ...p, status: p.status === 'Active' ? 'Inactive' : 'Active' } : p
            )
        );
    };

    return (
        <div className="page-container">
            {deleteTarget && (
                <DeleteModal
                    itemName={deleteTarget.name}
                    itemLabel="plan"
                    onConfirm={handleDeleteConfirm}
                    onCancel={() => setDeleteTarget(null)}
                />
            )}
            <div className="page-header-bar">
                <div className="breadcrumb-container">
                    <span className="breadcrumb-current">PLAN MANAGEMENT</span>
                </div>

                <div style={{ display: 'flex', gap: '0.5rem' }}>
                    <button
                        className={`btn ${view === 'cards' ? 'btn--primary' : 'btn--outline'}`}
                        onClick={() => setView('cards')}
                    >
                        Cards
                    </button>

                    <button
                        className={`btn ${view === 'table' ? 'btn--primary' : 'btn--outline'}`}
                        onClick={() => setView('table')}
                    >
                        Table
                    </button>

                    <button className="btn btn--header-add" onClick={() => navigate('/Plan/add')}>
                        <Plus size={16} /> Add Plan
                    </button>
                </div>
            </div>

            {/* CARD VIEW */}
            {view === 'cards' ? (
                <div className="plans-grid">
                    {plans.map((plan, i) => (
                        <div key={plan.id} className="plan-card">
                            <div
                                className="plan-card-header"
                                style={{ background: planGradients[i % planGradients.length] }}
                            >
                                <div className="plan-name">{plan.name}</div>

                                <div className="plan-price">
                                    {plan.price === 0 ? (
                                        'Free'
                                    ) : (
                                        <>
                                            ₹{plan.price.toLocaleString()}
                                            <span>/mo</span>
                                        </>
                                    )}
                                </div>

                                <div className="plan-users">Up to {plan.users} users</div>
                            </div>

                            <div className="plan-card-body">
                                <div className="plan-subscribers">
                                    <strong>{plan.subscribers}</strong> active subscribers
                                </div>

                                <ul className="plan-features">
                                    {plan.features.map((f) => (
                                        <li key={f}>
                                            <span className="check">✓</span>
                                            {f}
                                        </li>
                                    ))}
                                </ul>

                                <div className="plan-actions">
                                    <button
                                        className="btn btn--outline btn--sm"
                                        title="Edit"
                                        onClick={() => navigate(`/Plan/edit/${plan.id}`)}
                                    >
                                        <Pencil size={14} /> Edit
                                    </button>

                                    <button
                                        className="btn btn--outline btn--sm"
                                        title="View"
                                        onClick={() => navigate(`/Plan/${plan.id}`)}
                                    >
                                        <Eye size={14} /> View
                                    </button>

                                    <button
                                        className="btn btn--danger btn--sm"
                                        title="Delete"
                                        onClick={() => setDeleteTarget(plan)}
                                    >
                                        <Trash2 size={14} /> Delete
                                    </button>

                                    <button
                                        className="btn btn--secondary btn--sm"
                                        onClick={() => toggleStatus(plan.id)}
                                    >
                                        {plan.status === 'Active' ? 'Disable' : 'Enable'}
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            ) : (
                /* TABLE VIEW */
                <div className="card">
                    <table className="data-table">
                        <thead>
                            <tr>
                                <th>Plan</th>
                                <th>Price</th>
                                <th>Users</th>
                                <th>Subscribers</th>
                                <th>Status</th>
                                <th>Actions</th>
                            </tr>
                        </thead>

                        <tbody>
                            {plans.map((plan) => (
                                <tr key={plan.id}>
                                    <td>
                                        <strong>{plan.name}</strong>
                                    </td>

                                    <td>{plan.price === 0 ? 'Free' : `₹${plan.price}/mo`}</td>

                                    <td>Up to {plan.users}</td>

                                    <td>{plan.subscribers}</td>

                                    <td>
                                        <span
                                            className="status-badge"
                                            style={{
                                                background: '#10b98120',
                                                color: '#10b981',
                                            }}
                                        >
                                            {plan.status}
                                        </span>
                                    </td>

                                    <td>
                                        <div className="table-actions">
                                            <button
                                                className="action-btn action-btn--view"
                                                title="View"
                                                onClick={() => navigate(`/Plan/${plan.id}`)}
                                            >
                                                <Eye size={15} />
                                            </button>

                                            <button
                                                className="action-btn action-btn--edit"
                                                title="Edit"
                                                onClick={() => navigate(`/Plan/edit/${plan.id}`)}
                                            >
                                                <Pencil size={15} />
                                            </button>

                                            <button
                                                className="action-btn action-btn--delete"
                                                title="Delete"
                                                onClick={() => setDeleteTarget(plan)}
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
            )}
        </div>
    );
};

export default Plans;
