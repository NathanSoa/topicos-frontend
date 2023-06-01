import { getProductPhotoUseCases } from '@main/factories/ProductUseCasesFactory';
import styles from './PhotoModal.module.css';
import { useEffect, useState } from 'react';

type Props = {
  productId: string
  closeModal: () => void
};

export function PhotoModal({ productId, closeModal }: Props) {

  const [photo, setPhoto] = useState<string>('')

  const getPhoto = getProductPhotoUseCases()

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await getPhoto(productId)
        setPhoto(response)
      } catch (err) {
        console.error(err)
      }
    }
    fetchData()
  }, [])

  return (
    <div className={styles.modal}>
      <div className={styles.content}>
        <img src={String(photo)} alt="Product" />
        <button className={styles.closeButton} onClick={closeModal}>
          Close
        </button>
      </div>
    </div>
  );
}