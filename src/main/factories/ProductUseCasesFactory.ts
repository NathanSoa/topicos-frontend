import { getAxiosHttpClient } from "./AxiosHttpClientFactory";
import { ProductService } from "@domain/product/useCases/ProductUseCases";
import { Product, ProductDTO } from "@domain/product/entities/product.entity";

type FindAll = () => Promise<Product[]>
type FindPhoto = (id: string) => Promise<string>
type Create = (formData: FormData) => Promise<Product>
type Update = (product: ProductDTO, id: string) => Promise<Product>
type Delete = (id: string) => Promise<void>

export const getProductUseCases = (): FindAll => {
    const productUseCases = new  ProductService(getAxiosHttpClient());
    return productUseCases.findAll.bind(productUseCases);
}

export const getProductPhotoUseCases = (): FindPhoto => {
    const productUseCases = new  ProductService(getAxiosHttpClient());
    return productUseCases.findPhoto.bind(productUseCases);
}

export const postProductUseCases = (): Create => {
    const productUseCases = new  ProductService(getAxiosHttpClient());
    return productUseCases.create.bind(productUseCases);
}

export const deleteProductUseCases = (): Delete => {
    const productUseCases = new  ProductService(getAxiosHttpClient());
    return productUseCases.delete.bind(productUseCases);
}

export const putProductUseCases = (): Update => {
    const productUseCases = new  ProductService(getAxiosHttpClient());
    return productUseCases.update.bind(productUseCases);
}