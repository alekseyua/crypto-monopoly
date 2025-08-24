import React from 'react'
import styles from './currency.module.scss';
import { icons } from '../../../assets';
import Icon from '../Icon/Icon';

interface IProps{
  size: number;
  color: 'white' | 'black';
}
const CurrencyQG:React.FC<IProps> = ({
  size,
  color,
}) => {
  
  return (
    <Icon
      // className={styles['gib__body-desc-container--two-section--card-avatar-icon']}
      src={color === 'white'? icons.qgCurrencySvgWhite : icons.qgCurrencySvg}
      width= {size + 'px'}
      height={size + 'px'}
  />
  )
}

export default CurrencyQG;