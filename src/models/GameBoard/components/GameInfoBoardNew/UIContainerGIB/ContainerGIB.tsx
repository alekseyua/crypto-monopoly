import React, { CSSProperties } from 'react'
import styles from '../styles/gib.module.scss';

interface IProps {
    children?: React.ReactNode;
    style?: CSSProperties;
}

const ContainerGIB:React.FC<IProps> = ({
    style,
    children,

}: IProps) => {
    return (
        <div 
            className={styles['gib__container']}
            style={style}
        >
            {children}
        </div>
    )
}

export default ContainerGIB;