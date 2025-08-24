import React from 'react'
import styles from '../../styles/gib.module.scss';

interface IProps {
    children?: React.ReactNode;
    style?: React.CSSProperties; // Optional, for custom styles
    p?: number | string;
}

const ContainerInfoHeaderGIB:React.FC<IProps> = ({
    p,
    style,
    children
}: IProps) => {
    const customStyle: React.CSSProperties = {};
    if(p) customStyle.padding = p;
    return (
        <div className={styles['gib__container-info-header']}
        style={{
            ...style,
            ...customStyle
        }}
        >
            {children}
        </div>
    )
}

export default ContainerInfoHeaderGIB;