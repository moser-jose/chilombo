/* eslint-disable react-native/no-color-literals */
import { FontSize } from '@/src/constants/FontSize'
import { router } from 'expo-router'
import { View, StyleSheet, TouchableOpacity, Image } from 'react-native'
import { Text } from '../ui/Text'
import { useCustomTheme } from '@/src/context/ThemeContext'
import { Theme } from '@/src/types/theme'

type ServicesCardProps = {
	data: any
}

const ServicesCard = ({ data }: ServicesCardProps) => {
	const { theme, themePreference, effectiveTheme } = useCustomTheme()
	const styles = makeStyles(theme as Theme)
	const handlePress = () => {
		router.push({
			pathname: '/(services)/service-details',
			params: {
				id: data.id,
				data: data,
				origin: 'home',
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
					source={effectiveTheme === 'dark' ? data.iconDark : data.icon}
					style={styles.icon}
				/>
			</View>
			<Text style={styles.title}>{data.service}</Text>
		</TouchableOpacity>
	)
}

export default ServicesCard

const makeStyles = (theme: Theme) =>
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
			backgroundColor: theme.colors.ImputBackgroundColors,
			borderColor: theme.colors.tint,
		},
		title: {
			fontSize: FontSize.xs,
			fontFamily: theme.fonts.medium.fontFamily,
			textAlign: 'center',
			color: theme.colors.text,
		},
		icon: {
			width: 45,
			height: 45,
		},
	})
