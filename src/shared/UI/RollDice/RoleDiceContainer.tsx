import React, { useState, useRef, useEffect } from "react";
import styles from "./styles/roll-dice.module.scss";
import RollDice from "./RollDice";
import { EQuickGameStore, IRoleDiceStore } from "../../../store/quick-game/quick-game.type";
import { RESET_ROLL_DICE_QG } from "../../../store/quick-game/quick-game";
import { useStoreon } from "storeon/react";

interface IProps {
  onClick: () => void;
}

type StateStore = {
  [EQuickGameStore.ROLE_DICE_STORE]: IRoleDiceStore;
};
type EventStore = {
  [RESET_ROLL_DICE_QG]: void;
};

const RollDiceContainer: React.FC<IProps> = ({
  onClick,
}) => {
  const { [EQuickGameStore.ROLE_DICE_STORE]: roleDiceStore, dispatch } =
    useStoreon<StateStore, EventStore>(EQuickGameStore.ROLE_DICE_STORE);
  const [ isClick, setIsClick ] = useState<boolean>(false);
  const cube1 = useRef<HTMLDivElement>(null);
  const cube2 = useRef<HTMLDivElement>(null);
  const rotation1 = useRef({ x: 0, y: 0 });
  const rotation2 = useRef({ x: 0, y: 0 });

  console.log({ roleDiceStore })
  const rotateDice = (r1: number, r2: number) => {
    const faceRotationMap: Record<number, [number, number]> = {
      1: [0, 0],
      2: [0, 180],
      3: [0, -90],
      4: [0, 90],
      5: [-90, 0],
      6: [90, 0],
    };

    const spins = 360 * 4;

    const [x1, y1] = faceRotationMap[r1];
    const [x2, y2] = faceRotationMap[r2];

    rotation1.current.x += spins + x1;
    rotation1.current.y += spins + y1;

    rotation2.current.x += spins + x2;
    rotation2.current.y += spins + y2;

    if (cube1.current) {
      cube1.current.style.transition = "transform 2.5s ";
      cube1.current.style.transform = `
      rotateX(${rotation1.current.x}deg)
      rotateY(${rotation1.current.y}deg)
    `;
    }

    if (cube2.current) {
      cube2.current.style.transition = "transform 2.5s ";
      cube2.current.style.transform = `
      rotateX(${rotation2.current.x}deg)
      rotateY(${rotation2.current.y}deg)
    `;
    }
  };

  // Запускаем анимацию через 2 секунды после загрузки
  useEffect(() => {
    if (roleDiceStore.rd1 === 0 || roleDiceStore.rd2 === 0) return;
      setIsClick(true);
      rotateDice(roleDiceStore.rd1, roleDiceStore.rd2);
    return () => {
      dispatch(RESET_ROLL_DICE_QG);
    };
    // eslint-disable-next-linerotateDice
  }, [roleDiceStore.rd1, roleDiceStore.rd2, dispatch]);

  return (
    <section
      className={styles["container__wrap"]}
      style={{
        width: "100px",
        height: "100px",
        pointerEvents: isClick ? "none" : "all",
      }}
      onClick={() => {
        setIsClick(true);
        onClick();
      }}
    >
      <RollDice ref={cube1} left={-10} />
      {/* <Offset mr={10} /> */}
      <RollDice ref={cube2} left={10} />
    </section>
  );
};

export default RollDiceContainer;
