import {StyleSheet, Text, TextProps} from "react-native";
import {useThemeColors} from "@/hooks/useThemeColors";
import {Colors} from "@/constants/colors";



const styles = StyleSheet.create({
    primaryCta:{
        fontFamily: "poppins",
        fontSize: 18,
        fontWeight: "bold",
        lineHeight: 28,
    },
    secondaryCta:{
        fontSize: 18,
        lineHeight: 28,
        fontFamily: "poppins",
        fontWeight: "regular",
    },
    medium:{
        fontSize: 18,
        fontFamily: "poppins",
        fontWeight: "regular",
    },

    simpleText:{
        fontFamily: "poppins",
        fontSize: 12,
        fontWeight: "regular",
    }
})

type Props =  TextProps & {
    variant?: keyof typeof styles;
    color?: keyof typeof Colors["dark"];
}

export function ThemedText({variant, color, ...rest}:Props){
    const colors = useThemeColors()
    return <Text style={[styles[variant ?? "simpleText"], {color: colors[color ?? "defaultLight"]}]} {...rest} />
}

