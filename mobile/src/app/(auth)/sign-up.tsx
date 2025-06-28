import {
	StyleSheet,
	Keyboard,
	TouchableWithoutFeedback,
	KeyboardAvoidingView,
	Platform,
	Animated,
	useWindowDimensions,
	Pressable,
	ScrollView,
	View,
} from 'react-native'
import * as Haptics from 'expo-haptics'
import { Ionicons } from '@expo/vector-icons'
import { Text } from '@/src/components/Themed'
import { FontSize } from '@/src/constants/FontSize'
import { isClerkAPIResponseError, useSignUp } from '@clerk/clerk-expo'
import { useRouter } from 'expo-router'
import { useState, useEffect, useRef } from 'react'
import Colors from '@/src/constants/Theme'
import {
	checkPasswordStrength,
	getPasswordRequirements,
	isStrongPassword,
} from '../../utils/strenghPasswordForce'
import { formatPhoneNumber } from '@/src/utils/formatPhone'
import { Stack } from 'expo-router'
import { ClerkAPIError } from '@clerk/types'
import { ModalSSO } from '@/src/components/modal/ModalSSO'
import { TextInput, TouchableOpacity } from '@/src/components/Themed'
import { useCustomTheme } from '@/src/context/ThemeContext'
import { Theme } from '@/src/types/theme'
export default function SignUp() {
	const { isLoaded, signUp } = useSignUp()
	const router = useRouter()
	const { theme } = useCustomTheme()
	const styles = makeStyles(theme)
	const { width, height } = useWindowDimensions()
	const [firstName, setFirstName] = useState('')
	const [lastName, setLastName] = useState('')
	const [phone, setPhone] = useState('')
	const [emailAddress, setEmailAddress] = useState('')
	const [address, setAddress] = useState('')
	const [password, setPassword] = useState('')
	const strength = checkPasswordStrength(password)
	const requirements = getPasswordRequirements(password)
	const [isPasswordStrong, setIsPasswordStrong] = useState(false)

	const [pendingVerification, setPendingVerification] = useState(false)
	const [errors, setErrors] = useState<ClerkAPIError[]>([])
	const [isLoading, setIsLoading] = useState(false)
	const [openModal, setOpenModal] = useState(false)

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

	const renderStrengthBar = () => {
		const barWidth = strength.score
		let barColor = Colors.error

		if (strength.score > 75) barColor = Colors.success
		else if (strength.score > 50) barColor = Colors.warning
		else if (strength.score > 25) barColor = Colors.orange

		return (
			<View style={styles.strengthBarContainer}>
				<View
					style={[
						styles.strengthBar,
						{ width: `${barWidth}%`, backgroundColor: barColor },
					]}
				/>
			</View>
		)
	}

	const renderRequirements = () => (
		<View style={styles.requirementsContainer}>
			<Text
				style={[
					styles.requirement,
					{ color: requirements.hasNumber ? Colors.success : Colors.error },
				]}
			>
				• Pelo menos um número
			</Text>
			<Text
				style={[
					styles.requirement,
					{ color: requirements.hasSymbol ? Colors.success : Colors.error },
				]}
			>
				• Pelo menos um símbolo (!@#$%^&*...)
			</Text>
			<Text
				style={[
					styles.requirement,
					{ color: requirements.hasUpperCase ? Colors.success : Colors.error },
				]}
			>
				• Pelo menos uma letra maiúscula
			</Text>
			<Text
				style={[
					styles.requirement,
					{ color: requirements.hasLowerCase ? Colors.success : Colors.error },
				]}
			>
				• Pelo menos uma letra minúscula
			</Text>
			<Text
				style={[
					styles.requirement,
					{ color: requirements.hasMinLength ? Colors.success : Colors.error },
				]}
			>
				• Mínimo de 8 caracteres
			</Text>
		</View>
	)

	const onSignUpPress = async () => {
		if (!isLoaded) return
		if (process.env.EXPO_OS === 'ios') {
			await Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium)
		}
		setIsLoading(true)

		try {
			const formattedPhone = formatPhoneNumber(phone)
			await signUp.create({
				emailAddress,
				password,
				firstName,
				lastName,
				//phoneNumber: formattedPhone,
				unsafeMetadata: {
					address,
				},
			})

			await signUp.prepareEmailAddressVerification({ strategy: 'email_code' })

			setPendingVerification(true)
			setOpenModal(true)
		} catch (err) {
			console.log(err)
			if (isClerkAPIResponseError(err)) setErrors(err.errors)
		} finally {
			setIsLoading(false)
		}
	}

	/* if (pendingVerification) {
		return (
			<ModalSSO
				openModal={openModal}
				isDark={theme.dark}
				emailAddress={emailAddress}
			/>
		)
	} */

	return (
		<>
			<Stack.Screen
				options={{
					headerShown: true,
					title: 'Criar conta',
					headerLeft: () => (
						<Pressable onPress={() => router.back()}>
							<Ionicons
								name="chevron-back"
								size={24}
								color={theme.colors.textHeader}
							/>
						</Pressable>
					),
				}}
			/>
			<TouchableWithoutFeedback onPress={Keyboard.dismiss}>
				<KeyboardAvoidingView
					behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
					keyboardVerticalOffset={Platform.OS === 'ios' ? 18 : 0}
					style={[
						styles.container,
						{
							height: height,
							flex: 1,
							backgroundColor: theme.colors.background,
						},
					]}
				>
					<ScrollView
						style={styles.scrollView}
						showsVerticalScrollIndicator={true}
						contentInsetAdjustmentBehavior="automatic"
						keyboardShouldPersistTaps="handled"
					>
						<Animated.View
							style={[
								styles.container,
								{
									transform: [{ translateY }],
									paddingVertical: height * 0.01,
								},
							]}
						>
							<View style={[styles.contentContainer]}>
								<Text style={styles.headerText}>
									Cria a sua conta e desfrute dos nossos serviços
								</Text>

								<View
									style={{
										width: '100%',
										flexDirection: 'row',
										justifyContent: 'space-between',
										gap: 6,
									}}
								>
									<TextInput
										type="text"
										label="Nome"
										placeholder="Insira o nome"
										icon="person-outline"
										value={firstName}
										onChangeText={setFirstName}
										style={{ flex: 1 }}
										errors={errors}
									/>
									<TextInput
										type="text"
										label="Sobrenome"
										placeholder="Insira o sobrenome"
										icon="person-outline"
										value={lastName}
										onChangeText={setLastName}
										style={{ flex: 1 }}
										errors={errors}
									/>
								</View>

								<View
									style={{
										width: '100%',
										flexDirection: 'row',
										justifyContent: 'space-between',
										gap: 6,
									}}
								>
									<TextInputUI
										type="text"
										label="DDI"
										readOnly={true}
										editable={false}
										placeholder="Insira o telefone"
										//icon="call-outline"
										value="+244"
										style={{ flex: 0.25 }}
									/>

									<TextInput
										type="phone"
										label="Telefone"
										placeholder="Insira o telefone"
										icon="call-outline"
										value={phone}
										onChangeText={setPhone}
										style={{ flex: 1 }}
										errors={errors}
									/>
								</View>

								<TextInput
									type="text"
									label="Endereço"
									placeholder="Insira o endereço"
									icon="location-outline"
									value={address}
									onChangeText={setAddress}
									errors={errors}
								/>
								<TextInput
									type="email"
									label="E-mail"
									placeholder="Insira o e-mail"
									icon="mail-outline"
									errors={errors}
									value={emailAddress}
									onChangeText={setEmailAddress}
								/>

								<TextInput
									type="password"
									label="Senha"
									placeholder="Insira a senha"
									icon="key-outline"
									value={password}
									onChangeText={setPassword}
									errors={errors}
									isPasswordStrong={isPasswordStrong}
								/>
								{!isPasswordStrong && password.length > 0 ? (
									<View style={{ width: '100%', gap: 10, marginBottom: 10 }}>
										{renderStrengthBar()}
										{renderRequirements()}
									</View>
								) : null}

								<TouchableOpacity
									type="primary"
									onPress={onSignUpPress}
									style={styles.button}
								>
									<Text
										style={[
											styles.buttonText,
											/* {
											color:
												isPasswordStrong && !isDark
													? Colors.light.background
													: !isPasswordStrong && !isDark
														? Colors.light.primaryMuted
														: isPasswordStrong && isDark
															? Colors.dark.text
															: Colors.dark.textMuted,
										}, */
										]}
									>
										Criar conta
									</Text>
								</TouchableOpacity>

								<View
									style={{
										flexDirection: 'row',
										flex: 1,
										justifyContent: 'center',
										alignItems: 'center',
									}}
								>
									<Text style={styles.textEnd}>Já possui uma conta? </Text>
									<Pressable onPress={() => router.back()}>
										<Text
											style={{
												textDecorationLine: 'underline',
												color: theme.colors.primary,
												fontWeight: '400',
												alignItems: 'center',
											}}
										>
											Faça o login
										</Text>
									</Pressable>
								</View>

								{/* {errors.map(error => (
								<Text key={error.longMessage} style={{ color: 'red' }}>
									{error.longMessage}
								</Text>
							))} */}
							</View>
						</Animated.View>
					</ScrollView>
				</KeyboardAvoidingView>
			</TouchableWithoutFeedback>

			{pendingVerification && (
				<ModalSSO
					openModal={openModal}
					isDark={theme.dark}
					emailAddress={emailAddress}
				/>
			)}
		</>
	)
}
const makeStyles = (theme: Theme) =>
	StyleSheet.create({
		container: {
			flex: 1,
			alignItems: 'center',
			justifyContent: 'center',
			width: '100%',
			backgroundColor: theme.colors.background,
		},
		contentContainer: {
			width: '100%',
			alignItems: 'center',
			paddingHorizontal: 16,
		},
		scrollView: {
			flex: 1,
			backgroundColor: theme.colors.background,
		},
		headerText: {
			fontWeight: '300',
			marginBottom: '4%',
			maxWidth: 300,
			textAlign: 'center',
			color: theme.colors.text,
			fontFamily: theme.fonts.regular.fontFamily,
		},
		/* textInput: {
			padding: '.7%',
			fontSize: 16,
			marginLeft: 6,
			fontFamily: theme.fonts.regular.fontFamily,
			color: isDark ? Colors.dark.text : Colors.light.text,
		},
		input: {
			padding: 10,
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
		}, */
		button: {
			marginVertical: 20,
		},
		buttonText: {
			fontSize: FontSize.sm,
			fontFamily: theme.fonts.regular.fontFamily,
			letterSpacing: 0.5,
			color: theme.colors.black,
		},
		title: {
			fontSize: 20,
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
			paddingHorizontal: '1.5%',
			fontFamily: theme.fonts.regular.fontFamily,
		},
		textEnd: {
			color: theme.colors.text,
			marginVertical: '4%',
			fontSize: 14,
			gap: 4,
			fontFamily: theme.fonts.regular.fontFamily,
		},
		colorIconInput: {
			color: theme.colors.colorIconInput,
		},
		strengthBarContainer: {
			width: '100%',
			height: 4,
			backgroundColor: theme.colors.borderInput,
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
			fontFamily: theme.fonts.regular.fontFamily,
		},
	})
