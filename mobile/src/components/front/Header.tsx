/* eslint-disable react-native/no-color-literals */
import Colors from '@/src/constants/Colors'
import {
	View,
	Text,
	StyleSheet,
	TextInput,
	TouchableOpacity,
	Image,
	Dimensions,
} from 'react-native'
import { Ionicons } from '@expo/vector-icons'

import * as Location from 'expo-location'
import { useState, useEffect, useRef } from 'react'
import { useUser } from '@clerk/clerk-expo'
import { fontFamily } from '@/src/constants/FontFamily'
import { FontSize } from '@/src/constants/FontSize'

type Address = {
	city: string
	isoCountryCode: string
}

const Header = () => {
	const [location, setLocation] = useState<Location.LocationObject | null>(null)
	const [errorMsg, setErrorMsg] = useState<string | null>(null)
	const [address, setAddress] = useState<Address | null>(null)

	const { user } = useUser()

	useEffect(() => {
		async function getCurrentLocation() {
			let { status } = await Location.requestForegroundPermissionsAsync()
			if (status !== 'granted') {
				setErrorMsg('Permissão para acessar a localização foi negada')
				return
			}

			let location = await Location.getCurrentPositionAsync({})
			setLocation(location)

			const coords = {
				latitude: location.coords.latitude,
				longitude: location.coords.longitude,
			}

			const [result] = await Location.reverseGeocodeAsync(coords)
			if (result) {
				setAddress(result as Address)
			}
		}

		getCurrentLocation()
	}, [])

	/* let text = 'Waiting...'
	if (errorMsg) {
		text = errorMsg
	} else if (location) {
		text = JSON.stringify(location)
	}
 */
	//console.log(text, address)
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

				<View style={styles.rightContainer}>
					<Ionicons name="search-outline" size={24} color="#666D80" />
					<TextInput
						style={styles.inputText}
						placeholder="Pesquisar por serviços"
						placeholderTextColor="#666D80"
					/>
					<TouchableOpacity style={styles.rightContainerRightFilter}>
						<Ionicons name="options-outline" size={24} color="#666D80" />
					</TouchableOpacity>
				</View>
			</View>
		</>
	)
}

const styles = StyleSheet.create({
	container: {
		backgroundColor: Colors.primary,
		paddingHorizontal: 16,
	},
	leftContainer: {
		flexDirection: 'row',
		gap: 10,
		marginTop: 80,
		justifyContent: 'space-between',
	},
	leftContainerLeftText: {
		color: Colors.white,
		fontSize: FontSize.sm,
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
