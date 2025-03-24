import { SlideItem } from '../components/SlideItem'
import { ImageStyle, StyleProp, Text, ViewStyle } from 'react-native'
import { CarouselRenderItem } from 'react-native-reanimated-carousel'

interface Options {
	rounded?: boolean
	children?: React.ReactNode
	data?: any
	//style?: StyleProp<ImageStyle>
	style?: StyleProp<ViewStyle>
}

export const renderItem =
	({
		rounded = false,
		children,
		style,
		data,
	}: Options = {}): CarouselRenderItem<any> =>
	({ index }: { index: number }) => (
		<SlideItem
			key={index}
			children={data}
			index={index}
			rounded={rounded}
			style={style}
		/>
	)
