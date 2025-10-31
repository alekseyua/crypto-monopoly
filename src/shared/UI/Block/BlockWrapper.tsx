import React from 'react';
import styles from './styles/block-grid.module.css';

interface IProps{
    children: React.ReactNode;
}
const BlockWrapper:React.FC<IProps> = ({children}) => {
  return (
      <div
        className={styles['container__wrapper']}
      >{children}</div>
  )
}

export default BlockWrapper