import { useState } from 'react'

import {Product } from '@domain/product/entities/product.entity'
import { Category } from '@domain/category/entities/category.entity'

import { getZodProductFormValidation } from '@main/factories/ZodProductFormValidationFactory'
import { postProductUseCases } from '@main/factories/ProductUseCasesFactory'

import styles from './CreateProductModal.module.css'

type Properties = {
    categories: Category[]
    closeModal: () => void
    updateState: (product: Product) => void
}

export function CreateProductModal({closeModal, updateState, categories}: Properties) {

    const [name, setName] = useState<string>('')
    const [description, setDescription] = useState<string>('')
    const [price, setPrice] = useState<number>(0)
    const [perishable, setPerishable] = useState<boolean>(false)
    const [category, setCategory] = useState<Category>()
    const [photo, setPhoto] = useState<File | null>(null)

    const formValidator = getZodProductFormValidation()
    const create = postProductUseCases()

    function handlePerishableChange(value: string) {
        setPerishable(value === 'true')
    }

    function handleCategoryChange(event: React.ChangeEvent<HTMLSelectElement>) {
        const categoryId = Number(event.target.value)
        const selectedCategory = categories.find(category => category.id === categoryId)
        setCategory(selectedCategory);
    }

    function handlePhotoChange(event: React.ChangeEvent<HTMLInputElement>) {
        const file = event.target.files?.[0];
        setPhoto(file || null);
    }

    async function handleForm(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault()

        const success = formValidator.validate({
            name,
            description,
            price,
            perishable,
            category: {name: category?.name, id: category?.id}
        })
        
        if(success){
            const formData = new FormData()
            formData.append('name', name)
            formData.append('description', description)
            formData.append('price', String(price))
            if (category) formData.append('categoryId', String(category.id))
            if (photo) formData.append('photo', photo)
            formData.append('perishable', String(perishable))
            const response = await create(formData)
            updateState(response)
            closeModal()
        } else {
            alert('Invalid data was sent!') // Should be a better message 
        }
    }

    return (
        <div className={styles.modalContainer}>
            <div className={styles.modalBackground} onClick={e => e.stopPropagation()}>
                <header>
                    <h1>Create Product</h1>
                </header>
                <form onSubmit={handleForm} >
                    <div className={styles.twoInputs}>
                        <label>
                            <span>Name: </span>
                            <input 
                                type="text" 
                                name='name' 
                                placeholder='Product Name' 
                                value={name}
                                onChange={e => setName(e.target.value)}    
                            />
                        </label>
                        <label>
                            <span>Description: </span>
                            <input 
                                type="text" 
                                name='description' 
                                placeholder='Product Description'
                                value={description}
                                onChange={e => setDescription(e.target.value)}    
                            />
                        </label>
                    </div>
                    <div className={styles.twoInputs}>
                        <label>
                            <span>Price: </span>
                            <input 
                                type="string" 
                                name='price' 
                                placeholder='Product Price'
                                value={price}
                                onChange={e => setPrice(Number(e.target.value))}    
                            />
                        </label>
                        <label>
                        <span>Category: </span>
                            <select name="category" value={category?.id || ''} onChange={handleCategoryChange}>
                                <option value="">Select a category</option>
                                {categories.map(category => (
                                <option key={category.id} value={category.id}>
                                    {category.name}
                                </option>
                                ))}
                            </select>
                        </label>
                    </div>
                    <div className={styles.twoInputs}>
                        <label>
                            <span>Photo: </span>
                            <input type="file" name="photo" onChange={handlePhotoChange} />
                        </label>
                        <label>
                            <span className='title'>Is Perishable: </span>
                            <div className={styles.radioContainer}>
                            <input 
                                type="radio" 
                                id='yes'
                                name='perishable'
                                value='yes'
                                onChange={e => handlePerishableChange(e.target.value)}    
                            />
                            <label htmlFor="yes">YES</label>
                            <input 
                                type="radio" 
                                id='no'
                                name='perishable'
                                value='no'
                                onChange={e => handlePerishableChange(e.target.value)}    
                            />
                            <label htmlFor="no">NO</label>
                            </div>
                        </label>
                    </div>
                    <footer>
                        <input type="submit" value="Create" className={styles.submit} />
                        <input type="button" value="Close" className={styles.close} onClick={closeModal} />
                    </footer>
                </form>
            </div>
        </div>
    )
}