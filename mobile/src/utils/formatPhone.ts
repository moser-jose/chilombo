export const formatPhoneNumber = (
	phone: string,
	countryCode: string = '+244',
): string => {
	const cleaned = phone.replace(/\D/g, '')

	if (cleaned.startsWith(countryCode)) {
		return cleaned
	}

	return `${countryCode}${cleaned}`
}
