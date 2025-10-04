import React from 'react'
import styles from './styles/modal.module.scss';
import { Button, Offset } from '../../shared/UI';
import classNames from 'classnames';
interface IProps {
    isShow: boolean;
    content?: string;
    handleBtnOk?: ()=>any;
    children?: React.ReactNode;
    addClass?: any;
}

const Modal:React.FC<IProps> = ({
    children,
    content,
    handleBtnOk,
    isShow,
    addClass,
}) => {

    if(!isShow) return;
  return (
    <div
        className={
            classNames({
                [styles['modal__container']]: true,
                [addClass]: !!addClass,

            })}
       
    >
        {
        children && 
            children
        }
        {
            content &&
                <div className={styles['modal__content-container']}>
                    {content}
                </div>
        }
        { handleBtnOk &&  <Offset mb={20} />}
        {
            handleBtnOk && 
                <Button
                    type='filled'
                    textColor='#fff'
                    fillColor='#726CED'
                    onClick={handleBtnOk}
                    p={7}
                >ok</Button>
        }
    </div>
  )
}

export default Modal