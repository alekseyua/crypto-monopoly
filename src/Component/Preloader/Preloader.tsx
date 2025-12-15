import React from 'react'
import Icon from '../../shared/UI/Icon/Icon'
import { icons } from '../../assets';
import styles from './styles/preloader.module.scss';

const Preloader = () => {
  return (
    <div className={styles['preloader__cont']}>
          <Icon src={icons.logo} className={styles['preloader__body-icon']} width={150} height={150}/>
    </div>
  )
}

export default Preloader