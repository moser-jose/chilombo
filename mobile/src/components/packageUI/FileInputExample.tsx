import React, { useState } from 'react'
import { View, StyleSheet, Alert } from 'react-native'
import { Text } from '@/src/components/Themed'
import FileInput from './FileInput'

export default function FileInputExample() {
	const [selectedImage, setSelectedImage] = useState<any>(null)
	const [selectedDocument, setSelectedDocument] = useState<any>(null)
	const [selectedMultiple, setSelectedMultiple] = useState<any[]>([])

	const handleImageSelect = (file: any) => {
		setSelectedImage(file)
		// console.log('Imagem selecionada:', file)
	}

	const handleDocumentSelect = (file: any) => {
		setSelectedDocument(file)
		// console.log('Documento selecionado:', file)
	}

	const handleMultipleSelect = (file: any) => {
		// Para múltiplos arquivos, você pode implementar sua própria lógica
		// console.log('Arquivo adicionado:', file)
	}

	const handleError = (error: string) => {
		Alert.alert('Erro', error)
	}

	return (
		<View style={styles.container}>
			<Text style={styles.title}>Exemplos de FileInput</Text>

			{/* Input para imagens */}
			<FileInput
				label="Selecionar Imagem"
				placeholder="Escolha uma imagem"
				icon="image-outline"
				allowedTypes={['image']}
				maxSize={5} // 5MB
				onFileSelect={handleImageSelect}
				onError={handleError}
			/>

			{/* Input para documentos */}
			<FileInput
				label="Selecionar Documento"
				placeholder="Escolha um documento (PDF, DOC, etc.)"
				icon="document-text-outline"
				allowedTypes={['document']}
				maxSize={10} // 10MB
				onFileSelect={handleDocumentSelect}
				onError={handleError}
			/>

			{/* Input para múltiplos arquivos */}
			<FileInput
				label="Selecionar Múltiplos Arquivos"
				placeholder="Escolha vários arquivos"
				icon="folder-outline"
				allowedTypes={['image', 'document']}
				maxSize={15} // 15MB
				multiple={true}
				onFileSelect={handleMultipleSelect}
				onError={handleError}
			/>

			{/* Input desabilitado */}
			<FileInput
				label="Input Desabilitado"
				placeholder="Este input está desabilitado"
				icon="lock-closed-outline"
				disabled={true}
				onFileSelect={handleImageSelect}
				onError={handleError}
			/>

			{/* Informações dos arquivos selecionados */}
			{selectedImage && (
				<View style={styles.infoContainer}>
					<Text style={styles.infoTitle}>Imagem Selecionada:</Text>
					<Text style={styles.infoText}>Nome: {selectedImage.name}</Text>
					<Text style={styles.infoText}>
						Tamanho: {(selectedImage.size / 1024 / 1024).toFixed(2)} MB
					</Text>
					<Text style={styles.infoText}>Tipo: {selectedImage.type}</Text>
				</View>
			)}

			{selectedDocument && (
				<View style={styles.infoContainer}>
					<Text style={styles.infoTitle}>Documento Selecionado:</Text>
					<Text style={styles.infoText}>Nome: {selectedDocument.name}</Text>
					<Text style={styles.infoText}>
						Tamanho: {(selectedDocument.size / 1024 / 1024).toFixed(2)} MB
					</Text>
					<Text style={styles.infoText}>Tipo: {selectedDocument.type}</Text>
				</View>
			)}
		</View>
	)
}

const styles = StyleSheet.create({
	container: {
		padding: 20,
	},
	title: {
		fontSize: 24,
		fontWeight: 'bold',
		marginBottom: 20,
		textAlign: 'center',
	},
	infoContainer: {
		marginTop: 20,
		padding: 15,
		backgroundColor: '#f0f0f0',
		borderRadius: 8,
	},
	infoTitle: {
		fontSize: 16,
		fontWeight: 'bold',
		marginBottom: 8,
	},
	infoText: {
		fontSize: 14,
		marginBottom: 4,
	},
})
