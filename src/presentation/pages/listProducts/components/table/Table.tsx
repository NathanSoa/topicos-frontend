import { Product } from '@domain/product/entities/product.entity'

import { deleteProductUseCases } from '@main/factories/ProductUseCasesFactory'

import styles from './Table.module.css'
import { useState } from 'react'
import { UpdateProductModal } from '../updateProduct/UpdateProductModal'
import { PhotoModal } from '@components'

type Properties = {
    content: Product[]
    removeFromState: (id: string) => void
    handleUpdate: (updatedProduct: Product) => void
}

export function Table({content, removeFromState, handleUpdate}: Properties) {

    const [showUpdateModal, setShowUpdateModal] = useState<boolean>(false)
    const [showPhotoModal, setShowPhotoModal] = useState<boolean>(false)
    const [productToUpdate, setProductToUpdate] = useState<Product>()
    const [productIdToPhoto, setProductIdToPhoto] = useState<string>('')

    const closeUpdateModal = () => setShowUpdateModal(false)
    const closePhotoModal = () => setShowPhotoModal(false)

    const deleteById = deleteProductUseCases()
    
    const handleDelete = (id: string) => {
        deleteById(id)
        .then(() => {
            removeFromState(id)
        })
        .catch(err => {
            console.error(err)
        })
    }

    function handleClick(event:  React.MouseEvent<HTMLButtonElement, MouseEvent>, product?: Product) {
        event.preventDefault()
        if(product) setProductToUpdate(product)
        setShowUpdateModal(true)
    }

    function handlePhotoView(event:  React.MouseEvent<HTMLButtonElement, MouseEvent>, id?: string) {
        event.preventDefault()
        if(id) setProductIdToPhoto(id)
        setShowPhotoModal(true)
    }

    return (
        <>
        <table className={styles.table}>
            <thead>
                <tr>
                    <th>Photo</th>
                    <th>Update</th>
                    <th>Name</th>
                    <th>Category</th>
                    <th>Description</th>
                    <th>Price</th>
                    <th>Is Perishable</th>
                    <th>Delete</th>
                </tr>
            </thead>
            <tbody id="tableBody">
                {
                    content.length > 0 && content.map(each => {
                        const product = content.find(anyProduct => anyProduct.id === each.id)
                        return (
                        <tr key={each.id}>
                            <td>
                                <button className={styles.photo} onClick={event => handlePhotoView(event, product?.id)}>View</button>
                            </td>
                            <td>
                                <button className={styles.update} onClick={event => handleClick(event, product)}>Update</button>
                            </td>
                            <td>{each.name}</td>
                            <td>{each.category}</td>
                            <td>{each.description}</td>
                            <td>{each.price}</td>
                            <td>{each.perishable ? "YES" : "NO"}</td>
                            <td>
                                <button className={styles.delete} onClick={() => handleDelete(each.id)}>Delete</button>
                            </td>
                        </tr>
                    )})
                }
            </tbody>
        </table>
            {
                showUpdateModal ? productToUpdate && <UpdateProductModal closeModal={closeUpdateModal}  product={productToUpdate} handleUpdate={handleUpdate}/> : <></>
            }
            {
                showPhotoModal ? productIdToPhoto && <PhotoModal closeModal={closePhotoModal}  productId={productIdToPhoto}/> : <></>
            }
        </>
    )
}