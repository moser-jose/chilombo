import { FontSize } from '@/src/constants/FontSize'
import { fontFamily } from '@/src/constants/FontFamily'
import { router, Stack, useRouter } from 'expo-router'
import React from 'react'
import { View, Text, ScrollView, StyleSheet, TouchableOpacity } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import Colors from '@/src/constants/Colors'
import { Ionicons } from '@expo/vector-icons'

const PrivacityScreen = () => {
    const router = useRouter()
	return (
		<>
			<Stack.Screen
				options={{
					headerTitle: 'Politica de Privacidade',
					headerTitleStyle: {
						fontFamily: fontFamily.poppins.medium,
						fontSize: FontSize.lg,
						color: 'white',
					},
					headerStyle: {
						backgroundColor: Colors.primary,
					},
					headerTintColor: 'white',
					headerLeft: () => (
						<TouchableOpacity onPress={() => router.back()}>
							<Ionicons name="arrow-back" size={24} color="white" />
						</TouchableOpacity>
					),
				}}
			/>
			<SafeAreaView style={styles.container}>
				<ScrollView style={styles.scrollView}>
					<View style={styles.content}>
					<Text style={styles.title}>Política de Privacidade</Text>

					<Text style={styles.sectionTitle}>1. Coleta de Informações</Text>
					<Text style={styles.text}>
						Coletamos as seguintes informações quando você usa nosso aplicativo:
					</Text>
					<Text style={styles.bulletText}>
						• Nome completo e endereço de e-mail
					</Text>
					<Text style={styles.bulletText}>• Data de nascimento</Text>
					<Text style={styles.bulletText}>
						• Preferências de treino e objetivos
					</Text>
					<Text style={styles.bulletText}>
						• Histórico de exercícios e progresso
					</Text>
					<Text style={styles.bulletText}>
						• Dados de saúde (peso, altura, etc.)
					</Text>

					<Text style={styles.sectionTitle}>2. Uso das Informações</Text>
					<Text style={styles.text}>Utilizamos suas informações para:</Text>
					<Text style={styles.bulletText}>
						• Personalizar seu programa de treino
					</Text>
					<Text style={styles.bulletText}>
						• Enviar notificações relevantes
					</Text>
					<Text style={styles.bulletText}>• Melhorar nossos serviços</Text>
					<Text style={styles.bulletText}>• Gerar estatísticas anônimas</Text>

					<Text style={styles.sectionTitle}>3. Proteção de Dados</Text>
					<Text style={styles.text}>
						Implementamos as seguintes medidas de segurança:
					</Text>
					<Text style={styles.bulletText}>• Criptografia end-to-end</Text>
					<Text style={styles.bulletText}>• Autenticação de dois fatores</Text>
					<Text style={styles.bulletText}>• Backups regulares e seguros</Text>
					<Text style={styles.bulletText}>• Monitoramento constante</Text>

					<Text style={styles.sectionTitle}>4. Seus Direitos</Text>
					<Text style={styles.text}>Como usuário, você pode:</Text>
					<Text style={styles.bulletText}>
						• Solicitar acesso aos seus dados
					</Text>
					<Text style={styles.bulletText}>
						• Corrigir informações incorretas
					</Text>
					<Text style={styles.bulletText}>• Excluir sua conta e dados</Text>
					<Text style={styles.bulletText}>• Exportar suas informações</Text>

					<Text style={styles.sectionTitle}>5. Compartilhamento de Dados</Text>
					<Text style={styles.text}>
						Não compartilhamos suas informações pessoais com terceiros, exceto:
					</Text>
					<Text style={styles.bulletText}>• Quando exigido por lei</Text>
					<Text style={styles.bulletText}>
						• Com seu consentimento explícito
					</Text>
					<Text style={styles.bulletText}>
						• Para processamento de pagamentos
					</Text>

					<Text style={styles.sectionTitle}>6. Contato</Text>
					<Text style={styles.text}>
						Para questões sobre privacidade, entre em contato:
					</Text>
					<Text style={styles.bulletText}>• Email: privacy@chilombo.com</Text>
					<Text style={styles.bulletText}>• Telefone: (XX) XXXX-XXXX</Text>
				</View>
			</ScrollView>
		</SafeAreaView>
        </>
	)
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: '#fff',
	},
	scrollView: {
		flex: 1,
	},
	content: {
		padding: 20,
	},
	title: {
		fontSize: 24,
		fontWeight: 'bold',
		marginBottom: 20,
		textAlign: 'center',
	},
	sectionTitle: {
		fontSize: 18,
		fontWeight: 'bold',
		marginTop: 15,
		marginBottom: 10,
	},
	text: {
		fontSize: 16,
		lineHeight: 24,
		marginBottom: 10,
		color: '#333',
	},
	bulletText: {
		fontSize: 16,
		lineHeight: 24,
		marginBottom: 5,
		marginLeft: 15,
		color: '#333',
	},
})

export default PrivacityScreen
