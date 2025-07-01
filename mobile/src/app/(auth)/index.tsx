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
	ActivityIndicator,
} from 'react-native'
import { useRouter, Link, Stack } from 'expo-router'
import * as Haptics from 'expo-haptics'
import * as WebBrowser from 'expo-web-browser'
import * as AuthSession from 'expo-auth-session'
import { ClerkAPIError } from '@clerk/types'

import { Text, View, TouchableOpacity } from '@/src/components/Themed'
import { FontSize } from '@/src/constants/FontSize'
import { GoogleSVG } from '@/src/components/svg/GoogleSvg'
import { FacebookSVG } from '@/src/components/svg/FacebookSVG'
import logoLight from '@/assets/images/logo-light.png'
import logoDark from '@/assets/images/logo-dark.png'
import {
	useSignIn,
	useSSO,
	isClerkAPIResponseError,
	useAuth,
} from '@clerk/clerk-expo'
import { TextInput } from '@/src/components/Themed'
import { useTheme } from '@/src/hooks/useTheme'
import { Theme } from '@/src/types/theme'

WebBrowser.maybeCompleteAuthSession()

const logoAppLight = Image.resolveAssetSource(logoLight).uri
const logoAppDark = Image.resolveAssetSource(logoDark).uri

export const useWarmUpBrowser = () => {
	useEffect(() => {
		// Preloads the browser for Android devices to reduce authentication load time
		// See: https://docs.expo.dev/guides/authentication/#improving-user-experience
		void WebBrowser.warmUpAsync()
		return () => {
			// Cleanup: closes browser when component unmounts
			void WebBrowser.coolDownAsync()
		}
	}, [])
}

export default function SignIn() {
	useWarmUpBrowser()
	const { startSSOFlow } = useSSO()
	const router = useRouter()
	const [errors, setErrors] = useState<ClerkAPIError | null>(null)
	const { signIn, setActive, isLoaded } = useSignIn()
	const { signOut } = useAuth()
	const { theme } = useTheme()
	const styles = makeStyles(theme as Theme)
	const { width, height } = useWindowDimensions()
	const [emailAddress, setEmailAddress] = useState('')
	const [password, setPassword] = useState('')
	const [isSignIn, setIsSignIn] = useState(false)

	const translateY = useRef(new Animated.Value(0)).current

	const triggerHapticFeedback = () => {
		if (Platform.OS === 'ios') {
			Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium)
		}
	}

	const logoSize = {
		width: width * 0.6,
		height: width * 0.6 * 0.478,
		maxWidth: 230,
		maxHeight: 110,
	}

	const handleSignSocial = useCallback(
		async ({
			strategy,
		}: {
			strategy: 'oauth_google' | 'oauth_facebook' | 'oauth_apple'
		}) => {
			triggerHapticFeedback()
			try {
				const { createdSessionId, setActive, signIn, signUp } =
					await startSSOFlow({
						strategy: strategy,
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
					setErrors({
						code: 'verification_incomplete',
						message: 'Verificação incompleta',
						longMessage:
							'O processo de verificação não pôde ser concluído. Por favor, tente novamente.',
					})
				}
			} catch (err) {
				if (isClerkAPIResponseError(err)) {
					handleErrors(err.errors[0])
				}

				setErrors({
					code: 'verification_incomplete',
					message: 'Verification incomplete',
					longMessage:
						'O processo de verificação não pôde ser concluído. Por favor, Verifique.',
				})
			}
		},
		[startSSOFlow, router],
	)

	const onSignInPress = React.useCallback(async () => {
		if (!isLoaded) return

		if (process.env.EXPO_OS === 'ios') {
			await Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium)
		}
		setIsSignIn(true)
		setErrors(null)

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
				setErrors({
					code: 'invalid_credentials',
					message: 'E-mail ou senha incorretos',
					longMessage:
						'O email ou senha que você inseriu estão incorretos. Por favor, verifique.',
				})
			}
		} catch (err) {
			if (isClerkAPIResponseError(err)) handleErrors(err.errors[0])
		} finally {
			setIsSignIn(false)
		}
	}, [isLoaded, signIn, emailAddress, password, setActive, router, signOut])

	function handleErrors(error: ClerkAPIError) {
		switch (error.code) {
			case 'invalid_credentials':
				setErrors({
					code: 'invalid_credentials',
					message: 'E-mail ou senha incorretos',
					longMessage:
						'O email ou senha que você inseriu estão incorretos. Por favor, tente novamente.',
				})
				break
			case 'form_param_nil':
				setErrors({
					code: 'form_param_nil',
					message: 'Preencha todos os campos',
					longMessage: 'Por favor, preencha todos os campos.',
				})
				break
			default:
				setErrors({
					code: 'invalid_credentials',
					message: 'E-mail ou senha incorretos',
					longMessage: 'O email ou senha incorretos. Por favor, Verifique.',
				})
		}
	}

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
						indicatorStyle={theme.dark ? 'white' : 'black'}
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
										uri: theme.dark ? logoAppDark : logoAppLight,
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

								<TextInput
									type="email"
									icon="mail-outline"
									placeholder="Insira o e-mail"
									value={emailAddress}
									onChangeText={setEmailAddress}
									style={{
										marginBottom: 20,
									}}
								/>

								<TextInput
									type="password"
									icon="key"
									placeholder="Insira a senha"
									value={password}
									onChangeText={setPassword}
								/>
								{errors && (
									<Text
										style={{
											color: theme.colors.error,
											fontSize: theme.size.xs,
											fontFamily: theme.fonts.medium.fontFamily,
											marginBottom: 20,
										}}
									>
										{errors.longMessage}
									</Text>
								)}

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
										onPress={() =>
											handleSignSocial({ strategy: 'oauth_facebook' })
										}
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
										onPress={() =>
											handleSignSocial({ strategy: 'oauth_google' })
										}
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

			{isSignIn && (
				<View
					style={{
						position: 'absolute',
						top: 0,
						left: 0,
						right: 0,
						bottom: 0,
						backgroundColor: 'rgba(0, 0, 0, 0.17)',
						justifyContent: 'center',
						alignItems: 'center',
					}}
				>
					<ActivityIndicator size="small" color={theme.colors.primary} />
				</View>
			)}
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
			color: theme.colors.black,
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
