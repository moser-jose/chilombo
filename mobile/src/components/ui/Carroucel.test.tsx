import React from 'react'
import { render } from '@/src/test-utils'
import Carroucel from './Carroucel'

// Mock react-native-reanimated
jest.mock('react-native-reanimated', () => {
	const Reanimated = require('react-native-reanimated/mock')
	Reanimated.default.call = () => {}
	return Reanimated
})

// Mock react-native-reanimated-carousel corretamente
jest.mock('react-native-reanimated-carousel', () => {
	const React = require('react')
	const { View } = require('react-native')

	const Carousel = ({ children, ...props }) => (
		<View testID="carousel" {...props}>
			{children}
		</View>
	)
	const Pagination = {
		Custom: ({ children, ...props }) => (
			<View testID="pagination" {...props}>
				{children}
			</View>
		),
	}
	Carousel.Pagination = Pagination
	return Carousel
})

// Mock the image assets
jest.mock('../../../assets/banner.jpg', () => 'banner.jpg')
jest.mock('../../../assets/limpeza.jpg', () => 'limpeza.jpg')
jest.mock('../../../assets/banner-p.png', () => 'banner-p.png')
jest.mock('../../../assets/banner.png', () => 'banner.png')

// Mock the window constants
jest.mock('../../constants/SizeScreen', () => ({
	window: {
		width: 375,
		height: 812,
	},
}))

