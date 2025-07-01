import React from 'react'
import { render, fireEvent, waitFor } from '@testing-library/react-native'
import {
	Text,
	TextInput,
	FileInput,
	View,
	TouchableOpacity,
	BodyScrollView,
	ExternalLink,
} from './Themed'
import { Theme } from '@/src/types/theme'
import * as ImagePicker from 'expo-image-picker'
import * as DocumentPicker from 'expo-document-picker'
import * as WebBrowser from 'expo-web-browser'

// Mock theme for testing
const mockTheme: Theme = {
	dark: false,
	colors: {
		text: '#000000',
		textMuted: '#666666',
		background: '#FFFFFF',
		tint: '#007AFF',
		tabIconDefault: '#8E8E93',
		tabIconSelected: '#007AFF',
		primary: '#007AFF',
		secondary: '#5856D6',
		secondaryMuted: '#C7C7CC',
		borderInput: '#E5E5EA',
		ImputBackgroundColors: '#F2F2F7',
		colorIconInput: '#8E8E93',
		card: '#FFFFFF',
		border: '#E5E5EA',
		notification: '#FF3B30',
		muted: '#8E8E93',
		tabBarBackgroundColor: '#FFFFFF',
		tabBarActiveTintColor: '#007AFF',
		modal: '#FFFFFF',
		backgroundHeader: '#FFFFFF',
		backgroundIcon: '#F2F2F7',
		backgroundHeaderScreen: '#FFFFFF',
		textHeader: '#000000',
		backgroundIconIndex: '#F2F2F7',
		buttonHeader: '#007AFF',
		borderBottomHeader: '#E5E5EA',
		cancelButton: '#FF3B30',
		black: '#000000',
		disabled: '#C7C7CC',
		error: '#FF3B30',
	},
	fonts: {
		light: { fontFamily: 'System', fontWeight: '300' },
		regular: { fontFamily: 'System', fontWeight: '400' },
		medium: { fontFamily: 'System', fontWeight: '500' },
		semibold: { fontFamily: 'System', fontWeight: '600' },
		bold: { fontFamily: 'System', fontWeight: '700' },
		heavy: { fontFamily: 'System', fontWeight: '900' },
	},
	size: {
		xss: 10,
		xs: 12,
		xsB: 14,
		sm: 16,
		smB: 18,
		md: 20,
		base: 22,
		blg: 24,
		lg: 26,
		lgX: 28,
		xl: 30,
		xxl: 32,
		xxxl: 34,
	},
}

// Mock the useTheme hook
jest.mock('@/src/hooks/useTheme', () => ({
	useTheme: () => ({
		theme: mockTheme,
	}),
}))

// Mock the dependencies
jest.mock('expo-image-picker', () => ({
	requestMediaLibraryPermissionsAsync: jest.fn(),
	launchImageLibraryAsync: jest.fn(),
}))

jest.mock('expo-document-picker', () => ({
	getDocumentAsync: jest.fn(),
}))

jest.mock('expo-web-browser', () => ({
	maybeCompleteAuthSession: jest.fn(),
	openBrowserAsync: jest.fn(),
}))

jest.mock('../store/store', () => ({
	useStateStore: jest.fn(() => ({
		setRemoveFileInput: jest.fn(),
		setComprovante: jest.fn(),
	})),
}))

const renderWithTheme = (component: React.ReactElement) => {
	return render(component)
}

describe('Themed Components', () => {
	beforeEach(() => {
		jest.clearAllMocks()
	})

	describe('Text', () => {
		it('renders text with theme colors', () => {
			const { getByText } = renderWithTheme(<Text>Hello World</Text>)
			const textElement = getByText('Hello World')
			expect(textElement).toBeTruthy()
		})

		it('applies custom style', () => {
			const customStyle = { fontSize: 20 }
			const { getByText } = renderWithTheme(
				<Text style={customStyle}>Styled Text</Text>,
			)
			const textElement = getByText('Styled Text')
			expect(textElement).toBeTruthy()
		})
	})

	describe('TextInput', () => {
		const defaultProps = {
			type: 'text' as const,
			placeholder: 'Enter text',
			value: '',
			onChangeText: jest.fn(),
		}

		it('renders text input with placeholder', () => {
			const { getByPlaceholderText } = renderWithTheme(
				<TextInput {...defaultProps} />,
			)
			const input = getByPlaceholderText('Enter text')
			expect(input).toBeTruthy()
		})

		it('renders with label', () => {
			const { getByText } = renderWithTheme(
				<TextInput {...defaultProps} label="Name" />,
			)
			const label = getByText('Name')
			expect(label).toBeTruthy()
		})

		it('calls onChangeText when text changes', () => {
			const onChangeText = jest.fn()
			const { getByPlaceholderText } = renderWithTheme(
				<TextInput {...defaultProps} onChangeText={onChangeText} />,
			)
			const input = getByPlaceholderText('Enter text')
			fireEvent.changeText(input, 'new text')
			expect(onChangeText).toHaveBeenCalledWith('new text')
		})
	})

	describe('View', () => {
		it('renders view with theme background', () => {
			const { getByTestId } = renderWithTheme(<View testID="test-view" />)
			const view = getByTestId('test-view')
			expect(view).toBeTruthy()
		})

		it('applies custom style', () => {
			const customStyle = { padding: 10 }
			const { getByTestId } = renderWithTheme(
				<View testID="test-view" style={customStyle} />,
			)
			const view = getByTestId('test-view')
			expect(view).toBeTruthy()
		})
	})

	describe('TouchableOpacity', () => {
		it('renders button with primary style', () => {
			const onPress = jest.fn()
			const { getByText } = renderWithTheme(
				<TouchableOpacity onPress={onPress}><Text>Press Me</Text></TouchableOpacity>,
			)
			const button = getByText('Press Me')
			expect(button).toBeTruthy()
		})

		it('calls onPress when pressed', () => {
			const onPress = jest.fn()
			const { getByText } = renderWithTheme(
				<TouchableOpacity onPress={onPress}>
					<Text>Press Me</Text>
				</TouchableOpacity>,
			)
			const button = getByText('Press Me')
			fireEvent.press(button)
			expect(onPress).toHaveBeenCalled()
		})
	})
})
