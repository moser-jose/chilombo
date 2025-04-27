import React, {
	createContext,
	useState,
	useEffect,
	useContext,
	useMemo,
	ReactNode,
} from 'react'
import { useColorScheme } from 'react-native'
import AsyncStorage from '@react-native-async-storage/async-storage'
import Colors from '@/src/constants/Theme'
import { Theme } from '../types/theme'

type ThemePreference = 'light' | 'dark' | 'system'
type EffectiveTheme = 'light' | 'dark'

interface ThemeContextProps {
	themePreference: ThemePreference
	effectiveTheme: EffectiveTheme
	isSystemTheme: boolean
	setThemePreference: (preference: ThemePreference) => Promise<void>
	theme: typeof Colors.light | typeof Colors.dark
	navigationTheme: Theme
}

const ThemeContext = createContext<ThemeContextProps | undefined>(undefined)

interface CustomThemeProviderProps {
	children: ReactNode
}

export const CustomThemeProvider: React.FC<CustomThemeProviderProps> = ({
	children,
}) => {
	const deviceTheme = useColorScheme()
	const [themePreference, setThemePreferenceState] =
		useState<ThemePreference>('system')

	useEffect(() => {
		const loadThemePreference = async () => {
			try {
				const storedTheme = (await AsyncStorage.getItem(
					'theme',
				)) as ThemePreference | null
				if (storedTheme) {
					setThemePreferenceState(storedTheme)
				}
			} catch (error) {
				console.error('Failed to load theme preference from storage', error)
			}
		}
		loadThemePreference()
	}, [])

	const effectiveTheme = useMemo(() => {
		return themePreference === 'system' ? deviceTheme : themePreference
	}, [themePreference, deviceTheme])

	const setThemePreference = async (preference: ThemePreference) => {
		try {
			await AsyncStorage.setItem('theme', preference)
			setThemePreferenceState(preference)
		} catch (error) {
			console.error('Failed to save theme preference to storage', error)
		}
	}

	const theme: Theme = useMemo(() => {
		return effectiveTheme === 'dark' ? Colors.dark : Colors.light
	}, [effectiveTheme])

	const navigationTheme = useMemo<Theme>(() => {
		return {
			dark: effectiveTheme === 'dark',
			colors: theme.colors,
			fonts: theme.fonts,
			size: theme.size,
		}
	}, [effectiveTheme, theme])

	const value = {
		themePreference,
		effectiveTheme,
		isSystemTheme: themePreference === 'system',
		setThemePreference,
		theme,
		navigationTheme,
	}

	return (
		<ThemeContext.Provider value={value as ThemeContextProps}>
			{children}
		</ThemeContext.Provider>
	)
}

export const useCustomTheme = (): ThemeContextProps => {
	const context = useContext(ThemeContext)
	if (context === undefined) {
		throw new Error('useCustomTheme must be used within a CustomThemeProvider')
	}
	return context
}
