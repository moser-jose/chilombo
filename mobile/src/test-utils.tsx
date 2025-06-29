import React, { ReactElement } from 'react'
import { render, RenderOptions } from '@testing-library/react-native'
import { CustomThemeProvider } from './context/ThemeContext'

interface AllTheProvidersProps {
	children: React.ReactNode
}

const AllTheProviders = ({ children }: AllTheProvidersProps) => {
	return <CustomThemeProvider>{children}</CustomThemeProvider>
}

const customRender = (
	ui: ReactElement,
	options?: Omit<RenderOptions, 'wrapper'>,
) => render(ui, { wrapper: AllTheProviders, ...options })

// re-export everything
export * from '@testing-library/react-native'

// override render method
export { customRender as render }
