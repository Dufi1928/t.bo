// screens/HomeScreen.tsx
import React, { useContext, useEffect } from 'react';
import { SafeAreaView, Button, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { AuthContext } from '@/contexts/AuthContext';
import { ThemedText } from '@/component/ThemedText';

export default function HomeScreen() {
    const { isLoggedIn, logout } = useContext(AuthContext);
    const navigation = useNavigation();

    return (
        <SafeAreaView style={styles.container}>
            <ThemedText variant="primaryCta" color="defaultText">
                Bienvenue !
            </ThemedText>
            <Button title="Se déconnecter" onPress={logout} />
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
});
