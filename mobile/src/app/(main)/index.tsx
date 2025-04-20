/* eslint-disable react-native/no-color-literals */
import CarouselCard from '@/src/components/front/Carroucel'
import Header from '@/src/components/front/Header'
import UserProfile from '@/src/components/front/EmployersCard'
import { useUser } from '@clerk/clerk-expo'
import { Stack } from 'expo-router'
import React from 'react'
import { FlatList, ScrollView, StyleSheet } from 'react-native'
import { fontFamily } from '@/src/constants/FontFamily'
import { Separador } from '@/src/components/front/Separador'
import ServicesCard from '@/src/components/front/ServicesCard'
import CompletedServiceCard from '../../components/front/CompletedServiceCard'
import { View } from '@/src/components/Themed'
import { Text } from '@/src/components/ui/Text'
const users = [
	{
		id: 1,
		firstname: 'Antônio',
		lastname: 'Silva',
		image: 'https://randomuser.me/api/portraits/men/5.jpg',
		role: 'Vendedor',
	},
	{
		id: 2,
		firstname: 'Miguel',
		lastname: 'Silva',
		//image: '',
		role: 'Analista',
	},
	{
		id: 3,
		firstname: 'Marcos',
		lastname: 'Silva',
		image: 'https://randomuser.me/api/portraits/men/10.jpg',
		role: 'Vendedor',
	},
	{
		id: 4,
		firstname: 'João',
		lastname: 'Oliveira',
		image: 'https://randomuser.me/api/portraits/men/15.jpg',
		role: 'RH',
	},
	{
		id: 5,
		firstname: 'Marta',
		lastname: 'Santos',
		image: 'https://randomuser.me/api/portraits/women/7.jpg',
		role: 'Operações',
	},
	{
		id: 6,
		firstname: 'João',
		lastname: 'Oliveira',
		image: 'https://randomuser.me/api/portraits/men/20.jpg',
		role: 'Fiscal',
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

import Services from '@/src/components/front/Services'
import Colors from '@/src/constants/Colors'
import { FontSize } from '@/src/constants/FontSize'

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
	},
]

export default function HomeScreen() {
	const { user } = useUser()

	return (
		<>
			<Stack.Screen
				options={{
					headerShown: true,
					header: () => <Header />,
				}}
			/>
			<ScrollView
				contentInsetAdjustmentBehavior="automatic"
				showsVerticalScrollIndicator={false}
			>
				<Text style={styles.textUser}>{user?.firstName} 👋</Text>

				<Text style={styles.textTitle}>
					Aqui você encontra serviços completos para a sua casa... 🏡
				</Text>
				<View style={{ marginTop: 10 }}>
					<CarouselCard />
				</View>

				<Separador text="Nossos Serviços" more />

				<FlatList
					horizontal
					showsHorizontalScrollIndicator={false}
					keyExtractor={item => item.id.toString()}
					data={services}
					style={{
						marginBottom: 20,
					}}
					renderItem={({ index, item }) => (
						<View
							style={{
								marginLeft: index === 0 ? 16 : 16,
								marginRight: index === services.length - 1 ? 16 : 0,
								flex: 1,
								flexDirection: 'row',
								gap: 10,
							}}
						>
							<ServicesCard data={item} />
						</View>
					)}
				/>

				<Separador text="Nossa equipe" more />

				<FlatList
					horizontal
					showsHorizontalScrollIndicator={false}
					keyExtractor={item => item.id.toString()}
					data={users}
					renderItem={({ index, item }) => (
						<View
							style={{
								marginLeft: index === 0 ? 16 : 16,
								marginRight: index === users.length - 1 ? 16 : 0,
								flex: 1,
								flexDirection: 'row',
								gap: 10,
							}}
						>
							<UserProfile data={item} />
						</View>
					)}
				/>

				<Separador
					text="Serviços de Limpeza"
					more
					style={{ marginBottom: 0 }}
				/>

				{/* <FlatList
					data={services
						.filter(service => service.service.includes('Limpeza'))
						.slice(0, 4)}
					numColumns={2}
					columnWrapperStyle={{
						flexDirection: 'row',
						gap: 16,
						paddingTop: 16,
						paddingHorizontal: 16,
					}}
					renderItem={({ item }) => (
						<TouchableOpacity
							activeOpacity={0.8}
							style={[styles.containerImage, { flex: 1 }]}
							onPress={() =>
								router.push({
									pathname: '/(services)/service-details',
									params: { id: item.id, data: item as any },
								})
							}
						>
							<FastImage
								source={{ uri: Image.resolveAssetSource(item.image).uri }}
								style={styles.backgroundImage}
								resizeMode={FastImage.resizeMode.cover}
							/>
							<View style={styles.header}>
								<View style={styles.headerContainerTop}>
									<Text style={styles.categoryTitleTop}>10% OFF</Text>
								</View>
								<View style={styles.starContainer}>
									<Ionicons name="star" size={14} color="#FFC107" />
									<Text
										style={{
											fontSize: 10,
											fontFamily: fontFamily.poppins.semibold,
											color: '#fff',
											marginLeft: 4,
										}}
									>
										4.5
									</Text>
								</View>
							</View>
							<View style={styles.headerContainer}>
								<Text style={styles.categoryTitle}>{item.name}</Text>
							</View>
						</TouchableOpacity>
					)}
				/> */}
				{services
					.filter(service => service.tags.some(tag => service.service.includes(tag)))
					.slice(0, 4)
					.reduce<Array<Array<(typeof services)[0]>>>((rows, item, index) => {
						if (index % 2 === 0) {
							rows.push([item])
						} else {
							rows[rows.length - 1].push(item)
						}
						return rows
					}, [])
					.map((row, rowIndex) => (
						<Services key={rowIndex} services={row} />
					))}

				<Separador text="Serviços Realizados" more />

				<FlatList
					horizontal
					showsHorizontalScrollIndicator={false}
					data={completedServices}
					keyExtractor={item => item.id.toString()}
					renderItem={({ index, item }) => (
						<View
							style={{
								marginLeft: index === 0 ? 16 : 16,
								marginRight: index === completedServices.length - 1 ? 16 : 0,
								flex: 1,
							}}
						>
							<CompletedServiceCard data={item} />
						</View>
					)}
				/>
			</ScrollView>
		</>
	)
}

const styles = StyleSheet.create({
	textUser: {
		fontSize: FontSize.smB,
		marginTop: 20,
		paddingHorizontal: 16,
		fontFamily: fontFamily.poppins.medium,
		color: Colors.dark.colors.primary,
	},
	textTitle: {
		fontSize: 26,
		fontFamily: fontFamily.poppins.bold,
		paddingHorizontal: 16,
	},
})
