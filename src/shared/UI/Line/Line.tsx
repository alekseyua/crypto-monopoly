import React from 'react'
import cls from './line.module.scss';

interface IProps{
  direction: 'horizontal' | 'vertical';
  location?: 'center' | 'left' | 'right' | '';
  style?: React.CSSProperties;
}
const Line:React.FC<IProps> = ({
  direction,
  style,
  location = '',
}) => {
  if(direction === 'horizontal'){
    return (
      <div className={cls['line__horizontal']} style={style}></div>
    )
  }
  return (
    <div
      className={cls[`line__vertical${!!location ? "--" + location : ""}`]}
      style={style}
    ></div>
  );
}

export default Line;