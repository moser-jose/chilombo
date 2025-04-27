import { TouchableOpacityProps } from 'react-native'
import { TouchableOpacity as DefaultTouchableOpacity } from 'react-native'
import { useCustomTheme } from '@/src/context/ThemeContext'
import { Theme } from '@/src/types/theme'
import { StyleSheet } from 'react-native'
import { FontSize } from '@/src/constants/FontSize'

type Props = TouchableOpacityProps & {
	type?: 'primary' | 'secondary' | 'tertiary'
}

export function TouchableOpacity(props: Props) {
	const { style, type = 'primary', ...otherProps } = props
	const { theme } = useCustomTheme()
	const styles = makeStyles(theme)
	return (
		<DefaultTouchableOpacity
			activeOpacity={0.8}
			style={[
				type === 'primary'
					? { ...styles.buttonPrimary }
					: type === 'secondary'
						? { ...styles.buttonSecondary }
						: { ...styles.buttonTertiary },
				style,
			]}
			{...otherProps}
		/>
	)
}

const makeStyles = (theme: Theme) =>
	StyleSheet.create({
		buttonPrimary: {
			paddingVertical: 8,
			borderRadius: 8,
			fontFamily: theme.fonts.medium.fontFamily,
			color: theme.colors.text,
			fontSize: FontSize.lg,
			alignItems: 'center',
			flexDirection: 'row',
			justifyContent: 'center',
			width: '100%',
			backgroundColor: theme.colors.primary,
		},
		buttonSecondary: {
			backgroundColor: 'rgba(255, 255, 255, 0.06)',
			padding: 10,
			borderRadius: 50,
		},
		buttonTertiary: {
			//backgroundColor: 'rgba(255, 255, 255, 0.06)',
			padding: 10,
			borderRadius: 50,
		},
	})
