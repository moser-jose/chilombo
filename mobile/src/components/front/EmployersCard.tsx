/* eslint-disable react-native/no-color-literals */
import * as React from 'react'
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native'
import { fontFamily } from '../../constants/FontFamily'
import { FontSize } from '../../constants/FontSize'
import Colors from '../../constants/Colors'
import { useColorScheme } from '../useColorScheme'

interface UserProfileProps {
	data: any
}

const UserProfile: React.FC<UserProfileProps> = ({ data }) => {
	const theme = useColorScheme() ?? 'light'
	const name = `${data.firstname} ${data.lastname}`
	const image =
		data.image ||
		`https://ui-avatars.com/api/?name=${name.split(' ')[0]}+${name.split(' ')[name.split(' ').length - 1]}&background=0D8ABC&color=fff`
	return (
		<TouchableOpacity activeOpacity={0.8} style={styles(theme).container}>
			<View style={styles(theme).imageContainer}>
				<Image source={{ uri: image }} style={styles(theme).image} />
			</View>
			<Text style={styles(theme).name}>{name}</Text>
			<Text style={styles(theme).role}>{data.role}</Text>
		</TouchableOpacity>
	)
}

const styles = (theme: 'light' | 'dark') =>
	StyleSheet.create({
		container: {
			alignItems: 'center',
			width: 90,
			height: '100%',
			paddingVertical: 10,
			borderRadius: 22,
			backgroundColor: Colors[theme].colors.ImputBackgroundColors,
			borderWidth: 1,
			borderColor: Colors[theme].colors.tint,
		},
		imageContainer: {
			width: 55,
			height: 55,
			borderRadius: 50,
			backgroundColor: Colors[theme].colors.background,
			overflow: 'hidden',
			marginBottom: 8,
			borderWidth: 2,
			borderColor: Colors[theme].colors.tint,
		},
		image: {
			width: '100%',
			height: '100%',
			resizeMode: 'cover',
		},
		name: {
			fontSize: FontSize.xsB,
			color: Colors[theme].colors.text,
			marginBottom: 2,
			textAlign: 'center',
			fontFamily: fontFamily.poppins.bold,
		},
		role: {
			fontSize: FontSize.xs,
			color: Colors[theme].colors.colorIconInput,
			fontFamily: fontFamily.poppins.regular,
		},
	})

export default UserProfile
