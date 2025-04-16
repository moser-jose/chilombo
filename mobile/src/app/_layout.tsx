import FontAwesome from '@expo/vector-icons/FontAwesome'
import { GestureHandlerRootView } from 'react-native-gesture-handler'
//import { resourceCache } from '@clerk/clerk-expo/resource-cache'
import {
	DarkTheme,
	DefaultTheme,
	ThemeProvider,
} from '@react-navigation/native'
import { useFonts } from 'expo-font'
import { Slot } from 'expo-router'
import * as SplashScreen from 'expo-splash-screen'
import { useEffect } from 'react'
import 'react-native-reanimated'
import { ClerkProvider, ClerkLoaded } from '@clerk/clerk-expo'
import { useColorScheme } from '@/src/components/useColorScheme'
import { tokenCache } from '@/cache'
import {
	Poppins_300Light,
	Poppins_400Regular,
	Poppins_500Medium,
	Poppins_600SemiBold,
	Poppins_700Bold,
} from '@expo-google-fonts/poppins'
import Colors from '../constants/Colors'
import { DarkThemeUI } from '../constants/themes/Dark'

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
		//SpaceMono: require('@/assets/fonts/SpaceMono-Regular.ttf'),
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

	return <RootLayoutNav />
}

function RootLayoutNav() {
	const colorScheme = useColorScheme()

	return (
		<ClerkProvider
			publishableKey={clerkPublicKey}
			tokenCache={tokenCache}
			//__experimental_resourceCache={resourceCache}
		>
			<GestureHandlerRootView style={{ flex: 1 }}>
				<ClerkLoaded>
					<ThemeProvider
						value={colorScheme === 'dark' ? Colors.dark : Colors.light}
					>
						<Slot />
					</ThemeProvider>
				</ClerkLoaded>
			</GestureHandlerRootView>
		</ClerkProvider>
	)
}
