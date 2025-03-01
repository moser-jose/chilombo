import { Redirect, Stack } from 'expo-router'
import {useAuth} from '@clerk/clerk-expo'
import Colors from '@/src/constants/Colors'
import { useColorScheme } from 'react-native'
export default function AuthLayout(){

  const {isLoaded, isSignedIn} = useAuth()
  const isDark = useColorScheme() === 'dark'
  if(!isLoaded) return null
  if(isSignedIn) return <Redirect href="/(main)/home" />

  return (
    <Stack>
      <Stack.Screen 
        name="index" 
        options={{ 
          headerShown: true, 
          headerTitle: '', 
          headerShadowVisible: false,
          headerTransparent: false,
          headerStyle: {
            backgroundColor: isDark ? Colors.dark.background : Colors.light.background,
          },
          headerBackVisible: false,
        }} 
      />
      <Stack.Screen name="sign-up" options={{ headerShown: false}} />
      <Stack.Screen name="reset-password" options={{ headerShown: false }} />
    </Stack>
  )
}


