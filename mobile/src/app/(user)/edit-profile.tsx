import {
	StyleSheet,
	Image,
	ScrollView,
	Alert,
	Platform,
	Keyboard,
	KeyboardAvoidingView,
	TouchableWithoutFeedback,
	Animated,
	KeyboardEvent,
} from 'react-native'
import { Text, View } from '@/src/components/Themed'
import { Ionicons } from '@expo/vector-icons'
import { useUser, useSession } from '@clerk/clerk-expo'
import { FontSize } from '@/src/constants/FontSize'
import { Stack, useRouter } from 'expo-router'
import { useState, useRef, useEffect } from 'react'
import NetInfo from '@react-native-community/netinfo'
import * as ImagePicker from 'expo-image-picker'
import { TextInput } from '@/src/components/Themed'
import ModalMessage from '@/src/components/modal/ModalMessage'
import { useTheme } from '@/src/hooks/useTheme'
import { Theme } from '@/src/types/theme'
import { TouchableOpacity } from '@/src/components/Themed'
export default function EditProfileScreen() {
	const { user } = useUser()
	const { session } = useSession()
	const router = useRouter()
	const [firstName, setFirstName] = useState(user?.firstName || '')
	const [lastName, setLastName] = useState(user?.lastName || '')
	const [email, setEmail] = useState(user?.emailAddresses[0].emailAddress || '')
	const [profileImage, setProfileImage] = useState(user?.imageUrl)
	const [isLoading, setIsLoading] = useState(false)
	const [error, setError] = useState(false)
	const [errorMessage, setErrorMessage] = useState('')
	const [updateSave, setUpdateSave] = useState(false)
	const slideAnim = useRef(new Animated.Value(0)).current

	const { theme } = useTheme()

	const styles = makeStyles(theme)

	useEffect(() => {
		const keyboardWillShow = (e: KeyboardEvent) => {
			/* const keyboardHeight = e.endCoordinates.height */
			Animated.spring(slideAnim, {
				toValue: 1,
				useNativeDriver: true,
				tension: 65,
				friction: 10,
				velocity: 0.3,
			}).start()
		}

		const keyboardWillHide = () => {
			Animated.spring(slideAnim, {
				toValue: 0,
				useNativeDriver: true,
				tension: 65,
				friction: 10,
				velocity: 0.3,
			}).start()
		}

		const keyboardDidShow = Keyboard.addListener(
			Platform.OS === 'ios' ? 'keyboardWillShow' : 'keyboardDidShow',
			keyboardWillShow,
		)
		const keyboardDidHide = Keyboard.addListener(
			Platform.OS === 'ios' ? 'keyboardWillHide' : 'keyboardDidHide',
			keyboardWillHide,
		)

		return () => {
			keyboardDidShow.remove()
			keyboardDidHide.remove()
		}
	}, [slideAnim])

	const pickImage = async () => {
		try {
			const networkState = await NetInfo.fetch()
			if (
				!networkState.isConnected ||
				networkState.isInternetReachable === false
			) {
				throw new Error(
					'Verifique sua conexão com a internet e tente novamente',
				)
			}

			const result = await ImagePicker.launchImageLibraryAsync({
				mediaTypes: ['images'],
				allowsEditing: true,
				aspect: [1, 1],
				quality: 0.3,
			})

			if (!result.canceled && result.assets[0]) {
				try {
					if (!user) {
						throw new Error('User not initialized')
					}

					setIsLoading(true)

					const imageAsset = result.assets[0]
					const uri = imageAsset.uri

					const sessionToken = await session?.getToken()

					if (!sessionToken) {
						throw new Error('Token de sessão não disponível')
					}

					const formData = new FormData()
					formData.append('file', {
						uri: Platform.OS === 'android' ? uri : uri.replace('file://', ''),
						type: 'image/jpeg',
						name: `profile-${Date.now()}.jpg`,
					} as any)

					try {
						const networkState = await NetInfo.fetch()
						if (!networkState.isConnected) {
							throw new Error('Sem conexão com a internet')
						}

						await user.setProfileImage({
							file: formData.get('file'),
						})

						setProfileImage(imageAsset.uri)
						await user.reload()
						return
					} catch (uploadError: any) {
						if (uploadError?.message?.includes('clerk_key_invalid')) {
							throw uploadError
						}
					}
				} catch (error: any) {
					Alert.alert(
						'Erro',
						'Não foi possível selecionar a imagem. Tente novamente.',
					)
				}
			}
		} catch (error: any) {
			setError(true)
			setErrorMessage(error?.message || 'Não foi possível selecionar a imagem')
		}
	}

	const handleSave = async () => {
		if (isLoading) return
		setIsLoading(true)

		try {
			if (!user) {
				throw new Error('User not initialized')
			}

			const token = await session?.getToken()
			if (!token) {
				throw new Error('Authentication token not available')
			}

			const networkState = await NetInfo.fetch()
			if (!networkState.isConnected) {
				throw new Error('No internet connection')
			}

			await user.update({
				firstName: firstName,
				lastName: lastName,
			})

			setUpdateSave(true)
			setError(false)
			setErrorMessage('')
			return
		} catch (error: any) {
			setError(true)
			setErrorMessage(error?.message || 'Não foi possível atualizar o perfil')
			await new Promise(resolve => setTimeout(resolve, 1000))
		} finally {
			setIsLoading(false)
		}
	}

	const handleOk = () => {
		setUpdateSave(false)
		router.back()
	}

	return (
		<>
			<Stack.Screen
				options={{
					headerTitle: 'Editar Perfil',
					headerBackground: () => (
						<View
							style={{
								backgroundColor: theme.colors.backgroundHeader,
								height: '100%',
								width: '100%',
								borderBottomWidth: 0.5,
								borderBottomColor: theme.colors.border,
							}}
						/>
					),
				}}
			/>

			<TouchableWithoutFeedback
				style={{ flex: 1, backgroundColor: theme.colors.background }}
				onPress={Keyboard.dismiss}
			>
				<KeyboardAvoidingView
					behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
					style={{ flex: 1, backgroundColor: theme.colors.background }}
					keyboardVerticalOffset={Platform.OS === 'ios' ? 78 : 0}
				>
					<View style={{ flex: 1, backgroundColor: theme.colors.background }}>
						<ScrollView
							style={styles.scrollView}
							showsVerticalScrollIndicator={true}
							contentInsetAdjustmentBehavior="automatic"
							keyboardShouldPersistTaps="handled"
						>
							<View style={styles.container}>
								<View style={styles.headerContainer}>
									<View style={styles.imageContainer}>
										<Image
											style={styles.profileImage}
											resizeMode="cover"
											source={{ uri: profileImage }}
										/>

										<TouchableOpacity
											style={styles.editImageButton}
											onPress={pickImage}
										>
											<Ionicons name="camera" size={18} color="white" />
										</TouchableOpacity>
									</View>
									<Text style={styles.userName}>{user?.fullName}</Text>
									<Text style={styles.userEmail}>
										{user?.emailAddresses[0].emailAddress}
									</Text>
								</View>

								<View style={styles.formContainer}>
									<View style={styles.inputGroup}>
										<TextInput
											type="text"
											label="Nome"
											icon="person-outline"
											placeholder="Insira o seu nome"
											value={firstName}
											onChangeText={setFirstName}
										/>
									</View>

									<View style={styles.inputGroup}>
										<TextInput
											type="text"
											icon="person-outline"
											label="Sobrenome"
											placeholder="Insira o seu sobrenome"
											value={lastName}
											onChangeText={setLastName}
										/>
									</View>
								</View>
							</View>
						</ScrollView>
						<Animated.View
							style={[
								styles.saveButtonContainer,
								{
									transform: [
										{
											translateY: slideAnim.interpolate({
												inputRange: [0, 1],
												outputRange: [0, -20],
											}),
										},
									],
								},
							]}
						>
							<TouchableOpacity
								style={styles.saveButtonWrapper}
								onPress={handleSave}
								disabled={isLoading}
							>
								<Text style={styles.saveButton}>
									{isLoading ? 'Salvando...' : 'Salvar'}
								</Text>
							</TouchableOpacity>
						</Animated.View>
					</View>
				</KeyboardAvoidingView>
			</TouchableWithoutFeedback>

			<ModalMessage
				setShowLogoutModal={setUpdateSave}
				showLogoutModal={updateSave}
				modalIcon="checkmark-circle-outline"
				modalTitle="Sucesso!"
				modalText="Perfil atualizado com sucesso!"
				handleOk={handleOk}
				cancelButton={false}
			/>

			<ModalMessage
				setShowLogoutModal={setError}
				showLogoutModal={error}
				modalIcon="close-circle-outline"
				modalTitle="Erro!"
				modalText={errorMessage}
				handleOk={() => setError(false)}
				cancelButton={false}
			/>
		</>
	)
}

