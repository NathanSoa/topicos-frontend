import { CategoryZodValidation } from '@domain/category/adapter/validation/zodAdapter'

export const getZodCategoryFormValidation = (): CategoryZodValidation => {
    return new CategoryZodValidation()
}