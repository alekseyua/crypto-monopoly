import React from 'react';
import styles from './styles/block-grid.module.scss';
import { useWindowWidth } from '../../../hooks/useWindowWidth';

interface IProps{
    children: React.ReactNode;
    style?: React.CSSProperties;
}
const BlockWrapper:React.FC<IProps> = ({children, style}) => {
  const width = useWindowWidth();
  const isMobile = width < 992;

  return (
    <div
      className={`${styles['container__wrapper']} ${isMobile ? styles['mobile'] : ''}`}
      style={style}
    >
      {children}
    </div>
  )
}

export default BlockWrapper