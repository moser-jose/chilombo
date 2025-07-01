import React from 'react'
import { View, Text, StyleSheet, ScrollView } from 'react-native'
import { useCheckoutStore} from '../../store/store'
import { router, Stack } from 'expo-router'
import { Ionicons } from '@expo/vector-icons'
import { TouchableOpacity } from '@/src/components/Themed'
import { useCustomTheme } from '@/src/context/ThemeContext'
import { Theme } from '@/src/types/theme'
import StatusCheckout from '@/src/components/ui/StatusCheckout'
import { formatKwanza } from '@/src/utils/currency'
import { useShallow } from 'zustand/react/shallow'

export default function OrderReview() {
	const plan = useCheckoutStore(useShallow(state => state.plan))
	const { theme } = useCustomTheme()
	const styles = useStyles(theme)

	return (
		<>
			<Stack.Screen
				options={{
					title: 'Revisão',
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
						styleText={styles.statusTextMuted}
						styleNumber={styles.statusTextMuted}
						status="Pagamento"
						colorIcon={theme.colors.primary}
						number={3}
					/>
				</View>

				<ScrollView style={styles.itemsContainer}>
					<View key={plan?.id} style={styles.itemCard}>
						<View style={styles.itemImage}>
							<Ionicons name="image" size={50} color="#ddd" />
						</View>
						<View style={styles.itemDetails}>
							<Text style={styles.itemName}>Plano - {plan?.title}</Text>
							<Text style={styles.type}>
								{plan?.type} | {plan?.tag}
							</Text>
							{/* <Text style={styles.description}>{plan?.description}</Text> */}
							<Text style={styles.itemPrice}>{formatKwanza(plan?.price)}</Text>
						</View>
					</View>
				</ScrollView>

				<View style={styles.summaryContainer}>
					<View style={styles.summaryRow}>
						<Text style={styles.summaryLabel}>Subtotal</Text>
						<Text style={styles.summaryValue}>{formatKwanza(plan?.price)}</Text>
					</View>
					<View style={styles.summaryRow}>
						<Text style={styles.summaryLabel}>Desconto</Text>
						<Text style={styles.summaryValue}>0,00 Kz</Text>
					</View>
					<View style={[styles.summaryRow, styles.totalRow]}>
						<Text style={styles.totalLabel}>Total</Text>
						<Text style={styles.totalValue}>{formatKwanza(plan?.price)}</Text>
					</View>
				</View>

				<TouchableOpacity
					style={styles.button}
					onPress={() => router.push('/(checkout)/payment')}
				>
					<Text style={styles.buttonText}>Continuar para Pagamento</Text>
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
		type: {
			fontSize: theme.size.xss,
			fontFamily: theme.fonts.regular.fontFamily,
			color: theme.colors.muted,
			marginBottom: 4,
			fontStyle: 'italic',
		},
		description: {
			fontSize: theme.size.xss,
			fontFamily: theme.fonts.regular.fontFamily,
			color: theme.colors.muted,
			marginBottom: 4,
		},
		statusText: {
			color: theme.colors.primary,
		},
		statusTextMuted: {
			color: theme.colors.cancelButton,
		},
		container: {
			flex: 1,
			padding: 16,
			backgroundColor: theme.colors.background,
		},
		title: {
			fontSize: 20,
			fontWeight: 'bold',
			marginBottom: 20,
			textAlign: 'center',
		},
		itemsContainer: {
			flex: 1,
		},
		itemCard: {
			flexDirection: 'row',
			padding: 12,
			borderWidth: 1,
			borderColor: theme.colors.border,
			borderRadius: 8,
			marginBottom: 12,
			backgroundColor: theme.colors.card,
		},
		itemPlan: {
			fontSize: theme.size.xsB,
			color: theme.colors.muted,
			fontFamily: theme.fonts.medium.fontFamily,
		},
		itemImage: {
			width: 80,
			height: 80,
			backgroundColor: theme.colors.card,
			borderRadius: 8,
			justifyContent: 'center',
			alignItems: 'center',
			marginRight: 12,
		},
		itemDetails: {
			flex: 1,
			justifyContent: 'center',
		},
		itemName: {
			fontSize: theme.size.sm,
			fontFamily: theme.fonts.semibold.fontFamily,
			//marginBottom: 4,
			color: theme.colors.text,
		},
		itemPrice: {
			fontSize: theme.size.xsB,
			color: theme.colors.text,
			marginBottom: 4,
		},
		itemQuantity: {
			fontSize: theme.size.xsB,
			color: theme.colors.muted,
		},
		summaryContainer: {
			padding: 16,
			backgroundColor: theme.colors.card,
			borderRadius: 8,
			marginTop: 16,
			borderWidth: 1,
			borderColor: theme.colors.border,
		},
		summaryRow: {
			flexDirection: 'row',
			justifyContent: 'space-between',
			marginBottom: 8,
		},
		totalRow: {
			marginTop: 8,
			paddingTop: 8,
			borderTopWidth: 1,
			borderTopColor: theme.colors.border,
		},
		summaryLabel: {
			fontSize: theme.size.xsB,
			color: theme.colors.muted,
		},
		summaryValue: {
			fontSize: theme.size.xsB,
			color: theme.colors.text,
		},
		totalLabel: {
			fontSize: theme.size.xsB,
			fontFamily: theme.fonts.bold.fontFamily,
			color: theme.colors.text,
		},
		totalValue: {
			fontSize: theme.size.xsB,
			fontFamily: theme.fonts.bold.fontFamily,
			color: theme.colors.primary,
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
	})
