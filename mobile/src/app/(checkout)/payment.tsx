import React, { useCallback, useMemo, useState } from 'react'
import { ScrollView, StyleSheet, Alert } from 'react-native'
import { Ionicons } from '@expo/vector-icons'
import { Stack, useRouter } from 'expo-router'
import { Text, View, TouchableOpacity } from '@/src/components/Themed'
import { useCustomTheme } from '@/src/context/ThemeContext'
import { Theme } from '@/src/types/theme'
import StatusCheckout from '@/src/components/ui/StatusCheckout'
import { TextInput, FileInput } from '@/src/components/Themed'
import { useStateStore } from '@/src/store/store'
import { useShallow } from 'zustand/react/shallow'

interface PaymentMethod {
	id: string
	name: string
	icon: string
}

const paymentMethods: PaymentMethod[] = [
	{ id: 'card', name: 'Cartão de Crédito', icon: 'card-outline' },
	{ id: 'pix', name: 'PIX', icon: 'qr-code-outline' },
	{
		id: 'banc',
		name: 'Depósito ou Transferência Bancária',
		icon: 'business-outline',
	},
	{ id: 'express', name: 'Transferência Express', icon: 'flash-outline' },
	{ id: 'cash', name: 'Dinheiro', icon: 'cash' },
]

type FileType = 'image' | 'document'

