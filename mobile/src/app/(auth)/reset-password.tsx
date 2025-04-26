import { View } from '@/src/components/Themed'
import TextInputUI from '@/src/components/ui/TextInput'
import { useState, useEffect } from 'react'
import { Pressable, StyleSheet } from 'react-native'
import { isClerkAPIResponseError, useClerk } from '@clerk/clerk-expo'
import { TouchableOpacity } from '@/src/components/ui/TouchableOpacity'
import { Text } from '@/src/components/ui/Text'
import { FontSize } from '@/src/constants/FontSize'
import { fontFamily } from '@/src/constants/FontFamily'
import { router, Stack } from 'expo-router'
import { useCustomTheme } from '@/src/context/ThemeContext'
import { Theme } from '@/src/types/theme'
import Colors from '@/src/constants/Colors'
import { ClerkAPIError } from '@clerk/types'
import { Ionicons } from '@expo/vector-icons'
export default function ResetPassword() {
	const { client } = useClerk()
	const [email, setEmail] = useState('')
	const [errors, setErrors] = useState<ClerkAPIError[]>([])
	const [pendingVerification, setPendingVerification] = useState(false)
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
		try {
			await client.signIn.create({
				strategy: 'reset_password_email_code',
				identifier: email.toLowerCase(),
			})

			setPendingVerification(true)
		} catch (err) {
			if (isClerkAPIResponseError(err)) setErrors(err.errors)
			console.error(err)
		}
	}

	return (
		<>
			<Stack.Screen
				options={{
					headerShown: true,
					title: 'Recuperar Password',
					/* headerTitleStyle: {
						fontFamily: theme.fonts.bold.fontFamily,
						fontSize: theme.size.smB,
						color: theme.colors.textHeader,
					},
					headerStyle: {
						backgroundColor: theme.colors.backgroundHeader,
					}, */
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
				<TextInputUI
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
		</>
	)
}

const makeStyles = (theme: Theme) =>
	StyleSheet.create({
		headerText: {
			fontSize: FontSize.base,
			fontFamily: fontFamily.poppins.regular,
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
			fontFamily: fontFamily.poppins.regular,
		},
		buttonText: {
			fontSize: FontSize.sm,
			fontFamily: fontFamily.poppins.regular,
			letterSpacing: 0.5,
			color: Colors.black,
		},
	})
