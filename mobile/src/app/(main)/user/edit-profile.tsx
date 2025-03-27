import {
	StyleSheet,
	Image,
	ScrollView,
	TouchableOpacity,
	TextInput,
	Alert,
	Platform,
} from 'react-native'
import { Text, View } from '@/src/components/Themed'
import { Ionicons } from '@expo/vector-icons'
import { useUser, useAuth, useSession } from '@clerk/clerk-expo'
import { fontFamily } from '@/src/constants/FontFamily'
import { FontSize } from '@/src/constants/FontSize'
import { useRouter } from 'expo-router'
import Colors from '@/src/constants/Colors'
import { useState } from 'react'
import NetInfo from '@react-native-community/netinfo'
import * as ImagePicker from 'expo-image-picker'

export default function EditProfileScreen() {
	const { user } = useUser()
	const { session } = useSession()
	const router = useRouter()
	const [firstName, setFirstName] = useState(user?.firstName || '')
	const [lastName, setLastName] = useState(user?.lastName || '')
	const [email, setEmail] = useState(user?.emailAddresses[0].emailAddress || '')
	const [profileImage, setProfileImage] = useState(user?.imageUrl)
	const [isLoading, setIsLoading] = useState(false)

	const pickImage = async () => {
		try {
			const networkState = await NetInfo.fetch()
			if (
				!networkState.isConnected ||
				networkState.isInternetReachable === false
			) {
				Alert.alert(
					'Erro de Conexão',
					'Verifique sua conexão com a internet e tente novamente.',
				)
				return
			}

			const result = await ImagePicker.launchImageLibraryAsync({
				mediaTypes: ImagePicker.MediaTypeOptions.Images,
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

					// Obter o token da sessão
					const sessionToken = await session?.getToken()

					if (!sessionToken) {
						throw new Error('Token de sessão não disponível')
					}

					// Preparar o FormData
					const formData = new FormData()
					formData.append('file', {
						uri: Platform.OS === 'android' ? uri : uri.replace('file://', ''),
						type: 'image/jpeg',
						name: `profile-${Date.now()}.jpg`,
					} as any)

					const maxRetries = 5
					let currentTry = 0
					let lastError = null

					while (currentTry < maxRetries) {
						try {
							const networkState = await NetInfo.fetch()
							if (!networkState.isConnected) {
								throw new Error('Sem conexão com a internet')
							}

							// Usando o SDK do Clerk diretamente com o token da sessão
							await user.setProfileImage({
								file: formData.get('file'),
							})

							
							setProfileImage(imageAsset.uri)
							await user.reload()
							Alert.alert('Sucesso', 'Imagem de perfil atualizada com sucesso!')
							router.back()
							return
						} catch (uploadError: any) {
							currentTry++
							lastError = uploadError
							console.error(`Tentativa ${currentTry} falhou:`, uploadError)

							// Se o erro for relacionado ao token, não tente novamente
							if (uploadError?.message?.includes('clerk_key_invalid')) {
								throw uploadError
							}

							if (currentTry < maxRetries) {
								const waitTime = Math.min(Math.pow(2, currentTry) * 1000, 10000)
								await new Promise(resolve => setTimeout(resolve, waitTime))
							}
						}
					}

					throw new Error(
						lastError?.message || 'Falha após múltiplas tentativas de upload',
					)
				} catch (error: any) {
					console.error('Erro detalhado:', error)
					Alert.alert(
						'Erro no Upload',
						'Não foi possível fazer upload da imagem. ' +
							(error?.message?.includes('clerk_key_invalid')
								? 'Erro de autenticação. Por favor, faça login novamente. '
								: error?.message?.includes('Network')
									? 'Verifique sua conexão com a internet. '
									: 'Ocorreu um erro inesperado. ') +
							'Tente novamente mais tarde.',
					)
				}
			}
		} catch (error) {
			console.error('Erro ao selecionar imagem:', error)
			Alert.alert(
				'Erro',
				'Não foi possível selecionar a imagem. Tente novamente.',
			)
		} finally {
			setIsLoading(false)
		}
	}

	const handleSave = async () => {
		if (isLoading) return

		setIsLoading(true)
		const maxRetries = 3
		let currentTry = 0

		while (currentTry < maxRetries) {
			try {
				if (!user) {
					throw new Error('User not initialized')
				}

				// Get the token from Clerk
				const token = await session?.getToken()
				if (!token) {
					throw new Error('Authentication token not available')
				}

				// Verificar conexão usando NetInfo
				const networkState = await NetInfo.fetch()
				if (!networkState.isConnected) {
					throw new Error('No internet connection')
				}

				await user.update({
					firstName: firstName,
					lastName: lastName,
				})

				Alert.alert('Sucesso', 'Perfil atualizado com sucesso!')
				router.back()
				return
			} catch (error: any) {
				currentTry++
				console.error(`Attempt ${currentTry} failed:`, error)
				console.error('Error details:', {
					message: error?.message,
					code: error?.code,
					stack: error?.stack,
				})

				if (currentTry === maxRetries) {
					const errorMessage =
						error?.message || 'Não foi possível atualizar o perfil'
					Alert.alert('Erro', `Erro ao atualizar perfil: ${errorMessage}`)
					break
				}

				await new Promise(resolve => setTimeout(resolve, 6000))
			}
		}
		setIsLoading(false)
	}

	return (
		<ScrollView
			style={styles.scrollView}
			showsVerticalScrollIndicator={false}
			contentInsetAdjustmentBehavior="automatic"
		>
			<View style={styles.container}>
				<View style={styles.header}>
					<TouchableOpacity onPress={() => router.back()}>
						<Ionicons name="arrow-back" size={24} />
					</TouchableOpacity>
					<Text style={styles.headerTitle}>Editar Perfil</Text>
					<TouchableOpacity onPress={handleSave} disabled={isLoading}>
						<Text style={styles.saveButton}>
							{isLoading ? 'Salvando...' : 'Salvar'}
						</Text>
					</TouchableOpacity>
				</View>

				<View style={styles.imageContainer}>
					<Image style={styles.profileImage} source={{ uri: profileImage }} />
					<TouchableOpacity style={styles.editImageButton} onPress={pickImage}>
						<Ionicons name="camera" size={18} color="white" />
					</TouchableOpacity>
				</View>

				<View style={styles.formContainer}>
					<View style={styles.inputGroup}>
						<Text style={styles.label}>Nome</Text>
						<TextInput
							style={styles.input}
							value={firstName}
							onChangeText={setFirstName}
							placeholder="Seu nome"
						/>
					</View>

					<View style={styles.inputGroup}>
						<Text style={styles.label}>Sobrenome</Text>
						<TextInput
							style={styles.input}
							value={lastName}
							onChangeText={setLastName}
							placeholder="Seu sobrenome"
						/>
					</View>

					<View style={styles.inputGroup}>
						<Text style={styles.label}>Email</Text>
						<TextInput
							style={[styles.input, styles.disabledInput]}
							value={email}
							editable={false}
						/>
					</View>
				</View>
			</View>
		</ScrollView>
	)
}

