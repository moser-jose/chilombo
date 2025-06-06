import { Stack } from 'expo-router'
import { useCustomTheme } from '@/src/context/ThemeContext'
import { View } from 'react-native'

export default function SettingsLayout() {
	const { theme } = useCustomTheme()
	return (
		<Stack
			screenOptions={{
				headerShown: true,
				headerTitle: 'Categorias',
				headerTitleStyle: {
					fontSize: theme.size.smB,
					fontFamily: theme.fonts.bold.fontFamily,
					color: theme.colors.textHeader,
				},
				headerBackground: () => (
					<View
						style={{
							backgroundColor: theme.colors.backgroundHeader,
							height: '100%',
							width: '100%',
							borderBottomWidth: 0.5,
							borderBottomColor: theme.colors.border,
						}}
					/>
				),
			}}
		/>
	)
}
