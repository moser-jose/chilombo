import { maskEmail } from './maskEmail'

describe('maskEmail', () => {
	describe('basic email masking', () => {
		it('masks short usernames correctly', () => {
			expect(maskEmail('ab@example.com')).toBe('a*@example.com')
			expect(maskEmail('abc@example.com')).toBe('a**@example.com')
		})

		it('masks medium usernames correctly', () => {
			expect(maskEmail('test@example.com')).toBe('te*t@example.com')
			expect(maskEmail('user@example.com')).toBe('us*r@example.com')
			expect(maskEmail('admin@example.com')).toBe('ad**n@example.com')
		})

		it('masks long usernames correctly', () => {
			expect(maskEmail('username@example.com')).toBe('us*****e@example.com')
			expect(maskEmail('johnsmith@example.com')).toBe('jo******h@example.com')
			expect(maskEmail('verylongusername@example.com')).toBe(
				've*************e@example.com',
			)
		})
	})

	describe('edge cases', () => {
		it('handles empty string', () => {
			expect(maskEmail('')).toBe('')
		})

		it('handles single character username', () => {
			expect(maskEmail('a@example.com')).toBe('a@example.com')
		})

		it('handles two character username', () => {
			expect(maskEmail('ab@example.com')).toBe('a*@example.com')
		})

		it('handles three character username', () => {
			expect(maskEmail('abc@example.com')).toBe('a**@example.com')
		})

		it('handles four character username', () => {
			expect(maskEmail('abcd@example.com')).toBe('ab*d@example.com')
		})

		it('handles five character username', () => {
			expect(maskEmail('abcde@example.com')).toBe('ab**e@example.com')
		})
	})

	describe('invalid email formats', () => {
		it('returns original string for emails without @', () => {
			expect(maskEmail('invalidemail')).toBe('invalidemail')
		})

		it('returns original string for emails without username', () => {
			expect(maskEmail('@example.com')).toBe('@example.com')
		})

		it('returns original string for emails without domain', () => {
			expect(maskEmail('user@')).toBe('user@')
		})

		it('returns original string for emails with only @', () => {
			expect(maskEmail('@')).toBe('@')
		})
	})

	describe('various domain formats', () => {
		it('preserves simple domains', () => {
			expect(maskEmail('test@example.com')).toBe('te*t@example.com')
			expect(maskEmail('user@domain.org')).toBe('us*r@domain.org')
		})

		it('preserves subdomains', () => {
			expect(maskEmail('test@sub.example.com')).toBe('te*t@sub.example.com')
			expect(maskEmail('user@mail.domain.org')).toBe('us*r@mail.domain.org')
		})

		it('preserves complex domains', () => {
			expect(maskEmail('test@example.co.uk')).toBe('te*t@example.co.uk')
			expect(maskEmail('user@my-domain.com')).toBe('us*r@my-domain.com')
		})
	})

	describe('special characters in username', () => {
		it('handles usernames with dots', () => {
			expect(maskEmail('john.doe@example.com')).toBe('jo*****e@example.com')
			expect(maskEmail('user.name@example.com')).toBe('us******e@example.com')
		})

		it('handles usernames with hyphens', () => {
			expect(maskEmail('user-name@example.com')).toBe('us******e@example.com')
			expect(maskEmail('test-user@example.com')).toBe('te******r@example.com')
		})

		it('handles usernames with underscores', () => {
			expect(maskEmail('user_name@example.com')).toBe('us******e@example.com')
			expect(maskEmail('test_user@example.com')).toBe('te******r@example.com')
		})

		it('handles usernames with numbers', () => {
			expect(maskEmail('user123@example.com')).toBe('us****3@example.com')
			expect(maskEmail('123user@example.com')).toBe('12****r@example.com')
		})

		it('handles usernames with plus signs', () => {
			expect(maskEmail('user+tag@example.com')).toBe('us*****g@example.com')
			expect(maskEmail('test+filter@example.com')).toBe(
				'te********r@example.com',
			)
		})
	})

	describe('masking pattern verification', () => {
		it('always shows first and last character of username', () => {
			const result = maskEmail('abcdefgh@example.com')
			expect(result.startsWith('ab')).toBe(true)
			expect(result.includes('h@')).toBe(true)
		})

		it('masks middle characters with asterisks', () => {
			const result = maskEmail('abcdefgh@example.com')
			expect(result).toBe('ab*****h@example.com')
		})

		it('preserves domain completely', () => {
			const result = maskEmail('test@example.com')
			expect(result.endsWith('@example.com')).toBe(true)
		})
	})

	describe('performance edge cases', () => {
		it('handles very long usernames', () => {
			const longUsername = 'a'.repeat(100)
			const result = maskEmail(`${longUsername}@example.com`)
			expect(result.startsWith('aa')).toBe(true)
			expect(result.includes('a@example.com')).toBe(true)
			expect(result.length).toBe(100 + '@example.com'.length)
		})

		it('handles very short domains', () => {
			expect(maskEmail('test@a.com')).toBe('te*t@a.com')
			expect(maskEmail('user@b.org')).toBe('us*r@b.org')
		})
	})
})
