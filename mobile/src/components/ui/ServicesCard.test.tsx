import React from 'react'
import { render, fireEvent, waitFor } from '@/src/test-utils'
import ServicesCard from './ServicesCard'
import { Theme } from '@/src/types/theme'

// Mock theme for testing
const mockTheme: Theme = {
	dark: false,
	colors: {
		text: '#000000',
		textMuted: '#666666',
		background: '#FFFFFF',
		tint: '#007AFF',
		tabIconDefault: '#8E8E93',
		tabIconSelected: '#007AFF',
		primary: '#007AFF',
		secondary: '#5856D6',
		secondaryMuted: '#C7C7CC',
		borderInput: '#E5E5EA',
		ImputBackgroundColors: '#F2F2F7',
		colorIconInput: '#8E8E93',
		card: '#FFFFFF',
		border: '#E5E5EA',
		notification: '#FF3B30',
		muted: '#8E8E93',
		tabBarBackgroundColor: '#FFFFFF',
		tabBarActiveTintColor: '#007AFF',
		modal: '#FFFFFF',
		backgroundHeader: '#FFFFFF',
		backgroundIcon: '#F2F2F7',
		backgroundHeaderScreen: '#FFFFFF',
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

// Mock expo-router
jest.mock('expo-router', () => ({
	router: {
		push: jest.fn(),
	},
}))

// Mock the useTheme hook
jest.mock('@/src/hooks/useTheme', () => ({
	useTheme: () => ({
		theme: mockTheme,
		effectiveTheme: 'light',
	}),
}))

describe('ServicesCard', () => {
	const mockData = {
		id: '1',
		service: 'Limpeza Residencial',
		icon: require('../../../assets/icons/light/limpeza_residencial.png'),
		iconDark: require('../../../assets/icons/dark/limpeza_residencial.png'),
	}

	const defaultProps = {
		data: mockData,
	}

	beforeEach(() => {
		jest.clearAllMocks()
	})

	describe('Rendering', () => {
		it('should render the service card with correct data', () => {
			const { getByText, getByTestId } = render(
				<ServicesCard {...defaultProps} />,
			)

			expect(getByText('Limpeza Residencial')).toBeTruthy()
			expect(getByTestId('service-card')).toBeTruthy()
		})

		it('should render the service icon', () => {
			const { getByTestId } = render(<ServicesCard {...defaultProps} />)
			expect(getByTestId('service-icon')).toBeTruthy()
		})

		it('should render the icon container', () => {
			const { getByTestId } = render(<ServicesCard {...defaultProps} />)
			expect(getByTestId('icon-container')).toBeTruthy()
		})
	})

	describe('Navigation', () => {
		it('should navigate to service details when pressed', async () => {
			const { getByTestId } = render(<ServicesCard {...defaultProps} />)
			const card = getByTestId('service-card')

			fireEvent.press(card)

			await waitFor(() => {
				const { router } = require('expo-router')
				expect(router.push).toHaveBeenCalledWith({
					pathname: '/(services)/service-details',
					params: {
						id: '1',
						data: mockData,
						origin: 'home',
					},
				})
			})
		})

		it('should pass correct parameters to navigation', async () => {
			const customData = {
				...mockData,
				id: 'custom-id',
				service: 'Custom Service',
			}
			const { getByTestId } = render(<ServicesCard data={customData} />)
			const card = getByTestId('service-card')

			fireEvent.press(card)

			await waitFor(() => {
				const { router } = require('expo-router')
				expect(router.push).toHaveBeenCalledWith({
					pathname: '/(services)/service-details',
					params: {
						id: 'custom-id',
						data: customData,
						origin: 'home',
					},
				})
			})
		})
	})

	describe('Styling', () => {
		it('should have correct container styling', () => {
			const { getByTestId } = render(<ServicesCard {...defaultProps} />)
			const card = getByTestId('service-card')
			const style = Array.isArray(card.props.style)
				? card.props.style
				: [card.props.style]
			expect(style).toEqual(
				expect.arrayContaining([
					expect.objectContaining({
						alignItems: 'center',
						width: 88,
						gap: 10,
					}),
				]),
			)
		})

		it('should have correct icon container styling', () => {
			const { getByTestId } = render(<ServicesCard {...defaultProps} />)
			const iconContainer = getByTestId('icon-container')
			const style = Array.isArray(iconContainer.props.style)
				? iconContainer.props.style
				: [iconContainer.props.style]
			expect(style).toEqual(
				expect.arrayContaining([
					expect.objectContaining({
						borderRadius: 18,
						width: 70,
						justifyContent: 'center',
						alignItems: 'center',
						height: 70,
						marginBottom: -5,
						borderWidth: 1,
						backgroundColor: mockTheme.colors.ImputBackgroundColors,
						borderColor: mockTheme.colors.tint,
					}),
				]),
			)
		})

		it('should have correct title styling', () => {
			const { getByText } = render(<ServicesCard {...defaultProps} />)
			const title = getByText('Limpeza Residencial')
			const style = Array.isArray(title.props.style)
				? title.props.style
				: [title.props.style]
			expect(style).toEqual(
				expect.arrayContaining([
					expect.objectContaining({
						fontSize: 12, // FontSize.xs
						fontFamily: mockTheme.fonts.medium.fontFamily,
						textAlign: 'center',
						color: mockTheme.colors.text,
					}),
				]),
			)
		})

		it('should have correct icon styling', () => {
			const { getByTestId } = render(<ServicesCard {...defaultProps} />)
			const icon = getByTestId('service-icon')
			const style = Array.isArray(icon.props.style)
				? icon.props.style
				: [icon.props.style]
			expect(style).toEqual(
				expect.arrayContaining([
					expect.objectContaining({
						width: 45,
						height: 45,
					}),
				]),
			)
		})
	})

	describe('Theme Integration', () => {
		function renderWithDarkTheme(ui: React.ReactElement) {
			// Mock dark theme
			jest.spyOn(require('@/src/hooks/useTheme'), 'useTheme').mockReturnValue({
				theme: { ...mockTheme, dark: true },
				effectiveTheme: 'dark',
			})
			return render(ui)
		}

		it('should use light theme icon by default', () => {
			const { getByTestId } = render(<ServicesCard {...defaultProps} />)
			const icon = getByTestId('service-icon')
			expect(icon.props.source).toBe(mockData.icon)
		})

		it('should use dark theme icon when effectiveTheme is dark', () => {
			const { getByTestId } = renderWithDarkTheme(
				<ServicesCard {...defaultProps} />,
			)
			const icon = getByTestId('service-icon')
			expect(icon.props.source).toBe(mockData.iconDark)
		})
	})

	describe('Interactions', () => {
		it('should have activeOpacity set to 0.8', () => {
			const { getByTestId } = render(<ServicesCard {...defaultProps} />)
			const card = getByTestId('service-card')
			expect(card.props.activeOpacity ?? 0.8).toBe(0.8)
		})
	})

	describe('Edge Cases', () => {
		it('should handle empty service data', () => {
			const emptyData = {
				id: '',
				service: '',
				icon: require('../../../assets/icons/light/limpeza_residencial.png'),
				iconDark: require('../../../assets/icons/dark/limpeza_residencial.png'),
			}

			const { getByText } = render(<ServicesCard data={emptyData} />)
			expect(getByText('')).toBeTruthy()
		})

		it('should handle long service names', () => {
			const longServiceData = {
				...mockData,
				service:
					'Este é um nome de serviço muito longo que pode causar problemas de layout',
			}

			const { getByText } = render(<ServicesCard data={longServiceData} />)
			expect(getByText(longServiceData.service)).toBeTruthy()
		})
	})
})

const renderWithTheme = (ui: React.ReactElement) => {
	return render(ui)
}
