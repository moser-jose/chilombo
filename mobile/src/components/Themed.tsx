import { forwardRef } from 'react'
import {
	Text as DefaultText,
	View as DefaultView,
	TouchableOpacity as DefaultTouchableOpacity,
	StyleSheet,
	Platform,
	Alert,
	TouchableOpacityProps,
	ViewProps,
	TextProps,
	Pressable,
	StyleProp,
	TextInput as DefaultTextInput,
	TextInputProps,
	ViewStyle,
	ScrollView,
	ScrollViewProps,
} from 'react-native'
import * as WebBrowser from 'expo-web-browser'
import { Ionicons } from '@expo/vector-icons'
import { FontSize } from '../constants/FontSize'
import { Theme } from '@/src/types/theme'
import { useCustomTheme } from '@/src/context/ThemeContext'
import { useState, useEffect } from 'react'
import { Colors } from 'react-native/Libraries/NewAppScreen'
import { useStateStore } from '@/src/store/store'
import { useShallow } from 'zustand/react/shallow'
import * as ImagePicker from 'expo-image-picker'
import * as DocumentPicker from 'expo-document-picker'
import { Link } from 'expo-router'
WebBrowser.maybeCompleteAuthSession()

type TextInputUIProps = TextInputProps & {
	type: 'email' | 'password' | 'phone' | 'text'
	placeholder: string
	isPasswordStrong?: boolean
	icon?: keyof typeof Ionicons.glyphMap
	label?: string
	onChangeText?: (text: string) => void
	onFocus?: () => void
	onBlur?: () => void
	errors?: any
	value: string
	style?: StyleProp<ViewStyle>
}

type FileInputProps = {
	label?: string
	placeholder?: string
	icon?: keyof typeof Ionicons.glyphMap
	onFileSelect?: (file: {
		uri: string
		name: string
		type: string
		size: number
	}) => void
	onError?: (error: string) => void
	allowedTypes?: ('image' | 'video' | 'document')[]
	maxSize?: number // em MB
	multiple?: boolean
	style?: StyleProp<ViewStyle>
	disabled?: boolean
}

type Props = TouchableOpacityProps & {
	type?: 'primary' | 'secondary' | 'tertiary'
}

export function Text(props: TextProps) {
	const { theme } = useCustomTheme()
	const { style, ...otherProps } = props
	const color = theme.colors.text

	return <DefaultText style={[{ color }, style]} {...otherProps} />
}

