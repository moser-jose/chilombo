import { render, fireEvent } from '@/src/test-utils'
import { Separator } from './Separator'

describe('Separator', () => {
	it('should render correctly', () => {
		const { getByText } = render(<Separator text="test" />)
		expect(getByText('test')).toBeTruthy()
	})

	it('should call onPress when pressed', () => {
		const onPress = jest.fn()
		const { getByText } = render(
			<Separator text="test" onPress={onPress} more={true} />,
		)
		const verMaisButton = getByText('Ver mais')
		fireEvent.press(verMaisButton)
		expect(onPress).toHaveBeenCalled()
	})

	it('should not render TouchableOpacity when more is false', () => {
		const onPress = jest.fn()
		const { queryByText } = render(
			<Separator text="test" onPress={onPress} more={false} />,
		)
		expect(queryByText('Ver mais')).toBeNull()
	})
})
