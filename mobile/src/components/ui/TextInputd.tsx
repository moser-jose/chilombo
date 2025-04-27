import React from 'react'
import {
	StyleSheet,
	TextInput as RNTextInput,
	TextInputProps as RNTextInputProps,
	TextStyle,
	useColorScheme,
	View,
	ViewStyle,
} from 'react-native'
import { zincColors } from '@/src/constants/Theme'
import { Text } from '../Themed'

type InputVariant = 'default' | 'filled' | 'outlined' | 'ghost'
type InputSize = 'sm' | 'md' | 'lg'

interface TextInputProps extends Omit<RNTextInputProps, 'style'> {
	label?: string
	error?: string
	variant?: InputVariant
	size?: InputSize
	containerStyle?: ViewStyle
	inputStyle?: TextStyle
	disabled?: boolean
}

export const TextInput: React.FC<TextInputProps> = ({
	label,
	error,
	variant = 'default',
	size = 'md',
	containerStyle,
	inputStyle,
	disabled = false,
	...props
}) => {
	const colorScheme = useColorScheme()
	const isDark = colorScheme === 'dark'

	const sizeStyles: Record<
		InputSize,
		{ height?: number; fontSize: number; padding: number }
	> = {
		sm: { fontSize: 16, padding: 8 },
		md: { height: 50, fontSize: 16, padding: 14 },
		lg: { height: 55, fontSize: 32, padding: 16 },
	}

	const getVariantStyle = () => {
		const baseStyle: ViewStyle = {
			borderRadius: 12,
			//backgroundColor: 'red' //isDark ? zincColors[900] : "rgb(229, 229, 234)",
		}

		switch (variant) {
			case 'filled':
				return {
					...baseStyle,
					backgroundColor: isDark ? zincColors[700] : zincColors[100],
				}
			case 'outlined':
				return {
					...baseStyle,
					borderWidth: 1,
					borderColor: isDark ? zincColors[600] : zincColors[200],
				}
			case 'ghost':
				return {
					...baseStyle,
					backgroundColor: 'transparent',
				}
			default:
				return baseStyle
		}
	}

	const getTextColor = () => {
		if (disabled) {
			return isDark ? zincColors[500] : zincColors[400]
		}
		return isDark ? zincColors[50] : zincColors[900]
	}

	return (
		<View style={[styles.container, containerStyle]}>
			{label && <Text style={styles.label}>{label}</Text>}
			<View style={[getVariantStyle(), disabled && styles.disabled]}>
				<RNTextInput
					style={[
						{
							height: 24, //sizeStyles[size].height,
							fontSize: 16, //sizeStyles[size].fontSize,
							padding: 0, //sizeStyles[size].padding,
							color: getTextColor(),
							width: '100%',
						},
						inputStyle,
					]}
					placeholderTextColor={isDark ? zincColors[500] : zincColors[400]}
					editable={!disabled}
					{...props}
				/>
			</View>
			{error && <Text style={styles.error}>{error}</Text>}
		</View>
	)
}

const styles = StyleSheet.create({
	container: {
		marginBottom: 16,
		borderWidth: 1,
		borderColor: '#ccc',
		borderRadius: 18,
		padding: 10,
		width: '100%',
	},
	label: {
		marginBottom: 2,
	},
	error: {
		color: '#ef4444', // red-500
		marginTop: 4,
	},
	disabled: {
		opacity: 0.5,
	},
})

export default TextInput
