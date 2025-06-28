import { Stack, router, useLocalSearchParams } from 'expo-router'
import React, { useState, useRef } from 'react'
import {
	View,
	Text,
	StyleSheet,
	TouchableOpacity,
	Dimensions,
	FlatList,
	Animated,
	Platform,
} from 'react-native'
import FastImage from 'react-native-fast-image'
import { Ionicons, MaterialIcons, FontAwesome } from '@expo/vector-icons'
import { FontSize } from '@/src/constants/FontSize'
import { LinearGradient } from 'react-native-linear-gradient'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import ModalMessage from '@/src/components/modal/ModalMessage'
import { Separador } from '@/src/components/front/Separador'
import Star from '@/src/components/front/Star'
import { Theme } from '@/src/types/theme'
import { useCustomTheme } from '@/src/context/ThemeContext'
import EmployerCard from '@/src/components/front/EmployersCard'

const { width } = Dimensions.get('window')
const HEADER_HEIGHT = 250
const HEADER_MIN_HEIGHT = Platform.OS === 'ios' ? 90 : 70

const completedServicesData = [
	{
		id: 1,
		title: 'Limpeza Residencial',
		mainImage:
			'https://images.unsplash.com/photo-1584622650111-993a426fbf0a?q=80&w=1470&auto=format&fit=crop',
		stars: 4.8,
		likes: 126,
		address: 'Rua Bié, Huambo, HBO',
		description: 'Limpeza completa de residência com 3 quartos e 2 banheiros.',
		date: '15/03/2024',
		client: 'J. Mateus',
		duration: '3 horas',
		professionals: [
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
		],
		workImages: [
			'https://images.unsplash.com/photo-1581578731548-c64695cc6952?q=80&w=1470&auto=format&fit=crop',
			'https://images.unsplash.com/photo-1527515637462-cff94eecc1ac?q=80&w=1374&auto=format&fit=crop',
			'https://images.unsplash.com/photo-1584622781564-1d987f7333c1?q=80&w=1470&auto=format&fit=crop',
			'https://images.unsplash.com/photo-1600566753376-12c8ab7fb75b?q=80&w=1470&auto=format&fit=crop',
		],
		tasks: [
			'Limpeza geral de todos os cômodos',
			'Limpeza profunda de 3 banheiros',
			'Lavagem e aspiração de carpetes',
			'Limpeza de janelas e vidros',
			'Organização de mobiliário',
		],
		testimonial: {
			text: 'Serviço excelente! A equipe chegou no horário marcado e fez um trabalho impecável. Minha casa nunca esteve tão limpa.',
			rating: 5,
		},
		additionalTestimonials: [
			{
				clientName: 'Maria Oliveira',
				clientImage:
					'https://ui-avatars.com/api/?name=Maria+Oliveira&background=E91E63&color=fff',
				text: 'Muito satisfeita com a limpeza. Profissionais muito educados.',
				rating: 4.8,
				date: '12/06/2024',
			},
			{
				clientName: 'Carlos Mendes',
				clientImage:
					'https://ui-avatars.com/api/?name=Carlos+Mendes&background=9C27B0&color=fff',
				text: 'Segunda vez que contrato e continua sendo excelente.',
				rating: 5,
				date: '05/05/2024',
			},
			{
				clientName: 'Ana Santos',
				clientImage:
					'https://ui-avatars.com/api/?name=Ana+Santos&background=4CAF50&color=fff',
				text: 'Pontualidade e excelência no serviço. Recomendo fortemente!',
				rating: 4.7,
				date: '22/04/2024',
			},
		],
	},
	{
		id: 2,
		title: 'Limpeza de Tapetes',
		mainImage:
			'https://images.unsplash.com/photo-1603848198135-5ace8c4a91c3?q=80&w=1374&auto=format&fit=crop',
		stars: 4.7,
		likes: 98,
		address: 'Cidade Alta, Huambo, HBO',
		description:
			'Limpeza profunda e higienização de tapetes de sala e quartos.',
		date: '22/03/2024',
		client: 'Ana Marisa',
		duration: '2 horas',
		professionals: [
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
		],
		workImages: [
			'https://images.unsplash.com/photo-1603848198135-5ace8c4a91c3?q=80&w=1374&auto=format&fit=crop',
			'https://images.unsplash.com/photo-1588854337221-4cf9fa96059c?q=80&w=1470&auto=format&fit=crop',
			'https://images.unsplash.com/photo-1558997519-83ea9252edf8?q=80&w=1470&auto=format&fit=crop',
		],
		tasks: [
			'Remoção de manchas e odores',
			'Higienização a vapor',
			'Aplicação de protetor',
			'Secagem rápida',
		],
		testimonial: {
			text: 'Tapetes como novos! Serviço rápido e eficiente, recomendo a todos.',
			rating: 4.5,
		},
	},
	{
		id: 3,
		title: 'Limpeza Empresarial',
		mainImage:
			'https://images.unsplash.com/photo-1600585152220-90363fe7e115?q=80&w=1470&auto=format&fit=crop',
		stars: 4.9,
		likes: 215,
		address: 'Rua dos Ministros, Huambo, HBO',
		description: 'Serviço completo de limpeza para escritório com 10 salas.',
		date: '03/04/2024',
		client: 'Empresa TechSolutions',
		duration: '5 horas',
		professionals: [
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
		],
		workImages: [
			'https://images.unsplash.com/photo-1497215728101-856f4ea42174?q=80&w=1470&auto=format&fit=crop',
			'https://images.unsplash.com/photo-1590381105924-c72589b9ef3f?q=80&w=1471&auto=format&fit=crop',
			'https://images.unsplash.com/photo-1600508774634-4e11d34730e2?q=80&w=1470&auto=format&fit=crop',
			'https://images.unsplash.com/photo-1517430816045-df4b7de11d1d?q=80&w=1471&auto=format&fit=crop',
		],
		tasks: [
			'Limpeza de 10 salas comerciais',
			'Higienização de banheiros',
			'Limpeza de áreas comuns',
			'Remoção de lixo',
			'Limpeza de vidros e janelas',
			'Desinfecção de superfícies',
		],
		testimonial: {
			text: 'Serviço impecável. Nosso escritório está brilhando e os funcionários muito satisfeitos com o ambiente limpo.',
			rating: 5,
		},
	},
	{
		id: 4,
		title: 'Limpeza de Sofás',
		mainImage:
			'https://images.unsplash.com/photo-1493663284031-b7e3aefcae8e?q=80&w=1470&auto=format&fit=crop',
		stars: 4.6,
		likes: 87,
		address: 'Lossambo, Huambo, HBO',
		description:
			'Higienização e limpeza profunda de sofá de 4 lugares e 2 poltronas.',
		date: '10/04/2024',
		client: 'Carlos Eduardo',
		duration: '1.5 horas',
		professionals: [
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
		],
		workImages: [
			'https://images.unsplash.com/photo-1493663284031-b7e3aefcae8e?q=80&w=1470&auto=format&fit=crop',
			'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?q=80&w=1470&auto=format&fit=crop',
			'https://images.unsplash.com/photo-1583847268964-b28dc8f51f92?q=80&w=1374&auto=format&fit=crop',
		],
		tasks: [
			'Aspiração profunda',
			'Remoção de manchas',
			'Higienização com vapor',
			'Aplicação de protetor de tecidos',
		],
		testimonial: {
			text: 'Serviço excelente. Meu sofá estava muito sujo e agora parece novo. A profissional foi muito atenciosa e cuidadosa.',
			rating: 4.5,
		},
	},
]

