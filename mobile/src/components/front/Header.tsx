/* eslint-disable react-native/no-color-literals */
import Colors from '@/src/constants/Colors'
import {
	View,
	Text,
	StyleSheet, TouchableOpacity
} from 'react-native'
import { Ionicons } from '@expo/vector-icons'

import * as Location from 'expo-location'
import { useState, useEffect } from 'react'
import { useUser } from '@clerk/clerk-expo'
import { fontFamily } from '@/src/constants/FontFamily'
import { FontSize } from '@/src/constants/FontSize'
import SearchResultsModal from './SearchResultsModal'

type Address = {
	city: string
	isoCountryCode: string
}

const Header = () => {
	const [errorMsg, setErrorMsg] = useState<string | null>(null)
	const [address, setAddress] = useState<Address | null>(null)
	const [isModalVisible, setIsModalVisible] = useState(false)

	const { user } = useUser()

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

	const handleCloseModal = () => {
		setIsModalVisible(false)
	}

	return (
		<>
			<View style={styles.container}>
				<View style={styles.leftContainer}>
					<View style={styles.leftContainerLeft}>
						<Text style={styles.leftContainerLeftText}>
							Olá, {user?.firstName}
						</Text>
						{address && (
							<View style={styles.locationContainer}>
								<Ionicons name="location-outline" size={18} color="#EC7FB6" />
								<Text style={styles.locationText}>
									{address?.city}, {address?.isoCountryCode}
								</Text>
							</View>
						)}
					</View>
					<View style={{ flexDirection: 'row', gap: 10 }}>
						<View style={styles.leftContainerRight}>
							<TouchableOpacity
								onPress={() => setIsModalVisible(true)}
								style={styles.notificationContainer}
							>
								<Ionicons
									name="search-outline"
									size={24}
									color={Colors.white}
								/>
							</TouchableOpacity>
						</View>
						<View style={styles.leftContainerRight}>
							<TouchableOpacity style={styles.notificationContainer}>
								<Ionicons
									name="notifications-outline"
									size={24}
									color={Colors.white}
								/>
							</TouchableOpacity>
						</View>
					</View>
				</View>
			</View>

			<SearchResultsModal
				visible={isModalVisible}
				onClose={handleCloseModal}
			/>
		</>
	)
}

const styles = StyleSheet.create({
	container: {
		backgroundColor: Colors.primary,
		paddingHorizontal: 16,
		paddingBottom: 16,
		paddingTop: 12,
	},
	leftContainer: {
		flexDirection: 'row',
		gap: 10,
		marginTop: 55,
		justifyContent: 'space-between',
	},
	leftContainerLeftText: {
		color: Colors.white,
		fontSize: FontSize.smB,
		fontFamily: fontFamily.poppins.bold,
	},
	leftContainerLeft: {
		gap: 10,
	},

	rightContainer: {
		marginVertical: 16,
		padding: 12,
		backgroundColor: '#1A1B25',
		borderRadius: 14,
		borderWidth: 1,
		borderColor: '#262733',
		flexDirection: 'row',
		justifyContent: 'space-between',
		alignItems: 'center',
	},
	inputText: {
		flex: 1,
		marginLeft: 10,
		fontSize: FontSize.xsB,
		fontFamily: fontFamily.poppins.regular,
		color: Colors.white,
	},
	leftContainerRight: {
		flexDirection: 'row',
		alignItems: 'center',
		gap: 10,
	},
	rightContainerRightFilter: {
		borderLeftWidth: 1,
		borderLeftColor: '#262733',
		paddingLeft: 14,
	},

	notificationContainer: {
		backgroundColor: '#1A1B25',
		padding: 8,
		borderRadius: 18,
		borderWidth: 1,
		borderColor: '#262733',
	},
	locationContainer: {
		flexDirection: 'row',
		alignItems: 'center',
		gap: 5,
		marginTop: -8,
	},
	locationText: {
		color: Colors.white,
		fontSize: FontSize.xs,
		fontFamily: fontFamily.poppins.regular,
	},
})
export default Header
