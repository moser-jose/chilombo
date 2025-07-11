import { Ionicons } from '@expo/vector-icons'
import { useRef, useState } from 'react'
import {
	ActivityIndicator,
	Pressable,
	StyleSheet,
	View,
	TextInput as DefaultTextInput,
} from 'react-native'
import { isClerkAPIResponseError, useClerk } from '@clerk/clerk-expo'
import { Text, TouchableOpacity, TextInput } from '@/src/components/Themed'
import { FontSize } from '@/src/constants/FontSize'
import { useTheme } from '@/src/hooks/useTheme'
import { Theme } from '@/src/types/theme'
import { router, Stack } from 'expo-router'
import { ClerkAPIError } from '@clerk/types'

export default function ResetPasswordConfirm() {
	const { client } = useClerk()
	const [errors, setErrors] = useState<ClerkAPIError[]>([])
	const [password, setPassword] = useState('')
	const [passwordConfirm, setPasswordConfirm] = useState('')
	const { theme } = useTheme()
	const styles = makeStyles(theme as Theme)

	const codeOneRef = useRef<DefaultTextInput>(null)
	const codeTwoRef = useRef<DefaultTextInput>(null)
	const codeThreeRef = useRef<DefaultTextInput>(null)
	const codeFourRef = useRef<DefaultTextInput>(null)
	const codeFiveRef = useRef<DefaultTextInput>(null)
	const codeSixRef = useRef<DefaultTextInput>(null)

	const [codeOne, setCodeOne] = useState('')
	const [codeTwo, setCodeTwo] = useState('')
	const [codeThree, setCodeThree] = useState('')
	const [codeFour, setCodeFour] = useState('')
	const [codeFive, setCodeFive] = useState('')
	const [codeSix, setCodeSix] = useState('')

	const [isCodeOneFocused, setIsCodeOneFocused] = useState(false)
	const [isCodeTwoFocused, setIsCodeTwoFocused] = useState(false)
	const [isCodeThreeFocused, setIsCodeThreeFocused] = useState(false)
	const [isCodeFourFocused, setIsCodeFourFocused] = useState(false)
	const [isCodeFiveFocused, setIsCodeFiveFocused] = useState(false)
	const [isCodeSixFocused, setIsCodeSixFocused] = useState(false)

	const [isLoading, setIsLoading] = useState(false)

	const handleReset = async () => {
		setIsLoading(true)
		try {
			if (password !== passwordConfirm) {
				setErrors([
					{
						code: 'password_mismatch',
						message: 'As passwords não coincidem',
						meta: {
							paramName: 'password',
						},
					},
				])
				return
			}
			await client.signIn.attemptFirstFactor({
				strategy: 'reset_password_email_code',
				code: codeOne + codeTwo + codeThree + codeFour + codeFive + codeSix,
				password: password,
			})
			router.replace('/(main)')
		} catch (err: unknown) {
			if (isClerkAPIResponseError(err)) setErrors(err.errors)
		} finally {
			setIsLoading(false)
		}
	}

	return (
		<>
			<Stack.Screen
				options={{
					headerShown: true,
					title: 'Recuperar Password',
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
			<View style={{ padding: 16 }}>
				<Text style={styles.headerText}>Insira a nova password</Text>

				<TextInput
					type="password"
					label="Password"
					placeholder="Insira a nova password"
					icon="lock-closed-outline"
					value={password}
					onChangeText={setPassword}
					errors={errors}
					style={{ marginBottom: 20 }}
				/>

				<TextInput
					type="password"
					label="Confirmar Password"
					placeholder="Confirmar Password"
					icon="lock-closed-outline"
					value={passwordConfirm}
					onChangeText={setPasswordConfirm}
					errors={errors}
				/>
				<Text style={{ marginVertical: 20 }}>
					Insira o código de verificação
				</Text>
				<View
					style={{
						flexDirection: 'row',
						alignItems: 'center',
						justifyContent: 'center',
						gap: 10,
						paddingHorizontal: 20,
						marginBottom: 20,
					}}
				>
					<View
						style={[
							styles.inputVerify,
							isCodeOneFocused && {
								borderColor: theme.colors.primary,
								borderWidth: 1.8,
							},
						]}
					>
						<DefaultTextInput
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
								borderColor: theme.colors.primary,
								borderWidth: 1.8,
							},
						]}
					>
						<DefaultTextInput
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
								borderColor: theme.colors.primary,
								borderWidth: 1.8,
							},
						]}
					>
						<DefaultTextInput
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
								borderColor: theme.colors.primary,
								borderWidth: 1.8,
							},
						]}
					>
						<DefaultTextInput
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
								borderColor: theme.colors.primary,
								borderWidth: 1.8,
							},
						]}
					>
						<DefaultTextInput
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
								borderColor: theme.colors.primary,
								borderWidth: 1.8,
							},
						]}
					>
						<DefaultTextInput
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

				<TouchableOpacity style={styles.button} onPress={handleReset}>
					<Text style={styles.buttonText}>Confirmar</Text>
				</TouchableOpacity>
			</View>

			{isLoading && (
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
		container: {
			flex: 1,
			alignItems: 'center',
			justifyContent: 'center',
			position: 'relative',
			width: '100%',
			padding: 20,
			backgroundColor: theme.colors.background,
		},
		headerText: {
			fontSize: FontSize.base,
			fontFamily: theme.fonts.regular.fontFamily,
			marginBottom: 20,
		},
		button: {
			marginVertical: 20,
		},
		inputVerify: {
			borderRadius: 10,
			width: '15%',
			flexDirection: 'row',
			borderColor: theme.colors.borderInput,
			alignItems: 'center',
			borderWidth: 1,
			//marginBottom: 10,
		},
		textInputVerify: {
			fontSize: FontSize.sm,
			padding: 10,
			fontFamily: theme.fonts.bold.fontFamily,
			color: theme.colors.text,
			width: '100%',
			overflow: 'hidden',
			textAlign: 'center',
		},
		buttonText: {
			fontSize: FontSize.sm,
			fontFamily: theme.fonts.regular.fontFamily,
			letterSpacing: 0.5,
			color: theme.colors.text,
		},
	})
