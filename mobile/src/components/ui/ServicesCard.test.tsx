import React from 'react'
import { render, fireEvent, waitFor } from '@/src/test-utils'
import ServicesCard from './ServicesCard'

// Mock expo-router
jest.mock('expo-router', () => ({
	router: {
		push: jest.fn(),
	},
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
						backgroundColor: '#F8F7FB',
						borderColor: 'rgba(136, 133, 135, 0.31)',
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
						fontFamily: 'PoppinsMedium',
						textAlign: 'center',
						color: 'rgba(4, 9, 16, 0.82)',
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
			// Forçar o tema escuro via provider
			const { CustomThemeProvider } = require('@/src/context/ThemeContext')
			// HACK: Forçar o valor do sistema para dark
			jest
				.spyOn(require('react-native'), 'useColorScheme')
				.mockReturnValue('dark')
			return render(<CustomThemeProvider>{ui}</CustomThemeProvider>)
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
