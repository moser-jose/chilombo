import { Platform } from 'react-native'

import type { Theme } from '../../node_modules/@react-navigation/native/src/types'

const WEB_FONT_STACK =
	'system-ui, "Segoe UI", Roboto, Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol"'

export const fonts = Platform.select({
	web: {
		regular: {
			fontFamily: WEB_FONT_STACK,
			fontWeight: '400',
		},
		medium: {
			fontFamily: WEB_FONT_STACK,
			fontWeight: '500',
		},
		bold: {
			fontFamily: WEB_FONT_STACK,
			fontWeight: '600',
		},
		heavy: {
			fontFamily: WEB_FONT_STACK,
			fontWeight: '700',
		},
	},
	ios: {
		regular: {
			fontFamily: 'PoppinsRegular',
			fontWeight: '400',
		},
		medium: {
			fontFamily: 'PoppinsMedium',
			fontWeight: '500',
		},
		bold: {
			fontFamily: 'PoppinsSemiBold',
			fontWeight: '600',
		},
		heavy: {
			fontFamily: 'PoppinsBold',
			fontWeight: '700',
		},
	},
	default: {
		regular: {
			fontFamily: 'sans-serif',
			fontWeight: 'normal',
		},
		medium: {
			fontFamily: 'sans-serif-medium',
			fontWeight: 'normal',
		},
		bold: {
			fontFamily: 'sans-serif',
			fontWeight: '600',
		},
		heavy: {
			fontFamily: 'sans-serif',
			fontWeight: '700',
		},
	},
} as const satisfies Record<string, Theme['fonts']>)

export const fontFamily = {
	poppins: {
		light: 'PoppinsLight',
		regular: 'PoppinsRegular',
		medium: 'PoppinsMedium',
		semibold: 'PoppinsSemiBold',
		bold: 'PoppinsBold',
	},
}