export default function CompletedServiceDetailScreen() {
	const { id, origin } = useLocalSearchParams()
	const [activeImage, setActiveImage] = useState(0)
	const [liked, setLiked] = useState(false)
	const [userRating, setUserRating] = useState(0)
	const [showRatingModal, setShowRatingModal] = useState(false)
	const scrollY = useRef(new Animated.Value(0)).current
	const insets = useSafeAreaInsets()

	const { theme } = useCustomTheme()
	const styles = useStyles(theme)

	// Find the service by ID
	const serviceId = typeof id === 'string' ? parseInt(id, 10) : 1
	const service =
		completedServicesData.find(s => s.id === serviceId) ||
		completedServicesData[0]

	const handleLike = () => {
		setLiked(!liked)
	}

	const handleRating = (rating: number) => {
		setUserRating(rating)
		//setShowRatingModal(false)
	}

	const renderRating = (rating: number) => {
		return (
			<View style={styles.starContainer}>
				{[...Array(5)].map((_, index) => (
					<Ionicons
						key={index}
						name={
							index < Math.floor(rating)
								? 'star'
								: index < rating
									? 'star-half'
									: 'star-outline'
						}
						size={16}
						color="rgb(245, 194, 26)"
					/>
				))}
			</View>
		)
	}

	const renderUserRatingStars = () => {
		return (
			<View style={styles.userRatingContainer}>
				{[...Array(5)].map((_, index) => (
					<TouchableOpacity
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

	// Animations for Twitter-like scroll behavior
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

	return (
		<>
			<Stack.Screen
				options={{
					headerShown: false,
				}}
			/>
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
									paddingBottom: 10,
									opacity: titleOpacity,
								},
					]}
				>
					<TouchableOpacity
						style={styles.backButtonSticky}
						onPress={() => router.back()}
					>
						<Ionicons name="chevron-back" size={20} color={theme.colors.text} />
					</TouchableOpacity>
					<Animated.Text
						style={[styles.stickyTitle, { opacity: titleOpacity }]}
						numberOfLines={1}
					>
						{service.title}
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
								source={{ uri: service.workImages[activeImage] }}
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
							<Text style={styles.serviceTitle}>{service.title}</Text>
							<View style={{ flexDirection: 'row', alignItems: 'center' }}>
								<Star rating={service.stars} />
							</View>
						</Animated.View>
					</Animated.View>

					{/* Main Content */}
					<View style={styles.mainContent}>
						{/* Engagement buttons */}
						<View style={styles.engagementContainer}>
							<TouchableOpacity
								style={styles.engagementButton}
								onPress={handleLike}
							>
								<Ionicons
									name={liked ? 'heart' : 'heart-outline'}
									size={24}
									color={liked ? '#FF4D67' : theme.colors.text}
								/>
								<Text style={styles.engagementText}>Amei</Text>
							</TouchableOpacity>

							<TouchableOpacity
								style={styles.engagementButton}
								onPress={() => setShowRatingModal(true)}
							>
								<Ionicons
									name="star-outline"
									size={24}
									color={theme.colors.text}
								/>
								<Text style={styles.engagementText}>Avaliar</Text>
							</TouchableOpacity>

							<TouchableOpacity style={styles.engagementButton}>
								<Ionicons
									name="chatbubble-outline"
									size={24}
									color={theme.colors.text}
								/>
								<Text style={styles.engagementText}>Comentar</Text>
							</TouchableOpacity>
						</View>

						{/* Photo gallery */}
						<Separador text="Fotos do Trabalho Realizado" />
						<View style={styles.galleryContainer}>
							<FlatList
								horizontal
								showsHorizontalScrollIndicator={false}
								data={service.workImages}
								keyExtractor={(item, index) => index.toString()}
								contentContainerStyle={styles.galleryList}
								renderItem={({ item, index }) => (
									<TouchableOpacity
										style={[
											styles.galleryItem,
											activeImage === index && styles.activeGalleryItem,
										]}
										onPress={() => setActiveImage(index)}
									>
										<FastImage
											source={{ uri: item }}
											style={styles.galleryImage}
											resizeMode={FastImage.resizeMode.cover}
										/>
									</TouchableOpacity>
								)}
							/>
						</View>

						{/* Service details */}
						<View style={styles.infoCard}>
							<Text style={styles.descriptionTitle}>
								Sobre o Serviço Concluído
							</Text>
							<Text style={styles.description}>{service.description}</Text>

							<View style={styles.detailsContainer}>
								<View style={styles.detailRow}>
									<View style={styles.detailItem}>
										<Ionicons
											name="calendar-outline"
											size={20}
											color={theme.colors.primary}
										/>
										<View style={styles.detailTextContainer}>
											<Text style={styles.detailLabel}>Data</Text>
											<Text style={styles.detailValue}>{service.date}</Text>
										</View>
									</View>

									<View
										style={[
											styles.detailItem,
											{
												flex: 0.5,
											},
										]}
									>
										<Ionicons
											name="time-outline"
											size={20}
											color={theme.colors.primary}
										/>
										<View style={styles.detailTextContainer}>
											<Text style={styles.detailLabel}>Duração</Text>
											<Text style={styles.detailValue}>{service.duration}</Text>
										</View>
									</View>
								</View>

								<View style={styles.detailRow}>
									<View style={styles.detailItem}>
										<Ionicons
											name="location-outline"
											size={20}
											color={theme.colors.primary}
										/>
										<View style={styles.detailTextContainer}>
											<Text style={styles.detailLabel}>Local</Text>
											<Text style={styles.detailValue}>{service.address}</Text>
										</View>
									</View>

									<View
										style={[
											styles.detailItem,
											{
												flex: 0.5,
											},
										]}
									>
										<Ionicons
											name="person-outline"
											size={20}
											color={theme.colors.primary}
										/>
										<View style={styles.detailTextContainer}>
											<Text style={styles.detailLabel}>Cliente</Text>
											<Text style={styles.detailValue}>{service.client}</Text>
										</View>
									</View>
								</View>
							</View>
						</View>

						{/* Tasks Completed */}
						<Separador text="Tarefas Realizadas" />
						<View style={styles.tasksContainer}>
							{service.tasks.map((task, index) => (
								<View key={index} style={styles.taskItem}>
									<Ionicons
										name="checkmark"
										size={22}
										color={theme.colors.primary}
									/>
									<Text style={styles.taskText}>{task}</Text>
								</View>
							))}
						</View>

						{/* Team */}
						<Separador text="Equipe Responsável" />
						<FlatList
							horizontal
							showsHorizontalScrollIndicator={false}
							keyExtractor={item => item.id.toString()}
							data={service.professionals}
							renderItem={({ index, item }) => (
								<View
									style={{
										marginLeft: index === 0 ? 16 : 16,
										marginRight:
											index === service.professionals.length - 1 ? 16 : 0,
										flex: 1,
										flexDirection: 'row',
										gap: 10,
									}}
								>
									<EmployerCard data={item} />
								</View>
							)}
						/>

						{/* Client Testimonial */}
						<Separador text="Avaliação do Cliente" />
						<View style={styles.testimonialContainer}>
							<View
								style={[
									styles.testimonialContent,
									{
										borderLeftColor: '#0D8ABC',
									},
								]}
							>
								<View style={styles.testimonialHeader}>
									<View style={styles.testimonialHeaderLeft}>
										<FontAwesome
											name="quote-left"
											size={20}
											color={theme.colors.text}
											style={styles.quoteIcon}
										/>
										{renderRating(service.testimonial.rating)}
										<Text style={styles.testimonialRating}>
											{service.testimonial.rating}/5
										</Text>
									</View>
									<FastImage
										source={{
											uri: `https://ui-avatars.com/api/?name=${service.client.replace(' ', '+')}&background=0D8ABC&color=fff`,
										}}
										style={styles.testimonialImage}
										resizeMode={FastImage.resizeMode.cover}
									/>
								</View>
								<Text style={styles.testimonialText}>
									"{service.testimonial.text}"
								</Text>
								<Text style={styles.testimonialClient}>- {service.client}</Text>
							</View>
						</View>

						{/* Additional Testimonials */}
						{service.additionalTestimonials &&
							service.additionalTestimonials.length > 0 && (
								<View>
									<Separador text="Outros Comentários" more />

									<FlatList
										horizontal
										showsHorizontalScrollIndicator={false}
										data={service.additionalTestimonials}
										keyExtractor={(item, index) => index.toString()}
										contentContainerStyle={styles.testimonialsList}
										renderItem={({ item }) => (
											<View
												style={[
													styles.testimonialItemHorizontal,
													{
														borderLeftColor:
															'#' +
															item.clientImage
																.split('background=')[1]
																.split('&')[0],
													},
												]}
											>
												<View style={styles.testimonialItemHeader}>
													<View style={styles.testimonialUser}>
														<FastImage
															source={{ uri: item.clientImage }}
															style={styles.testimonialUserImage}
															resizeMode={FastImage.resizeMode.cover}
														/>
														<View>
															<Text style={styles.testimonialUserName}>
																{item.clientName}
															</Text>
															<Text style={styles.testimonialDate}>
																{item.date}
															</Text>
														</View>
													</View>
													<Star
														rating={item.rating}
														style={styles.testimonialRatingSmall}
														textColor={theme.colors.text}
													/>
												</View>
												<Text style={styles.testimonialItemText}>
													{item.text}
												</Text>
											</View>
										)}
									/>
								</View>
							)}

						{/* CTA Button */}
						<View style={styles.ctaContainer}>
							<TouchableOpacity
								style={styles.ctaButton}
								onPress={() =>
									router.push({
										pathname: '/(services)/service-details',
										params: {
											serviceId: service.id,
											origin: 'home',
										},
									})
								}
							>
								<Text style={styles.ctaButtonText}>
									Solicitar Serviço Similar
								</Text>
								<MaterialIcons
									name="arrow-forward-ios"
									size={16}
									color="#fff"
								/>
							</TouchableOpacity>
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
		testimonialImage: {
			width: 30,
			height: 30,
			borderRadius: 15,
		},
		testimonialHeaderLeft: {
			flexDirection: 'row',
			alignItems: 'center',
			justifyContent: 'space-between',
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
		serviceTitle: {
			fontSize: theme.size.lg + 2,
			fontFamily: theme.fonts.bold.fontFamily,
			color: '#fff',
			textShadowColor: 'rgba(0, 0, 0, 0.75)',
			textShadowOffset: { width: -1, height: 1 },
			textShadowRadius: 10,
		},
		ratingRow: {
			flexDirection: 'row',
			alignItems: 'center',
			marginTop: 4,
		},
		starContainer: {
			flexDirection: 'row',
			alignItems: 'center',
		},
		ratingText: {
			color: '#fff',
			marginLeft: 6,
			fontFamily: theme.fonts.regular.fontFamily,
			fontSize: theme.size.xs,
			textShadowColor: 'rgba(0, 0, 0, 0.75)',
			textShadowOffset: { width: -1, height: 1 },
			textShadowRadius: 10,
		},
		mainContent: {
			backgroundColor: theme.colors.background,
			marginTop: -10,
			paddingTop: 20,
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
			fontSize: FontSize.xs,
			fontFamily: theme.fonts.medium.fontFamily,
			color: theme.colors.text,
			marginTop: 6,
		},
		// Gallery styles
		galleryContainer: {
			//marginTop: 20,
			paddingHorizontal: 16,
		},
		galleryList: {
			//paddingVertical: 12,
		},
		galleryItem: {
			width: 90,
			height: 90,
			borderRadius: 10,
			marginRight: 12,
			borderWidth: 2,
			borderColor: 'transparent',
			overflow: 'hidden',
		},
		activeGalleryItem: {
			borderColor: theme.colors.primary,
		},
		galleryImage: {
			width: '100%',
			height: '100%',
		},
		// Info card styles
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
			fontFamily: theme.fonts.bold.fontFamily,
			color: theme.colors.text,
			marginBottom: 10,
		},
		description: {
			fontSize: theme.size.xsB,
			fontFamily: theme.fonts.regular.fontFamily,
			color: theme.colors.text,
			lineHeight: 22,
		},
		detailsContainer: {
			marginTop: 10,
		},
		detailRow: {
			marginTop: 16,
			flexDirection: 'row',
			justifyContent: 'space-between',
			flex: 1,
			width: '100%',
		},
		detailItem: {
			flexDirection: 'row',
			alignItems: 'flex-start',
			flex: 1,
			marginRight: 8,
		},
		detailTextContainer: {
			marginLeft: 10,
		},
		detailLabel: {
			fontSize: theme.size.xs,
			fontFamily: theme.fonts.medium.fontFamily,
			color: theme.colors.secondary,
			marginBottom: 2,
		},
		detailValue: {
			fontSize: theme.size.xsB,
			fontFamily: theme.fonts.regular.fontFamily,
			color: theme.colors.text,
		},
		// Section title
		sectionTitle: {
			fontSize: theme.size.base + 1,
			fontFamily: theme.fonts.medium.fontFamily,
			color: theme.colors.text,
			marginBottom: 14,
		},
		// Tasks styles
		tasksContainer: {
			marginHorizontal: 16,
			backgroundColor: theme.colors.card,
			borderRadius: 10,
			borderWidth: 1,
			borderColor: theme.colors.tint,
			shadowOffset: { width: 0, height: 1 },
			shadowOpacity: 0.1,
			shadowRadius: 1,
		},
		taskItem: {
			flexDirection: 'row',
			alignItems: 'center',
			padding: 12,
			elevation: 1,
			shadowColor: '#000',
			shadowOffset: { width: 0, height: 1 },
			shadowOpacity: 0.05,
			shadowRadius: 2,
		},
		taskText: {
			fontSize: theme.size.xsB,
			fontFamily: theme.fonts.regular.fontFamily,
			color: theme.colors.text,
			marginLeft: 12,
			flex: 1,
		},
		// Team styles

		professionalsList: {
			flexDirection: 'row',
			flexWrap: 'wrap',
			justifyContent: 'flex-start',
		},
		professionalItem: {
			alignItems: 'center',
			width: width / 3.5,
			marginBottom: 20,
			marginRight: 10,
		},
		professionalAvatarContainer: {
			width: 55,
			height: 55,
			borderRadius: 50,
			//backgroundColor: '#E8F5FE',
			overflow: 'hidden',
			marginBottom: 8,
			borderWidth: 2,
			borderColor: 'rgba(0, 0, 0, 0.25)',
			elevation: 2,
			padding: 2,
			//shadowColor: 'rgba(0,0,0,0.1)',
			shadowOffset: { width: 0, height: 2 },
			shadowOpacity: 0.1,
			shadowRadius: 3,
		},
		professionalAvatar: {
			width: '100%',
			height: '100%',
			borderRadius: 50,
		},
		professionalName: {
			fontSize: theme.size.xs + 1,
			fontFamily: theme.fonts.medium.fontFamily,
			color: theme.colors.text,
			textAlign: 'center',
		},
		professionalRole: {
			fontSize: theme.size.xs - 1,
			fontFamily: theme.fonts.regular.fontFamily,
			color: theme.colors.textMuted,
			textAlign: 'center',
			marginTop: 2,
		},

		testimonialContainer: {
			marginHorizontal: 16,
		},
		testimonialContent: {
			backgroundColor: theme.colors.card,
			padding: 16,
			borderRadius: 12,
			borderLeftWidth: 4,
			borderLeftColor: theme.colors.primary,
			borderWidth: 1,
			borderColor: theme.colors.tint,
			elevation: 1,
			shadowOffset: { width: 0, height: 1 },
			shadowOpacity: 0.05,
			shadowRadius: 2,
		},
		testimonialHeader: {
			flexDirection: 'row',
			alignItems: 'center',
			marginBottom: 12,
			justifyContent: 'space-between',
		},
		quoteIcon: {
			marginRight: 10,
		},
		testimonialRating: {
			fontSize: theme.size.sm,
			fontFamily: theme.fonts.medium.fontFamily,
			color: theme.colors.text,
			marginLeft: 8,
		},
		testimonialText: {
			fontSize: theme.size.xsB,
			fontFamily: theme.fonts.regular.fontFamily,
			color: theme.colors.text,
			fontStyle: 'italic',
			lineHeight: 22,
		},
		testimonialClient: {
			fontSize: theme.size.xsB,
			fontFamily: theme.fonts.medium.fontFamily,
			color: theme.colors.text,
			textAlign: 'right',
			marginTop: 6,
		},
		ctaContainer: {
			marginHorizontal: 16,
			marginVertical: 40,
		},

		ctaButton: {
			backgroundColor: theme.colors.primary,
			borderRadius: 12,
			paddingVertical: 10,
			flex: 1,
			flexDirection: 'row',
			alignItems: 'center',
			justifyContent: 'center',
		},
		ctaButtonText: {
			color: '#fff',
			fontSize: theme.size.xsB,
			fontFamily: theme.fonts.medium.fontFamily,
			marginRight: 8,
		},
		// Rating modal styles
		ratingModal: {
			position: 'absolute',
			top: 0,
			left: 0,
			right: 0,
			bottom: 0,
			backgroundColor: 'rgba(0,0,0,0.5)',
			justifyContent: 'center',
			alignItems: 'center',
			zIndex: 999,
		},
		ratingModalContent: {
			padding: 10,
			borderRadius: 10,
			width: '80%',
			maxWidth: 400,
			alignItems: 'center',
		},
		ratingModalTitle: {
			fontSize: FontSize.base + 1,
			fontFamily: theme.fonts.semibold.fontFamily,
			color: '#222',
			marginBottom: 20,
		},
		userRatingContainer: {
			flexDirection: 'row',
			alignItems: 'center',
			justifyContent: 'center',
			marginBottom: 20,
		},
		userRatingStar: {
			marginHorizontal: 6,
		},
		ratingModalButtons: {
			flexDirection: 'row',
			justifyContent: 'space-between',
			width: '100%',
			marginTop: 16,
		},
		ratingModalButton: {
			backgroundColor: '#f8f9fa',
			borderRadius: 8,
			padding: 12,
			minWidth: 100,
			alignItems: 'center',
		},
		testimonialsList: {
			paddingLeft: 16,
			paddingRight: 8,
		},
		testimonialItemHorizontal: {
			backgroundColor: theme.colors.card,
			padding: 16,
			borderRadius: 12,
			marginRight: 12,
			borderLeftWidth: 2,
			borderLeftColor: theme.colors.primary,
			borderWidth: 1,
			borderColor: theme.colors.tint,
			elevation: 1,
			shadowColor: '#000',
			shadowOffset: { width: 0, height: 1 },
			shadowOpacity: 0.05,
			shadowRadius: 2,
			width: width * 0.75,
			maxWidth: 320,
		},
		testimonialItemHeader: {
			flexDirection: 'row',
			alignItems: 'center',
			justifyContent: 'space-between',
			marginBottom: 10,
		},
		testimonialUser: {
			flexDirection: 'row',
			alignItems: 'center',
		},
		testimonialUserImage: {
			width: 36,
			height: 36,
			borderRadius: 18,
			marginRight: 10,
		},
		testimonialUserName: {
			fontSize: theme.size.xs,
			fontFamily: theme.fonts.semibold.fontFamily,
			color: theme.colors.text,
		},
		testimonialDate: {
			fontSize: FontSize.xss,
			fontFamily: theme.fonts.regular.fontFamily,
			color: '#777',
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
			fontSize: theme.size.xss,
			fontFamily: theme.fonts.semibold.fontFamily,
			color: theme.colors.text,
			marginLeft: 4,
		},
		testimonialItemText: {
			fontSize: theme.size.xsB,
			fontFamily: theme.fonts.regular.fontFamily,
			color: theme.colors.text,
			lineHeight: 20,
		},
	})
