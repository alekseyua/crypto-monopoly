//App.js
import React, { useState, useRef, useCallback } from "react";
import styles from './styles/roll-dice.module.scss';
import RollDice from "./RollDice";

interface IProps {
  roleDice1: number;
  roleDice2: number;
  onClick: () => void;
}

const RollDiceContainer: React.FC<IProps> = ({
  roleDice1,
  roleDice2,
  onClick,
}) => {
  const cube1 = useRef<HTMLDivElement>(null);
  const cube2 = useRef<HTMLDivElement>(null);
  const [role1] = useState<number>(roleDice1);
  const [role2] = useState<number>(roleDice2);

  // Assigning 0 to randomSize to the array
  const handleClickDice = useCallback(
    function (e: React.MouseEvent<HTMLElement>) {
      const faceRotationMap: Record<number, [number, number]> = {
        1: [0, 0], // front
        2: [0, 180], // back
        3: [0, -90], // right
        4: [0, 90], // left
        5: [-90, 0], // top
        6: [90, 0], // bottom
      };
      const [rotateX1, rotateY1] = faceRotationMap[role1];
      const [rotateX2, rotateY2] = faceRotationMap[role2];

      // Добавим лишние обороты для реалистичного вращения
      const extraSpinsX = 360 * 3; // 3 оборота
      const extraSpinsY = 360 * 3;

      if (cube1.current) {
        cube1.current.style.transition = "transform 3s ease-in-out";
        cube1.current.style.transform = `rotateX(${
          rotateX1 + extraSpinsX
        }deg) rotateY(${rotateY1 + extraSpinsY}deg)`;
        cube1.current.style.webkitTransform = `rotateX(${
          rotateX1 + extraSpinsX
        }deg) rotateY(${rotateY1 + extraSpinsY}deg)`;
      }
      if (cube2.current) {
        cube2.current.style.transition = "transform 3s ease-in-out";
        cube2.current.style.transform = `rotateX(${
          rotateX2 + extraSpinsX
        }deg) rotateY(${rotateY2 + extraSpinsY}deg)`;
        cube2.current.style.webkitTransform = `rotateX(${
          rotateX2 + extraSpinsX
        }deg) rotateY(${rotateY2 + extraSpinsY}deg)`;
      }
      onClick && onClick();
    },
    [role1, role2]
  );

  return (
    <section
      className={styles["container__wrap"]}
      style={{
        width: "100px",
        height: "100px",
      }}
      onClick={handleClickDice}
    >
      <RollDice ref={cube1} />
      <RollDice ref={cube2} />
    </section>
  );
};

export default RollDiceContainer;
