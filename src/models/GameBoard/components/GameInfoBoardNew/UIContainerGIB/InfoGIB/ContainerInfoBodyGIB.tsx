import React, { CSSProperties } from 'react'
import styles from '../../styles/gib.module.scss';

interface IProps {
    children?: React.ReactNode;
    p?: number | string;
    style?: React.CSSProperties;
}

const ContainerInfoBodyGIB:React.FC<IProps> = ({
    p,
    children,
    style,
}: IProps) => {
    const customStyle: CSSProperties= {};
    if(p) {customStyle.padding = p}
    return (
        <div 
            className={styles['gib__container-info-body']}
            style={{...style,...customStyle}}
        >
            {children}
        </div>
    )
}

export default ContainerInfoBodyGIB;