
import { IHttpClient } from '@main/api/api.interface'
import { Category, CategoryDTO } from '../entities/category.entity'
import { CategoryUseCases } from './CategoryUseCases.interface'

export class CategoryService implements CategoryUseCases {
    
    constructor(private httpClient: IHttpClient){}

    async findAll(): Promise<Category[]> {
        const response = await this.httpClient.request<Category[]>({method: 'get', resource: 'categories'})
        if(response.statusCode === 200) return response.body
        throw new Error('Something went wrong!')
    }

    async create(category: CategoryDTO): Promise<Category> {
        const response = await this.httpClient.request<Category>({method: 'post', resource: 'categories', body: category})   
        if(response.statusCode === 201) return response.body
        throw new Error('Something went wrong!')
    }

    async delete(id: number): Promise<void> {
        const response = await this.httpClient.request<void>({method: 'delete', resource: `categories/${id}`})
        if(response.statusCode === 204) return
        throw new Error('Something went wrong!')
    }
}