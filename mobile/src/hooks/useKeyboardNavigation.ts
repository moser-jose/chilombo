import { useRef, useCallback } from 'react'
import { TextInput } from 'react-native'

export const useKeyboardNavigation = () => {
	const inputRefs = useRef<{ [key: string]: TextInput | null }>({})

	const registerInput = useCallback((key: string, ref: TextInput | null) => {
		inputRefs.current[key] = ref
	}, [])

	const focusNextInput = useCallback((currentKey: string) => {
		const keys = Object.keys(inputRefs.current)
		const currentIndex = keys.indexOf(currentKey)

		if (currentIndex >= 0 && currentIndex < keys.length - 1) {
			const nextKey = keys[currentIndex + 1]
			const nextInput = inputRefs.current[nextKey]
			nextInput?.focus()
		}
	}, [])

	const focusInput = useCallback((key: string) => {
		const input = inputRefs.current[key]
		input?.focus()
	}, [])

	const blurAllInputs = useCallback(() => {
		Object.values(inputRefs.current).forEach(input => {
			input?.blur()
		})
	}, [])

	return {
		registerInput,
		focusNextInput,
		focusInput,
		blurAllInputs,
	}
}
