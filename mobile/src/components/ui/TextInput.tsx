import React, { useEffect, useState } from 'react'
import {
	TextInput,
	useColorScheme,
	StyleSheet,
	Pressable,
	TextInputProps,
	ViewStyle,
	StyleProp,
} from 'react-native'
import * as WebBrowser from 'expo-web-browser'
import { Ionicons } from '@expo/vector-icons'

import { Text, View } from '@/src/components/Themed'
import { FontSize } from '@/src/constants/FontSize'

import Colors from '@/src/constants/Colors'
import { fontFamily } from '@/src/constants/FontFamily'

WebBrowser.maybeCompleteAuthSession()

type TextInputUIProps = TextInputProps & {
	type: 'email' | 'password' | 'phone' | 'text'
	placeholder: string
	isPasswordStrong?: boolean
	icon?: keyof typeof Ionicons.glyphMap
	label?: string
	onChangeText: (text: string) => void
	onFocus?: () => void
	onBlur?: () => void
	errors?: any
	value: string
	style?: StyleProp<ViewStyle>
}

export default function TextInputUI({
	type,
	placeholder,
	style,
	icon,
	errors,
	label,
	onChangeText,
	value,
	onFocus,
	isPasswordStrong,
	onBlur,
	...props
}: TextInputUIProps) {
	const [isInputFocused, setIsInputFocused] = useState(false)
	const [errorMessage, setErrorMessage] = useState<{
		message: string
		type: string
	} | null>(null)
	const theme = useColorScheme()
	const isDark = theme === 'dark'
	const [showPassword, setShowPassword] = useState(false)

	const renderPasswordIcon = () => (
		<View
			style={{
				backgroundColor: 'transparent',
				flexDirection: 'row',
				alignItems: 'center',
				justifyContent: 'center',
				gap: 4,
			}}
		>
			{isPasswordStrong ? (
				<Ionicons name="checkmark-circle" size={16} color={Colors.success} />
			) : null}
			{value.length > 0 ? (
				<Ionicons
					name={showPassword ? 'eye-off-outline' : 'eye-outline'}
					size={22}
					color={styles(isDark).colorIconInput.color}
				/>
			) : null}
		</View>
	)

	useEffect(() => {
		errors?.find((error: any) => {
			if (error.meta.paramName === 'email_address') {
				setErrorMessage({
					message: 'Verifique o e-mail',
					type: 'email',
				})
			} else if (error.meta.paramName === 'password') {
				setErrorMessage({
					message: 'Verifique a senha',
					type: 'password',
				})
			}
		})
	}, [errors])

	/* console.log(JSON.stringify(errors, null, 2))
	console.log(JSON.stringify(errorMessage, null, 2)) */

	return (
		<View style={style}>
			{label && <Text style={styles(isDark).label}>{label}</Text>}
			<View
				style={[
					styles(isDark).input,
					isInputFocused && {
						borderColor: isDark ? Colors.dark.secondary : Colors.light.primary,
						borderWidth: 1.8,
					},
				]}
			>
				{icon && (
					<Ionicons
						name={icon}
						style={{ marginRight: 4 }}
						size={20}
						color={styles(isDark).colorIconInput.color}
					/>
				)}
				<TextInput
					placeholder={placeholder}
					placeholderTextColor={styles(isDark).colorIconInput.color}
					style={styles(isDark).textInput}
					secureTextEntry={type === 'password' && !showPassword}
					numberOfLines={1}
					onFocus={() => {
						setIsInputFocused(true)
						onFocus?.()
					}}
					onBlur={() => {
						setIsInputFocused(false)
						onBlur?.()
					}}
					onChangeText={onChangeText}
					value={value}
				/>
				{type === 'password' && (
					<Pressable onPress={() => setShowPassword(!showPassword)}>
						{renderPasswordIcon()}
					</Pressable>
				)}
			</View>
			{type === 'email' && errorMessage?.type === 'email' && (
				<Text style={styles(isDark).errorText}>{errorMessage.message}</Text>
			)}
			{type === 'password' && errorMessage?.type === 'password' && (
				<Text style={styles(isDark).errorText}>{errorMessage.message}</Text>
			)}
		</View>
	)
}

const styles = (isDark: boolean) =>
	StyleSheet.create({
		headerText: {
			fontWeight: '300',
			marginBottom: '4%',
			maxWidth: 300,
			textAlign: 'center',
			fontFamily: fontFamily.poppins.regular,
		},
		errorText: {
			fontSize: FontSize.xs,
			fontFamily: fontFamily.poppins.medium,
			color: Colors.error,
			marginBottom: 4,
			marginTop: -10,
		},
		textInput: {
			fontSize: FontSize.xsB,
			fontFamily: fontFamily.poppins.regular,
			color: isDark ? Colors.dark.text : Colors.light.text,
			flex: 1,
		},
		input: {
			padding: 12,
			width: '100%',
			borderRadius: 10,
			flexDirection: 'row',
			borderColor: isDark ? Colors.dark.borderInput : Colors.light.borderInput,
			alignItems: 'center',
			borderWidth: 1,
			marginBottom: 10,
			backgroundColor: isDark
				? Colors.dark.ImputBackgroundColors
				: Colors.light.ImputBackgroundColors,
		},
		textEnd: {
			color: isDark ? Colors.dark.text : Colors.light.text,
			fontWeight: '300',
			fontSize: 14,
		},
		colorIconInput: {
			color: isDark
				? Colors.dark.colorIconInput
				: Colors.light.colorIconInput.toString(),
		},
		label: {
			fontSize: FontSize.xsB,
			fontFamily: fontFamily.poppins.medium,
			color: isDark ? Colors.dark.text : Colors.light.text,
			marginBottom: 4,
		},
	})
