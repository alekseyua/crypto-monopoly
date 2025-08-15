
import React from 'react'
import styles from '../../styles/gib.module.scss';

interface IProps {
    children?: React.ReactNode;
}

const ContainerInfoTwoColumnGIB:React.FC<IProps> = ({
    children
}: IProps) => {
    return (
        <div className={styles['gib__container-info-two-column']}>
            {children}
        </div>
    )
}

export default ContainerInfoTwoColumnGIB;