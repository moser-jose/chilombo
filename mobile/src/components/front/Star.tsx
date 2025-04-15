import { View, Text, StyleSheet, StyleProp, ViewStyle } from 'react-native'
import { Ionicons } from '@expo/vector-icons'
import { fontFamily } from '../../constants/FontFamily'

type StarProps = {
	rating: number
	style?: StyleProp<ViewStyle>
	textColor?: string
}

export default function Star({ rating, style, textColor="#fff" }: StarProps) {
	return (
		<View style={[styles.starContainer, style]}>
			<Ionicons name="star" size={14} color="#FFC107" />
			<Text style={[styles.starText, { color: textColor }]}>{rating}</Text>
		</View>
	)
}

const styles = StyleSheet.create({
	starContainer: {
		backgroundColor: 'rgba(0, 0, 0, 0.6)',
		flexDirection: 'row',
		alignItems: 'center',
		paddingHorizontal: 8,
		paddingVertical: 4,
		borderRadius: 12,
		justifyContent: 'center',
		borderWidth: 1,
		borderColor: 'rgba(0, 0, 0, 0.22)',
	},
	starText: {
		fontSize: 10,
		fontFamily: fontFamily.poppins.semibold,
		color: '#fff',
		marginLeft: 4,
	},
})
