import React, { useEffect, useState } from 'react'
import {
	TextInput,
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
import { useCustomTheme } from '@/src/context/ThemeContext'
import { Theme } from '@/src/types/theme'

WebBrowser.maybeCompleteAuthSession()

type TextInputUIProps = TextInputProps & {
	type: 'email' | 'password' | 'phone' | 'text'
	placeholder: string
	isPasswordStrong?: boolean
	icon?: keyof typeof Ionicons.glyphMap
	label?: string
	onChangeText?: (text: string) => void
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
}: TextInputUIProps) {
	const [isInputFocused, setIsInputFocused] = useState(false)
	const [errorMessage, setErrorMessage] = useState<{
		message: string
		type: string
	} | null>(null)

	const { theme } = useCustomTheme()
	const [showPassword, setShowPassword] = useState(false)

	const styles = makeStyles(theme as Theme)

	const handleChangeText = (text: string) => {
		if (text.length > 0) {
			setErrorMessage(null)
		}
		onChangeText?.(text)
	}

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
					color={theme.colors.colorIconInput}
				/>
			) : null}
		</View>
	)

	const ERROR_MESSAGES = {
		first_name: 'Verifique o nome',
		last_name: 'Verifique o sobrenome',
		phone_number: 'Verifique o telefone',
		email_address: 'Verifique o e-mail',
		password: 'Verifique a senha',
	}

	useEffect(() => {
		setErrorMessage(null)

		if (!errors || errors.length === 0) return

		const firstNameError = errors.find(
			(error: any) => error.meta.paramName === 'first_name',
		)
		if (firstNameError) {
			setErrorMessage({
				message: ERROR_MESSAGES.first_name,
				type: 'first_name',
			})
			return
		}

		const lastNameError = errors.find(
			(error: any) => error.meta.paramName === 'last_name',
		)
		if (lastNameError) {
			setErrorMessage({
				message: ERROR_MESSAGES.last_name,
				type: 'last_name',
			})
			return
		}

		const phoneError = errors.find(
			(error: any) => error.meta.paramName === 'phone_number',
		)
		if (phoneError) {
			setErrorMessage({
				message: ERROR_MESSAGES.phone_number,
				type: 'phone_number',
			})
			return
		}

		const error = errors.find((error: any) => {
			const paramName = error.meta.paramName
			return ERROR_MESSAGES[paramName as keyof typeof ERROR_MESSAGES]
		})

		if (error) {
			const paramName = error.meta.paramName
			setErrorMessage({
				message: ERROR_MESSAGES[paramName as keyof typeof ERROR_MESSAGES],
				type: paramName,
			})
		}
	}, [errors])

	const shouldShowError = () => {
		if (!errorMessage) return false

		if (type === 'text') {
			if (label === 'Nome' && errorMessage.type === 'first_name') return true
			if (label === 'Sobrenome' && errorMessage.type === 'last_name')
				return true
		}

		switch (type) {
			case 'phone':
				return errorMessage.type === 'phone_number'
			case 'email':
				return errorMessage.type === 'email_address'
			case 'password':
				return errorMessage.type === 'password'
			default:
				return false
		}
	}

	return (
		<View style={style}>
			{label && <Text style={styles.label}>{label}</Text>}
			<View
				style={[
					styles.input,
					isInputFocused && {
						borderColor: theme.colors.secondary,
						borderWidth: 1.8,
					},
				]}
			>
				{icon && (
					<Ionicons
						name={icon}
						style={{ marginRight: 4 }}
						size={20}
						color={styles.colorIconInput.color}
					/>
				)}
				<TextInput
					placeholder={placeholder}
					placeholderTextColor={theme.colors.colorIconInput}
					style={styles.textInput}
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
					onChangeText={handleChangeText}
					value={value}
				/>
				{type === 'password' && (
					<Pressable onPress={() => setShowPassword(!showPassword)}>
						{renderPasswordIcon()}
					</Pressable>
				)}
			</View>
			{shouldShowError() && errorMessage && (
				<Text style={styles.errorText}>{errorMessage.message}</Text>
			)}
		</View>
	)
}

const makeStyles = (theme: Theme) =>
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
			color: theme.colors.text,
			flex: 1,
		},
		input: {
			padding: 12,
			width: '100%',
			borderRadius: 10,
			flexDirection: 'row',
			borderColor: theme.colors.borderInput,
			alignItems: 'center',
			borderWidth: 1,
			marginBottom: 10,
			backgroundColor: theme.colors.ImputBackgroundColors,
		},
		textEnd: {
			color: theme.colors.text,
			fontWeight: '300',
			fontSize: 14,
		},
		colorIconInput: {
			color: theme.colors.colorIconInput,
		},
		label: {
			fontSize: FontSize.xsB,
			fontFamily: fontFamily.poppins.medium,
			color: theme.colors.text,
			marginBottom: 4,
		},
	})