const styles = StyleSheet.create({
	scrollView: {
		flex: 1,
	},
	container: {
		flex: 1,
		padding: 20,
	},
	header: {
		flexDirection: 'row',
		justifyContent: 'space-between',
		alignItems: 'center',
		marginBottom: 30,
	},
	headerTitle: {
		fontSize: FontSize.lg,
		fontFamily: fontFamily.poppins.bold,
	},
	saveButton: {
		color: Colors.primary,
		fontSize: FontSize.base,
		fontFamily: fontFamily.poppins.medium,
	},
	imageContainer: {
		alignItems: 'center',
		marginBottom: 30,
		position: 'relative',
	},
	profileImage: {
		width: 120,
		height: 120,
		borderRadius: 60,
	},
	editImageButton: {
		position: 'absolute',
		right: '32%',
		bottom: 0,
		backgroundColor: Colors.primary,
		width: 36,
		height: 36,
		borderRadius: 18,
		justifyContent: 'center',
		alignItems: 'center',
		borderWidth: 2,
		borderColor: 'white',
	},
	formContainer: {
		gap: 20,
	},
	inputGroup: {
		gap: 8,
	},
	label: {
		fontSize: FontSize.sm,
		fontFamily: fontFamily.poppins.medium,
		color: '#666',
	},
	input: {
		borderWidth: 1,
		borderColor: '#ddd',
		borderRadius: 12,
		padding: 12,
		fontSize: FontSize.base,
		fontFamily: fontFamily.poppins.regular,
	},
	disabledInput: {
		backgroundColor: '#f5f5f5',
	},
})
