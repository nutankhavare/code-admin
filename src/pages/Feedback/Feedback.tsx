import React, { useState } from 'react';
import { CheckCircle } from 'lucide-react';

interface Feedback {
    id: number;
    user: string;
    organisation: string;
    rating: number;
    category: string;
    message: string;
    status: 'New' | 'Reviewed' | 'Resolved';
    date: string;
}

const mockFeedbacks: Feedback[] = Array.from({ length: 15 }, (_, i) => ({
    id: i + 1,
    user: ['Ramesh K', 'Supriya M', 'Aryan T', 'Divya P', 'Nikhil B'][i % 5],
    organisation: ['TechCorp', 'InfoSys', 'Wipro', 'HCL', 'TCS'][i % 5],
    rating: (i % 5) + 1,
    category: ['Bug Report', 'Feature Request', 'General', 'Performance', 'UI/UX'][i % 5],
    message: [
        'Great service overall!',
        'App crashes on login',
        'Need dark mode',
        'GPS tracking is slow',
        'Loved the new update!',
    ][i % 5],
    status: ['New', 'Reviewed', 'Resolved', 'New', 'Reviewed'][i % 5] as Feedback['status'],
    date: new Date(2025, i % 12, (i % 28) + 1).toLocaleDateString('en-IN'),
}));

const stars = (n: number) => '★'.repeat(n) + '☆'.repeat(5 - n);
const statusColors: Record<string, string> = {
    New: '#f59e0b',
    Reviewed: '#3b82f6',
    Resolved: '#10b981',
};

const Feedbacks: React.FC = () => {
    const [filter, setFilter] = useState('All');
    const filtered =
        filter === 'All' ? mockFeedbacks : mockFeedbacks.filter((f) => f.status === filter);

    return (
        <div className="page-container">
            <div className="page-header-bar">
                <div className="breadcrumb-container">
                    <span className="breadcrumb-current">FEEDBACKS</span>
                </div>
                <div style={{ display: 'flex', gap: '0.5rem' }}>
                    {['All', 'New', 'Reviewed', 'Resolved'].map((s) => (
                        <button
                            key={s}
                            className={`btn ${filter === s ? 'btn--primary' : 'btn--outline'} btn--sm`}
                            onClick={() => setFilter(s)}
                        >
                            {s}
                        </button>
                    ))}
                </div>
            </div>

            <div className="feedback-grid">
                {filtered.map((fb) => (
                    <div key={fb.id} className="feedback-card card">
                        <div className="feedback-header">
                            <div>
                                <div className="feedback-user">{fb.user}</div>
                                <div className="feedback-org">{fb.organisation}</div>
                            </div>
                            <span
                                className="status-badge"
                                style={{
                                    background: statusColors[fb.status] + '20',
                                    color: statusColors[fb.status],
                                }}
                            >
                                {fb.status}
                            </span>
                        </div>
                        <div className="feedback-rating" style={{ color: '#f59e0b' }}>
                            {stars(fb.rating)}
                        </div>
                        <div className="feedback-category">{fb.category}</div>
                        <p className="feedback-message">"{fb.message}"</p>
                        <div className="feedback-footer">
                            <span>{fb.date}</span>
                            <button className="action-btn action-btn--view" title="Mark Resolved">
                                <CheckCircle size={15} />
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Feedbacks;
