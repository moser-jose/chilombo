import { Stack } from 'expo-router'
import React from 'react'
import { View, Text, StyleSheet, ScrollView, Image } from 'react-native'
import FastImage from 'react-native-fast-image'
import { fontFamily } from '@/src/constants/FontFamily'
import { Ionicons } from '@expo/vector-icons'

export default function TratamentoJardimScreen() {
	return (
		<>
			<Stack.Screen
				options={{
					title: 'Tratamento de Jardim',
					headerShown: true,
				}}
			/>
			<ScrollView style={styles.container}>
				<View style={styles.imageContainer}>
					<FastImage
						source={require('../../../assets/icons/garden.png')}
						style={styles.image}
						resizeMode={FastImage.resizeMode.cover}
					/>
				</View>

				<View style={styles.contentContainer}>
					<Text style={styles.title}>Tratamento de Jardim</Text>

					<View style={styles.ratingContainer}>
						<Ionicons name="star" size={20} color="#fbd602" />
						<Text style={styles.rating}>4.6</Text>
					</View>

					<View style={styles.priceContainer}>
						<Text style={styles.price}>A partir de R$ 300,00</Text>
						<Text style={styles.period}>/mês</Text>
					</View>

					<View style={styles.descriptionContainer}>
						<Text style={styles.descriptionTitle}>Descrição do Serviço</Text>
						<Text style={styles.description}>
							Nossa equipe especializada oferece um serviço completo de
							tratamento e manutenção de jardins, garantindo a saúde e beleza
							das suas plantas. O serviço inclui:
						</Text>
						<View style={styles.bulletPoints}>
							<Text style={styles.bulletPoint}>
								• Poda de plantas e árvores
							</Text>
							<Text style={styles.bulletPoint}>• Adubação e fertilização</Text>
							<Text style={styles.bulletPoint}>• Controle de pragas</Text>
							<Text style={styles.bulletPoint}>• Irrigação e rega</Text>
							<Text style={styles.bulletPoint}>• Limpeza e manutenção</Text>
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
