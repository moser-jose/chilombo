import { Stack } from 'expo-router'
import { TouchableOpacity } from 'react-native'
import { Ionicons } from '@expo/vector-icons'
import { router } from 'expo-router'
import { useCustomTheme } from '@/src/context/ThemeContext'
export default function UserLayout() {
	const { theme } = useCustomTheme()
	return (
		<Stack
			screenOptions={{
				headerTitle: 'Perfil',
				headerShown: true,
				headerTitleStyle: {
					fontFamily: theme.fonts.medium.fontFamily,
					fontSize: theme.size.smB,
					color: theme.colors.textHeader,
				},
				headerStyle: {
					backgroundColor: theme.colors.backgroundHeaderScreen,
				},
				headerLeft: () => (
					<TouchableOpacity onPress={() => router.back()}>
						<Ionicons name="chevron-back" size={24} color="white" />
					</TouchableOpacity>
				),

			}}
		/>
	)
}
