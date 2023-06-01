import { useState } from 'react'

import {Product, ProductDTO } from '@domain/product/entities/product.entity'

import { getZodProductFormValidation } from '@main/factories/ZodProductFormValidationFactory'
import { putProductUseCases } from '@main/factories/ProductUseCasesFactory'

import styles from './UpdateProductModal.module.css'

type Properties = {
    closeModal: () => void
    product: Product
    handleUpdate: (updatedProduct: Product) => void
}

export function UpdateProductModal({closeModal, product, handleUpdate}: Properties) {

    const [name, setName] = useState<string>(product.name)
    const [description, setDescription] = useState<string>(product.description)
    const [price, setPrice] = useState<number>(product.price)
    const [perishable, setPerishable] = useState<boolean>(product.perishable)

    const formValidator = getZodProductFormValidation()

    const putProduct = putProductUseCases()

    function handlePerishableChange(value: string) {
      setPerishable(value === 'yes')
    }

    async function handleForm(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault()

        const body: ProductDTO = {
            name,
            description,
            price,
            photoURL: 'https://some.url.here',
            perishable,
            category: 'some category'
        }

        const success = formValidator.validate(body)
        
        if(success){
          putProduct(body, product.id)
          handleUpdate({
            id: product.id,
            category: body.category,
            description: body.description,
            name: body.name,
            perishable: body.perishable,
            photoURL: body.photoURL,
            price: body.price
          })
          closeModal()
        } else {
            alert('Invalid data was sent!') // Should be a better message 
        }
    }

    return (
        <div className={styles.modalContainer}>
            <div className={styles.modalBackground} onClick={e => e.stopPropagation()}>
                <header>
                    <h1>Update Product</h1>
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
                            <span className='title'>Is Perishable: </span>
                            <div className={styles.radioContainer}>
                            <input 
                                type="radio" 
                                id='yes'
                                name='perishable'
                                value='yes'
                                checked={perishable}
                                onChange={e => handlePerishableChange(e.target.value)}    
                            />
                            <label htmlFor="yes">YES</label>
                            <input 
                                type="radio" 
                                id='no'
                                name='perishable'
                                value='no'
                                checked={!perishable}
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