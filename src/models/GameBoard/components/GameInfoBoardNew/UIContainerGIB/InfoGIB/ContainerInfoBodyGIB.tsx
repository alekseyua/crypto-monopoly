import React, { CSSProperties } from 'react'
import styles from '../../styles/gib.module.scss';

interface IProps {
    children?: React.ReactNode;
    p?: number;
}

const ContainerInfoBodyGIB:React.FC<IProps> = ({
    p,
    children
}: IProps) => {
    const customStyle: CSSProperties= {};
    if(p) {customStyle.padding = p}
    return (
        <div 
            className={styles['gib__container-info-body']}
            style={customStyle}
        >
            {children}
        </div>
    )
}

export default ContainerInfoBodyGIB;