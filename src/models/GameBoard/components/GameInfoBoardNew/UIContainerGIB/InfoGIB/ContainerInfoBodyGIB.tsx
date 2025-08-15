import React from 'react'
import styles from '../../styles/gib.module.scss';

interface IProps {
    children?: React.ReactNode;
}

const ContainerInfoBodyGIB:React.FC<IProps> = ({
    children
}: IProps) => {
    return (
        <div className={styles['gib__container-info-body']}>
            {children}
        </div>
    )
}

export default ContainerInfoBodyGIB;