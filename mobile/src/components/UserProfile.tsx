/* eslint-disable react-native/no-color-literals */
import * as React from 'react'
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native'
import { fontFamily } from '../constants/FontFamily'
import { FontSize } from '../constants/FontSize'
import Colors from '../constants/Colors'

interface UserProfileProps {
	name: string
	imageUrl?: string
	role?: string
}

const UserProfile: React.FC<UserProfileProps> = ({
	name,
	imageUrl = 'https://ui-avatars.com/api/?name=Moser+Jose&background=0D8ABC&color=fff',
	role = 'Vendas',
}) => {
	return (
		<TouchableOpacity activeOpacity={0.8} style={styles.container}>
			<View style={styles.imageContainer}>
				<Image source={{ uri: imageUrl }} style={styles.image} />
			</View>
			<Text style={styles.name}>{name}</Text>
			<Text style={styles.role}>{role}</Text>
		</TouchableOpacity>
	)
}

const styles = StyleSheet.create({
	container: {
		alignItems: 'center',
		width: 100,
		paddingHorizontal: 10,
		paddingVertical: 16,
		borderRadius: 20,
		backgroundColor: 'rgba(233, 233, 237, 0.82)',
		borderWidth: .4,
		borderColor: '#0D8ABC',
	},
	imageContainer: {
		width: 60,
		height: 60,
		borderRadius: 50,
		backgroundColor: '#E8F5FE',
		overflow: 'hidden',
		marginBottom: 8,
        shadowColor: 'rgba(13, 138, 188, 0.2)',
        shadowOffset: { width: 18, height: 18 },
        shadowOpacity: 1,
        shadowRadius: 18.84,
        //borderColor: '#0D8ABC',
		//borderWidth: 1,
	},
	image: {
		width: '100%',
		height: '100%',
		resizeMode: 'cover',
        shadowColor: 'rgba(13, 138, 188, 0.2)',
        shadowOffset: { width: 8, height: 2 },
        shadowOpacity: 8,
        shadowRadius: 3.84,
	},
	name: {
		fontSize: FontSize.xsB,
		color: Colors.primary,
		marginBottom: 2,
        textAlign: 'center',
        fontFamily:fontFamily.poppins.bold
	},
	role: {
		fontSize: FontSize.xs,
		color: '#666666',
        fontFamily:fontFamily.poppins.regular
	},
})

export default UserProfile
