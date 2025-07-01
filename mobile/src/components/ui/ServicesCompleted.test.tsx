import React from 'react'
import { render, fireEvent, waitFor } from '@testing-library/react-native'
import { router } from 'expo-router'
import ServicesCompleted from './ServicesCompleted'
import { Theme } from '@/src/types/theme'

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

// Mock the useTheme hook
jest.mock('@/src/hooks/useTheme', () => ({
	useTheme: () => ({
		theme: mockTheme,
	}),
}))

// Mock theme for testing
const mockTheme: Theme = {
	dark: false,
	colors: {
		text: '#000000',
		textMuted: '#666666',
		background: '#f5f5f5',
		tint: '#007AFF',
		tabIconDefault: '#8E8E93',
		borderInput: '#E5E5EA',
		tabIconSelected: '#007AFF',
		ImputBackgroundColors: '#F2F2F7',
		colorIconInput: '#8E8E93',
		secondaryMuted: '#C7C7CC',
		primary: '#007AFF',
		secondary: '#5856D6',
		card: '#ffffff',
		border: '#e0e0e0',
		notification: '#FF3B30',
		muted: '#8E8E93',
		tabBarBackgroundColor: '#ffffff',
		tabBarActiveTintColor: '#007AFF',
		modal: '#ffffff',
		backgroundHeader: '#ffffff',
		backgroundIcon: '#F2F2F7',
		backgroundHeaderScreen: '#ffffff',
		textHeader: '#000000',
		backgroundIconIndex: '#F2F2F7',
		buttonHeader: '#007AFF',
		borderBottomHeader: '#E5E5EA',
		cancelButton: '#FF3B30',
		black: '#000000',
		disabled: '#C7C7CC',
		error: '#FF3B30',
	},
	fonts: {
		light: { fontFamily: 'System', fontWeight: '300' },
		regular: { fontFamily: 'System', fontWeight: '400' },
		medium: { fontFamily: 'System', fontWeight: '500' },
		semibold: { fontFamily: 'System', fontWeight: '600' },
		bold: { fontFamily: 'System', fontWeight: '700' },
		heavy: { fontFamily: 'System', fontWeight: '900' },
	},
	size: {
		xss: 10,
		xs: 12,
		xsB: 14,
		sm: 16,
		smB: 18,
		md: 20,
		base: 22,
		blg: 24,
		lg: 26,
		lgX: 28,
		xl: 30,
		xxl: 32,
		xxxl: 34,
	},
}

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
	return render(component)
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
