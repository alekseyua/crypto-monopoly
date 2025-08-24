
import React from 'react'
import styles from '../../styles/gib.module.scss';

interface IProps {
    children?: React.ReactNode;
    style?: React.CSSProperties; // Optional, for custom styles
}

const ContainerInfoFooterGIB:React.FC<IProps> = ({
    style,
    children
}: IProps) => {
    return (
        <div 
        className={styles['gib__container-info-footer']}
        style={{
            ...style,
        }}
        >
            {children}
        </div>
    )
}

export default ContainerInfoFooterGIB;