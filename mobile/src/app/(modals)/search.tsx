import React, { useMemo, useState } from 'react'
import {
	View,
	Text,
	StyleSheet,
	TouchableOpacity,
	Dimensions,
	ScrollView,
} from 'react-native'
import { Ionicons } from '@expo/vector-icons'
import FastImage from 'react-native-fast-image'
import { router } from 'expo-router'
import TextInputUI from '@/src/components/ui/TextInput'
import { useCustomTheme } from '@/src/context/ThemeContext'
import { Theme } from '@/src/types/theme'
import CompletedServiceCard from '@/src/components/front/CompletedServiceCard'
const { width, height } = Dimensions.get('window')
const services = [
	{
		id: 1,
		icon: require('../../../assets/icons/light/empregada_domestica.png'),
		iconDark: require('../../../assets/icons/dark/empregada_domestica.png'),
		service: 'Empregada Doméstica',
		route: '/service-details',
		name: 'Empregada Doméstica',
		image: require('../../../assets/empresa/empregada.png'),
		rating: 4.7,
		reviews: 124,
		tags: ['Limpeza', 'Empregada', 'Doméstica', 'Residência'],
		description:
			'Profissionais experientes para cuidar da limpeza completa da sua residência. Os preços aplicam-se aos serviços de limpeza de residências e domésticos, com diferentes planos para atender às necessidades.',
		duration: '2-4h',
		professionals: 250,
		services: 2500,
		benefits: [
			'Garantia de satisfação',
			'Profissionais verificados',
			'Agendamento flexível',
			'Produtos de qualidade',
		],
		activities: [
			'Limpeza Geral',
			'Higienização da Roupa',
			'Limpeza de 4 divisões',
		],
		price: 50000,
		tag: 'Popular',
		plan: {
			diario: {
				id: 1,
				title: 'Diário',
				subplan: [
					{
						id: 1,
						title: 'Básico',
						price: 50000,
						type: 'Popular',
						description: 'Ideal para famílias com um agregado reduzido.',
						activities: [
							'Limpeza Geral',
							'Higienização da Roupa',
							'Limpeza de 4 divisões',
						],
					},
					{
						id: 2,
						title: 'Pro',
						type: 'Recomendado',
						price: 65000,
						description: 'Ideal para famílias com 5 a 6 membros.',
						activities: [
							'Tudo do Plano Básico',
							'Preparo de duas Refeições',
							'Limpeza de Janelas',
						],
					},
					{
						id: 3,
						title: 'Premium',
						type: 'Melhor Valor',
						price: 80000,
						description: 'Ideal para famílias com mais de 6 membros.',
						activities: [
							'Tudo do Plano Pro',
							'Cuidar de Crianças',
							'Organização de Armários',
							'Limpeza Profunda',
						],
					},
				],
			},
			semanal: {
				title: 'Semanal',
				price: 100000,
			},
		},
		comments: [
			{
				id: 1,
				name: 'João Silva',
				image: 'https://randomuser.me/api/portraits/men/5.jpg',
				rating: 5,
				text: 'Excelente serviço, muito profissional e pontual! As limpezas são sempre perfeitas e a equipe é muito atenciosa.',
				date: '15/03/2023',
				likes: 12,
			},
			{
				id: 2,
				name: 'Maria Oliveira',
				image: 'https://randomuser.me/api/portraits/women/17.jpg',
				rating: 4,
				text: 'Muito bom, mas poderia melhorar na pontualidade. A qualidade do serviço é excelente.',
				date: '22/05/2023',
				likes: 8,
			},
			{
				id: 3,
				name: 'Carlos Mendes',
				image: 'https://randomuser.me/api/portraits/men/32.jpg',
				rating: 5,
				text: 'Serviço impecável! A profissional foi muito atenciosa e deixou minha casa extremamente limpa e organizada.',
				date: '10/07/2023',
				likes: 15,
			},
			{
				id: 4,
				name: 'Ana Beatriz',
				image: 'https://randomuser.me/api/portraits/women/28.jpg',
				rating: 5,
				text: 'Contratei o serviço mensal e estou muito satisfeita. Vale cada kwanza investido!',
				date: '03/09/2023',
				likes: 9,
			},
		],
	},
	{
		id: 2,
		icon: require('../../../assets/icons/light/limpeza_residencial.png'),
		iconDark: require('../../../assets/icons/dark/limpeza_residencial.png'),
		service: 'Limpeza de Residência',
		route: '/service-details',
		name: 'Limpeza de Residência',
		image: require('../../../assets/empresa/empregada.png'),
		rating: 4.7,
		reviews: 124,
		tags: ['Limpeza', 'Empregada', 'Doméstica', 'Residência'],
		description:
			'Profissionais experientes para cuidar da limpeza completa da sua residência. Os preços aplicam-se aos serviços de limpeza de residências e domésticos, com diferentes planos para atender às necessidades.',
		duration: '2-4h',
		professionals: 250,
		services: 2500,
		benefits: [
			'Garantia de satisfação',
			'Profissionais verificados',
			'Agendamento flexível',
			'Produtos de qualidade',
		],
		activities: [
			'Limpeza Geral',
			'Higienização da Roupa',
			'Limpeza de 4 divisões',
		],
		price: 50000,
		tag: 'Popular',
		plan: {
			diario: {
				id: 1,
				title: 'Diário',
				subplan: [
					{
						id: 1,
						title: 'Básico',
						price: 50000,
						type: 'Popular',
						description: 'Ideal para famílias com um agregado reduzido.',
						activities: [
							'Limpeza Geral',
							'Higienização da Roupa',
							'Limpeza de 4 divisões',
						],
					},
					{
						id: 2,
						title: 'Pro',
						type: 'Recomendado',
						price: 65000,
						description: 'Ideal para famílias com 5 a 6 membros.',
						activities: [
							'Tudo do Plano Básico',
							'Preparo de duas Refeições',
							'Limpeza de Janelas',
						],
					},
					{
						id: 3,
						title: 'Premium',
						type: 'Melhor Valor',
						price: 80000,
						description: 'Ideal para famílias com mais de 6 membros.',
						activities: [
							'Tudo do Plano Pro',
							'Cuidar de Crianças',
							'Organização de Armários',
							'Limpeza Profunda',
						],
					},
				],
			},
			semanal: {
				title: 'Semanal',
				price: 100000,
			},
		},
		comments: [
			{
				id: 1,
				name: 'João Silva',
				image: 'https://randomuser.me/api/portraits/men/5.jpg',
				rating: 5,
				text: 'Excelente serviço, muito profissional e pontual! As limpezas são sempre perfeitas e a equipe é muito atenciosa.',
				date: '15/03/2023',
				likes: 12,
			},
			{
				id: 2,
				name: 'Maria Oliveira',
				image: 'https://randomuser.me/api/portraits/women/17.jpg',
				rating: 4,
				text: 'Muito bom, mas poderia melhorar na pontualidade. A qualidade do serviço é excelente.',
				date: '22/05/2023',
				likes: 8,
			},
			{
				id: 3,
				name: 'Carlos Mendes',
				image: 'https://randomuser.me/api/portraits/men/32.jpg',
				rating: 5,
				text: 'Serviço impecável! A profissional foi muito atenciosa e deixou minha casa extremamente limpa e organizada.',
				date: '10/07/2023',
				likes: 15,
			},
			{
				id: 4,
				name: 'Ana Beatriz',
				image: 'https://randomuser.me/api/portraits/women/28.jpg',
				rating: 5,
				text: 'Contratei o serviço mensal e estou muito satisfeita. Vale cada kwanza investido!',
				date: '03/09/2023',
				likes: 9,
			},
		],
	},
	{
		id: 3,
		icon: require('../../../assets/icons/light/tratamento_jardim.png'),
		iconDark: require('../../../assets/icons/dark/tratamento_jardim.png'),
		service: 'Tratamento de Jardim',
		route: '/service-details',
		name: 'Tratamento de Jardim',
		image: require('../../../assets/empresa/jardim.png'),
		rating: 4.7,
		reviews: 124,
		tags: ['Limpeza', 'Jardim', 'Tratamento', 'Jardim'],
		description:
			'Profissionais experientes para cuidar da limpeza completa da sua residência. Os preços aplicam-se aos serviços de limpeza de residências e domésticos, com diferentes planos para atender às necessidades.',
		duration: '2-4h',
		professionals: 250,
		services: 2500,
		benefits: [
			'Garantia de satisfação',
			'Profissionais verificados',
			'Agendamento flexível',
			'Produtos de qualidade',
		],
		activities: [
			'Limpeza Geral',
			'Higienização da Roupa',
			'Limpeza de 4 divisões',
		],
		price: 50000,
		tag: 'Popular',
		plan: {
			diario: {
				id: 1,
				title: 'Diário',
				subplan: [
					{
						id: 1,
						title: 'Básico',
						price: 50000,
						type: 'Popular',
						description: 'Ideal para famílias com um agregado reduzido.',
						activities: [
							'Limpeza Geral',
							'Higienização da Roupa',
							'Limpeza de 4 divisões',
						],
					},
					{
						id: 2,
						title: 'Pro',
						type: 'Recomendado',
						price: 65000,
						description: 'Ideal para famílias com 5 a 6 membros.',
						activities: [
							'Tudo do Plano Básico',
							'Preparo de duas Refeições',
							'Limpeza de Janelas',
						],
					},
					{
						id: 3,
						title: 'Premium',
						type: 'Melhor Valor',
						price: 80000,
						description: 'Ideal para famílias com mais de 6 membros.',
						activities: [
							'Tudo do Plano Pro',
							'Cuidar de Crianças',
							'Organização de Armários',
							'Limpeza Profunda',
						],
					},
				],
			},
			semanal: {
				title: 'Semanal',
				price: 100000,
			},
		},
		comments: [
			{
				id: 1,
				name: 'João Silva',
				image: 'https://randomuser.me/api/portraits/men/5.jpg',
				rating: 5,
				text: 'Excelente serviço, muito profissional e pontual! As limpezas são sempre perfeitas e a equipe é muito atenciosa.',
				date: '15/03/2023',
				likes: 12,
			},
			{
				id: 2,
				name: 'Maria Oliveira',
				image: 'https://randomuser.me/api/portraits/women/17.jpg',
				rating: 4,
				text: 'Muito bom, mas poderia melhorar na pontualidade. A qualidade do serviço é excelente.',
				date: '22/05/2023',
				likes: 8,
			},
			{
				id: 3,
				name: 'Carlos Mendes',
				image: 'https://randomuser.me/api/portraits/men/32.jpg',
				rating: 5,
				text: 'Serviço impecável! A profissional foi muito atenciosa e deixou minha casa extremamente limpa e organizada.',
				date: '10/07/2023',
				likes: 15,
			},
			{
				id: 4,
				name: 'Ana Beatriz',
				image: 'https://randomuser.me/api/portraits/women/28.jpg',
				rating: 5,
				text: 'Contratei o serviço mensal e estou muito satisfeita. Vale cada kwanza investido!',
				date: '03/09/2023',
				likes: 9,
			},
		],
	},
	{
		id: 4,
		icon: require('../../../assets/icons/light/limpeza_cadeiroes.png'),
		iconDark: require('../../../assets/icons/dark/limpeza_cadeiroes.png'),
		service: 'Limpeza de Cadeirões',
		route: '/service-details',
		image: require('../../../assets/empresa/cadeiroes.png'),
		name: 'Limpeza de Cadeirões',
		tags: ['Limpeza', 'Cadeiroes', 'Cadeirão', 'Residência'],
		rating: 4.7,
		reviews: 124,
		description:
			'Profissionais experientes para cuidar da limpeza completa da sua residência. Os preços aplicam-se aos serviços de limpeza de residências e domésticos, com diferentes planos para atender às necessidades.',
		duration: '2-4h',
		professionals: 250,
		services: 2500,
		benefits: [
			'Garantia de satisfação',
			'Profissionais verificados',
			'Agendamento flexível',
			'Produtos de qualidade',
		],
		activities: [
			'Limpeza Geral',
			'Higienização da Roupa',
			'Limpeza de 4 divisões',
		],
		price: 50000,
		tag: 'Popular',
		plan: {
			diario: {
				id: 1,
				title: 'Diário',
				subplan: [
					{
						id: 1,
						title: 'Básico',
						price: 50000,
						type: 'Popular',
						description: 'Ideal para famílias com um agregado reduzido.',
						activities: [
							'Limpeza Geral',
							'Higienização da Roupa',
							'Limpeza de 4 divisões',
						],
					},
					{
						id: 2,
						title: 'Pro',
						type: 'Recomendado',
						price: 65000,
						description: 'Ideal para famílias com 5 a 6 membros.',
						activities: [
							'Tudo do Plano Básico',
							'Preparo de duas Refeições',
							'Limpeza de Janelas',
						],
					},
					{
						id: 3,
						title: 'Premium',
						type: 'Melhor Valor',
						price: 80000,
						description: 'Ideal para famílias com mais de 6 membros.',
						activities: [
							'Tudo do Plano Pro',
							'Cuidar de Crianças',
							'Organização de Armários',
							'Limpeza Profunda',
						],
					},
				],
			},
			semanal: {
				title: 'Semanal',
				price: 100000,
			},
		},
		comments: [
			{
				id: 1,
				name: 'João Silva',
				image: 'https://randomuser.me/api/portraits/men/5.jpg',
				rating: 5,
				text: 'Excelente serviço, muito profissional e pontual! As limpezas são sempre perfeitas e a equipe é muito atenciosa.',
				date: '15/03/2023',
				likes: 12,
			},
			{
				id: 2,
				name: 'Maria Oliveira',
				image: 'https://randomuser.me/api/portraits/women/17.jpg',
				rating: 4,
				text: 'Muito bom, mas poderia melhorar na pontualidade. A qualidade do serviço é excelente.',
				date: '22/05/2023',
				likes: 8,
			},
			{
				id: 3,
				name: 'Carlos Mendes',
				image: 'https://randomuser.me/api/portraits/men/32.jpg',
				rating: 5,
				text: 'Serviço impecável! A profissional foi muito atenciosa e deixou minha casa extremamente limpa e organizada.',
				date: '10/07/2023',
				likes: 15,
			},
			{
				id: 4,
				name: 'Ana Beatriz',
				image: 'https://randomuser.me/api/portraits/women/28.jpg',
				rating: 5,
				text: 'Contratei o serviço mensal e estou muito satisfeita. Vale cada kwanza investido!',
				date: '03/09/2023',
				likes: 9,
			},
		],
	},
	{
		id: 5,
		icon: require('../../../assets/icons/light/limpeza_empresa.png'),
		iconDark: require('../../../assets/icons/dark/limpeza_empresa.png'),
		service: 'Limpeza Empresarial',
		route: '/service-details',
		image: require('../../../assets/empresa/empresa.png'),
		name: 'Limpeza Empresarial',
		rating: 4.7,
		reviews: 124,
		tags: ['Limpeza', 'Empresa', 'Empresarial'],
		description:
			'Profissionais experientes para cuidar da limpeza completa da sua residência. Os preços aplicam-se aos serviços de limpeza de residências e domésticos, com diferentes planos para atender às necessidades.',
		duration: '2-4h',
		professionals: 250,
		services: 2500,
		benefits: [
			'Garantia de satisfação',
			'Profissionais verificados',
			'Agendamento flexível',
			'Produtos de qualidade',
		],
		activities: [
			'Limpeza Geral',
			'Higienização da Roupa',
			'Limpeza de 4 divisões',
		],
		price: 50000,
		tag: 'Popular',
		plan: {
			diario: {
				id: 1,
				title: 'Diário',
				subplan: [
					{
						id: 1,
						title: 'Básico',
						price: 50000,
						type: 'Popular',
						description: 'Ideal para famílias com um agregado reduzido.',
						activities: [
							'Limpeza Geral',
							'Higienização da Roupa',
							'Limpeza de 4 divisões',
						],
					},
					{
						id: 2,
						title: 'Pro',
						type: 'Recomendado',
						price: 65000,
						description: 'Ideal para famílias com 5 a 6 membros.',
						activities: [
							'Tudo do Plano Básico',
							'Preparo de duas Refeições',
							'Limpeza de Janelas',
						],
					},
					{
						id: 3,
						title: 'Premium',
						type: 'Melhor Valor',
						price: 80000,
						description: 'Ideal para famílias com mais de 6 membros.',
						activities: [
							'Tudo do Plano Pro',
							'Cuidar de Crianças',
							'Organização de Armários',
							'Limpeza Profunda',
						],
					},
				],
			},
			semanal: {
				title: 'Semanal',
				price: 100000,
			},
		},
		comments: [
			{
				id: 1,
				name: 'João Silva',
				image: 'https://randomuser.me/api/portraits/men/5.jpg',
				rating: 5,
				text: 'Excelente serviço, muito profissional e pontual! As limpezas são sempre perfeitas e a equipe é muito atenciosa.',
				date: '15/03/2023',
				likes: 12,
			},
			{
				id: 2,
				name: 'Maria Oliveira',
				image: 'https://randomuser.me/api/portraits/women/17.jpg',
				rating: 4,
				text: 'Muito bom, mas poderia melhorar na pontualidade. A qualidade do serviço é excelente.',
				date: '22/05/2023',
				likes: 8,
			},
			{
				id: 3,
				name: 'Carlos Mendes',
				image: 'https://randomuser.me/api/portraits/men/32.jpg',
				rating: 5,
				text: 'Serviço impecável! A profissional foi muito atenciosa e deixou minha casa extremamente limpa e organizada.',
				date: '10/07/2023',
				likes: 15,
			},
			{
				id: 4,
				name: 'Ana Beatriz',
				image: 'https://randomuser.me/api/portraits/women/28.jpg',
				rating: 5,
				text: 'Contratei o serviço mensal e estou muito satisfeita. Vale cada kwanza investido!',
				date: '03/09/2023',
				likes: 9,
			},
		],
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
	iconDark?: any
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

const SeparatorList = ({ title, theme }: { title: string; theme: Theme }) => {
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
						fontSize: theme.size.xsB,
						fontFamily: theme.fonts.medium.fontFamily,
						color: theme.colors.text,
					}}
				>
					{title}
				</Text>
			</View>
			<View
				style={{ flex: 1, height: 1, backgroundColor: theme.colors.border }}
			/>
		</View>
	)
}

