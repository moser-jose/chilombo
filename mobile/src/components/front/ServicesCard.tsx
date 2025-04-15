/* eslint-disable react-native/no-color-literals */
import Colors from '@/src/constants/Colors'
import { fontFamily } from '@/src/constants/FontFamily'
import { FontSize } from '@/src/constants/FontSize'
import { router } from 'expo-router'
import { View, StyleSheet, TouchableOpacity, Image, useColorScheme } from 'react-native'
import { Ionicons, Text } from '../Themed'

type ServicesCardProps = {
	data: any
}

const ServicesCard = ({ data }: ServicesCardProps) => {
	const theme = useColorScheme() ?? 'light'
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
			style={styles(theme).container}
			onPress={handlePress}
		>
			<View style={styles(theme).containerIcon}>
				<Image source={data.icon} style={styles(theme).icon} />
			</View>
			<Text style={styles(theme).title}>{data.service}</Text>
		</TouchableOpacity>
	)
}

export default ServicesCard

const styles = (theme: 'light' | 'dark') =>
	StyleSheet.create({
		container: {
			alignItems: 'center',
			width: 88,
			gap: 10,
	},
	containerIcon: {
		backgroundColor: Colors[theme].colors.ImputBackgroundColors,//'rgba(162, 162, 239, 0.15)',
		borderRadius: 18,
		width: 70,
		justifyContent: 'center',
		alignItems: 'center',
		height: 70,
		marginBottom: -5,
		borderWidth: 1,
		borderColor: Colors[theme].colors.tint,
	},
	title: {
		fontSize: FontSize.xs,
		fontFamily: fontFamily.poppins.medium,
		textAlign: 'center',
		//color: Colors.primary,
	},
	icon: {
		width: 45,
		height: 45,
	},
})
