import { StyleSheet } from 'react-native'

import { Text, View } from '@/src/components/Themed'
import { useCustomTheme } from '@/src/context/ThemeContext'
import { Theme } from '@/src/types/theme'

export default function ServicesScreen() {
	const { theme } = useCustomTheme()
	const styles = useStyles(theme)
	return (
		<View style={styles.container}>
			<Text style={styles.title}>Em desenvolvimento</Text>
		</View>
	)
}

const useStyles = (theme: Theme) =>
	StyleSheet.create({
		container: {
			flex: 1,
			alignItems: 'center',
			justifyContent: 'center',
		},
		title: {
			fontSize: 20,
			color: theme.colors.text,
			fontFamily: theme.fonts.bold.fontFamily,
		},
		separator: {
			marginVertical: 30,
			height: 1,
			width: '80%',
		},
	})
