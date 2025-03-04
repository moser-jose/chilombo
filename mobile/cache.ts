import * as SecureStore from 'expo-secure-store'
import { Platform } from 'react-native'
import { TokenCache } from '@clerk/clerk-expo/dist/cache/types'

const createTokenCache = (): TokenCache => {
	return {
		getToken: async (key: string) => {
			try {
				return Platform.OS === 'web'
					? localStorage.getItem(key)
					: await SecureStore.getItemAsync(key)
			} catch (error) {
				console.log(error)
			}
		},
		saveToken: async (key: string, token: string) => {
			try {
				return Platform.OS === 'web'
					? localStorage.setItem(key, token)
					: await SecureStore.setItemAsync(key, token)
			} catch (error) {
				console.log(error)
			}
		},
	}
}

export const tokenCache = Platform.OS !== 'web' ? createTokenCache() : undefined
