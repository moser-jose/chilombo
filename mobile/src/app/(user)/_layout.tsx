import { Stack } from 'expo-router'
import { TouchableOpacity, View } from 'react-native'
import { Ionicons } from '@expo/vector-icons'
import { router } from 'expo-router'
import { useTheme } from '@/src/hooks/useTheme'

export default function UserLayout() {
	const { theme } = useTheme()
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
				headerLeft: () => (
					<TouchableOpacity onPress={() => router.back()}>
						<Ionicons
							name="chevron-back"
							size={22}
							color={theme.colors.textHeader}
						/>
					</TouchableOpacity>
				),
			}}
		/>
	)
}
