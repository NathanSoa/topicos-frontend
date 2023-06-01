import { CategoryDTO } from "@domain/category/entities/category.entity"
import { Validate } from "@main/interfaces/validation.interface"

import { z } from "zod"

const CategorySchema = z.object({
    name: z.string().min(1).max(20),
    photoURL: z.string()
})

export class CategoryZodValidation implements Validate<CategoryDTO> {

    validate(value: any): boolean {
        const parsedSuccess = CategorySchema.safeParse(value)
        return parsedSuccess.success
    }

}