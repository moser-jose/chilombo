/* eslint-disable react-native/no-color-literals */
import Colors from '@/src/constants/Colors'
import { fontFamily } from '@/src/constants/FontFamily'
import { FontSize } from '@/src/constants/FontSize'
import { Ionicons } from '@expo/vector-icons'
import { router } from 'expo-router'
import {
	View,
	Text,
	StyleSheet,
	TouchableOpacity,
	Image,
	ImageSourcePropType,
} from 'react-native'

type ServicesCardProps = {
	icon: ImageSourcePropType
	service: string
	route: string
}

const ServicesCard = ({ icon, service, route }: ServicesCardProps) => {
	const handlePress = () => {
		router.push(route)
	}

	return (
		<TouchableOpacity
			activeOpacity={0.8}
			style={styles.container}
			onPress={handlePress}
		>
			<View style={styles.containerIcon}>
				<Image source={icon} style={styles.icon} />
				{/* <Ionicons name={icon} size={40} color={Colors.primary} /> */}
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
		backgroundColor: 'rgba(189, 189, 232, 0.15)',
		borderRadius: 18,
		//padding: 10,
		width: 70,
		justifyContent: 'center',
		alignItems: 'center',
		height: 70,
		marginBottom: -5,
		borderWidth: 1,
		borderColor: 'rgba(189, 189, 232, 0.53)',
	},
	title: {
		fontSize: FontSize.xs,
		fontFamily: fontFamily.poppins.medium,
		textAlign: 'center',
		color: Colors.primary,
	},
	icon: {
		width: 45,
		height: 45,
	},
})