export function TextInput({
	type,
	placeholder,
	style,
	icon,
	errors,
	label,
	onChangeText,
	value,
	onFocus,
	isPasswordStrong,
	onBlur,
}: TextInputUIProps) {
	const [isInputFocused, setIsInputFocused] = useState(false)
	const [errorMessage, setErrorMessage] = useState<{
		message: string
		type: string
	} | null>(null)

	const { theme } = useCustomTheme()
	const [showPassword, setShowPassword] = useState(false)

	const styles = makeStyles(theme as Theme)

	const handleChangeText = (text: string) => {
		if (text.length > 0) {
			setErrorMessage(null)
		}
		onChangeText?.(text)
	}

	const renderPasswordIcon = () => (
		<View
			style={{
				backgroundColor: 'transparent',
				flexDirection: 'row',
				alignItems: 'center',
				justifyContent: 'center',
				gap: 4,
			}}
		>
			{isPasswordStrong ? (
				<Ionicons name="checkmark-circle" size={16} color={Colors.success} />
			) : null}
			{value.length > 0 ? (
				<Ionicons
					name={showPassword ? 'eye-off-outline' : 'eye-outline'}
					size={22}
					color={theme.colors.colorIconInput}
				/>
			) : null}
		</View>
	)

	const ERROR_MESSAGES = {
		first_name: 'Verifique o nome',
		last_name: 'Verifique o sobrenome',
		phone_number: 'Verifique o telefone',
		email_address: 'Verifique o e-mail',
		password: 'Verifique a senha',
	}

	useEffect(() => {
		setErrorMessage(null)
		if (!errors || errors.length === 0) return

		const identifier = errors.find(
			(error: any) => error.meta.paramName === 'identifier',
		)
		if (identifier) {
			setErrorMessage({
				message: 'E-mail não encontrado',
				type: 'email',
			})
			return
		}

		const firstNameError =
			errors.find((error: any) => error.meta.paramName === 'first_name') || null
		if (firstNameError) {
			setErrorMessage({
				message: ERROR_MESSAGES.first_name,
				type: 'first_name',
			})
			return
		}

		const lastNameError =
			errors.find((error: any) => error.meta.paramName === 'last_name') || null
		if (lastNameError) {
			setErrorMessage({
				message: ERROR_MESSAGES.last_name,
				type: 'last_name',
			})
			return
		}

		const phoneError =
			errors.find((error: any) => error.meta.paramName === 'phone_number') ||
			null
		if (phoneError) {
			setErrorMessage({
				message: ERROR_MESSAGES.phone_number,
				type: 'phone_number',
			})
			return
		}

		const error =
			errors.find((error: any) => {
				const paramName = error.meta.paramName
				return ERROR_MESSAGES[paramName as keyof typeof ERROR_MESSAGES]
			}) || null

		if (error) {
			const paramName = error.meta.paramName
			setErrorMessage({
				message: ERROR_MESSAGES[paramName as keyof typeof ERROR_MESSAGES],
				type: paramName,
			})
		}
	}, [errors])

	const shouldShowError = () => {
		if (!errorMessage) return false

		if (type === 'text') {
			if (label === 'Nome' && errorMessage.type === 'first_name') return true
			if (label === 'Sobrenome' && errorMessage.type === 'last_name')
				return true
		}

		switch (type) {
			case 'phone':
				return errorMessage.type === 'phone_number'
			case 'email':
				if (errorMessage.type === 'email_address') return true
				else if (errorMessage.type === 'email') return true
				return false
			case 'password':
				return errorMessage.type === 'password'
			default:
				return false
		}
	}

	return (
		<View style={style}>
			{label && <Text style={styles.label}>{label}</Text>}
			<View
				style={[
					styles.input,
					isInputFocused && {
						borderColor: theme.colors.secondary,
						borderWidth: 1.8,
					},
				]}
			>
				{icon && (
					<Ionicons
						name={icon as keyof typeof Ionicons.glyphMap}
						style={{ marginRight: 4 }}
						size={20}
						color={styles.colorIconInput.color}
					/>
				)}
				<DefaultTextInput
					placeholder={placeholder}
					placeholderTextColor={theme.colors.colorIconInput}
					style={styles.textInput}
					secureTextEntry={type === 'password' && !showPassword}
					numberOfLines={1}
					onFocus={() => {
						setIsInputFocused(true)
						onFocus?.()
					}}
					onBlur={() => {
						setIsInputFocused(false)
						onBlur?.()
					}}
					onChangeText={handleChangeText}
					value={value}
				/>
				{type === 'password' && (
					<Pressable onPress={() => setShowPassword(!showPassword)}>
						{renderPasswordIcon()}
					</Pressable>
				)}
			</View>
			{shouldShowError() && errorMessage && (
				<Text style={styles.errorText}>{errorMessage.message}</Text>
			)}
		</View>
	)
}

