/* eslint-disable react-native/no-color-literals */
import * as React from 'react'
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native'
import { fontFamily } from '../../constants/FontFamily'
import { FontSize } from '../../constants/FontSize'
import { useCustomTheme } from '@/src/context/ThemeContext'
import { ThemeColors } from '@/src/types/themeColors'

interface UserProfileProps {
	data: any
}

const UserProfile: React.FC<UserProfileProps> = ({ data }) => {
	const { themeColors } = useCustomTheme()
	const styles = makeStyles(themeColors as ThemeColors)
	const name = `${data.firstname} ${data.lastname}`
	const image =
		data.image ||
		`https://ui-avatars.com/api/?name=${name.split(' ')[0]}+${name.split(' ')[name.split(' ').length - 1]}&background=0D8ABC&color=fff`
	return (
		<TouchableOpacity activeOpacity={0.8} style={[styles.container]}>
			<View style={[styles.imageContainer]}>
				<Image source={{ uri: image }} style={styles.image} />
			</View>
			<Text style={styles.name}>{name}</Text>
			<Text style={styles.role}>{data.role}</Text>
		</TouchableOpacity>
	)
}

const makeStyles = (themeColors: ThemeColors) =>
	StyleSheet.create({
		container: {
			alignItems: 'center',
			width: 90,
			height: '100%',
			paddingVertical: 10,
			borderRadius: 22,
			borderWidth: 1,
			backgroundColor: themeColors.colors.ImputBackgroundColors,
			borderColor: themeColors.colors.tint,
		},
		imageContainer: {
			width: 55,
			height: 55,
			borderRadius: 50,
			overflow: 'hidden',
			marginBottom: 8,
			borderWidth: 2,
			borderColor: themeColors.colors.tint,
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
			color: themeColors.colors.text,
		},
		role: {
			fontSize: FontSize.xs,
			fontFamily: fontFamily.poppins.regular,
			color: themeColors.colors.colorIconInput,
		},
	})

export default UserProfile
