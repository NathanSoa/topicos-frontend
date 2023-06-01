import { getAxiosHttpClient } from "./AxiosHttpClientFactory";
import { CategoryService } from "@domain/category/useCases/CategoryUseCases";
import { Category, CategoryDTO } from "@domain/category/entities/category.entity";

type FindAll = () => Promise<Category[]>
type Create = (category: CategoryDTO) => Promise<Category>
type Delete = (id: number) => Promise<void>

export const getCategoryUseCases = (): FindAll => {
    const CategoryUseCases = new  CategoryService(getAxiosHttpClient());
    return CategoryUseCases.findAll.bind(CategoryUseCases);
}

export const postCategoryUseCases = (): Create => {
    const CategoryUseCases = new  CategoryService(getAxiosHttpClient());
    return CategoryUseCases.create.bind(CategoryUseCases);
}

export const deleteCategoryUseCases = (): Delete => {
    const CategoryUseCases = new  CategoryService(getAxiosHttpClient());
    return CategoryUseCases.delete.bind(CategoryUseCases);
}
