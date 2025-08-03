import React from 'react'
import cls from './line.module.scss';

interface IProps{
  direction: 'horizontal' | 'vertical';
  location?: 'center' | 'left' | 'right' | '';

}
const Line:React.FC<IProps> = ({
  direction,
  location = '',
}) => {
  if(direction === 'horizontal'){
    return (
      <div className={cls['line__horizontal']}></div>
    )
  }
  return (
    <div className={cls[`line__vertical${!!location ? '--' + location : ''}`]}></div>
  )
}

export default Line;