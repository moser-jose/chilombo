export const maskEmail = (email: string): string => {
	if (!email) return ''

	const [username, domain] = email.split('@')
	if (!username || !domain) return email

	const maskedUsername =
		username.length <= 3
			? username.charAt(0) + '*'.repeat(username.length - 1)
			: username.substring(0, 2) +
				'*'.repeat(username.length - 3) +
				username.charAt(username.length - 1)

	return `${maskedUsername}@${domain}`
}
