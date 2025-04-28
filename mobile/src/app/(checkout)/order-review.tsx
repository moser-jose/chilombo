import React from 'react'
import {
	View,
	Text,
	StyleSheet,
	ScrollView,
} from 'react-native'
import { useCheckout } from './checkout-context'
import { router, Stack } from 'expo-router'
import { Ionicons } from '@expo/vector-icons'
import { TouchableOpacity } from '@/src/components/ui/TouchableOpacity'
import { useCustomTheme } from '@/src/context/ThemeContext'
// Mock data - replace with actual data from your backend
const mockOrder = {
	items: [
		{
			id: '1',
			name: 'Produto 1',
			price: 29.99,
			quantity: 2,
			image: 'https://via.placeholder.com/100',
		},
		{
			id: '2',
			name: 'Produto 2',
			price: 49.99,
			quantity: 1,
			image: 'https://via.placeholder.com/100',
		},
	],
	subtotal: 109.97,
	shipping: 10.0,
	total: 119.97,
}

export default function OrderReview() {
	const { order } = useCheckout()
    const { theme } = useCustomTheme()

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
                <Text style={styles.title}>Revisão do Pedido</Text>

			<ScrollView style={styles.itemsContainer}>
				{mockOrder.items.map(item => (
					<View key={item.id} style={styles.itemCard}>
						<View style={styles.itemImage}>
							<Ionicons name="image" size={50} color="#ddd" />
						</View>
						<View style={styles.itemDetails}>
							<Text style={styles.itemName}>{item.name}</Text>
							<Text style={styles.itemPrice}>R$ {item.price.toFixed(2)}</Text>
							<Text style={styles.itemQuantity}>
								Quantidade: {item.quantity}
							</Text>
						</View>
					</View>
				))}
			</ScrollView>

			<View style={styles.summaryContainer}>
				<View style={styles.summaryRow}>
					<Text style={styles.summaryLabel}>Subtotal</Text>
					<Text style={styles.summaryValue}>
						R$ {mockOrder.subtotal.toFixed(2)}
					</Text>
				</View>
				<View style={styles.summaryRow}>
					<Text style={styles.summaryLabel}>Frete</Text>
					<Text style={styles.summaryValue}>
						R$ {mockOrder.shipping.toFixed(2)}
					</Text>
				</View>
				<View style={[styles.summaryRow, styles.totalRow]}>
					<Text style={styles.totalLabel}>Total</Text>
					<Text style={styles.totalValue}>R$ {mockOrder.total.toFixed(2)}</Text>
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

const styles = StyleSheet.create({
	container: {
		flex: 1,
		padding: 16,
		backgroundColor: '#fff',
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
		borderColor: '#ddd',
		borderRadius: 8,
		marginBottom: 12,
		backgroundColor: '#fff',
	},
	itemImage: {
		width: 80,
		height: 80,
		backgroundColor: '#f5f5f5',
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
		fontSize: 16,
		fontWeight: 'bold',
		marginBottom: 4,
	},
	itemPrice: {
		fontSize: 14,
		color: '#666',
		marginBottom: 4,
	},
	itemQuantity: {
		fontSize: 14,
		color: '#666',
	},
	summaryContainer: {
		padding: 16,
		backgroundColor: '#f5f5f5',
		borderRadius: 8,
		marginTop: 16,
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
		borderTopColor: '#ddd',
	},
	summaryLabel: {
		fontSize: 14,
		color: '#666',
	},
	summaryValue: {
		fontSize: 14,
		color: '#666',
	},
	totalLabel: {
		fontSize: 16,
		fontWeight: 'bold',
	},
	totalValue: {
		fontSize: 16,
		fontWeight: 'bold',
		color: '#4CAF50',
	},
	button: {
		backgroundColor: '#4CAF50',
		padding: 16,
		borderRadius: 8,
		alignItems: 'center',
		marginTop: 16,
	},
	buttonText: {
		color: '#fff',
		fontSize: 16,
		fontWeight: 'bold',
	},
})
