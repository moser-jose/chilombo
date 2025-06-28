import { window } from '../../constants/SizeScreen'
import * as React from 'react'
import { View, Animated } from 'react-native'
import {
	useSharedValue
} from 'react-native-reanimated'
import Carousel, {
	ICarouselInstance
} from 'react-native-reanimated-carousel'
import PlanCard from './PlanCard'
import { useState } from 'react'
import { useCheckout } from '@/src/context/CheckoutContext'
import { Plan } from '@/src/types/plans'
import { router } from 'expo-router'

const carouselData = [
	{
		title: 'Descontos',
		discount: '30%',
		description: 'Todos os nossos serviços têm descontos',
		period: 'até Dezembro',
		backgroundColor: '#FF69B4',
		imgem: require('../../../assets/banner.jpg'), // Rosa
	},

	{
		title: 'Promoção',
		discount: '25%',
		description: 'Pacotes especiais para você',
		period: 'até Janeiro',
		backgroundColor: '#4B0082', // Índigo
		imgem: require('../../../assets/limpeza.jpg'), // Rosa
	},
	{
		title: 'Ofertas',
		discount: '40%',
		description: 'Aproveite nossas ofertas exclusivas',
		period: 'essa semana',
		backgroundColor: '#20B2AA', // Verde água
		imgem: require('../../../assets/banner-p.png'), // Rosa
	},
	{
		title: 'Black Friday',
		discount: '50%',
		description: 'Os melhores descontos do ano',
		period: 'por tempo limitado',
		backgroundColor: '#8B4513', // Marrom
		imgem: require('../../../assets/banner.png'), // Rosa
	},
	{
		title: 'Especial',
		discount: '35%',
		description: 'Produtos selecionados com desconto',
		period: 'até amanhã',
		backgroundColor: '#4682B4', // Azul aço
		imgem: require('../../../assets/banner.png'), // Rosa
	},
]

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

function Index({ service }: { service: (typeof carouselData)[0] }) {
	const progress = useSharedValue<number>(0)
	const [isMonthly, setIsMonthly] = useState(false)
	const ref = React.useRef<ICarouselInstance>(null)
	const { setPlan } = useCheckout()

	const handlePlanSelection = (plan: Plan) => {
		setPlan(plan)
		router.push('/(checkout)/address-select')
	}
	const getPrice = (basePrice: number) => {
		return isMonthly ? basePrice * 0.8 : basePrice // 20% desconto para planos mensais
	}
	const renderSlide = ({ item }: { item: (typeof carouselData)[0] }) => (
		<Animated.View
			style={{
				borderRadius: 15,
				height: '100%',
				width: '100%',
				alignSelf: 'center',
				flex: 1,
			}}
		>
			<PlanCard
				//key={index}
				title={item.title}
				description={item.description}
				price={getPrice(item.price)}
				activities={item.activities}
				tag={item.type}
				onPress={() => handlePlanSelection(item)}
			/>
		</Animated.View>
	)

	const onPressPagination = (index: number) => {
		ref.current?.scrollTo({
			count: index - progress.value,
			animated: true,
		})
	}

	return (
		<View id="carousel-component">
			<Carousel
				autoPlayInterval={2000}
				data={service.plan.diario.subplan}
				height={400}
				loop={true}
				pagingEnabled={true}
				snapEnabled={true}
				width={window.width}
				style={{
					width: window.width,
				}}
				mode="parallax"
				modeConfig={{
					parallaxScrollingScale: 0.9,
					parallaxScrollingOffset: 50,
				}}
				onProgressChange={progress}
				renderItem={renderSlide}
			/>
			<View
				style={{
					flexDirection: 'row',
					justifyContent: 'flex-start',
					alignItems: 'center',
					marginLeft: 16,
				}}
			>
				{/* <Pagination.Custom
					progress={progress}
					data={service.plan.diario.subplan}
					size={6}
					dotStyle={{
						borderRadius: 16,
						backgroundColor: 'rgba(46, 46, 64, 0.82)',
					}}
					activeDotStyle={{
						borderRadius: 8,
						width: 12,
						height: 6,
						overflow: 'hidden',
						backgroundColor: theme.colors.primary,
					}}
					containerStyle={{
						gap: 5,
						marginBottom: 10,
						alignItems: 'center',
						height: 10,
					}}
					horizontal
					onPress={onPressPagination}
					customReanimatedStyle={(progress, index, length) => {
						let val = Math.abs(progress - index)
						if (index === 0 && progress > length - 1) {
							val = Math.abs(progress - length)
						}

						return {
							transform: [
								{
									translateY: interpolate(
										val,
										[0, 1],
										[0, 0],
										Extrapolation.CLAMP,
									),
								},
							],
						}
					}}
				/> */}
			</View>
		</View>
	)
}

export default Index
