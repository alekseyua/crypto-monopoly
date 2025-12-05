
import React from 'react'
import styles from '../../styles/gib.module.scss';

interface IProps {
    children?: React.ReactNode;
    style?:React.CSSProperties;
}

const ContainerInfoTwoColumnGIB:React.FC<IProps> = ({
    children,
    style,
}: IProps) => {
    return (
        <div className={styles['gib__container-info-two-column']}
            style={style}
        >
            {children}
        </div>
    )
}

export default ContainerInfoTwoColumnGIB;