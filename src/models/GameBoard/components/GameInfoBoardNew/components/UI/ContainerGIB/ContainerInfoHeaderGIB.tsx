import React from 'react'
import styles from '../../styles/gib.module.scss';
import { useWindowWidth } from '../../../../../../../hooks/useWindowWidth';

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
  const {isMobile} = useWindowWidth();

    const customStyle: React.CSSProperties = {};
    if(p) customStyle.padding = p;
    if(isMobile) customStyle.padding = 10
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