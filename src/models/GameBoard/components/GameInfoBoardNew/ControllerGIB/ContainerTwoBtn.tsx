import React from 'react';
import styles from '../styles/gib.module.scss';

interface IProps {
    children?: React.ReactNode;
    style?: React.CSSProperties;
}

const ContainerTwoBtn:React.FC<IProps> = ({
    children,
    style,
}: IProps) => {
  return (
    <div
        className={styles['gib__controller-container--two-btn']}
        style={style}
    >{children}</div>
  )
}

export default ContainerTwoBtn