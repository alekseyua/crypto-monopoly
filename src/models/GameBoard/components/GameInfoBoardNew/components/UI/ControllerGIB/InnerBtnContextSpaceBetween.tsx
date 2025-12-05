import React from 'react';
import styles from '../../styles/gib.module.scss';

interface IProps {
    children?: React.ReactNode;
}

const InnerBtnContextSpaceBetween:React.FC<IProps> = ({
    children
}: IProps) => {
  return (
    <div
        className={styles['gib__controller-btn-context--space-between']}
    >{children}</div>
  )
}

export default InnerBtnContextSpaceBetween