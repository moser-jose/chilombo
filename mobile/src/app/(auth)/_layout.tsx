import { Redirect, Stack } from 'expo-router'
import { useAuth } from '@clerk/clerk-expo'
import Colors from '@/src/constants/Theme'
import { useCustomTheme } from '@/src/context/ThemeContext'
import { View } from '@/src/components/Themed'
export default function AuthLayout() {
	const { theme } = useCustomTheme()
	const { isLoaded, isSignedIn } = useAuth()
	if (!isLoaded) return null
	if (isSignedIn) return <Redirect href="/(main)" />

	const headerOptions = {
		headerShown: true,
		headerShadowVisible: true,
		headerTransparent: false,
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
		headerBackVisible: false,
	}

	return (
		<Stack>
			<Stack.Screen name="index" options={headerOptions} />
			<Stack.Screen name="sign-up" options={headerOptions} />
			<Stack.Screen name="reset-password" options={headerOptions} />
		</Stack>
	)
}
