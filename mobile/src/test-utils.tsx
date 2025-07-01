import React from 'react'
import { render } from '@testing-library/react-native'

export function renderWithProviders(ui: React.ReactElement) {
	return render(ui)
}

// re-export everything
export * from '@testing-library/react-native'

// override render method
export { renderWithProviders as render }
