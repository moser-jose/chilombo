import React from 'react'
import {
	ActivityIndicator,
	Pressable,
	StyleSheet,
	TextStyle,
	useColorScheme,
	ViewStyle,
} from 'react-native'
import Colors from '@/constants/Colors'
import { Text } from '@/src/components/Themed'
import { fontFamily } from '@/src/constants/FontFamily'

type ButtonVariant = 'filled' | 'outline' | 'ghost'
type ButtonSize = 'sm' | 'md' | 'lg'

interface ButtonProps {
	onPress?: () => void
	variant?: ButtonVariant
	size?: ButtonSize
	disabled?: boolean
	loading?: boolean
	children: React.ReactNode
	style?: ViewStyle
	textStyle?: TextStyle
}

export const Button: React.FC<ButtonProps> = ({
	onPress,
	variant = 'filled',
	size = 'md',
	disabled = false,
	loading = false,
	children,
	style,
	textStyle,
}) => {
	const colorScheme = useColorScheme()
	const isDark = colorScheme === 'dark'

	const sizeStyles: Record<
		ButtonSize,
		{ height: number; fontSize: number; padding: number }
	> = {
		sm: { height: 36, fontSize: 14, padding: 12 },
		md: { height: 44, fontSize: 16, padding: 16 },
		lg: { height: 55, fontSize: 18, padding: 20 },
	}

	const getVariantStyle = () => {
		const baseStyle: ViewStyle = {
			borderRadius: 16,
			flexDirection: 'row',
			alignItems: 'center',
			justifyContent: 'center',
			width: '100%',
		}

		switch (variant) {
			case 'filled':
				return {
					...baseStyle,
					backgroundColor:
						isDark && disabled
							? Colors.dark.secondaryMuted
							: isDark && !disabled
								? Colors.dark.secondary
								: !isDark && disabled
									? Colors.light.primaryMuted
									: !isDark && !disabled
										? Colors.light.primary
										: Colors.light.primary,
				}
			case 'outline':
				return {
					...baseStyle,
					backgroundColor: 'transparent',
					borderWidth: 1,
					borderColor: isDark
						? Colors.dark.borderInput
						: Colors.light.borderInput,
				}
			case 'ghost':
				return {
					...baseStyle,
					backgroundColor: 'transparent',
				}
		}
	}

	const getTextColor = () => {
		if (disabled) {
			return isDark ? Colors.light.tabIconDefault : Colors.light.primary
		}

		switch (variant) {
			case 'filled':
				return isDark ? Colors.light.text : Colors.dark.text
			case 'outline':
				return isDark ? Colors.dark.text : Colors.light.text
			case 'ghost':
				return isDark ? Colors.dark.text : Colors.light.text
		}
	}

	return (
		<Pressable
			onPress={onPress}
			disabled={disabled || loading}
			style={[
				getVariantStyle(),
				{
					padding: 12,
					borderRadius: 10,
				},
				style,
			]}
		>
			{loading ? (
				<ActivityIndicator color={getTextColor()} size={28} />
			) : (
				<Text
					style={StyleSheet.flatten([
						{
							fontSize: sizeStyles[size].fontSize,
							color: getTextColor(),
							textAlign: 'center',
							marginBottom: 0,
							fontFamily: fontFamily.poppins.medium,
						},
						textStyle,
					])}
				>
					{children}
				</Text>
			)}
		</Pressable>
	)
}

export default Button
