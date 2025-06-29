import { formatPhoneNumber } from './formatPhone'

describe('formatPhoneNumber', () => {
	describe('basic phone number formatting', () => {
		it('formats phone numbers without country code', () => {
			expect(formatPhoneNumber('123456789')).toBe('+244123456789')
			expect(formatPhoneNumber('987654321')).toBe('+244987654321')
			expect(formatPhoneNumber('555123456')).toBe('+244555123456')
		})

		it('adds country code to numbers that already have it', () => {
			expect(formatPhoneNumber('+244123456789')).toBe('+244244123456789')
			expect(formatPhoneNumber('+244987654321')).toBe('+244244987654321')
			expect(formatPhoneNumber('+244555123456')).toBe('+244244555123456')
		})

		it('removes non-digit characters from input', () => {
			expect(formatPhoneNumber('123-456-789')).toBe('+244123456789')
			expect(formatPhoneNumber('(123) 456-7890')).toBe('+2441234567890')
			expect(formatPhoneNumber('123.456.789')).toBe('+244123456789')
			expect(formatPhoneNumber('123 456 789')).toBe('+244123456789')
		})
	})

	describe('custom country codes', () => {
		it('uses custom country code when provided', () => {
			expect(formatPhoneNumber('123456789', '+1')).toBe('+1123456789')
			expect(formatPhoneNumber('987654321', '+351')).toBe('+351987654321')
			expect(formatPhoneNumber('555123456', '+44')).toBe('+44555123456')
		})

		it('adds custom country code to numbers that already have it', () => {
			expect(formatPhoneNumber('+1123456789', '+1')).toBe('+11123456789')
			expect(formatPhoneNumber('+351987654321', '+351')).toBe(
				'+351351987654321',
			)
			expect(formatPhoneNumber('+44555123456', '+44')).toBe('+4444555123456')
		})

		it('handles different country code formats', () => {
			expect(formatPhoneNumber('123456789', '+1')).toBe('+1123456789')
			expect(formatPhoneNumber('123456789', '1')).toBe('123456789')
		})
	})

	describe('edge cases', () => {
		it('handles empty string', () => {
			expect(formatPhoneNumber('')).toBe('+244')
		})

		it('handles string with only non-digit characters', () => {
			expect(formatPhoneNumber('abc-def-ghi')).toBe('+244')
			expect(formatPhoneNumber('(123) 456-7890')).toBe('+2441234567890')
			expect(formatPhoneNumber('123.456.789')).toBe('+244123456789')
		})

		it('handles phone numbers with leading zeros', () => {
			expect(formatPhoneNumber('0123456789')).toBe('+2440123456789')
			expect(formatPhoneNumber('00123456789')).toBe('+24400123456789')
		})

		it('handles very long phone numbers', () => {
			const longNumber = '1'.repeat(20)
			expect(formatPhoneNumber(longNumber)).toBe('+244' + longNumber)
		})

		it('handles very short phone numbers', () => {
			expect(formatPhoneNumber('1')).toBe('+2441')
			expect(formatPhoneNumber('12')).toBe('+24412')
			expect(formatPhoneNumber('123')).toBe('+244123')
		})
	})

	describe('international phone numbers', () => {
		it('adds default country code to international numbers', () => {
			expect(formatPhoneNumber('+1123456789')).toBe('+2441123456789')
			expect(formatPhoneNumber('+351987654321')).toBe('+244351987654321')
			expect(formatPhoneNumber('+44555123456')).toBe('+24444555123456')
			expect(formatPhoneNumber('+61412345678')).toBe('+24461412345678')
		})

		it('handles phone numbers with spaces and formatting', () => {
			expect(formatPhoneNumber('+1 (234) 567-8901')).toBe('+24412345678901')
			expect(formatPhoneNumber('+44 20 7946 0958')).toBe('+244442079460958')
			expect(formatPhoneNumber('+351 123 456 789')).toBe('+244351123456789')
		})
	})

	describe('Angolan phone number formats', () => {
		it('handles common Angolan phone number formats', () => {
			expect(formatPhoneNumber('912345678')).toBe('+244912345678')
			expect(formatPhoneNumber('923456789')).toBe('+244923456789')
			expect(formatPhoneNumber('933456789')).toBe('+244933456789')
		})

		it('adds country code to Angolan phone numbers with existing country code', () => {
			expect(formatPhoneNumber('+244912345678')).toBe('+244244912345678')
			expect(formatPhoneNumber('+244923456789')).toBe('+244244923456789')
		})

		it('handles Angolan phone numbers with formatting', () => {
			expect(formatPhoneNumber('912-345-678')).toBe('+244912345678')
			expect(formatPhoneNumber('(912) 345-678')).toBe('+244912345678')
			expect(formatPhoneNumber('912.345.678')).toBe('+244912345678')
		})
	})

	describe('input validation', () => {
		it('handles null and undefined inputs by throwing error', () => {
			// @ts-ignore - Testing invalid input
			expect(() => formatPhoneNumber(null)).toThrow()
			// @ts-ignore - Testing invalid input
			expect(() => formatPhoneNumber(undefined)).toThrow()
		})

		it('handles non-string inputs by throwing error', () => {
			// @ts-ignore - Testing invalid input
			expect(() => formatPhoneNumber(123456789)).toThrow()
			// @ts-ignore - Testing invalid input
			expect(() => formatPhoneNumber(987654321)).toThrow()
		})
	})

	describe('performance and memory', () => {
		it('handles very large numbers efficiently', () => {
			const largeNumber = '9'.repeat(100)
			const result = formatPhoneNumber(largeNumber)
			expect(result).toBe('+244' + largeNumber)
			expect(result.length).toBe(104) // +244 + 100 digits
		})

		it('handles repeated calls with same input', () => {
			const phone = '123456789'
			expect(formatPhoneNumber(phone)).toBe('+244123456789')
			expect(formatPhoneNumber(phone)).toBe('+244123456789')
			expect(formatPhoneNumber(phone)).toBe('+244123456789')
		})
	})
})
