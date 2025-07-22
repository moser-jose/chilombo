import React from 'react'
import {
	View,
	Text,
	StyleSheet,
	ScrollView,
	ActivityIndicator,
	KeyboardAvoidingView,
	Platform,
} from 'react-native'
import { useCheckoutStore, useThemeStore } from '../../store/store'
import { Link, router, Stack } from 'expo-router'
import { Ionicons } from '@expo/vector-icons'
import { useTheme } from '@/src/hooks/useTheme'
import { Theme } from '@/src/types/theme'
import { TouchableOpacity } from '@/src/components/Themed'
import StatusCheckout from '@/src/components/ui/StatusCheckout'
import { Address } from '@/types/address'
import { useShallow } from 'zustand/react/shallow'
import { useAddressesStore } from '@/src/hooks/useAddresses'

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
	const address = useCheckoutStore(useShallow(state => state.address))
	const setAddress = useCheckoutStore(useShallow(state => state.setAddress))
	const { addresses, isLoading } = useAddressesStore(
		useShallow(state => ({
			addresses: state.addresses,
			isLoading: state.isLoading,
		})),
	)

	const { theme } = useThemeStore(useShallow(state => ({
		theme: state.theme,
	})))
	const styles = useStyles(theme as Theme)

	const handleSelectAddress = (selectedAddress: Address) => {
		setAddress(selectedAddress)
	}



	return (
		<>
			<Stack.Screen
				options={{
					title: 'Endereço',
					headerLeft: () => (
						<TouchableOpacity
							type="tertiary"
							onPress={() => router.back()}
							accessible={true}
							accessibilityLabel="Voltar"
							accessibilityHint="Toque para voltar à tela anterior"
							accessibilityRole="button"
						>
							<Ionicons
								name="chevron-back"
								size={24}
								color={theme.colors.text}
								accessible={false}
							/>
						</TouchableOpacity>
					),
					headerRight: () => (
						<Link href="/(modals)/address-add" asChild>
							<TouchableOpacity
								type="tertiary"
								accessible={true}
								accessibilityLabel="Adicionar novo endereço"
								accessibilityHint="Toque para adicionar um novo endereço"
								accessibilityRole="button"
							>
								<Ionicons
									name="add"
									size={24}
									color={theme.colors.text}
									accessible={false}
								/>
							</TouchableOpacity>
						</Link>
					),
				}}
			/>
			<KeyboardAvoidingView
				style={styles.container}
				behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
				keyboardVerticalOffset={Platform.OS === 'ios' ? 0 : 20}
			>
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

				<ScrollView
					style={styles.addressList}
					keyboardShouldPersistTaps="handled"
					showsVerticalScrollIndicator={false}
				>
					{isLoading ? (
						<View style={styles.loadingContainer}>
							<ActivityIndicator size="large" color={theme.colors.primary} />
							<Text style={styles.loadingText}>Carregando endereços...</Text>
						</View>
					) : addresses.length === 0 ? (
						<View style={styles.emptyContainer}>
							<Ionicons
								name="location-outline"
								size={48}
								color={theme.colors.border}
							/>
							<Text style={styles.emptyText}>Nenhum endereço cadastrado</Text>
							<Text style={styles.emptySubtext}>
								Adicione seu primeiro endereço para continuar
							</Text>
						</View>
					) : (
						addresses.map((addr: Address) => (
							<TouchableOpacity
								type="tertiary"
								key={addr.id}
								style={[
									styles.addressCard,
									address?.id === addr.id && styles.selectedAddress,
								]}
								onPress={() => handleSelectAddress(addr)}
								accessible={true}
								accessibilityLabel={`Endereço: ${addr.title}`}
								accessibilityHint={
									address?.id === addr.id
										? 'Endereço selecionado. Toque para manter selecionado'
										: 'Toque para selecionar este endereço'
								}
								accessibilityRole="button"
								accessibilityState={{
									selected: address?.id === addr.id,
								}}
							>
								<View style={styles.addressContent}>
									<View style={styles.addressHeader}>
										{address?.id === addr.id && (
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
								<Link
									href={`/(modals)/address-edit?addressId=${addr.id}`}
									asChild
								>
									<TouchableOpacity
										type="tertiary"
										style={styles.addressAction}
										accessible={true}
										accessibilityLabel={`Editar endereço: ${addr.title}`}
										accessibilityHint="Toque para editar este endereço"
										accessibilityRole="button"
									>
										<Text style={styles.addressActionText} accessible={false}>
											Editar
										</Text>
									</TouchableOpacity>
								</Link>
							</TouchableOpacity>
						))
					)}

					{addresses.length > 0 && (
						<Text style={styles.infoText}>
							O botão <Text style={styles.infoTextBold}>+</Text> permite
							adicionar um novo endereço.
						</Text>
					)}
				</ScrollView>

				<TouchableOpacity
					style={[styles.button, !address && styles.buttonDisabled]}
					onPress={() => router.push('/(checkout)/order-review')}
					disabled={!address}
					accessible={true}
					accessibilityLabel={
						address
							? `Confirmar endereço: ${address.title}`
							: 'Botão desabilitado, selecione um endereço primeiro'
					}
					accessibilityHint={
						address
							? 'Toque para confirmar o endereço selecionado e continuar'
							: 'Selecione um endereço da lista para habilitar este botão'
					}
					accessibilityRole="button"
					accessibilityState={{
						disabled: !address,
					}}
				>
					<Text style={styles.buttonText} accessible={false}>
						Confirmar Endereço
					</Text>
				</TouchableOpacity>
			</KeyboardAvoidingView>
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
			backgroundColor: theme.colors.primary + '10',
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
			backgroundColor: theme.colors.disabled,
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
		loadingContainer: {
			flex: 1,
			justifyContent: 'center',
			alignItems: 'center',
			paddingVertical: 40,
		},
		loadingText: {
			fontSize: theme.size.xs,
			fontFamily: theme.fonts.regular.fontFamily,
			color: theme.colors.text,
			marginTop: 12,
		},
		emptyContainer: {
			flex: 1,
			justifyContent: 'center',
			alignItems: 'center',
			paddingVertical: 40,
		},
		emptyText: {
			fontSize: theme.size.smB,
			fontFamily: theme.fonts.bold.fontFamily,
			color: theme.colors.text,
			marginTop: 16,
			textAlign: 'center',
		},
		emptySubtext: {
			fontSize: theme.size.xs,
			fontFamily: theme.fonts.regular.fontFamily,
			color: theme.colors.text,
			marginTop: 8,
			textAlign: 'center',
			opacity: 0.7,
		},
	})
