import { Theme as NavigationTheme } from '@react-navigation/native'

export type Theme = {
	dark: boolean
	colors: {
		text: string
		textMuted: string
		background: string
		tint: string
		tabIconDefault: string
		borderInput: string
		tabIconSelected: string
		ImputBackgroundColors: string
		colorIconInput: string
		secondaryMuted: string
		primary: string
		secondary: string
		card: string
		border: string
		notification: string
		muted: string
		tabBarBackgroundColor: string
		tabBarActiveTintColor: string
		modal: string
		backgroundHeader: string
	}
	fonts: NavigationTheme['fonts']
}
