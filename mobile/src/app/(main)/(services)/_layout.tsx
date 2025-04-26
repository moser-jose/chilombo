import { Stack } from 'expo-router'
import { useCustomTheme } from '@/src/context/ThemeContext'
import { View } from 'react-native'

export default function SettingsLayout() {
	const { theme } = useCustomTheme()
	return (
		<Stack
			screenOptions={{

				headerBackground: () => <View style={{ backgroundColor: theme.colors.backgroundHeader,height: '100%', width: '100%', borderBottomWidth: .5, borderBottomColor: theme.colors.border }} />,
				headerShown: true,
				headerTitle: 'Meus Serviços',
				headerTitleStyle: {
					fontSize: theme.size.smB,
					fontFamily: theme.fonts.bold.fontFamily,
					color: theme.colors.textHeader,
				},
			}}
		/>
	)
}
