import React, { useState, useRef, useEffect, use } from "react";
import styles from "./styles/roll-dice.module.scss";
import RollDice from "./RollDice";
import {
  EQuickGameStore,
  IRoleDiceStore,
} from "../../../store/quick-game/quick-game.type";
import { useStoreon } from "storeon/react";
import {
  RESET_ROLL_DICE,
  SET_ANIMATION_ROLL_DICE_STARTED,
  SET_ANIMATION_ROLL_DICE_ENDED,
} from "../../../store/const";
import { delay } from "../../../helpers/helper";

interface IProps {
  onClick: () => void;
  isShake?: boolean;
}

type StateStore = {
  [EQuickGameStore.ROLE_DICE_STORE]: IRoleDiceStore;
  queueMessagesWs: any[];
};

type EventStore = {
  [RESET_ROLL_DICE]: void;
  [SET_ANIMATION_ROLL_DICE_STARTED]: boolean;
  [SET_ANIMATION_ROLL_DICE_ENDED]: void;
};

const RollDiceContainer: React.FC<IProps> = ({ onClick, isShake }) => {
  const {
    [EQuickGameStore.ROLE_DICE_STORE]: roleDiceStore,
    dispatch,
  } = useStoreon<StateStore, EventStore>(
    EQuickGameStore.ROLE_DICE_STORE
  );

  const [isClick, setIsClick] = useState(false);
  const [isShaking, setIsShaking] = useState(false);
  const cube1 = useRef<HTMLDivElement>(null);
  const cube2 = useRef<HTMLDivElement>(null);
  const shakeInterval = useRef<number | null>(null);
  const soundRef = useRef<HTMLAudioElement | null>(null);
const shakeFrame = useRef<number | null>(null);
const shakePower = useRef(1); // сила тряски
const shakeTime = useRef(0);

  useEffect(() => {
    // старт тряски
    isShake && startShake();

    const start = async () => {
      startShake();
      await delay(2000);
      stopShake();
      await delay(16);   // дать браузеру зафиксировать reset тряски
      throwDice();
      await delay(600);
      fallDice();
      await delay(200);
      rotateDice(3, 5);
      await delay(2000);
  }
  // isShake && start();
    return () => {
      stopShake();
    };
  }, [isShake]);
  // 🔀 рандомная тряска + повороты
const startShake = () => {
  setIsShaking(true);
  shakePower.current = 1;
  shakeTime.current = 0;

  const animate = () => {
    shakeTime.current += 0.1;
    shakePower.current *= 0.97; // затухание

    const baseX = Math.sin(shakeTime.current * 8) * 8 * shakePower.current;
    const baseY = Math.cos(shakeTime.current * 7) * 8 * shakePower.current;

    const rotX = Math.sin(shakeTime.current * 6) * 20 * shakePower.current;
    const rotY = Math.cos(shakeTime.current * 5) * 20 * shakePower.current;
    const rotZ = Math.sin(shakeTime.current * 9) * 10 * shakePower.current;

    [cube1.current, cube2.current].forEach((cube, index) => {
      if (!cube) return;

      const dir = index === 0 ? -1 : 1;

      cube.style.transform = `
        translate3d(${baseX * dir}px, ${baseY}px, 0)
        rotateX(${rotX}deg)
        rotateY(${rotY}deg)
        rotateZ(${rotZ}deg)
      `;
    });

    if (shakePower.current > 0.05) {
      shakeFrame.current = requestAnimationFrame(animate);
    }
  };

  shakeFrame.current = requestAnimationFrame(animate);
};

const stopShake = () => {
  setIsShaking(false);

  if (shakeFrame.current) {
    cancelAnimationFrame(shakeFrame.current);
    shakeFrame.current = null;
  }

  [cube1.current, cube2.current].forEach((cube) => {
    if (!cube) return;

    cube.style.transition = "none";
    cube.style.transform =
      "translate3d(0,0,0) rotateX(0) rotateY(0) rotateZ(0)";
  });
};

useEffect(() => {
  // startShake();
//   setInterval(async () => {
//     throwDice();
//     await delay(600);
//     fallDice();
//     await delay(200);
//     rotateDice(3, 5);
//   }, 3000);
}, []);
const throwDice = () => {
  [cube1.current, cube2.current].forEach((cube, index) => {
    if (!cube) return;

    const direction = index === 0 ? -1 : 1;

    cube.style.transition = "none";
    cube.style.transform = `
      translate3d(0, 0, 0)
      rotateX(0)
      rotateY(0)
      rotateZ(0)
    `;

    requestAnimationFrame(() => {
      cube.style.transition =
        "transform 0.6s cubic-bezier(.15,.25,.3,1.2)";
      cube.style.transform = `
        translate3d(${ -120}px, -40px, 120px)
        rotateX(${360 + Math.random() * 360}deg)
        rotateY(${360 + Math.random() * 360}deg)
      `;
    });
  });
};
// Фаза “падения с ударом”
const fallDice = () => {
  [cube1.current, cube2.current].forEach((cube) => {
    if (!cube) return;

    requestAnimationFrame(() => {
      cube.style.transition =
        "transform 0.45s cubic-bezier(.4,0,.6,1)";
      cube.style.transform = `
        translate3d(0, 0, 0)
        rotateX(${Math.random() * 90}deg)
        rotateY(${Math.random() * 90}deg)
      `;
    });
  });

};

 // 🎲 финальное вращение
  const rotateDice = (r1: number, r2: number) => {
    dispatch(SET_ANIMATION_ROLL_DICE_STARTED, true);

    const map: Record<number, [number, number]> = {
      1: [0, 0],
      2: [0, 180],
      3: [0, -90],
      4: [0, 90],
      5: [-90, 0],
      6: [90, 0],
    };

    const spins = 360 * 3;
    const [x1, y1] = map[r1];
    const [x2, y2] = map[r2];

    requestAnimationFrame(() => {
    if (cube1.current) {
      cube1.current.style.transition =
        "transform 1.6s cubic-bezier(.2,.8,.2,1)";
      cube1.current.style.transform = `
        translateZ(60px)
        rotateX(${x1 + spins}deg)
        rotateY(${y1 + spins}deg)
      `;
    }

    if (cube2.current) {
      cube2.current.style.transition =
        "transform 1.6s cubic-bezier(.2,.8,.2,1)";
      cube2.current.style.transform = `
        translateZ(60px)
        rotateX(${x2 + spins}deg)
        rotateY(${y2 + spins}deg)
      `;
    }
  });
  };

  // ▶ старт: тряска → вращение
  useEffect(() => {
    if (roleDiceStore.rd1 === 0 || roleDiceStore.rd2 === 0) return;

    const startAnimation = async () => {
      setIsClick(true);
      stopShake();
      await delay(16);   // дать браузеру зафиксировать reset тряски
      throwDice();
      await delay(600);
      fallDice();
      await delay(200);
      rotateDice(roleDiceStore.rd1, roleDiceStore.rd2);
    };

    startAnimation();

    return () => {
      dispatch(RESET_ROLL_DICE);
    };
  }, [roleDiceStore.rd1, roleDiceStore.rd2, dispatch]);

  // ▶ конец анимации
  useEffect(() => {
      // setIsShaking(true);
    const handleEnd = async () => {
      await delay(500);
      dispatch(SET_ANIMATION_ROLL_DICE_ENDED);
    };

    cube1.current?.addEventListener("transitionend", handleEnd);
    return () => {
      cube1.current?.removeEventListener("transitionend", handleEnd);
    };
  }, [dispatch]);

    // 🔊 звук
  useEffect(() => {
    // soundRef.current = new Audio("/sounds/dice-roll.mp3");
    // soundRef.current.volume = 0.6;
  }, []);

console.log({ isShaking });
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
      <RollDice
        ref={cube1}
        left={-10}
        className={isShaking ? styles.shake : ""}
      />
      <RollDice
        ref={cube2}
        left={10}
        className={isShaking ? styles.shake : ""}
      />
    </section>
  );
};

