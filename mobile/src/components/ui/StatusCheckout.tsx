import { View, Text, StyleSheet, StyleProp, TextStyle } from 'react-native'
import { useTheme } from '@/src/hooks/useTheme'
import { Theme } from '@/src/types/theme'

const NumberIcon = ({
	number,
	style,
}: {
	number: number
	style?: StyleProp<TextStyle>
}) => {
	const { theme } = useTheme()
	const styles = useStyles(theme)
	return (
		<View testID="number-container" style={[styles.numberContainer]}>
			<Text testID="number-text" style={[styles.numberText, style]}>
				{number}
			</Text>
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
	const { theme } = useTheme()
	const styles = useStyles(theme)
	return (
		<View testID="status-container" style={styles.statusContainer}>
			<NumberIcon number={number} style={styleNumber} />
			<Text testID="status-text" style={[styles.statusText, styleText]}>
				{status}
			</Text>
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
