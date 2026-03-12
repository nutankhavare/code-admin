import React from 'react';

interface BadgeProps {
    children: React.ReactNode;
    variant?: 'success' | 'warning' | 'error' | 'info' | 'neutral' | 'purple' | 'blue' | 'amber' | 'red' | 'green' | 'orange';
}

export const Badge: React.FC<BadgeProps> = ({ children, variant = 'neutral' }) => {
    const getStyles = () => {
        switch (variant) {
            case 'success':
            case 'green':
                return { bg: '#DCFCE7', color: '#166534' };
            case 'warning':
            case 'amber':
            case 'orange':
                return { bg: '#FEF3C7', color: '#92400E' };
            case 'error':
            case 'red':
                return { bg: '#FEE2E2', color: '#991B1B' };
            case 'info':
            case 'blue':
                return { bg: '#E0F2FE', color: '#075985' };
            case 'purple':
                return { bg: '#F3E8FF', color: '#6B21A8' };
            default:
                return { bg: '#F1F5F9', color: '#475569' };
        }
    };

    const styles = getStyles();

    return (
        <span
            style={{
                display: 'inline-flex',
                alignItems: 'center',
                padding: '2px 8px',
                borderRadius: '9999px',
                fontSize: '11px',
                fontWeight: 700,
                backgroundColor: styles.bg,
                color: styles.color,
                textTransform: 'uppercase',
                letterSpacing: '0.025em',
            }}
        >
            {children}
        </span>
    );
};
