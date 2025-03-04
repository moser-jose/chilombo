import { useEffect } from 'react'
import * as WebBrowser from 'expo-web-browser'

export const useWarmUpBrowser = () => {
	useEffect(() => {
		// Preloads the browser for Android devices to reduce authentication load time
		// See: https://docs.expo.dev/guides/authentication/#improving-user-experience
		void WebBrowser.warmUpAsync()
		return () => {
			// Cleanup: closes browser when component unmounts
			void WebBrowser.coolDownAsync()
		}
	}, [])
}
