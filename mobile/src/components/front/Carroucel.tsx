/* eslint-disable react-native/no-color-literals */
import Colors from '@/src/constants/Colors'
import { window } from '../../constants/sizes'
import * as React from 'react'
import { View, Text, Animated, TouchableOpacity } from 'react-native'
import {
	Extrapolation,
	interpolate,
	useSharedValue,
} from 'react-native-reanimated'
import Carousel, {
	ICarouselInstance,
	Pagination,
} from 'react-native-reanimated-carousel'

const carouselData = [
	{
		title: 'Descontos',
		discount: '30%',
		description: 'Todos os nossos serviços têm descontos',
		period: 'até Dezembro',
		backgroundColor: '#FF69B4',
		imgem: require('../../../assets/banner.jpg'), // Rosa
	},

	{
		title: 'Promoção',
		discount: '25%',
		description: 'Pacotes especiais para você',
		period: 'até Janeiro',
		backgroundColor: '#4B0082', // Índigo
		imgem: require('../../../assets/limpeza.jpg'), // Rosa
	},
	{
		title: 'Ofertas',
		discount: '40%',
		description: 'Aproveite nossas ofertas exclusivas',
		period: 'essa semana',
		backgroundColor: '#20B2AA', // Verde água
		imgem: require('../../../assets/banner-p.png'), // Rosa
	},
	{
		title: 'Black Friday',
		discount: '50%',
		description: 'Os melhores descontos do ano',
		period: 'por tempo limitado',
		backgroundColor: '#8B4513', // Marrom
		imgem: require('../../../assets/banner.png'), // Rosa
	},
	{
		title: 'Especial',
		discount: '35%',
		description: 'Produtos selecionados com desconto',
		period: 'até amanhã',
		backgroundColor: '#4682B4', // Azul aço
		imgem: require('../../../assets/banner.png'), // Rosa
	},
]

function Index() {
	const progress = useSharedValue<number>(0)
	const ref = React.useRef<ICarouselInstance>(null)

	const renderSlide = ({ item }: { item: (typeof carouselData)[0] }) => (
		<Animated.View
			style={{
				/* backgroundColor: item.backgroundColor,
				padding: 20, */
				borderRadius: 15,
				height: '100%',
				width: '100%',
				alignSelf: 'center',
				flex: 1,
			}}
		>
			<TouchableOpacity activeOpacity={0.8} style={{ flex: 1 }}>
				<Animated.Image
					style={{
						width: '100%',
						height: '100%',
						borderRadius: 15,
					}}
					source={item.imgem}
					resizeMode="cover"
				/>
				<View
					style={{
						position: 'absolute',
						bottom: 0,
						left: 0,
						right: 0,
						padding: 20,
					}}
				>
					{/* <Text
					style={{
						fontSize: 16,
						color: 'white',
						marginBottom: 5,
					}}
			>
				Aproveite
			</Text>

			<View
				style={{
					flexDirection: 'row',
					alignItems: 'center',
					marginBottom: 10,
				}}
			>
				<Text
					style={{
						fontSize: 32,
						fontWeight: 'bold',
						color: 'white',
						marginRight: 10,
					}}
				>
					{item.title}
				</Text>
				<Text
					style={{
						fontSize: 32,
						fontWeight: 'bold',
						color: 'white',
					}}
				>
					{item.discount}
				</Text>
			</View>

			<Text
				style={{
					fontSize: 16,
					color: 'white',
					marginBottom: 5,
				}}
			>
				{item.description}
			</Text>

			<Text
				style={{
					fontSize: 16,
					color: 'white',
				}}
			>
					{item.period}
				</Text> */}
				</View>
			</TouchableOpacity>
		</Animated.View>
	)

	const onPressPagination = (index: number) => {
		ref.current?.scrollTo({
			/**
			 * Calculate the difference between the current index and the target index
			 * to ensure that the carousel scrolls to the nearest index
			 */
			count: index - progress.value,
			animated: true,
		})
	}

	return (
		<View id="carousel-component">
			<Carousel
				autoPlayInterval={2000}
				data={carouselData}
				height={140}
				loop={true}
				pagingEnabled={true}
				snapEnabled={true}
				width={window.width}
				style={{
					width: window.width,
				}}
				mode="parallax"
				modeConfig={{
					parallaxScrollingScale: 0.9,
					parallaxScrollingOffset: 50,
				}}
				onProgressChange={progress}
				renderItem={renderSlide}
			/>
			<View
				style={{
					flexDirection: 'row',
					justifyContent: 'flex-start',
					alignItems: 'center',
					marginLeft: 16,
				}}
			>
				<Pagination.Custom
					progress={progress}
					data={carouselData}
					size={6}
					dotStyle={{
						borderRadius: 16,
						backgroundColor: 'rgba(46, 46, 64, 0.82)',
					}}
					activeDotStyle={{
						borderRadius: 8,
						width: 12,
						height: 6,
						overflow: 'hidden',
						backgroundColor: Colors.dark.colors.primary,
					}}
					containerStyle={{
						gap: 5,
						marginBottom: 10,
						alignItems: 'center',
						height: 10,
					}}
					horizontal
					onPress={onPressPagination}
					customReanimatedStyle={(progress, index, length) => {
						let val = Math.abs(progress - index)
						if (index === 0 && progress > length - 1) {
							val = Math.abs(progress - length)
						}

						return {
							transform: [
								{
									translateY: interpolate(
										val,
										[0, 1],
										[0, 0],
										Extrapolation.CLAMP,
									),
								},
							],
						}
					}}
				/>
			</View>
		</View>
	)
}

export default Index
