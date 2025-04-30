import { Address } from './address'

export interface User {
	email: string
	user_name: string
	password: string
}

export interface Client {
	id: string
	first_name: string
	middle_name: string
	last_name: string
	phone: string
	address: Address
	user: User
}
