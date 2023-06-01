
import { IHttpClient } from '@main/api/api.interface'
import { Product, ProductDTO } from '../entities/product.entity'
import { ProductUseCases } from './ProductUseCases.interface'

export class ProductService implements ProductUseCases {
    
    constructor(private httpClient: IHttpClient){}

    async findAll(): Promise<Product[]> {
        const response = await this.httpClient.request<Product[]>({method: 'get', resource: 'products'})
        if(response.statusCode === 200) return response.body
        throw new Error('Something went wrong!')
    }

    async findPhoto(id: string): Promise<string> {
        const response = await this.httpClient.request<string>({method: 'get', resource: `products/${id}/photo`})
        if(response.statusCode === 200) {
            const blob = new Blob([response.body], { type: 'image/png' })
            const url = URL.createObjectURL(blob)
            return url
          }
        throw new Error('Something went wrong!')
    }

    async create(formData: FormData): Promise<Product> {
        const response = await this.httpClient.requestFormData<Product>({method: 'post', resource: 'products', body: formData})
        if(response.statusCode === 201) return response.body
        throw new Error('Something went wrong!')
    }

    async update(product: ProductDTO, id: string): Promise<Product> {
        const response = await this.httpClient.request<Product>({method: 'put', resource: `products/${id}`, body: product})
        if(response.statusCode === 200) return response.body
        throw new Error('Something went wrong!')
    }

    async delete(id: string): Promise<void> {
        const response = await this.httpClient.request<void>({method: 'delete', resource: `products/${id}`})
        if(response.statusCode === 204) return
        throw new Error('Something went wrong!')
    }
}