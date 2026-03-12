import React from 'react';

interface ConfirmationModalProps {
    title: string;
    message: string;
    confirmLabel?: string;
    cancelLabel?: string;
    onConfirm: () => void;
    onCancel: () => void;
    type?: 'delete' | 'update' | 'default';
}

const ConfirmationModal: React.FC<ConfirmationModalProps> = ({
    title,
    message,
    confirmLabel = 'Confirm',
    cancelLabel = 'Cancel',
    onConfirm,
    onCancel,
    type = 'default',
}) => {
    const getIcon = () => {
        switch (type) {
            case 'delete':
                return '🗑️';
            case 'update':
                return '💾';
            default:
                return '❓';
        }
    };

    const getIconBg = () => {
        switch (type) {
            case 'delete':
                return '#fee2e2';
            case 'update':
                return '#e0f2fe';
            default:
                return '#f3f4f6';
        }
    };

    const getConfirmBtnBg = () => {
        switch (type) {
            case 'delete':
                return '#ef4444';
            case 'update':
                return '#3b82f6';
            default:
                return '#111827';
        }
    };

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
                        background: getIconBg(),
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        margin: '0 auto 1rem',
                        fontSize: 26,
                    }}
                >
                    {getIcon()}
                </div>

                <h2
                    style={{
                        margin: '0 0 0.5rem',
                        fontSize: 18,
                        fontWeight: 800,
                        color: '#111827',
                    }}
                >
                    {title}
                </h2>
                <p
                    style={{
                        margin: '0 0 1.5rem',
                        fontSize: 13.5,
                        color: '#6b7280',
                        lineHeight: 1.6,
                    }}
                >
                    {message}
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
                        {cancelLabel}
                    </button>
                    <button
                        onClick={onConfirm}
                        style={{
                            flex: 1,
                            padding: '0.65rem 1.25rem',
                            borderRadius: 8,
                            border: 'none',
                            background: getConfirmBtnBg(),
                            color: '#fff',
                            fontWeight: 700,
                            fontSize: 13.5,
                            cursor: 'pointer',
                        }}
                    >
                        {confirmLabel}
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ConfirmationModal;
