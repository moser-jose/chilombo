import FontAwesome from '@expo/vector-icons/FontAwesome'
import { GestureHandlerRootView } from 'react-native-gesture-handler'
import { ThemeProvider as NavigationThemeProvider } from '@react-navigation/native'
import { useFonts } from 'expo-font'
import { Slot } from 'expo-router'
import * as SplashScreen from 'expo-splash-screen'
import { useEffect } from 'react'
import 'react-native-reanimated'
import { ClerkProvider, ClerkLoaded } from '@clerk/clerk-expo'
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

const clerkPublicKey = process.env.EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY!

if (!clerkPublicKey) {
	throw new Error('Missing Publishable ClerkKey')
}

export {
	// Catch any errors thrown by the Layout component.
	ErrorBoundary,
} from 'expo-router'

export const unstable_settings = {
	// Ensure that reloading on `/modal` keeps a back button present.
	initialRouteName: '(auth)',
}

// Prevent the splash screen from auto-hiding before asset loading is complete.
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
		<CustomThemeProvider>
			<RootLayoutNav />
		</CustomThemeProvider>
	)
}

function RootLayoutNav() {
	const { navigationTheme } = useCustomTheme()

	return (
		<ClerkProvider publishableKey={clerkPublicKey} tokenCache={tokenCache}>
			<GestureHandlerRootView style={{ flex: 1 }}>
				<ClerkLoaded>
					<CheckoutProvider>
					<NavigationThemeProvider value={navigationTheme}>
						{/* <Stack>
							<Stack.Screen
								name="(checkout)"
								options={{ headerShown: false }}
							/>
							
						</Stack> */}
						<Slot />
					</NavigationThemeProvider>
					</CheckoutProvider>
				</ClerkLoaded>
			</GestureHandlerRootView>
		</ClerkProvider>
	)
}
