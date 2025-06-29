import { formatKwanza } from './currency'

describe('formatKwanza', () => {
	describe('basic formatting', () => {
		it('formats whole numbers correctly', () => {
			expect(formatKwanza(1000, 2)).toBe('1.000,00')
			expect(formatKwanza(50000)).toBe('50.000,00')
			expect(formatKwanza(1000000)).toBe('1.000.000,00')
		})

		it('formats decimal numbers correctly', () => {
			expect(formatKwanza(1234.56)).toBe('1.234,56')
			expect(formatKwanza(999.99)).toBe('999,99')
			expect(formatKwanza(0.5)).toBe('0,50')
		})

		it('handles zero and small numbers', () => {
			expect(formatKwanza(0)).toBe('0,00')
			expect(formatKwanza(1)).toBe('1,00')
			expect(formatKwanza(0.01)).toBe('0,01')
		})

		it('handles large numbers', () => {
			expect(formatKwanza(999999999)).toBe('999.999.999,00')
			expect(formatKwanza(1234567890)).toBe('1.234.567.890,00')
		})
	})

	describe('fraction digits', () => {
		it('respects custom fraction digits', () => {
			expect(formatKwanza(1234.5678, 0)).toBe('1.235')
			expect(formatKwanza(1234.5678, 1)).toBe('1.234,6')
			expect(formatKwanza(1234.5678, 3)).toBe('1.234,568')
			expect(formatKwanza(1234.5678, 4)).toBe('1.234,5678')
		})

		it('rounds numbers correctly', () => {
			expect(formatKwanza(1234.567, 2)).toBe('1.234,57')
			expect(formatKwanza(1234.564, 2)).toBe('1.234,56')
			expect(formatKwanza(1234.555, 2)).toBe('1.234,56')
		})
	})

	describe('edge cases', () => {
		it('handles negative numbers', () => {
			expect(formatKwanza(1234.56)).toBe('1.234,56')
			expect(formatKwanza(1000)).toBe('1.000,00')
		})

		it('handles very small decimal numbers', () => {
			expect(formatKwanza(0.001, 3)).toBe('0,001')
			expect(formatKwanza(0.0001, 4)).toBe('0,0001')
		})

		it('handles numbers without thousands separator', () => {
			expect(formatKwanza(999)).toBe('999,00')
			expect(formatKwanza(123)).toBe('123,00')
		})
	})
})
