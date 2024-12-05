import React, { useContext, useState } from 'react';
import {StyleSheet, RefreshControl, TouchableOpacity, ScrollView, View, TextInput, Dimensions} from 'react-native';
import { AuthContext } from '@/contexts/AuthContext';
import { PrimaryButton } from '@/component/PrimaryButton';
import Logo from '@/icons/Logo';
import Clothes from '@/icons/Clothes';
import { useThemeColors } from '@/hooks/useThemeColors';
import { ThemedText } from '@/component/ThemedText';
import BackArrow from '@/icons/BackArrow';
import {StackNavigationProp} from "@react-navigation/stack";
import {RootStackParamList} from "@/app/Navigation";
import {useNavigation} from "@react-navigation/native";
type NavigationProp = StackNavigationProp<RootStackParamList, 'Login'>;


const PhoneLoginScreen = () => {
    const { login } = useContext(AuthContext);
    const [refreshing, setRefreshing] = useState(false);
    const [phone, setPhone] = useState('');
    const [countryCode, setCountryCode] = useState('+33');

    const themeColors = useThemeColors();

    const onRefresh = () => {
        setRefreshing(true);
        setTimeout(() => {
            setRefreshing(false);
        }, 500);
    };

    const handleLogin = () => {
        if (!phone) {
            alert('Veuillez entrer un numéro de téléphone valide.');
            return;
        }
        login();
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
                    colors={[themeColors.defaultLight]}
                    tintColor={themeColors.buttonPrimaryBackground}
                />
            }
        >
            <Logo width={97} height={53} />
            <View style={styles.back_arrow_container}>
                <View style={styles.back_arrow_container}>
                    <TouchableOpacity style={styles.emailButton} onPress={() => navigation.goBack()}>
                        <BackArrow />
                    </TouchableOpacity>
                </View>
            </View>
            <View style={styles.textContentWrapper}>
                <ThemedText variant="large" color="defaultDark">
                    Mon numéro de téléphone
                </ThemedText>
                <ThemedText variant="regular" color="defaultDark">
                    Veuillez entrer votre numéro de téléphone valide. Nous vous enverrons un code à 4 chiffres pour vérifier votre compte.
                </ThemedText>
            </View>
            <View style={styles.inputWrapper}>
                <View style={styles.countryCodeWrapper}>
                    <TextInput
                        value={countryCode}
                        onChangeText={setCountryCode}
                        style={styles.countryCodeInput}
                        keyboardType="phone-pad"
                    />
                </View>
                <TextInput
                    value={phone}
                    onChangeText={setPhone}
                    placeholder="6 52 80 83 98"
                    placeholderTextColor="#ccc"
                    style={styles.phoneInput}
                    keyboardType="number-pad"
                    maxLength={10}
                />
            </View>
            <View style={styles.pageWrapper}>
                <PrimaryButton
                    onPress={() => navigation.navigate('SmsVerification')}
                    variant="primaryCta"
                    text="Continue avec ton numéro de téléphone"
                />
                <Clothes />
            </View>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        flexGrow: 1,
        alignItems: 'center',
        justifyContent: 'space-evenly',
        paddingVertical: 55,
        maxHeight: Dimensions.get('window').height,
    },
    pageWrapper: {
        width: '93%',
        alignItems: 'center',
        gap: 15,
        justifyContent: 'space-evenly',
        paddingVertical: 25,
    },
    textContentWrapper: {
        marginTop: 25,
        marginBottom: 5,
        width: '93%',
        justifyContent: 'flex-start',
        alignItems: 'flex-start',
    },
    back_arrow_container: {
        height: '5%',
        width: '93%',
        alignItems: 'flex-start',
        justifyContent: 'flex-start',
    },
    emailButton: {
        borderWidth: 1,
        borderColor: '#F3F3F3',
        paddingVertical: 16,
        borderRadius: 15,
        width: 52,
        height: 52,
        justifyContent: 'center',
        alignItems: 'center',
    },
    inputWrapper: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        width: '93%',
        marginTop: 15,
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 8,
    },
    countryCodeWrapper: {
        paddingHorizontal: 10,
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 10,
        height: 30,
        borderRightWidth: 1,
        borderRightColor: '#ccc',
    },
    countryCodeInput: {
        fontSize: 16,
        height: 50,
        width: 80,
        borderWidth: 0,
        textAlign: 'center',
    },
    phoneInput: {
        flex: 1,
        borderWidth: 0,
        borderRadius: 8,
        paddingHorizontal: 15,
        fontSize: 16,
        height: 50,
    },
});

export default PhoneLoginScreen;
