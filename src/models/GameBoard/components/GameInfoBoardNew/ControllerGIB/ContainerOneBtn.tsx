import React from 'react';
import styles from '../styles/gib.module.scss';

interface IProps {
    children?: React.ReactNode;
}

const ContainerOneBtn:React.FC<IProps> = ({
    children
}: IProps) => {
  return (
    <div
        className={styles['gib__controller-container--one-btn']}
    >{children}</div>
  )
}

export default ContainerOneBtn