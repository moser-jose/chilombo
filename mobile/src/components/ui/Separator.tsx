/* eslint-disable react-native/no-color-literals */

import {
	View,
	StyleSheet,
	TouchableOpacity,
	StyleProp,
	ViewStyle,
} from 'react-native'
import { FontSize } from '../../constants/FontSize'
import { Ionicons } from '@expo/vector-icons'
import Colors from '@/src/constants/Theme'
import { Text } from '@/src/components/Themed'
import { useTheme } from '@/src/hooks/useTheme'
import { Theme } from '@/src/types/theme'

type SeparatorProps = {
	onPress?: () => void
	text: string
	more?: boolean
	style?: StyleProp<ViewStyle>
}

export const Separator = ({ onPress, text, style, more }: SeparatorProps) => {
	const { theme } = useTheme()
	const styles = makeStyles(theme)
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
const makeStyles = (theme: Theme) =>
	StyleSheet.create({
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
			fontFamily: theme.fonts.bold.fontFamily,
		},
		vermais: {
			flexDirection: 'row',
			alignItems: 'center',
			gap: 2,
		},
		vermaisText: {
			fontSize: FontSize.xsB,
			fontFamily: theme.fonts.regular.fontFamily,
			color: Colors.dark.colors.primary,
		},
	})
