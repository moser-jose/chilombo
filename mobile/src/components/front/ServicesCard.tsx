/* eslint-disable react-native/no-color-literals */
import Colors from '@/src/constants/Colors'
import { fontFamily } from '@/src/constants/FontFamily'
import { FontSize } from '@/src/constants/FontSize'
import { router } from 'expo-router'
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native'

type ServicesCardProps = {
	data: any
}

const ServicesCard = ({ data }: ServicesCardProps) => {
	const handlePress = () => {
		router.push({
			pathname: '/(services)/service-details',
			params: {
				id: data.id,
				data: data,
			},
		})
	}

	return (
		<TouchableOpacity
			activeOpacity={0.8}
			style={styles.container}
			onPress={handlePress}
		>
			<View style={styles.containerIcon}>
				<Image source={data.icon} style={styles.icon} />
			</View>
			<Text style={styles.title}>{data.service}</Text>
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
