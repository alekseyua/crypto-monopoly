import React, { useEffect, useState, useRef } from "react";
import styles from "./styles/counter.module.scss";

interface IProps {
  counter: number;
  disabled?: boolean;
  callback?: (time: number) => void;
  setTimeEndAuction?: (time: number) => void;
}

const AutoCounter: React.FC<IProps> = ({
  counter: initialCounter,
  disabled,
  callback,
  setTimeEndAuction,
}) => {
  const [counter, setCounter] = useState<number>(initialCounter);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  // Сброс при изменении входящего counter
  useEffect(() => {
    setCounter(initialCounter);
  }, [initialCounter]);

  // Основной эффект запуска таймера
  useEffect(() => {
    if (disabled) {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
      return;
    }

    if (counter < 0) {
      setCounter(0);
      callback?.(0);
      return;
    }

   timeoutRef.current = setTimeout(() => {
     const newTime = counter - 1;
     setCounter(newTime);

     if (setTimeEndAuction) {
       setTimeEndAuction(newTime);
     }

     if (newTime < 0 && callback) {
       callback(0);
     }
   }, 1000);

    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, [counter, disabled]); // Следим за counter и disabled

  return <span className={styles["counter__container"]}>{counter}</span>;
};

export default AutoCounter;
