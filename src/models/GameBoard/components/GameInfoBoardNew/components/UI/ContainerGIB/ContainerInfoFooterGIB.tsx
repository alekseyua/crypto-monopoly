
import React, { CSSProperties } from 'react'
import styles from '../../styles/gib.module.scss';
import { getPadding } from '../../../../../../../helpers/helper';

interface IProps {
  children?: React.ReactNode;
  style?: React.CSSProperties; // Optional, for custom styles
  p?: number | string | string[] | number[];
}

const ContainerInfoFooterGIB: React.FC<IProps> = ({
  p,
  style,
  children,
}: IProps) => {
     const customStyle: CSSProperties= {};
        if(p) {customStyle.padding = getPadding(p)}
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