export default RollDiceContainer;

//   const cube1 = useRef<HTMLDivElement>(null);
//   const cube2 = useRef<HTMLDivElement>(null);
//   const rotation1 = useRef({ x: 0, y: 0 });
//   const rotation2 = useRef({ x: 0, y: 0 });

//   console.log({ roleDiceStore })
//   const rotateDice = (r1: number, r2: number) => {
//     const faceRotationMap: Record<number, [number, number]> = {
//       1: [0, 0],
//       2: [0, 180],
//       3: [0, -90],
//       4: [0, 90],
//       5: [-90, 0],
//       6: [90, 0],
//     };

//     const spins = 360 * 4;

//     const [x1, y1] = faceRotationMap[r1];
//     const [x2, y2] = faceRotationMap[r2];

//     rotation1.current.x += spins + x1;
//     rotation1.current.y += spins + y1;

//     rotation2.current.x += spins + x2;
//     rotation2.current.y += spins + y2;

//     if (cube1.current) {
//       cube1.current.style.transition = "transform 2.5s ";
//       cube1.current.style.transform = `
//       rotateX(${rotation1.current.x}deg)
//       rotateY(${rotation1.current.y}deg)
//     `;
//     }

//     if (cube2.current) {
//       cube2.current.style.transition = "transform 2.5s ";
//       cube2.current.style.transform = `
//       rotateX(${rotation2.current.x}deg)
//       rotateY(${rotation2.current.y}deg)
//     `;
//     }
//   };

//   // Запускаем анимацию через 2 секунды после загрузки
//   useEffect(() => {
//     if (roleDiceStore.rd1 === 0 || roleDiceStore.rd2 === 0) return;
//       setIsClick(true);
//       rotateDice(roleDiceStore.rd1, roleDiceStore.rd2);
//     return () => {
//       dispatch(RESET_ROLL_DICE_QG);
//     };
//     // eslint-disable-next-linerotateDice
//   }, [roleDiceStore.rd1, roleDiceStore.rd2, dispatch]);

//   return (
//     <section
//       className={styles["container__wrap"]}
//       style={{
//         width: "100px",
//         height: "100px",
//         pointerEvents: isClick ? "none" : "all",
//       }}
//       onClick={() => {
//         setIsClick(true);
//         onClick();
//       }}
//     >
//       <RollDice ref={cube1} left={-10} />
//       {/* <Offset mr={10} /> */}
//       <RollDice ref={cube2} left={10} />
//     </section>
//   );
// };

// export default RollDiceContainer;