export function FileInput({
	label,
	placeholder = 'Selecionar arquivo',
	icon = 'document-outline',
	onFileSelect,
	onError,
	allowedTypes = ['image'],
	maxSize = 10, // 10MB por padrão
	multiple = false,
	style,
	disabled = false,
}: FileInputProps) {
	const [selectedFiles, setSelectedFiles] = useState<
		Array<{
			uri: string
			name: string
			type: string
			size: number
		}>
	>([])
	const [isLoading, setIsLoading] = useState(false)
	const { setRemoveFileInput, setComprovante } = useStateStore(
		useShallow(state => ({
			setComprovante: state.setComprovante,
			setRemoveFileInput: state.setRemoveFileInput,
		})),
	)
	const { theme } = useCustomTheme()
	const styles = makeStyles(theme as Theme)

	const requestPermissions = async () => {
		if (Platform.OS !== 'web') {
			// Para documentos, não precisamos de permissões especiais no iOS/Android
			// Para imagens/vídeos, solicitamos permissão da galeria
			if (allowedTypes.includes('image') || allowedTypes.includes('video')) {
				const { status } =
					await ImagePicker.requestMediaLibraryPermissionsAsync()
				if (status !== 'granted') {
					Alert.alert(
						'Permissão necessária',
						'Precisamos de permissão para acessar sua galeria de fotos.',
					)
					return false
				}
			}
		}
		return true
	}

	const validateFile = (file: any) => {
		// Validar tamanho
		const fileSizeInMB = file.size / (1024 * 1024)
		if (fileSizeInMB > maxSize) {
			onError?.(`Arquivo muito grande. Tamanho máximo: ${maxSize}MB`)
			return false
		}

		// Validar tipo
		const fileType = file.type || ''
		const isValidType = allowedTypes.some(type => {
			switch (type) {
				case 'image':
					return fileType.startsWith('image')
				/* case 'video':
					return fileType.startsWith('video/') */
				case 'document':
					return fileType.includes('pdf')
				/* ||
						fileType.includes('doc') ||
						fileType.includes('txt') ||
						fileType.includes('xlsx') ||
						fileType.includes('pptx') */
				default:
					return false
			}
		})

		if (!isValidType) {
			onError?.('Tipo de arquivo não suportado')
			return false
		}

		return true
	}

	const handleFileSelect = async () => {
		if (disabled) return

		const hasPermission = await requestPermissions()
		if (!hasPermission) return

		setIsLoading(true)

		try {
			// Se apenas documentos são permitidos, usar DocumentPicker
			if (allowedTypes.length === 1 && allowedTypes[0] === 'document') {
				const result = await DocumentPicker.getDocumentAsync({
					type: [
						'application/pdf',
						'application/msword',
						'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
						'text/plain',
						'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
						'application/vnd.openxmlformats-officedocument.presentationml.presentation',
					],
					multiple: multiple,
					copyToCacheDirectory: true,
				})

				if (!result.canceled && result.assets) {
					const files = result.assets.map(asset => ({
						uri: asset.uri,
						name: asset.name || `document_${Date.now()}`,
						type: asset.mimeType || 'application/octet-stream',
						size: asset.size || 0,
					}))

					// Validar cada arquivo
					const validFiles = files.filter(validateFile)

					if (validFiles.length > 0) {
						if (multiple) {
							setSelectedFiles(prev => [...prev, ...validFiles])
							onFileSelect?.(validFiles[0]) // Para compatibilidade, envia o primeiro
						} else {
							setSelectedFiles([validFiles[0]])
							onFileSelect?.(validFiles[0])
						}
					}
				}
			} else {
				// Para imagens/vídeos ou múltiplos tipos, usar ImagePicker
				const mediaTypes: ImagePicker.MediaType[] =
					allowedTypes.includes('image') && allowedTypes.includes('video')
						? ['images', 'videos']
						: allowedTypes.includes('image')
							? ['images']
							: ['videos']

				const options: ImagePicker.ImagePickerOptions = {
					mediaTypes,
					allowsEditing: !multiple,
					allowsMultipleSelection: multiple,
				}

				const result = await ImagePicker.launchImageLibraryAsync(options)

				if (!result.canceled && result.assets) {
					const files = result.assets.map(asset => ({
						uri: asset.uri,
						name: asset.fileName || `file_${Date.now()}`,
						type: asset.type || 'image',
						size: asset.fileSize || 0,
					}))

					// Validar cada arquivo
					const validFiles = files.filter(validateFile)

					if (validFiles.length > 0) {
						if (multiple) {
							setSelectedFiles(prev => [...prev, ...validFiles])
							onFileSelect?.(validFiles[0]) // Para compatibilidade, envia o primeiro
						} else {
							setSelectedFiles([validFiles[0]])
							onFileSelect?.(validFiles[0])
						}
					}
				}
			}
			setRemoveFileInput(true)
		} catch (error) {
			onError?.('Erro ao selecionar arquivo')
		} finally {
			setIsLoading(false)
		}
	}

	const removeFile = (index: number) => {
		setSelectedFiles(prev => prev.filter((_, i) => i !== index))
		setRemoveFileInput(false)
		setComprovante(null)
	}

	const formatFileSize = (bytes: number) => {
		if (bytes === 0) return '0 Bytes'
		const k = 1024
		const sizes = ['Bytes', 'KB', 'MB', 'GB']
		const i = Math.floor(Math.log(bytes) / Math.log(k))
		return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i]
	}

	const getFileIcon = (type: string) => {
		if (type.startsWith('image/')) return 'image-outline'
		if (type.startsWith('video/')) return 'videocam-outline'
		if (type.includes('pdf')) return 'document-text-outline'
		return 'document-outline'
	}

	return (
		<View style={style}>
			{label && <Text style={styles.label}>{label}</Text>}

			<Pressable
				style={[styles.input, disabled && styles.disabled]}
				onPress={handleFileSelect}
				disabled={disabled || isLoading}
			>
				<Ionicons
					name={icon as keyof typeof Ionicons.glyphMap}
					style={{ marginRight: 8 }}
					size={20}
					color={theme.colors.colorIconInput}
				/>
				<Text style={styles.placeholderText}>
					{isLoading ? 'Carregando...' : placeholder}
				</Text>
				<Ionicons
					name="add-circle-outline"
					size={24}
					color={theme.colors.secondary}
				/>
			</Pressable>

			{/* Lista de arquivos selecionados */}
			{selectedFiles.length > 0 && (
				<View style={styles.filesContainer}>
					{selectedFiles.map((file, index) => (
						<View key={index} style={styles.fileItem}>
							<Ionicons
								name={getFileIcon(file.type) as any}
								size={20}
								color={theme.colors.secondary}
							/>
							<View style={styles.fileInfo}>
								<Text style={styles.fileName} numberOfLines={1}>
									{file.name}
								</Text>
								<Text style={styles.fileSize}>{formatFileSize(file.size)}</Text>
							</View>
							<Pressable
								onPress={() => removeFile(index)}
								style={styles.removeButton}
							>
								<Ionicons
									name="close-circle"
									size={20}
									color={theme.colors.error}
								/>
							</Pressable>
						</View>
					))}
				</View>
			)}
		</View>
	)
}

