import {
	Image,
	TextInput,
	StyleSheet,
	Keyboard,
	TouchableWithoutFeedback,
	KeyboardAvoidingView,
	Platform,
	Animated,
	useWindowDimensions,
	Pressable,
	useColorScheme,
} from 'react-native'
import { Ionicons } from '@expo/vector-icons'
import * as Haptics from 'expo-haptics'
import { Text, View } from '@/src/components/Themed'
import { FontSize } from '@/src/constants/FontSize'
import { isClerkAPIResponseError, useSignUp } from '@clerk/clerk-expo'
import { useRouter } from 'expo-router'
import { useState, useEffect, useRef } from 'react'
import Colors from '@/src/constants/Colors'
import {
	checkPasswordStrength,
	getPasswordRequirements,
	isStrongPassword,
} from '../../utils/strenghPasswordForce'

import { fontFamily } from '@/src/constants/FontFamily'
import { ClerkAPIError } from '@clerk/types'
import { ModalSSO } from '@/src/components/ui/ModalSSO'

export default function SignUp() {
	const { isLoaded, signUp, setActive } = useSignUp()
	const router = useRouter()
	const theme = useColorScheme()
	const isDark = theme === 'dark'
	const { width, height } = useWindowDimensions()
	const [fullName, setFullName] = useState('')
	const [phone, setPhone] = useState('')
	const [emailAddress, setEmailAddress] = useState('')
	const [password, setPassword] = useState('')
	const strength = checkPasswordStrength(password)
	const requirements = getPasswordRequirements(password)
	const [showPassword, setShowPassword] = useState(false)
	const [isPasswordStrong, setIsPasswordStrong] = useState(false)
	const [isFullNameFocused, setIsFullNameFocused] = useState(false)
	const [isPhoneFocused, setIsPhoneFocused] = useState(false)
	const [isEmailFocused, setIsEmailFocused] = useState(false)
	const [isPasswordFocused, setIsPasswordFocused] = useState(false)

	const [pendingVerification, setPendingVerification] = useState(false)
	const [errors, setErrors] = useState<ClerkAPIError[]>([])
	const [isLoading, setIsLoading] = useState(false)
	const [openModal, setOpenModal] = useState(false)

	const translateY = useRef(new Animated.Value(0)).current

	// Add refs for each input

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
	}, [height])

	useEffect(() => {
		setIsPasswordStrong(isStrongPassword(password))
	}, [password])

	useEffect(() => {
		let timeoutId: NodeJS.Timeout

		if (errors.length > 0) {
			timeoutId = setTimeout(() => {
				setErrors([])
			}, 3000)
		}

		return () => {
			if (timeoutId) {
				clearTimeout(timeoutId)
			}
		}
	}, [errors])

	const renderStrengthBar = () => {
		const barWidth = strength.score
		let barColor = Colors.error

		if (strength.score > 75) barColor = Colors.success
		else if (strength.score > 50) barColor = Colors.warning
		else if (strength.score > 25) barColor = Colors.orange

		return (
			<View style={styles(isDark).strengthBarContainer}>
				<View
					style={[
						styles(isDark).strengthBar,
						{ width: `${barWidth}%`, backgroundColor: barColor },
					]}
				/>
			</View>
		)
	}

	const renderRequirements = () => (
		<View style={styles(isDark).requirementsContainer}>
			<Text
				style={[
					styles(isDark).requirement,
					{ color: requirements.hasNumber ? Colors.success : Colors.error },
				]}
			>
				• Pelo menos um número
			</Text>
			<Text
				style={[
					styles(isDark).requirement,
					{ color: requirements.hasSymbol ? Colors.success : Colors.error },
				]}
			>
				• Pelo menos um símbolo (!@#$%^&*...)
			</Text>
			<Text
				style={[
					styles(isDark).requirement,
					{ color: requirements.hasUpperCase ? Colors.success : Colors.error },
				]}
			>
				• Pelo menos uma letra maiúscula
			</Text>
			<Text
				style={[
					styles(isDark).requirement,
					{ color: requirements.hasLowerCase ? Colors.success : Colors.error },
				]}
			>
				• Pelo menos uma letra minúscula
			</Text>
			<Text
				style={[
					styles(isDark).requirement,
					{ color: requirements.hasMinLength ? Colors.success : Colors.error },
				]}
			>
				• Mínimo de 8 caracteres
			</Text>
		</View>
	)

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
			{password.length > 0 ? (
				<Ionicons
					name={showPassword ? 'eye-off-outline' : 'eye-outline'}
					size={22}
					color={styles(isDark).colorIconInput.color}
				/>
			) : null}
		</View>
	)

	const onSignUpPress = async () => {
		if (!isLoaded) return
		if (process.env.EXPO_OS === 'ios') {
			await Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium)
		}
		setIsLoading(true)
		setErrors([])

		try {
			await signUp.create({
				emailAddress,
				password,
			})

			await signUp.prepareEmailAddressVerification({ strategy: 'email_code' })

			setPendingVerification(true)
			setOpenModal(true)
		} catch (err) {
			if (isClerkAPIResponseError(err)) setErrors(err.errors)
		} finally {
			setIsLoading(false)
		}
	}

	if (pendingVerification) {
		return (
			<ModalSSO
				openModal={openModal}
				isDark={isDark}
				isPasswordStrong={isPasswordStrong}
				emailAddress={emailAddress}
			/>
		)
	}

	return (
		<TouchableWithoutFeedback onPress={Keyboard.dismiss}>
			<KeyboardAvoidingView
				behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
				style={[
					styles(isDark).container,
					{
						height: height,
						flex: 1,
						backgroundColor: isDark
							? Colors.dark.background
							: Colors.light.background,
					},
				]}
			>
				<Animated.View
					style={[
						styles(isDark).container,
						{
							transform: [{ translateY }],
							paddingVertical: height * 0.05,
						},
					]}
				>
					<View style={[styles(isDark).contentContainer, { maxWidth: 500 }]}>
						<Text
							style={[styles(isDark).headerText, { fontSize: width * 0.05 }]}
						>
							Cria a sua conta e desfrute dos nossos serviços
						</Text>

						<View
							style={[
								styles(isDark).input,
								isFullNameFocused && {
									borderColor: isDark
										? Colors.dark.secondary
										: Colors.light.primary,
									borderWidth: 1.8,
								},
							]}
						>
							<Ionicons
								name="person-outline"
								size={22}
								color={styles(isDark).colorIconInput.color}
							/>
							<TextInput
								placeholder="Insira o nome completo"
								placeholderTextColor={styles(isDark).colorIconInput.color}
								secureTextEntry={!showPassword}
								onChangeText={text => setFullName(text)}
								value={fullName}
								numberOfLines={1}
								style={[styles(isDark).textInput, { flex: 1 }]}
								onFocus={() => setIsFullNameFocused(true)}
								onBlur={() => setIsFullNameFocused(false)}
							/>
						</View>

						<View
							style={[
								styles(isDark).input,
								isPhoneFocused && {
									borderColor: isDark
										? Colors.dark.secondary
										: Colors.light.primary,
									borderWidth: 1.8,
								},
							]}
						>
							<Ionicons
								name="call-outline"
								size={22}
								color={styles(isDark).colorIconInput.color}
							/>
							<TextInput
								placeholder="Insira o Telefone"
								placeholderTextColor={styles(isDark).colorIconInput.color}
								secureTextEntry={!showPassword}
								onChangeText={text => setPhone(text)}
								value={phone}
								numberOfLines={1}
								style={[styles(isDark).textInput, { flex: 1 }]}
								onFocus={() => setIsPhoneFocused(true)}
								onBlur={() => setIsPhoneFocused(false)}
							/>
						</View>

						<View
							style={[
								styles(isDark).input,
								isEmailFocused && {
									borderColor: isDark
										? Colors.dark.secondary
										: Colors.light.primary,
									borderWidth: 1.8,
								},
							]}
						>
							<Ionicons
								name="mail-outline"
								size={22}
								color={styles(isDark).colorIconInput.color}
							/>
							<TextInput
								placeholder="Insira o e-mail"
								placeholderTextColor={styles(isDark).colorIconInput.color}
								keyboardType="email-address"
								numberOfLines={1}
								value={emailAddress}
								onChangeText={text => setEmailAddress(text)}
								style={[
									styles(isDark).textInput,
									{ flex: 1, fontWeight: '300' },
								]}
								onFocus={() => setIsEmailFocused(true)}
								onBlur={() => setIsEmailFocused(false)}
							/>
						</View>

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
						</View>
						{!isPasswordStrong && password.length > 0 ? (
							<View style={{ width: '100%', gap: 10, marginBottom: 10 }}>
								{renderStrengthBar()}
								{renderRequirements()}
							</View>
						) : null}

						<Pressable
							onPress={onSignUpPress}
							style={[
								styles(isDark).button,
								{
									marginTop: 30,
									backgroundColor:
										isPasswordStrong && !isDark
											? Colors.light.primary
											: !isPasswordStrong && !isDark
												? Colors.light.primaryMuted
												: isPasswordStrong && isDark
													? Colors.dark.secondary
													: Colors.dark.textMuted,
									//borderWidth:0
								},
							]}
							//disabled={!isPasswordStrong}
						>
							<Text
								style={[
									styles(isDark).buttonText,
									{
										color:
											isPasswordStrong && !isDark
												? Colors.light.background
												: !isPasswordStrong && !isDark
													? Colors.light.primaryMuted
													: isPasswordStrong && isDark
														? Colors.dark.text
														: Colors.dark.textMuted,
									},
								]}
							>
								Criar conta
							</Text>
						</Pressable>

						<Text style={styles(isDark).textEnd}>
							Já possui uma conta?{' '}
							<Pressable
								style={{
									flexDirection: 'row',
									alignItems: 'center',
									justifyContent: 'center',
								}}
								onPress={() => router.back()}
							>
								<Text
									style={{
										textDecorationLine: 'underline',
										color: isDark
											? Colors.dark.secondary
											: Colors.light.primary,
										fontWeight: '400',
										alignItems: 'center',
									}}
								>
									Faça o login
								</Text>
							</Pressable>
						</Text>

						{errors.map(error => (
							<Text key={error.longMessage} style={{ color: 'red' }}>
								{error.longMessage}
							</Text>
						))}
					</View>
				</Animated.View>
			</KeyboardAvoidingView>
		</TouchableWithoutFeedback>
	)
}
const styles = (isDark: boolean) =>
	StyleSheet.create({
		container: {
			flex: 1,
			alignItems: 'center',
			justifyContent: 'flex-start',
			width: '100%',
		},
		contentContainer: {
			width: '100%',
			alignItems: 'center',
			paddingHorizontal: '5%',
		},
		headerText: {
			fontWeight: '300',
			marginBottom: '4%',
			maxWidth: 300,
			textAlign: 'center',
			fontFamily: fontFamily.poppins.regular,
		},
		textInput: {
			padding: '.7%',
			fontSize: 16,
			marginLeft: 6,
			fontFamily: fontFamily.poppins.regular,
			color: isDark ? Colors.dark.text : Colors.light.text,
		},
		input: {
			padding: '3.9%',
			borderRadius: 16,
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
		button: {
			padding: '3.8%',
			borderRadius: 16,
			width: '100%',
			alignItems: 'center',
			flexDirection: 'row',
			justifyContent: 'center',
			gap: 10,
			marginBottom: 14,
		},
		buttonText: {
			fontSize: FontSize.base,
			fontFamily: fontFamily.poppins.regular,
			letterSpacing: 0.5,
		},
		title: {
			fontSize: 20,
			fontFamily: fontFamily.poppins.regular,
		},
		separator: {
			marginVertical: 30,
			height: 1,
			width: '80%',
		},
		divider: {
			flexDirection: 'row',
			alignItems: 'center',
			justifyContent: 'center',
			marginVertical: '4%',
			width: '100%',
		},
		dividerLine: {
			width: '6%',
			height: 1,
			backgroundColor: isDark
				? Colors.dark.borderInput
				: Colors.light.borderInput,
		},
		dividerText: {
			color: isDark ? Colors.dark.text : Colors.light.text,
			fontWeight: '300',
			paddingHorizontal: '1.5%',
			fontFamily: fontFamily.poppins.regular,
		},
		textEnd: {
			color: isDark ? Colors.dark.text : Colors.light.text,
			fontWeight: '300',
			marginVertical: '4%',
			fontSize: 14,
			flexDirection: 'row',
			alignItems: 'center',
			gap: 4,
			fontFamily: fontFamily.poppins.regular,
		},
		colorIconInput: {
			color: isDark
				? Colors.dark.colorIconInput
				: Colors.light.colorIconInput.toString(),
		},
		strengthBarContainer: {
			width: '100%',
			height: 4,
			backgroundColor: isDark
				? Colors.dark.borderInput
				: Colors.light.borderInput,
			borderRadius: 2,
			overflow: 'hidden',
		},
		strengthBar: {
			height: '100%',
			borderRadius: 2,
		},
		requirementsContainer: {
			width: '100%',
			backgroundColor: 'transparent',
		},
		requirement: {
			fontSize: 12,
			marginBottom: 4,
			fontFamily: fontFamily.poppins.regular,
		},
	})
