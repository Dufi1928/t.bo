import React, { useState } from 'react';
import { View, StyleSheet, RefreshControl, Text, TouchableOpacity, ScrollView } from 'react-native';
import { PrimaryButton } from '@/component/PrimaryButton';
import Logo from '@/icons/Logo';
import Illustration from '@/icons/Illustration';
import FacebookIcon from '@/icons/FacebookIcon';
import GoogleIcon from '@/icons/GoogleIcon';
import AppleIcon from '@/icons/AppleIcon';
import { useThemeColors } from '@/hooks/useThemeColors';
import { ThemedText } from '@/component/ThemedText';
import {useNavigation} from "@react-navigation/native";
import { StackNavigationProp } from '@react-navigation/stack';
import {RootStackParamList} from '@/app/Navigation'

type NavigationProp = StackNavigationProp<RootStackParamList, 'Login'>;

const GeneralLoginScreen = () => {
    const [refreshing, setRefreshing] = useState(false);
    const themeColors = useThemeColors();


    const onRefresh = () => {
        setRefreshing(true);
        setTimeout(() => {
            setRefreshing(false);
        }, 500);
    };

    const navigation = useNavigation<NavigationProp>();


    return (
        <ScrollView
            style={{ backgroundColor: themeColors.generalBackgroundPrimary }}
            contentContainerStyle={styles.container}
            refreshControl={
                <RefreshControl
                    refreshing={refreshing}
                    onRefresh={onRefresh}
                    colors={[themeColors.defaultDark]}
                    tintColor={themeColors.buttonPrimaryBackground}
                />
            }
        >
            <Logo width={97} height={53} />
            <Illustration />

            <ThemedText variant="medium" color="defaultDark">Inscrivez-vous pour continuer :</ThemedText>

            <PrimaryButton
                onPress={() => navigation.navigate('PhoneLogin')}
                variant="primaryCta"
                text="Continue avec ton numéro de téléphone"
            />

            <TouchableOpacity style={styles.emailButton}>
                <ThemedText variant="medium" color="buttonPrimaryBackground">
                    Continue avec ton email
                </ThemedText>
            </TouchableOpacity>

            <View style={styles.separator}>
                <View style={styles.line} />
                <ThemedText variant="small" color="defaultDark">
                    ou connectez-vous avec
                </ThemedText>
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
                <ThemedText variant="smallest" color="defaultDark">Conditions d’utilisations</ThemedText>
                <ThemedText variant="smallest" color="defaultDark">Politique de confidentialité</ThemedText>
            </View>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        flexGrow: 1,
        alignItems: 'center',
        alignContent: 'center',
        marginTop: "auto",
        justifyContent: 'space-around',
        paddingVertical: 45,
        paddingHorizontal: '3.5%',
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
    },
    separator: {
        flexDirection: 'row',
        alignItems: 'center',
        width: '90%',
        marginBottom: 15,
    },
    line: {
        flex: 1,
        height: 1,
        marginHorizontal: 5,
        backgroundColor: '#ccc',
    },
    separatorText: {
        fontSize: 12,
        color: '#000',
    },
    socialButtons: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        width: '75%',
        marginBottom: 5,
    },
    footer: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        width: '100%',
    },
});

export default GeneralLoginScreen;
