'use client';

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { AuthState } from '@/types';
import { dataStore } from '@/lib/dataStore';

interface AuthContextType extends AuthState {
    login: (username: string, password: string) => Promise<boolean>;
    logout: () => void;
    loading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

interface AuthProviderProps {
    children: ReactNode;
}

export function AuthProvider({ children }: AuthProviderProps) {
    const [authState, setAuthState] = useState<AuthState>({
        isAuthenticated: false,
        user: null
    });
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // Check if user is already logged in
        const currentUser = dataStore.getCurrentUser();
        if (currentUser) {
            setAuthState({
                isAuthenticated: true,
                user: currentUser
            });
        }
        setLoading(false);
    }, []);

    const login = async (username: string, password: string): Promise<boolean> => {
        try {
            const user = dataStore.login(username, password);
            if (user) {
                setAuthState({
                    isAuthenticated: true,
                    user
                });
                return true;
            }
            return false;
        } catch (error) {
            console.error('Login error:', error);
            return false;
        }
    };

    const logout = () => {
        dataStore.logout();
        setAuthState({
            isAuthenticated: false,
            user: null
        });
    };

    const value: AuthContextType = {
        ...authState,
        login,
        logout,
        loading
    };

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    );
}

export function useAuth(): AuthContextType {
    const context = useContext(AuthContext);
    if (context === undefined) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
}