const SearchResultsModal = ({ visible, onClose }: SearchResultsModalProps) => {
	const [searchTerm, setSearchTerm] = useState('')

	const { theme } = useCustomTheme()

	const styles = useStyles(theme)

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

		if (isService) {
			return (
				<>
					{isFirstService && (
						<SeparatorList theme={theme} title="💎 Nossos Serviços" />
					)}
					<TouchableOpacity
						style={styles.resultItem}
						onPress={handlePress}
						activeOpacity={0.7}
					>
						<View style={styles.serviceItem}>
							<FastImage
								source={theme.dark ? item.iconDark : item.icon}
								style={styles.serviceIcon}
								resizeMode={FastImage.resizeMode.contain}
							/>
							<View style={styles.serviceInfo}>
								<Text style={styles.serviceName}>{item.service}</Text>
							</View>
						</View>
					</TouchableOpacity>
				</>
			)
		}

		// For completed services
		const isEvenIndex = index % 2 === 0

		return (
			<>
				{isFirstCompletedService && (
					<View style={{ width: '100%' }}>
						<SeparatorList theme={theme} title="⌛️ Serviços realizados" />
					</View>
				)}
				<View style={styles.completedServicesWrapper}>
					<TouchableOpacity
						style={[
							styles.completedServiceItem,
							isEvenIndex ? styles.leftItem : styles.rightItem,
						]}
						onPress={handlePress}
						activeOpacity={0.7}
					>
						<FastImage
							source={{ uri: item.image }}
							resizeMode={FastImage.resizeMode.cover}
						/>
						<View style={styles.completedServiceInfo}>
							<Text style={styles.completedServiceTitle} numberOfLines={1}>
								{item.title}
							</Text>
							<Text
								style={styles.completedServiceDescription}
								numberOfLines={2}
							>
								{item.description}
							</Text>
							<View style={styles.ratingContainer}>
								<Ionicons name="star" size={14} color="#fbd602" />
								<Text style={styles.ratingText}>{item.stars}</Text>
								<Text style={styles.likesText}>({item.likes})</Text>
							</View>
						</View>
					</TouchableOpacity>
				</View>
			</>
		)
	}

	return (
		<>
			<View style={styles.modalContainer}>
				<View style={styles.modalContent}>
					<View style={styles.searchContainer}>
						<TextInputUI
							type="text"
							placeholder="Serviço, categoria, etc."
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

					<ScrollView
						style={styles.scrollContainer}
						showsVerticalScrollIndicator={false}
						contentContainerStyle={styles.scrollContent}
					>
						{allResults.length > 0 ? (
							<>
								{filteredServices.length > 0 && (
									<View style={styles.sectionContainer}>
										<SeparatorList theme={theme} title="💎 Nossos Serviços" />
										{filteredServices.map(item => (
											<TouchableOpacity
												key={item.id}
												style={styles.resultItem}
												onPress={() => {
													router.push({
														pathname: item.route as any,
														params: { id: item.id },
													})
													onClose()
												}}
												activeOpacity={0.7}
											>
												<View style={styles.serviceItem}>
													<FastImage
														source={item.icon}
														style={styles.serviceIcon}
														resizeMode={FastImage.resizeMode.contain}
													/>
													<View style={styles.serviceInfo}>
														<Text style={styles.serviceName}>
															{item.service}
														</Text>
													</View>
												</View>
											</TouchableOpacity>
										))}
									</View>
								)}

								{filteredCompletedServices.length > 0 && (
									<View style={styles.sectionContainer}>
										<SeparatorList
											theme={theme}
											title="⌛️ Serviços realizados"
										/>
										<View style={styles.completedServicesGrid}>
											{filteredCompletedServices.map((item, index) => (
												<CompletedServiceCard
													key={item.id}
													data={item}
													style={[
														styles.completedServiceItem,
														index % 2 === 0
															? styles.leftItem
															: styles.rightItem,
													]}
													styleContainer={styles.styleContainer}
													styleTitle={styles.completedServiceTitle}
												/>
											))}
										</View>
									</View>
								)}
							</>
						) : (
							<View style={styles.noResultsContainer}>
								<Ionicons name="search-outline" size={48} color="#666D80" />
								<Text style={styles.noResultsText}>
									Nenhum resultado encontrado
								</Text>
							</View>
						)}
					</ScrollView>
				</View>
			</View>
		</>
	)
}
{
	/* <TouchableOpacity
	key={item.id}
	style={[
		styles.completedServiceItem,
		index % 2 === 0
			? styles.leftItem
			: styles.rightItem,
	]}
	onPress={() => {
		router.push({
			pathname: item.route as any,
			params: { id: item.id },
		})
		onClose()
	}}
	activeOpacity={0.7}
>
	<FastImage
		source={{ uri: item.image }}
		style={styles.completedServiceImage}
		resizeMode={FastImage.resizeMode.cover}
	/>
	<View style={styles.completedServiceInfo}>
		<Text
			style={styles.completedServiceTitle}
			numberOfLines={1}
		>
			{item.title}
		</Text>
		<Text
			style={styles.completedServiceDescription}
			numberOfLines={2}
		>
			{item.description}
		</Text>
		<View style={styles.ratingContainer}>
			<Ionicons name="star" size={14} color="#fbd602" />
			<Text style={styles.ratingText}>
				{item.stars}
			</Text>
			<Text style={styles.likesText}>
				({item.likes})
			</Text>
		</View>
		<View style={styles.likesContainer}>
			<View style={styles.likesContainer}>
				<Ionicons
					name="heart"
					size={14}
					color="#FF5959"
				/>
				<Text style={styles.likesText}>
					{item.likes}
				</Text>
			</View>
			<View style={styles.imageContainerLike}>
				<View style={styles.imageLikeView}>
					<FastImage
						source={{
							uri: 'https://randomuser.me/api/portraits/men/5.jpg',
						}}
						style={styles.likesImage}
						resizeMode={FastImage.resizeMode.cover}
					/>
				</View>
				<View style={styles.imageLikeView}>
					<FastImage
						source={{
							uri: 'https://randomuser.me/api/portraits/men/6.jpg',
						}}
						style={styles.likesImage}
						resizeMode={FastImage.resizeMode.cover}
					/>
				</View>
				<View style={styles.imageLikeView}>
					<FastImage
						source={{
							uri: 'https://randomuser.me/api/portraits/men/7.jpg',
						}}
						style={styles.likesImage}
						resizeMode={FastImage.resizeMode.cover}
					/>
				</View>
			</View>
		</View>
	</View>
</TouchableOpacity> */
}
const useStyles = (theme: Theme) =>
	StyleSheet.create({
		modalContainer: {},

		inputText: {
			flex: 1,
			marginLeft: 10,
			fontSize: theme.size.xsB,
			fontFamily: theme.fonts.regular.fontFamily,
			color: 'red',
			width: width * 0.7,
		},
		completedServiceTitle: {
			fontSize: theme.size.sm,
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
			backgroundColor: theme.colors.background,
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
			paddingVertical: 12,
			backgroundColor: 'rgba(201, 199, 199, 0.77)', //'rgba(28, 34, 44, 0.86)',
			borderTopLeftRadius: 20,
			borderTopRightRadius: 20,
		},
		title: {
			fontSize: theme.size.base,
			fontFamily: theme.fonts.semibold.fontFamily,
			color: theme.colors.text,
		},
		closeButtonContainer: {
			backgroundColor: 'rgba(214, 30, 30, 0.58)',
			borderColor: 'rgba(199, 17, 17, 0.58)',
			borderWidth: 1,
			borderRadius: 12,
			width: 30,
			height: 30,
			alignItems: 'center',
			justifyContent: 'center',
		},
		filterButtonContainer: {
			backgroundColor: theme.colors.ImputBackgroundColors, // 'rgba(0, 0, 0, 0.1)',
			borderColor: theme.colors.borderInput,
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
		searchContainer: {
			flexDirection: 'row',
			gap: 16,
			alignItems: 'center',
			padding: 16,
		},
		scrollContainer: {
			flex: 1,
		},
		scrollContent: {
			paddingHorizontal: 16,
			paddingBottom: 20,
		},
		sectionContainer: {
			marginBottom: 16,
		},
		completedServicesGrid: {
			flexDirection: 'row',
			flexWrap: 'wrap',
			justifyContent: 'space-between',
			marginTop: 8,
		},

		resultItem: {
			marginBottom: 16,
			backgroundColor: theme.colors.ImputBackgroundColors,
			borderColor: theme.colors.borderInput,
			borderRadius: 10,
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
			fontSize: theme.size.sm,
			fontFamily: theme.fonts.semibold.fontFamily,
			color: theme.colors.text,
		},
		completedServicesWrapper: {
			flexDirection: 'row',
			flexWrap: 'wrap',
			justifyContent: 'space-between',
			paddingHorizontal: 8,
		},
		completedServiceItem: {
			width: (width - 48) / 2, // Account for padding and gap
			backgroundColor: theme.colors.ImputBackgroundColors,
			borderColor: theme.colors.borderInput,
			borderRadius: 10,
			borderWidth: 1.2,
			marginBottom: 16,
			overflow: 'hidden',
		},
		leftItem: {
			marginRight: 4,
		},
		rightItem: {
			marginLeft: 4,
		},
		styleContainer: {
			height: 120,
		},
		completedServiceInfo: {
			padding: 8,
		},

		completedServiceDescription: {
			fontSize: theme.size.xs,
			fontFamily: theme.fonts.regular.fontFamily,
			color: theme.colors.colorIconInput,
			marginBottom: 4,
		},
		ratingContainer: {
			flexDirection: 'row',
			alignItems: 'center',
		},
		ratingText: {
			marginLeft: 4,
			fontSize: theme.size.xs,
			fontFamily: theme.fonts.medium.fontFamily,
			color: theme.colors.text,
		},
		likesText: {
			marginLeft: 4,
			fontSize: theme.size.xs,
			fontFamily: theme.fonts.regular.fontFamily,
			color: theme.colors.colorIconInput,
		},
		noResultsContainer: {
			flex: 1,
			alignItems: 'center',
			justifyContent: 'center',
			paddingBottom: height * 0.1,
		},
		noResultsText: {
			marginTop: 16,
			fontSize: theme.size.sm,
			fontFamily: theme.fonts.medium.fontFamily,
			color: '#666D80',
			textAlign: 'center',
		},
	})

export default SearchResultsModal
