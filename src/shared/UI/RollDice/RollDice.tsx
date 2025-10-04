//App.js
import React, { forwardRef } from "react";
import styles from './styles/roll-dice.module.scss';

const RollDice = forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ ...props }, ref) => {
  return (
    <section
      className={styles["container"]}
      style={{ "--cube-size": "50px" } as React.CSSProperties}
    >
      <div id={styles["cube"]} ref={ref}>
        <div className={styles["front"]}>
          <span className={`${styles["dot"]} ${styles["dot1"]}`}></span>
        </div>
        <div className={styles["back"]}>
          <span className={`${styles["dot"]} ${styles["dot1"]}`}></span>
          <span className={`${styles["dot"]} ${styles["dot2"]}`}></span>
        </div>
        <div className={styles["right"]}>
          <span className={`${styles["dot"]} ${styles["dot1"]}`}></span>
          <span className={`${styles["dot"]} ${styles["dot2"]}`}></span>
          <span className={`${styles["dot"]} ${styles["dot3"]}`}></span>
        </div>
        <div className={styles["left"]}>
          <span className={`${styles["dot"]} ${styles["dot1"]}`}></span>
          <span className={`${styles["dot"]} ${styles["dot2"]}`}></span>
          <span className={`${styles["dot"]} ${styles["dot3"]}`}></span>
          <span className={`${styles["dot"]} ${styles["dot4"]}`}></span>
        </div>
        <div className={styles["top"]}>
          <span className={`${styles["dot"]} ${styles["dot1"]}`}></span>
          <span className={`${styles["dot"]} ${styles["dot2"]}`}></span>
          <span className={`${styles["dot"]} ${styles["dot3"]}`}></span>
          <span className={`${styles["dot"]} ${styles["dot4"]}`}></span>
          <span className={`${styles["dot"]} ${styles["dot5"]}`}></span>
        </div>
        <div className={styles["bottom"]}>
          <span className={`${styles["dot"]} ${styles["dot1"]}`}></span>
          <span className={`${styles["dot"]} ${styles["dot2"]}`}></span>
          <span className={`${styles["dot"]} ${styles["dot3"]}`}></span>
          <span className={`${styles["dot"]} ${styles["dot4"]}`}></span>
          <span className={`${styles["dot"]} ${styles["dot5"]}`}></span>
          <span className={`${styles["dot"]} ${styles["dot6"]}`}></span>
        </div>
      </div>
    </section>
  );
});

RollDice.displayName = "RollDice";
export default RollDice;
