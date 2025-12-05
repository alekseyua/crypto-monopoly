import React from 'react'
import styles from '../../styles/gib.module.scss';

interface IProps {
    children?: React.ReactNode;
    style?: React.CSSProperties; // Optional, if you want to pass custom styles
}

const ContainerInfoGIB:React.FC<IProps> = ({
    style,
    children,
}: IProps) => {
    return (
        <div 
            className={styles['gib__container-info']}
            style={style} // Apply custom styles if provided
        >
            {children}
        </div>
    )
}

export default ContainerInfoGIB;