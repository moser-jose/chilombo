/* eslint-disable react-native/no-color-literals */
import Colors from '@/src/constants/Theme'
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'
import { Ionicons } from '@expo/vector-icons'

import * as Location from 'expo-location'
import { useState, useEffect } from 'react'
import { useUser } from '@clerk/clerk-expo'
import FastImage from 'react-native-fast-image'
import { Link, useRouter } from 'expo-router'
import { useTheme } from '@/src/hooks/useTheme'
import { Theme } from '@/src/types/theme'

type Address = {
	city: string
	isoCountryCode: string
}

const Header = () => {
	const [errorMsg, setErrorMsg] = useState<string | null>(null)
	const [address, setAddress] = useState<Address | null>(null)
	const { theme } = useTheme()
	const styles = makeStyles(theme)
	const { user } = useUser()
	const router = useRouter()
	useEffect(() => {
		async function getCurrentLocation() {
			let { status } = await Location.requestForegroundPermissionsAsync()
			if (status !== 'granted') {
				setErrorMsg('Permissão para acessar a localização foi negada')
				return
			}

			let locationCords = await Location.getCurrentPositionAsync({})

			const coords = {
				latitude: locationCords.coords.latitude,
				longitude: locationCords.coords.longitude,
			}

			const [result] = await Location.reverseGeocodeAsync(coords)
			if (result) {
				setAddress(result as Address)
			}
		}

		getCurrentLocation()
	}, [])

	return (
		<>
			<View style={styles.container}>
				<View style={styles.leftContainer}>
					<View style={styles.leftContainerLeftUser}>
						<TouchableOpacity
							style={styles.imageContainer}
							onPress={() => router.push('/(user)')}
						>
							<FastImage
								style={styles.profileImage}
								source={{ uri: user?.imageUrl }}
								resizeMode={FastImage.resizeMode.cover}
							/>
						</TouchableOpacity>
						<View style={styles.leftContainerLeft}>
							<Text style={styles.leftContainerLeftText}>
								Olá, {user?.firstName}
							</Text>
							{address && (
								<View style={styles.locationContainer}>
									<Ionicons
										name="location-outline"
										size={18}
										color={Colors.dark.colors.primary}
									/>
									<Text style={styles.locationText}>
										{address?.city}, {address?.isoCountryCode}
									</Text>
								</View>
							)}
						</View>
					</View>

					<View style={{ flexDirection: 'row', gap: 10 }}>
						<View style={styles.leftContainerRight}>
							<Link href="/(modals)/search" style={styles.styleButton}>
								<Ionicons
									name="search-outline"
									size={22}
									color={theme.colors.text}
								/>
							</Link>
						</View>
					</View>
				</View>
			</View>
		</>
	)
}

const makeStyles = (theme: Theme) =>
	StyleSheet.create({
		container: {
			backgroundColor: theme.colors.backgroundHeader,
			paddingHorizontal: 16,
			paddingBottom: 16,
			paddingTop: 12,
			borderBottomWidth: 0.5,
			borderBottomColor: theme.colors.border,
		},
		leftContainerLeftUser: {
			flexDirection: 'row',
			gap: 10,
			alignItems: 'center',
		},
		imageContainer: {
			width: 45,
			height: 45,
			borderRadius: 18,
			overflow: 'hidden',
			borderWidth: 2,
			borderColor: Colors.dark.colors.primary,
			marginTop: 8,
		},
		profileImage: {
			width: '100%',
			height: '100%',
			borderRadius: 14,
		},
		leftContainer: {
			flexDirection: 'row',
			gap: 10,
			marginTop: 55,
			justifyContent: 'space-between',
		},
		leftContainerLeftText: {
			color: theme.colors.textHeader,
			fontSize: theme.size.smB,
			fontFamily: theme.fonts.semibold.fontFamily,
		},
		leftContainerLeft: {
			gap: 10,
		},

		leftContainerRight: {
			flexDirection: 'row',
			alignItems: 'center',
			gap: 10,
		},

		styleButton: {
			backgroundColor: theme.colors.buttonHeader,
			borderRadius: 14,
			padding: 6,
			borderWidth: 1,
			borderColor: theme.colors.borderBottomHeader,
			alignItems: 'center',
			justifyContent: 'center',
		},
		locationContainer: {
			flexDirection: 'row',
			alignItems: 'center',
			gap: 5,
			marginTop: -12,
		},
		locationText: {
			color: theme.colors.textHeader,
			fontSize: theme.size.xs,
			fontFamily: theme.fonts.regular.fontFamily,
		},
	})
export default Header
