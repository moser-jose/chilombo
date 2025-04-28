import React, { createContext, useContext, useState } from 'react'

type Address = any
type OrderItem = any
type Payment = { method: string | null; details: Record<string, any> }

type CheckoutContextType = {
	address: Address | null
	setAddress: (address: Address | null) => void
	order: OrderItem[]
	setOrder: (order: OrderItem[]) => void
	payment: Payment
	setPayment: (payment: Payment) => void
}

const CheckoutContext = createContext<CheckoutContextType | undefined>(
	undefined,
)

export function CheckoutProvider({ children }: { children: React.ReactNode }) {
	const [address, setAddress] = useState<Address | null>(null)
	const [order, setOrder] = useState<OrderItem[]>([])
	const [payment, setPayment] = useState<Payment>({ method: null, details: {} })

	return (
		<CheckoutContext.Provider
			value={{ address, setAddress, order, setOrder, payment, setPayment }}
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
