import React, { createContext, useContext, useState, useEffect } from 'react';
import api from '../api';

const AuthContext = createContext();

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
};

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(() => {
        const saved = localStorage.getItem('user');
        return saved ? JSON.parse(saved) : null;
    });

    const login = async (email, password) => {
        try {
            const res = await api.post('/api/auth/login', { email, password });
            setUser(res.data);
            localStorage.setItem('user', JSON.stringify(res.data));
            return { success: true };
        } catch (err) {
            let message = 'Login failed';
            if (err.response?.data) {
                message = typeof err.response.data === 'string'
                    ? err.response.data
                    : (err.response.data.message || err.response.data.error || 'Login failed');
            }
            return { success: false, message };
        }
    };

    const signup = async (userData) => {
        try {
            const res = await api.post('/api/auth/signup', userData);
            setUser(res.data);
            localStorage.setItem('user', JSON.stringify(res.data));
            return { success: true };
        } catch (err) {
            let message = 'Signup failed';
            if (err.response?.data) {
                message = typeof err.response.data === 'string'
                    ? err.response.data
                    : (err.response.data.message || err.response.data.error || 'Signup failed');
            }
            return { success: false, message };
        }
    };

    const logout = () => {
        setUser(null);
        localStorage.removeItem('user');
    };

    return (
        <AuthContext.Provider value={{ user, login, signup, logout }}>
            {children}
        </AuthContext.Provider>
    );
};
