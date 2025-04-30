export interface Comments{
    id: number
    name: string
    image: string
    rating: number | null
    text: string
    date: Date,
    likes: number | null,
}