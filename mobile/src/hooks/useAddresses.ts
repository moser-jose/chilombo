import { create } from 'zustand'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { Address } from '@/src/types/address'

const ADDRESSES_STORAGE_KEY = 'user_addresses'

interface AddressesState {
	addresses: Address[]
	isLoading: boolean
	loadAddresses: () => Promise<void>
	addAddress: (address: Address) => Promise<Address>
	updateAddress: (
		id: string,
		updatedAddress: Partial<Address>,
	) => Promise<Address | undefined>
	removeAddress: (id: string) => Promise<void>
	getAddressById: (id: string) => Address | undefined
}

export const useAddressesStore = create<AddressesState>((set, get) => ({
	addresses: [],
	isLoading: true,

	loadAddresses: async () => {
		set({ isLoading: true })
		try {
			const storedAddresses = await AsyncStorage.getItem(ADDRESSES_STORAGE_KEY)
			if (storedAddresses) {
				set({ addresses: JSON.parse(storedAddresses) })
			}
		} catch (error) {
			console.error('Erro ao carregar endereços:', error)
		} finally {
			set({ isLoading: false })
		}
	},

	addAddress: async (address: Address) => {
		const addresses = get().addresses
		const newAddresses = [...addresses, address]
		await AsyncStorage.setItem(
			ADDRESSES_STORAGE_KEY,
			JSON.stringify(newAddresses),
		)
		set({ addresses: newAddresses })
		return address
	},

	updateAddress: async (id: string, updatedAddress: Partial<Address>) => {
		const addresses = get().addresses
		const newAddresses = addresses.map(addr =>
			addr.id === id ? { ...addr, ...updatedAddress } : addr,
		)
		await AsyncStorage.setItem(
			ADDRESSES_STORAGE_KEY,
			JSON.stringify(newAddresses),
		)
		set({ addresses: newAddresses })
		return newAddresses.find(addr => addr.id === id)
	},

	removeAddress: async (id: string) => {
		const addresses = get().addresses
		const newAddresses = addresses.filter(addr => addr.id !== id)
		await AsyncStorage.setItem(
			ADDRESSES_STORAGE_KEY,
			JSON.stringify(newAddresses),
		)
		set({ addresses: newAddresses })
	},

	getAddressById: (id: string) => {
		const addresses = get().addresses
		return addresses.find(addr => addr.id === id)
	},
}))

// Carregar endereços na inicialização do app
useAddressesStore.getState().loadAddresses()
