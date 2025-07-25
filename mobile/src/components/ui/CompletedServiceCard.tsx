/* eslint-disable react-native/no-color-literals */
import * as React from 'react'
import {
	View,
	Text,
	StyleSheet,
	TouchableOpacity,
	StyleProp,
	ViewStyle,
	TextStyle,
} from 'react-native'
import { FontSize } from '../../constants/FontSize'
import { Ionicons } from '@expo/vector-icons'
import FastImage from 'react-native-fast-image'
import { router } from 'expo-router'
import Star from './Star'
import { useTheme } from '@/src/hooks/useTheme'

interface CompletedServiceCardProps {
	data: any
	style?: StyleProp<ViewStyle>
	styleContainer?: StyleProp<ViewStyle>
	styleTitle?: StyleProp<TextStyle>
	origin?: string
}

const CompletedServiceCard: React.FC<CompletedServiceCardProps> = ({
	data,
	style,
	styleContainer,
	styleTitle,
	origin,
}) => {
	const { theme } = useTheme()
	const styles = makeStyles(theme)

	return (
		<TouchableOpacity
			activeOpacity={0.8}
			style={[styles.container, style]}
			testID="touchable-opacity"
			onPress={() =>
				router.push({
					pathname: '/(services)/completed-service-details',
					params: { id: data.id, origin: origin },
				})
			}
		>
			<View
				style={[styles.imageContainer, styleContainer]}
				testID="image-container"
			>
				<FastImage
					source={{ uri: data.image }}
					style={styles.image}
					resizeMode={FastImage.resizeMode.cover}
				/>
				<Star rating={data.stars} style={styles.starContainer} />
			</View>
			<View style={styles.contentContainer}>
				<Text style={[styles.title, styleTitle]} numberOfLines={1}>
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
					<View style={styles.likesContainer}>
						<Ionicons name="heart" size={14} color="#FF5959" />
						<Text style={styles.likesText}>{data.likes}</Text>
					</View>
					<View style={styles.imageContainerLike}>
						<View style={styles.imageLikeView}>
							<FastImage
								source={{
									uri: 'https://randomuser.me/api/portraits/men/5.jpg',
								}}
								style={styles.likesImage}
								resizeMode={FastImage.resizeMode.cover}
							/>
						</View>
						<View style={styles.imageLikeView}>
							<FastImage
								source={{
									uri: 'https://randomuser.me/api/portraits/men/6.jpg',
								}}
								style={styles.likesImage}
								resizeMode={FastImage.resizeMode.cover}
							/>
						</View>
						<View style={styles.imageLikeView}>
							<FastImage
								source={{
									uri: 'https://randomuser.me/api/portraits/men/7.jpg',
								}}
								style={styles.likesImage}
								resizeMode={FastImage.resizeMode.cover}
							/>
						</View>
					</View>
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
			fontFamily: theme.fonts.semibold.fontFamily,
			fontSize: theme.size.xss,
			marginLeft: 4,
		},
		contentContainer: {
			padding: 12,
		},
		title: {
			fontSize: theme.size.base,
			fontFamily: theme.fonts.semibold.fontFamily,
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
			fontFamily: theme.fonts.regular.fontFamily,
			marginLeft: 4,
			flex: 1,
			color: theme.colors.muted,
		},
		description: {
			fontSize: FontSize.xs,
			fontFamily: theme.fonts.regular.fontFamily,
			marginBottom: 6,
			lineHeight: 16,
			color: theme.colors.text,
		},
		likesContainer: {
			flexDirection: 'row',
			alignItems: 'center',
			justifyContent: 'space-between',
		},
		imageContainerLike: {
			flexDirection: 'row',
			alignItems: 'center',
			justifyContent: 'center',
		},
		imageLikeView: {
			width: 18,
			height: 18,
			borderRadius: 10,
			//padding: 8,
			//backgroundColor: theme.colors.background,
			alignItems: 'center',
			justifyContent: 'center',
			marginLeft: -6,
			overflow: 'hidden',
		},
		likesText: {
			fontSize: FontSize.xs,
			fontFamily: theme.fonts.regular.fontFamily,
			marginLeft: 2,
			color: theme.colors.muted,
		},
		likesImage: {
			width: 18,
			height: 18,
			borderRadius: 10,
			borderColor: theme.colors.background,
			borderWidth: 2,
		},
	})

export default CompletedServiceCard
