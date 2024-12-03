// index.tsx
import React from 'react';
import { AppRegistry } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';

import { AuthProvider } from '@/contexts/AuthContext';
import Navigation from '@/app/Navigation';
import appConfig from '@/app.json';

const appName = appConfig.expo.name;
const App = () => (
    <AuthProvider>
        <NavigationContainer>
            <Navigation />
        </NavigationContainer>
    </AuthProvider>
);
AppRegistry.registerComponent(appName, () => App);

export default Navigation;
