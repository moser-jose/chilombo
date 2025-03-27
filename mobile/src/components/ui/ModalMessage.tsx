import { Ionicons } from '@expo/vector-icons'
import { Children, useState } from 'react'
import { Modal, View, StyleSheet, Text, TouchableOpacity } from 'react-native'
import Colors from '@/src/constants/Colors'
import { fontFamily } from '@/src/constants/FontFamily'
import { FontSize } from '@/src/constants/FontSize'

const ModalMessage = ({
	setShowLogoutModal,
	showLogoutModal,
	handleOk,
	modalTitle,
	modalText,
	modalIcon,
	cancelButton,
}: {
	setShowLogoutModal: (show: boolean) => void
	showLogoutModal: boolean
	handleOk: () => void
	modalTitle: string
	modalText: string
	modalIcon: keyof typeof Ionicons.glyphMap
	cancelButton: boolean
}) => {
	return (
		<Modal
			animationType="fade"
			transparent={true}
			visible={showLogoutModal}
			onRequestClose={() => setShowLogoutModal(false)}
		>
			<View style={styles.modalOverlay}>
				<View style={styles.modalContent}>
					<View style={styles.modalIconContainer}>
						<Ionicons name={modalIcon} size={35} color={Colors.primary} />
					</View>
					<Text style={styles.modalTitle}>{modalTitle}</Text>
					<Text style={styles.modalText}>{modalText}</Text>

					<View style={styles.modalButtons}>
						{cancelButton && (
							<TouchableOpacity
								style={[styles.modalButton, styles.cancelButton]}
								onPress={() => setShowLogoutModal(false)}
							>
								<Text style={[styles.modalButtonText, styles.cancelButtonText]}>
									Cancelar
								</Text>
							</TouchableOpacity>
						)}
						<TouchableOpacity
							style={[styles.modalButton, styles.confirmButton]}
							onPress={handleOk}
						>
							<Text style={[styles.modalButtonText, styles.confirmButtonText]}>
								OK
							</Text>
						</TouchableOpacity>
					</View>
				</View>
			</View>
		</Modal>
	)
}

export default ModalMessage

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
