import { Text as DefaultText } from 'react-native'
import { useCustomTheme } from '@/src/context/ThemeContext'
export type TextProps = DefaultText['props']
export function Text(props: TextProps) {
	const { theme } = useCustomTheme()
	const { style, ...otherProps } = props
	const color = theme.colors.text

	return <DefaultText style={[{ color }, style]} {...otherProps} />
}