export default function PaymentWithFile() {
	const router = useRouter()
	const { theme } = useCustomTheme()
	const styles = useStyles(theme as Theme)

	const [selectedMethod, setSelectedMethod] = useState<string>('')
	const [cardName, setCardName] = useState('')
	const [cardNumber, setCardNumber] = useState('')
	const [expiryDate, setExpiryDate] = useState('')
	const [cvv, setCvv] = useState('')
	const [selectedFileType, setSelectedFileType] = useState<FileType>('image')
	const { removeFileInput, setComprovante, comprovante } = useStateStore(
		useShallow(state => ({
			removeFileInput: state.removeFileInput,
			comprovante: state.comprovante,
			setComprovante: state.setComprovante,
		})),
	)

	const selectedMethodFunc = useCallback((method: string) => {
		setSelectedMethod(method)
		setComprovante(false)
	}, [])

	const handlePayment = () => {
		if (!selectedMethod) {
			Alert.alert('Erro', 'Selecione um método de pagamento')
			return
		}

		if (selectedMethod === 'banc' || selectedMethod === 'express') {
			if (!comprovante) {
				Alert.alert('Erro', 'É necessário anexar o comprovante de pagamento')
				return
			}
		}

		Alert.alert(
			'Pagamento Processado',
			'Seu pagamento foi processado com sucesso!',
			[
				{
					text: 'OK',
					onPress: () => router.push('/(main)'),
				},
			],
		)
	}

	const handleFileSelect = (file: any) => {
		setComprovante(file)
	}

	const handleFileError = (error: string) => {
		Alert.alert('Erro no Arquivo', error)
	}

	const getFileInputProps = () => {
		const baseProps = {
			label: 'Comprovante de Pagamento',
			placeholder: `Selecione o comprovante (${selectedFileType === 'image' ? 'imagem' : 'documento'})`,
			icon: (selectedFileType === 'image'
				? 'image-outline'
				: 'document-text-outline') as keyof typeof Ionicons.glyphMap,
			allowedTypes: [selectedFileType] as ('image' | 'document')[],
			maxSize: selectedFileType === 'image' ? 5 : 10,
			onFileSelect: handleFileSelect,
			onError: handleFileError,
		}

		return baseProps
	}

	return (
		<>
			<Stack.Screen
				options={{
					title: 'Pagamento',
					headerLeft: () => (
						<TouchableOpacity type="tertiary" onPress={() => router.back()}>
							<Ionicons
								name="chevron-back"
								size={24}
								color={theme.colors.text}
							/>
						</TouchableOpacity>
					),
				}}
			/>
			<View style={styles.container}>
				<View style={styles.statusContainer}>
					<StatusCheckout
						status="Endereço"
						styleText={styles.statusText}
						styleNumber={styles.statusText}
						colorIcon={theme.colors.primary}
						number={1}
					/>
					<Ionicons
						name="chevron-forward"
						size={20}
						color={theme.colors.border}
					/>
					<StatusCheckout
						status="Revisão"
						styleText={styles.statusText}
						styleNumber={styles.statusText}
						colorIcon={theme.colors.primary}
						number={2}
					/>
					<Ionicons
						name="chevron-forward"
						size={20}
						color={theme.colors.border}
					/>
					<StatusCheckout
						status="Pagamento"
						colorIcon={theme.colors.primary}
						number={3}
					/>
				</View>

				<ScrollView style={styles.content}>
					<View style={styles.methodsContainer}>
						{paymentMethods.map(method => (
							<TouchableOpacity
								key={method.id}
								style={[
									styles.methodCard,
									selectedMethod === method.id && styles.selectedMethod,
								]}
								onPress={() => selectedMethodFunc(method.id)}
							>
								<Ionicons
									name={method.icon as any}
									size={24}
									color={theme.colors.colorIconInput}
								/>
								<Text style={styles.methodName}>{method.name}</Text>
							</TouchableOpacity>
						))}
					</View>

					{selectedMethod === 'card' ? (
						<View style={styles.cardForm}>
							<Text style={styles.sectionTitle}>Dados do Cartão</Text>

							<TextInput
								type="text"
								placeholder="Nome do titular"
								value={cardName}
								onChangeText={setCardName}
								icon="person-outline"
							/>
							<TextInput
								type="text"
								placeholder="Número do cartão"
								value={cardNumber}
								onChangeText={setCardNumber}
								icon="card-outline"
							/>
							<View style={styles.row}>
								<View style={styles.halfInput}>
									<TextInput
										type="text"
										placeholder="Validade (MM/AA)"
										value={expiryDate}
										onChangeText={setExpiryDate}
										icon="calendar-outline"
									/>
								</View>
								<View style={styles.halfInput}>
									<TextInput
										type="text"
										placeholder="CVV"
										value={cvv}
										onChangeText={setCvv}
										icon="shield-outline"
									/>
								</View>
							</View>
						</View>
					) : selectedMethod === 'banc' || selectedMethod === 'express' ? (
						<View style={styles.transferForm}>
							<Text style={styles.sectionTitle}>Dados da Transferência</Text>

							<View style={styles.bankInfo}>
								<Text style={styles.bankTitle}>Dados Bancários:</Text>
								<Text style={styles.bankText}>Banco: Banco BAI</Text>
								<Text style={styles.bankText}>Conta: 123456022</Text>
								<Text style={styles.bankText}>
									IBAN: AO06.0000.0040.0000.0000.022
								</Text>
								<Text style={styles.bankText}>
									Titular: Empresa Chilombo LTDA
								</Text>
								<Text style={styles.bankText}>NIF: 123456789989</Text>
							</View>

							<Text style={styles.uploadTitle}>
								Envie o comprovante de transferência:
							</Text>

							<View style={styles.fileTypeContainer}>
								<Text style={styles.fileTypeLabel}>Tipo de arquivo:</Text>
								<View style={styles.fileTypeOptions}>
									<TouchableOpacity
										style={[
											styles.fileTypeOption,
											selectedFileType === 'image' && styles.selectedFileType,
										]}
										onPress={() => setSelectedFileType('image')}
									>
										<Ionicons
											name="image-outline"
											size={20}
											color={
												selectedFileType === 'image'
													? theme.colors.primary
													: theme.colors.colorIconInput
											}
										/>
										<Text
											style={[
												styles.fileTypeText,
												selectedFileType === 'image' &&
													styles.selectedFileTypeText,
											]}
										>
											Imagem
										</Text>
									</TouchableOpacity>
									<TouchableOpacity
										style={[
											styles.fileTypeOption,
											selectedFileType === 'document' &&
												styles.selectedFileType,
										]}
										onPress={() => setSelectedFileType('document')}
									>
										<Ionicons
											name="document-text-outline"
											size={20}
											color={
												selectedFileType === 'document'
													? theme.colors.primary
													: theme.colors.colorIconInput
											}
										/>
										<Text
											style={[
												styles.fileTypeText,
												selectedFileType === 'document' &&
													styles.selectedFileTypeText,
											]}
										>
											Documento (pdf)
										</Text>
									</TouchableOpacity>
								</View>
							</View>

							<FileInput {...getFileInputProps()} />

							{comprovante && removeFileInput && (
								<View style={styles.fileInfo}>
									<Text style={styles.fileInfoTitle}>
										✅ Comprovante anexado:
									</Text>
									<View style={styles.fileInfoTextContainer}>
										<Text style={styles.fileInfoText}>
											{comprovante.name} |{' '}
										</Text>
										<Text style={styles.fileInfoText}>
											Tamanho: {(comprovante.size / 1024 / 1024).toFixed(2)} MB
										</Text>
									</View>
								</View>
							)}

							<Text style={styles.infoText}>
								<Text style={styles.infoTextBold}>OBS:</Text> A confirmação do
								pagamento será feita até um dia util após o pagamento.
							</Text>
						</View>
					) : selectedMethod === 'pix' ? (
						<View style={styles.pixContainer}>
							<Text style={styles.sectionTitle}>Pagamento via PIX</Text>
							<View style={styles.qrCodePlaceholder}>
								<Ionicons name="qr-code" size={100} color="#4CAF50" />
							</View>
							<Text style={styles.pixInstructions}>
								Escaneie o QR Code ou copie o código PIX abaixo
							</Text>
							<Text style={styles.pixCode}>
								00020126580014BR.GOV.BCB.PIX0136...
							</Text>

							<Text style={styles.uploadTitle}>
								Após o pagamento, envie o comprovante:
							</Text>

							<View style={styles.fileTypeContainer}>
								<Text style={styles.fileTypeLabel}>Tipo de arquivo:</Text>
								<View style={styles.fileTypeOptions}>
									<TouchableOpacity
										style={[
											styles.fileTypeOption,
											selectedFileType === 'image' && styles.selectedFileType,
										]}
										onPress={() => setSelectedFileType('image')}
									>
										<Ionicons
											name="image-outline"
											size={20}
											color={
												selectedFileType === 'image'
													? theme.colors.primary
													: theme.colors.colorIconInput
											}
										/>
										<Text
											style={[
												styles.fileTypeText,
												selectedFileType === 'image' &&
													styles.selectedFileTypeText,
											]}
										>
											Imagem
										</Text>
									</TouchableOpacity>
									<TouchableOpacity
										style={[
											styles.fileTypeOption,
											selectedFileType === 'document' &&
												styles.selectedFileType,
										]}
										onPress={() => setSelectedFileType('document')}
									>
										<Ionicons
											name="document-text-outline"
											size={20}
											color={
												selectedFileType === 'document'
													? theme.colors.primary
													: theme.colors.colorIconInput
											}
										/>
										<Text
											style={[
												styles.fileTypeText,
												selectedFileType === 'document' &&
													styles.selectedFileTypeText,
											]}
										>
											Documento (pdf)
										</Text>
									</TouchableOpacity>
								</View>
							</View>

							{/* <FileInput {...getFileInputProps()} /> */}
						</View>
					) : null}
				</ScrollView>

				<TouchableOpacity
					style={[
						styles.button,
						(!selectedMethod ||
							((selectedMethod === 'banc' ||
								selectedMethod === 'express' ||
								selectedMethod === 'pix') &&
								!removeFileInput &&
								!comprovante)) &&
							styles.buttonDisabled,
					]}
					onPress={handlePayment}
					disabled={
						!selectedMethod ||
						((selectedMethod === 'banc' ||
							selectedMethod === 'express' ||
							selectedMethod === 'pix') &&
							!removeFileInput &&
							!comprovante)
					}
				>
					<Text style={styles.buttonText}>Finalizar Compra</Text>
				</TouchableOpacity>
			</View>
		</>
	)
}

