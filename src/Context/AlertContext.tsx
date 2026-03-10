import React, { createContext, useContext, useState, useCallback, ReactNode } from 'react';

type AlertType = 'success' | 'error' | 'warning' | 'info';

interface Alert {
    id: string;
    type: AlertType;
    message: string;
    title?: string;
}

interface AlertContextType {
    alerts: Alert[];
    showAlert: (type: AlertType, message: string, title?: string) => void;
    removeAlert: (id: string) => void;
}

const AlertContext = createContext<AlertContextType | undefined>(undefined);

export const AlertProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [alerts, setAlerts] = useState<Alert[]>([]);

    const showAlert = useCallback((type: AlertType, message: string, title?: string) => {
        const id = Math.random().toString(36).substr(2, 9);
        const alert: Alert = { id, type, message, title };
        setAlerts((prev) => [...prev, alert]);
        setTimeout(() => removeAlert(id), 4000);
    }, []);

    const removeAlert = useCallback((id: string) => {
        setAlerts((prev) => prev.filter((a) => a.id !== id));
    }, []);

    return (
        <AlertContext.Provider value={{ alerts, showAlert, removeAlert }}>
            {children}
            {/* Toast Container */}
            <div
                style={{
                    position: 'fixed',
                    top: '1rem',
                    right: '1rem',
                    zIndex: 9999,
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '0.5rem',
                }}
            >
                {alerts.map((alert) => (
                    <div
                        key={alert.id}
                        style={{
                            background:
                                alert.type === 'success'
                                    ? '#22c55e'
                                    : alert.type === 'error'
                                      ? '#ef4444'
                                      : alert.type === 'warning'
                                        ? '#f59e0b'
                                        : '#3b82f6',
                            color: 'white',
                            padding: '0.75rem 1rem',
                            borderRadius: '8px',
                            boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
                            minWidth: '280px',
                            display: 'flex',
                            justifyContent: 'space-between',
                            alignItems: 'center',
                            animation: 'slideIn 0.3s ease',
                        }}
                    >
                        <div>
                            {alert.title && (
                                <div style={{ fontWeight: 600, marginBottom: '0.25rem' }}>
                                    {alert.title}
                                </div>
                            )}
                            <div style={{ fontSize: '0.875rem' }}>{alert.message}</div>
                        </div>
                        <button
                            onClick={() => removeAlert(alert.id)}
                            style={{
                                background: 'none',
                                border: 'none',
                                color: 'white',
                                cursor: 'pointer',
                                fontSize: '1.25rem',
                                marginLeft: '1rem',
                            }}
                        >
                            ×
                        </button>
                    </div>
                ))}
            </div>
        </AlertContext.Provider>
    );
};

export const useAlert = (): AlertContextType => {
    const context = useContext(AlertContext);
    if (!context) throw new Error('useAlert must be used within AlertProvider');
    return context;
};

export default AlertContext;
