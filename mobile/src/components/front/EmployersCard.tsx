/* eslint-disable react-native/no-color-literals */
import * as React from 'react'
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native'
import { fontFamily } from '../../constants/FontFamily'
import { FontSize } from '../../constants/FontSize'
import { useCustomTheme } from '@/src/context/ThemeContext'

interface UserProfileProps {
	data: any
}

const UserProfile: React.FC<UserProfileProps> = ({ data }) => {
	const { themeColors } = useCustomTheme()

	const name = `${data.firstname} ${data.lastname}`
	const image =
		data.image ||
		`https://ui-avatars.com/api/?name=${name.split(' ')[0]}+${name.split(' ')[name.split(' ').length - 1]}&background=0D8ABC&color=fff`
	return (
		<TouchableOpacity
			activeOpacity={0.8}
			style={[
				styles.container,
				{
					backgroundColor: themeColors.colors.ImputBackgroundColors,
					borderColor: themeColors.colors.tint,
				},
			]}
		>
			<View
				style={[
					styles.imageContainer,
					{ borderColor: themeColors.colors.tint },
				]}
			>
				<Image source={{ uri: image }} style={styles.image} />
			</View>
			<Text style={[styles.name, { color: themeColors.colors.text }]}>
				{name}
			</Text>
			<Text style={[styles.role, { color: themeColors.colors.colorIconInput }]}>
				{data.role}
			</Text>
		</TouchableOpacity>
	)
}

const styles = StyleSheet.create({
	container: {
		alignItems: 'center',
		width: 90,
		height: '100%',
		paddingVertical: 10,
		borderRadius: 22,
		borderWidth: 1,
	},
	imageContainer: {
		width: 55,
		height: 55,
		borderRadius: 50,
		overflow: 'hidden',
		marginBottom: 8,
		borderWidth: 2,
	},
	image: {
		width: '100%',
		height: '100%',
		resizeMode: 'cover',
	},
	name: {
		fontSize: FontSize.xsB,
		marginBottom: 2,
		textAlign: 'center',
		fontFamily: fontFamily.poppins.bold,
	},
	role: {
		fontSize: FontSize.xs,
		fontFamily: fontFamily.poppins.regular,
	},
})

export default UserProfile
