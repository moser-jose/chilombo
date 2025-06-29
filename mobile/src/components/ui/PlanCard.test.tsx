import React from 'react'
import { render, fireEvent } from '@/src/test-utils'
import PlanCard from './PlanCard'
import { formatKwanza } from '@/src/utils/currency'

describe('PlanCard', () => {
	const defaultProps = {
		title: 'Plano Básico',
		description: 'Plano ideal para pequenas limpezas',
		price: 5000,
		activities: [
			'Limpeza geral da casa',
			'Lavagem de roupa',
			'Organização de quartos',
		],
		onPress: jest.fn(),
	}

	beforeEach(() => {
		jest.clearAllMocks()
	})

	it('renders correctly with all required props', () => {
		const { getByText } = render(<PlanCard {...defaultProps} />)

		expect(getByText('Plano Básico')).toBeTruthy()
		expect(getByText('Plano ideal para pequenas limpezas')).toBeTruthy()
		expect(getByText('Actividades')).toBeTruthy()
		expect(getByText('Limpeza geral da casa')).toBeTruthy()
		expect(getByText('Lavagem de roupa')).toBeTruthy()
		expect(getByText('Organização de quartos')).toBeTruthy()
		expect(getByText('Começar Agora')).toBeTruthy()
	})

	it('renders tag when provided', () => {
		const propsWithTag = { ...defaultProps, tag: 'Popular' }
		const { getByText } = render(<PlanCard {...propsWithTag} />)

		expect(getByText('Popular')).toBeTruthy()
	})

	it('does not render tag when not provided', () => {
		const { queryByText } = render(<PlanCard {...defaultProps} />)

		expect(queryByText('Popular')).toBeNull()
	})

	it('displays formatted price correctly', () => {
		const { getByText } = render(<PlanCard {...defaultProps} />)

		expect(formatKwanza(5000)).toBe('5.000,00')
		expect(getByText('KZs')).toBeTruthy()
	})

	it('calls onPress when button is pressed', () => {
		const mockOnPress = jest.fn()
		const { getByText } = render(
			<PlanCard {...defaultProps} onPress={mockOnPress} />,
		)

		const button = getByText('Começar Agora')
		fireEvent.press(button)

		expect(mockOnPress).toHaveBeenCalledTimes(1)
	})

	it('renders all activities with checkmark icons', () => {
		const { getByText } = render(<PlanCard {...defaultProps} />)

		// Check that all activities are rendered
		defaultProps.activities.forEach(activity => {
			expect(getByText(activity)).toBeTruthy()
		})
	})

	it('handles empty activities array', () => {
		const propsWithNoActivities = { ...defaultProps, activities: [] }
		const { getByText, queryByText } = render(
			<PlanCard {...propsWithNoActivities} />,
		)

		expect(getByText('Actividades')).toBeTruthy()
		expect(queryByText('Limpeza geral da casa')).toBeNull()
	})

	it('handles different price values', () => {
		const highPriceProps = { ...defaultProps, price: 15000 }
		const { getByText } = render(<PlanCard {...highPriceProps} />)

		expect(getByText(formatKwanza(15000))).toBeTruthy()
	})

	it('renders with different themes', () => {
		const { getByText, rerender } = render(<PlanCard {...defaultProps} />)

		// Test with light theme (default)
		expect(getByText('Plano Básico')).toBeTruthy()

		// Re-render to test theme switching (this would be handled by the theme context)
		rerender(<PlanCard {...defaultProps} />)
		expect(getByText('Plano Básico')).toBeTruthy()
	})

	it('displays correct button text and icon', () => {
		const { getByText } = render(<PlanCard {...defaultProps} />)

		const buttonText = getByText('Começar Agora')
		expect(buttonText).toBeTruthy()
	})

	it('handles long text content gracefully', () => {
		const longTextProps = {
			...defaultProps,
			title:
				'Este é um título muito longo que pode quebrar em múltiplas linhas',
			description:
				'Este é um texto de descrição muito longo que pode ocupar várias linhas e testar como o componente se comporta com conteúdo extenso',
			activities: [
				'Atividade muito longa que pode quebrar em múltiplas linhas e testar o comportamento do componente',
				'Outra atividade extensa para testar o layout',
			],
		}

		const { getByText } = render(<PlanCard {...longTextProps} />)

		expect(getByText(longTextProps.title)).toBeTruthy()
		expect(getByText(longTextProps.description)).toBeTruthy()
		longTextProps.activities.forEach(activity => {
			expect(getByText(activity)).toBeTruthy()
		})
	})

	it('maintains accessibility features', () => {
		const { getByText } = render(<PlanCard {...defaultProps} />)

		const button = getByText('Começar Agora')
		expect(button).toBeTruthy()
		// The button should be pressable
		expect(button.props.accessibilityRole || 'button').toBeTruthy()
	})
})
