import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
};

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [token, setToken] = useState(localStorage.getItem('token'));

    // API base URL
    const API_BASE_URL = 'https://dewavefreeapi20250731173800.azurewebsites.net/api';

    // Check if user is authenticated on app load
    useEffect(() => {
        const checkAuth = async () => {
            const savedToken = localStorage.getItem('token');
            if (savedToken) {
                try {
                    const response = await fetch(`${API_BASE_URL}/auth/me`, {
                        method: 'GET',
                        headers: {
                            'Authorization': `Bearer ${savedToken}`,
                            'Content-Type': 'application/json'
                        }
                    });

                    if (response.ok) {
                        const userData = await response.json();
                        setUser(userData);
                        setToken(savedToken);
                    } else {
                        // Token is invalid, remove it
                        localStorage.removeItem('token');
                        setToken(null);
                    }
                } catch (error) {
                    console.error('Auth check failed:', error);
                    localStorage.removeItem('token');
                    setToken(null);
                }
            }
            setIsLoading(false);
        };

        checkAuth();
    }, []);

    const login = async (username, password) => {
        try {
            console.log('Attempting login to:', `${API_BASE_URL}/auth/login`);

            const response = await fetch(`${API_BASE_URL}/auth/login`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ username, password })
            });

            console.log('Login response status:', response.status);

            if (response.ok) {
                const data = await response.json();
                console.log('Login response data:', data);

                // Adjust based on your API response structure
                const newToken = data.token || data.accessToken || data.jwt;
                const userData = data.user || {
                    id: data.id,
                    username: data.username || username,
                    role: data.role
                };

                if (newToken) {
                    localStorage.setItem('token', newToken);
                    setToken(newToken);
                    setUser(userData);
                    return { success: true };
                } else {
                    console.error('No token found in response');
                    return { success: false, message: 'No authentication token received' };
                }
            } else {
                const errorText = await response.text();
                console.error('Login failed:', errorText);

                try {
                    const errorData = JSON.parse(errorText);
                    return { success: false, message: errorData.message || 'Login failed' };
                } catch {
                    return { success: false, message: 'Login failed' };
                }
            }
        } catch (error) {
            console.error('Login error:', error);
            return { success: false, message: 'Network error occurred' };
        }
    };

    const logout = async () => {
        try {
            if (token) {
                console.log('Attempting logout to:', `${API_BASE_URL}/auth/logout`);

                await fetch(`${API_BASE_URL}/auth/logout`, {
                    method: 'POST',
                    headers: {
                        'Authorization': `Bearer ${token}`,
                        'Content-Type': 'application/json'
                    }
                });
            }
        } catch (error) {
            console.error('Logout error:', error);
        } finally {
            localStorage.removeItem('token');
            setToken(null);
            setUser(null);
        }
    };

    const isAdmin = () => {
        return user?.role === 'Admin' || user?.role === 'admin';
    };

    const value = {
        user,
        token,
        isLoading,
        login,
        logout,
        isAuthenticated: !!token && !!user,
        isAdmin
    };

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    );
};