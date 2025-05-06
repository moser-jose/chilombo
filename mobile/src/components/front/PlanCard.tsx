import { View, Text, StyleSheet } from 'react-native'
import { TouchableOpacity } from '@/src/components/ui/TouchableOpacity'
import { Ionicons } from '@expo/vector-icons'
import { useCustomTheme } from '@/src/context/ThemeContext'
import { Theme } from '@/src/types/theme'
import { formatKwanza } from '@/src/utils/currency'
type PlanCardProps = {
	title: string
	description: string
	price: number
	activities: string[]
	tag?: string
	onPress: () => void
}

export default function PlanCard({
	title,
	description,
	price,
	activities,
	tag,
	onPress,
}: PlanCardProps) {
	const { theme } = useCustomTheme()
	const styles = useStyles(theme)
	return (
		<View style={styles.container}>
			<View style={styles.header}>
				<Text style={styles.title}>{title}</Text>
				{tag && (
					<View style={styles.tagContainer}>
						<Text style={styles.tagText}>{tag}</Text>
					</View>
				)}
			</View>
			<Text style={styles.description}>{description}</Text>

			<View style={styles.activitiesContainer}>
				<Text style={styles.activitiesTitle}>Actividades</Text>
				{activities.map((activity, index) => (
					<View key={index} style={styles.activityRow}>
						<Ionicons name="checkmark" size={18} color={theme.colors.primary} />
						<Text style={styles.activityText}>{activity}</Text>
					</View>
				))}
			</View>

			<View style={styles.priceContainer}>
				<Text style={styles.price}>{formatKwanza(price)}</Text>
				<Text style={styles.currency}>KZs</Text>
			</View>

			<TouchableOpacity
				type="primary"
				style={styles.button}
				onPress={onPress}
				activeOpacity={0.8}
			>
				<Text style={styles.buttonText}>Começar Agora</Text>
				<Ionicons name="arrow-forward" size={18} color="#fff" />
			</TouchableOpacity>
		</View>
	)
}

const useStyles = (theme: Theme) =>
	StyleSheet.create({
		container: {
			borderRadius: 16,
			padding: 18,
			marginBottom: 16,
			//marginHorizontal: 16,
			borderWidth: 0.5,
			borderColor: theme.colors.tint,
			backgroundColor: theme.colors.card,
			shadowOffset: { width: 0, height: 1 },
			shadowOpacity: 0.1,
			shadowRadius: 1,
			shadowColor: '#000',
			elevation: 5,
			width: '100%',
		},
		header: {
			flexDirection: 'row',
			justifyContent: 'space-between',
			alignItems: 'center',
			marginBottom: 10,
		},
		tagContainer: {
			backgroundColor: theme.colors.textMuted,
			paddingHorizontal: 12,
			paddingVertical: 6,
			borderRadius: 8,
			borderWidth: 1,
			borderColor: theme.colors.tint + 15,
		},
		tagText: {
			color: theme.colors.text,
			fontSize: theme.size.xss,
			fontFamily: theme.fonts.bold.fontFamily,
		},
		title: {
			fontSize: theme.size.base,
			fontFamily: theme.fonts.bold.fontFamily,
			color: theme.colors.text,
		},
		description: {
			fontSize: theme.size.xsB,
			fontFamily: theme.fonts.regular.fontFamily,
			color: theme.colors.text,
			marginBottom: 10,
		},
		activitiesContainer: {
			marginBottom: 10,
		},
		activitiesTitle: {
			fontSize: theme.size.xs,
			fontFamily: theme.fonts.bold.fontFamily,
			color: theme.colors.text,
			marginBottom: 12,
		},
		activityRow: {
			flexDirection: 'row',
			alignItems: 'center',
			marginBottom: 8,
		},
		activityText: {
			fontSize: theme.size.xsB,
			fontFamily: theme.fonts.regular.fontFamily,
			color: theme.colors.text,
			marginLeft: 8,
		},
		priceContainer: {
			flexDirection: 'row',
			alignItems: 'baseline',
			marginBottom: 10,
		},
		price: {
			fontSize: theme.size.base,
			fontFamily: theme.fonts.bold.fontFamily,
			color: theme.colors.text,
		},
		currency: {
			fontSize: theme.size.xsB,
			fontFamily: theme.fonts.medium.fontFamily,
			color: theme.colors.text,
			marginLeft: 4,
		},
		button: {
			paddingVertical: 10,
			borderRadius: 12,
		},
		buttonText: {
			color: '#fff',
			fontSize: theme.size.xsB,
			fontFamily: theme.fonts.medium.fontFamily,
			marginRight: 8,
		},
	})
