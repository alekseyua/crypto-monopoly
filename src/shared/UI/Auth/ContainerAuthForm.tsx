import React from 'react';
import styles from './styles/auth.module.scss';

interface IProps {
    children: React.ReactNode;
}

const ContainerAuthForm:React.FC<IProps> = ({children}) => {
  return (
    <div
        className={styles['auth__container-form']}
    >{children}</div>
  )
}

export default ContainerAuthForm