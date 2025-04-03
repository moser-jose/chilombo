import { Stack } from 'expo-router'
import React from 'react'
import { View, Text, StyleSheet, ScrollView, Image } from 'react-native'
import FastImage from 'react-native-fast-image'
import { fontFamily } from '@/src/constants/FontFamily'
import { Ionicons } from '@expo/vector-icons'

export default function LimpezaTapeteScreen() {
	return (
		<>
			<Stack.Screen
				options={{
					title: 'Limpeza de Tapete',
					headerShown: true,
				}}
			/>
			<ScrollView style={styles.container}>
				<View style={styles.imageContainer}>
					<FastImage
						source={require('../../../assets/empresa/tapete.jpg')}
						style={styles.image}
						resizeMode={FastImage.resizeMode.cover}
					/>
				</View>

				<View style={styles.contentContainer}>
					<Text style={styles.title}>Limpeza de Tapete</Text>

					<View style={styles.ratingContainer}>
						<Ionicons name="star" size={20} color="#fbd602" />
						<Text style={styles.rating}>4.5</Text>
					</View>

					<View style={styles.priceContainer}>
						<Text style={styles.price}>A partir de R$ 150,00</Text>
						<Text style={styles.period}>/tapete</Text>
					</View>

					<View style={styles.descriptionContainer}>
						<Text style={styles.descriptionTitle}>Descrição do Serviço</Text>
						<Text style={styles.description}>
							Nossa equipe especializada oferece um serviço completo de limpeza
							de tapetes, utilizando técnicas profissionais e produtos de alta
							qualidade. O serviço inclui:
						</Text>
						<View style={styles.bulletPoints}>
							<Text style={styles.bulletPoint}>
								• Limpeza profunda e remoção de manchas
							</Text>
							<Text style={styles.bulletPoint}>
								• Higienização e desinfecção
							</Text>
							<Text style={styles.bulletPoint}>
								• Remoção de ácaros e bactérias
							</Text>
							<Text style={styles.bulletPoint}>• Secagem profissional</Text>
							<Text style={styles.bulletPoint}>• Tratamento anti-mofo</Text>
						</View>
					</View>

					<View style={styles.contactContainer}>
						<Text style={styles.contactTitle}>Entre em Contato</Text>
						<Text style={styles.contactText}>
							Para mais informações e agendamento, entre em contato conosco:
						</Text>
						<Text style={styles.contactInfo}>📞 (11) 99999-9999</Text>
						<Text style={styles.contactInfo}>✉️ contato@chilombo.com</Text>
					</View>
				</View>
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
		width: '100%',
		height: 300,
	},
	image: {
		width: '100%',
		height: '100%',
	},
	contentContainer: {
		padding: 20,
	},
	title: {
		fontSize: 24,
		fontFamily: fontFamily.poppins.bold,
		color: '#172B4D',
		marginBottom: 10,
	},
	ratingContainer: {
		flexDirection: 'row',
		alignItems: 'center',
		marginBottom: 15,
	},
	rating: {
		fontSize: 16,
		fontFamily: fontFamily.poppins.medium,
		color: '#172B4D',
		marginLeft: 5,
	},
	priceContainer: {
		flexDirection: 'row',
		alignItems: 'baseline',
		marginBottom: 20,
	},
	price: {
		fontSize: 20,
		fontFamily: fontFamily.poppins.bold,
		color: '#FF5959',
	},
	period: {
		fontSize: 14,
		fontFamily: fontFamily.poppins.regular,
		color: '#666',
		marginLeft: 5,
	},
	descriptionContainer: {
		marginBottom: 20,
	},
	descriptionTitle: {
		fontSize: 18,
		fontFamily: fontFamily.poppins.semibold,
		color: '#172B4D',
		marginBottom: 10,
	},
	description: {
		fontSize: 14,
		fontFamily: fontFamily.poppins.regular,
		color: '#666',
		lineHeight: 20,
		marginBottom: 10,
	},
	bulletPoints: {
		marginTop: 10,
	},
	bulletPoint: {
		fontSize: 14,
		fontFamily: fontFamily.poppins.regular,
		color: '#666',
		marginBottom: 5,
	},
	contactContainer: {
		backgroundColor: '#f5f5f5',
		padding: 20,
		borderRadius: 10,
	},
	contactTitle: {
		fontSize: 18,
		fontFamily: fontFamily.poppins.semibold,
		color: '#172B4D',
		marginBottom: 10,
	},
	contactText: {
		fontSize: 14,
		fontFamily: fontFamily.poppins.regular,
		color: '#666',
		marginBottom: 10,
	},
	contactInfo: {
		fontSize: 14,
		fontFamily: fontFamily.poppins.medium,
		color: '#172B4D',
		marginBottom: 5,
	},
})
