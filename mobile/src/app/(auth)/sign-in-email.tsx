import React from 'react'
import * as Haptics from 'expo-haptics'
import { useRouter } from 'expo-router'
import { StyleSheet, View } from 'react-native'
import { Text } from '@/components/Themed'
import { BodyScrollView } from '@/components/ui/BodyScrollView'
import Button from '@/src/components/ui/Buttons'
import TextInput from '@/src/components/ui/TextInputd'
import { isClerkAPIResponseError, useSignIn, useSSO } from '@clerk/clerk-expo'
import { ClerkAPIError } from '@clerk/types'
import * as WebBrowser from 'expo-web-browser'
import { useWarmUpBrowser } from '@/hooks/useWarmUpBrowser'

// Handle any pending authentication sessions
WebBrowser.maybeCompleteAuthSession()

export default function SignInEmail() {
	// Preload the browser for Android devices to reduce authentication load time
	useWarmUpBrowser()

	// Use the `useSSO()` hook to access the `startSSOFlow()` method
	const { startSSOFlow } = useSSO()

	const { signIn, setActive, isLoaded } = useSignIn()
	const router = useRouter()

	const [emailAddress, setEmailAddress] = React.useState('')
	const [password, setPassword] = React.useState('')
	const [isSigningIn, setIsSigningIn] = React.useState(false)
	const [errors, setErrors] = React.useState<ClerkAPIError[]>([])

	// Handle the submission of the sign-in form
	const onSignInPress = React.useCallback(async () => {
		if (!isLoaded) return

		if (process.env.EXPO_OS === 'ios') {
			await Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium)
		}
		setIsSigningIn(true)
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
				console.error(JSON.stringify(signInAttempt, null, 2))
			}
		} catch (err) {
			// See https://clerk.com/docs/custom-flows/error-handling
			// for more info on error handling
			if (isClerkAPIResponseError(err)) setErrors(err.errors)
			console.error(JSON.stringify(err, null, 2))
		} finally {
			setIsSigningIn(false)
		}
	}, [isLoaded, signIn, emailAddress, password, setActive, router])

	return (
		<BodyScrollView contentContainerStyle={styles.container}>
			<View style={styles.formSection}>
				<TextInput
					autoCapitalize="none"
					value={emailAddress}
					label="Email"
					keyboardType="email-address"
					placeholder="Enter your email"
					onChangeText={setEmailAddress}
				/>
				<TextInput
					value={password}
					label="Password"
					placeholder="Enter your password"
					secureTextEntry={true}
					onChangeText={setPassword}
				/>

				{errors.map(error => (
					<Text key={error.longMessage} style={styles.errorText}>
						{error.longMessage}
					</Text>
				))}

				<Button
					onPress={onSignInPress}
					loading={isSigningIn}
					disabled={!emailAddress || !password || isSigningIn}
					style={styles.signInButton}
				>
					Sign in
				</Button>
			</View>

			<View style={styles.footer}>
				<View style={styles.footerSection}>
					<Text style={styles.footerText}>Don't have an account?</Text>
					<Button onPress={() => router.push('/sign-up')} variant="ghost">
						Sign up
					</Button>
				</View>

				<View style={styles.footerSection}>
					<Text style={styles.footerText}>Forgot password?</Text>
					<Button
						onPress={() => router.push('/reset-password')}
						variant="ghost"
					>
						Reset password
					</Button>
				</View>
			</View>
		</BodyScrollView>
	)
}

const styles = StyleSheet.create({
	container: {
		padding: 24,
		gap: 32,
	},
	formSection: {
		gap: 16,
	},
	errorText: {
		color: 'red',
		marginBottom: 8,
	},
	signInButton: {
		marginTop: 8,
	},
	footer: {
		gap: 24,
	},
	footerSection: {
		alignItems: 'center',
	},
	footerText: {
		color: 'gray',
	},
})
