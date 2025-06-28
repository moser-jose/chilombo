import { View, TextInput } from '@/src/components/Themed'
import { useState, useEffect } from 'react'
import { ActivityIndicator, Pressable, StyleSheet } from 'react-native'
import { isClerkAPIResponseError, useClerk } from '@clerk/clerk-expo'
import { Text, TouchableOpacity } from '@/src/components/Themed'
import { FontSize } from '@/src/constants/FontSize'
import { router, Stack } from 'expo-router'
import { useCustomTheme } from '@/src/context/ThemeContext'
import { Theme } from '@/src/types/theme'
import { ClerkAPIError } from '@clerk/types'
import { Ionicons } from '@expo/vector-icons'
export default function ResetPassword() {
	const { client } = useClerk()
	const [email, setEmail] = useState('')
	const [errors, setErrors] = useState<ClerkAPIError[]>([])
	const [pendingVerification, setPendingVerification] = useState(false)
	const [isLoading, setIsLoading] = useState(false)
	const { theme } = useCustomTheme()
	const styles = makeStyles(theme as Theme)
	useEffect(() => {
		if (pendingVerification) {
			router.push({
				pathname: '/(auth)/reset-password-confirm',
				params: {
					email: email,
				},
			})
		}
	}, [pendingVerification, email])

	const handleReset = async () => {
		setIsLoading(true)
		try {
			await client.signIn.create({
				strategy: 'reset_password_email_code',
				identifier: email.toLowerCase(),
			})

			setPendingVerification(true)
		} catch (err) {
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
				<Text style={styles.headerText}>
					Recupere a sua password e tenha acesso ao app
				</Text>
				<TextInput
					type="email"
					label="Email"
					placeholder="Insira o seu e-mail"
					icon="mail-outline"
					value={email}
					onChangeText={setEmail}
					errors={errors}
				/>
				<TouchableOpacity style={styles.button} onPress={handleReset}>
					<Text style={styles.buttonText}>Recuperar Password</Text>
				</TouchableOpacity>

				<View
					style={{
						flexDirection: 'row',
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
		headerText: {
			fontSize: FontSize.base,
			fontFamily: theme.fonts.regular.fontFamily,
			marginBottom: 20,
		},
		button: {
			marginVertical: 20,
		},
		textEnd: {
			color: theme.colors.text,
			marginVertical: '4%',
			fontSize: 14,
			gap: 4,
			fontFamily: theme.fonts.regular.fontFamily,
		},
		buttonText: {
			fontSize: FontSize.sm,
			fontFamily: theme.fonts.regular.fontFamily,
			letterSpacing: 0.5,
			color: theme.colors.text,
		},
	})
