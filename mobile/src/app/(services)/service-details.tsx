import { router, useLocalSearchParams } from 'expo-router'
import React, { useState, useRef } from 'react'
import {
	View,
	StyleSheet,
	Animated,
	Platform,
	TextInput,
	Pressable,
} from 'react-native'
import { TouchableOpacity,Text } from '@/src/components/Themed'
import FastImage from 'react-native-fast-image'
import { Ionicons } from '@expo/vector-icons'
import PlanCard from '@/src/components/front/PlanCard'
import { LinearGradient } from 'react-native-linear-gradient'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import ModalMessage from '@/src/components/modal/ModalMessage'
import { Separador } from '@/src/components/front/Separador'
import Star from '@/src/components/front/Star'
import { useCustomTheme } from '@/src/context/ThemeContext'
import { Theme } from '@/src/types/theme'
import { useCheckout } from '@/src/context/CheckoutContext'
import { Plan } from '@/src/types/plans'
import ServicesCompleted from '@/src/components/front/ServicesCompleted'

const HEADER_HEIGHT = 250
const HEADER_MIN_HEIGHT = Platform.OS === 'ios' ? 90 : 70

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
						tag: 'Mensal',
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
				title: 'Mensal',
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
						tag: 'Mensal',
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
				title: 'Mensal',
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
				title: 'Mensal',
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
				title: 'Mensal',
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
				title: 'Mensal',
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

