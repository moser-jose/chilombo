import React, { createContext, useContext, useState } from 'react'
import { Address } from '../types/address'
import { Service } from '../types/service'
import { Client } from '../types/client'
import { Plan } from '../types/plans'
type OrderItem = {
	service: Service
}
type Payment = { method: string | null; details: Record<string, any> }

type CheckoutContextType = {
	address: Address | null
	setAddress: (address: Address | null) => void
	order: OrderItem[]
	setOrder: (order: OrderItem[]) => void
	payment: Payment
	setPayment: (payment: Payment) => void
	client: Client
	setClient: (client: Client) => void
	plan: Plan | null
	setPlan: (plan: Plan | null) => void
}

const CheckoutContext = createContext<CheckoutContextType | undefined>(
	undefined,
)

export function CheckoutProvider({ children }: { children: React.ReactNode }) {
	const [address, setAddress] = useState<Address | null>(null)
	const [order, setOrder] = useState<OrderItem[]>([])
	const [client, setClient] = useState<Client>({} as Client)
	const [payment, setPayment] = useState<Payment>({ method: null, details: {} })
	const [plan, setPlan] = useState<Plan | null>(null)

	return (
		<CheckoutContext.Provider
			value={{
				address,
				setAddress,
				order,
				setOrder,
				payment,
				setPayment,
				client,
				setClient,
				plan,
				setPlan,
			}}
		>
			{children}
		</CheckoutContext.Provider>
	)
}

export function useCheckout() {
	const context = useContext(CheckoutContext)
	if (!context) {
		throw new Error('useCheckout must be used within a CheckoutProvider')
	}
	return context
}
