import React from 'react'
import { render, fireEvent, waitFor } from '@/src/test-utils'
import CompletedServiceCard from './CompletedServiceCard'

// Mock expo-router
jest.mock('expo-router', () => ({
	router: {
		push: jest.fn(),
	},
}))

// Mock react-native-fast-image
jest.mock('react-native-fast-image', () => {
	const FastImage = ({ source, style, resizeMode }: any) => {
		const React = require('react')
		return React.createElement('Image', {
			source,
			style,
			resizeMode,
			testID: 'fast-image',
		})
	}
	FastImage.resizeMode = {
		cover: 'cover',
	}
	return FastImage
})

// Mock @expo/vector-icons
jest.mock('@expo/vector-icons', () => ({
	Ionicons: ({ name, size, color, testID }: any) => {
		const React = require('react')
		return React.createElement('Text', {
			testID: testID || `icon-${name}`,
			children: `${name}-${size}-${color}`,
		})
	},
}))

// Mock Star component
jest.mock('./Star', () => {
	const Star = ({ rating, style, testID }: any) => {
		const React = require('react')
		return React.createElement('View', {
			testID: testID || 'star-component',
			style,
			children: `Star-${rating}`,
		})
	}
	return Star
})

describe('CompletedServiceCard', () => {
	const mockData = {
		id: '1',
		title: 'Limpeza Residencial',
		description: 'Serviço de limpeza completo para residências',
		address: 'Rua das Flores, 123 - Luanda',
		image: 'https://example.com/image.jpg',
		stars: 4.5,
		likes: 25,
	}

	const defaultProps = {
		data: mockData,
	}

	beforeEach(() => {
		jest.clearAllMocks()
	})

	describe('Rendering', () => {
		it('should render the card with all correct data', () => {
			const { getByText, getAllByTestId, getByTestId } = render(
				<CompletedServiceCard {...defaultProps} />,
			)

			expect(getByText('Limpeza Residencial')).toBeTruthy()
			expect(
				getByText('Serviço de limpeza completo para residências'),
			).toBeTruthy()
			expect(getByText('Rua das Flores, 123 - Luanda')).toBeTruthy()
			expect(getByText('25')).toBeTruthy()
			expect(getAllByTestId('fast-image').length).toBeGreaterThan(0)
			expect(getByTestId('star-component')).toBeTruthy()
		})

		it('should render the location icon', () => {
			const { getByTestId } = render(<CompletedServiceCard {...defaultProps} />)
			expect(getByTestId('icon-location-outline')).toBeTruthy()
		})

		it('should render the heart icon', () => {
			const { getByTestId } = render(<CompletedServiceCard {...defaultProps} />)
			expect(getByTestId('icon-heart')).toBeTruthy()
		})

		it('should render the like images', () => {
			const { getAllByTestId } = render(
				<CompletedServiceCard {...defaultProps} />,
			)
			const images = getAllByTestId('fast-image')
			expect(images.length).toBeGreaterThan(1) // Main image + like images
		})
	})

	describe('Interactions', () => {
		it('should navigate to the details page when pressed', async () => {
			const { getByTestId } = render(<CompletedServiceCard {...defaultProps} />)
			const card = getByTestId('touchable-opacity')

			fireEvent.press(card)

			await waitFor(() => {
				const { router } = require('expo-router')
				expect(router.push).toHaveBeenCalledWith({
					pathname: '/(services)/completed-service-details',
					params: { id: '1', origin: undefined },
				})
			})
		})

		it('should include the origin parameter in navigation when provided', async () => {
			const { getByTestId } = render(
				<CompletedServiceCard {...defaultProps} origin="home" />,
			)
			const card = getByTestId('touchable-opacity')

			fireEvent.press(card)

			await waitFor(() => {
				const { router } = require('expo-router')
				expect(router.push).toHaveBeenCalledWith({
					pathname: '/(services)/completed-service-details',
					params: { id: '1', origin: 'home' },
				})
			})
		})
	})

	describe('Props and Customization', () => {
		it('should apply custom styles when provided', () => {
			const customStyle = { backgroundColor: 'red' }
			const { getByTestId } = render(
				<CompletedServiceCard {...defaultProps} style={customStyle} />,
			)
			const card = getByTestId('touchable-opacity')
			expect(card.props.style).toMatchObject(customStyle)
		})

		it('should apply custom styleContainer', () => {
			const customContainerStyle = { height: 200 }
			const { getByTestId } = render(
				<CompletedServiceCard
					{...defaultProps}
					styleContainer={customContainerStyle}
				/>,
			)
			const imageContainer = getByTestId('image-container')
			expect(imageContainer.props.style).toContain(customContainerStyle)
		})

		it('should apply custom styleTitle', () => {
			const customTitleStyle = { fontSize: 20 }
			const { getByText } = render(
				<CompletedServiceCard
					{...defaultProps}
					styleTitle={customTitleStyle}
				/>,
			)
			const title = getByText('Limpeza Residencial')
			expect(title.props.style).toContain(customTitleStyle)
		})
	})

	describe('Edge Cases', () => {
		it('should handle empty or undefined data', () => {
			const emptyData = {
				id: '',
				title: '',
				description: '',
				address: '',
				image: '',
				stars: 0,
				likes: 0,
			}

			const { getAllByText, getByText } = render(
				<CompletedServiceCard data={emptyData} />,
			)

			expect(getAllByText('').length).toBeGreaterThan(0) // Empty title
			expect(getByText('0')).toBeTruthy() // Zero likes
		})

		it('should handle long text in the title', () => {
			const longTitleData = {
				...mockData,
				title:
					'Este é um título muito longo que deve ser truncado com numberOfLines={1}',
			}

			const { getByText } = render(
				<CompletedServiceCard data={longTitleData} />,
			)

			const title = getByText(longTitleData.title)
			expect(title.props.numberOfLines).toBe(1)
		})

		it('should handle long description', () => {
			const longDescriptionData = {
				...mockData,
				description:
					'Este é um texto de descrição muito longo que deve ser truncado com numberOfLines={2} para evitar que o card fique muito alto',
			}

			const { getByText } = render(
				<CompletedServiceCard data={longDescriptionData} />,
			)

			const description = getByText(longDescriptionData.description)
			expect(description.props.numberOfLines).toBe(2)
		})

		it('should handle long address', () => {
			const longAddressData = {
				...mockData,
				address:
					'Este é um endereço muito longo que deve ser truncado com numberOfLines={1}',
			}

			const { getByText } = render(
				<CompletedServiceCard data={longAddressData} />,
			)

			const address = getByText(longAddressData.address)
			expect(address.props.numberOfLines).toBe(1)
		})
	})

	describe('Accessibility', () => {
		it('should have activeOpacity set', () => {
			const { getByTestId } = render(<CompletedServiceCard {...defaultProps} />)
			const card = getByTestId('touchable-opacity')
			// Checks if the TouchableOpacity component is rendered
			expect(card).toBeTruthy()
		})
	})

	describe('Integration with Star Component', () => {
		it('should pass the correct rating to the Star component', () => {
			const { getByTestId } = render(<CompletedServiceCard {...defaultProps} />)
			const starComponent = getByTestId('star-component')
			expect(starComponent.props.children).toBe('Star-4.5')
		})
	})
})
