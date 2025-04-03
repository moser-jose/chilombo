import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'
import { fontFamily } from '@/src/constants/FontFamily'
import { Ionicons } from '@expo/vector-icons'
import { FontSize } from '@/src/constants/FontSize'
import Colors from '@/src/constants/Colors'

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
	return (
		<View style={styles.container}>
			{tag && (
				<View style={styles.tagContainer}>
					<Text style={styles.tagText}>{tag}</Text>
				</View>
			)}
			<Text style={styles.title}>{title}</Text>
			<Text style={styles.description}>{description}</Text>

			<View style={styles.activitiesContainer}>
				<Text style={styles.activitiesTitle}>Actividades</Text>
				{activities.map((activity, index) => (
					<View key={index} style={styles.activityRow}>
						<Ionicons name="checkmark" size={18} color={Colors.primary} />
						<Text style={styles.activityText}>{activity}</Text>
					</View>
				))}
			</View>

			<View style={styles.priceContainer}>
				<Text style={styles.price}>{price.toLocaleString('pt-AO')}</Text>
				<Text style={styles.currency}>KZs</Text>
			</View>

			<TouchableOpacity
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

const styles = StyleSheet.create({
	container: {
		//backgroundColor: '#fff',
		borderRadius: 16,
		padding: 18,
		marginBottom: 16,
		marginHorizontal: 16,
		borderWidth: .5,
		borderColor: '#E0E0E0',
		backgroundColor: 'rgba(140, 137, 199, 0.03)',
		shadowColor: '#000',
		shadowOffset: {
			width: 0,
			height: 0.1,
		},
		shadowOpacity: 0.1,
		shadowRadius: 0.84,
		elevation: 5,
	},
	tagContainer: {
		position: 'absolute',
		right: 16,
		top: 16,
		backgroundColor: 'rgba(28, 28, 36, 0.07)',
		paddingHorizontal: 12,
		paddingVertical: 6,
		borderRadius: 8,
	},
	tagText: {
		color: Colors.primary,
		fontSize: FontSize.xss,
		fontFamily: fontFamily.poppins.medium,
	},
	title: {
		fontSize: FontSize.base,
		fontFamily: fontFamily.poppins.bold,
		color: '#172B4D',
		marginBottom: 8,
	},
	description: {
		fontSize: 14,
		fontFamily: fontFamily.poppins.regular,
		color: '#666',
		marginBottom: 10,
	},
	activitiesContainer: {
		marginBottom: 10,
	},
	activitiesTitle: {
		fontSize: 16,
		fontFamily: fontFamily.poppins.medium,
		color: '#172B4D',
		marginBottom: 12,
	},
	activityRow: {
		flexDirection: 'row',
		alignItems: 'center',
		marginBottom: 8,
	},
	activityText: {
		fontSize: 14,
		fontFamily: fontFamily.poppins.regular,
		color: '#666',
		marginLeft: 8,
	},
	priceContainer: {
		flexDirection: 'row',
		alignItems: 'baseline',
		marginBottom: 10,
	},
	price: {
		fontSize: FontSize.lg,
		fontFamily: fontFamily.poppins.bold,
		color: '#172B4D',
	},
	currency: {
		fontSize: 16,
		fontFamily: fontFamily.poppins.medium,
		color: '#666',
		marginLeft: 4,
	},
	button: {
		backgroundColor: Colors.primary,
		borderRadius: 12,
		paddingVertical: 10,
		flex: 1,
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'center',
	},
	buttonText: {
		color: '#fff',
		fontSize: 16,
		fontFamily: fontFamily.poppins.semibold,
		marginRight: 8,
	},
})
