import React from 'react'
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
      src={color === 'white'? icons.qgCurrencySvgWhite : icons.qgCurrencySvg}
      width= {size + 'px'}
      height={size + 'px'}
  />
  )
}

export default CurrencyQG;