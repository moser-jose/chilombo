/* eslint-disable react-native/no-color-literals */
import * as React from 'react'
import { View, Text, Image, StyleSheet, TouchableOpacity, ViewStyle } from 'react-native'
import { fontFamily } from '../../constants/FontFamily'
import { FontSize } from '../../constants/FontSize'
import { useCustomTheme } from '@/src/context/ThemeContext'
import { Theme } from '@/src/types/theme'

interface EmployerCardProps {
	data: any
}

const EmployerCard: React.FC<EmployerCardProps> = ({ data  }) => {
	const { theme } = useCustomTheme()
	const styles = makeStyles(theme as Theme)
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

const makeStyles = (theme: Theme) =>
	StyleSheet.create({
		container: {
			alignItems: 'center',
			width: 90,
			height: '100%',
			paddingVertical: 10,
			borderRadius: 22,
			borderWidth: 1,
			backgroundColor: theme.colors.ImputBackgroundColors,
			borderColor: theme.colors.tint,
		},
		imageContainer: {
			width: 55,
			height: 55,
			borderRadius: 50,
			overflow: 'hidden',
			marginBottom: 8,
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
			color: theme.colors.text,
		},
		role: {
			fontSize: FontSize.xs,
			fontFamily: fontFamily.poppins.regular,
			color: theme.colors.colorIconInput,
		},
	})

export default EmployerCard
