import { Theme as NavigationTheme } from '@react-navigation/native'
import { FontSize } from '@/src/constants/FontSize'
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
		backgroundIcon: string
		backgroundHeaderScreen: string
		textHeader: string
		backgroundIconIndex: string
		buttonHeader: string
		borderBottomHeader: string
		cancelButton: string
	}
	fonts: NavigationTheme['fonts']
	size: FontSize
}
