import { Stack } from 'expo-router'
import { useTheme } from '@/src/hooks/useTheme'
import { View } from 'react-native'

export default function SettingsLayout() {
	const { theme } = useTheme()
	return (
		<Stack
			screenOptions={{
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
