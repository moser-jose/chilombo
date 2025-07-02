import { Ionicons } from '@expo/vector-icons'
import { router, Stack, useLocalSearchParams } from 'expo-router'
import React, { useState, useEffect } from 'react'
import {
	View,
	Text,
	StyleSheet,
	ScrollView,
	Alert,
	KeyboardAvoidingView,
	Platform,
} from 'react-native'
import { useTheme } from '@/src/hooks/useTheme'
import { TouchableOpacity, TextInput } from '@/src/components/Themed'
import { Theme } from '@/src/types/theme'
import { Address } from '@/src/types/address'
import { useAddresses } from '@/src/hooks/useAddresses'

export default function AddressEdit() {
	const { theme } = useTheme()
	const styles = useStyles(theme as Theme)
	const { addressId } = useLocalSearchParams<{ addressId: string }>()

	const { getAddressById, updateAddress } = useAddresses()

	// Estados para os campos do endereço
	const [title, setTitle] = useState('')
	const [street, setStreet] = useState('')
	const [number, setNumber] = useState('')
	const [neighborhood, setNeighborhood] = useState('')
	const [centrality, setCentrality] = useState('')
	const [commune, setCommune] = useState('')
	const [block, setBlock] = useState('')
	const [apartment, setApartment] = useState('')
	const [buildingNumber, setBuildingNumber] = useState('')
	const [city, setCity] = useState('')
	const [state, setState] = useState('')
	const [zipCode, setZipCode] = useState('')

	// Estado para controlar o tipo de endereço
	const [addressType, setAddressType] = useState<'street' | 'centrality'>(
		'street',
	)

	// Estado para controlar loading
	const [isLoading, setIsLoading] = useState(false)
	const [isInitialLoading, setIsInitialLoading] = useState(true)

	// Carregar dados do endereço
	useEffect(() => {
		if (addressId) {
			const address = getAddressById(addressId)
			if (address) {
				setTitle(address.title || '')
				setStreet(address.street || '')
				setNumber(address.number || '')
				setNeighborhood(address.neighborhood || '')
				setCentrality(address.centrality || '')
				setCommune(address.commune || '')
				setBlock(address.block || '')
				setApartment(address.apartment || '')
				setBuildingNumber(address.building_number || '')
				setCity(address.city || '')
				setState(address.state || '')
				setZipCode(address.zipCode || '')

				// Determinar o tipo de endereço
				if (address.centrality) {
					setAddressType('centrality')
				} else {
					setAddressType('street')
				}
			}
		}
		setIsInitialLoading(false)
	}, [addressId, getAddressById])

	const handleUpdateAddress = async () => {
		// Validação básica
		if (!title.trim()) {
			Alert.alert('Erro', 'Por favor, insira um título para o endereço')
			return
		}

		if (!city.trim()) {
			Alert.alert('Erro', 'Por favor, insira a cidade')
			return
		}

		if (!state.trim()) {
			Alert.alert('Erro', 'Por favor, insira o estado/província')
			return
		}

		// Validação específica por tipo de endereço
		if (addressType === 'street' && !street.trim()) {
			Alert.alert('Erro', 'Por favor, insira a rua/avenida')
			return
		}

		if (addressType === 'centrality' && !centrality.trim()) {
			Alert.alert('Erro', 'Por favor, insira a centralidade')
			return
		}

		setIsLoading(true)

		try {
			// Criar objeto do endereço atualizado
			const updatedAddress: Partial<Address> = {
				title: title.trim(),
				street: street.trim() || null,
				number: number.trim() || null,
				neighborhood: neighborhood.trim() || null,
				centrality: centrality.trim() || null,
				commune: commune.trim() || null,
				block: block.trim() || null,
				apartment: apartment.trim() || null,
				building_number: buildingNumber.trim() || null,
				city: city.trim(),
				state: state.trim(),
				zipCode: zipCode.trim() || null,
			}

			// Atualizar o endereço usando o hook
			await updateAddress(addressId!, updatedAddress)

			Alert.alert('Sucesso', 'Endereço atualizado com sucesso!', [
				{
					text: 'OK',
					onPress: () => router.back(),
				},
			])
		} catch (error) {
			Alert.alert('Erro', 'Erro ao atualizar o endereço. Tente novamente.')
		} finally {
			setIsLoading(false)
		}
	}

	const isFormValid = () => {
		const basicValidation = title.trim() && city.trim() && state.trim()

		if (addressType === 'street') {
			return basicValidation && street.trim()
		}

		if (addressType === 'centrality') {
			return basicValidation && centrality.trim()
		}

		return basicValidation
	}

	if (isInitialLoading) {
		return (
			<View style={styles.loadingContainer}>
				<Ionicons
					name="hourglass-outline"
					size={48}
					color={theme.colors.primary}
				/>
				<Text style={styles.loadingText}>Carregando endereço...</Text>
			</View>
		)
	}

	return (
		<>
			<Stack.Screen
				options={{
					title: 'Editar Endereço',
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
				}}
			/>

			<View style={styles.container}>
				<KeyboardAvoidingView
					style={styles.keyboardAvoidingView}
					behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
					keyboardVerticalOffset={Platform.OS === 'ios' ? 0 : 20}
				>
					<ScrollView
						style={styles.scrollView}
						showsVerticalScrollIndicator={false}
						keyboardShouldPersistTaps="handled"
						contentContainerStyle={styles.scrollContent}
					>
						<View style={styles.content}>
							<Text style={styles.sectionTitle}>Informações Básicas</Text>

							<TextInput
								type="text"
								label="Título do Endereço *"
								placeholder="Ex: Minha casa, Trabalho"
								icon="home-outline"
								value={title}
								onChangeText={setTitle}
								style={styles.input}
							/>

							<View style={styles.typeSelector}>
								<Text style={styles.typeLabel}>Tipo de Endereço</Text>
								<View style={styles.typeButtons}>
									<TouchableOpacity
										type="tertiary"
										style={[
											styles.typeButton,
											addressType === 'street' && styles.typeButtonActive,
										]}
										onPress={() => setAddressType('street')}
										accessible={true}
										accessibilityLabel="Tipo de endereço: Rua ou Avenida"
										accessibilityHint={
											addressType === 'street'
												? 'Selecionado. Toque para manter selecionado'
												: 'Toque para selecionar endereço por rua ou avenida'
										}
										accessibilityRole="radio"
										accessibilityState={{
											selected: addressType === 'street',
										}}
									>
										<Ionicons
											name="map-outline"
											size={20}
											color={
												addressType === 'street'
													? theme.colors.primary
													: theme.colors.text
											}
											accessible={false}
										/>
										<Text
											style={[
												styles.typeButtonText,
												addressType === 'street' && styles.typeButtonTextActive,
											]}
											accessible={false}
										>
											Rua/Avenida
										</Text>
									</TouchableOpacity>

									<TouchableOpacity
										type="tertiary"
										style={[
											styles.typeButton,
											addressType === 'centrality' && styles.typeButtonActive,
										]}
										onPress={() => setAddressType('centrality')}
										accessible={true}
										accessibilityLabel="Tipo de endereço: Centralidade"
										accessibilityHint={
											addressType === 'centrality'
												? 'Selecionado. Toque para manter selecionado'
												: 'Toque para selecionar endereço por centralidade'
										}
										accessibilityRole="radio"
										accessibilityState={{
											selected: addressType === 'centrality',
										}}
									>
										<Ionicons
											name="business-outline"
											size={20}
											color={
												addressType === 'centrality'
													? theme.colors.primary
													: theme.colors.text
											}
											accessible={false}
										/>
										<Text
											style={[
												styles.typeButtonText,
												addressType === 'centrality' &&
													styles.typeButtonTextActive,
											]}
											accessible={false}
										>
											Centralidade
										</Text>
									</TouchableOpacity>
								</View>
							</View>

							{addressType === 'street' ? (
								<>
									<Text style={styles.sectionTitle}>Endereço por Rua</Text>

									<TextInput
										type="text"
										label="Rua/Avenida *"
										placeholder="Nome da rua ou avenida"
										icon="map-outline"
										value={street}
										onChangeText={setStreet}
										style={styles.input}
									/>

									<View style={styles.row}>
										<View style={styles.halfInput}>
											<TextInput
												type="text"
												label="Número"
												placeholder="Número"
												icon="pricetag-outline"
												value={number}
												onChangeText={setNumber}
											/>
										</View>
										<View style={styles.halfInput}>
											<TextInput
												type="text"
												label="Prédio"
												placeholder="Número do prédio"
												icon="business-outline"
												value={buildingNumber}
												onChangeText={setBuildingNumber}
											/>
										</View>
									</View>

									<TextInput
										type="text"
										label="Apartamento"
										placeholder="Número do apartamento"
										icon="home-outline"
										value={apartment}
										onChangeText={setApartment}
										style={styles.input}
									/>
								</>
							) : (
								<>
									<Text style={styles.sectionTitle}>
										Endereço por Centralidade
									</Text>

									<TextInput
										type="text"
										label="Centralidade *"
										placeholder="Nome da centralidade"
										icon="business-outline"
										value={centrality}
										onChangeText={setCentrality}
										style={styles.input}
									/>

									<View style={styles.row}>
										<View style={styles.halfInput}>
											<TextInput
												type="text"
												label="Quadra"
												placeholder="Número da quadra"
												icon="grid-outline"
												value={block}
												onChangeText={setBlock}
											/>
										</View>
										<View style={styles.halfInput}>
											<TextInput
												type="text"
												label="Prédio"
												placeholder="Número do prédio"
												icon="business-outline"
												value={buildingNumber}
												onChangeText={setBuildingNumber}
											/>
										</View>
									</View>

									<TextInput
										type="text"
										label="Apartamento"
										placeholder="Número do apartamento"
										icon="home-outline"
										value={apartment}
										onChangeText={setApartment}
										style={styles.input}
									/>
								</>
							)}

							<Text style={styles.sectionTitle}>Localização</Text>

							<TextInput
								type="text"
								label="Bairro"
								placeholder="Nome do bairro"
								icon="location-outline"
								value={neighborhood}
								onChangeText={setNeighborhood}
								style={styles.input}
							/>

							<TextInput
								type="text"
								label="Comuna"
								placeholder="Nome da comuna"
								icon="location-outline"
								value={commune}
								onChangeText={setCommune}
								style={styles.input}
							/>

							<View style={styles.row}>
								<View style={styles.halfInput}>
									<TextInput
										type="text"
										label="Cidade *"
										placeholder="Nome da cidade"
										icon="location-outline"
										value={city}
										onChangeText={setCity}
									/>
								</View>
								<View style={styles.halfInput}>
									<TextInput
										type="text"
										label="Estado/Província *"
										placeholder="Estado ou província"
										icon="location-outline"
										value={state}
										onChangeText={setState}
									/>
								</View>
							</View>

							<TextInput
								type="text"
								label="Código Postal"
								placeholder="Código postal (opcional)"
								icon="mail-outline"
								value={zipCode}
								onChangeText={setZipCode}
								style={styles.input}
							/>

							<View style={styles.infoContainer}>
								<Ionicons
									name="information-circle-outline"
									size={20}
									color={theme.colors.secondary}
								/>
								<Text style={styles.infoText}>
									Os campos marcados com * são obrigatórios
								</Text>
							</View>
						</View>
					</ScrollView>
				</KeyboardAvoidingView>

				<View style={styles.footer}>
					<TouchableOpacity
						type="primary"
						style={[
							styles.saveButton,
							!isFormValid() && styles.saveButtonDisabled,
						]}
						onPress={handleUpdateAddress}
						disabled={!isFormValid() || isLoading}
						accessible={true}
						accessibilityLabel={
							isLoading
								? 'Atualizando endereço, aguarde'
								: isFormValid()
									? 'Atualizar endereço'
									: 'Botão desabilitado, preencha os campos obrigatórios'
						}
						accessibilityHint={
							isLoading
								? 'O endereço está sendo atualizado'
								: isFormValid()
									? 'Toque para atualizar o endereço'
									: 'Preencha todos os campos obrigatórios para habilitar o botão'
						}
						accessibilityRole="button"
						accessibilityState={{
							disabled: !isFormValid() || isLoading,
							busy: isLoading,
						}}
					>
						{isLoading ? (
							<>
								<Ionicons
									name="hourglass-outline"
									size={20}
									color="#fff"
									accessible={false}
								/>
								<Text style={styles.saveButtonText} accessible={false}>
									Atualizando...
								</Text>
							</>
						) : (
							<Text style={styles.saveButtonText} accessible={false}>
								Atualizar Endereço
							</Text>
						)}
					</TouchableOpacity>
				</View>
			</View>
		</>
	)
}

