import React from 'react'
import styles from '../styles/gib.module.scss';

interface IProps {
    children?: React.ReactNode;
}

const ContainerGIB:React.FC<IProps> = ({
    children
}: IProps) => {
    return (
        <div className={styles['gib__container']}>
            {children}
        </div>
    )
}

export default ContainerGIB;