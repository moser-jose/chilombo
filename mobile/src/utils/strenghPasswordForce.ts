interface PasswordStrength {
	score: number
	message: string
	isValid: boolean
}

export const checkPasswordStrength = (password: string): PasswordStrength => {
	const hasNumber = /[0-9]/.test(password)
	const hasSymbol = /[!@#$%^&*(),.?":{}|<>]/.test(password)
	const hasUpperCase = /[A-Z]/.test(password)
	const hasLowerCase = /[a-z]/.test(password)
	const hasMinLength = password.length >= 8

	let score = 0
	if (hasNumber) score += 25
	if (hasSymbol) score += 25
	if (hasUpperCase) score += 25
	if (hasLowerCase) score += 25

	const isValid =
		hasNumber && hasSymbol && hasUpperCase && hasLowerCase && hasMinLength

	let message = ''
	if (score === 0) {
		message = 'Senha muito fraca'
	} else if (score <= 25) {
		message = 'Senha fraca'
	} else if (score <= 50) {
		message = 'Senha média'
	} else if (score <= 75) {
		message = 'Senha forte'
	} else {
		message = 'Senha muito forte'
	}

	if (!hasMinLength) {
		message = 'A senha deve ter pelo menos 8 caracteres'
	}

	return {
		score,
		message,
		isValid,
	}
}

// Função auxiliar para verificar requisitos específicos
export const getPasswordRequirements = (password: string) => {
	return {
		hasNumber: /[0-9]/.test(password),
		hasSymbol: /[!@#$%^&*(),.?":{}|<>]/.test(password),
		hasUpperCase: /[A-Z]/.test(password),
		hasLowerCase: /[a-z]/.test(password),
		hasMinLength: password.length >= 8,
	}
}

export const isStrongPassword = (password: string): boolean => {
	const requirements = getPasswordRequirements(password)

	const allRequirementsMet = Object.values(requirements).every(
		req => req === true,
	)

	return allRequirementsMet
}
