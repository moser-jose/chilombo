import { Ionicons } from '@expo/vector-icons'
import {
	Modal,
	View,
	StyleSheet,
	Text,
	TouchableOpacity,
	useColorScheme,
} from 'react-native'
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
	const theme = useColorScheme() ?? 'light'
	return (
		<Modal
			animationType="fade"
			transparent={true}
			visible={showLogoutModal}
			onRequestClose={() => setShowLogoutModal(false)}
		>
			<View style={styles(theme).modalOverlay}>
				<View style={styles(theme).modalContent}>
					<View style={styles(theme).modalIconContainer}>
						<Ionicons name={modalIcon} size={35} color={Colors[theme].colors.text} />
					</View>
					<Text style={styles(theme).modalTitle}>{modalTitle}</Text>
					{modalText && (
						<Text style={styles(theme).modalText}>{modalText}</Text>
					)}

					{children && children}

					<View style={styles(theme).modalButtons}>
						{cancelButton && (
							<TouchableOpacity
								style={[styles(theme).modalButton, styles(theme).cancelButton]}
								onPress={() => setShowLogoutModal(false)}
							>
								<Text
									style={[
										styles(theme).modalButtonText,
										styles(theme).cancelButtonText,
									]}
								>
									Cancelar
								</Text>
							</TouchableOpacity>
						)}
						<TouchableOpacity
							style={[styles(theme).modalButton, styles(theme).confirmButton]}
							onPress={handleOk}
						>
							<Text
								style={[
									styles(theme).modalButtonText,
									styles(theme).confirmButtonText,
								]}
							>
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

const styles = (theme: 'dark' | 'light') =>
	StyleSheet.create({
		modalOverlay: {
			flex: 1,
			backgroundColor: 'rgba(0, 0, 0, 0.6)',
			justifyContent: 'center',
			alignItems: 'center',
		},
		modalContent: {
			backgroundColor: Colors[theme].colors.modal,
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
			backgroundColor: Colors[theme].colors.textMuted,
			borderRadius: 40,
			justifyContent: 'center',
			alignItems: 'center',
			marginBottom: 20,
		},
		modalTitle: {
			fontSize: FontSize.base,
			fontFamily: fontFamily.poppins.bold,
			marginBottom: 15,
			color: Colors[theme].colors.text,
		},
		modalText: {
			fontSize: FontSize.sm,
			fontFamily: fontFamily.poppins.regular,
			marginBottom: 25,
			textAlign: 'center',
			color: Colors[theme].colors.text,
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
			backgroundColor: 'rgb(111, 102, 102)'
		},
		confirmButton: {
			backgroundColor: Colors.dark.colors.primary,
		},
		modalButtonText: {
			fontSize: FontSize.xsB,
			fontFamily: fontFamily.poppins.medium,
			textAlign: 'center',
		},
		cancelButtonText: {
			color: Colors.dark.colors.text,
		},
		confirmButtonText: {
			color: 'white',
		},
	})
