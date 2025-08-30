
import React, { CSSProperties } from 'react'
import styles from '../../styles/gib.module.scss';

interface IProps {
  children?: React.ReactNode;
  style?: React.CSSProperties; // Optional, for custom styles
  p?: number | string;
}

const ContainerInfoFooterGIB: React.FC<IProps> = ({
  p,
  style,
  children,
}: IProps) => {
     const customStyle: CSSProperties= {};
        if(p) {customStyle.padding = p}
  return (
    <div
      className={styles["gib__container-info-footer"]}
      style={{
        ...style,
        ...customStyle,
      }}
    >
      {children}
    </div>
  );
};

export default ContainerInfoFooterGIB;