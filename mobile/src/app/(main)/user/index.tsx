import {
	StyleSheet,
	Image,
	ScrollView,
	TouchableOpacity,
	Modal,
	Alert,
} from 'react-native'
import * as Linking from 'expo-linking'
import { Text, View } from '@/src/components/Themed'
import { Ionicons } from '@expo/vector-icons'
import { useAuth, useClerk, useUser } from '@clerk/clerk-expo'
import { fontFamily } from '@/src/constants/FontFamily'
import { FontSize } from '@/src/constants/FontSize'
import { Link, Stack, useRouter } from 'expo-router'
import Colors from '@/src/constants/Colors'
import { useState } from 'react'

export default function UserScreen() {
	const { user } = useUser()
	const { signOut } = useClerk()
	const [showLogoutModal, setShowLogoutModal] = useState(false)
	const router = useRouter()

	const handleSignOut = async () => {
		try {
			await signOut()
			Linking.openURL(Linking.createURL('/'))
		} catch (err) {
			console.error(JSON.stringify(err, null, 2))
		}
	}

	return (
		<>
			<ScrollView
				style={styles.scrollView}
				showsVerticalScrollIndicator={false}
				contentInsetAdjustmentBehavior="automatic"
			>
				<View style={styles.container}>
					<View style={styles.headerContainer}>
						<View style={styles.imageContainer}>
							<Image
								style={styles.profileImage}
								source={{ uri: user?.imageUrl }}
							/>
							<TouchableOpacity style={styles.editImageButton}>
								<Ionicons name="camera" size={18} color="white" />
							</TouchableOpacity>
						</View>
						<Text style={styles.userName}>{user?.fullName}</Text>
						<Text style={styles.userEmail}>
							{user?.emailAddresses[0].emailAddress}
						</Text>
					</View>

					<View
						style={styles.separator}
						lightColor="#eee"
						darkColor="rgba(255,255,255,0.1)"
					/>

					<View style={styles.menuContainer}>
						<TouchableOpacity
							style={styles.menuItem}
							onPress={() => router.push('/user/edit-profile')}
						>
							<View style={styles.menuLeftContent}>
								<Ionicons name="person-outline" size={24} />
								<Text style={styles.menuText}>Editar Perfil</Text>
							</View>
							<Ionicons name="chevron-forward-outline" size={24} color="#ccc" />
						</TouchableOpacity>

						<TouchableOpacity style={styles.menuItem}>
							<View style={styles.menuLeftContent}>
								<Ionicons name="settings-outline" size={24} />
								<Text style={styles.menuText}>Configurações</Text>
							</View>
							<Ionicons name="chevron-forward-outline" size={24} color="#ccc" />
						</TouchableOpacity>

						<TouchableOpacity style={styles.menuItem}>
							<View style={styles.menuLeftContent}>
								<Ionicons name="notifications-outline" size={24} />
								<Text style={styles.menuText}>Notificações</Text>
							</View>
							<Ionicons name="chevron-forward-outline" size={24} color="#ccc" />
						</TouchableOpacity>

						<TouchableOpacity style={styles.menuItem}>
							<View style={styles.menuLeftContent}>
								<Ionicons name="shield-checkmark-outline" size={24} />
								<Text style={styles.menuText}>Segurança e Privacidade</Text>
							</View>
							<Ionicons name="chevron-forward-outline" size={24} color="#ccc" />
						</TouchableOpacity>

						<TouchableOpacity style={styles.menuItem}>
							<View style={styles.menuLeftContent}>
								<Ionicons name="wallet-outline" size={24} />
								<Text style={styles.menuText}>Pagamentos</Text>
							</View>
							<Ionicons name="chevron-forward-outline" size={24} color="#ccc" />
						</TouchableOpacity>

						<TouchableOpacity style={styles.menuItem}>
							<View style={styles.menuLeftContent}>
								<Ionicons name="help-circle-outline" size={24} />
								<Text style={styles.menuText}>Ajuda</Text>
							</View>
							<Ionicons name="chevron-forward-outline" size={24} color="#ccc" />
						</TouchableOpacity>

						<TouchableOpacity style={styles.menuItem}>
							<View style={styles.menuLeftContent}>
								<Ionicons name="share-social-outline" size={24} />
								<Text style={styles.menuText}>Compartilhar</Text>
							</View>
						</TouchableOpacity>

						<TouchableOpacity style={styles.menuItem}>
							<View style={styles.menuLeftContent}>
								<Ionicons name="star-outline" size={24} />
								<Text style={styles.menuText}>Avalie o App</Text>
							</View>
						</TouchableOpacity>

						<TouchableOpacity
							onPress={() => router.push('/user/privacity')}
							style={styles.menuItem}
						>
							<View style={styles.menuLeftContent}>
								<Ionicons name="lock-closed-outline" size={24} />
								<Text style={styles.menuText}>Política de Privacidade</Text>
							</View>
							<Ionicons name="chevron-forward-outline" size={24} color="#ccc" />
						</TouchableOpacity>

						<TouchableOpacity
							onPress={() => router.push('/user/terms')}
							style={styles.menuItem}
						>
							<View style={styles.menuLeftContent}>
								<Ionicons name="document-text-outline" size={24} />
								<Text style={styles.menuText}>Termos de Uso</Text>
							</View>
							<Ionicons name="chevron-forward-outline" size={24} color="#ccc" />
						</TouchableOpacity>

						<TouchableOpacity
							style={styles.menuItem}
							onPress={() => setShowLogoutModal(true)}
						>
							<View style={styles.menuLeftContent}>
								<Ionicons
									name="log-out-outline"
									size={24}
									color={Colors.secondary}
								/>
								<Text style={[styles.menuText, styles.logoutText]}>Sair</Text>
							</View>
						</TouchableOpacity>
					</View>
				</View>
			</ScrollView>

			<Modal
				animationType="fade"
				transparent={true}
				visible={showLogoutModal}
				onRequestClose={() => setShowLogoutModal(false)}
			>
				<View style={styles.modalOverlay}>
					<View style={styles.modalContent}>
						<View style={styles.modalIconContainer}>
							<Ionicons
								name="log-out-outline"
								size={35}
								color={Colors.primary}
							/>
						</View>
						<Text style={styles.modalTitle}>Sair do App</Text>
						<Text style={styles.modalText}>
							Tem certeza que deseja encerrar sua sessão?
						</Text>

						<View style={styles.modalButtons}>
							<TouchableOpacity
								style={[styles.modalButton, styles.cancelButton]}
								onPress={() => setShowLogoutModal(false)}
							>
								<Text style={[styles.modalButtonText, styles.cancelButtonText]}>
									Cancelar
								</Text>
							</TouchableOpacity>

							<TouchableOpacity
								style={[styles.modalButton, styles.confirmButton]}
								onPress={() => {
									setShowLogoutModal(false)
									handleSignOut()
								}}
							>
								<Text
									style={[styles.modalButtonText, styles.confirmButtonText]}
								>
									Sair
								</Text>
							</TouchableOpacity>
						</View>
					</View>
				</View>
			</Modal>
		</>
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
	headerContainer: {
		alignItems: 'center',
		paddingVertical: 20,
	},
	imageContainer: {
		position: 'relative',
		marginBottom: 15,
	},
	profileImage: {
		width: 90,
		height: 90,
		borderRadius: 60,
	},
	editImageButton: {
		position: 'absolute',
		right: 0,
		bottom: 0,
		backgroundColor: '#007AFF',
		width: 32,
		height: 32,
		borderRadius: 18,
		justifyContent: 'center',
		alignItems: 'center',
		borderWidth: 2,
		borderColor: 'white',
	},
	userName: {
		fontSize: FontSize.lg,
		marginBottom: 1,
		fontFamily: fontFamily.poppins.bold,
	},
	userEmail: {
		fontSize: FontSize.sm,
		color: '#666',
		fontFamily: fontFamily.poppins.regular,
	},
	separator: {
		marginTop: 10,
		height: 1,
		width: '100%',
	},
	menuContainer: {
		marginTop: 10,
	},
	menuItem: {
		flexDirection: 'row',
		alignItems: 'center',
		paddingVertical: 15,
		borderBottomWidth: 1,
		borderBottomColor: '#eee',
		justifyContent: 'space-between',
	},
	menuLeftContent: {
		flexDirection: 'row',
		alignItems: 'center',
	},
	menuText: {
		fontSize: 16,
		marginLeft: 15,
		fontFamily: fontFamily.poppins.regular,
	},
	logoutText: {
		color: Colors.secondary,
		fontFamily: fontFamily.poppins.medium,
	},
	modalOverlay: {
		flex: 1,
		backgroundColor: 'rgba(0, 0, 0, 0.6)',
		justifyContent: 'center',
		alignItems: 'center',
	},
	modalContent: {
		backgroundColor: 'white',
		borderRadius: 25,
		padding: 25,
		width: '85%',
		alignItems: 'center',
		shadowColor: '#000',
		shadowOffset: {
			width: 0,
			height: 2,
		},
		shadowOpacity: 0.25,
		shadowRadius: 4,
		elevation: 5,
	},
	modalIconContainer: {
		width: 70,
		height: 70,
		backgroundColor: Colors.primary + '15',
		borderRadius: 40,
		justifyContent: 'center',
		alignItems: 'center',
		marginBottom: 20,
	},
	modalTitle: {
		fontSize: FontSize.base,
		fontFamily: fontFamily.poppins.bold,
		marginBottom: 15,
		color: Colors.primary,
	},
	modalText: {
		fontSize: FontSize.sm,
		fontFamily: fontFamily.poppins.regular,
		marginBottom: 25,
		textAlign: 'center',
		color: '#666',
		paddingHorizontal: 10,
	},
	modalButtons: {
		flexDirection: 'row',
		justifyContent: 'space-between',
		width: '100%',
		gap: 15,
	},
	modalButton: {
		flex: 1,
		paddingVertical: 10,
		borderRadius: 14.67,
		elevation: 2,
		shadowColor: '#000',
		shadowOffset: {
			width: 0,
			height: 1,
		},
		shadowOpacity: 0.2,
		shadowRadius: 0.41,
	},
	cancelButton: {
		backgroundColor: '#f5f5f5',
		borderWidth: 1,
		borderColor: '#e5e5e5',
	},
	confirmButton: {
		backgroundColor: Colors.secondary,
	},
	modalButtonText: {
		fontSize: FontSize.xsB,
		fontFamily: fontFamily.poppins.medium,
		textAlign: 'center',
	},
	cancelButtonText: {
		color: '#666',
	},
	confirmButtonText: {
		color: 'white',
	},
})
