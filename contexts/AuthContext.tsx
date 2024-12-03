// contexts/AuthContext.tsx
import React, { createContext, useState, ReactNode, useEffect } from 'react';

interface AuthContextProps {
    isLoggedIn: boolean;
    login: () => void;
    logout: () => void;
}

export const AuthContext = createContext<AuthContextProps>({
    isLoggedIn: false,
    login: () => {},
    logout: () => {},
});

interface AuthProviderProps {
    children: ReactNode;
}

export const AuthProvider = ({ children }: AuthProviderProps) => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    console.log('isLoggedIn:', isLoggedIn);
    console.log('hello world');

    const login = () => {
        setIsLoggedIn(true);
    };

    useEffect(() => {
        console.log('isLoggedIn changed:', isLoggedIn);
    }, [isLoggedIn]);

    const logout = () => {
        console.log('LOGOUT FUNCTION CALLED IN PROVIDER');
        setIsLoggedIn(false);
    };

    console.log('AuthProvider rendered');

    return (
        <AuthContext.Provider value={{ isLoggedIn, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};
