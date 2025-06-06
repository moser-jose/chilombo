import { Platform } from 'react-native'

import { FontStyle, FontsType } from '../types/fontFamily'
const WEB_FONT_STACK =
	'system-ui, "Segoe UI", Roboto, Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol"'

export const Fonts = Platform.select({
	web: {
		light: {
			fontFamily: WEB_FONT_STACK,
			fontWeight: '300',
		} as FontStyle,
		regular: {
			fontFamily: WEB_FONT_STACK,
			fontWeight: '400',
		} as FontStyle,
		medium: {
			fontFamily: WEB_FONT_STACK,
			fontWeight: '500',
		} as FontStyle,
		semibold: {
			fontFamily: WEB_FONT_STACK,
			fontWeight: '600',
		} as FontStyle,
		bold: {
			fontFamily: WEB_FONT_STACK,
			fontWeight: '700',
		} as FontStyle,
		heavy: {
			fontFamily: WEB_FONT_STACK,
			fontWeight: '800',
		} as FontStyle,
	},
	ios: {
		light: {
			fontFamily: 'PoppinsLight',
			fontWeight: '300',
		} as FontStyle,
		regular: {
			fontFamily: 'PoppinsRegular',
			fontWeight: '400',
		} as FontStyle,
		medium: {
			fontFamily: 'PoppinsMedium',
			fontWeight: '500',
		} as FontStyle,
		semibold: {
			fontFamily: 'PoppinsSemiBold',
			fontWeight: '600',
		} as FontStyle,
		bold: {
			fontFamily: 'PoppinsBold',
			fontWeight: '700',
		} as FontStyle,
		heavy: {
			fontFamily: 'PoppinsBold',
			fontWeight: '700',
		} as FontStyle,
	},
	default: {
		light: {
			fontFamily: 'sans-serif',
			fontWeight: 'normal',
		} as FontStyle,
		regular: {
			fontFamily: 'sans-serif',
			fontWeight: 'normal',
		} as FontStyle,
		medium: {
			fontFamily: 'sans-serif-medium',
			fontWeight: 'normal',
		} as FontStyle,
		semibold: {
			fontFamily: 'sans-serif',
			fontWeight: '600',
		} as FontStyle,
		bold: {
			fontFamily: 'sans-serif',
			fontWeight: '700',
		} as FontStyle,
		heavy: {
			fontFamily: 'sans-serif',
			fontWeight: '800',
		} as FontStyle,
	},
} as const satisfies Record<string, FontsType>)
