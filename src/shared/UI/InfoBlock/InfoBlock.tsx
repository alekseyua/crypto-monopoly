import React from 'react';
import styles from './styles/ib.module.scss';

interface IProps {
    children: React.ReactNode;
    center?: boolean;
    p?: number | string;
}

const InfoBlock:React.FC<IProps> = ({
    children,
    center,
    p,
}:IProps) => {
  return (
    <div 
          className={styles['ib__info-container']}
          style={{
            justifyItems: center? 'center' : 'start',
            padding: p? p : 0,
          }}
    >{children}</div>
  )
}

export default InfoBlock