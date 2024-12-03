// app/_layout.tsx
import React from 'react';
import { Slot } from 'expo-router';

import { AuthProvider } from '../contexts/AuthContext';

const AppLayout = () => (
    <AuthProvider>
        <Slot />
    </AuthProvider>
);

export default AppLayout;
