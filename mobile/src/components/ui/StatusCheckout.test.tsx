import React from 'react'
import { render, screen } from '@testing-library/react-native'
import StatusCheckout from './StatusCheckout'
import { Theme } from '@/src/types/theme'

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
		light: {
			fontFamily: 'System',
			fontWeight: '300',
		},
		regular: {
			fontFamily: 'System',
			fontWeight: '400',
		},
		medium: {
			fontFamily: 'System',
			fontWeight: '500',
		},
		semibold: {
			fontFamily: 'System',
			fontWeight: '600',
		},
		bold: {
			fontFamily: 'System',
			fontWeight: '700',
		},
		heavy: {
			fontFamily: 'System',
			fontWeight: '900',
		},
	},
	size: {
		xss: 10,
		xs: 12,
		xsB: 13,
		sm: 14,
		smB: 15,
		base: 16,
		blg: 17,
		md: 16,
		lg: 18,
		lgX: 19,
		xl: 20,
		xxl: 24,
		xxxl: 32,
	},
}

const renderWithTheme = (component: React.ReactElement) => {
	return render(component)
}

describe('StatusCheckout', () => {
	const defaultProps = {
		status: 'Test Status',
		colorIcon: '#007AFF',
		number: 1,
	}

	it('renders correctly with default props', () => {
		renderWithTheme(<StatusCheckout {...defaultProps} />)

		expect(screen.getByTestId('status-container')).toBeTruthy()
		expect(screen.getByTestId('number-container')).toBeTruthy()
		expect(screen.getByTestId('number-text')).toBeTruthy()
		expect(screen.getByTestId('status-text')).toBeTruthy()
	})

	it('displays the correct status text', () => {
		renderWithTheme(<StatusCheckout {...defaultProps} />)

		expect(screen.getByTestId('status-text')).toHaveTextContent('Test Status')
	})

	it('displays the correct number', () => {
		renderWithTheme(<StatusCheckout {...defaultProps} />)

		expect(screen.getByTestId('number-text')).toHaveTextContent('1')
	})

	it('renders with different status text', () => {
		const customProps = {
			...defaultProps,
			status: 'Custom Status Message',
		}
		renderWithTheme(<StatusCheckout {...customProps} />)

		expect(screen.getByTestId('status-text')).toHaveTextContent(
			'Custom Status Message',
		)
	})

	it('renders with different number', () => {
		const customProps = {
			...defaultProps,
			number: 5,
		}
		renderWithTheme(<StatusCheckout {...customProps} />)

		expect(screen.getByTestId('number-text')).toHaveTextContent('5')
	})

	it('applies custom styleText prop', () => {
		const customStyle = { color: '#FF0000' }
		renderWithTheme(
			<StatusCheckout {...defaultProps} styleText={customStyle} />,
		)

		const statusText = screen.getByTestId('status-text')
		expect(statusText.props.style).toContainEqual(customStyle)
	})

	it('applies custom styleNumber prop', () => {
		const customStyle = { fontSize: 16 }
		renderWithTheme(
			<StatusCheckout {...defaultProps} styleNumber={customStyle} />,
		)

		const numberText = screen.getByTestId('number-text')
		expect(numberText.props.style).toContainEqual(customStyle)
	})

	it('has correct container layout', () => {
		renderWithTheme(<StatusCheckout {...defaultProps} />)

		const container = screen.getByTestId('status-container')
		expect(container.props.style).toEqual(
			expect.objectContaining({
				flexDirection: 'row',
				alignItems: 'center',
				justifyContent: 'space-between',
			}),
		)
	})

	it('has correct number container styling', () => {
		renderWithTheme(<StatusCheckout {...defaultProps} />)

		const numberContainer = screen.getByTestId('number-container')
		expect(numberContainer.props.style).toEqual(
			expect.arrayContaining([
				expect.objectContaining({
					backgroundColor: mockTheme.colors.card,
					borderRadius: 50,
					height: 20,
					width: 20,
					alignItems: 'center',
					justifyContent: 'center',
					borderWidth: 1,
					borderColor: mockTheme.colors.border,
				}),
			]),
		)
	})

	it('has correct status text styling', () => {
		renderWithTheme(<StatusCheckout {...defaultProps} />)

		const statusText = screen.getByTestId('status-text')
		expect(statusText.props.style).toEqual(
			expect.arrayContaining([
				expect.objectContaining({
					fontSize: mockTheme.size.xs,
					fontFamily: mockTheme.fonts.regular.fontFamily,
					color: mockTheme.colors.text,
					marginLeft: 8,
				}),
			]),
		)
	})

	it('has correct number text styling', () => {
		renderWithTheme(<StatusCheckout {...defaultProps} />)

		const numberText = screen.getByTestId('number-text')
		expect(numberText.props.style).toEqual(
			expect.arrayContaining([
				expect.objectContaining({
					fontSize: mockTheme.size.xss,
					fontFamily: mockTheme.fonts.regular.fontFamily,
					color: mockTheme.colors.text,
				}),
			]),
		)
	})

	it('renders with zero number', () => {
		const customProps = {
			...defaultProps,
			number: 0,
		}
		renderWithTheme(<StatusCheckout {...customProps} />)

		expect(screen.getByTestId('number-text')).toHaveTextContent('0')
	})

	it('renders with large number', () => {
		const customProps = {
			...defaultProps,
			number: 999,
		}
		renderWithTheme(<StatusCheckout {...customProps} />)

		expect(screen.getByTestId('number-text')).toHaveTextContent('999')
	})

	it('renders with empty status string', () => {
		const customProps = {
			...defaultProps,
			status: '',
		}
		renderWithTheme(<StatusCheckout {...customProps} />)

		expect(screen.getByTestId('status-text')).toHaveTextContent('')
	})

	it('renders with special characters in status', () => {
		const customProps = {
			...defaultProps,
			status: 'Status with @#$%^&*()',
		}
		renderWithTheme(<StatusCheckout {...customProps} />)

		expect(screen.getByTestId('status-text')).toHaveTextContent(
			'Status with @#$%^&*()',
		)
	})
})
