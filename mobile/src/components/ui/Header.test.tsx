import React from 'react'
import { render, waitFor } from '@/src/test-utils'
import Header from './Header'

jest.mock('@clerk/clerk-expo', () => ({
	useUser: () => ({
		user: {
			firstName: 'José',
			imageUrl: 'https://fakeurl.com/avatar.png',
		},
	}),
}))

jest.mock('expo-router', () => ({
	useRouter: () => ({ push: jest.fn() }),
	Link: ({ children }: any) => <>{children}</>,
}))

jest.mock('react-native-fast-image', () => {
	const FastImage = () => null
	FastImage.resizeMode = {
		cover: 'cover',
	}
	return FastImage
})

jest.mock('expo-location', () => ({
	requestForegroundPermissionsAsync: jest
		.fn()
		.mockResolvedValue({ status: 'granted' }),
	getCurrentPositionAsync: jest.fn().mockResolvedValue({
		coords: { latitude: 1, longitude: 2 },
	}),
	reverseGeocodeAsync: jest
		.fn()
		.mockResolvedValue([{ city: 'Luanda', isoCountryCode: 'AO' }]),
}))

describe('Header', () => {
	it('deve renderizar o nome do usuário e a localização', async () => {
		const { getByText } = render(<Header />)
		await waitFor(() => {
			expect(getByText('Olá, José')).toBeTruthy()
			expect(getByText('Luanda, AO')).toBeTruthy()
		})
	})
})