const makeStyles = (theme: Theme) =>
	StyleSheet.create({
		scrollView: {
			flex: 1,
			marginBottom: 30,
			backgroundColor: theme.colors.background,
		},
		container: {
			flex: 1,
			padding: 20,
			paddingBottom: 80,
			backgroundColor: theme.colors.background,
		},
		header: {
			flexDirection: 'row',
			justifyContent: 'space-between',
			alignItems: 'center',
			marginBottom: 30,
		},
		headerTitle: {
			fontSize: FontSize.lg,
			fontFamily: theme.fonts.bold.fontFamily,
		},
		saveButtonContainer: {
			position: 'absolute',
			bottom: 0,
			left: 0,
			right: 0,
			backgroundColor: theme.colors.background,
			padding: 12,
			borderTopWidth: 1,
			borderTopColor: theme.colors.card,
			//borderTopColor: '#eee',
		},
		headerContainer: {
			alignItems: 'center',
			paddingVertical: 20,
		},
		userName: {
			fontSize: FontSize.lg,
			marginBottom: 1,
			fontFamily: theme.fonts.bold.fontFamily,
		},
		saveButtonWrapper: {},
		userEmail: {
			fontSize: FontSize.sm,
			color: '#666',
			fontFamily: theme.fonts.regular.fontFamily,
		},
		saveButton: {
			color: theme.colors.background,
			fontSize: FontSize.sm,
			fontFamily: theme.fonts.medium.fontFamily,
		},
		imageContainer: {
			alignItems: 'center',
			marginBottom: 10,
			position: 'relative',
			width: 100,
			height: 100,
		},
		profileImage: {
			width: '100%',
			height: '100%',
			borderRadius: '100%',
			shadowColor: 'black',
			shadowOffset: { width: 0, height: 2 },
			shadowOpacity: 0.25,
			shadowRadius: 3.84,
			elevation: 5,
			borderWidth: 4,
			borderColor: theme.colors.primary,
		},
		editImageButton: {
			position: 'absolute',
			right: '1%',
			bottom: 0,
			backgroundColor: theme.colors.primary,
			width: 32,
			height: 32,
			borderRadius: 18,
			justifyContent: 'center',
			alignItems: 'center',
			borderWidth: 4,
			borderColor: theme.colors.background,
		},
		formContainer: {},
		inputGroup: {
			justifyContent: 'flex-start',
			textAlign: 'left',
		},
		label: {
			fontSize: FontSize.sm,
			fontFamily: theme.fonts.medium.fontFamily,
			color: '#666',
			textAlign: 'left',
			backgroundColor: 'red',
		},
		input: {
			borderWidth: 1,
			borderColor: '#ddd',
			borderRadius: 12,
			padding: 12,
			fontSize: FontSize.base,
			fontFamily: theme.fonts.regular.fontFamily,
		},
	})
