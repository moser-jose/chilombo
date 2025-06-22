import { View, Text, TouchableOpacity, StyleSheet, Image } from 'react-native'
import FastImage from 'react-native-fast-image'
import { router } from 'expo-router'
import { useCustomTheme } from '@/src/context/ThemeContext'
import { Theme } from '@/src/types/theme'
import LinearGradient from 'react-native-linear-gradient'
import { Ionicons } from '@expo/vector-icons'

export default function ServicesCompleted({ services }: { services: any[] }) {
	const { theme } = useCustomTheme()
	const styles = makeStyles(theme)
	return (
		<View
			style={{
				flexDirection: 'row',
				gap: 16,
				paddingHorizontal: 16,
			}}
		>
			{services.map(item => (
				<TouchableOpacity
					key={item.id}
					activeOpacity={0.8}
					style={[styles.containerImage, { flex: 1 }]}
					onPress={() =>
						router.push({
							pathname: '/(services)/service-details',
							params: {
								id: item.id.toString(),
								data: JSON.stringify(item),
								origin: 'home',
							},
						})
					}
				>
					<FastImage
						source={{ uri: Image.resolveAssetSource(item.image).uri }}
						style={styles.backgroundImage}
						resizeMode={FastImage.resizeMode.cover}
					/>
					<LinearGradient
						colors={['rgba(0, 0, 0, 0.12)', 'rgba(0, 0, 0, 0.19)']}
						style={styles.gradient}
					/>
					<View style={styles.header}>
						<View style={styles.commentContainer}>
							<Ionicons
								name="chatbox-ellipses-outline"
								size={14}
								color="white"
							/>
							<Text style={styles.commentText}>{item.comments.length}</Text>
						</View>
					</View>
					<View style={styles.headerContainer}>
						<Text style={styles.categoryTitle}>Rua Bié | Huambo</Text>
					</View>
				</TouchableOpacity>
			))}
		</View>
	)
}

const makeStyles = (theme: Theme) =>
	StyleSheet.create({
		gradient: {
			position: 'absolute',
			top: 0,
			bottom: 0,
			left: 0,
			right: 0,
			borderRadius: 20,
			width: '100%',
			height: '100%',
			//flex: 1,
		},
		containerImage: {
			flex: 1,
			position: 'relative',
		},
		backgroundImage: {
			width: '100%',
			height: 180,
			borderRadius: 20,
		},
		header: {
			position: 'absolute',
			zIndex: 2,
			top: 6,
			left: 6,
			right: 6,
			padding: 6,
			flexDirection: 'row',
			alignItems: 'center',
			justifyContent: 'space-between',
		},
		commentContainer: {
			flexDirection: 'row',
			alignItems: 'center',
			gap: 4,
			backgroundColor: 'rgba(49, 46, 46, 0.55)',
			paddingHorizontal: 8,
			paddingVertical: 2,
			borderRadius: 8,
			borderWidth: 0.5,
			borderColor: 'rgba(255, 255, 255, 0.2)',
		},
		commentText: {
			fontSize: 12,
			fontFamily: theme.fonts.semibold.fontFamily,
			color: '#fff',
		},
		headerContainerTop: {
			backgroundColor: '#FF5959',
			padding: 4,
			borderRadius: 14,
		},
		headerContainer: {
			position: 'absolute',
			left: 0,
			right: 0,
			bottom: 0,
			zIndex: 2,
			backgroundColor: 'rgba(91, 91, 91, 0.89)',
			borderWidth: 1,
			borderColor: 'rgba(255, 255, 255, 0.2)',
			padding: 6,
			borderRadius: 10,
			marginHorizontal: 7,
			marginBottom: 7,
		},
		categoryTitleTop: {
			fontSize: 10,
			fontFamily: theme.fonts.semibold.fontFamily,
			color: '#fff',
		},

		categoryTitle: {
			fontSize: 10,
			textAlign: 'center',
			fontFamily: theme.fonts.semibold.fontFamily,
			color: '#fff',
		},
	})