const useStyles = (theme: Theme) =>
	StyleSheet.create({
		statusContainer: {
			marginTop: 10,
			backgroundColor: theme.colors.card,
			borderRadius: 12,
			paddingHorizontal: 10,
			paddingVertical: 16,
			borderWidth: 1,
			borderColor: theme.colors.border,
			flexDirection: 'row',
			justifyContent: 'space-between',
			alignItems: 'center',
			width: '100%',
			marginBottom: 20,
		},
		container: {
			flex: 1,
			padding: 16,
			backgroundColor: theme.colors.background,
		},
		content: {
			flex: 1,
			backgroundColor: theme.colors.background,
		},
		methodsContainer: {
			marginBottom: 20,
		},
		methodCard: {
			flexDirection: 'row',
			alignItems: 'center',
			justifyContent: 'flex-start',
			padding: 10,
			borderWidth: 1,
			borderColor: theme.colors.border,
			borderRadius: 8,
			marginBottom: 12,
			backgroundColor: theme.colors.card,
		},
		selectedMethod: {
			borderColor: theme.colors.primary,
			borderWidth: 2,
			backgroundColor: theme.colors.primary + '10',
		},
		infoText: {
			marginTop: 15,
			marginHorizontal: 20,
			fontSize: theme.size.xs,
			fontFamily: theme.fonts.regular.fontFamily,
			color: theme.colors.primary,
			textAlign: 'center',
		},
		infoTextBold: {
			fontFamily: theme.fonts.bold.fontFamily,
			color: theme.colors.primary,
		},
		methodName: {
			marginLeft: 12,
			padding: 4,
			fontSize: theme.size.xsB,
			fontFamily: theme.fonts.regular.fontFamily,
			color: theme.colors.text,
		},
		sectionTitle: {
			fontSize: theme.size.smB,
			fontFamily: theme.fonts.bold.fontFamily,
			color: theme.colors.text,
			marginBottom: 16,
		},
		cardForm: {
			marginBottom: 20,
		},
		transferForm: {
			marginBottom: 20,
		},
		row: {
			flexDirection: 'row',
			justifyContent: 'space-between',
		},
		halfInput: {
			width: '48%',
		},
		bankInfo: {
			backgroundColor: theme.colors.card,
			padding: 16,
			borderRadius: 8,
			marginBottom: 20,
			borderWidth: 1,
			borderColor: theme.colors.border,
		},
		bankTitle: {
			fontSize: theme.size.sm,
			fontFamily: theme.fonts.bold.fontFamily,
			color: theme.colors.text,
			marginBottom: 8,
		},
		statusText: {
			color: theme.colors.primary,
		},
		bankText: {
			fontSize: theme.size.xs,
			fontFamily: theme.fonts.regular.fontFamily,
			color: theme.colors.text,
			marginBottom: 4,
		},
		uploadTitle: {
			fontSize: theme.size.sm,
			fontFamily: theme.fonts.medium.fontFamily,
			color: theme.colors.text,
			marginBottom: 12,
			marginTop: 16,
		},
		fileTypeContainer: {
			marginBottom: 16,
		},
		fileTypeLabel: {
			fontSize: theme.size.sm,
			fontFamily: theme.fonts.medium.fontFamily,
			color: theme.colors.text,
			marginBottom: 8,
		},
		fileTypeOptions: {
			flexDirection: 'row',
			gap: 12,
		},
		fileTypeOption: {
			flex: 1,
			flexDirection: 'row',
			alignItems: 'center',
			justifyContent: 'center',
			padding: 12,
			borderWidth: 1,
			borderColor: theme.colors.border,
			borderRadius: 8,
			backgroundColor: theme.colors.card,
		},
		selectedFileType: {
			borderColor: theme.colors.primary,
			borderWidth: 2,
			backgroundColor: theme.colors.primary + '10',
		},
		fileTypeText: {
			marginLeft: 8,
			fontSize: theme.size.xsB,
			fontFamily: theme.fonts.medium.fontFamily,
			color: theme.colors.text,
		},
		selectedFileTypeText: {
			color: theme.colors.primary,
		},
		fileInfo: {
			backgroundColor: theme.colors.card,
			padding: 12,
			borderRadius: 8,
			marginTop: 8,
			borderWidth: 1,
			borderColor: theme.colors.primary,
		},
		fileInfoTitle: {
			fontSize: theme.size.xs,
			fontFamily: theme.fonts.medium.fontFamily,
			color: theme.colors.primary,
			marginBottom: 4,
		},
		fileInfoText: {
			fontSize: theme.size.xs,
			fontFamily: theme.fonts.regular.fontFamily,
			color: theme.colors.text,
			marginBottom: 2,
		},
		pixContainer: {
			alignItems: 'center',
			marginBottom: 20,
		},
		qrCodePlaceholder: {
			width: 200,
			height: 200,
			backgroundColor: '#f5f5f5',
			borderRadius: 8,
			justifyContent: 'center',
			alignItems: 'center',
			marginBottom: 16,
		},
		pixInstructions: {
			fontSize: 16,
			textAlign: 'center',
			marginBottom: 12,
			fontFamily: theme.fonts.regular.fontFamily,
			color: theme.colors.text,
		},
		pixCode: {
			fontSize: 14,
			color: theme.colors.colorIconInput,
			textAlign: 'center',
			fontFamily: theme.fonts.regular.fontFamily,
		},
		button: {
			backgroundColor: theme.colors.primary,
			borderRadius: 12,
			paddingVertical: 12,
			marginVertical: 16,
		},
		buttonText: {
			color: '#fff',
			fontSize: theme.size.xsB,
			fontFamily: theme.fonts.medium.fontFamily,
			textAlign: 'center',
		},
		buttonDisabled: {
			backgroundColor: theme.colors.disabled,
		},
		fileInfoTextContainer: {
			flexDirection: 'row',
			alignItems: 'center',
			backgroundColor: 'transparent',
		},
	})
