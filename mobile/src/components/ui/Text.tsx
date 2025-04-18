import { Text as DefaultText } from 'react-native'
import { useCustomTheme } from '@/src/context/ThemeContext'
export type TextProps = DefaultText['props']
export function Text(props: TextProps) {
	const { themeColors } = useCustomTheme()
	const { style, ...otherProps } = props
	const color = themeColors.colors.text

	return <DefaultText style={[{ color }, style]} {...otherProps} />
}
