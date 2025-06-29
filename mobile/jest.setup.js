import mockAsyncStorage from '@react-native-async-storage/async-storage/jest/async-storage-mock'

jest.mock('@react-native-async-storage/async-storage', () => mockAsyncStorage)

// Mock @expo/vector-icons to avoid native font errors in tests
jest.mock('@expo/vector-icons', () => {
	const React = require('react')
	return {
		Ionicons: props => React.createElement('Icon', props),
	}
})
