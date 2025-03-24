/* eslint-disable react-native/no-color-literals */
import { PURPLE_IMAGES } from '../constants/purple-images'
import React, { Children, useMemo } from 'react'
import {
	ImageSourcePropType,
	type ImageStyle,
	type StyleProp,
	StyleSheet,
	Text,
	View,
	type ViewProps,
  ViewStyle,
} from 'react-native'
import type { AnimatedProps } from 'react-native-reanimated'
import Animated from 'react-native-reanimated'

interface Props extends AnimatedProps<ViewProps> {
	//style?: StyleProp<ImageStyle>
	style?: StyleProp<ViewStyle>
	index?: number
	children?: React.ReactNode
	rounded?: boolean
	source?: ImageSourcePropType
}

export const SlideItem: React.FC<Props> = props => {
	const {
		style,
		index = 0,
		rounded = false,
		children,
		testID,
		...animatedViewProps
	} = props

	const source = useMemo(
		() => props.source || PURPLE_IMAGES[index % PURPLE_IMAGES.length],
		[index, props.source],
	)

	return (
		<Animated.View testID={testID} style={{ flex: 1 }} {...animatedViewProps}>
			<View style={[styles.overlay, style]}>
        
				{children}

				{/* <Text style={styles.overlayText}>{index}</Text>
				<Text>Ola</Text> */}
			</View>
		</Animated.View>
	)
}

const styles = StyleSheet.create({
	container: {
		width: '100%',
		height: '100%',
	},
	overlay: {
		position: 'absolute',
		top: 0,
		left: 0,
		right: 0,
		bottom: 0,
		justifyContent: 'center',
		alignItems: 'center',
		//backgroundColor: 'red',
		borderRadius: 10,
	},
	overlayText: {
		color: 'white',
		fontSize: 20,
		fontWeight: 'bold',
	},
	overlayTextContainer: {
		backgroundColor: 'rgba(0, 0, 0, 0.5)',
		padding: 10,
		borderRadius: 10,
		minWidth: 40,
		minHeight: 40,
		justifyContent: 'center',
		alignItems: 'center',
	},
})
