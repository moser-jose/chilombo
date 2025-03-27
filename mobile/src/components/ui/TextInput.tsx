import React, { useCallback, useEffect, useRef, useState } from 'react'
import {
	Platform,
	TextInput,
	TouchableOpacity,
	Image,
	useColorScheme,
	StyleSheet,
	ScrollView,
	Alert,
	KeyboardAvoidingView,
	TouchableWithoutFeedback,
	Pressable,
	Animated,
	useWindowDimensions,
	Keyboard,
	ActivityIndicator,
	TextInputProps,
	ViewStyle,
	StyleProp,
} from 'react-native'
import { useRouter, Href, Link } from 'expo-router'
import * as Haptics from 'expo-haptics'
import * as WebBrowser from 'expo-web-browser'
import * as AuthSession from 'expo-auth-session'
import { ClerkAPIError } from '@clerk/types'
import { useWarmUpBrowser } from '@/hooks/useWarmUpBrowser'
import { Ionicons } from '@expo/vector-icons'

import { Text, View } from '@/src/components/Themed'
import { FontSize } from '@/src/constants/FontSize'
import { GoogleSVG } from '@/src/components/svg/GoogleSvg'
import { FacebookSVG } from '@/src/components/svg/FacebookSVG'
import empresa from '@/assets/images/empresa.jpg'
import {
	useSignIn,
	useSSO,
	isClerkAPIResponseError,
	useAuth,
} from '@clerk/clerk-expo'
import Colors from '@/src/constants/Colors'
import { isStrongPassword } from '@/src/utils/strenghPasswordForce'
import { fontFamily } from '@/src/constants/FontFamily'
import Button from '@/src/components/ui/Button'
import { isValidEmail } from '@/src/utils/validEmail'
import { IconProps } from '@expo/vector-icons/build/createIconSet'
// Finaliza qualquer sessão de autenticação pendente
WebBrowser.maybeCompleteAuthSession()

type TextInputUIProps = TextInputProps & {
	type: 'email' | 'password' | 'phone' | 'text'
	placeholder: string
	icon?: keyof typeof Ionicons.glyphMap
	label?: string
	onChangeText: (text: string) => void
	onFocus?: () => void
	onBlur?: () => void
	value: string
	style?: StyleProp<ViewStyle>
}

export default function TextInputUI({
	type,
	placeholder,
	style,
	icon,
	label,
	onChangeText,
	value,
	onFocus,
	onBlur,
	...props
}: TextInputUIProps) {
	const [isInputFocused, setIsInputFocused] = useState(false)

	const [errors, setErrors] = useState<ClerkAPIError[]>([])
	const theme = useColorScheme()
	const isDark = theme === 'dark'
	const { width, height } = useWindowDimensions()
	const [emailAddress, setEmailAddress] = useState('')
	const [password, setPassword] = useState('')

	const [showPassword, setShowPassword] = useState(false)
	const [isPasswordStrong, setIsPasswordStrong] = useState(false)
	const [isEmailFocused, setIsEmailFocused] = useState(false)
	const [isPasswordFocused, setIsPasswordFocused] = useState(false)
	const [isEmailValid, setIsEmailValid] = useState(false)

	const translateY = useRef(new Animated.Value(0)).current

	useEffect(() => {
		const keyboardWillShow = Keyboard.addListener(
			Platform.OS === 'ios' ? 'keyboardWillShow' : 'keyboardDidShow',
			e => {
				Animated.timing(translateY, {
					toValue:
						Platform.OS === 'ios'
							? -e.endCoordinates.height / 3
							: -height * 0.15,
					duration: 250,
					useNativeDriver: true,
				}).start()
			},
		)

		const keyboardWillHide = Keyboard.addListener(
			Platform.OS === 'ios' ? 'keyboardWillHide' : 'keyboardDidHide',
			() => {
				Animated.timing(translateY, {
					toValue: 0,
					duration: 250,
					useNativeDriver: true,
				}).start()
			},
		)

		return () => {
			keyboardWillShow.remove()
			keyboardWillHide.remove()
		}
	}, [height, translateY])

	useEffect(() => {
		setIsPasswordStrong(isStrongPassword(password))
	}, [password])

	useEffect(() => {
		setIsEmailValid(isValidEmail(emailAddress))
	}, [emailAddress])

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
			{password.length > 0 ? (
				<Ionicons
					name={showPassword ? 'eye-off-outline' : 'eye-outline'}
					size={22}
					color={styles(isDark).colorIconInput.color}
				/>
			) : null}
		</View>
	)

	return (
		<>
			{label && <Text style={styles(isDark).label}>{label}</Text>}
			<View style={[styles(isDark).contentContainer]}>
				<View
					style={[
						styles(isDark).input,
						isInputFocused && {
							borderColor: isDark
								? Colors.dark.secondary
								: Colors.light.primary,
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
						style={[styles(isDark).textInput, style]}
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
				{/* 

						<View
							style={[
								styles(isDark).input,
								isPasswordFocused && {
									borderColor: isDark
										? Colors.dark.secondary
										: Colors.light.primary,
									borderWidth: 1.8,
								},
							]}
						>
							<Ionicons
								name="key"
								size={22}
								color={styles(isDark).colorIconInput.color}
							/>
							<TextInput
								placeholder="Insira a senha"
								placeholderTextColor={styles(isDark).colorIconInput.color}
								secureTextEntry={!showPassword}
								onChangeText={text => setPassword(text)}
								value={password}
								numberOfLines={1}
								style={[styles(isDark).textInput, { flex: 1 }]}
								onFocus={() => setIsPasswordFocused(true)}
								onBlur={() => setIsPasswordFocused(false)}
							/>
							<Pressable onPress={() => setShowPassword(!showPassword)}>
								{renderPasswordIcon()}
							</Pressable>
						</View> */}
			</View>
		</>
	)
}

const styles = (isDark: boolean) =>
	StyleSheet.create({
		container: {
			width: '100%',
		},
		contentContainer: {
			width: '100%',
			alignItems: 'center',
		},
		headerText: {
			fontWeight: '300',
			marginBottom: '4%',
			maxWidth: 300,
			textAlign: 'center',
			fontFamily: fontFamily.poppins.regular,
		},
		textInput: {
			fontSize: FontSize.sm,
			fontFamily: fontFamily.poppins.regular,
			color: isDark ? Colors.dark.text : Colors.light.text,
			width: '100%',
		},
		input: {
			padding: 12,
			borderRadius: 10,
			width: '100%',
			flexDirection: 'row',
			borderColor: isDark ? Colors.dark.borderInput : Colors.light.borderInput,
			alignItems: 'center',
			borderWidth: 1,
			marginBottom: 20,
			backgroundColor: isDark
				? Colors.dark.ImputBackgroundColors
				: Colors.light.ImputBackgroundColors,
		},
		textEnd: {
			color: isDark ? Colors.dark.text : Colors.light.text,
			fontWeight: '300',
			/* marginVertical: '4%', */
			fontSize: 14,
		},
		colorIconInput: {
			color: isDark
				? Colors.dark.colorIconInput
				: Colors.light.colorIconInput.toString(),
		},
		label: {
			fontSize: FontSize.sm,
			fontFamily: fontFamily.poppins.medium,
			color: isDark ? Colors.dark.text : Colors.light.text,
			marginBottom: 4,
		},
	})
