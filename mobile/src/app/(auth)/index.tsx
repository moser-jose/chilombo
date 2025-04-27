import React, { useCallback, useEffect, useRef, useState } from 'react'
import {
	Platform,
	Image,
	StyleSheet,
	KeyboardAvoidingView,
	TouchableWithoutFeedback,
	Pressable,
	Animated,
	useWindowDimensions,
	Keyboard,
	ScrollView,
} from 'react-native'
import { TouchableOpacity } from '@/src/components/ui/TouchableOpacity'
import { useRouter, Link, Stack } from 'expo-router'
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
import Colors from '@/src/constants/Theme'
import { isStrongPassword } from '@/src/utils/strenghPasswordForce'
import { fontFamily } from '@/src/constants/FontFamily'
import { isValidEmail } from '@/src/utils/validEmail'
import TextInputUI from '@/src/components/ui/TextInput'
import { useCustomTheme } from '@/src/context/ThemeContext'
import { Theme } from '@/src/types/theme'

// Finaliza qualquer sessão de autenticação pendente
WebBrowser.maybeCompleteAuthSession()

const logoApp = Image.resolveAssetSource(empresa).uri

export default function SignIn() {
	useWarmUpBrowser()
	const { startSSOFlow } = useSSO()
	const router = useRouter()
	const [errors, setErrors] = useState<ClerkAPIError[]>([])
	const { signIn, setActive, isLoaded } = useSignIn()
	const { signOut } = useAuth()
	const { theme } = useCustomTheme()
	const styles = makeStyles(theme as Theme)
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

	/* useEffect(() => {
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
	}, [height, translateY]) */

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
					color={styles.colorIconInput.color}
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
			console.error('Authentication error:', JSON.stringify(err, null, 2))
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

		try {
			try {
				await signOut()
			} catch (e) {
				console.error(e)
			}

			const signInAttempt = await signIn.create({
				identifier: emailAddress,
				password,
			})

			if (signInAttempt.status === 'complete') {
				await setActive({ session: signInAttempt.createdSessionId })
				router.replace('/(main)')
			} else {
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
			if (isClerkAPIResponseError(err)) setErrors(err.errors)
			console.error(err)
		} finally {
			setIsSignIn(false)
		}
	}, [isLoaded, signIn, emailAddress, password, setActive, router, signOut])

	return (
		<>
			<Stack.Screen options={{ headerShown: false }} />
			<TouchableWithoutFeedback onPress={Keyboard.dismiss}>
				<KeyboardAvoidingView
					behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
					style={styles.container}
				>
					<ScrollView
						style={styles.scrollView}
						showsVerticalScrollIndicator={true}
						contentInsetAdjustmentBehavior="automatic"
						keyboardShouldPersistTaps="handled"
					>
						<Animated.View
							style={{
								transform: [{ translateY }],
								flex: 1,
								height: height,
								paddingVertical: height * 0.05,
							}}
						>
							<View style={[styles.contentContainer, { alignItems: 'center' }]}>
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
								<Text style={[styles.headerText, { fontSize: width * 0.04 }]}>
									Faça o login com o seu e-mail e senha
								</Text>

								<TextInputUI
									type="email"
									icon="mail-outline"
									placeholder="Insira o e-mail"
									value={emailAddress}
									onChangeText={setEmailAddress}
									style={{
										marginBottom: 20,
									}}
								/>

								<TextInputUI
									type="password"
									icon="key"
									placeholder="Insira a senha"
									value={password}
									onChangeText={setPassword}
								/>

								<Pressable style={{ width: '100%', alignItems: 'flex-end' }}>
									<Link href={'/reset-password'}>
										<Text
											style={{
												color: theme.colors.primary,
												fontFamily: theme.fonts.regular.fontFamily,
												fontSize: theme.size.xs,
											}}
										>
											Esqueceu sua senha?
										</Text>
									</Link>
								</Pressable>

								<TouchableOpacity
									type="primary"
									onPress={onSignInPress}
									style={styles.button}
								>
									<Text style={[styles.buttonText]}>Entrar</Text>
								</TouchableOpacity>

								<View style={styles.divider}>
									<View style={styles.dividerLine} />
									<Text style={styles.dividerText}>
										ou continue com as suas redes sociais
									</Text>
									<View style={styles.dividerLine} />
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
										type="secondary"
										onPress={handleSignInWithGoogle}
										style={{
											backgroundColor: theme.colors.backgroundIconIndex,
											padding: 10,
											borderRadius: 50,
										}}
									>
										<FacebookSVG height={24} width={24} />
									</TouchableOpacity>
									<TouchableOpacity
										type="secondary"
										onPress={handleSignInWithGoogle}
										style={{
											backgroundColor: theme.colors.backgroundIconIndex,
											padding: 10,
											borderRadius: 50,
										}}
									>
										<GoogleSVG height={24} width={24} />
									</TouchableOpacity>
								</View>

								<Text style={styles.textEnd}>
									Ainda não possui uma conta?{' '}
									<Link
										href={'/sign-up'}
										style={{
											textDecorationLine: 'underline',
											color: theme.colors.primary,
											fontWeight: '400',
										}}
									>
										crie agora mesmo
									</Link>
								</Text>
							</View>
						</Animated.View>
					</ScrollView>
				</KeyboardAvoidingView>
			</TouchableWithoutFeedback>
		</>
	)
}

const makeStyles = (theme: Theme) =>
	StyleSheet.create({
		scrollView: {
			backgroundColor: theme.colors.background,
			flex: 1,
		},
		container: {
			flex: 1,
			alignItems: 'center',
			justifyContent: 'center',
			height: '100%',
		},
		contentContainer: {
			alignItems: 'center',
			justifyContent: 'center',
			paddingHorizontal: 20,
			flex: 1,
			width: '100%',
			height: '100%',
		},
		headerText: {
			fontWeight: '300',
			marginBottom: '4%',
			color: theme.colors.text,
			maxWidth: 300,
			textAlign: 'center',
			fontFamily: theme.fonts.regular.fontFamily,
		},
		textInput: {
			padding: '.7%',
			fontSize: FontSize.base,
			marginLeft: 6,
			fontFamily: theme.fonts.regular.fontFamily,
			color: theme.colors.text,
		},
		input: {
			padding: 12,
			borderRadius: 10,
			width: '100%',
			flexDirection: 'row',
			borderColor: theme.colors.borderInput,
			alignItems: 'center',
			borderWidth: 1,
			marginBottom: 20,
			backgroundColor: theme.colors.ImputBackgroundColors,
		},
		button: { marginVertical: 20 },
		buttonText: {
			fontSize: FontSize.sm,
			fontFamily: theme.fonts.regular.fontFamily,
			letterSpacing: 0.5,
			color: Colors.black,
		},
		title: {
			fontSize: FontSize.base,
			fontFamily: theme.fonts.regular.fontFamily,
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
			backgroundColor: theme.colors.borderInput,
		},
		dividerText: {
			color: theme.colors.text,
			fontWeight: '300',
			fontSize: FontSize.xs,
			paddingHorizontal: '1.5%',
			fontFamily: theme.fonts.regular.fontFamily,
		},
		textEnd: {
			color: theme.colors.text,
			fontWeight: '300',
			marginVertical: '4%',
			fontSize: FontSize.xs,
		},
		colorIconInput: {
			color: theme.colors.colorIconInput,
		},
	})
