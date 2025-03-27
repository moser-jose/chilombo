import { StyleSheet, ScrollView } from 'react-native'
import { Text, View } from '@/src/components/Themed'
import { Stack, useRouter } from 'expo-router'
import { FontSize } from '@/src/constants/FontSize'
import { fontFamily } from '@/src/constants/FontFamily'
import Colors from '@/src/constants/Colors'
import { Ionicons } from '@expo/vector-icons'
import { TouchableOpacity } from 'react-native'

export default function TermsScreen() {
	const router = useRouter()

	return (
		<>
			<Stack.Screen
				options={{
					headerTitle: 'Termos de Uso',
					headerTitleStyle: {
						fontFamily: fontFamily.poppins.medium,
						fontSize: FontSize.sm,
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
			<ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
				<View style={styles.content}>

					<Text style={styles.section}>1. Aceitação dos Termos</Text>
					<Text style={styles.text}>
						Ao acessar e usar este aplicativo, você aceita e concorda em cumprir
						estes termos e condições de uso.
					</Text>

					<Text style={styles.section}>2. Uso do Serviço</Text>
					<Text style={styles.text}>
						Nosso serviço permite que você gerencie e organize suas atividades
						de forma eficiente. Você concorda em usar o serviço apenas para
						propósitos legais e de acordo com estes termos.
					</Text>

					<Text style={styles.section}>3. Privacidade</Text>
					<Text style={styles.text}>
						Sua privacidade é importante para nós. Consulte nossa Política de
						Privacidade para entender como coletamos, usamos e protegemos seus
						dados pessoais.
					</Text>

					<Text style={styles.section}>4. Conta do Usuário</Text>
					<Text style={styles.text}>
						Você é responsável por manter a confidencialidade de sua conta e
						senha. Notifique-nos imediatamente sobre qualquer uso não
						autorizado.
					</Text>

					<Text style={styles.section}>5. Modificações do Serviço</Text>
					<Text style={styles.text}>
						Reservamos o direito de modificar ou descontinuar o serviço a
						qualquer momento, com ou sem aviso prévio.
					</Text>

					<Text style={styles.section}>6. Limitação de Responsabilidade</Text>
					<Text style={styles.text}>
						Não nos responsabilizamos por danos indiretos, incidentais ou
						consequentes decorrentes do uso do serviço.
					</Text>

					<Text style={styles.lastUpdate}>
						Última atualização: Janeiro 2024
					</Text>
				</View>
			</ScrollView>
		</>
	)
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: Colors.background,
	},
	content: {
		padding: 20,
	},
	title: {
		fontSize: FontSize.sm,
		fontFamily: fontFamily.poppins.bold,
		color: Colors.primary,
		marginBottom: 25,
	},
	section: {
		fontSize: FontSize.sm,
		fontFamily: fontFamily.poppins.semibold,
		color: Colors.primary,
		marginTop: 20,
		marginBottom: 10,
	},
	text: {
		fontSize: FontSize.xsB,
		fontFamily: fontFamily.poppins.regular,
		color: Colors.text,
		lineHeight: 24,
		marginBottom: 15,
	},
	lastUpdate: {
		fontSize: FontSize.xs,
		fontFamily: fontFamily.poppins.regular,
		color: Colors.textLight,
		marginTop: 30,
		textAlign: 'center',
		fontStyle: 'italic',
	},
})
