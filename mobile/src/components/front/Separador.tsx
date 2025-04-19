/* eslint-disable react-native/no-color-literals */

import {
	View,
	StyleSheet,
	TouchableOpacity,
	StyleProp,
	ViewStyle,
} from 'react-native'
import { fontFamily } from '../../constants/FontFamily'
import { FontSize } from '../../constants/FontSize'
import { Ionicons } from '@expo/vector-icons'
import Colors from '@/src/constants/Colors'
import { Text } from '../ui/Text'
import { useCustomTheme } from '@/src/context/ThemeContext'

type SeparadorProps = {
	onPress?: () => void
	text: string
	more?: boolean
	style?: StyleProp<ViewStyle>
}

export const Separador = ({ onPress, text, style, more }: SeparadorProps) => {
	const { theme } = useCustomTheme()
	return (
		<View style={[styles.container, style]}>
			<View style={styles.separator} />
			<View style={styles.textContainer}>
				<Text style={styles.text}>{text}</Text>
				<TouchableOpacity
					activeOpacity={0.8}
					onPress={onPress}
					style={styles.vermais}
				>
					{more && (
						<>
							<Text style={styles.vermaisText}>Ver mais</Text>
							<Ionicons
								name="chevron-forward-outline"
								size={18}
								color={theme.colors.text}
							/>
						</>
					)}
				</TouchableOpacity>
			</View>
		</View>
	)
}
const styles = StyleSheet.create({
	container: {
		flex: 1,
		flexDirection: 'row',
		alignItems: 'center',
		marginHorizontal: 16,
		marginVertical: 18,
	},
	separator: {
		width: 5,
		height: 25,
		backgroundColor: Colors.dark.colors.primary,
		marginRight: 8,
		borderRadius: 10,
	},
	textContainer: {
		flex: 1,
		alignItems: 'center',
		justifyContent: 'space-between',
		flexDirection: 'row',
	},
	text: {
		fontSize: FontSize.base,
		fontFamily: fontFamily.poppins.bold,
	},
	vermais: {
		flexDirection: 'row',
		alignItems: 'center',
		gap: 2,
	},
	vermaisText: {
		fontSize: FontSize.xsB,
		fontFamily: fontFamily.poppins.regular,
		color: Colors.dark.colors.primary,
	},
})
