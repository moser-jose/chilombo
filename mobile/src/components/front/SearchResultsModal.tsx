import React, { useMemo, useState } from 'react'
import {
	View,
	Text,
	StyleSheet,
	Modal,
	TouchableOpacity,
	FlatList,
	Dimensions,
} from 'react-native'
import { Ionicons } from '@expo/vector-icons'
import { fontFamily } from '@/src/constants/FontFamily'
import { FontSize } from '@/src/constants/FontSize'
import Colors from '@/src/constants/Colors'
import FastImage from 'react-native-fast-image'
import { router } from 'expo-router'
import TextInputUI from '../ui/TextInput'
const { width, height } = Dimensions.get('window')
const services = [
	{
		id: 1,
		icon: require('../../../assets/icons/emp.png'),
		service: 'Empregadas Domésticas',
		route: '/services/empregada-domestica',
	},
	{
		id: 2,
		icon: require('../../../assets/icons/garden.png'),
		service: 'Tratamento de Jardim',
		route: '/services/tratamento-jardim',
	},
	{
		id: 3,
		icon: require('../../../assets/icons/houseclean.png'),
		service: 'Limpeza Residencial',
		route: '/services/limpeza-residencial',
	},
	{
		id: 4,
		icon: require('../../../assets/icons/toolsclean.png'),
		service: 'Limpeza Empresarial',
		route: '/services/limpeza-empresarial',
	},
]

const completedServices = [
	{
		id: 1,
		title: 'Limpeza Residencial',
		image:
			'https://images.unsplash.com/photo-1584622650111-993a426fbf0a?q=80&w=1470&auto=format&fit=crop',
		stars: 4.8,
		likes: 126,
		address: 'Rua Bié, Huambo, HBO',
		description: 'Limpeza completa de residência com 3 quartos e 2 banheiros.',
		route: '/(services)/completed-service-details',
	},
	{
		id: 2,
		title: 'Limpeza de Tapetes',
		image:
			'https://images.unsplash.com/photo-1603848198135-5ace8c4a91c3?q=80&w=1374&auto=format&fit=crop',
		stars: 4.7,
		likes: 98,
		address: 'Cidade Alta, Huambo, HBO',
		description:
			'Limpeza profunda e higienização de tapetes de sala e quartos.',
		route: '/(services)/completed-service-details',
	},
	{
		id: 3,
		title: 'Limpeza Empresarial',
		image:
			'https://images.unsplash.com/photo-1600585152220-90363fe7e115?q=80&w=1470&auto=format&fit=crop',
		stars: 4.9,
		likes: 215,
		address: 'Rua dos Ministros, Huambo, HBO',
		description: 'Serviço completo de limpeza para escritório com 10 salas.',
		route: '/(services)/completed-service-details',
	},
	{
		id: 4,
		title: 'Limpeza de Sofás',
		image:
			'https://images.unsplash.com/photo-1493663284031-b7e3aefcae8e?q=80&w=1470&auto=format&fit=crop',
		stars: 4.6,
		likes: 87,
		address: 'Lossambo, Huambo, HBO',
		description:
			'Higienização e limpeza profunda de sofá de 4 lugares e 2 poltronas.',
		route: '/(services)/completed-service-details',
	},
]

type Service = {
	id: number
	service?: string
	icon?: any
	route?: string
	title?: string
	image?: string
	description?: string
	stars?: number
	likes?: number
	address?: string
}

type CompletedService = {
	id: number
	title: string
	image: string
	description: string
	stars: number
	likes: number
	route?: string
}

type SearchResultsModalProps = {
	visible: boolean
	onClose: () => void
}

const SeparatorList = ({ title }: { title: string }) => {
	return (
		<View
			style={{
				paddingBottom: 16,
				flexDirection: 'row',
				gap: 10,
				flex: 1,
				alignItems: 'center',
			}}
		>
			<View style={{ flex: 0 }}>
				<Text
					style={{
						fontSize: FontSize.xsB,
						fontFamily: fontFamily.poppins.medium,
						color: '#172B4D',
					}}
				>
					{title}
				</Text>
			</View>
			<View style={{ flex: 1, height: 1, backgroundColor: '#E0E0E0' }} />
		</View>
	)
}

