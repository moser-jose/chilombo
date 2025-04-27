import { Ionicons } from '@expo/vector-icons'
import {
	Modal,
	View,
	StyleSheet,
	Text,
	TouchableOpacity
} from 'react-native'
import { useCustomTheme } from '@/src/context/ThemeContext'
import { Theme } from '@/src/types/theme'

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
	const { theme } = useCustomTheme()
	const styles = makeStyles(theme)
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
						<Ionicons name={modalIcon} size={35} color={theme.colors.text} />
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

const makeStyles = (theme: Theme) =>
	StyleSheet.create({
		modalOverlay: {
			flex: 1,
			backgroundColor: 'rgba(0, 0, 0, 0.6)',
			justifyContent: 'center',
			alignItems: 'center',
		},
		modalContent: {
			backgroundColor: theme.colors.modal, //Colors[theme].colors.modal,
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
			backgroundColor: theme.colors.textMuted, //Colors[theme].colors.textMuted,
			borderRadius: 40,
			justifyContent: 'center',
			alignItems: 'center',
			marginBottom: 20,
		},
		modalTitle: {
			fontSize:theme.size.base,
			fontFamily: theme.fonts.bold.fontFamily,
			marginBottom: 15,
			color: theme.colors.text, //Colors[theme].colors.text,
		},
		modalText: {
			fontSize:theme.size.sm,
			fontFamily: theme.fonts.regular.fontFamily,
			marginBottom: 25,
			textAlign: 'center',
			color: theme.colors.text, //Colors[theme].colors.text,
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
			backgroundColor: theme.colors.cancelButton,
		},
		confirmButton: {
			backgroundColor: theme.colors.primary,
		},
		modalButtonText: {
			fontSize:theme.size.xsB,
			fontFamily: theme.fonts.medium.fontFamily,
			textAlign: 'center',
		},
		cancelButtonText: {
			color: theme.colors.text,
		},
		confirmButtonText: {
			color: 'white',
		},
	})
