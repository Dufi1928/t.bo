// Navigation.tsx
import React, { useContext } from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import { AuthContext } from '@/contexts/AuthContext';

import HomeScreen from '@/screens/HomeScreen';
import GeneralLoginScreen from '@/screens/GeneralLoginScreen';
import PhoneLoginScreen from "@/screens/PhoneLoginScreen";
import { StackNavigationProp } from '@react-navigation/stack';
import SmsVerificationScreen from "@/screens/SmsVerificationScreen";


export type RootStackParamList = {
    Home: undefined;
    Login: undefined;
    PhoneLogin: undefined;
    SmsVerification: undefined;
};

// Type pour la navigation
export type NavigationProps = StackNavigationProp<RootStackParamList>;



const Stack = createStackNavigator<RootStackParamList>();

const Navigation = () => {
    const { isLoggedIn } = useContext(AuthContext);

    return (
        <Stack.Navigator screenOptions={{ headerShown: false }}>
            {isLoggedIn ? (
                <Stack.Screen name="Home" component={HomeScreen} />
            ) : (
                <>
                    <Stack.Screen name="Login" component={GeneralLoginScreen} />
                    <Stack.Screen name="PhoneLogin" component={PhoneLoginScreen} />
                    <Stack.Screen name="SmsVerification" component={SmsVerificationScreen} />
                </>
            )}
        </Stack.Navigator>
    );
};

export default Navigation;