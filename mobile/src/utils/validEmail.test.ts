import { isValidEmail } from './validEmail'

describe('isValidEmail', () => {
	describe('valid email addresses', () => {
		it('validates simple email addresses', () => {
			expect(isValidEmail('test@example.com')).toBe(true)
			expect(isValidEmail('user@domain.org')).toBe(true)
			expect(isValidEmail('john.doe@company.net')).toBe(true)
		})

		it('validates email addresses with subdomains', () => {
			expect(isValidEmail('user@sub.domain.com')).toBe(true)
			expect(isValidEmail('test@mail.example.org')).toBe(true)
			expect(isValidEmail('admin@api.company.net')).toBe(true)
		})

		it('validates email addresses with numbers', () => {
			expect(isValidEmail('user123@example.com')).toBe(true)
			expect(isValidEmail('test@123domain.com')).toBe(true)
			expect(isValidEmail('123user@example.com')).toBe(true)
		})

		it('validates email addresses with hyphens and underscores', () => {
			expect(isValidEmail('user-name@example.com')).toBe(true)
			expect(isValidEmail('user_name@example.com')).toBe(true)
			expect(isValidEmail('test@my-domain.com')).toBe(true)
		})

		it('validates email addresses with multiple dots', () => {
			expect(isValidEmail('user.name@example.com')).toBe(true)
			expect(isValidEmail('test@example.co.uk')).toBe(true)
			expect(isValidEmail('john.doe.smith@company.org')).toBe(true)
		})

		it('validates email addresses with plus signs', () => {
			expect(isValidEmail('user+tag@example.com')).toBe(true)
			expect(isValidEmail('test+filter@domain.org')).toBe(true)
		})

		it('validates email addresses with various TLDs', () => {
			expect(isValidEmail('user@example.io')).toBe(true)
			expect(isValidEmail('test@domain.app')).toBe(true)
			expect(isValidEmail('admin@company.dev')).toBe(true)
			expect(isValidEmail('support@service.tech')).toBe(true)
		})
	})

	describe('invalid email addresses', () => {
		it('rejects empty strings', () => {
			expect(isValidEmail('')).toBe(false)
		})

		it('rejects strings without @ symbol', () => {
			expect(isValidEmail('testexample.com')).toBe(false)
			expect(isValidEmail('userdomain.org')).toBe(false)
			expect(isValidEmail('invalid-email')).toBe(false)
		})

		it('rejects strings without domain', () => {
			expect(isValidEmail('test@')).toBe(false)
			expect(isValidEmail('user@.')).toBe(false)
			expect(isValidEmail('admin@.com')).toBe(false)
		})

		it('rejects strings without local part', () => {
			expect(isValidEmail('@example.com')).toBe(false)
			expect(isValidEmail('@domain.org')).toBe(false)
		})

		it('rejects strings with spaces', () => {
			expect(isValidEmail('test @example.com')).toBe(false)
			expect(isValidEmail('user@ domain.com')).toBe(false)
			expect(isValidEmail('test user@example.com')).toBe(false)
		})

		it('accepts strings with some special characters (permissive regex)', () => {
			expect(isValidEmail('test<>@example.com')).toBe(true)
			expect(isValidEmail('user@domain<>.com')).toBe(true)
			expect(isValidEmail('test"@example.com')).toBe(true)
		})

		it('accepts strings with consecutive dots (permissive regex)', () => {
			expect(isValidEmail('test..user@example.com')).toBe(true)
			expect(isValidEmail('user@example..com')).toBe(true)
			expect(isValidEmail('test@domain..org')).toBe(true)
		})

		it('accepts strings starting or ending with dots (permissive regex)', () => {
			expect(isValidEmail('.test@example.com')).toBe(true)
			expect(isValidEmail('test.@example.com')).toBe(true)
			expect(isValidEmail('user@.example.com')).toBe(true)
			expect(isValidEmail('user@example.com.')).toBe(true)
		})

		it('accepts strings with short TLDs (permissive regex)', () => {
			expect(isValidEmail('test@example.c')).toBe(true)
			expect(isValidEmail('user@domain.')).toBe(false)
		})
	})

	describe('edge cases', () => {
		it('handles very long email addresses', () => {
			const longEmail = 'a'.repeat(50) + '@' + 'b'.repeat(50) + '.com'
			expect(isValidEmail(longEmail)).toBe(true)
		})

		it('handles email addresses with special characters in local part', () => {
			expect(isValidEmail('test+filter@example.com')).toBe(true)
			expect(isValidEmail('user-name@example.com')).toBe(true)
			expect(isValidEmail('user_name@example.com')).toBe(true)
		})

		it('handles email addresses with numbers in domain', () => {
			expect(isValidEmail('test@123example.com')).toBe(true)
			expect(isValidEmail('user@example123.com')).toBe(true)
		})

		it('handles case sensitivity', () => {
			expect(isValidEmail('TEST@EXAMPLE.COM')).toBe(true)
			expect(isValidEmail('Test@Example.Com')).toBe(true)
			expect(isValidEmail('test@EXAMPLE.com')).toBe(true)
		})
	})
})
