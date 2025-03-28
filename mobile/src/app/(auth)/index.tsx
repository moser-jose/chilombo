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
import TextInputUI from '@/src/components/ui/TextInput'
// Finaliza qualquer sessão de autenticação pendente
WebBrowser.maybeCompleteAuthSession()

const logoApp = Image.resolveAssetSource(empresa).uri

export default function SignIn() {
	useWarmUpBrowser()
	const { startSSOFlow } = useSSO()
	const router = useRouter()
	const [errors, setErrors] = useState<ClerkAPIError[]>([])
	const theme = useColorScheme()
	const { signIn, setActive, isLoaded } = useSignIn()
	const isDark = theme === 'dark'
	const { width, height } = useWindowDimensions()
	const [emailAddress, setEmailAddress] = useState('')
	const [password, setPassword] = useState('')
	const [isSignIn, setIsSignIn] = useState(false)
	const [showPassword, setShowPassword] = useState(false)
	const [isPasswordStrong, setIsPasswordStrong] = useState(false)
	const [isEmailFocused, setIsEmailFocused] = useState(false)
	const [isPasswordFocused, setIsPasswordFocused] = useState(false)
	const [isLoading, setIsLoading] = useState(false)
	const [isEmailValid, setIsEmailValid] = useState(false)

	const translateY = useRef(new Animated.Value(0)).current

	const triggerHapticFeedback = () => {
		if (Platform.OS === 'ios') {
			Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium)
		}
	}

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

	const logoSize = {
		width: width * 0.6,
		height: width * 0.6 * 0.478,
		maxWidth: 230,
		maxHeight: 110,
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
			{password.length > 0 ? (
				<Ionicons
					name={showPassword ? 'eye-off-outline' : 'eye-outline'}
					size={22}
					color={styles(isDark).colorIconInput.color}
				/>
			) : null}
		</View>
	)

	const handleSignInWithGoogle = useCallback(async () => {
		triggerHapticFeedback()
		try {
			const { createdSessionId, setActive, signIn, signUp } =
				await startSSOFlow({
					strategy: 'oauth_google',
					redirectUrl: AuthSession.makeRedirectUri(),
				})

			if (createdSessionId) {
				setActive?.({ session: createdSessionId })

				router.replace('/(main)')
			} else if (signIn) {
				await signIn.create({
					identifier: signIn.identifier as string,
				})

				router.replace('/(main)')
			} else if (signUp) {
				await signUp.create({})

				router.replace('/(main)')
			} else {
				//console.log("No valid authentication state found");
				setErrors([
					{
						code: 'verification_incomplete',
						message: 'Verification incomplete',
						longMessage:
							'The verification process could not be completed. Please try again.',
					},
				])
			}
		} catch (err) {
			if (isClerkAPIResponseError(err)) {
				setErrors(err.errors)
				//console.error("Clerk API Error:", err.errors);
			}
			//console.error("Authentication error:", JSON.stringify(err, null, 2));
			setErrors([
				{
					code: 'verification_incomplete',
					message: 'Verification incomplete',
					longMessage:
						'The verification process could not be completed. Please try again.',
				},
			])
		}
	}, [startSSOFlow, router])

	const onSignInPress = React.useCallback(async () => {
		if (!isLoaded) return

		if (process.env.EXPO_OS === 'ios') {
			await Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium)
		}
		setIsSignIn(true)
		setErrors([])

		// Start the sign-in process using the email and password provided
		try {
			const signInAttempt = await signIn.create({
				identifier: emailAddress,
				password,
			})

			// If sign-in process is complete, set the created session as active
			// and redirect the user
			if (signInAttempt.status === 'complete') {
				await setActive({ session: signInAttempt.createdSessionId })
				router.replace('/(main)')
			} else {
				// If the status isn't complete, check why. User might need to
				// complete further steps.
				//console.error(JSON.stringify(signInAttempt, null, 2))
				setErrors([
					{
						code: 'verification_incomplete',
						message: 'Verification incomplete',
						longMessage:
							'The verification process could not be completed. Please try again.',
					},
				])
			}
		} catch (err) {
			// See https://clerk.com/docs/custom-flows/error-handling
			// for more info on error handling
			if (isClerkAPIResponseError(err)) setErrors(err.errors)
			//console.error(JSON.stringify(err, null, 2))
		} finally {
			setIsSignIn(false)
		}
	}, [isLoaded, signIn, emailAddress, password, setActive, router])

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
					<Image
						source={{
							uri: logoApp,
						}}
						resizeMode="contain"
						style={{
							width: logoSize.width,
							height: logoSize.height,
							marginBottom: height * 0.02,
							maxWidth: logoSize.maxWidth,
							maxHeight: logoSize.maxHeight,
						}}
					/>

					<View style={[styles(isDark).contentContainer, { maxWidth: 500 }]}>
						<Text
							style={[styles(isDark).headerText, { fontSize: width * 0.04 }]}
						>
							Faça o login com o seu e-mail e senha
						</Text>

						{/* <View
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
								placeholder="Insira o e-mail ou o telefone"
								placeholderTextColor={styles(isDark).colorIconInput.color}
								keyboardType="email-address"
								numberOfLines={1}
								style={[
									styles(isDark).textInput,
									{ flex: 1, fontWeight: '300' },
								]}
								onFocus={() => setIsEmailFocused(true)}
								onBlur={() => setIsEmailFocused(false)}
								onChangeText={text => setEmailAddress(text)}
								value={emailAddress}
							/>
						</View> */}

						<TextInputUI
							type="email"
							//label="E-mail ou telefone"
							icon="mail-outline"
							placeholder="Insira o e-mail"
							value={emailAddress}
							onChangeText={setEmailAddress}
						/>

						{/* <View
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

						<TextInputUI
							type="password"
							icon="key"
							placeholder="Insira a senha"
							value={password}
							onChangeText={setPassword}
						/>

						<Pressable style={{ width: '100%', alignItems: 'flex-end' }}>
							<Link href={'/sign-up'}>
								<Text
									style={{
										color: isDark
											? Colors.dark.secondary
											: Colors.light.primary,
										fontWeight: '500',
										fontSize: width * 0.035,
									}}
								>
									Esqueceu sua senha?
								</Text>
							</Link>
						</Pressable>

						<Button
							onPress={onSignInPress}
							disabled={!isPasswordStrong}
							loading={isSignIn}
							variant="filled"
							size="lg"
							style={{ marginTop: 20 }}
						>
							<Text
								style={{
									color:
										isPasswordStrong && isEmailValid && !isDark
											? Colors.light.background
											: (!isPasswordStrong || !isEmailValid) && !isDark
												? Colors.light.primaryMuted
												: isPasswordStrong && isEmailValid && isDark
													? Colors.dark.text
													: Colors.dark.textMuted,
								}}
							>
								Entrar
							</Text>
						</Button>

						<View style={styles(isDark).divider}>
							<View style={styles(isDark).dividerLine} />
							<Text style={styles(isDark).dividerText}>
								ou continue com as suas redes sociais
							</Text>
							<View style={styles(isDark).dividerLine} />
						</View>

						<View
							style={{
								marginVertical: 12,
								flexDirection: 'row',
								alignItems: 'center',
								justifyContent: 'center',
								gap: 30,
							}}
						>
							<TouchableOpacity
								onPress={handleSignInWithGoogle}
								style={{
									backgroundColor: isDark
										? Colors.dark.textMuted
										: Colors.light.secondaryMuted,
									padding: 10,
									borderRadius: 50,
								}}
							>
								<FacebookSVG height={30} width={30} />
							</TouchableOpacity>
							<TouchableOpacity
								onPress={handleSignInWithGoogle}
								style={{
									backgroundColor: isDark
										? Colors.dark.textMuted
										: Colors.light.secondaryMuted,
									padding: 10,
									borderRadius: 50,
								}}
							>
								<GoogleSVG height={30} width={30} />
							</TouchableOpacity>
						</View>

						<Text style={styles(isDark).textEnd}>
							Ainda não possui uma conta?{' '}
							<Link
								href={'/sign-up'}
								style={{
									textDecorationLine: 'underline',
									color: isDark ? Colors.dark.secondary : Colors.light.primary,
									fontWeight: '400',
								}}
							>
								crie agora mesmo
							</Link>
						</Text>
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
		button: {
			padding: 12,
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
		},
		colorIconInput: {
			color: isDark
				? Colors.dark.colorIconInput
				: Colors.light.colorIconInput.toString(),
		},
	})
