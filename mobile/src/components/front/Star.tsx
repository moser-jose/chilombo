import { View, Text, StyleSheet, StyleProp, ViewStyle } from 'react-native'
import { Ionicons } from '@expo/vector-icons'
import { useCustomTheme } from '@/src/context/ThemeContext'
import { Theme } from '@/src/types/theme'

type StarProps = {
	rating: number
	style?: StyleProp<ViewStyle>
	textColor?: string
}

export default function Star({ rating, style, textColor = '#fff' }: StarProps) {
	const { theme } = useCustomTheme()
	const styles = makeStyles(theme)
	return (
		<View style={[styles.starContainer, style]}>
			<Ionicons name="star" size={12} color="#FFC107" />
			<Text style={[styles.starText, { color: textColor }]}>{rating}</Text>
		</View>
	)
}

const makeStyles = (theme: Theme) =>
	StyleSheet.create({
		starContainer: {
			backgroundColor: 'rgba(0, 0, 0, 0.6)',
			flexDirection: 'row',
			alignItems: 'center',
			paddingHorizontal: 8,
			paddingVertical: 4,
			borderRadius: 12,
			justifyContent: 'center',
			borderWidth: 1,
			borderColor: 'rgba(0, 0, 0, 0.22)',
		},
		starText: {
			fontSize: theme.size.xss,
			fontFamily: theme.fonts.semibold.fontFamily,
			color: '#fff',
			marginLeft: 4,
		},
	})
