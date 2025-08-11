import React from 'react'
import styles from './styles/modal.module.scss';

interface IModal{
    isOpen : boolean;
    content : React.ReactNode | string | number;
    title?: string;
    onClose: ()=>void;
    maxWidth?: number | string
}
const Modal:React.FC<IModal> = ({
    isOpen,
    title = '',  // Optional title for the modal
    content,  // Content to be displayed in the modal
    onClose,
    maxWidth= 'auto',
}: IModal) => {
  return (
    <div className={styles['modal__container']}
     
    >
        <div className={styles['modal__container-wrap']}
        style={{
            maxWidth: maxWidth
        }}
        >

        <div className={styles['modal__close']} onClick={onClose} />
        <div className={styles['modal__title']}>{title}</div>
        <div className={styles['modal__content']}>{content}</div>
        </div>
    </div>
  )
}

export default Modal;