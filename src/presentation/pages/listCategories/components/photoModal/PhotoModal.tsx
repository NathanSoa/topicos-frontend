import styles from './PhotoModal.module.css';

type Props = {
  photoUrl: string
  closeModal: () => void
};

export function PhotoModal({ photoUrl, closeModal }: Props) {
  
  return (
    <div className={styles.modal}>
      <div className={styles.content}>
        <img src={photoUrl} alt="Category" />
        <button className={styles.closeButton} onClick={closeModal}>
          Close
        </button>
      </div>
    </div>
  );
}