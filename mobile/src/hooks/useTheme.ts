import { useEffect } from 'react'
import { useColorScheme } from 'react-native'
import { useThemeStore } from '../store/store'

/**
 * Custom hook that combines Zustand theme store with device theme detection
 *
 * Usage:
 * const { theme, setThemePreference, effectiveTheme } = useTheme()
 *
 * Alternative: Use Zustand store directly
 * const { theme, setThemePreference } = useThemeStore()
 */
export const useTheme = () => {
	const deviceTheme = useColorScheme()
	const {
		themePreference,
		effectiveTheme,
		isSystemTheme,
		theme,
		navigationTheme,
		setThemePreference,
		updateEffectiveTheme,
	} = useThemeStore()

	// Update effective theme when device theme changes (for system preference)
	useEffect(() => {
		updateEffectiveTheme(deviceTheme || 'light')
	}, [deviceTheme, updateEffectiveTheme])

	return {
		themePreference,
		effectiveTheme,
		isSystemTheme,
		setThemePreference,
		theme,
		navigationTheme,
	}
}
