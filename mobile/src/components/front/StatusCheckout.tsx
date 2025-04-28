import { Ionicons, Fontisto } from '@expo/vector-icons'
import {
	View,
	Text,
	StyleSheet,
	StyleProp,
	TextStyle,
	ViewStyle,
} from 'react-native'
import { useCustomTheme } from '@/src/context/ThemeContext'
import { Theme } from '@/src/types/theme'

const NumberIcon = ({
	number,
	style,
}: {
	number: number
	style?: StyleProp<TextStyle>
}) => {
	const { theme } = useCustomTheme()
	const styles = useStylesNumber(theme)
	return (
		<View style={[styles.numberContainer]}>
			<Text style={[styles.numberText, style]}>{number}</Text>
		</View>
	)
}

export default function StatusCheckout({
	status,
	number,
	styleText,
	styleNumber,
}: {
	status: string
	colorIcon: string
	number: number
	styleText?: StyleProp<TextStyle>
	styleNumber?: StyleProp<TextStyle>
}) {
	const { theme } = useCustomTheme()
	const styles = useStyles(theme)
	return (
		<View style={styles.statusContainer}>
			<NumberIcon number={number} style={styleNumber} />
			<Text style={[styles.statusText, styleText]}>{status}</Text>
		</View>
	)
}

const useStyles = (theme: Theme) => {
	return StyleSheet.create({
		statusContainer: {
			flexDirection: 'row',
			alignItems: 'center',
			justifyContent: 'space-between',
		},
		statusText: {
			fontSize: theme.size.xs,
			fontFamily: theme.fonts.regular.fontFamily,
			color: theme.colors.text,
			marginLeft: 8,
		},
	})
}

const useStylesNumber = (theme: Theme) => {
	return StyleSheet.create({
		numberContainer: {
			backgroundColor: theme.colors.card,
			borderRadius: 50,
			height: 20,
			width: 20,
			alignItems: 'center',
			justifyContent: 'center',
			borderWidth: 1,
			borderColor: theme.colors.border,
		},
		numberText: {
			fontSize: theme.size.xss,
			fontFamily: theme.fonts.regular.fontFamily,
			color: theme.colors.text,
		},
	})
}
