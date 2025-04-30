import { Comments } from './comments'
import { Plan } from './plans'

export interface Service {
	id: string
	icon: NodeRequire
	iconDark: NodeRequire
	service: string
	name: string
	image: NodeRequire
	rating: number | null
	reviews: number | null
	tags: string[] | []
	description: string
	duration: string
	professionals: number
	services: number
	benefits: string[] | []
	activities: string[] | []
	price: number
	tag: string
	plan: Plan[] | []
	comments: Comments[] | []
}
