export type Category = {
    id: number
    name: string
    photoUrl: string
}

export type CategoryDTO = Omit<Category, 'id'>