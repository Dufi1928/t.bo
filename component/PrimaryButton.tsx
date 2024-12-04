import React from 'react';
import { TouchableOpacity, StyleSheet, ViewProps } from 'react-native';
import { ThemedText } from '@/component/ThemedText';
import { useThemeColors } from '@/hooks/useThemeColors'; // Importation du hook pour gérer les couleurs dynamiquement

// Définition des styles de base
const styles = StyleSheet.create({
    primaryCta: {
        width: '93%',
        paddingVertical: 12,
        paddingHorizontal: 5,
        borderRadius: 8,
        backgroundColor: "green",
        alignItems: 'center',
        justifyContent: 'center',
    },
    secondaryCta: {
        fontSize: 18,
        lineHeight: 28,
        fontFamily: 'poppins',
        fontWeight: '400',
    },
    simpleText: {
        fontFamily: 'poppins',
        fontSize: 12,
        fontWeight: '400',
    },
});

interface PrimaryButtonProps extends ViewProps {
    onPress: () => void;
    text: string;
    variant?: 'primaryCta' | 'secondaryCta' | 'simpleText'; // Synchronisé avec les variantes prises en charge
}

export function PrimaryButton({ onPress, text, variant = 'primaryCta', ...rest }: PrimaryButtonProps) {
    const themeColors = useThemeColors();

    const buttonStyle: ViewProps['style'] = [
        styles.primaryCta,
        { backgroundColor: themeColors.buttonPrimaryBackground },
    ];

    return (
        <TouchableOpacity style={buttonStyle} onPress={onPress} {...rest}>
            <ThemedText variant={variant} color="defaultDarck">
                {text}
            </ThemedText>
        </TouchableOpacity>
    );
}
