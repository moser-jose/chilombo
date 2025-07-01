import { useEffect } from 'react'
import { useColorScheme } from 'react-native'
import { useThemeStore } from '../store/store'
import { useShallow } from 'zustand/react/shallow'

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
	} = useThemeStore(
		useShallow(state => ({
			themePreference: state.themePreference,
			effectiveTheme: state.effectiveTheme,
			isSystemTheme: state.isSystemTheme,
			theme: state.theme,
			navigationTheme: state.navigationTheme,
			setThemePreference: state.setThemePreference,
			updateEffectiveTheme: state.updateEffectiveTheme,
		})),
	)

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
