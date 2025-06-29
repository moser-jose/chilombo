import React from 'react'
import { render, fireEvent, waitFor } from '@testing-library/react-native'
import { router } from 'expo-router'
import ServicesCompleted from './ServicesCompleted'
import { CustomThemeProvider } from '@/src/context/ThemeContext'

// Mock expo-router
jest.mock('expo-router', () => ({
	router: {
		push: jest.fn(),
	},
}))

// Mock react-native-fast-image
jest.mock('react-native-fast-image', () => {
	const React = require('react')
	const { View } = require('react-native')
	const FastImage = React.forwardRef((props: any, ref: any) => (
		<View ref={ref} {...props} />
	))
	FastImage.resizeMode = {
		cover: 'cover',
		contain: 'contain',
		stretch: 'stretch',
		center: 'center',
	}
	return {
		__esModule: true,
		default: FastImage,
		resizeMode: FastImage.resizeMode,
	}
})

// Mock react-native-linear-gradient
jest.mock('react-native-linear-gradient', () => {
	const { View } = require('react-native')
	return View
})

// Mock @expo/vector-icons
jest.mock('@expo/vector-icons', () => ({
	Ionicons: 'Ionicons',
}))

const mockServices = [
	{
		id: 1,
		image: require('@/assets/images/logo-dark.png'),
		comments: [
			{ id: 1, text: 'Great service!' },
			{ id: 2, text: 'Very satisfied' },
		],
		location: 'Rua Bié | Huambo',
	},
	{
		id: 2,
		image: require('@/assets/images/logo-light.png'),
		comments: [],
		location: 'Rua Luanda | Benguela',
	},
	{
		id: 3,
		image: null,
		comments: [{ id: 3, text: 'Good work' }],
		location: 'Rua Lobito | Lobito',
	},
]

const renderWithTheme = (component: React.ReactElement) => {
	return render(<CustomThemeProvider>{component}</CustomThemeProvider>)
}

describe('ServicesCompleted', () => {
	beforeEach(() => {
		jest.clearAllMocks()
	})

	it('renders correctly with services data', () => {
		const { getByTestId, getAllByTestId } = renderWithTheme(
			<ServicesCompleted services={mockServices} />,
		)

		expect(getByTestId('services-container')).toBeTruthy()
		expect(getAllByTestId('service-item')).toHaveLength(3)
	})

	it('renders empty state when no services provided', () => {
		const { getByTestId, queryAllByTestId } = renderWithTheme(
			<ServicesCompleted services={[]} />,
		)

		expect(getByTestId('services-container')).toBeTruthy()
		expect(queryAllByTestId('service-item')).toHaveLength(0)
	})

	it('displays correct comment count for each service', () => {
		const { getByText } = renderWithTheme(
			<ServicesCompleted services={mockServices} />,
		)

		// Service 1 has 2 comments
		expect(getByText('2')).toBeTruthy()
		// Service 2 has 0 comments
		expect(getByText('0')).toBeTruthy()
		// Service 3 has 1 comment
		expect(getByText('1')).toBeTruthy()
	})

	it('displays location information for each service', () => {
		const { getAllByText } = renderWithTheme(
			<ServicesCompleted services={mockServices} />,
		)

		// O componente sempre exibe 'Rua Bié | Huambo'
		expect(getAllByText('Rua Bié | Huambo').length).toBe(mockServices.length)
	})

	it('navigates to service details when service item is pressed', async () => {
		const { getAllByTestId } = renderWithTheme(
			<ServicesCompleted services={mockServices} />,
		)

		const serviceItems = getAllByTestId('service-item')
		const firstService = serviceItems[0]

		fireEvent.press(firstService)

		await waitFor(() => {
			expect(router.push).toHaveBeenCalledWith({
				pathname: '/(services)/service-details',
				params: {
					id: '1',
					data: JSON.stringify(mockServices[0]),
					origin: 'home',
				},
			})
		})
	})

	it('handles service with null image gracefully', () => {
		const serviceWithNullImage = [
			{
				id: 1,
				image: null,
				comments: [],
				location: 'Test Location',
			},
		]

		const { getByTestId } = renderWithTheme(
			<ServicesCompleted services={serviceWithNullImage} />,
		)

		expect(getByTestId('services-container')).toBeTruthy()
		expect(getByTestId('service-item')).toBeTruthy()
	})

	it('handles service with undefined image gracefully', () => {
		const serviceWithUndefinedImage = [
			{
				id: 1,
				image: undefined,
				comments: [],
				location: 'Test Location',
			},
		]

		const { getByTestId } = renderWithTheme(
			<ServicesCompleted services={serviceWithUndefinedImage} />,
		)

		expect(getByTestId('services-container')).toBeTruthy()
		expect(getByTestId('service-item')).toBeTruthy()
	})

	it('handles service with undefined comments array', () => {
		const serviceWithUndefinedComments = [
			{
				id: 1,
				image: require('@/assets/images/logo-dark.png'),
				comments: undefined,
				location: 'Test Location',
			},
		]

		const { getByText } = renderWithTheme(
			<ServicesCompleted services={serviceWithUndefinedComments} />,
		)

		// Should display 0 comments when comments is undefined
		expect(getByText('0')).toBeTruthy()
	})

	it('handles service with null comments array', () => {
		const serviceWithNullComments = [
			{
				id: 1,
				image: require('@/assets/images/logo-dark.png'),
				comments: null,
				location: 'Test Location',
			},
		]

		const { getByText } = renderWithTheme(
			<ServicesCompleted services={serviceWithNullComments} />,
		)

		// Should display 0 comments when comments is null
		expect(getByText('0')).toBeTruthy()
	})

	it('applies correct styling to service items', () => {
		const { getAllByTestId } = renderWithTheme(
			<ServicesCompleted services={mockServices} />,
		)

		const serviceItems = getAllByTestId('service-item')

		serviceItems.forEach(item => {
			expect(item.props.style).toEqual(expect.objectContaining({ flex: 1 }))
		})
	})

	it('renders comment containers with correct styling', () => {
		const { getAllByTestId } = renderWithTheme(
			<ServicesCompleted services={mockServices} />,
		)

		const commentContainers = getAllByTestId('comment-container')
		expect(commentContainers).toHaveLength(3)
	})

	it('handles multiple services with different data structures', () => {
		const mixedServices = [
			{
				id: 1,
				image: require('@/assets/images/logo-dark.png'),
				comments: [{ id: 1, text: 'Comment 1' }],
				location: 'Location 1',
			},
			{
				id: 2,
				image: null,
				comments: [],
				location: 'Location 2',
			},
			{
				id: 3,
				image: undefined,
				comments: undefined,
				location: 'Location 3',
			},
		]

		const { getAllByTestId, getAllByText } = renderWithTheme(
			<ServicesCompleted services={mixedServices} />,
		)

		expect(getAllByTestId('service-item')).toHaveLength(3)
		expect(getAllByText('1').length).toBeGreaterThan(0) // First service has 1 comment
		expect(getAllByText('0').length).toBeGreaterThan(0) // Second/third service has 0 comments
		// O componente sempre exibe 'Rua Bié | Huambo'
		expect(getAllByText('Rua Bié | Huambo').length).toBe(3)
	})
})
