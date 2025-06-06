import { StyleSheet, ScrollView } from 'react-native'
import { Text, View } from '@/src/components/Themed'
import { Stack } from 'expo-router'
import { useCustomTheme } from '@/src/context/ThemeContext'
import { Theme } from '@/src/types/theme'

export default function TermsScreen() {
	const { theme } = useCustomTheme()
	const styles = makeStyles(theme)

	return (
		<>
			<Stack.Screen
				options={{
					headerTitle: 'Termos de Uso',
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

const makeStyles = (theme: Theme) =>
	StyleSheet.create({
		container: {
			flex: 1,
			backgroundColor: theme.colors.background,
		},
		content: {
			padding: 20,
		},
		title: {
			fontSize: theme.size.sm,
			fontFamily: theme.fonts.bold.fontFamily,
			color: theme.colors.primary,
			marginBottom: 25,
		},
		section: {
			fontSize: theme.size.sm,
			fontFamily: theme.fonts.semibold.fontFamily,
			color: theme.colors.primary,
			marginTop: 20,
			marginBottom: 10,
		},
		text: {
			fontSize: theme.size.xsB,
			fontFamily: theme.fonts.regular.fontFamily,
			color: theme.colors.text,
			lineHeight: 24,
			marginBottom: 15,
		},
		lastUpdate: {
			fontSize: theme.size.xs,
			fontFamily: theme.fonts.regular.fontFamily,
			color: theme.colors.text,
			marginTop: 30,
			textAlign: 'center',
			fontStyle: 'italic',
		},
	})
