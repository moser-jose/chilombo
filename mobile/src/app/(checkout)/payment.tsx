import React, { useState } from 'react'
import { View, Text, StyleSheet, ScrollView, TextInput } from 'react-native'
import { useCheckout } from '../../context/CheckoutContext'
import { Ionicons } from '@expo/vector-icons'
import { useCustomTheme } from '@/src/context/ThemeContext'
import { Theme } from '@/src/types/theme'
import StatusCheckout from '@/src/components/front/StatusCheckout'
import { Stack } from 'expo-router'
import { router } from 'expo-router'
import { TouchableOpacity } from '@/src/components/ui/TouchableOpacity'
interface PaymentMethod {
	id: string
	name: string
	icon: string
}

const paymentMethods: PaymentMethod[] = [
	{ id: 'credit', name: 'Cartão de Crédito', icon: 'card' },
	{ id: 'debit', name: 'Cartão de Débito', icon: 'card' },
	{ id: 'pix', name: 'PIX', icon: 'qr-code' },
]

export default function Payment() {
	const { payment, setPayment } = useCheckout()
	const [selectedMethod, setSelectedMethod] = useState<string | null>(null)
	const [cardNumber, setCardNumber] = useState('')
	const [cardName, setCardName] = useState('')
	const [expiryDate, setExpiryDate] = useState('')
	const [cvv, setCvv] = useState('')
	const { theme } = useCustomTheme()
	const styles = useStyles(theme)

	const handlePayment = () => {
		// Here you would typically validate the payment details
		// and process the payment through your payment gateway
		setPayment({
			method: selectedMethod!,
			details: {
				cardNumber,
				cardName,
				expiryDate,
				cvv,
			},
		})
		// Navigate to success screen or handle payment result
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
						styleText={styles.statusText}
						styleNumber={styles.statusText}
						status="Endereço"
						colorIcon={theme.colors.primary}
						number={1}
					/>
					<Ionicons
						name="chevron-forward-outline"
						size={16}
						color={theme.colors.border}
					/>
					<StatusCheckout
						styleText={styles.statusText}
						styleNumber={styles.statusText}
						status="Resumo"
						colorIcon={theme.colors.border}
						number={2}
					/>
					<Ionicons
						name="chevron-forward-outline"
						size={16}
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
								onPress={() => setSelectedMethod(method.id)}
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

					{selectedMethod === 'credit' || selectedMethod === 'debit' ? (
						<View style={styles.cardForm}>
							<Text style={styles.sectionTitle}>Dados do Cartão</Text>
							<TextInput
								style={styles.input}
								placeholder="Número do Cartão"
								value={cardNumber}
								onChangeText={setCardNumber}
								keyboardType="numeric"
							/>
							<TextInput
								style={styles.input}
								placeholder="Nome no Cartão"
								value={cardName}
								onChangeText={setCardName}
							/>
							<View style={styles.row}>
								<TextInput
									style={[styles.input, styles.halfInput]}
									placeholder="Validade (MM/AA)"
									value={expiryDate}
									onChangeText={setExpiryDate}
								/>
								<TextInput
									style={[styles.input, styles.halfInput]}
									placeholder="CVV"
									value={cvv}
									onChangeText={setCvv}
									keyboardType="numeric"
									secureTextEntry
								/>
							</View>
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
						</View>
					) : null}
				</ScrollView>

				<TouchableOpacity
					style={[styles.button, !selectedMethod && styles.buttonDisabled]}
					onPress={handlePayment}
					disabled={!selectedMethod}
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
		statusText: {
			color: theme.colors.primary,
		},
		content: {
			flex: 1,
			backgroundColor: theme.colors.background,
		},
		methodsContainer: {
			marginBottom: 24,
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
			marginBottom: 24,
		},
		input: {
			borderWidth: 1,
			borderColor: theme.colors.border,
			borderRadius: 8,
			padding: 12,
			marginBottom: 12,
			fontSize: theme.size.sm,
			fontFamily: theme.fonts.regular.fontFamily,
			color: theme.colors.text,
		},
		row: {
			flexDirection: 'row',
			justifyContent: 'space-between',
		},
		halfInput: {
			width: '48%',
		},
		pixContainer: {
			alignItems: 'center',
			marginBottom: 24,
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
		},
		pixCode: {
			fontSize: 14,
			color: '#666',
			textAlign: 'center',
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
			marginRight: 8,
		},
		buttonDisabled: {
			backgroundColor: '#ccc',
		},
	})
