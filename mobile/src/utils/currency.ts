/**
 * Formata um valor numérico como moeda Angolana (Kwanza - AOA).
 * @param value - O valor numérico a ser formatado.
 * @param fractionDigits - Número de casas decimais (padrão: 2).
 * @returns A string formatada, ex: "1.234.567,89 Kz"
 */
export function formatKwanza(
	value: number,
	fractionDigits: number = 2,
): string {
	const formatter = new Intl.NumberFormat('pt-AO', {
		minimumFractionDigits: fractionDigits,
		maximumFractionDigits: fractionDigits,
	})

	let formattedNumber = formatter.format(value).replace(/\u00A0/g, ' ')

	if (value >= 1000) {
		formattedNumber = formattedNumber.replace(/\s/g, '.')
	}

	return `${formattedNumber}`
}
