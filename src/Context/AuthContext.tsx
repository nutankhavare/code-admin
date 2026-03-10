import React, { createContext, useContext, useState, useCallback, type ReactNode } from 'react';
import type { AuthContextType, AuthState, LoginCredentials, User } from '../types/authtypes';

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const initialState: AuthState = {
    user: null,
    token: localStorage.getItem('vanloka_token'),
    isAuthenticated: !!localStorage.getItem('vanloka_token'),
    isLoading: false,
};

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [state, setState] = useState<AuthState>(initialState);

    const login = useCallback(async (credentials: LoginCredentials) => {
        setState((prev) => ({ ...prev, isLoading: true }));
        try {
            // Simulate API call
            await new Promise((resolve) => setTimeout(resolve, 800));
            const mockUser: User = {
                id: '1',
                name: 'Admin User',
                email: credentials.email,
                role: 'Super Admin',
                avatar: undefined,
            };
            const token = 'mock_jwt_token_' + Date.now();
            localStorage.setItem('vanloka_token', token);
            setState({ user: mockUser, token, isAuthenticated: true, isLoading: false });
        } catch {
            setState((prev) => ({ ...prev, isLoading: false }));
            throw new Error('Invalid credentials');
        }
    }, []);

    const logout = useCallback(() => {
        localStorage.removeItem('vanloka_token');
        setState({ user: null, token: null, isAuthenticated: false, isLoading: false });
    }, []);

    return (
        <AuthContext.Provider value={{ ...state, login, logout }}>{children}</AuthContext.Provider>
    );
};

export const useAuth = (): AuthContextType => {
    const context = useContext(AuthContext);
    if (!context) throw new Error('useAuth must be used within AuthProvider');
    return context;
};

export default AuthContext;
