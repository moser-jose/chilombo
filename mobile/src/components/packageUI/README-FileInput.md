# FileInput Component

Um componente React Native para seleção de arquivos que segue o padrão de design do projeto Chilombo.

## Características

- ✅ Seleção de imagens, vídeos e documentos
- ✅ Validação de tipos de arquivo
- ✅ Validação de tamanho máximo
- ✅ Suporte a múltiplos arquivos
- ✅ Interface consistente com o tema do projeto
- ✅ Tratamento de permissões
- ✅ Estados de loading e erro
- ✅ Suporte a temas claro/escuro
- ✅ **NOVO**: Suporte nativo para documentos usando expo-document-picker

## Instalação

O componente utiliza:

- `expo-image-picker` para imagens e vídeos
- `expo-document-picker` para documentos (PDF, DOC, etc.)

Ambas as bibliotecas já estão instaladas no projeto.

## Uso Básico

```tsx
import FileInput from '@/src/components/ui/FileInput'

function MyComponent() {
	const handleFileSelect = file => {
		console.log('Arquivo selecionado:', file)
	}

	const handleError = error => {
		console.error('Erro:', error)
	}

	return (
		<FileInput
			label="Selecionar Arquivo"
			placeholder="Escolha um arquivo"
			onFileSelect={handleFileSelect}
			onError={handleError}
		/>
	)
}
```

## Props

| Prop           | Tipo                   | Padrão                 | Descrição                                        |
| -------------- | ---------------------- | ---------------------- | ------------------------------------------------ |
| `label`        | `string`               | -                      | Label do input                                   |
| `placeholder`  | `string`               | `'Selecionar arquivo'` | Texto do placeholder                             |
| `icon`         | `string`               | `'document-outline'`   | Ícone do Ionicons                                |
| `onFileSelect` | `function`             | -                      | Callback chamado quando um arquivo é selecionado |
| `onError`      | `function`             | -                      | Callback chamado quando ocorre um erro           |
| `allowedTypes` | `array`                | `['image']`            | Tipos de arquivo permitidos                      |
| `maxSize`      | `number`               | `10`                   | Tamanho máximo em MB                             |
| `multiple`     | `boolean`              | `false`                | Permite seleção múltipla                         |
| `style`        | `StyleProp<ViewStyle>` | -                      | Estilos customizados                             |
| `disabled`     | `boolean`              | `false`                | Desabilita o input                               |

## Tipos de Arquivo Suportados

### Imagens (expo-image-picker)

- JPG, JPEG, PNG, GIF, WebP, etc.

### Vídeos (expo-image-picker)

- MP4, MOV, AVI, etc.

### Documentos (expo-document-picker)

- PDF, DOC, DOCX, TXT, XLSX, PPTX

## Permissões

O componente gerencia automaticamente as permissões necessárias:

- **Imagens/Vídeos**: Solicita permissão para acessar a galeria de fotos
- **Documentos**: Não requer permissões especiais (usa o seletor nativo do sistema)

## Exemplos de Uso

### Seleção de Imagem

```tsx
<FileInput
	label="Foto do Perfil"
	placeholder="Escolha uma foto"
	icon="image-outline"
	allowedTypes={['image']}
	maxSize={5}
	onFileSelect={file => console.log(file)}
	onError={error => Alert.alert('Erro', error)}
/>
```

### Seleção de Documento

```tsx
<FileInput
	label="Comprovante"
	placeholder="Escolha um documento"
	icon="document-text-outline"
	allowedTypes={['document']}
	maxSize={10}
	onFileSelect={file => console.log(file)}
	onError={error => Alert.alert('Erro', error)}
/>
```

### Seleção Múltipla

```tsx
<FileInput
	label="Galeria de Fotos"
	placeholder="Escolha várias fotos"
	icon="images-outline"
	allowedTypes={['image']}
	multiple={true}
	maxSize={15}
	onFileSelect={file => console.log(file)}
	onError={error => Alert.alert('Erro', error)}
/>
```

### Múltiplos Tipos de Arquivo

```tsx
<FileInput
	label="Arquivos Diversos"
	placeholder="Escolha imagens ou documentos"
	icon="folder-outline"
	allowedTypes={['image', 'document']}
	maxSize={20}
	onFileSelect={file => console.log(file)}
	onError={error => Alert.alert('Erro', error)}
/>
```

### Input Desabilitado

```tsx
<FileInput
	label="Arquivo (Desabilitado)"
	placeholder="Não disponível"
	disabled={true}
	onFileSelect={file => console.log(file)}
/>
```

## Estrutura do Arquivo Retornado

```tsx
{
  uri: string,      // URI do arquivo
  name: string,     // Nome do arquivo
  type: string,     // Tipo MIME
  size: number      // Tamanho em bytes
}
```

## Tratamento de Erros

O componente trata automaticamente:

- Permissões negadas (apenas para imagens/vídeos)
- Arquivos muito grandes
- Tipos de arquivo não suportados
- Erros de seleção de arquivo

## Comportamento por Tipo

### Apenas Documentos (`allowedTypes={['document']}`)

- Usa `expo-document-picker`
- Abre o seletor nativo de documentos do sistema
- Não requer permissões especiais
- Suporta múltiplos arquivos

### Imagens/Vídeos ou Múltiplos Tipos

- Usa `expo-image-picker`
- Abre a galeria de fotos
- Requer permissão de acesso à galeria
- Suporta edição de imagem (quando não é múltiplo)

## Notas Técnicas

- Para documentos, o arquivo é copiado para o cache do app (`copyToCacheDirectory: true`)
- A validação de tipo é feita tanto pelo picker quanto pelo componente
- O componente é compatível com iOS, Android e Web
- Suporte a temas claro/escuro integrado

## Temas

O componente se adapta automaticamente aos temas claro/escuro do projeto, seguindo o padrão de cores definido em `Theme.ts`.

## Performance

- Validação de arquivos antes do upload
- Compressão automática de imagens (qualidade 0.8)
- Lazy loading de ícones
- Otimização de re-renders

## Limitações

- No web, a seleção de documentos pode ser limitada pelo navegador
- Alguns tipos de arquivo podem não ser suportados em todas as plataformas
- O tamanho máximo é validado no cliente, mas deve ser validado também no servidor