export function View(props: ViewProps) {
	const { style, ...otherProps } = props
	const { theme } = useCustomTheme()
	const backgroundColor = theme.colors.background

	return <DefaultView style={[{ backgroundColor }, style]} {...otherProps} />
}

export function TouchableOpacity(props: Props) {
	const { style, type = 'primary', ...otherProps } = props
	const { theme } = useCustomTheme()
	const styles = makeStyles(theme)
	return (
		<DefaultTouchableOpacity
			activeOpacity={0.8}
			style={[
				type === 'primary'
					? { ...styles.buttonPrimary }
					: type === 'secondary'
						? { ...styles.buttonSecondary }
						: { ...styles.buttonTertiary },
				style,
			]}
			{...otherProps}
		/>
	)
}

export const BodyScrollView = forwardRef<any, ScrollViewProps>((props, ref) => {
	return (
		<ScrollView
			automaticallyAdjustsScrollIndicatorInsets
			contentInsetAdjustmentBehavior="automatic"
			contentInset={{ bottom: 0 }}
			scrollIndicatorInsets={{ bottom: 0 }}
			{...props}
			ref={ref}
		/>
	)
})

export function ExternalLink(
	props: Omit<React.ComponentProps<typeof Link>, 'href'> & { href: string },
) {
	return (
		<Link
			target="_blank"
			{...props}
			// @ts-expect-error: External URLs are not typed.
			href={props.href}
			onPress={e => {
				if (Platform.OS !== 'web') {
					// Prevent the default behavior of linking to the default browser on native.
					e.preventDefault()
					// Open the link in an in-app browser.
					WebBrowser.openBrowserAsync(props.href as string)
				}
			}}
		/>
	)
}

