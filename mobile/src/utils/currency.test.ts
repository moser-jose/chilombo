import { formatKwanza } from './currency'

describe('formatKwanza', () => {
	describe('basic formatting', () => {
		it('formats whole numbers correctly', () => {
			expect(formatKwanza(1000, 2)).toBe('1.000,00')
			expect(formatKwanza(50000)).toBe('50.000,00')
			expect(formatKwanza(1000000)).toBe('1.000.000,00')
		})
	})
})
