/* eslint-disable react-native/no-color-literals */
import Colors from '@/src/constants/Colors'
import { fontFamily } from '@/src/constants/FontFamily'
import { FontSize } from '@/src/constants/FontSize'
import { Ionicons } from '@expo/vector-icons'
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'

type ServicesCardProps = {
	icon: keyof typeof Ionicons.glyphMap
	service: string
}

const ServicesCard = ({ icon, service }: ServicesCardProps) => {
	return (
		<TouchableOpacity activeOpacity={0.8} style={styles.container}>
			<View style={styles.containerIcon}>
				<Ionicons name={icon} size={40} color={Colors.primary} />
			</View>
			<Text style={styles.title}>{service}</Text>
		</TouchableOpacity>
	)
}

export default ServicesCard

const styles = StyleSheet.create({
	container: {
		alignItems: 'center',
		width: 88,
		gap: 10,
	},

	containerIcon: {
		backgroundColor: 'rgba(189, 189, 232, 0.32)',
		borderRadius: 18,
		//padding: 10,
		width: 70,
		justifyContent: 'center',
		alignItems: 'center',
		height: 70,
		marginBottom: -5,
		borderWidth: 1,
		borderColor: 'rgba(189, 189, 232, 0.32)',
	},
	title: {
		fontSize: FontSize.xs,
		fontFamily: fontFamily.poppins.medium,
		textAlign: 'center',
		color: Colors.primary,
	},
})
