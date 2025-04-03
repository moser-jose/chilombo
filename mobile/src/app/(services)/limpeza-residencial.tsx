import { Stack } from 'expo-router'
import React from 'react'
import { View, Text, StyleSheet, ScrollView, Image } from 'react-native'
import FastImage from 'react-native-fast-image'
import { fontFamily } from '@/src/constants/FontFamily'
import { Ionicons } from '@expo/vector-icons'
import PlanCard from '@/src/components/front/PlanCard'

export default function LimpezaResidencialScreen() {
	const handlePlanSelection = (plan: string) => {
		// Implementar lógica de seleção do plano
		console.log('Plano selecionado:', plan)
	}

	return (
		<>
			<Stack.Screen
				options={{
					title: 'Limpeza de Residência',
					headerShown: true,
				}}
			/>
			<ScrollView style={styles.container}>
				<FastImage
					source={require('../../../assets/empresa/empregada.png')}
					style={styles.headerImage}
					resizeMode={FastImage.resizeMode.cover}
				/>

				<Text style={styles.description}>
					Os preços aplicam-se aos serviços de limpeza de residências e
					domésticos
				</Text>

				<View style={styles.periodSelector}>
					<Text style={[styles.periodOption, styles.periodOptionActive]}>
						Diário
					</Text>
					<Text style={styles.periodOption}>Mensal</Text>
				</View>

				<PlanCard
					title="Básico"
					description="Ideal para residências pequenas até 2 quartos."
					price={45000}
					activities={['Limpeza Geral', 'Aspiração e Varredura']}
					tag="Popular"
					onPress={() => handlePlanSelection('basic')}
				/>

				<PlanCard
					title="Pro"
					description="Ideal para residências médias até 4 quartos"
					price={60000}
					activities={[
						'Tudo do plano Básico',
						'Limpeza de Vidros',
						'Limpeza de Móveis',
					]}
					tag="Recomendado"
					onPress={() => handlePlanSelection('pro')}
				/>

				<PlanCard
					title="Premium"
					description="Ideal para residências grandes acima de 4 quartos"
					price={75000}
					activities={[
						'Tudo do plano Pro',
						'Limpeza de Jardim',
						'Lavagem de Garagem',
					]}
					tag="melhor valor"
					onPress={() => handlePlanSelection('premium')}
				/>
			</ScrollView>
		</>
	)
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: '#fff',
	},
	headerImage: {
		width: '100%',
		height: 200,
	},
	description: {
		fontSize: 14,
		fontFamily: fontFamily.poppins.regular,
		color: '#666',
		marginHorizontal: 16,
		marginTop: 20,
		marginBottom: 16,
	},
	periodSelector: {
		flexDirection: 'row',
		justifyContent: 'center',
		alignItems: 'center',
		marginBottom: 20,
		paddingHorizontal: 16,
	},
	periodOption: {
		paddingHorizontal: 24,
		paddingVertical: 8,
		fontSize: 14,
		fontFamily: fontFamily.poppins.medium,
		color: '#666',
	},
	periodOptionActive: {
		color: '#6C63FF',
		borderBottomWidth: 2,
		borderBottomColor: '#6C63FF',
	},
})
