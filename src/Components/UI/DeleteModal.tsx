import React from 'react';

interface DeleteModalProps {
    itemName: string;
    itemLabel?: string;
    onConfirm: () => void;
    onCancel: () => void;
}

const DeleteModal: React.FC<DeleteModalProps> = ({
    itemName,
    itemLabel = 'item',
    onConfirm,
    onCancel,
}) => {
    return (
        <div
            style={{
                position: 'fixed',
                inset: 0,
                background: 'rgba(0,0,0,0.45)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                zIndex: 1000,
            }}
            onClick={onCancel}
        >
            <div
                style={{
                    background: '#fff',
                    borderRadius: 14,
                    padding: '2rem',
                    maxWidth: 420,
                    width: '90%',
                    boxShadow: '0 20px 60px rgba(0,0,0,0.18)',
                    textAlign: 'center',
                }}
                onClick={(e) => e.stopPropagation()}
            >
                {/* Icon */}
                <div
                    style={{
                        width: 56,
                        height: 56,
                        borderRadius: '50%',
                        background: '#fee2e2',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        margin: '0 auto 1rem',
                        fontSize: 26,
                    }}
                >
                    🗑️
                </div>

                <h2
                    style={{
                        margin: '0 0 0.5rem',
                        fontSize: 18,
                        fontWeight: 800,
                        color: '#111827',
                    }}
                >
                    Delete {itemLabel}?
                </h2>
                <p
                    style={{
                        margin: '0 0 1.5rem',
                        fontSize: 13.5,
                        color: '#6b7280',
                        lineHeight: 1.6,
                    }}
                >
                    Are you sure you want to delete{' '}
                    <strong style={{ color: '#111827' }}>{itemName}</strong>? This action cannot be
                    undone.
                </p>

                <div style={{ display: 'flex', gap: '0.75rem', justifyContent: 'center' }}>
                    <button
                        onClick={onCancel}
                        style={{
                            flex: 1,
                            padding: '0.65rem 1.25rem',
                            borderRadius: 8,
                            border: '1.5px solid #e5e7eb',
                            background: '#fff',
                            color: '#374151',
                            fontWeight: 600,
                            fontSize: 13.5,
                            cursor: 'pointer',
                        }}
                    >
                        Cancel
                    </button>
                    <button
                        onClick={onConfirm}
                        style={{
                            flex: 1,
                            padding: '0.65rem 1.25rem',
                            borderRadius: 8,
                            border: 'none',
                            background: '#ef4444',
                            color: '#fff',
                            fontWeight: 700,
                            fontSize: 13.5,
                            cursor: 'pointer',
                        }}
                    >
                        Delete
                    </button>
                </div>
            </div>
        </div>
    );
};

export default DeleteModal;
