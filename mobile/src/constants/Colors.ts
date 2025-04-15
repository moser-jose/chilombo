import { fonts } from "@react-navigation/native/src/theming/fonts"

export const primary = 'red'
export const secondary = '#c2347b'
export const tertiary = '#f7f2f7'
export const quaternary = '#9aa4b9'
export const quinary = 'red'
export const inactiveIcon = 'rgba(89, 92, 97, 0.81)'

export const tintColorLight = '#0a7ea4'
export const tintColorDark = '#fff'

export default {
	light: {
		colors: {
			text: '#000',
			textMuted: 'rgba(136, 133, 135, 0.14)',
			background: '#fff',
			tint: tintColorLight,
			tabIconDefault: '#ccc',
			borderInput: '#ccc',
			tabIconSelected: tintColorLight,
			ImputBackgroundColors: '#F8F7FB',
			colorIconInput: 'rgba(50, 52, 55, 0.64)',
			secondaryMuted: 'rgba(136, 133, 135, 0.14)',
			primary: 'rgba(6,23,74,.8)',
			primaryMuted: 'rgba(6,23,74,.4)',
			card: 'rgb(18, 18, 18)',
			border: 'rgb(39, 39, 41)',
			notification: 'rgb(255, 69, 58)',
			muted: 'rgba(136, 133, 135, 0.14)',
		},
		fonts
	},
	dark: {
		colors: {
			text: 'rgba(255, 255, 255, 0.77)',
			textMuted: 'rgba(255, 255, 255, 0.04)',
			background: 'rgba(0, 0, 0, 0.93)',
			tint: '#3f3a3a',
			tabIconDefault: '#ccc',
			borderInput: '#2A2C39',
			tabIconSelected: tintColorDark,
			ImputBackgroundColors: 'rgba(61, 58, 58, 0.32)',
			colorIconInput: 'rgba(255, 255, 255, 0.59)',
			primary: 'rgb(10, 132, 255)',
			card: 'rgb(18, 18, 18)',
			border: 'rgb(39, 39, 41)',
			notification: 'rgb(255, 69, 58)',
			secondary: '#c2347b',
			secondaryMuted: 'rgba(194, 52, 123, 0.2)',
			muted: 'rgba(166, 162, 162, 0.99)',
		},
		fonts
	},

	success: '#4CAF50', // Verde
	warning: '#FFC107', // Amarelo
	error: '#F44336', // Vermelho
	orange: '#FF9800', // Laranja
	white: '#FFFFFF',

	primary: '#0D0D12',
	secondary: '#c2347b',
	secondaryMuted: '#ccc',
}

/**
 * Below are the colors that are used in the app. The colors are defined in the light and dark mode.
 * There are many other ways to style your app. For example, [Nativewind](https://www.nativewind.dev/), [Tamagui](https://tamagui.dev/), [unistyles](https://reactnativeunistyles.vercel.app), etc.
 */
