import { Stack } from 'expo-router'
import { useCustomTheme } from '@/src/context/ThemeContext'

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
				headerStyle: {
					backgroundColor: theme.colors.backgroundHeader,
				},
			}}
		/>
	)
}
