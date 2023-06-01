import { Product, ProductDTO } from "../entities/product.entity"

export interface ProductUseCases {
    findAll: () => Promise<Product[]>
    findPhoto: (id: string) => Promise<string>
    create: (formData: FormData) => Promise<Product>
    update: (product: ProductDTO, id: string) => Promise<Product>
    delete: (id: string) => Promise<void>
}