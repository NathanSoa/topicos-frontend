export type Product = {
    id: string,
    name: string,
    description: string,
    price: number,
    photoURL: string,
    perishable: boolean,
    category: string
}

export type ProductDTO = Omit<Product, 'id'>