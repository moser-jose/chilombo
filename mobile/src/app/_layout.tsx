import FontAwesome from '@expo/vector-icons/FontAwesome'
import {
	GestureHandlerRootView,
	TouchableOpacity,
} from 'react-native-gesture-handler'
import { ThemeProvider as NavigationThemeProvider } from '@react-navigation/native'
import { useFonts } from 'expo-font'
import { Stack, useRouter } from 'expo-router'
import * as SplashScreen from 'expo-splash-screen'
import { useEffect } from 'react'
import 'react-native-reanimated'
import { ClerkProvider, ClerkLoaded, useAuth } from '@clerk/clerk-expo'
import { tokenCache } from '@/cache'
import {
	Poppins_300Light,
	Poppins_400Regular,
	Poppins_500Medium,
	Poppins_600SemiBold,
	Poppins_700Bold,
} from '@expo-google-fonts/poppins'
import { CustomThemeProvider, useCustomTheme } from '@/src/context/ThemeContext'
import { CheckoutProvider } from '../context/CheckoutContext'
import { Ionicons } from '@expo/vector-icons'
import { View } from 'react-native'

const clerkPublicKey = process.env.EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY!

if (!clerkPublicKey) {
	throw new Error('Missing Publishable ClerkKey')
}

export { ErrorBoundary } from 'expo-router'

export const unstable_settings = {
	// Ensure that reloading on `/modal` keeps a back button present.
	initialRouteName: '(auth)',
}

SplashScreen.setOptions({
	duration: 1000,
	fade: true,
})
SplashScreen.preventAutoHideAsync()

export default function RootLayout() {
	const [loaded, error] = useFonts({
		PoppinsLight: Poppins_300Light,
		PoppinsRegular: Poppins_400Regular,
		PoppinsMedium: Poppins_500Medium,
		PoppinsSemiBold: Poppins_600SemiBold,
		PoppinsBold: Poppins_700Bold,
		...FontAwesome.font,
	})

	useEffect(() => {
		if (error) throw error
	}, [error])

	useEffect(() => {
		if (loaded) {
			SplashScreen.hideAsync()
		}
	}, [loaded])

	if (!loaded) {
		return null
	}

	return (
		<ClerkProvider publishableKey={clerkPublicKey} tokenCache={tokenCache}>
			<CustomThemeProvider>
				<RootLayoutNav />
			</CustomThemeProvider>
		</ClerkProvider>
	)
}

/* function RootLayoutNav() {
	const { navigationTheme } = useCustomTheme()

	return (
		<ClerkProvider publishableKey={clerkPublicKey} tokenCache={tokenCache}>
			<GestureHandlerRootView style={{ flex: 1 }}>
				<ClerkLoaded>
					<CheckoutProvider>
						<NavigationThemeProvider value={navigationTheme}>
							<Slot />
						</NavigationThemeProvider>
					</CheckoutProvider>
				</ClerkLoaded>
			</GestureHandlerRootView>
		</ClerkProvider>
	)
} */

function RootLayoutNav() {
	const { isLoaded, isSignedIn } = useAuth()
	const router = useRouter()
	const { navigationTheme } = useCustomTheme()
	useEffect(() => {
		if (isLoaded && !isSignedIn) {
			router.push('/(auth)')
		}
	}, [isLoaded])

	return (
		<GestureHandlerRootView style={{ flex: 1 }}>
			<ClerkLoaded>
				<CheckoutProvider>
					<NavigationThemeProvider value={navigationTheme}>
						<Stack>
							<Stack.Screen
								name="(modals)/search"
								options={{
									presentation: 'modal',
									title: 'Pesquisar por serviço',
									headerStyle: {
										backgroundColor: navigationTheme.colors.background,
									},
									headerLeft: () => (
										<TouchableOpacity onPress={() => router.back()}>
											<Ionicons
												name="close-outline"
												size={28}
												color={navigationTheme.colors.text}
											/>
										</TouchableOpacity>
									),
								}}
							/>
							<Stack.Screen
								name="(modals)/edit-profile"
								options={{
									presentation: 'modal',
									title: 'Editar Perfil',
									headerStyle: {
										backgroundColor: navigationTheme.colors.background,
									},
									headerLeft: () => (
										<TouchableOpacity onPress={() => router.back()}>
											<Ionicons
												name="close-outline"
												size={28}
												color={navigationTheme.colors.text}
											/>
										</TouchableOpacity>
									),
								}}
							/>
							<Stack.Screen name="(auth)" options={{ headerShown: false }} />
							<Stack.Screen name="(main)" options={{ headerShown: false }} />
							<Stack.Screen name="(user)" options={{ headerShown: false }} />
							<Stack.Screen
								name="(checkout)"
								options={{ headerShown: false }}
							/>
						</Stack>
					</NavigationThemeProvider>
				</CheckoutProvider>
			</ClerkLoaded>
		</GestureHandlerRootView>
	)
}
