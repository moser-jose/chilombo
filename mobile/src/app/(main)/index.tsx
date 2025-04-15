/* eslint-disable react-native/no-color-literals */
import CarouselCard from '@/src/components/front/Carroucel'
import Header from '@/src/components/front/Header'
import UserProfile from '@/src/components/front/EmployersCard'
import { useUser } from '@clerk/clerk-expo'
import { router, Stack } from 'expo-router'
import React from 'react'
import FastImage from 'react-native-fast-image'
import {
	View,
	Text,
	FlatList,
	ScrollView,
	StyleSheet,
	Image,
	TouchableOpacity,
} from 'react-native'
import { fontFamily } from '@/src/constants/FontFamily'
import { Ionicons } from '@expo/vector-icons'
import { Separador } from '@/src/components/front/Separador'
import ServicesCard from '@/src/components/front/ServicesCard'
import CompletedServiceCard from '../../components/front/CompletedServiceCard'

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

import tapete from '../../../assets/empresa/tapete.jpg'
import empregada from '../../../assets/empresa/empregada.png'
import empresa from '../../../assets/empresa/empresa.png'
import cadeiroes from '../../../assets/empresa/cadeiroes.png'

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
	const tapeteUrl = Image.resolveAssetSource(tapete).uri
	const empregadaUrl = Image.resolveAssetSource(empregada).uri
	const empresaUrl = Image.resolveAssetSource(empresa).uri
	const cadeiroesUrl = Image.resolveAssetSource(cadeiroes).uri
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
				<Text
					style={{
						fontSize: 18,
						color: '#000',
						marginTop: 20,
						paddingHorizontal: 16,
						fontFamily: fontFamily.poppins.medium,
					}}
				>
					{user?.firstName} 👋
				</Text>

				<Text
					style={{
						fontSize: 26,
						fontFamily: fontFamily.poppins.bold,
						color: '#172B4D',
						paddingHorizontal: 16,
						marginTop: 10,
					}}
				>
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
							<ServicesCard
								icon={item.icon}
								service={item.service}
								route={item.route}
							/>
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
							<UserProfile
								name={`${item.firstname} ${item.lastname}`}
								imageUrl={item.image}
								role={item.role}
							/>
						</View>
					)}
				/>

				<Separador text="Serviços de Limpeza" more />

				<View style={styles.container}>
					<TouchableOpacity
						activeOpacity={0.8}
						style={styles.containerImage}
						onPress={() => router.push('/(services)/empregada-domestica')}
					>
						<FastImage
							source={{ uri: empregadaUrl }}
							style={styles.backgroundImage}
							resizeMode={FastImage.resizeMode.cover}
						/>
						<View style={styles.headerContainer}>
							<Text style={styles.categoryTitle}>Empregada Doméstica</Text>
						</View>
					</TouchableOpacity>
					<TouchableOpacity
						activeOpacity={0.8}
						style={styles.containerImage}
						onPress={() => router.push('/(services)/limpeza-tapete')}
					>
						<FastImage
							source={{ uri: tapeteUrl }}
							style={styles.backgroundImage}
							resizeMode={FastImage.resizeMode.cover}
						/>
						<View style={styles.header}>
							<View style={styles.headerContainerTop}>
								<Text style={styles.categoryTitleTop}>10% OFF</Text>
							</View>
							<View style={styles.headerContainerTopStar}>
								<Ionicons name="star" size={16} color="#fbd602" />
							</View>
						</View>
						<View style={styles.headerContainer}>
							<Text style={styles.categoryTitle}>Limpeza de Tapete</Text>
						</View>
					</TouchableOpacity>
				</View>
				<View style={styles.container}>
					<TouchableOpacity
						activeOpacity={0.8}
						style={styles.containerImage}
						onPress={() => router.push('/(services)/limpeza-empresarial')}
					>
						<FastImage
							source={{ uri: empresaUrl }}
							style={styles.backgroundImage}
							resizeMode={FastImage.resizeMode.cover}
						/>
						<View style={styles.headerContainer}>
							<Text style={styles.categoryTitle}>Limpeza Empresarial</Text>
						</View>
					</TouchableOpacity>
					<TouchableOpacity
						activeOpacity={0.8}
						style={styles.containerImage}
						onPress={() => router.push('/(services)/limpeza-cadeiroes')}
					>
						<FastImage
							source={{ uri: cadeiroesUrl }}
							style={styles.backgroundImage}
							resizeMode={FastImage.resizeMode.cover}
						/>
						<View style={styles.header}>
							<View style={styles.headerContainerTop}>
								<Text style={styles.categoryTitleTop}>10% OFF</Text>
							</View>
							<View style={styles.headerContainerTopStar}>
								<Ionicons name="star" size={18} color="#fbd602" />
								<Text
									style={{
										fontSize: 10,
										fontFamily: fontFamily.poppins.semibold,
										color: '#fff',
									}}
								>
									4.5
								</Text>
							</View>
						</View>
						<View style={styles.headerContainer}>
							<Text style={styles.categoryTitle}>Limpeza de Cadeirões</Text>
						</View>
					</TouchableOpacity>
				</View>

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
							<CompletedServiceCard
								title={item.title}
								image={item.image}
								stars={item.stars}
								likes={item.likes}
								address={item.address}
								description={item.description}
								id={item.id}
							/>
						</View>
					)}
				/>
			</ScrollView>
		</>
	)
}

const styles = StyleSheet.create({
	container: {
		flexDirection: 'row',
		gap: 16,
		flex: 1,
		paddingHorizontal: 16,
		marginBottom: 20,
	},
	containerImage: {
		flex: 1,
	},
	backgroundImage: {
		width: '100%',
		height: 180,
		borderRadius: 20,
	},
	header: {
		position: 'absolute',
		zIndex: 2,
		top: 6,
		left: 6,
		right: 6,
		padding: 6,
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'space-between',
	},
	headerContainerTopStar: {
		borderRadius: 14,
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'center',
		backgroundColor: 'rgba(255, 255, 255, 0.2)',
		borderWidth: 1,
		borderColor: 'rgba(255, 255, 255, 0.4)',
		paddingVertical: 2,
		paddingHorizontal: 4,
	},
	headerContainerTop: {
		backgroundColor: '#FF5959',
		padding: 4,
		borderRadius: 14,
	},
	headerContainer: {
		position: 'absolute',
		left: 0,
		right: 0,
		bottom: 0,
		zIndex: 2,
		backgroundColor: 'rgba(12, 12, 12, 0.94)',
		padding: 10,
		borderRadius: 14,
		marginHorizontal: 7,
		marginBottom: 7,
	},
	backButton: {
		height: 40,
		width: 40,
		borderRadius: 20,
		alignItems: 'center',
		justifyContent: 'center',
	},
	categoryTitleTop: {
		fontSize: 10,
		fontFamily: fontFamily.poppins.semibold,
		color: '#fff',
	},
	categoryTitle: {
		fontSize: 10,
		textAlign: 'center',
		fontFamily: fontFamily.poppins.semibold,
		color: '#fff',
	},
})
