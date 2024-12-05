import React, { useState, useEffect, useContext } from 'react';
import {
    StyleSheet,
    TouchableOpacity,
    ScrollView,
    View,
    Text,
    Dimensions,
    TextInput,
} from 'react-native';
import { useThemeColors } from '@/hooks/useThemeColors';
import { ThemedText } from '@/component/ThemedText';
import BackArrow from '@/icons/BackArrow';
import { useNavigation } from '@react-navigation/native';
import Logo from '@/icons/Logo';


const SmsVerificationScreen = () => {
    const navigation = useNavigation();
    const themeColors = useThemeColors();
    const [code, setCode] = useState(['', '', '', '']);
    const [timer, setTimer] = useState(60);

    // Countdown logic
    useEffect(() => {
        if (timer > 0) {
            const interval = setInterval(() => {
                setTimer((prevTimer) => prevTimer - 1);
            }, 1000);
            return () => clearInterval(interval);
        }
    }, [timer]);

    const handleKeyPress = (key: string | number): void => {
        if (key === 'delete') {
            // Trouve le dernier chiffre rempli
            const lastFilledIndex = code.findLastIndex((digit) => digit !== '');
            if (lastFilledIndex !== -1) {
                const updatedCode = [...code];
                updatedCode[lastFilledIndex] = '';
                setCode(updatedCode);
            }
        } else if (typeof key === 'number' || (!isNaN(Number(key)))) {
            const firstEmptyIndex = code.findIndex((digit) => digit === '');
            if (firstEmptyIndex !== -1) {
                const updatedCode = [...code];
                updatedCode[firstEmptyIndex] = key.toString();
                setCode(updatedCode);
            }
        }
    };



    const resendCode = () => {
        setTimer(60);
        // TODO: Add API call to resend code
    };

    return (
        <ScrollView
            style={{ backgroundColor: themeColors.generalBackgroundPrimary }}
            contentContainerStyle={styles.container}
        >
            <Logo width={97} height={53} />
            <View style={styles.back_arrow_container}>
                <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
                    <BackArrow />
                </TouchableOpacity>
            </View>
            <View style={styles.pageWrapper}>
                <ThemedText variant="largeBolder" color="defaultDark">
                    {`00:${timer < 10 ? `0${timer}` : timer}`}
                </ThemedText>
                <ThemedText variant="regular" color="defaultDark">
                    Tapez le code de vérification nous vous avons envoyé
                </ThemedText>
                <View style={styles.codeContainer}>
                    {code.map((digit, index) => (
                        <View
                            key={index}
                            style={[
                                styles.codeBox,
                                {
                                    backgroundColor: digit === '' ? themeColors.generalBackgroundPrimary : themeColors.primaryGreen,
                                    borderColor: digit === '' ? themeColors.primaryGray : themeColors.primaryGreen,
                                }
                            ]}
                        >
                            <ThemedText
                                variant="digits"
                                color={digit === '' ? "primaryGreenUnselected" : "generalBackgroundPrimary"}
                            >
                                {digit === '' ? '0' : digit}
                            </ThemedText>

                        </View>
                    ))}
                </View>
                <View style={styles.keyboardContainer}>
                    {[[1, 2, 3], [4, 5, 6], [7, 8, 9], [' ',0, 'delete']].map((row, rowIndex) => (
                        <View
                            key={rowIndex}
                            style={[
                                styles.keyboardRow,
                                rowIndex === 3 && styles.lastKeyboardRow, // Style spécial pour la dernière ligne
                            ]}
                        >
                            {row.map((key) => (
                                <TouchableOpacity
                                    key={key}
                                    style={styles.key}
                                    onPress={() =>
                                        handleKeyPress(key === 'delete' ? 'delete' : key.toString())
                                    }
                                >
                                    <Text style={styles.keyText}>{key === 'delete' ? '⌫' : key}</Text>
                                </TouchableOpacity>
                            ))}
                        </View>
                    ))}
                </View>

                {timer === 0 && (
                    <TouchableOpacity onPress={resendCode}>
                        <ThemedText variant="small" color="buttonPrimaryBackground">
                            Renvoyer le code
                        </ThemedText>
                    </TouchableOpacity>
                )}
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
        height: '80%',
        justifyContent: 'space-evenly',
    },
    back_arrow_container: {
        height: '5%',
        width: '93%',
        alignItems: 'flex-start',
        justifyContent: 'flex-start',
    },
    backButton: {
        borderWidth: 1,
        borderColor: '#F3F3F3',
        paddingVertical: 16,
        borderRadius: 15,
        width: 52,
        height: 52,
        justifyContent: 'center',
        alignItems: 'center',
    },
    codeContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '93%',
        marginVertical: 15,
    },
    codeBox: {
        width: 70,
        height: 70,
        borderRadius: 8,
        borderWidth: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    keyboardContainer: {
        marginTop: 20,
        width: '80%',
    },
    keyboardRow: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        marginBottom: 15,
    },
    key: {
        width: 60,
        height: 60,
        borderRadius: 30,
        justifyContent: 'center',
        alignItems: 'center',
    },
    lastKeyboardRow: {
        justifyContent: 'space-evenly', // Aligner à gauche
        marginLeft: 20, // Ajouter un espacement pour éloigner légèrement du bord
    },
    keyText: {
        fontSize: 22,
        fontWeight: 'bold',
        color: '#000',
    },
});

export default SmsVerificationScreen;
