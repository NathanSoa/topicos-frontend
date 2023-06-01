import { Category, CategoryDTO } from "../entities/category.entity"

export interface CategoryUseCases {
    findAll: () => Promise<Category[]>
    create: (category: CategoryDTO) => Promise<Category>
    delete: (id: number) => Promise<void>
}