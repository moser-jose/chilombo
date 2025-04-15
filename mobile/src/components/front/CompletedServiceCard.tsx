/* eslint-disable react-native/no-color-literals */
import * as React from 'react'
import {
	View,
	Text,
	StyleSheet,
	TouchableOpacity,
	StyleProp,
	ViewStyle,
	useColorScheme,
} from 'react-native'
import { fontFamily } from '../../constants/FontFamily'
import { FontSize } from '../../constants/FontSize'
import Colors from '../../constants/Colors'
import { Ionicons } from '@expo/vector-icons'
import FastImage from 'react-native-fast-image'
import { router } from 'expo-router'
import Star from './Star'

interface CompletedServiceCardProps {
	data: any
	style?: StyleProp<ViewStyle>
}

const CompletedServiceCard: React.FC<CompletedServiceCardProps> = ({
	data,
	style,
}) => {
	const theme = useColorScheme() ?? 'light'
	return (
		<TouchableOpacity
			activeOpacity={0.8}
			style={[styles(theme).container, style]}
			onPress={() =>
				router.push({
					pathname: '/(services)/completed-service-details',
					params: { id: data.id },
				})
			}
		>
			<View style={styles(theme).imageContainer}>
				<FastImage
					source={{ uri: data.image }}
					style={styles(theme).image}
					resizeMode={FastImage.resizeMode.cover}
				/>
				<Star rating={data.stars} style={styles(theme).starContainer} />
			</View>
			<View style={styles(theme).contentContainer}>
				<Text style={styles(theme).title} numberOfLines={1}>
					{data.title}
				</Text>
				<View style={styles(theme).locationContainer}>
					<Ionicons
						name="location-outline"
						size={14}
						color={Colors.secondary}
					/>
					<Text style={styles(theme).locationText} numberOfLines={1}>
						{data.address}
					</Text>
				</View>
				<Text style={styles(theme).description} numberOfLines={2}>
					{data.description}
				</Text>
				<View style={styles(theme).likesContainer}>
					<Ionicons name="heart" size={14} color="#FF5959" />
					<Text style={styles(theme).likesText}>
						{data.likes} pessoas gostaram
					</Text>
				</View>
			</View>
		</TouchableOpacity>
	)
}

const styles = (theme: 'light' | 'dark') =>
	StyleSheet.create({
		container: {
			width: 260,
			backgroundColor: Colors[theme].colors.ImputBackgroundColors,
			borderRadius: 16,
			overflow: 'hidden',
			borderWidth: 1,
			borderColor: Colors[theme].colors.tint,
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
			color: Colors[theme].colors.text,
			marginBottom: 1,
		},
		locationContainer: {
			flexDirection: 'row',
			alignItems: 'center',
			marginBottom: 5,
		},
		locationText: {
			fontSize: FontSize.xs,
			fontFamily: fontFamily.poppins.regular,
			color: Colors[theme].colors.colorIconInput,
			marginLeft: 4,
			flex: 1,
		},
		description: {
			fontSize: FontSize.xs,
			fontFamily: fontFamily.poppins.regular,
			color: Colors[theme].colors.colorIconInput,
			marginBottom: 6,
			lineHeight: 16,
		},
		likesContainer: {
			flexDirection: 'row',
			alignItems: 'center',
		},
		likesText: {
			fontSize: FontSize.xs,
			fontFamily: fontFamily.poppins.regular,
			color: Colors[theme].colors.muted,
			marginLeft: 4,
		},
	})

export default CompletedServiceCard