const SearchResultsModal = ({ visible, onClose }: SearchResultsModalProps) => {
	const [searchTerm, setSearchTerm] = useState('')

	const filteredServices = useMemo(() => {
		if (!searchTerm) return []
		const term = searchTerm.toLowerCase()
		return services.filter(service =>
			service.service.toLowerCase().includes(term),
		)
	}, [searchTerm])

	const filteredCompletedServices = useMemo(() => {
		if (!searchTerm) return []
		const term = searchTerm.toLowerCase()
		return completedServices.filter(
			service =>
				service.title.toLowerCase().includes(term) ||
				service.description.toLowerCase().includes(term),
		)
	}, [searchTerm])

	const handleSearch = (term: string) => {
		setSearchTerm(term)
	}

	const allResults = [...filteredServices, ...filteredCompletedServices]
	const renderItem = ({ item, index }: { item: Service; index: number }) => {
		const isService = item.service !== undefined

		const handlePress = () => {
			router.push({
				pathname: item.route as any,
				params: { id: item.id },
			})
			onClose()
		}

		const isFirstService =
			isService && !allResults.slice(0, index).some(i => 'service' in i)
		const isFirstCompletedService =
			!isService && !allResults.slice(0, index).some(i => !('service' in i))

		return (
			<>
				{isFirstService && <SeparatorList title="💎 Nossos Serviços" />}

				{isFirstCompletedService && (
					<SeparatorList title="⌛️ Serviços realizados" />
				)}

				<TouchableOpacity
					style={styles.resultItem}
					onPress={handlePress}
					activeOpacity={0.7}
				>
					{isService ? (
						<View style={styles.serviceItem}>
							<FastImage
								source={item.icon}
								style={styles.serviceIcon}
								resizeMode={FastImage.resizeMode.contain}
							/>
							<View style={styles.serviceInfo}>
								<Text style={styles.serviceName}>{item.service}</Text>
							</View>
						</View>
					) : (
						<View style={styles.completedServiceItem}>
							<FastImage
								source={{ uri: item.image }}
								style={styles.completedServiceImage}
								resizeMode={FastImage.resizeMode.cover}
							/>
							<View style={styles.completedServiceInfo}>
								<Text style={styles.completedServiceTitle}>{item.title}</Text>
								<Text
									style={styles.completedServiceDescription}
									numberOfLines={2}
								>
									{item.description}
								</Text>
								<View style={styles.ratingContainer}>
									<Ionicons name="star" size={16} color="#fbd602" />
									<Text style={styles.ratingText}>{item.stars}</Text>
									<Text style={styles.likesText}>({item.likes})</Text>
								</View>
							</View>
						</View>
					)}
				</TouchableOpacity>
			</>
		)
	}

	const keyExtractor = (item: Service | CompletedService) => {
		return item.id.toString() + item.title
	}

	return (
		<Modal
			visible={visible}
			animationType="slide"
			transparent={true}
			onRequestClose={onClose}
		>
			<View style={styles.modalContainer}>
				<View style={styles.modalContent}>
					<View style={styles.header}>
						<Text style={styles.title}>Encontre os serviços</Text>
						<View style={styles.closeButtonContainer}>
							<TouchableOpacity onPress={onClose} style={styles.closeButton}>
								<Ionicons name="close" size={18} color="rgba(0, 0, 0, 0.5)" />
							</TouchableOpacity>
						</View>
					</View>

					<View
						style={{
							flexDirection: 'row',
							gap: 16,
							alignItems: 'center',
							padding: 16,
						}}
					>
						<TextInputUI
							type="text"
							placeholder="Pesquisar por serviços"
							icon="search-outline"
							value={searchTerm}
							onChangeText={handleSearch}
							style={{ flex: 1 }}
						/>
						<View style={styles.filterButtonContainer}>
							<TouchableOpacity>
								<Ionicons name="options-outline" size={24} color="#666D80" />
							</TouchableOpacity>
						</View>
					</View>

					{allResults.length > 0 ? (
						<>
							<FlatList
								data={allResults}
								renderItem={renderItem}
								keyExtractor={keyExtractor}
								showsVerticalScrollIndicator={false}
								contentContainerStyle={styles.listContent}
							/>
						</>
					) : (
						<View style={styles.noResultsContainer}>
							<Ionicons name="search-outline" size={48} color="#666D80" />
							<Text style={styles.noResultsText}>
								Nenhum resultado encontrado
							</Text>
						</View>
					)}
				</View>
			</View>
		</Modal>
	)
}

