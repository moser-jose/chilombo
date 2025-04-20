import { StyleSheet, ScrollView, useColorScheme } from 'react-native'
import { Text, View } from '@/src/components/Themed'
import { Stack } from 'expo-router'
import { FontSize } from '@/src/constants/FontSize'
import { fontFamily } from '@/src/constants/FontFamily'
import Colors from '@/src/constants/Colors'

export default function TermsScreen() {
	const theme = useColorScheme() ?? 'light'

	return (
		<>
			<Stack.Screen
				options={{
					headerTitle: 'Termos de Uso',
				}}
			/>
			<ScrollView
				style={styles(theme).container}
				showsVerticalScrollIndicator={false}
			>
				<View style={styles(theme).content}>
					<Text style={styles(theme).section}>1. Aceitação dos Termos</Text>
					<Text style={styles(theme).text}>
						Ao acessar e usar este aplicativo, você aceita e concorda em cumprir
						estes termos e condições de uso.
					</Text>

					<Text style={styles(theme).section}>2. Uso do Serviço</Text>
					<Text style={styles(theme).text}>
						Nosso serviço permite que você gerencie e organize suas atividades
						de forma eficiente. Você concorda em usar o serviço apenas para
						propósitos legais e de acordo com estes termos.
					</Text>

					<Text style={styles(theme).section}>3. Privacidade</Text>
					<Text style={styles(theme).text}>
						Sua privacidade é importante para nós. Consulte nossa Política de
						Privacidade para entender como coletamos, usamos e protegemos seus
						dados pessoais.
					</Text>

					<Text style={styles(theme).section}>4. Conta do Usuário</Text>
					<Text style={styles(theme).text}>
						Você é responsável por manter a confidencialidade de sua conta e
						senha. Notifique-nos imediatamente sobre qualquer uso não
						autorizado.
					</Text>

					<Text style={styles(theme).section}>5. Modificações do Serviço</Text>
					<Text style={styles(theme).text}>
						Reservamos o direito de modificar ou descontinuar o serviço a
						qualquer momento, com ou sem aviso prévio.
					</Text>

					<Text style={styles(theme).section}>
						6. Limitação de Responsabilidade
					</Text>
					<Text style={styles(theme).text}>
						Não nos responsabilizamos por danos indiretos, incidentais ou
						consequentes decorrentes do uso do serviço.
					</Text>

					<Text style={styles(theme).lastUpdate}>
						Última atualização: Janeiro 2024
					</Text>
				</View>
			</ScrollView>
		</>
	)
}

const styles = (theme: 'dark' | 'light') =>
	StyleSheet.create({
		container: {
			flex: 1,
			backgroundColor: Colors[theme].colors.background,
		},
		content: {
			padding: 20,
		},
		title: {
			fontSize: FontSize.sm,
			fontFamily: fontFamily.poppins.bold,
			color: Colors[theme].colors.primary,
			marginBottom: 25,
		},
		section: {
			fontSize: FontSize.sm,
			fontFamily: fontFamily.poppins.semibold,
			color: Colors[theme].colors.primary,
			marginTop: 20,
			marginBottom: 10,
		},
		text: {
			fontSize: FontSize.xsB,
			fontFamily: fontFamily.poppins.regular,
			color: Colors[theme].colors.text,
			lineHeight: 24,
			marginBottom: 15,
		},
		lastUpdate: {
			fontSize: FontSize.xs,
			fontFamily: fontFamily.poppins.regular,
			color: Colors[theme].colors.text,
			marginTop: 30,
			textAlign: 'center',
			fontStyle: 'italic',
		},
	})