export default function ServiceDetailsScreen() {
	const [isMonthly, setIsMonthly] = useState(false)
	const [showAllReviews, setShowAllReviews] = useState(false)
	const scrollY = useRef(new Animated.Value(0)).current
	const insets = useSafeAreaInsets()
	const [liked, setLiked] = useState(false)
	const [userRating, setUserRating] = useState(0)
	const [showRatingModal, setShowRatingModal] = useState(false)
	const [showCommentModal, setShowCommentModal] = useState(false)
	const [commentText, setCommentText] = useState('')
	const { id, origin } = useLocalSearchParams()
	const { theme } = useCustomTheme()

	const styles = useStyles(theme as Theme)

	const serviceId = typeof id === 'string' ? parseInt(id, 10) : 1
	const service = services.find(s => s.id === serviceId) || services[0]
	const { setPlan } = useCheckout()

	const handlePlanSelection = (plan: Plan) => {
		setPlan(plan)
		router.push('/(checkout)/address-select')
	}

	const getPrice = (basePrice: number) => {
		return isMonthly ? basePrice * 0.8 : basePrice // 20% desconto para planos mensais
	}

	const renderRating = (rating: number) => {
		return (
			<View style={styles.starContainer}>
				{[...Array(5)].map((_, index) => (
					<Ionicons
						key={index}
						name={index < rating ? 'star' : 'star-outline'}
						size={16}
						color="rgb(245, 194, 26)"
					/>
				))}
			</View>
		)
	}

	const visibleReviews = showAllReviews
		? service.comments
		: service.comments.slice(0, 2)

	const headerHeight = scrollY.interpolate({
		inputRange: [0, HEADER_HEIGHT - HEADER_MIN_HEIGHT],
		outputRange: [HEADER_HEIGHT, HEADER_MIN_HEIGHT],
		extrapolate: 'clamp',
	})

	const headerOpacity = scrollY.interpolate({
		inputRange: [0, HEADER_HEIGHT - HEADER_MIN_HEIGHT, HEADER_HEIGHT],
		outputRange: [1, 0.3, 0],
		extrapolate: 'clamp',
	})

	const titleOpacity = scrollY.interpolate({
		inputRange: [0, 60, 90],
		outputRange: [0, 0.5, 1],
		extrapolate: 'clamp',
	})

	const imageScale = scrollY.interpolate({
		inputRange: [-100, 0],
		outputRange: [1.2, 1],
		extrapolateLeft: 'extend',
		extrapolateRight: 'clamp',
	})

	const titleTranslate = scrollY.interpolate({
		inputRange: [0, HEADER_HEIGHT - HEADER_MIN_HEIGHT],
		outputRange: [0, -50],
		extrapolate: 'clamp',
	})

	const handleLike = () => {
		setLiked(!liked)
	}

	const handleRating = (rating: number) => {
		setUserRating(rating)
	}

	const handleCommentSubmit = () => {
		if (commentText.trim()) {
			setCommentText('')
			setShowCommentModal(false)
		}
	}

	const renderUserRatingStars = () => {
		return (
			<View style={styles.userRatingContainer}>
				{[...Array(5)].map((_, index) => (
					<TouchableOpacity
						type="tertiary"
						key={index}
						onPress={() => handleRating(index + 1)}
						style={styles.userRatingStar}
					>
						<Ionicons
							name={index < userRating ? 'star' : 'star-outline'}
							size={32}
							color={index < userRating ? 'rgb(245, 194, 26)' : '#aaa'}
						/>
					</TouchableOpacity>
				))}
			</View>
		)
	}
	return (
		<>
			<View style={styles.container}>
				<Animated.View
					style={[
						styles.stickyHeader,
						origin === 'search'
							? {
									paddingVertical: 10,
									opacity: titleOpacity,
								}
							: {
									height: HEADER_MIN_HEIGHT + 10,
									paddingTop: insets.top,
									paddingVertical: 10,
									opacity: titleOpacity,
								},
					]}
				>
					<TouchableOpacity
						type="tertiary"
						style={styles.backButtonSticky}
						onPress={() => router.back()}
					>
						<Ionicons name="chevron-back" size={20} color={theme.colors.text} />
					</TouchableOpacity>
					<Animated.Text
						style={[styles.stickyTitle, { opacity: titleOpacity }]}
						numberOfLines={1}
					>
						{service.name}
					</Animated.Text>
				</Animated.View>

				<Animated.ScrollView
					showsVerticalScrollIndicator={false}
					scrollEventThrottle={16}
					onScroll={Animated.event(
						[{ nativeEvent: { contentOffset: { y: scrollY } } }],
						{ useNativeDriver: false },
					)}
					contentContainerStyle={{ paddingTop: 0 }}
				>
					<Animated.View
						style={[
							styles.imageContainer,
							{
								height: headerHeight,
								opacity: headerOpacity,
							},
						]}
					>
						<Animated.View
							style={{
								transform: [{ scale: imageScale }],
							}}
						>
							<FastImage
								source={service.image}
								style={styles.headerImage}
								resizeMode={FastImage.resizeMode.cover}
							/>
						</Animated.View>
						<LinearGradient
							colors={['rgba(0,0,0,0.7)', 'transparent']}
							style={styles.gradient}
						/>
						<TouchableOpacity
							style={[styles.backButton, { top: insets.top + 10 }]}
							onPress={() => router.back()}
						>
							<Ionicons name="chevron-back" size={24} color="#fff" />
						</TouchableOpacity>

						<Animated.View
							style={[
								styles.imageOverlay,
								{
									transform: [{ translateY: titleTranslate }],
								},
							]}
						>
							<Text style={styles.serviceTitle}>{service.name}</Text>

							<View style={{ flexDirection: 'row', alignItems: 'center' }}>
								<Star rating={service.rating} />
							</View>
						</Animated.View>
					</Animated.View>

					<View style={styles.mainContent}>
						<View style={styles.engagementContainer}>
							<TouchableOpacity
								type="tertiary"
								style={styles.engagementButton}
								onPress={handleLike}
							>
								<Ionicons
									name={liked ? 'heart' : 'heart-outline'}
									size={24}
									color={liked ? '#FF5959' : theme.colors.text}
								/>
								<Text style={styles.engagementText}>Amar</Text>
							</TouchableOpacity>

							<TouchableOpacity
								type="tertiary"
								style={styles.engagementButton}
								onPress={() => setShowRatingModal(true)}
							>
								<Ionicons
									name={userRating > 0 ? 'star' : 'star-outline'}
									size={24}
									color={
										userRating > 0 ? 'rgb(245, 194, 26)' : theme.colors.text
									}
								/>
								<Text style={styles.engagementText}>Avaliar</Text>
							</TouchableOpacity>

							<TouchableOpacity
								type="tertiary"
								style={styles.engagementButton}
								onPress={() => setShowCommentModal(true)}
							>
								<Ionicons
									name="chatbox-outline"
									size={24}
									color={theme.colors.text}
								/>
								<Text style={styles.engagementText}>Comentar</Text>
							</TouchableOpacity>
						</View>

						<View style={styles.infoCard}>
							<Text style={styles.descriptionTitle}>Sobre o serviço</Text>
							<Text style={styles.description}>{service.description}</Text>

							<View style={styles.statsContainer}>
								<View style={styles.statItem}>
									<Ionicons
										name="timer"
										size={20}
										color={theme.colors.colorIconInput}
									/>
									<Text style={styles.statValue}>{service.duration}</Text>
									<Text style={styles.statLabel}>Duração</Text>
								</View>
								<View style={styles.statItem}>
									<Ionicons
										name="people"
										size={20}
										color={theme.colors.colorIconInput}
									/>
									<Text style={styles.statValue}>{service.professionals}</Text>
									<Text style={styles.statLabel}>Profissionais</Text>
								</View>
								<View style={styles.statItem}>
									<Ionicons
										name="home"
										size={20}
										color={theme.colors.colorIconInput}
									/>
									<Text style={styles.statValue}>{service.services}</Text>
									<Text style={styles.statLabel}>Serviços</Text>
								</View>
							</View>
						</View>
						<Separador text="Benefícios" />
						<View style={styles.benefitsSection}>
							{service.benefits
								.reduce<Array<Array<(typeof service.benefits)[0]>>>(
									(rows, item, index) => {
										if (index % 2 === 0) {
											rows.push([item])
										} else {
											rows[rows.length - 1].push(item)
										}
										return rows
									},
									[],
								)
								.map((row, rowIndex) => (
									<View style={styles.benefitRow} key={rowIndex}>
										{row.map((benefit, index) => (
											<View style={styles.benefitItem} key={index}>
												<Ionicons
													name="shield-checkmark"
													size={20}
													color={theme.colors.primary}
												/>
												<Text style={styles.benefitText}>{benefit}</Text>
											</View>
										))}
									</View>
								))}

							<View style={styles.benefitRow}>
								<View style={styles.benefitItem}>
									<Ionicons
										name="shield-checkmark"
										size={24}
										color={theme.colors.primary}
									/>
									<Text style={styles.benefitText}>Garantia de satisfação</Text>
								</View>
								<View style={styles.benefitItem}>
									<Ionicons
										name="people"
										size={24}
										color={theme.colors.primary}
									/>
									<Text style={styles.benefitText}>
										Profissionais verificados
									</Text>
								</View>
							</View>
							<View style={styles.benefitRow}>
								<View style={styles.benefitItem}>
									<Ionicons
										name="calendar"
										size={24}
										color={theme.colors.primary}
									/>
									<Text style={styles.benefitText}>Agendamento flexível</Text>
								</View>
								<View style={styles.benefitItem}>
									<Ionicons
										name="sparkles"
										size={24}
										color={theme.colors.primary}
									/>
									<Text style={styles.benefitText}>Produtos de qualidade</Text>
								</View>
							</View>
						</View>

						<Separador text="Serviços realizados" />

						<ServicesCompleted services={services.slice(0, 2)} />

						<Separador text="Planos disponíveis" />
						<View style={styles.periodSelector}>
							<TouchableOpacity
								type="tertiary"
								onPress={() => setIsMonthly(false)}
								style={[styles.periodOptionContainer]}
							>
								<Text
									style={[
										styles.periodOption,
										!isMonthly && styles.periodOptionActive,
									]}
								>
									{service.plan.diario.title}
								</Text>
							</TouchableOpacity>
							<TouchableOpacity
								type="tertiary"
								onPress={() => setIsMonthly(true)}
								style={[styles.periodOptionContainer]}
							>
								<Text
									style={[
										styles.periodOption,
										isMonthly && styles.periodOptionActive,
									]}
								>
									{service.plan.semanal.title}
								</Text>
							</TouchableOpacity>
						</View>

						<View style={{ marginHorizontal: 16 }}>
							{service.plan.diario.subplan.map((subplan, index) => (
								<PlanCard
									key={index}
									title={subplan.title}
									description={subplan.description}
									price={getPrice(subplan.price)}
									activities={subplan.activities}
									tag={subplan.type}
									onPress={() => handlePlanSelection(subplan)}
								/>
							))}
						</View>

						{/* <CarroucelPlan service={service} /> */}

						<View style={styles.divider} />

						<Text style={styles.reviewTitle}>O que dizem deste serviço</Text>
						<View style={styles.overallRating}>
							<Text style={styles.ratingBig}>4.7</Text>
							{renderRating(4.7)}
							<Text style={styles.ratingCount}>De 124 avaliações</Text>
						</View>

						<View style={styles.reviewSection}>
							{visibleReviews.map(review => (
								<View key={review.id} style={styles.reviewItem}>
									<FastImage
										source={{ uri: review.image }}
										style={styles.userImage}
									/>
									<View style={styles.userInfo}>
										<View style={styles.reviewHeader}>
											<Text style={styles.userName}>{review.name}</Text>
											<Text style={styles.reviewDate}>{review.date}</Text>
										</View>
										{renderRating(review.rating)}
										<Text style={styles.reviewText}>"{review.text}"</Text>
										<View style={styles.reviewFooter}>
											<Pressable style={styles.likeButton}>
												<Ionicons
													name="thumbs-up-outline"
													size={16}
													color={theme.colors.text}
												/>
												<Text style={styles.likeCount}>{review.likes}</Text>
											</Pressable>
										</View>
									</View>
								</View>
							))}

							{!showAllReviews && service.comments.length > 2 && (
								<TouchableOpacity
									type="tertiary"
									style={styles.showMoreButton}
									onPress={() => setShowAllReviews(true)}
								>
									<Text style={styles.showMoreText}>Ver mais avaliações</Text>
									<Ionicons
										name="chevron-down"
										size={16}
										color={theme.colors.primary}
									/>
								</TouchableOpacity>
							)}
						</View>
					</View>
				</Animated.ScrollView>

				{showRatingModal && (
					<ModalMessage
						showLogoutModal={showRatingModal}
						setShowLogoutModal={setShowRatingModal}
						handleOk={() => setShowRatingModal(false)}
						textButton="Enviar"
						modalTitle="Avalie este serviço"
						modalIcon="star"
						cancelButton={true}
					>
						<View style={styles.ratingModalContent}>
							{renderUserRatingStars()}
						</View>
					</ModalMessage>
				)}

				{showCommentModal && (
					<ModalMessage
						showLogoutModal={showCommentModal}
						setShowLogoutModal={setShowCommentModal}
						handleOk={handleCommentSubmit}
						textButton="Enviar"
						modalTitle="Deixe seu comentário"
						modalIcon="chatbox"
						cancelButton={true}
					>
						<View style={styles.commentModalContent}>
							<TextInput
								style={styles.commentInput}
								placeholder="Escreva seu comentário aqui..."
								placeholderTextColor="#999"
								multiline
								value={commentText}
								onChangeText={setCommentText}
							/>
						</View>
					</ModalMessage>
				)}
			</View>
		</>
	)
}