const makeStyles = (theme: Theme) =>
	StyleSheet.create({
		buttonPrimary: {
			paddingVertical: 8,
			borderRadius: 8,
			fontFamily: theme.fonts.medium.fontFamily,
			color: theme.colors.text,
			fontSize: FontSize.lg,
			alignItems: 'center',
			flexDirection: 'row',
			justifyContent: 'center',
			width: '100%',
			backgroundColor: theme.colors.primary,
		},
		buttonSecondary: {
			backgroundColor: 'rgba(255, 255, 255, 0.06)',
			padding: 10,
			borderRadius: 50,
		},
		buttonTertiary: {
			padding: 10,
			borderRadius: 50,
		},
		headerText: {
			fontWeight: '300',
			marginBottom: '4%',
			maxWidth: 300,
			textAlign: 'center',
			fontFamily: theme.fonts.regular.fontFamily,
		},
		errorText: {
			fontSize: theme.size.xs,
			fontFamily: theme.fonts.regular.fontFamily,
			color: Colors.error,
			marginBottom: 4,
			marginTop: -8,
		},
		textInput: {
			fontSize: theme.size.xsB,
			fontFamily: theme.fonts.regular.fontFamily,
			color: theme.colors.text,
			flex: 1,
		},
		input: {
			padding: 12,
			width: '100%',
			borderRadius: 10,
			flexDirection: 'row',
			borderColor: theme.colors.borderInput,
			alignItems: 'center',
			borderWidth: 1,
			marginBottom: 10,
			backgroundColor: theme.colors.ImputBackgroundColors,
		},
		textEnd: {
			color: theme.colors.text,
			fontWeight: '300',
			fontSize: 14,
		},
		colorIconInput: {
			color: theme.colors.colorIconInput,
		},
		label: {
			fontSize: theme.size.xsB,
			fontFamily: theme.fonts.medium.fontFamily,
			color: theme.colors.text,
			marginBottom: 4,
		},
		disabled: {
			opacity: 0.5,
		},
		placeholderText: {
			fontSize: theme.size.xsB,
			fontFamily: theme.fonts.regular.fontFamily,
			color: theme.colors.colorIconInput,
			flex: 1,
		},
		filesContainer: {
			marginTop: -5,
			marginBottom: 10,
		},
		fileItem: {
			flexDirection: 'row',
			alignItems: 'center',
			padding: 8,
			backgroundColor: theme.colors.ImputBackgroundColors,
			borderRadius: 8,
			marginBottom: 4,
			borderWidth: 1,
			borderColor: theme.colors.borderInput,
		},
		fileInfo: {
			flex: 1,
			marginLeft: 8,
			backgroundColor: theme.colors.ImputBackgroundColors,
		},
		fileName: {
			fontSize: theme.size.xs,
			fontFamily: theme.fonts.medium.fontFamily,
			color: theme.colors.text,
		},
		fileSize: {
			fontSize: theme.size.xs,
			fontFamily: theme.fonts.regular.fontFamily,
			color: theme.colors.colorIconInput,
		},
		removeButton: {
			padding: 4,
		},
	})
