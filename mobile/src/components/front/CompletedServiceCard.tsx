/* eslint-disable react-native/no-color-literals */
import * as React from 'react'
import {
	View,
	Text,
	StyleSheet,
	TouchableOpacity,
	StyleProp,
	ViewStyle,
} from 'react-native'
import { fontFamily } from '../../constants/FontFamily'
import { FontSize } from '../../constants/FontSize'
import { Ionicons } from '@expo/vector-icons'
import FastImage from 'react-native-fast-image'
import { router } from 'expo-router'
import Star from './Star'
import { useCustomTheme } from '@/src/context/ThemeContext'

interface CompletedServiceCardProps {
	data: any
	style?: StyleProp<ViewStyle>
}

const CompletedServiceCard: React.FC<CompletedServiceCardProps> = ({
	data,
	style,
}) => {
	const { theme } = useCustomTheme()
	const styles = makeStyles(theme)

	return (
		<TouchableOpacity
			activeOpacity={0.8}
			style={[styles.container, style]}
			onPress={() =>
				router.push({
					pathname: '/(services)/completed-service-details',
					params: { id: data.id },
				})
			}
		>
			<View style={styles.imageContainer}>
				<FastImage
					source={{ uri: data.image }}
					style={styles.image}
					resizeMode={FastImage.resizeMode.cover}
				/>
				<Star rating={data.stars} style={styles.starContainer} />
			</View>
			<View style={styles.contentContainer}>
				<Text style={styles.title} numberOfLines={1}>
					{data.title}
				</Text>
				<View style={styles.locationContainer}>
					<Ionicons
						name="location-outline"
						size={14}
						color={theme.colors.primary}
					/>
					<Text style={styles.locationText} numberOfLines={1}>
						{data.address}
					</Text>
				</View>
				<Text style={styles.description} numberOfLines={2}>
					{data.description}
				</Text>
				<View style={styles.likesContainer}>
					<Ionicons name="heart" size={14} color="#FF5959" />
					<Text style={styles.likesText}>{data.likes} pessoas gostaram</Text>
				</View>
			</View>
		</TouchableOpacity>
	)
}

const makeStyles = (theme: any) =>
	StyleSheet.create({
		container: {
			width: 260,
			borderRadius: 16,
			overflow: 'hidden',
			borderWidth: 1,
			borderColor: theme.colors.tint,
			backgroundColor: theme.colors.card,
			shadowColor: '#000',
			shadowOffset: { width: 0, height: 2 },
			shadowOpacity: 0.1,
			shadowRadius: 4,
			elevation: 3,
			marginBottom: 10,
		},
		headerContainerTopStar: {
			borderRadius: 14,
			flexDirection: 'row',
			alignItems: 'center',
			justifyContent: 'center',
			backgroundColor: 'rgba(255, 255, 255, 0.2)',
			borderWidth: 1,
			borderColor: 'rgba(255, 255, 255, 0.4)',
			paddingVertical: 2,
			paddingHorizontal: 4,
			position: 'absolute',
			top: 10,
			right: 10,
		},
		imageContainer: {
			position: 'relative',
			width: '100%',
			height: 150,
		},
		image: {
			width: '100%',
			height: '100%',
		},
		starContainer: {
			position: 'absolute',
			top: 10,
			right: 10,
		},
		starText: {
			color: 'white',
			fontFamily: fontFamily.poppins.semibold,
			fontSize: FontSize.xss,
			marginLeft: 4,
		},
		contentContainer: {
			padding: 12,
		},
		title: {
			fontSize: FontSize.base,
			fontFamily: fontFamily.poppins.semibold,
			marginBottom: 1,
			color: theme.colors.text,
		},
		locationContainer: {
			flexDirection: 'row',
			alignItems: 'center',
			marginBottom: 5,
		},
		locationText: {
			fontSize: FontSize.xs,
			fontFamily: fontFamily.poppins.regular,
			marginLeft: 4,
			flex: 1,
			color: theme.colors.muted,
		},
		description: {
			fontSize: FontSize.xs,
			fontFamily: fontFamily.poppins.regular,
			marginBottom: 6,
			lineHeight: 16,
			color: theme.colors.text,
		},
		likesContainer: {
			flexDirection: 'row',
			alignItems: 'center',
		},
		likesText: {
			fontSize: FontSize.xs,
			fontFamily: fontFamily.poppins.regular,
			marginLeft: 4,
			color: theme.colors.muted,
		},
	})

export default CompletedServiceCard
