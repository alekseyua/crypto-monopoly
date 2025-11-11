import React from 'react';
import styles from './styles/block-grid.module.scss';
import { useWindowWidth } from '../../../hooks/useWindowWidth';

interface IProps{
    children: React.ReactNode;
    style?: React.CSSProperties;
    isWithoutBottomIndent?: boolean;
}
const BlockWrapper: React.FC<IProps> = ({ children, style, isWithoutBottomIndent }) => {
  const width = useWindowWidth();
  const isMobile = width < 992;

  return (
    <div
      className={`${styles['container__wrapper']} ${isMobile ? styles['mobile'] : ''} ${isWithoutBottomIndent ? styles['without-bottom-indent'] : ''}`}
      style={style}
    >
      {children}
    </div>
  )
}

export default BlockWrapper