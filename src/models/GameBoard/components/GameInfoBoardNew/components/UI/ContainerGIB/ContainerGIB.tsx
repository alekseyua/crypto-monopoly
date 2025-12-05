import React, { CSSProperties } from 'react'
import styles from '../../styles/gib.module.scss';

interface IProps {
    children?: React.ReactNode;
    style?: CSSProperties;
    name?: string;
}

const ContainerGIB:React.FC<IProps> = ({
    name,
    style,
    children,

}: IProps) => {
    return (
        <div 
            className={styles['gib__container']}
            style={style}
            data-name={name}
        >
            {children}
        </div>
    )
}

export default ContainerGIB;