import React, { CSSProperties } from 'react'
import styles from '../../styles/gib.module.scss';

interface IProps {
    children?: React.ReactNode;
    style?: CSSProperties;
    name?: string;
}

const ContainerRollGIB:React.FC<IProps> = ({
    name,
    style,
    children,

}: IProps) => {
    return (
        <div 
            className={styles['gib__container-roll-dice']}
            style={style}
            data-name={name}
        >
            {children}
        </div>
    )
}

export default ContainerRollGIB;