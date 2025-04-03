import { Ionicons } from '@expo/vector-icons'
import { Modal, View, StyleSheet, Text, TouchableOpacity } from 'react-native'
import Colors from '@/src/constants/Colors'
import { fontFamily } from '@/src/constants/FontFamily'
import { FontSize } from '@/src/constants/FontSize'

const ModalMessage = ({
	setShowLogoutModal,
	showLogoutModal,
	children,
	handleOk,
	modalTitle,
	modalText,
	modalIcon,
	textButton = 'OK',
	cancelButton,
}: {
	setShowLogoutModal: (show: boolean) => void
	showLogoutModal: boolean
	handleOk: () => void
	textButton?: string
	children?: React.ReactNode
	modalTitle: string
	modalText?: string
	modalIcon: keyof typeof Ionicons.glyphMap
	cancelButton?: boolean
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
					{modalText && <Text style={styles.modalText}>{modalText}</Text>}

					{children && children}

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
								{textButton}
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
