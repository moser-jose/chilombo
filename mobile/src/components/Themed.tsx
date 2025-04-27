/**
 * Learn more about Light and Dark modes:
 * https://docs.expo.io/guides/color-schemes/
 */

import {
	Text as DefaultText,
	View as DefaultView,
	TouchableOpacity as DefaultTouchableOpacity,
} from 'react-native'

import Colors from '@/src/constants/Theme'
import { useColorScheme } from './useColorScheme'
import { Ionicons as DefaultIonicons } from '@expo/vector-icons'
type ThemeProps = {
	lightColor?: string
	darkColor?: string
}

export type IoniconsProps = ThemeProps &
	React.ComponentProps<typeof DefaultIonicons>

export type TextProps = ThemeProps & DefaultText['props']
export type ViewProps = ThemeProps & DefaultView['props']
export type TouchableOpacityProps = ThemeProps &
	React.ComponentProps<typeof DefaultTouchableOpacity>

export function useThemeColor(
	props: { light?: string; dark?: string },
	colorName: keyof typeof Colors.light.colors & keyof typeof Colors.dark.colors,
) {
	const theme = useColorScheme() ?? 'light'
	const colorFromProps = props[theme]

	if (colorFromProps) {
		return colorFromProps
	} else {
		return Colors[theme].colors[colorName]
	}
}

export function Text(props: TextProps) {
	const { style, lightColor, darkColor, ...otherProps } = props
	const color = useThemeColor({ light: lightColor, dark: darkColor }, 'text')

	return <DefaultText style={[{ color }, style]} {...otherProps} />
}

export function View(props: ViewProps) {
	const { style, lightColor, darkColor, ...otherProps } = props
	/* const backgroundColor = useThemeColor(
		{ light: lightColor, dark: darkColor },
		'background',
	) */

	return (
		<DefaultView style={[/* { backgroundColor }, */ style]} {...otherProps} />
	)
}

export function TouchableOpacity(props: TouchableOpacityProps) {
	const { style, lightColor, darkColor, ...otherProps } = props
	const backgroundColor = useThemeColor(
		{ light: lightColor, dark: darkColor },
		'background',
	)

	return (
		<DefaultTouchableOpacity
			style={[{ backgroundColor }, style]}
			{...otherProps}
		/>
	)
}

export function Ionicons(props: IoniconsProps) {
	const { style, lightColor, darkColor, ...otherProps } = props
	const color = useThemeColor({ light: lightColor, dark: darkColor }, 'text')

	return <DefaultIonicons style={[{ color }, style]} {...otherProps} />
}
