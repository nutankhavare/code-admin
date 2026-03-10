import React from 'react';

interface LoadingSpinnerProps {
    size?: number;
    color?: string;
    text?: string;
}

const LoadingSpinner: React.FC<LoadingSpinnerProps> = ({ size = 24, color = '#6366f1', text }) => {
    return (
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '2rem' }}>
            <svg
                width={size}
                height={size}
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
                style={{ animation: 'spin 1s linear infinite' }}
            >
                <style>
                    {`
                        @keyframes spin {
                            100% {
                                transform: rotate(360deg);
                            }
                        }
                    `}
                </style>
                <path
                    d="M12,1A11,11,0,1,0,23,12,11,11,0,0,0,12,1Zm0,19a8,8,0,1,1,8-8A8,8,0,0,1,12,20Z"
                    opacity=".25"
                    fill={color}
                />
                <path
                    d="M12,4a8,8,0,0,1,7.89,6.7A1.53,1.53,0,0,0,21.38,12h0a1.5,1.5,0,0,0,1.48-1.75,11,11,0,0,0-21.72,0A1.5,1.5,0,0,0,2.62,12h0a1.53,1.53,0,0,0,1.49-1.3A8,8,0,0,1,12,4Z"
                    fill={color}
                />
            </svg>
            {text && <span style={{ marginTop: '1rem', color: '#6b7280', fontSize: '14px', fontWeight: 500 }}>{text}</span>}
        </div>
    );
};

export default LoadingSpinner;