const useStyles = (theme: Theme) =>
	StyleSheet.create({
		container: {
			flex: 1,
			backgroundColor: theme.colors.background,
		},
		keyboardAvoidingView: {
			flex: 1,
		},
		scrollView: {
			flex: 1,
		},
		scrollContent: {
			flexGrow: 1,
		},
		content: {
			padding: 16,
			paddingBottom: 100, // Espaço para o footer
		},
		sectionTitle: {
			fontSize: theme.size.smB,
			fontFamily: theme.fonts.bold.fontFamily,
			color: theme.colors.text,
			marginTop: 20,
			marginBottom: 12,
		},
		input: {
			marginBottom: 16,
		},
		row: {
			flexDirection: 'row',
			gap: 12,
			marginBottom: 16,
		},
		halfInput: {
			flex: 1,
		},
		typeSelector: {
			marginBottom: 20,
		},
		typeLabel: {
			fontSize: theme.size.xsB,
			fontFamily: theme.fonts.medium.fontFamily,
			color: theme.colors.text,
			marginBottom: 8,
		},
		typeButtons: {
			flexDirection: 'row',
			gap: 12,
		},
		typeButton: {
			flex: 1,
			flexDirection: 'row',
			alignItems: 'center',
			justifyContent: 'center',
			gap: 8,
			paddingVertical: 12,
			paddingHorizontal: 16,
			borderRadius: 8,
			borderWidth: 1,
			borderColor: theme.colors.border,
			backgroundColor: theme.colors.card,
		},
		typeButtonActive: {
			borderColor: theme.colors.primary,
			backgroundColor: theme.colors.primary + '10',
		},
		typeButtonText: {
			fontSize: theme.size.xs,
			fontFamily: theme.fonts.medium.fontFamily,
			color: theme.colors.text,
		},
		typeButtonTextActive: {
			color: theme.colors.primary,
		},
		infoContainer: {
			flexDirection: 'row',
			alignItems: 'center',
			gap: 8,
			marginTop: 20,
			padding: 12,
			backgroundColor: theme.colors.card,
			borderRadius: 8,
			borderWidth: 1,
			borderColor: theme.colors.border,
		},
		infoText: {
			fontSize: theme.size.xs,
			fontFamily: theme.fonts.regular.fontFamily,
			color: theme.colors.text,
			flex: 1,
		},
		footer: {
			position: 'absolute',
			bottom: 0,
			left: 0,
			right: 0,
			backgroundColor: theme.colors.background,
			padding: 16,
			borderTopWidth: 1,
			borderTopColor: theme.colors.border,
		},
		saveButton: {
			backgroundColor: theme.colors.primary,
			borderRadius: 12,
			paddingVertical: 12,
			marginVertical: 16,
		},
		saveButtonDisabled: {
			backgroundColor: theme.colors.disabled,
		},
		saveButtonText: {
			fontSize: theme.size.xsB,
			fontFamily: theme.fonts.medium.fontFamily,
			color: '#fff',
		},
		loadingContainer: {
			flex: 1,
			justifyContent: 'center',
			alignItems: 'center',
			backgroundColor: theme.colors.background,
		},
		loadingText: {
			fontSize: theme.size.xs,
			fontFamily: theme.fonts.regular.fontFamily,
			color: theme.colors.text,
			marginTop: 12,
		},
	})
