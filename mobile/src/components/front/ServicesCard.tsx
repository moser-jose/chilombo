/* eslint-disable react-native/no-color-literals */
import { fontFamily } from '@/src/constants/FontFamily'
import { FontSize } from '@/src/constants/FontSize'
import { router } from 'expo-router'
import { View, StyleSheet, TouchableOpacity, Image } from 'react-native'
import { Text } from '../ui/Text'
import { useCustomTheme } from '@/src/context/ThemeContext'
import { ThemeColors } from '@/src/types/themeColors'

type ServicesCardProps = {
	data: any
}

const ServicesCard = ({ data }: ServicesCardProps) => {
	const { themeColors, themePreference } = useCustomTheme()
	const styles = makeStyles(themeColors as ThemeColors)
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
				<Image
					source={themePreference === 'dark' ? data.iconDark : data.icon}
					style={styles.icon}
				/>
			</View>
			<Text style={styles.title}>{data.service}</Text>
		</TouchableOpacity>
	)
}

export default ServicesCard

const makeStyles = (themeColors: ThemeColors) =>
	StyleSheet.create({
		container: {
			alignItems: 'center',
			width: 88,
			gap: 10,
		},
		containerIcon: {
			borderRadius: 18,
			width: 70,
			justifyContent: 'center',
			alignItems: 'center',
			height: 70,
			marginBottom: -5,
			borderWidth: 1,
			backgroundColor: themeColors.colors.ImputBackgroundColors,
			borderColor: themeColors.colors.tint,
		},
		title: {
			fontSize: FontSize.xs,
			fontFamily: fontFamily.poppins.medium,
			textAlign: 'center',
			color: themeColors.colors.text,
		},
		icon: {
			width: 45,
			height: 45,
		},
	})
