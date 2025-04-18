import { TouchableOpacityProps } from 'react-native'
import { TouchableOpacity as DefaultTouchableOpacity } from 'react-native'
import { useCustomTheme } from '@/src/context/ThemeContext'
export function TouchableOpacity(props: TouchableOpacityProps) {
	const { style, ...otherProps } = props
	const { themeColors } = useCustomTheme()
	const backgroundColor = themeColors.colors.background
	return (
		<DefaultTouchableOpacity
			style={[{ backgroundColor }, style]}
			{...otherProps}
		/>
	)
}
