import React from 'react';
import styles from '../../styles/gib.module.scss';

interface IProps {
    children?: React.ReactNode;
    style?: React.CSSProperties;
}

const ContainerOneBtn:React.FC<IProps> = ({
    children,
     style,
}: IProps) => {
  return (
    <div
      style={style}
        className={styles['gib__controller-container--one-btn']}
    >{children}</div>
  )
}

export default ContainerOneBtn