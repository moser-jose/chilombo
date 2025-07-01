import { create } from 'zustand'
import { Address } from '../types/address'
import { Service } from '../types/service'
import { Client } from '../types/client'
import { Plan } from '../types/plans'

type OrderItem = {
	service: Service
}

type Payment = { method: string | null; details: Record<string, any> }

interface StateStore {
	removeFileInput: boolean
	comprovante: any
	setRemoveFileInput: (removeFile: boolean) => void
	setComprovante: (comprovante: any) => void
}

interface CheckoutStore {
	address: Address | null
	order: OrderItem[]
	payment: Payment
	client: Client
	plan: Plan | null
	setAddress: (address: Address | null) => void
	setOrder: (order: OrderItem[]) => void
	setPayment: (payment: Payment) => void
	setClient: (client: Client) => void
	setPlan: (plan: Plan | null) => void
	resetCheckout: () => void
}

export const useStateStore = create<StateStore>()(set => ({
	removeFileInput: false,
	comprovante: null,
	setRemoveFileInput: (removeFile: boolean) =>
		set({ removeFileInput: removeFile }),
	setComprovante: (comprovante: any) => set({ comprovante: comprovante }),
}))

export const useCheckoutStore = create<CheckoutStore>()(set => ({
	address: null,
	order: [],
	payment: { method: null, details: {} },
	client: {} as Client,
	plan: null,
	setAddress: (address: Address | null) => set({ address }),
	setOrder: (order: OrderItem[]) => set({ order }),
	setPayment: (payment: Payment) => set({ payment }),
	setClient: (client: Client) => set({ client }),
	setPlan: (plan: Plan | null) => set({ plan }),
	resetCheckout: () =>
		set({
			address: null,
			order: [],
			payment: { method: null, details: {} },
			client: {} as Client,
			plan: null,
		}),
}))
