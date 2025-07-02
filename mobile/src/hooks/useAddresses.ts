import { useState, useEffect } from 'react'
import { Address } from '@/src/types/address'
import AsyncStorage from '@react-native-async-storage/async-storage'

const ADDRESSES_STORAGE_KEY = 'user_addresses'

export const useAddresses = () => {
	const [addresses, setAddresses] = useState<Address[]>([])
	const [isLoading, setIsLoading] = useState(true)

	// Carregar endereços do AsyncStorage
	const loadAddresses = async () => {
		try {
			const storedAddresses = await AsyncStorage.getItem(ADDRESSES_STORAGE_KEY)
			if (storedAddresses) {
				setAddresses(JSON.parse(storedAddresses))
			}
		} catch (error) {
			console.error('Erro ao carregar endereços:', error)
		} finally {
			setIsLoading(false)
		}
	}

	// Salvar endereços no AsyncStorage
	const saveAddresses = async (newAddresses: Address[]) => {
		try {
			await AsyncStorage.setItem(
				ADDRESSES_STORAGE_KEY,
				JSON.stringify(newAddresses),
			)
			setAddresses(newAddresses)
		} catch (error) {
			console.error('Erro ao salvar endereços:', error)
			throw error
		}
	}

	// Adicionar novo endereço
	const addAddress = async (address: Address) => {
		const newAddresses = [...addresses, address]
		await saveAddresses(newAddresses)
		return address
	}

	// Atualizar endereço existente
	const updateAddress = async (
		id: string,
		updatedAddress: Partial<Address>,
	) => {
		const newAddresses = addresses.map(addr =>
			addr.id === id ? { ...addr, ...updatedAddress } : addr,
		)
		await saveAddresses(newAddresses)
		return newAddresses.find(addr => addr.id === id)
	}

	// Remover endereço
	const removeAddress = async (id: string) => {
		const newAddresses = addresses.filter(addr => addr.id !== id)
		await saveAddresses(newAddresses)
	}

	// Buscar endereço por ID
	const getAddressById = (id: string) => {
		return addresses.find(addr => addr.id === id)
	}

	// Carregar endereços na inicialização
	useEffect(() => {
		loadAddresses()
	}, [])

	return {
		addresses,
		isLoading,
		addAddress,
		updateAddress,
		removeAddress,
		getAddressById,
		loadAddresses,
	}
}