const styles = StyleSheet.create({
	modalContainer: {
		flex: 1,
		backgroundColor: 'rgba(0, 0, 0, 0.5)',
		justifyContent: 'flex-end',
	},

	rightContainer: {
		marginVertical: 16,
		padding: 12,
		backgroundColor: '#1A1B25',
		borderRadius: 14,
		borderWidth: 1,
		borderColor: '#262733',
		flexDirection: 'row',
		justifyContent: 'space-between',
		alignItems: 'center',
		width: width * 0.7,
	},
	inputText: {
		flex: 1,
		marginLeft: 10,
		fontSize: FontSize.xsB,
		fontFamily: fontFamily.poppins.regular,
		color: Colors.white,
		width: width * 0.7,
	},
	leftContainerRight: {
		flexDirection: 'row',
		alignItems: 'center',
		gap: 10,
	},
	rightContainerRightFilter: {
		borderLeftWidth: 1,
		borderLeftColor: '#262733',
		paddingLeft: 14,
	},

	modalContent: {
		backgroundColor: Colors.white,
		borderTopLeftRadius: 20,
		borderTopRightRadius: 20,
		height: height * 0.87,
	},
	header: {
		flexDirection: 'row',
		justifyContent: 'space-between',
		alignItems: 'center',
		paddingHorizontal: 16,
		marginBottom: 5,
		paddingTop: 16,
	},
	title: {
		fontSize: FontSize.base,
		fontFamily: fontFamily.poppins.semibold,
		color: '#172B4D',
	},
	closeButtonContainer: {
		backgroundColor: 'rgba(199, 17, 17, 0.58)',
		borderColor: 'rgba(199, 17, 17, 0.58)',
		borderWidth: 1,
		borderRadius: 12,
		width: 30,
		height: 30,
		alignItems: 'center',
		justifyContent: 'center',
	},
	filterButtonContainer: {
		backgroundColor: 'rgba(0, 0, 0, 0.1)',
		borderColor: 'rgba(0, 0, 0, 0.1)',
		borderWidth: 1,
		borderRadius: 15,
		width: 45,
		height: 45,
		alignItems: 'center',
		justifyContent: 'center',
		marginBottom: 12,
	},
	closeButton: {
		padding: 8,
		alignItems: 'center',
		justifyContent: 'center',
		width: 35,
		height: 35,
	},
	listContent: {
		paddingHorizontal: 16,
		paddingBottom: 20,
	},
	resultItem: {
		marginBottom: 16,
		backgroundColor: '#fff',
		borderRadius: 10,
		borderColor: 'rgba(0, 0, 0, 0.1)',
		borderWidth: 1.2,
		shadowRadius: 3.84,
		elevation: 5,
	},
	serviceItem: {
		flexDirection: 'row',
		alignItems: 'center',
		padding: 12,
	},
	serviceIcon: {
		width: 40,
		height: 40,
		borderRadius: 3,
	},
	serviceInfo: {
		marginLeft: 12,
		flex: 1,
	},
	serviceName: {
		fontSize: FontSize.sm,
		fontFamily: fontFamily.poppins.semibold,
		color: '#172B4D',
	},
	completedServiceItem: {
		flexDirection: 'row',
		//borderRadius: 12,
		overflow: 'hidden',
	},
	completedServiceImage: {
		width: 90,
		height: '100%',
		borderBottomLeftRadius: 8,
		borderTopLeftRadius: 8,
	},
	completedServiceInfo: {
		flex: 1,
		padding: 12,
	},
	completedServiceTitle: {
		fontSize: FontSize.sm,
		fontFamily: fontFamily.poppins.semibold,
		color: '#172B4D',
		marginBottom: 2,
	},
	completedServiceDescription: {
		fontSize: FontSize.xs,
		fontFamily: fontFamily.poppins.regular,
		color: '#666D80',
		marginBottom: 4,
	},
	ratingContainer: {
		flexDirection: 'row',
		alignItems: 'center',
	},
	ratingText: {
		marginLeft: 4,
		fontSize: FontSize.xs,
		fontFamily: fontFamily.poppins.medium,
		color: '#172B4D',
	},
	likesText: {
		marginLeft: 4,
		fontSize: FontSize.xs,
		fontFamily: fontFamily.poppins.regular,
		color: '#666D80',
	},
	noResultsContainer: {
		flex: 1,
		alignItems: 'center',
		justifyContent: 'center',
		paddingBottom: height * 0.1,
	},
	noResultsText: {
		marginTop: 16,
		fontSize: FontSize.sm,
		fontFamily: fontFamily.poppins.medium,
		color: '#666D80',
		textAlign: 'center',
	},
})

export default SearchResultsModal
