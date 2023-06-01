import { deleteCategoryUseCases } from '@main/factories/CategoryUseCasesFactory'
import { Category } from '@domain/category/entities/category.entity'

import styles from './Table.module.css'
import { useState } from 'react'
import { PhotoModal } from '../photoModal/PhotoModal'

type Properties = {
    content: Category[]
    removeFromState: (id: number) => void
}

export function Table({content, removeFromState}: Properties) {

    const [showPhotoModal, setShowPhotoModal] = useState<boolean>(false)
    const [photoUrlToShow, setPhotoUrlToShow] = useState<string>('')

    const deleteById = deleteCategoryUseCases()
    const closePhotoModal = () => setShowPhotoModal(false)
    
    const handleDelete = (id: number) => {
        deleteById(id)
        .then(() => {
            removeFromState(id)
        })
        .catch(err => {
            console.log(err)
        })
    }

    function handlePhotoView(event:  React.MouseEvent<HTMLButtonElement, MouseEvent>, photoUrl?: string) {
        event.preventDefault()
        if(photoUrl) setPhotoUrlToShow(photoUrl)
        setShowPhotoModal(true)
    }

    return (
        <>
            <table className={styles.table}>
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Photo</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody id="tableBody">
                    {
                        content.length > 0 && content.map(each => (
                            <tr key={each.id}>
                                <td>{each.name}</td>
                                <td><button className={styles.photo} onClick={event => handlePhotoView(event, each?.photoUrl)}>View</button></td>
                                <td>
                                    <button className={styles.delete} onClick={() => handleDelete(each.id)}>Delete</button>
                                </td>
                            </tr>
                        ))
                    }
                </tbody>
            </table>
            {
                showPhotoModal ? photoUrlToShow && <PhotoModal closeModal={closePhotoModal}  photoUrl={photoUrlToShow}/> : <></>
            }
        </>
    )
}