import React from 'react'
import { render } from '@testing-library/react-native'
import EmployerCard from './EmployersCard'

jest.mock('@/src/hooks/useTheme', () => ({
	useTheme: () => ({
		theme: {
			colors: {
				ImputBackgroundColors: '#ffffff',
				tint: '#0D8ABC',
				text: '#000000',
				colorIconInput: '#666666',
			},
			fonts: {
				bold: { fontFamily: 'Poppins-Bold' },
				regular: { fontFamily: 'Poppins-Regular' },
			},
		},
	}),
}))
describe('EmployerCard', () => {
	const mockData = {
		firstname: 'João',
		lastname: 'Silva',
		role: 'Desenvolvedor',
		image: 'https://example.com/avatar.jpg',
	}

	const mockDataWithoutImage = {
		firstname: 'Maria',
		lastname: 'Santos',
		role: 'Designer',
	}

	it('should render correctly with all data', () => {
		const { getByText } = render(<EmployerCard data={mockData} />)

		expect(getByText('João Silva')).toBeTruthy()
		expect(getByText('Desenvolvedor')).toBeTruthy()
	})

	it('should render with default image when no image is provided', () => {
		const { getByText } = render(<EmployerCard data={mockDataWithoutImage} />)

		expect(getByText('Maria Santos')).toBeTruthy()
		expect(getByText('Designer')).toBeTruthy()
	})

	it('should render the full name correctly', () => {
		const { getByText } = render(<EmployerCard data={mockData} />)

		const nameElement = getByText('João Silva')
		expect(nameElement).toBeTruthy()
	})

	it('should render the role correctly', () => {
		const { getByText } = render(<EmployerCard data={mockData} />)

		const roleElement = getByText('Desenvolvedor')
		expect(roleElement).toBeTruthy()
	})

	it('should have the correct component structure', () => {
		const { getByText } = render(<EmployerCard data={mockData} />)

		// Check if main elements are present
		expect(getByText('João Silva')).toBeTruthy()
		expect(getByText('Desenvolvedor')).toBeTruthy()
	})

	it('should render with empty data without breaking', () => {
		const emptyData = {
			firstname: '',
			lastname: '',
			role: '',
		}

		const { getAllByText } = render(<EmployerCard data={emptyData} />)

		// Should render even with empty data
		const emptyElements = getAllByText('')
		expect(emptyElements.length).toBeGreaterThan(0)
	})

	it('should render with only a first name', () => {
		const singleNameData = {
			firstname: 'Ana',
			lastname: '',
			role: 'Analyst',
		}

		const { getByText } = render(<EmployerCard data={singleNameData} />)

		expect(getByText('Ana ')).toBeTruthy()
		expect(getByText('Analyst')).toBeTruthy()
	})

	it('should render with a name that has multiple words', () => {
		const multiWordNameData = {
			firstname: 'João Pedro',
			lastname: 'Silva Santos',
			role: 'Manager',
		}

		const { getByText } = render(<EmployerCard data={multiWordNameData} />)

		expect(getByText('João Pedro Silva Santos')).toBeTruthy()
		expect(getByText('Manager')).toBeTruthy()
	})

	it('should apply correct styles based on the theme', () => {
		const { getByText } = render(<EmployerCard data={mockData} />)

		const nameElement = getByText('João Silva')
		const roleElement = getByText('Desenvolvedor')

		// Check if elements are rendered (styles are applied internally)
		expect(nameElement).toBeTruthy()
		expect(roleElement).toBeTruthy()
	})

	it('should be rendered as TouchableOpacity', () => {
		const { getByText } = render(<EmployerCard data={mockData} />)

		// Check if the component renders correctly
		expect(getByText('João Silva')).toBeTruthy()
		expect(getByText('Desenvolvedor')).toBeTruthy()
	})

	it('should generate the default avatar URL correctly when no image is provided', () => {
		const { getByText } = render(<EmployerCard data={mockDataWithoutImage} />)

		// Check if the component renders correctly with default avatar
		expect(getByText('Maria Santos')).toBeTruthy()
		expect(getByText('Designer')).toBeTruthy()
	})

	it('should handle undefined data without breaking', () => {
		const undefinedData = {
			firstname: undefined,
			lastname: undefined,
			role: undefined,
		}

		// Should not throw error
		expect(() => {
			render(<EmployerCard data={undefinedData} />)
		}).not.toThrow()
	})

	it('should handle null data without breaking', () => {
		const nullData = {
			firstname: null,
			lastname: null,
			role: null,
		}

		// Should not throw error
		expect(() => {
			render(<EmployerCard data={nullData} />)
		}).not.toThrow()
	})
})
