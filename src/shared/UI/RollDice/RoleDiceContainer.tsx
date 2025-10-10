import React, { useState, useRef, useCallback, useEffect } from "react";
import styles from "./styles/roll-dice.module.scss";
import RollDice from "./RollDice";
import { IRoleDiceStore } from "../../../store/quick-game/quick-game.d";
import { RESET_ROLL_DICE_QG } from "../../../store/quick-game/quick-game";
import { useStoreon } from "storeon/react";

interface IProps {
  roleDice1: number;
  roleDice2: number;
  onClick: () => void;
}

type StateStore = {
  roleDiceStore: IRoleDiceStore;
};
type EventStore = {
  [RESET_ROLL_DICE_QG]: void;
};

const RollDiceContainer: React.FC<IProps> = ({
  roleDice1,
  roleDice2,
  onClick,
}) => {
  const { roleDiceStore, dispatch } = useStoreon<StateStore, EventStore>("roleDiceStore");
  const cube1 = useRef<HTMLDivElement>(null);
  const cube2 = useRef<HTMLDivElement>(null);

  const [role1, setRole1] = useState<number>(6);
  const [role2, setRole2] = useState<number>(6);

  const rotateDice = useCallback(
    (r1: number, r2: number) => {
      const faceRotationMap: Record<number, [number, number]> = {
        1: [0, 0],
        2: [0, 180],
        3: [0, -90],
        4: [0, 90],
        5: [-90, 0],
        6: [90, 0],
      };
      const [rotateX1, rotateY1] = faceRotationMap[r1];
      const [rotateX2, rotateY2] = faceRotationMap[r2];

      const extraSpinsX = 360 * 3;
      const extraSpinsY = 360 * 3;

      if (cube1.current) {
        cube1.current.style.transition = "transform 5s ease-in-out";
        cube1.current.style.transform = `rotateX(${
          rotateX1 + extraSpinsX
        }deg) rotateY(${rotateY1 + extraSpinsY}deg)`;
      }
      if (cube2.current) {
        cube2.current.style.transition = "transform 5s ease-in-out";
        cube2.current.style.transform = `rotateX(${
          rotateX2 + extraSpinsX
        }deg) rotateY(${rotateY2 + extraSpinsY}deg)`;
      }

      onClick && onClick();
    },
    [onClick]
  );

  // Запускаем анимацию через 3 секунды после загрузки
  // useEffect(() => {
  //   console.log(
  //     "%cROLEDICE = " + roleDiceStore.rd1 + " : " + roleDiceStore.rd2,
  //     "color: green"
  //   );
  //   if (roleDiceStore.rd1 === 0 || roleDiceStore.rd2 === 0) return;
  //     const timer = setTimeout(() => {
  //       // setRole1(roleDice1 === 0 ? 6 : roleDice1);
  //       // setRole2(roleDice2 === 0 ? 6 : roleDice2);
  //       rotateDice(roleDiceStore.rd1, roleDiceStore.rd2);
  //     }, 3000);

  //   return () => {
  //     clearTimeout(timer);
  //     dispatch(RESET_ROLL_DICE_QG);
  //   };
  // }, [roleDiceStore.rd1, roleDiceStore.rd2, rotateDice]);
  // }, [roleDice1, roleDice2, rotateDice]);

  return (
    <section
      className={styles["container__wrap"]}
      style={{
        width: "100px",
        height: "100px",
      }}
      onClick={() => roleDiceStore.rd1 !==0 &&  roleDiceStore.rd2 !==0 && rotateDice(roleDiceStore.rd1, roleDiceStore.rd2)}
    >
      <RollDice ref={cube1} />
      <RollDice ref={cube2} />
    </section>
  );
};

export default RollDiceContainer;
