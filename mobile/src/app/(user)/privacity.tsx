import {
	ScrollView,
	StyleSheet,
	TouchableOpacity,
	useColorScheme,
} from 'react-native'
import { Text, View } from '@/src/components/Themed'
import { router, Stack } from 'expo-router'
import { fontFamily } from '@/src/constants/FontFamily'
import { FontSize } from '@/src/constants/FontSize'
import Colors from '@/src/constants/Theme'
import { Ionicons } from '@expo/vector-icons'
import { useCustomTheme } from '@/src/context/ThemeContext'
import { Theme } from '@/src/types/theme'

export default function PrivacyPolicyScreen() {
	const { theme } = useCustomTheme()
	const styles = makeStyles(theme)
	const policies = [
		{
			title: 'Coleta de Dados',
			description:
				'Coletamos informações necessárias para fornecer nossos serviços, incluindo dados de perfil, localização e preferências de uso.',
		},
		{
			title: 'Uso de Informações',
			description:
				'Utilizamos seus dados para personalizar sua experiência, melhorar nossos serviços e garantir sua segurança na plataforma.',
		},
		{
			title: 'Compartilhamento',
			description:
				'Suas informações podem ser compartilhadas apenas com parceiros autorizados e conforme necessário para a prestação dos serviços.',
		},
		{
			title: 'Segurança',
			description:
				'Implementamos medidas técnicas e organizacionais para proteger seus dados contra acesso não autorizado e vazamentos.',
		},
		{
			title: 'Cookies e Rastreamento',
			description:
				'Utilizamos cookies e tecnologias similares para melhorar a navegação e fornecer conteúdo personalizado.',
		},
		{
			title: 'Direitos do Usuário',
			description:
				'Você tem direito de acessar, corrigir, excluir e portar seus dados pessoais a qualquer momento.',
		},
		{
			title: 'Retenção de Dados',
			description:
				'Mantemos seus dados apenas pelo tempo necessário para fornecer nossos serviços ou conforme exigido por lei.',
		},
		{
			title: 'Menores de Idade',
			description:
				'Não coletamos intencionalmente dados de menores de 13 anos sem consentimento dos responsáveis.',
		},
		{
			title: 'Atualizações da Política',
			description:
				'Nossa política pode ser atualizada periodicamente, e você será notificado sobre mudanças significativas.',
		},
		{
			title: 'Contato',
			description:
				'Para questões sobre privacidade, entre em contato através do nosso canal de suporte ou e-mail dedicado.',
		},
	]

	return (
		<>
			<Stack.Screen
				options={{
					headerTitle: 'Politica de Privacidade',
				}}
			/>
			<ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
				<View style={styles.content}>
					<Text style={styles.intro}>
						Sua privacidade é importante para nós. Esta política descreve como
						tratamos suas informações pessoais.
					</Text>

					{policies.map((policy, index) => (
						<View key={index} style={styles.policyItem}>
							<Text style={styles.policyTitle}>
								{index + 1 + '.  ' + policy.title}
							</Text>
							<Text style={styles.policyText}>{policy.description}</Text>
						</View>
					))}

					<Text style={styles.footer}>
						Última atualização: {new Date().toLocaleDateString()}
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
		},
		content: {
			padding: 20,
		},
		intro: {
			fontSize: theme.size.sm,
			fontFamily: theme.fonts.regular.fontFamily,
			marginBottom: 20,
			color: theme.colors.text,
			lineHeight: 24,
		},
		policyItem: {
			marginBottom: 20,
			backgroundColor: 'transparent',
		},
		policyTitle: {
			fontSize: theme.size.sm,
			fontFamily: theme.fonts.bold.fontFamily,
			marginBottom: 8,
			color: theme.colors.primary,
		},
		policyText: {
			fontSize: theme.size.xsB,
			fontFamily: theme.fonts.regular.fontFamily,
			color: theme.colors.text,
			lineHeight: 20,
		},
		footer: {
			marginTop: 20,
			fontSize: theme.size.xs,
			fontFamily: theme.fonts.regular.fontFamily,
			color: theme.colors.text,
			textAlign: 'center',
		},
	})
