import {
	TouchableWithoutFeedback,
	Modal,
	StyleSheet,
	Keyboard,
} from 'react-native'
import { Text, View } from '../Themed'
import { TextInput } from 'react-native'
import { fontFamily } from '@/src/constants/FontFamily'
import { FontSize } from '@/src/constants/FontSize'
import { Ionicons } from '@expo/vector-icons'
import { Pressable } from 'react-native'
import { useEffect, useRef, useState } from 'react'
import { ClerkAPIError } from '@clerk/types'
import { router } from 'expo-router'
import * as Haptics from 'expo-haptics'
import { isClerkAPIResponseError, useSignUp } from '@clerk/clerk-expo'
import Button from './Button'
import { maskEmail } from '@/src/utils/maskEmail'
import { useCustomTheme } from '@/src/context/ThemeContext'
import { ThemeColors } from '@/src/types/themeColors'
interface ModalSSOProps {
	openModal: boolean
	isDark: boolean
	emailAddress: string
	isPasswordStrong: boolean
}

export function ModalSSO({ openModal, isDark, emailAddress }: ModalSSOProps) {
	const { isLoaded, signUp, setActive } = useSignUp()

	const codeOneRef = useRef<TextInput>(null)
	const codeTwoRef = useRef<TextInput>(null)
	const codeThreeRef = useRef<TextInput>(null)
	const codeFourRef = useRef<TextInput>(null)
	const codeFiveRef = useRef<TextInput>(null)
	const codeSixRef = useRef<TextInput>(null)

	const [codeOne, setCodeOne] = useState('')
	const [codeTwo, setCodeTwo] = useState('')
	const [codeThree, setCodeThree] = useState('')
	const [codeFour, setCodeFour] = useState('')
	const [codeFive, setCodeFive] = useState('')
	const [codeSix, setCodeSix] = useState('')
	const [errors, setErrors] = useState<ClerkAPIError[]>([])
	const [isLoading, setIsLoading] = useState(false)

	const [isCodeOneFocused, setIsCodeOneFocused] = useState(false)
	const [isCodeTwoFocused, setIsCodeTwoFocused] = useState(false)
	const [isCodeThreeFocused, setIsCodeThreeFocused] = useState(false)
	const [isCodeFourFocused, setIsCodeFourFocused] = useState(false)
	const [isCodeFiveFocused, setIsCodeFiveFocused] = useState(false)
	const [isCodeSixFocused, setIsCodeSixFocused] = useState(false)

	const { themeColors } = useCustomTheme()
	const styles = makeStyles(themeColors as ThemeColors)

	const onVerifyPress = async () => {
		if (!isLoaded) return
		if (process.env.EXPO_OS === 'ios') {
			await Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium)
		}
		setIsLoading(true)

		try {
			const signUpAttempt = await signUp.attemptEmailAddressVerification({
				code: codeOne + codeTwo + codeThree + codeFour + codeFive + codeSix,
			})

			if (signUpAttempt.status === 'complete') {
				await setActive({ session: signUpAttempt.createdSessionId })
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
			if (isClerkAPIResponseError(err)) {
				setErrors(err.errors)
			}
		} finally {
			setIsLoading(false)
		}
	}

	const closeModal = async () => {
		if (process.env.EXPO_OS === 'ios') {
			await Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium)
		}
		router.replace('/(auth)/sign-up')
	}
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

	return (
		<Modal
			visible={openModal}
			statusBarTranslucent={true}
			transparent={true}
			animationType="slide"
		>
			<View style={styles.contentModal}>
				{errors.map(error => (
					<View
						key={error.longMessage}
						style={{
							padding: 10,
							borderRadius: 10,
							marginBottom: 10,
							position: 'absolute',
							alignSelf: 'center',
							justifyContent: 'center',
							alignItems: 'center',
							top: 70,
							left: 0,
							right: 0,
						}}
					>
						<View
							style={{
								width: '90%',
								backgroundColor: 'rgba(255, 0, 0, 0.71)',
								padding: 10,
								borderRadius: 12,
								marginBottom: 10,
							}}
						>
							<Text
								style={{
									color: 'white',
									fontFamily: fontFamily.poppins.regular,
									fontSize: 16,
								}}
							>
								{error.longMessage}
							</Text>
						</View>
					</View>
				))}

				<TouchableWithoutFeedback onPress={Keyboard.dismiss}>
					<View style={styles.cardModal}>
						<Text style={styles.titleModal}>
							Insira o Código de verificação
						</Text>
						<Text style={styles.descModal}>
							Enviamos um código de verificação para o e-mail{' '}
							<Text style={{ fontFamily: fontFamily.poppins.bold }}>
								{maskEmail(emailAddress)}
							</Text>
						</Text>
						<View
							style={{
								flexDirection: 'row',
								alignItems: 'center',
								justifyContent: 'center',
								gap: 10,
							}}
						>
							<View
								style={[
									styles.inputVerify,
									isCodeOneFocused && {
										borderColor: isDark
											? themeColors.colors.secondary
											: themeColors.colors.primary,
										borderWidth: 1.8,
									},
								]}
							>
								<TextInput
									ref={codeOneRef}
									value={codeOne}
									onChangeText={text => {
										setCodeOne(text)
										if (text.length === 1) {
											codeTwoRef.current?.focus()
										}
									}}
									numberOfLines={1}
									maxLength={1}
									keyboardType="numeric"
									style={[styles.textInputVerify]}
									onFocus={() => setIsCodeOneFocused(true)}
									onBlur={() => setIsCodeOneFocused(false)}
								/>
							</View>
							<View
								style={[
									styles.inputVerify,
									isCodeTwoFocused && {
										borderColor: isDark
											? themeColors.colors.secondary
											: themeColors.colors.primary,
										borderWidth: 1.8,
									},
								]}
							>
								<TextInput
									ref={codeTwoRef}
									value={codeTwo}
									onChangeText={text => {
										setCodeTwo(text)
										if (text.length === 1) {
											codeThreeRef.current?.focus()
										} else if (text.length === 0) {
											codeOneRef.current?.focus()
										}
									}}
									numberOfLines={1}
									maxLength={1}
									keyboardType="numeric"
									style={[styles.textInputVerify]}
									onFocus={() => setIsCodeTwoFocused(true)}
									onBlur={() => setIsCodeTwoFocused(false)}
								/>
							</View>
							<View
								style={[
									styles.inputVerify,
									isCodeThreeFocused && {
										borderColor: isDark
											? themeColors.colors.secondary
											: themeColors.colors.primary,
										borderWidth: 1.8,
									},
								]}
							>
								<TextInput
									ref={codeThreeRef}
									value={codeThree}
									onChangeText={text => {
										setCodeThree(text)
										if (text.length === 1) {
											codeFourRef.current?.focus()
										} else if (text.length === 0) {
											codeTwoRef.current?.focus()
										}
									}}
									numberOfLines={1}
									maxLength={1}
									keyboardType="numeric"
									style={[styles.textInputVerify]}
									onFocus={() => setIsCodeThreeFocused(true)}
									onBlur={() => setIsCodeThreeFocused(false)}
								/>
							</View>
							<View
								style={[
									styles.inputVerify,
									isCodeFourFocused && {
										borderColor: isDark
											? themeColors.colors.secondary
											: themeColors.colors.primary,
										borderWidth: 1.8,
									},
								]}
							>
								<TextInput
									ref={codeFourRef}
									value={codeFour}
									onChangeText={text => {
										setCodeFour(text)
										if (text.length === 1) {
											codeFiveRef.current?.focus()
										} else if (text.length === 0) {
											codeThreeRef.current?.focus()
										}
									}}
									numberOfLines={1}
									maxLength={1}
									keyboardType="numeric"
									style={[styles.textInputVerify]}
									onFocus={() => setIsCodeFourFocused(true)}
									onBlur={() => setIsCodeFourFocused(false)}
								/>
							</View>
							<View
								style={[
									styles.inputVerify,
									isCodeFiveFocused && {
										borderColor: isDark
											? themeColors.colors.secondary
											: themeColors.colors.primary,
										borderWidth: 1.8,
									},
								]}
							>
								<TextInput
									ref={codeFiveRef}
									value={codeFive}
									onChangeText={text => {
										setCodeFive(text)
										if (text.length === 1) {
											codeSixRef.current?.focus()
										} else if (text.length === 0) {
											codeFourRef.current?.focus()
										}
									}}
									numberOfLines={1}
									maxLength={1}
									keyboardType="numeric"
									style={[styles.textInputVerify]}
									onFocus={() => setIsCodeFiveFocused(true)}
									onBlur={() => setIsCodeFiveFocused(false)}
								/>
							</View>
							<View
								style={[
									styles.inputVerify,
									isCodeSixFocused && {
										borderColor: isDark
											? themeColors.colors.secondary
											: themeColors.colors.primary,
										borderWidth: 1.8,
									},
								]}
							>
								<TextInput
									ref={codeSixRef}
									value={codeSix}
									onChangeText={text => {
										setCodeSix(text)
										if (text.length === 0) {
											codeFiveRef.current?.focus()
										}
									}}
									numberOfLines={1}
									maxLength={1}
									keyboardType="numeric"
									style={[styles.textInputVerify]}
									onFocus={() => setIsCodeSixFocused(true)}
									onBlur={() => setIsCodeSixFocused(false)}
								/>
							</View>
						</View>

						<Button
							style={{ marginTop: 30 }}
							disabled={isLoading}
							loading={isLoading}
							onPress={onVerifyPress}
							variant="filled"
							size="lg"
						>
							<Text>Verificar</Text>
						</Button>
					</View>
				</TouchableWithoutFeedback>

				<Pressable
					onPress={closeModal}
					style={{
						position: 'absolute',
						bottom: 50,
						padding: 10,
						justifyContent: 'center',
						alignItems: 'center',
					}}
				>
					<Ionicons
						name="close-circle"
						size={40}
						color={
							isDark ? themeColors.colors.secondary : themeColors.colors.primary
						}
					/>
				</Pressable>
			</View>
		</Modal>
	)
}

