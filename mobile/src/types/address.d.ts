export interface Address {
	id: string
	title: string
	neighborhood?: string | null
	centrality?: string | null
	commune?: string | null
	block?: string | null
	street?: string | null
	number?: string | null
	apartment?: string | null
	building_number?: string | null
	city: string
	state: string
	zipCode?: string | null
}