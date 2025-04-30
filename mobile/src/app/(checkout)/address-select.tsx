import React, { useState } from 'react'
import { View, Text, StyleSheet, ScrollView } from 'react-native'
import { useCheckout } from '../../context/CheckoutContext'
import { router, Stack } from 'expo-router'
import { Ionicons } from '@expo/vector-icons'
import { useCustomTheme } from '@/src/context/ThemeContext'
import { Theme } from '@/src/types/theme'
import { TouchableOpacity } from '@/src/components/ui/TouchableOpacity'
import StatusCheckout from '@/src/components/front/StatusCheckout'
import { Address } from '@/types/address'

const addresses: Address[] = [
	{
		id: '2',
		title: 'Minha casa 1',
		street: 'Av. Paulista',
		number: '1000',
		neighborhood: 'Capango',
		building_number: '10',
		apartment: '10',
		city: 'Huambo',
		state: 'Huambo',
	},
	{
		id: '1',
		title: 'Minha casa 2',
		centrality: 'Centralidade do Lossambo',
		block: '14',
		building_number: '9',
		apartment: '3',
		neighborhood: 'Lossambo',
		city: 'Huambo',
		state: 'Huambo',
	},
]

/* id: string
title: string
address: string
neighborhood?: string | null
centrality?: string | null
commune?: string | null
block?: string | null
street?: string | null
number?: string | null
apartment?: string | null
building_number?: string | null
city: string
state: string
zipCode?: string | null */

//Normal

//Rua, number,
//building_number, apartment
//neighborhood, city, state

//centrality

//centrality,
//block, building_number, apartment
//neighborhood, city, state

//block, street, number,
//neighborhood, city, state

//neighborhood, city, state

export default function AddressSelect() {
	const { address, setAddress, plan } = useCheckout()
	const { theme } = useCustomTheme()
	const styles = useStyles(theme as Theme)
	const [selectedAddress, setSelectedAddress] = useState<Address>(address)

	console.log(plan, 'plan - address-select')

	const handleSelectAddress = (address: Address) => {
		setSelectedAddress(address)
		setAddress(address)
	}

	return (
		<>
			<Stack.Screen
				options={{
					title: 'Endereço',
					headerLeft: () => (
						<TouchableOpacity type="tertiary" onPress={() => router.back()}>
							<Ionicons
								name="chevron-back"
								size={24}
								color={theme.colors.text}
							/>
						</TouchableOpacity>
					),
					headerRight: () => (
						<TouchableOpacity
							type="tertiary"
							onPress={() => router.push('/(checkout)/address-add')}
						>
							<Ionicons name="add" size={24} color={theme.colors.text} />
						</TouchableOpacity>
					),
				}}
			/>
			<View style={styles.container}>
				<View style={styles.statusContainer}>
					<StatusCheckout
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
						styleText={styles.statusText}
						styleNumber={styles.statusText}
						status="Pagamento"
						colorIcon={theme.colors.primary}
						number={3}
					/>
				</View>

				<ScrollView style={styles.addressList}>
					{addresses.map(addr => (
						<TouchableOpacity
							type="tertiary"
							key={addr.id}
							style={[
								styles.addressCard,
								selectedAddress?.id === addr.id && styles.selectedAddress,
							]}
							onPress={() => handleSelectAddress(addr)}
						>
							<View style={styles.addressContent}>
								<View style={styles.addressHeader}>
									{selectedAddress?.id === addr.id && (
										<Ionicons
											name="checkmark-circle"
											size={24}
											color={theme.colors.primary}
										/>
									)}
								</View>
								<View>
									<Text style={styles.addressTitle}>{addr.title}</Text>
									<View style={{ flexDirection: 'row', gap: 4 }}>
										{(addr.street || addr.centrality) && (
											<Text style={styles.addressText}>
												{(addr.street || addr.centrality) + ' '}
												{addr.number && addr.number + ', '}
											</Text>
										)}
										{addr.apartment && !addr.centrality && (
											<Text style={styles.addressText}>
												{addr.building_number &&
													'Pd ' + addr.building_number + ', '}
												{addr.apartment && 'Ap ' + addr.apartment}
											</Text>
										)}
									</View>

									{addr.block && (
										<Text style={styles.addressText}>
											{'Qdra ' + addr.block + ', '}
											{'Pd ' + addr.building_number}, {'Ap ' + addr.apartment}
										</Text>
									)}

									<Text style={styles.addressText}>
										{addr.neighborhood && addr.neighborhood + ', '}
										{addr.city}, {addr.state}
									</Text>
								</View>
							</View>
							<TouchableOpacity type="tertiary" style={styles.addressAction}>
								<Text style={styles.addressActionText}>Editar</Text>
							</TouchableOpacity>
						</TouchableOpacity>
					))}

					<Text style={styles.infoText}>
						O botão <Text style={styles.infoTextBold}>+</Text> permite adicionar
						um novo endereço.
					</Text>
				</ScrollView>

				<TouchableOpacity
					type="primary"
					style={[styles.button, !selectedAddress && styles.buttonDisabled]}
					onPress={() => router.push('/(checkout)/order-review')}
					disabled={!selectedAddress}
				>
					<Text style={styles.buttonText}>Confirmar Endereço</Text>
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
		statusText: {
			color: theme.colors.cancelButton,
		},
		container: {
			flex: 1,
			padding: 16,
			backgroundColor: theme.colors.background,
		},
		title: {
			fontSize: theme.size.smB,
			fontFamily: theme.fonts.bold.fontFamily,
			color: theme.colors.text,
			marginBottom: 20,
			textAlign: 'center',
		},
		addressList: {
			flex: 1,
		},
		addressCard: {
			padding: 16,
			borderWidth: 1,
			borderColor: theme.colors.border,
			borderRadius: 8,
			marginBottom: 12,
			backgroundColor: theme.colors.card,
			flexDirection: 'row',
			justifyContent: 'space-between',
			alignItems: 'center',
		},
		selectedAddress: {
			borderColor: theme.colors.primary,
			borderWidth: 2,
		},
		addressHeader: {
			flexDirection: 'row',
			justifyContent: 'space-between',
			alignItems: 'center',
			marginBottom: 8,
		},
		addressTitle: {
			fontSize: theme.size.smB,
			fontFamily: theme.fonts.bold.fontFamily,
			color: theme.colors.primary,
		},
		addressText: {
			fontSize: theme.size.xs,
			color: theme.colors.text,
			marginBottom: 4,
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
			backgroundColor: theme.colors.border,
		},
		infoText: {
			marginTop: 15,
			marginHorizontal: 20,
			fontSize: theme.size.xs,
			fontFamily: theme.fonts.regular.fontFamily,
			color: '#444',
			textAlign: 'center',
		},
		infoTextBold: {
			fontFamily: theme.fonts.bold.fontFamily,
		},
		addressContent: {
			flex: 1,
			flexDirection: 'row',
			gap: 10,
		},
		addressAction: {
			flexDirection: 'row',
			justifyContent: 'space-between',
			alignItems: 'center',
			//backgroundColor: theme.colors.cancelButton,
			borderWidth: 1,
			borderColor: theme.colors.text,
			borderRadius: 8,
			paddingHorizontal: 12,
			paddingVertical: 4,
		},
		addressActionText: {
			fontSize: theme.size.xs,
			fontFamily: theme.fonts.medium.fontFamily,
			color: theme.colors.text,
		},
	})
