import { View, Text, TouchableOpacity, StyleSheet, Image } from 'react-native'
import FastImage from 'react-native-fast-image'
import { router } from 'expo-router'
import Star from './Star'
import { fontFamily } from '@/src/constants/FontFamily'
import { useCustomTheme } from '@/src/context/ThemeContext'
import { Theme } from '@/src/types/theme'

export default function Services({ services }: { services: any[] }) {
	const { theme } = useCustomTheme()
	const styles = makeStyles(theme)
	return (
		<View
			style={{
				flexDirection: 'row',
				gap: 16,
				paddingTop: 16,
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
							},
						})
					}
				>
					<FastImage
						source={{ uri: Image.resolveAssetSource(item.image).uri }}
						style={styles.backgroundImage}
						resizeMode={FastImage.resizeMode.cover}
					/>
					<View style={styles.header}>
						<View style={styles.headerContainerTop}>
							<Text style={styles.categoryTitleTop}>10% OFF</Text>
						</View>
						<Star rating={item.rating} />
					</View>
					<View style={styles.headerContainer}>
						<Text style={styles.categoryTitle}>{item.name}</Text>
					</View>
				</TouchableOpacity>
			))}
		</View>
	)
}

const makeStyles = (theme: Theme) =>
	StyleSheet.create({
		containerImage: {
			flex: 1,
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
