import {
    StyleSheet,
    Image,
    ScrollView,
    TouchableOpacity
} from 'react-native'
import * as Linking from 'expo-linking'
import { Text, View } from '@/src/components/Themed'
import { Ionicons } from '@expo/vector-icons'
import { useClerk, useUser } from '@clerk/clerk-expo'
import { fontFamily } from '@/src/constants/FontFamily'
import { FontSize } from '@/src/constants/FontSize'
import { Tabs, useRouter } from 'expo-router'
import Colors from '@/src/constants/Colors'
import { useState } from 'react'
import ModalMessage from '@/src/components/ui/ModalMessage'

export default function SettingsScreen() {
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
					

					<View
						style={styles.separator}
						lightColor="#eee"
						darkColor="rgba(255,255,255,0.1)"
					/>

					<View style={styles.menuContainer}>
						

						

					<TouchableOpacity style={styles.menuItem}>
							<View style={styles.menuLeftContent}>
								<Ionicons name="sunny-outline" size={24} />
								<Text style={styles.menuText}>Aparência</Text>
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

			<ModalMessage
				setShowLogoutModal={setShowLogoutModal}
				showLogoutModal={showLogoutModal}
				modalIcon="log-out-outline"
				modalTitle="Sair do App"
				modalText="Tem certeza que deseja sair do app?"
				cancelButton={true}
				handleOk={handleSignOut}
			/>
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
