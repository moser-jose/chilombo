import { Stack, router } from 'expo-router'
import React, { useState } from 'react'
import {
	View,
	Text,
	StyleSheet,
	ScrollView,
	TouchableOpacity,
	Dimensions,
} from 'react-native'
import FastImage from 'react-native-fast-image'
import { fontFamily } from '@/src/constants/FontFamily'
import {
	Ionicons,
	MaterialCommunityIcons,
	FontAwesome5,
} from '@expo/vector-icons'
import PlanCard from '@/src/components/front/PlanCard'
import Colors from '@/src/constants/Colors'
import { FontSize } from '@/src/constants/FontSize'
import { LinearGradient } from 'react-native-linear-gradient'

const { width } = Dimensions.get('window')

export default function EmpregadaDomesticaScreen() {
	const [isMonthly, setIsMonthly] = useState(false)
	const [showAllReviews, setShowAllReviews] = useState(false)

	const handlePlanSelection = (plan: string) => {
		// Implementar lógica de seleção do plano
		console.warn('Plano selecionado:', plan)
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

	const reviews = [
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
	]

	const visibleReviews = showAllReviews ? reviews : reviews.slice(0, 2)

	return (
		<>
			<Stack.Screen
				options={{
					title: 'Limpeza de Residência',
					headerShown: true,
					headerLeft: () => (
						<TouchableOpacity
							onPress={() => router.back()}
							style={styles.backButton}
						>
							<Ionicons name="chevron-back" size={24} color={Colors.primary} />
						</TouchableOpacity>
					),
				}}
			/>
			<View style={styles.imageContainer}>
				<FastImage
					source={require('../../../assets/empresa/empregada.png')}
					style={styles.headerImage}
					resizeMode={FastImage.resizeMode.cover}
				/>
				<LinearGradient
					colors={['rgba(0,0,0,0.6)', 'transparent']}
					style={styles.gradient}
				/>
				<View style={styles.imageOverlay}>
					<Text style={styles.serviceTitle}>Limpeza de Residência</Text>
					<View style={styles.ratingRow}>
						{renderRating(4.7)}
						<Text style={styles.ratingText}>4.7 (124 avaliações)</Text>
					</View>
				</View>
				<TouchableOpacity
					onPress={() => router.back()}
					style={styles.backButton}
				>
					<Ionicons name="chevron-back" size={24} color={Colors.primary} />
				</TouchableOpacity>
			</View>
			<ScrollView style={styles.container}>
				<View style={styles.infoCard}>
					<Text style={styles.descriptionTitle}>Sobre o serviço</Text>
					<Text style={styles.description}>
						Profissionais experientes para cuidar da limpeza completa da sua
						residência. Os preços aplicam-se aos serviços de limpeza de
						residências e domésticos, com diferentes planos para atender às suas
						necessidades.
					</Text>

					<View style={styles.statsContainer}>
						<View style={styles.statItem}>
							<Ionicons name="time-outline" size={24} color={Colors.primary} />
							<Text style={styles.statValue}>2-4h</Text>
							<Text style={styles.statLabel}>Duração</Text>
						</View>
						<View style={styles.statItem}>
							<FontAwesome5
								name="user-check"
								size={20}
								color={Colors.primary}
							/>
							<Text style={styles.statValue}>250+</Text>
							<Text style={styles.statLabel}>Profissionais</Text>
						</View>
						<View style={styles.statItem}>
							<MaterialCommunityIcons
								name="home-heart"
								size={24}
								color={Colors.primary}
							/>
							<Text style={styles.statValue}>2.500+</Text>
							<Text style={styles.statLabel}>Serviços</Text>
						</View>
					</View>
				</View>

				<View style={styles.benefitsSection}>
					<Text style={styles.sectionTitle}>Benefícios</Text>
					<View style={styles.benefitRow}>
						<View style={styles.benefitItem}>
							<Ionicons
								name="shield-checkmark"
								size={24}
								color={Colors.primary}
							/>
							<Text style={styles.benefitText}>Garantia de satisfação</Text>
						</View>
						<View style={styles.benefitItem}>
							<Ionicons name="people" size={24} color={Colors.primary} />
							<Text style={styles.benefitText}>Profissionais verificados</Text>
						</View>
					</View>
					<View style={styles.benefitRow}>
						<View style={styles.benefitItem}>
							<Ionicons name="calendar" size={24} color={Colors.primary} />
							<Text style={styles.benefitText}>Agendamento flexível</Text>
						</View>
						<View style={styles.benefitItem}>
							<Ionicons name="sparkles" size={24} color={Colors.primary} />
							<Text style={styles.benefitText}>Produtos de qualidade</Text>
						</View>
					</View>
				</View>

				<Text style={styles.sectionTitle}>Planos disponíveis</Text>
				<View style={styles.periodSelector}>
					<TouchableOpacity
						onPress={() => setIsMonthly(false)}
						style={[styles.periodOptionContainer]}
					>
						<Text
							style={[
								styles.periodOption,
								!isMonthly && styles.periodOptionActive,
							]}
						>
							Diário
						</Text>
					</TouchableOpacity>
					<TouchableOpacity
						onPress={() => setIsMonthly(true)}
						style={[styles.periodOptionContainer]}
					>
						<Text
							style={[
								styles.periodOption,
								isMonthly && styles.periodOptionActive,
							]}
						>
							Mensal
						</Text>
					</TouchableOpacity>
				</View>

				<PlanCard
					title="Básico"
					description="Ideal para famílias com um agregado reduzido."
					price={getPrice(50000)}
					activities={[
						'Limpeza Geral',
						'Higienização da Roupa',
						'Limpeza de 4 divisões',
					]}
					tag="Popular"
					onPress={() => handlePlanSelection('basic')}
				/>

				<PlanCard
					title="Pro"
					description="Ideal para famílias com 5 a 6 membros"
					price={getPrice(65000)}
					activities={[
						'Tudo do plano Básico',
						'Preparo de duas Refeições',
						'Limpeza de janelas',
					]}
					tag="Recomendado"
					onPress={() => handlePlanSelection('pro')}
				/>

				<PlanCard
					title="Premium"
					description="Ideal para famílias com mais de 7 membros"
					price={getPrice(80000)}
					activities={[
						'Tudo do plano Pro',
						'Cuidar de Crianças',
						'Organização de armários',
						'Limpeza profunda',
					]}
					tag="melhor valor"
					onPress={() => handlePlanSelection('premium')}
				/>

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
									<TouchableOpacity style={styles.likeButton}>
										<Ionicons
											name="thumbs-up-outline"
											size={16}
											color={Colors.primary}
										/>
										<Text style={styles.likeCount}>{review.likes}</Text>
									</TouchableOpacity>
								</View>
							</View>
						</View>
					))}

					{!showAllReviews && reviews.length > 2 && (
						<TouchableOpacity
							style={styles.showMoreButton}
							onPress={() => setShowAllReviews(true)}
						>
							<Text style={styles.showMoreText}>Ver mais avaliações</Text>
							<Ionicons name="chevron-down" size={16} color={Colors.primary} />
						</TouchableOpacity>
					)}
				</View>

				<TouchableOpacity style={styles.ctaButton}>
					<Text style={styles.ctaButtonText}>Solicitar Serviço Agora</Text>
				</TouchableOpacity>
			</ScrollView>
		</>
	)
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: '#fff',
	},
	imageContainer: {
		position: 'relative',
	},
	headerImage: {
		width: '100%',
		height: 180,
	},
	gradient: {
		position: 'absolute',
		left: 0,
		right: 0,
		top: 0,
		height: 180,
	},
	imageOverlay: {
		position: 'absolute',
		bottom: 20,
		left: 16,
	},
	serviceTitle: {
		fontSize: FontSize.lg,
		fontFamily: fontFamily.poppins.bold,
		color: '#fff',
		textShadowColor: 'rgba(0, 0, 0, 0.75)',
		textShadowOffset: { width: -1, height: 1 },
		textShadowRadius: 10,
	},
	ratingRow: {
		flexDirection: 'row',
		alignItems: 'center',
	},
	ratingText: {
		color: '#fff',
		marginLeft: 6,
		fontFamily: fontFamily.poppins.regular,
		fontSize: FontSize.xs,
		textShadowColor: 'rgba(0, 0, 0, 0.75)',
		textShadowOffset: { width: -1, height: 1 },
		textShadowRadius: 10,
	},
	infoCard: {
		marginHorizontal: 16,
		marginTop: 16,
		padding: 16,
		backgroundColor: '#fff',
		borderRadius: 12,
		elevation: 2,
		shadowColor: '#000',
		shadowOffset: { width: 0, height: 2 },
		shadowOpacity: 0.1,
		shadowRadius: 4,
	},
	descriptionTitle: {
		fontSize: FontSize.base,
		fontFamily: fontFamily.poppins.semiBold,
		color: '#333',
		marginBottom: 8,
	},
	description: {
		fontSize: FontSize.sm,
		fontFamily: fontFamily.poppins.regular,
		color: '#666',
		lineHeight: 20,
	},
	statsContainer: {
		flexDirection: 'row',
		justifyContent: 'space-between',
		marginTop: 16,
		paddingTop: 16,
		borderTopWidth: 1,
		borderTopColor: '#f0f0f0',
	},
	statItem: {
		alignItems: 'center',
		flex: 1,
	},
	statValue: {
		fontSize: FontSize.sm,
		fontFamily: fontFamily.poppins.bold,
		color: '#333',
		marginTop: 4,
	},
	statLabel: {
		fontSize: FontSize.xs,
		fontFamily: fontFamily.poppins.regular,
		color: '#888',
	},
	sectionTitle: {
		fontSize: FontSize.base,
		fontFamily: fontFamily.poppins.semiBold,
		color: '#333',
		marginHorizontal: 16,
		marginTop: 24,
		marginBottom: 12,
	},
	benefitsSection: {
		marginHorizontal: 16,
		marginTop: 8,
		padding: 16,
		backgroundColor: '#f9f9f9',
		borderRadius: 12,
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
		fontSize: FontSize.xs,
		fontFamily: fontFamily.poppins.medium,
		color: '#555',
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
		fontSize: FontSize.sm,
		fontFamily: fontFamily.poppins.bold,
		color: '#666',
	},
	periodOptionActive: {
		color: Colors.primary,
		borderBottomWidth: 2,
		borderBottomColor: Colors.primary,
	},
	backButton: {
		position: 'absolute',
		top: 60,
		left: 16,
		padding: 8,
		borderRadius: 20,
		backgroundColor: 'rgba(245, 240, 240, 0.44)',
	},
	divider: {
		height: 8,
		backgroundColor: '#f5f5f5',
		marginVertical: 16,
	},
	reviewSection: {
		marginHorizontal: 16,
		marginTop: 8,
		marginBottom: 24,
		padding: 16,
		backgroundColor: '#f9f9f9',
		borderRadius: 12,
		elevation: 3,
		shadowColor: '#000',
		shadowOffset: { width: 0, height: 2 },
		shadowOpacity: 0.1,
		shadowRadius: 4,
	},
	reviewTitle: {
		fontSize: FontSize.base,
		fontFamily: fontFamily.poppins.bold,
		color: Colors.primary,
		marginBottom: 4,
		textAlign: 'center',
	},
	overallRating: {
		alignItems: 'center',
		marginBottom: 16,
	},
	ratingBig: {
		fontSize: 36,
		fontFamily: fontFamily.poppins.bold,
		color: '#333',
	},
	ratingCount: {
		fontSize: FontSize.xs,
		fontFamily: fontFamily.poppins.regular,
		color: '#777',
		marginTop: 4,
	},
	reviewItem: {
		flexDirection: 'row',
		marginBottom: 16,
		paddingBottom: 16,
		borderBottomWidth: 1,
		borderBottomColor: '#eaeaea',
	},
	reviewHeader: {
		flexDirection: 'row',
		justifyContent: 'space-between',
		alignItems: 'center',
	},
	reviewDate: {
		fontSize: FontSize.xs,
		fontFamily: fontFamily.poppins.regular,
		color: '#999',
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
		fontSize: FontSize.sm,
		fontFamily: fontFamily.poppins.bold,
		color: '#333',
		marginBottom: 4,
	},
	starContainer: {
		flexDirection: 'row',
		marginBottom: 4,
	},
	reviewText: {
		fontSize: FontSize.sm,
		fontFamily: fontFamily.poppins.regular,
		color: '#555',
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
		fontSize: FontSize.xs,
		fontFamily: fontFamily.poppins.regular,
		color: '#777',
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
		fontSize: FontSize.sm,
		fontFamily: fontFamily.poppins.medium,
		color: Colors.primary,
		marginRight: 4,
	},
	ctaButton: {
		backgroundColor: Colors.primary,
		borderRadius: 8,
		paddingVertical: 14,
		marginHorizontal: 16,
		marginBottom: 30,
		alignItems: 'center',
		elevation: 2,
		shadowColor: '#000',
		shadowOffset: { width: 0, height: 2 },
		shadowOpacity: 0.1,
		shadowRadius: 4,
	},
	ctaButtonText: {
		color: '#fff',
		fontSize: FontSize.base,
		fontFamily: fontFamily.poppins.bold,
	},
})
