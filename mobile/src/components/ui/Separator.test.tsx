import { render, fireEvent } from '@/src/test-utils'
import { Separator } from './Separator'

describe('Separator', () => {
	it('should render correctly', () => {
		const { getByText } = render(<Separator text="test" />)
		expect(getByText('test')).toBeTruthy()
	})

	it('should call onPress when pressed', () => {
		const onPress = jest.fn()
		const { getByText } = render(<Separator text="test" onPress={onPress} />)
		fireEvent.press(getByText('test'))
		expect(onPress).toHaveBeenCalled()
	})
})