const useStyles = (theme: Theme) =>
	StyleSheet.create({
		container: {
			flex: 1,
			backgroundColor: theme.colors.background,
			position: 'relative',
		},
		stickyHeader: {
			position: 'absolute',
			top: 0,
			left: 0,
			right: 0,
			backgroundColor: theme.colors.background,
			zIndex: 100,
			flexDirection: 'row',
			alignItems: 'center',
			paddingHorizontal: 16,
			borderBottomWidth: 1,
			borderBottomColor: theme.colors.border,
		},
		backButtonSticky: {
			height: 40,
			width: 40,
			borderRadius: 20,
			alignItems: 'center',
			justifyContent: 'center',
		},
		stickyTitle: {
			fontSize: theme.size.sm,
			fontFamily: theme.fonts.medium.fontFamily,
			color: theme.colors.text,
			marginLeft: 10,
			flex: 1,
		},
		imageContainer: {
			position: 'relative',
			overflow: 'hidden',
		},
		headerImage: {
			width: '100%',
			height: HEADER_HEIGHT,
		},
		gradient: {
			position: 'absolute',
			left: 0,
			right: 0,
			top: 0,
			height: HEADER_HEIGHT,
		},
		imageOverlay: {
			position: 'absolute',
			bottom: 20,
			left: 16,
			right: 16,
		},
		mainContent: {
			backgroundColor: theme.colors.background,
			marginTop: -10,
			paddingTop: 20,
		},
		serviceTitle: {
			fontSize: theme.size.lg,
			fontFamily: theme.fonts.bold.fontFamily,
			color: 'white',
			textShadowColor: 'rgba(0, 0, 0, 0.75)',
			textShadowOffset: { width: -1, height: 1 },
		},
		ratingRow: {
			flexDirection: 'row',
			alignItems: 'center',
		},
		ratingText: {
			color: theme.colors.text,
			marginLeft: 6,
			fontFamily: theme.fonts.regular.fontFamily,
			fontSize: theme.size.xs,
			textShadowColor: 'rgba(0, 0, 0, 0.75)',
			textShadowOffset: { width: -1, height: 1 },
			textShadowRadius: 10,
		},
		testimonialRatingSmall: {
			flexDirection: 'row',
			alignItems: 'center',
			backgroundColor: 'rgba(245, 194, 26, 0.1)',
			borderColor: '#F5C21A',
			borderWidth: 1,
			paddingHorizontal: 8,
			paddingVertical: 2,
			borderRadius: 20,
		},
		testimonialRatingText: {
			fontSize: theme.size.xs,
			fontFamily: theme.fonts.regular.fontFamily,
			color: theme.colors.text,
			marginLeft: 4,
		},
		infoCard: {
			marginHorizontal: 16,
			marginTop: 16,
			padding: 16,
			borderRadius: 12,
			elevation: 2,
			borderWidth: 1,
			borderColor: theme.colors.tint,
			backgroundColor: theme.colors.card,
			shadowOffset: { width: 0, height: 1 },
			shadowOpacity: 0.1,
			shadowRadius: 1,
		},
		descriptionTitle: {
			fontSize: theme.size.base,
			fontFamily: theme.fonts.semibold.fontFamily,
			color: theme.colors.text,
			marginBottom: 8,
		},
		description: {
			fontSize: theme.size.xsB,
			fontFamily: theme.fonts.regular.fontFamily,
			color: theme.colors.text,
			lineHeight: 20,
		},
		statsContainer: {
			flexDirection: 'row',
			justifyContent: 'space-between',
			marginTop: 16,
			paddingTop: 16,
			borderTopWidth: 1,
			borderTopColor: theme.colors.border,
		},
		statItem: {
			alignItems: 'center',
			flex: 1,
		},
		statValue: {
			fontSize: theme.size.sm,
			fontFamily: theme.fonts.bold.fontFamily,
			color: theme.colors.text,
			marginTop: 4,
		},
		statLabel: {
			fontSize: theme.size.xs,
			fontFamily: theme.fonts.regular.fontFamily,
			color: theme.colors.text,
		},
		sectionTitle: {
			fontSize: theme.size.base,
			fontFamily: theme.fonts.semibold.fontFamily,
			color: theme.colors.text,
			marginHorizontal: 16,
			//marginTop: 24,
			marginBottom: 12,
		},
		benefitsSection: {
			marginHorizontal: 16,
			padding: 16,
			borderRadius: 12,
			borderColor: theme.colors.tint,
			backgroundColor: theme.colors.card,
			shadowOffset: { width: 0, height: 1 },
			shadowOpacity: 0.1,
			shadowRadius: 1,
			borderWidth: 1,
		},
		benefitRow: {
			flexDirection: 'row',
			justifyContent: 'space-between',
			marginTop: 12,
		},
		benefitItem: {
			flexDirection: 'row',
			alignItems: 'center',
			flex: 1,
		},
		benefitText: {
			fontSize: theme.size.xs,
			fontFamily: theme.fonts.medium.fontFamily,
			color: theme.colors.text,
			marginLeft: 8,
			flex: 1,
		},
		periodSelector: {
			flexDirection: 'row',
			justifyContent: 'center',
			alignItems: 'center',
			marginBottom: 20,
			paddingHorizontal: 16,
		},
		periodOptionContainer: {
			paddingHorizontal: 24,
		},
		periodOption: {
			paddingVertical: 4,
			fontSize: theme.size.sm,
			fontFamily: theme.fonts.bold.fontFamily,
			color: '#666',
		},
		periodOptionActive: {
			color: theme.colors.primary,
			borderBottomWidth: 2,
			borderBottomColor: theme.colors.primary,
		},
		backButton: {
			position: 'absolute',
			top: 50,
			left: 16,
			height: 40,
			width: 40,
			borderRadius: 20,
			backgroundColor: 'rgba(0,0,0,0.3)',
			alignItems: 'center',
			justifyContent: 'center',
			zIndex: 10,
		},
		divider: {
			height: 8,
			backgroundColor: theme.colors.border,
			marginVertical: 16,
		},
		reviewSection: {
			marginHorizontal: 16,
			marginTop: 8,
			marginBottom: 24,
			padding: 16,

			borderRadius: 12,
			elevation: 3,
			borderWidth: 1,
			borderColor: theme.colors.tint,
			backgroundColor: theme.colors.card,
			shadowOffset: { width: 0, height: 1 },
			shadowOpacity: 0.1,
			shadowRadius: 1,
		},
		reviewTitle: {
			fontSize: theme.size.base,
			fontFamily: theme.fonts.bold.fontFamily,
			color: theme.colors.text,
			marginBottom: 4,
			textAlign: 'center',
		},
		overallRating: {
			alignItems: 'center',
			marginBottom: 16,
		},
		ratingBig: {
			fontSize: 36,
			fontFamily: theme.fonts.bold.fontFamily,
			color: theme.colors.text,
		},
		ratingCount: {
			fontSize: theme.size.xs,
			fontFamily: theme.fonts.regular.fontFamily,
			color: theme.colors.text,
			marginTop: 4,
		},
		reviewItem: {
			flexDirection: 'row',
			marginBottom: 16,
			paddingBottom: 16,
			borderBottomWidth: 1,
			borderBottomColor: theme.colors.border,
		},
		reviewHeader: {
			flexDirection: 'row',
			justifyContent: 'space-between',
			alignItems: 'center',
		},
		reviewDate: {
			fontSize: theme.size.xs,
			fontFamily: theme.fonts.regular.fontFamily,
			color: theme.colors.text,
		},
		userImage: {
			width: 40,
			height: 40,
			borderRadius: 20,
			marginRight: 12,
		},
		userInfo: {
			flex: 1,
		},
		userName: {
			fontSize: theme.size.sm,
			fontFamily: theme.fonts.bold.fontFamily,
			color: theme.colors.text,
			marginBottom: 4,
		},
		starContainer: {
			flexDirection: 'row',
			marginBottom: 4,
		},
		reviewText: {
			fontSize: theme.size.xsB,
			fontFamily: theme.fonts.regular.fontFamily,
			color: theme.colors.text,
			lineHeight: 18,
		},
		reviewFooter: {
			flexDirection: 'row',
			justifyContent: 'flex-end',
			marginTop: 8,
		},
		likeButton: {
			flexDirection: 'row',
			alignItems: 'center',
			padding: 4,
		},
		likeCount: {
			fontSize: theme.size.xs,
			fontFamily: theme.fonts.regular.fontFamily,
			color: theme.colors.text,
			marginLeft: 4,
		},
		showMoreButton: {
			flexDirection: 'row',
			alignItems: 'center',
			justifyContent: 'center',
			padding: 8,
			marginTop: 8,
		},
		showMoreText: {
			fontSize: theme.size.xsB,
			fontFamily: theme.fonts.medium.fontFamily,
			color: theme.colors.primary,
			marginRight: 4,
		},

		engagementContainer: {
			flexDirection: 'row',
			justifyContent: 'space-around',
			paddingVertical: 5,
			marginHorizontal: 16,
			backgroundColor: theme.colors.card,
			borderRadius: 12,
			elevation: 2,
			borderWidth: 1,
			borderColor: theme.colors.tint,
			//shadowColor: 'rgba(0, 0, 0, 0.53)',
			shadowOffset: { width: 0, height: 1 },
			shadowOpacity: 0.1,
			shadowRadius: 1,
		},
		engagementButton: {
			flexDirection: 'column',
			alignItems: 'center',
			padding: 8,
		},
		engagementText: {
			fontSize: theme.size.xs,
			fontFamily: theme.fonts.medium.fontFamily,
			color: theme.colors.text,
			marginTop: 6,
		},
		userRatingContainer: {
			flexDirection: 'row',
			justifyContent: 'center',
			alignItems: 'center',
			paddingVertical: 16,
		},
		userRatingStar: {
			padding: 8,
		},
		ratingModalContent: {
			paddingVertical: 8,
		},
		commentModalContent: {
			paddingVertical: 16,
			paddingHorizontal: 8,
		},
		commentInput: {
			borderWidth: 1,
			borderColor: theme.colors.border,
			borderRadius: 8,
			padding: 12,
			minHeight: 120,
			textAlignVertical: 'top',
			fontSize: theme.size.sm,
			fontFamily: theme.fonts.regular.fontFamily,
			color: theme.colors.text,
		},
	})