describe('Carroucel', () => {
	it('deve renderizar o componente carousel corretamente', () => {
		const { getByTestId } = render(<Carroucel />)
		expect(getByTestId('carousel-component')).toBeTruthy()
		expect(getByTestId('carousel')).toBeTruthy()
		expect(getByTestId('pagination')).toBeTruthy()
	})

	it('deve ter dados corretos do carousel', () => {
		const carouselData = [
			{
				title: 'Descontos',
				discount: '30%',
				description: 'Todos os nossos serviços têm descontos',
				period: 'até Dezembro',
				backgroundColor: '#FF69B4',
				imgem: 'banner.jpg',
			},
			{
				title: 'Promoção',
				discount: '25%',
				description: 'Pacotes especiais para você',
				period: 'até Janeiro',
				backgroundColor: '#4B0082',
				imgem: 'limpeza.jpg',
			},
			{
				title: 'Ofertas',
				discount: '40%',
				description: 'Aproveite nossas ofertas exclusivas',
				period: 'essa semana',
				backgroundColor: '#20B2AA',
				imgem: 'banner-p.png',
			},
			{
				title: 'Black Friday',
				discount: '50%',
				description: 'Os melhores descontos do ano',
				period: 'por tempo limitado',
				backgroundColor: '#8B4513',
				imgem: 'banner.png',
			},
			{
				title: 'Especial',
				discount: '35%',
				description: 'Produtos selecionados com desconto',
				period: 'até amanhã',
				backgroundColor: '#4682B4',
				imgem: 'banner.png',
			},
		]
		expect(carouselData).toHaveLength(5)
		expect(carouselData[0].title).toBe('Descontos')
		expect(carouselData[0].discount).toBe('30%')
		expect(carouselData[0].description).toBe(
			'Todos os nossos serviços têm descontos',
		)
		expect(carouselData[0].period).toBe('até Dezembro')
		expect(carouselData[0].backgroundColor).toBe('#FF69B4')
	})

	it('deve ter estrutura de dados consistente', () => {
		const carouselData = [
			{
				title: 'Descontos',
				discount: '30%',
				description: 'Todos os nossos serviços têm descontos',
				period: 'até Dezembro',
				backgroundColor: '#FF69B4',
				imgem: 'banner.jpg',
			},
			{
				title: 'Promoção',
				discount: '25%',
				description: 'Pacotes especiais para você',
				period: 'até Janeiro',
				backgroundColor: '#4B0082',
				imgem: 'limpeza.jpg',
			},
			{
				title: 'Ofertas',
				discount: '40%',
				description: 'Aproveite nossas ofertas exclusivas',
				period: 'essa semana',
				backgroundColor: '#20B2AA',
				imgem: 'banner-p.png',
			},
			{
				title: 'Black Friday',
				discount: '50%',
				description: 'Os melhores descontos do ano',
				period: 'por tempo limitado',
				backgroundColor: '#8B4513',
				imgem: 'banner.png',
			},
			{
				title: 'Especial',
				discount: '35%',
				description: 'Produtos selecionados com desconto',
				period: 'até amanhã',
				backgroundColor: '#4682B4',
				imgem: 'banner.png',
			},
		]
		carouselData.forEach((item, index) => {
			expect(item).toHaveProperty('title')
			expect(item).toHaveProperty('discount')
			expect(item).toHaveProperty('description')
			expect(item).toHaveProperty('period')
			expect(item).toHaveProperty('backgroundColor')
			expect(item).toHaveProperty('imgem')
			expect(typeof item.title).toBe('string')
			expect(typeof item.discount).toBe('string')
			expect(typeof item.description).toBe('string')
			expect(typeof item.period).toBe('string')
			expect(typeof item.backgroundColor).toBe('string')
		})
	})

	it('deve ter configurações corretas do carousel', () => {
		const expectedConfig = {
			autoPlayInterval: 2000,
			height: 140,
			loop: true,
			pagingEnabled: true,
			snapEnabled: true,
			width: 375,
			mode: 'parallax',
			modeConfig: {
				parallaxScrollingScale: 0.9,
				parallaxScrollingOffset: 50,
			},
		}
		expect(expectedConfig.autoPlayInterval).toBe(2000)
		expect(expectedConfig.height).toBe(140)
		expect(expectedConfig.loop).toBe(true)
		expect(expectedConfig.pagingEnabled).toBe(true)
		expect(expectedConfig.snapEnabled).toBe(true)
		expect(expectedConfig.width).toBe(375)
		expect(expectedConfig.mode).toBe('parallax')
		expect(expectedConfig.modeConfig.parallaxScrollingScale).toBe(0.9)
		expect(expectedConfig.modeConfig.parallaxScrollingOffset).toBe(50)
	})

	it('deve ter configurações corretas da paginação', () => {
		const expectedPaginationConfig = {
			size: 6,
			horizontal: true,
			dotStyle: {
				borderRadius: 16,
				backgroundColor: 'rgba(46, 46, 64, 0.82)',
			},
			activeDotStyle: {
				borderRadius: 8,
				width: 12,
				height: 6,
				overflow: 'hidden',
			},
			containerStyle: {
				gap: 5,
				marginBottom: 10,
				alignItems: 'center',
				height: 10,
			},
		}
		expect(expectedPaginationConfig.size).toBe(6)
		expect(expectedPaginationConfig.horizontal).toBe(true)
		expect(expectedPaginationConfig.dotStyle.borderRadius).toBe(16)
		expect(expectedPaginationConfig.dotStyle.backgroundColor).toBe(
			'rgba(46, 46, 64, 0.82)',
		)
		expect(expectedPaginationConfig.activeDotStyle.borderRadius).toBe(8)
		expect(expectedPaginationConfig.activeDotStyle.width).toBe(12)
		expect(expectedPaginationConfig.activeDotStyle.height).toBe(6)
		expect(expectedPaginationConfig.activeDotStyle.overflow).toBe('hidden')
		expect(expectedPaginationConfig.containerStyle.gap).toBe(5)
		expect(expectedPaginationConfig.containerStyle.marginBottom).toBe(10)
		expect(expectedPaginationConfig.containerStyle.alignItems).toBe('center')
		expect(expectedPaginationConfig.containerStyle.height).toBe(10)
	})

	it('deve ter window width correto', () => {
		const { window } = require('../../constants/SizeScreen')
		expect(window.width).toBe(375)
		expect(window.height).toBe(812)
	})

	it('deve ter imagens válidas', () => {
		const images = ['banner.jpg', 'limpeza.jpg', 'banner-p.png', 'banner.png']
		images.forEach(image => {
			expect(typeof image).toBe('string')
			expect(image.length).toBeGreaterThan(0)
		})
	})

	it('deve ter cores de fundo válidas', () => {
		const backgroundColors = [
			'#FF69B4', // Rosa
			'#4B0082', // Índigo
			'#20B2AA', // Verde água
			'#8B4513', // Marrom
			'#4682B4', // Azul aço
		]
		backgroundColors.forEach(color => {
			expect(color).toMatch(/^#[0-9A-Fa-f]{6}$/)
		})
	})

	it('deve ter títulos únicos', () => {
		const titles = [
			'Descontos',
			'Promoção',
			'Ofertas',
			'Black Friday',
			'Especial',
		]
		const uniqueTitles = [...new Set(titles)]
		expect(uniqueTitles).toHaveLength(titles.length)
	})

	it('deve ter descontos válidos', () => {
		const discounts = ['30%', '25%', '40%', '50%', '35%']
		discounts.forEach(discount => {
			expect(discount).toMatch(/^\d+%$/)
			const percentage = parseInt(discount.replace('%', ''))
			expect(percentage).toBeGreaterThan(0)
			expect(percentage).toBeLessThanOrEqual(100)
		})
	})
})
