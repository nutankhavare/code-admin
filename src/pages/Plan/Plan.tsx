import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Eye, Pencil, Plus, Trash2 } from 'lucide-react';
import ConfirmationModal from '../../Components/UI/ConfirmationModal';
import { Badge } from '../../Components/UI/Badge';
import './Plan.css';

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
            setPlans(plans.filter((p: Plan) => p.id !== deleteTarget.id));
            setDeleteTarget(null);
        }
    };

    const toggleStatus = (id: number) => {
        setPlans(
            plans.map((p: Plan) =>
                p.id === id ? { ...p, status: p.status === 'Active' ? 'Inactive' : 'Active' } : p
            )
        );
    };

    return (
        <div className="page">
            {deleteTarget && (
                <ConfirmationModal
                    title="Delete Plan?"
                    message={`Are you sure you want to delete the plan "${deleteTarget.name}"? This action cannot be undone.`}
                    confirmLabel="Delete"
                    onConfirm={handleDeleteConfirm}
                    onCancel={() => setDeleteTarget(null)}
                    type="delete"
                />
            )}

            <div className="page-header">
                <div className="breadcrumb">
                    PLAN MANAGEMENT <span>/ {view === 'cards' ? 'CARD VIEW' : 'TABLE VIEW'}</span>
                </div>

                <div className="header-actions">
                    <button
                        className={`btn ${view === 'cards' ? 'btn-primary' : 'btn-secondary'}`}
                        onClick={() => setView('cards')}
                    >
                        Cards
                    </button>

                    <button
                        className={`btn ${view === 'table' ? 'btn-primary' : 'btn-secondary'}`}
                        onClick={() => setView('table')}
                    >
                        Table
                    </button>

                    <button className="btn btn-primary" onClick={() => navigate('/Plan/add')}>
                        <Plus size={16} /> Add Plan
                    </button>
                </div>
            </div>

            <div className="page-body">

                {/* CARD VIEW */}
                {view === 'cards' ? (
                    <div className="plans-grid">
                        {plans.map((plan: Plan, i: number) => (
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
                                        {plan.features.map((f: string) => (
                                            <li key={f}>
                                                <span className="check">✓</span>
                                                {f}
                                            </li>
                                        ))}
                                    </ul>

                                    <div className="plan-actions">
                                        <button
                                            className="btn btn-secondary btn-sm"
                                            title="Edit"
                                            onClick={() => navigate(`/Plan/edit/${plan.id}`)}
                                        >
                                            <Pencil size={14} /> Edit
                                        </button>

                                        <button
                                            className="btn btn-secondary btn-sm"
                                            title="View"
                                            onClick={() => navigate(`/Plan/${plan.id}`)}
                                        >
                                            <Eye size={14} /> View
                                        </button>

                                        <button
                                            className="btn btn-secondary btn-sm"
                                            style={{ color: 'var(--danger)' }}
                                            title="Delete"
                                            onClick={() => setDeleteTarget(plan)}
                                        >
                                            <Trash2 size={14} /> Delete
                                        </button>

                                        <button
                                            className="btn btn-secondary btn-sm"
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
                    <div className="card">
                        <div className="table-card">
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
                                    {plans.map((plan: Plan) => (
                                        <tr key={plan.id}>
                                            <td>
                                                <strong>{plan.name}</strong>
                                            </td>

                                            <td>{plan.price === 0 ? 'Free' : `₹${plan.price}/mo`}</td>

                                            <td>Up to {plan.users}</td>

                                            <td>{plan.subscribers}</td>

                                            <td>
                                                <Badge
                                                    variant={plan.status === 'Active' ? 'success' : 'error'}
                                                >
                                                    {plan.status}
                                                </Badge>
                                            </td>

                                            <td>
                                                <div className="table-actions">
                                                    <button
                                                        className="act-btn act-view"
                                                        title="View"
                                                        onClick={() => navigate(`/Plan/${plan.id}`)}
                                                    >
                                                        <Eye size={15} />
                                                    </button>

                                                    <button
                                                        className="act-btn act-edit"
                                                        title="Edit"
                                                        onClick={() => navigate(`/Plan/edit/${plan.id}`)}
                                                    >
                                                        <Pencil size={15} />
                                                    </button>

                                                    <button
                                                        className="act-btn act-delete"
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
                    </div>
                )}
            </div>
        </div>
    );
};

export default Plans;
