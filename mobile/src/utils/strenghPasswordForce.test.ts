import {
	checkPasswordStrength,
	getPasswordRequirements,
	isStrongPassword,
} from './strenghPasswordForce'

describe('checkPasswordStrength', () => {
	describe('password scoring', () => {
		it('returns score 0 for empty password', () => {
			const result = checkPasswordStrength('')
			expect(result.score).toBe(0)
			expect(result.message).toBe('A senha deve ter pelo menos 8 caracteres')
			expect(result.isValid).toBe(false)
		})

		it('returns score 25 for password with only numbers', () => {
			const result = checkPasswordStrength('12345678')
			expect(result.score).toBe(25)
			expect(result.message).toBe('Senha fraca')
			expect(result.isValid).toBe(false)
		})

		it('returns score 50 for password with numbers and symbols', () => {
			const result = checkPasswordStrength('12345678!')
			expect(result.score).toBe(50)
			expect(result.message).toBe('Senha média')
			expect(result.isValid).toBe(false)
		})

		it('returns score 75 for password with numbers, symbols, and uppercase', () => {
			const result = checkPasswordStrength('12345678!A')
			expect(result.score).toBe(75)
			expect(result.message).toBe('Senha forte')
			expect(result.isValid).toBe(false)
		})

		it('returns score 100 for password with all requirements', () => {
			const result = checkPasswordStrength('12345678!Aa')
			expect(result.score).toBe(100)
			expect(result.message).toBe('Senha muito forte')
			expect(result.isValid).toBe(true)
		})
	})

	describe('password messages', () => {
		it('returns correct message for very weak password', () => {
			const result = checkPasswordStrength('abc')
			expect(result.message).toBe('A senha deve ter pelo menos 8 caracteres')
		})

		it('returns correct message for weak password', () => {
			const result = checkPasswordStrength('12345678')
			expect(result.message).toBe('Senha fraca')
		})

		it('returns correct message for medium password', () => {
			const result = checkPasswordStrength('12345678!')
			expect(result.message).toBe('Senha média')
		})

		it('returns correct message for strong password', () => {
			const result = checkPasswordStrength('12345678!A')
			expect(result.message).toBe('Senha forte')
		})

		it('returns correct message for very strong password', () => {
			const result = checkPasswordStrength('12345678!Aa')
			expect(result.message).toBe('Senha muito forte')
		})
	})

	describe('password validation', () => {
		it('returns false for invalid passwords', () => {
			expect(checkPasswordStrength('').isValid).toBe(false)
			expect(checkPasswordStrength('12345678').isValid).toBe(false)
			expect(checkPasswordStrength('12345678!').isValid).toBe(false)
			expect(checkPasswordStrength('12345678!A').isValid).toBe(false)
		})

		it('returns true for valid passwords', () => {
			expect(checkPasswordStrength('12345678!Aa').isValid).toBe(true)
			expect(checkPasswordStrength('MyP@ssw0rd').isValid).toBe(true)
			expect(checkPasswordStrength('Str0ng!Pass').isValid).toBe(true)
		})
	})

	describe('edge cases', () => {
		it('handles passwords with special characters', () => {
			const result = checkPasswordStrength('Test@123')
			expect(result.isValid).toBe(true)
			expect(result.score).toBe(100)
		})

		it('handles passwords with mixed case and numbers', () => {
			const result = checkPasswordStrength('Password123')
			expect(result.isValid).toBe(false)
			expect(result.score).toBe(75)
		})

		it('handles very long passwords', () => {
			const result = checkPasswordStrength('VeryLongPassword123!@#')
			expect(result.isValid).toBe(true)
			expect(result.score).toBe(100)
		})
	})
})

describe('getPasswordRequirements', () => {
	it('returns correct requirements for empty password', () => {
		const requirements = getPasswordRequirements('')
		expect(requirements).toEqual({
			hasNumber: false,
			hasSymbol: false,
			hasUpperCase: false,
			hasLowerCase: false,
			hasMinLength: false,
		})
	})

	it('returns correct requirements for password with only numbers', () => {
		const requirements = getPasswordRequirements('12345678')
		expect(requirements).toEqual({
			hasNumber: true,
			hasSymbol: false,
			hasUpperCase: false,
			hasLowerCase: false,
			hasMinLength: true,
		})
	})

	it('returns correct requirements for password with numbers and symbols', () => {
		const requirements = getPasswordRequirements('12345678!')
		expect(requirements).toEqual({
			hasNumber: true,
			hasSymbol: true,
			hasUpperCase: false,
			hasLowerCase: false,
			hasMinLength: true,
		})
	})

	it('returns correct requirements for password with numbers, symbols, and uppercase', () => {
		const requirements = getPasswordRequirements('12345678!A')
		expect(requirements).toEqual({
			hasNumber: true,
			hasSymbol: true,
			hasUpperCase: true,
			hasLowerCase: false,
			hasMinLength: true,
		})
	})

	it('returns correct requirements for valid password', () => {
		const requirements = getPasswordRequirements('12345678!Aa')
		expect(requirements).toEqual({
			hasNumber: true,
			hasSymbol: true,
			hasUpperCase: true,
			hasLowerCase: true,
			hasMinLength: true,
		})
	})

	it('handles various symbol characters', () => {
		const requirements = getPasswordRequirements('Test@123')
		expect(requirements.hasSymbol).toBe(true)
	})

	it('handles different number formats', () => {
		const requirements = getPasswordRequirements('Password123')
		expect(requirements.hasNumber).toBe(true)
	})
})

describe('isStrongPassword', () => {
	it('returns false for weak passwords', () => {
		expect(isStrongPassword('')).toBe(false)
		expect(isStrongPassword('12345678')).toBe(false)
		expect(isStrongPassword('12345678!')).toBe(false)
		expect(isStrongPassword('12345678!A')).toBe(false)
		expect(isStrongPassword('password')).toBe(false)
		expect(isStrongPassword('PASSWORD')).toBe(false)
		expect(isStrongPassword('Password')).toBe(false)
		expect(isStrongPassword('Password123')).toBe(false)
	})

	it('returns true for strong passwords', () => {
		expect(isStrongPassword('12345678!Aa')).toBe(true)
		expect(isStrongPassword('MyP@ssw0rd')).toBe(true)
		expect(isStrongPassword('Str0ng!Pass')).toBe(true)
		expect(isStrongPassword('Test@123')).toBe(true)
		expect(isStrongPassword('VeryLongPassword123!@#')).toBe(true)
	})

	it('handles edge cases', () => {
		expect(isStrongPassword('aB1!cD2@eF3#')).toBe(true)
		expect(isStrongPassword('1234567890!@#$%^&*()Aa')).toBe(true)
	})
})
