import { ProductZodValidation } from '@domain/product/adapter/validation/zodAdapter'

export const getZodProductFormValidation = (): ProductZodValidation => {
    return new ProductZodValidation()
}