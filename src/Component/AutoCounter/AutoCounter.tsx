import React, { useEffect, useState } from 'react';
import styles from './styles/counter.module.scss';

interface IProps {
  counter: number;
  disabled?: boolean;
  callback?: (time: number) => void;
  setTimeEndAuction?: (time: number) => void;
}
const AutoCounter:React.FC<IProps> = ({...props}) => {
  const [counter, setCounter] = useState<number>(props.counter);
  const timeoutRef = React.useRef<NodeJS.Timeout | null>(null);
  
  const tick = function (time: number) {
    if (props.disabled) {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
      return;
    }

    if (time < 0) {
      setCounter(0);
      if (props?.callback) props.callback(0);
      return;
    }

    timeoutRef.current = setTimeout(() => {
      setCounter(time - 1);
      tick(time - 1);
      if (props?.setTimeEndAuction) props.setTimeEndAuction(time - 1);
    }, 1000);
  };

  useEffect(()=>{
    tick(counter);
    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };

    // eslint-disable-next-line
  },[props.counter])

  return (
    <span className={styles['counter__container']}> {counter} </span>
  )
}

export default AutoCounter