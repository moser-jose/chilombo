import React from 'react'
import { render } from '@/src/test-utils'
import Star from './Star'

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

describe('Star', () => {
	const defaultProps = {
		rating: 4.5,
	}

	describe('Rendering', () => {
		it('should render the star icon and rating', () => {
			const { getByText, getByTestId } = render(<Star {...defaultProps} />)

			expect(getByTestId('icon-star')).toBeTruthy()
			expect(getByText('4.5')).toBeTruthy()
		})

		it('should render with correct star icon properties', () => {
			const { getByTestId } = render(<Star {...defaultProps} />)
			const starIcon = getByTestId('icon-star')

			expect(starIcon.props.children).toBe('star-12-#FFC107')
		})

		it('should render with default text color', () => {
			const { getByText } = render(<Star {...defaultProps} />)
			const ratingText = getByText('4.5')

			expect(ratingText.props.style).toContainEqual({ color: '#fff' })
		})
	})

	describe('Props and Customization', () => {
		it('should apply custom text color when provided', () => {
			const customColor = '#FF0000'
			const { getByText } = render(
				<Star {...defaultProps} textColor={customColor} />,
			)
			const ratingText = getByText('4.5')

			expect(ratingText.props.style).toContainEqual({ color: customColor })
		})

		it('should apply custom style when provided', () => {
			const customStyle = { backgroundColor: 'red', marginTop: 10 }
			const { getByTestId } = render(
				<Star {...defaultProps} style={customStyle} />,
			)
			const container = getByTestId('star-container')

			expect(container.props.style).toContain(customStyle)
		})

		it('should handle different rating values', () => {
			const { getByText, rerender } = render(<Star rating={0} />)
			expect(getByText('0')).toBeTruthy()

			rerender(<Star rating={5} />)
			expect(getByText('5')).toBeTruthy()

			rerender(<Star rating={3.7} />)
			expect(getByText('3.7')).toBeTruthy()
		})
	})

	describe('Edge Cases', () => {
		it('should handle negative rating values', () => {
			const { getByText } = render(<Star rating={-1} />)
			expect(getByText('-1')).toBeTruthy()
		})

		it('should handle very large rating values', () => {
			const { getByText } = render(<Star rating={999.99} />)
			expect(getByText('999.99')).toBeTruthy()
		})

		it('should handle decimal rating values', () => {
			const { getByText } = render(<Star rating={4.123} />)
			expect(getByText('4.123')).toBeTruthy()
		})
	})

	describe('Styling', () => {
		it('should have correct container styling', () => {
			const { getByTestId } = render(<Star rating={4.5} />)
			const container = getByTestId('star-container')
			const style = Array.isArray(container.props.style)
				? container.props.style
				: [container.props.style]
			expect(style).toEqual(
				expect.arrayContaining([
					expect.objectContaining({
						backgroundColor: 'rgba(0, 0, 0, 0.6)',
						flexDirection: 'row',
						alignItems: 'center',
						paddingHorizontal: 8,
						paddingVertical: 4,
						borderRadius: 12,
						justifyContent: 'center',
						borderWidth: 1,
						borderColor: 'rgba(0, 0, 0, 0.22)',
					}),
				]),
			)
		})

		it('should have correct text styling', () => {
			const { getByText } = render(<Star rating={4.5} />)
			const text = getByText('4.5')
			const style = Array.isArray(text.props.style)
				? text.props.style
				: [text.props.style]
			expect(style).toEqual(
				expect.arrayContaining([
					expect.objectContaining({
						fontSize: 10, // theme.size.xss
						fontFamily: 'PoppinsSemiBold',
						color: '#fff',
						marginLeft: 4,
					}),
				]),
			)
		})

		it('should apply custom text color', () => {
			const { getByText } = render(<Star rating={4.5} textColor="#FF0000" />)
			const text = getByText('4.5')
			const style = Array.isArray(text.props.style)
				? text.props.style
				: [text.props.style]
			expect(style).toEqual(
				expect.arrayContaining([
					expect.objectContaining({
						color: '#FF0000',
					}),
				]),
			)
		})

		it('should apply custom container style', () => {
			const customStyle = { backgroundColor: 'red' }
			const { getByTestId } = render(<Star rating={4.5} style={customStyle} />)
			const container = getByTestId('star-container')
			const style = Array.isArray(container.props.style)
				? container.props.style
				: [container.props.style]
			expect(style).toEqual(
				expect.arrayContaining([expect.objectContaining(customStyle)]),
			)
		})
	})

	describe('Accessibility', () => {
		it('should have proper testID for star icon', () => {
			const { getByTestId } = render(<Star {...defaultProps} />)
			expect(getByTestId('icon-star')).toBeTruthy()
		})

		it('should have proper testID for container', () => {
			const { getByTestId } = render(<Star {...defaultProps} />)
			expect(getByTestId('star-container')).toBeTruthy()
		})
	})
})
