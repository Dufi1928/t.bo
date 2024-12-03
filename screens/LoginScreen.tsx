import React, { useContext, useState } from 'react';
import { View, StyleSheet, RefreshControl, Text, TouchableOpacity, ScrollView } from 'react-native';
import { AuthContext } from '@/contexts/AuthContext';
import { PrimaryButton } from '@/component/PrimaryButton';
import Logo from '@/icons/Logo';
import Illustration from '@/icons/Illustration';
import FacebookIcon from '@/icons/FacebookIcon';
import GoogleIcon from '@/icons/GoogleIcon';
import AppleIcon from '@/icons/AppleIcon';
import { useThemeColors } from '@/hooks/useThemeColors';
import { ThemedText } from '@/component/ThemedText';

const LoginScreen = () => {
    const { login } = useContext(AuthContext);
    const [refreshing, setRefreshing] = useState(false);
    const themeColors = useThemeColors();

    const onRefresh = () => {
        setRefreshing(true);
        setTimeout(() => {
            console.log('Page refreshed');
            setRefreshing(false);
        }, 2000);
    };

    const handleLogin = () => {
        console.log('handleLogin called');
        login();
    };

    return (
        <ScrollView
            style={{ backgroundColor: themeColors.generalBackgroundPrimary }}
            contentContainerStyle={styles.container}
            refreshControl={
                <RefreshControl
                    refreshing={refreshing}
                    onRefresh={onRefresh}
                    colors={[themeColors.defaultDarck]}
                    tintColor={themeColors.buttonPrimaryBackground}
                />
            }
        >
            <Logo width={97} height={53} />
            <Illustration />

            <ThemedText variant="medium" color="defaultLight">Inscrivez-vous pour continuer :</ThemedText>

            <PrimaryButton onPress={handleLogin} text="Continue avec ton numéro de téléphone" />

            <TouchableOpacity style={styles.emailButton}>
                <ThemedText variant="medium" color="buttonPrimaryBackground">
                    Continue avec ton email
                </ThemedText>
            </TouchableOpacity>

            <View style={styles.separator}>
                <View style={styles.line} />
                <Text style={styles.separatorText}>ou connectez-vous avec</Text>
                <View style={styles.line} />
            </View>

            <View style={styles.socialButtons}>
                <TouchableOpacity>
                    <FacebookIcon />
                </TouchableOpacity>
                <TouchableOpacity>
                    <GoogleIcon />
                </TouchableOpacity>
                <TouchableOpacity>
                    <AppleIcon />
                </TouchableOpacity>
            </View>

            <View style={styles.footer}>
                <Text style={styles.footerText}>Conditions d’utilisations</Text>
                <Text style={styles.footerText}>Politique de confidentialité</Text>
            </View>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        flexGrow: 1,
        alignItems: 'center',
        justifyContent: 'space-around',
        paddingVertical: 25,
    },
    title: {
        fontSize: 18,
        textAlign: 'center',
        marginBottom: 10,
    },
    emailButton: {
        borderWidth: 1,
        borderColor: '#F3F3F3',
        paddingVertical: 16,
        borderRadius: 15,
        width: '80%',
        alignItems: 'center',
        marginBottom: 15,
    },
    separator: {
        flexDirection: 'row',
        alignItems: 'center',
        width: '90%',
        marginBottom: 20,
    },
    line: {
        flex: 1,
        height: 1,
        backgroundColor: '#ccc',
    },
    separatorText: {
        marginHorizontal: 10,
        fontSize: 12,
        color: '#000',
    },
    socialButtons: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        width: '75%',
        marginBottom: 20,
    },
    footer: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        width: '100%',
    },
    footerText: {
        fontSize: 12,
        color: '#666',
    },
});

export default LoginScreen;
