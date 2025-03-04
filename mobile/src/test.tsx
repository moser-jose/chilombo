import React from 'react'
import { View } from 'react-native'

// Este componente deve gerar vários erros do ESLint
export const TestComponent = () => {
	const unused = 'this should show an error'

	return <View style={{ padding: 10, backgroundColor: 'red' }}>test\</View>
}
