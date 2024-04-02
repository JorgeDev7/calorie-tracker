type Categorie = {
    id: number
    name: string
}

type Activity = {
    id: `${string}-${string}-${string}-${string}-${string}`
    category: number,
    name: string,
    calories: number
}