
import React from 'react'
import styles from '../../styles/gib.module.scss';

interface IProps {
    children?: React.ReactNode;
    style?:React.CSSProperties;
    full?: boolean
}

const ContainerInfoTwoColumnGIB:React.FC<IProps> = ({
    children,
    style,
    full,
}: IProps) => {
    return (
        <div className={styles[full ? 'gib__container-info-two-column--full':'gib__container-info-two-column']}
            style={style}
        >
            {children}
        </div>
    )
}

export default ContainerInfoTwoColumnGIB;