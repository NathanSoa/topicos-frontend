import { ProductDTO } from "@domain/product/entities/product.entity"
import { Validate } from "@main/interfaces/validation.interface"

import { z } from "zod"

const ProductSchema = z.object({
    name: z.string().min(1).max(50),
    description: z.string().min(1).max(100),
    price: z.number().min(1),
    perishable: z.boolean(),
    category: z.object({
        id: z.number(),
        name: z.string().min(1).max(50)
    })
})

export class ProductZodValidation implements Validate<ProductDTO> {

    validate(value: any): boolean {
        const parsedSuccess = ProductSchema.safeParse(value)
        return parsedSuccess.success
    }

}