const makeStyles = (themeColors: ThemeColors) =>
	StyleSheet.create({
		descModal: {
			fontSize: 15,
			lineHeight: 24,
			opacity: 0.7,
			textAlign: 'center',
			marginBottom: 14,
			fontFamily: fontFamily.poppins.regular,
		},
		titleModal: {
			fontSize: 18,
			textAlign: 'center',
			fontFamily: fontFamily.poppins.bold,
			marginBottom: 14,
		},
		cardModal: {
			width: '90%',
			padding: 20,
		},
		contentModal: {
			flex: 1,
			justifyContent: 'center',
			alignItems: 'center',
			backgroundColor: themeColors.colors.background,
		},
		textModal: {
			fontWeight: '600',
			fontSize: 16,
			color: 'white',
		},
		buttonModal: {
			width: '90%',
			backgroundColor: 'black',
			justifyContent: 'center',
			alignItems: 'center',
			height: 56,
			borderRadius: 8,
		},
		containerModal: {
			flex: 1,
			justifyContent: 'center',
			alignItems: 'center',
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
		inputVerify: {
			borderRadius: 16,
			width: '15%',
			flexDirection: 'row',
			borderColor: themeColors.colors.borderInput,
			alignItems: 'center',
			borderWidth: 1,
			marginBottom: 20,
		},
		textInputVerify: {
			fontSize: 24,
			padding: 12,
			fontFamily: fontFamily.poppins.bold,
			color: themeColors.colors.text,
			width: '100%',
			overflow: 'hidden',
			textAlign: 'center',
		},
	})
