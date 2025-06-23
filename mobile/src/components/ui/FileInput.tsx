import React, { useState } from 'react'
import {
	StyleSheet,
	Pressable,
	ViewStyle,
	StyleProp,
	Alert,
	Platform,
} from 'react-native'
import * as ImagePicker from 'expo-image-picker'
import * as DocumentPicker from 'expo-document-picker'
import { Ionicons } from '@expo/vector-icons'

import { Text, View } from '@/src/components/Themed'
import { useCustomTheme } from '@/src/context/ThemeContext'
import { Theme } from '@/src/types/theme'
import { useStateStore } from '@/src/store/store'
import { useShallow } from 'zustand/react/shallow'

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

export default function FileInput({
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
					name={icon}
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

const makeStyles = (theme: Theme) =>
	StyleSheet.create({
		label: {
			fontSize: theme.size.xsB,
			fontFamily: theme.fonts.medium.fontFamily,
			color: theme.colors.text,
			marginBottom: 4,
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
