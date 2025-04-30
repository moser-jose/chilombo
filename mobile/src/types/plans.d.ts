export interface SubPlan{
    id:string,
    title: string,
    price: number,
    type: string,
    description: string,
    activities: string[] | [],
    
}
export interface Plan{
    id: string,
    title: string,
    subplan: SubPlan[]
}