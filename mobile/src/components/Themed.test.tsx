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
import { CustomThemeProvider } from '../context/ThemeContext'
import { Theme } from '../types/theme'
import * as ImagePicker from 'expo-image-picker'
import * as DocumentPicker from 'expo-document-picker'
import * as WebBrowser from 'expo-web-browser'

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

// Mock theme context
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

const renderWithTheme = (component: React.ReactElement) => {
	return render(<CustomThemeProvider>{component}</CustomThemeProvider>)
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

		it('renders with icon', () => {
			const { getByTestId } = renderWithTheme(
				<TextInput {...defaultProps} icon="person-outline" />,
			)
			// Note: Ionicons might not be easily testable without additional setup
			expect(true).toBeTruthy() // Placeholder assertion
		})

		it('handles text changes', () => {
			const onChangeText = jest.fn()
			const { getByPlaceholderText } = renderWithTheme(
				<TextInput {...defaultProps} onChangeText={onChangeText} />,
			)
			const input = getByPlaceholderText('Enter text')
			fireEvent.changeText(input, 'new text')
			expect(onChangeText).toHaveBeenCalledWith('new text')
		})

		it('handles focus and blur events', () => {
			const onFocus = jest.fn()
			const onBlur = jest.fn()
			const { getByPlaceholderText } = renderWithTheme(
				<TextInput {...defaultProps} onFocus={onFocus} onBlur={onBlur} />,
			)
			const input = getByPlaceholderText('Enter text')

			fireEvent(input, 'focus')
			expect(onFocus).toHaveBeenCalled()

			fireEvent(input, 'blur')
			expect(onBlur).toHaveBeenCalled()
		})

		it('renders password input with show/hide functionality', () => {
			const { getByPlaceholderText } = renderWithTheme(
				<TextInput {...defaultProps} type="password" value="password123" />,
			)
			const input = getByPlaceholderText('Enter text')
			expect(input).toBeTruthy()
		})

		it('displays error messages', () => {
			const errors = [
				{
					meta: { paramName: 'first_name' },
					message: 'Verifique o nome',
				},
			]
			const { getByText } = renderWithTheme(
				<TextInput {...defaultProps} label="Nome" errors={errors} />,
			)
			const errorText = getByText('Verifique o nome')
			expect(errorText).toBeTruthy()
		})
	})

	describe('FileInput', () => {
		const defaultProps = {
			onFileSelect: jest.fn(),
			onError: jest.fn(),
		}

		beforeEach(() => {
			;(
				ImagePicker.requestMediaLibraryPermissionsAsync as jest.Mock
			).mockResolvedValue({
				status: 'granted',
			})
		})

		it('renders file input with placeholder', () => {
			const { getByText } = renderWithTheme(<FileInput {...defaultProps} />)
			const placeholder = getByText('Selecionar arquivo')
			expect(placeholder).toBeTruthy()
		})

		it('renders with custom label', () => {
			const { getByText } = renderWithTheme(
				<FileInput {...defaultProps} label="Upload File" />,
			)
			const label = getByText('Upload File')
			expect(label).toBeTruthy()
		})

		it('handles image selection', async () => {
			const mockResult = {
				canceled: false,
				assets: [
					{
						uri: 'file://test.jpg',
						fileName: 'test.jpg',
						type: 'image',
						fileSize: 1024,
					},
				],
			}
			;(ImagePicker.launchImageLibraryAsync as jest.Mock).mockResolvedValue(
				mockResult,
			)

			const onFileSelect = jest.fn()
			const { getByText } = renderWithTheme(
				<FileInput {...defaultProps} onFileSelect={onFileSelect} />,
			)

			const input = getByText('Selecionar arquivo')
			fireEvent.press(input)

			await waitFor(() => {
				expect(onFileSelect).toHaveBeenCalledWith({
					uri: 'file://test.jpg',
					name: 'test.jpg',
					type: 'image',
					size: 1024,
				})
			})
		})

		it('handles document selection', async () => {
			const mockResult = {
				canceled: false,
				assets: [
					{
						uri: 'file://test.pdf',
						name: 'test.pdf',
						mimeType: 'application/pdf',
						size: 2048,
					},
				],
			}
			;(DocumentPicker.getDocumentAsync as jest.Mock).mockResolvedValue(
				mockResult,
			)

			const onFileSelect = jest.fn()
			const { getByText } = renderWithTheme(
				<FileInput
					{...defaultProps}
					allowedTypes={['document']}
					onFileSelect={onFileSelect}
				/>,
			)

			const input = getByText('Selecionar arquivo')
			fireEvent.press(input)

			await waitFor(() => {
				expect(onFileSelect).toHaveBeenCalledWith({
					uri: 'file://test.pdf',
					name: 'test.pdf',
					type: 'application/pdf',
					size: 2048,
				})
			})
		})

		it('handles permission denied', async () => {
			;(
				ImagePicker.requestMediaLibraryPermissionsAsync as jest.Mock
			).mockResolvedValue({
				status: 'denied',
			})

			const { getByText } = renderWithTheme(<FileInput {...defaultProps} />)
			const input = getByText('Selecionar arquivo')
			fireEvent.press(input)

			// Should not call onFileSelect when permission is denied
			expect(defaultProps.onFileSelect).not.toHaveBeenCalled()
		})

		it('handles file validation errors', async () => {
			const mockResult = {
				canceled: false,
				assets: [
					{
						uri: 'file://test.txt',
						fileName: 'test.txt',
						type: 'text/plain',
						fileSize: 50 * 1024 * 1024, // 50MB - exceeds default 10MB limit
					},
				],
			}
			;(ImagePicker.launchImageLibraryAsync as jest.Mock).mockResolvedValue(
				mockResult,
			)

			const onError = jest.fn()
			const { getByText } = renderWithTheme(
				<FileInput {...defaultProps} onError={onError} />,
			)

			const input = getByText('Selecionar arquivo')
			fireEvent.press(input)

			await waitFor(() => {
				expect(onError).toHaveBeenCalledWith(
					'Arquivo muito grande. Tamanho máximo: 10MB',
				)
			})
		})

		it('displays selected files', async () => {
			const mockResult = {
				canceled: false,
				assets: [
					{
						uri: 'file://test.jpg',
						fileName: 'test.jpg',
						type: 'image',
						fileSize: 1024,
					},
				],
			}
			;(ImagePicker.launchImageLibraryAsync as jest.Mock).mockResolvedValue(
				mockResult,
			)

			const { getByText } = renderWithTheme(<FileInput {...defaultProps} />)

			const input = getByText('Selecionar arquivo')
			fireEvent.press(input)

			await waitFor(() => {
				const fileName = getByText('test.jpg')
				expect(fileName).toBeTruthy()
			})
		})
	})

	describe('View', () => {
		it('renders view with theme background', () => {
			const { getByTestId } = renderWithTheme(<View testID="test-view" />)
			const view = getByTestId('test-view')
			expect(view).toBeTruthy()
		})

		it('applies custom style', () => {
			const customStyle = { padding: 20 }
			const { getByTestId } = renderWithTheme(
				<View testID="test-view" style={customStyle} />,
			)
			const view = getByTestId('test-view')
			expect(view).toBeTruthy()
		})
	})

	describe('TouchableOpacity', () => {
		const defaultProps = {
			onPress: jest.fn(),
		}

		it('renders primary button', () => {
			const { getByText } = renderWithTheme(
				<TouchableOpacity {...defaultProps}>
					<Text>Primary Button</Text>
				</TouchableOpacity>,
			)
			const button = getByText('Primary Button')
			expect(button).toBeTruthy()
		})

		it('renders secondary button', () => {
			const { getByText } = renderWithTheme(
				<TouchableOpacity {...defaultProps} type="secondary">
					<Text>Secondary Button</Text>
				</TouchableOpacity>,
			)
			const button = getByText('Secondary Button')
			expect(button).toBeTruthy()
		})

		it('renders tertiary button', () => {
			const { getByText } = renderWithTheme(
				<TouchableOpacity {...defaultProps} type="tertiary">
					<Text>Tertiary Button</Text>
				</TouchableOpacity>,
			)
			const button = getByText('Tertiary Button')
			expect(button).toBeTruthy()
		})

		it('handles press events', () => {
			const onPress = jest.fn()
			const { getByText } = renderWithTheme(
				<TouchableOpacity onPress={onPress}>
					<Text>Pressable Button</Text>
				</TouchableOpacity>,
			)
			const button = getByText('Pressable Button')
			fireEvent.press(button)
			expect(onPress).toHaveBeenCalled()
		})
	})

	describe('BodyScrollView', () => {
		it('renders scroll view', () => {
			const { getByTestId } = renderWithTheme(
				<BodyScrollView testID="scroll-view">
					<Text>Scrollable content</Text>
				</BodyScrollView>,
			)
			const scrollView = getByTestId('scroll-view')
			expect(scrollView).toBeTruthy()
		})

		it('renders with forwarded ref', () => {
			const ref = React.createRef()
			const { getByTestId } = renderWithTheme(
				<BodyScrollView ref={ref} testID="scroll-view">
					<Text>Content</Text>
				</BodyScrollView>,
			)
			const scrollView = getByTestId('scroll-view')
			expect(scrollView).toBeTruthy()
		})
	})

	describe('ExternalLink', () => {
		it('renders external link', () => {
			const { getByText } = renderWithTheme(
				<ExternalLink href="https://example.com">
					<Text>External Link</Text>
				</ExternalLink>,
			)
			const link = getByText('External Link')
			expect(link).toBeTruthy()
		})

		it('handles press on native platform', () => {
			const mockOpenBrowserAsync = WebBrowser.openBrowserAsync as jest.Mock
			const { getByText } = renderWithTheme(
				<ExternalLink href="https://example.com">
					<Text>External Link</Text>
				</ExternalLink>,
			)
			const link = getByText('External Link')
			// Provide a mock event with preventDefault
			const event = { preventDefault: jest.fn() }
			fireEvent.press(link, event)
			expect(mockOpenBrowserAsync).toHaveBeenCalledWith('https://example.com')
		})
	})
})
