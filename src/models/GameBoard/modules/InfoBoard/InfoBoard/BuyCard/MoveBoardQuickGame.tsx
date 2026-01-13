import { logo } from '../../../../../../assets';
import AutoCounter from '../../../../../../Component/AutoCounter/AutoCounter';
import Icon from '../../../../../../shared/UI/Icon/Icon';
import RollDiceContainer from '../../../../../../shared/UI/RollDice/RoleDiceContainer';
import Title from '../../../../../../shared/UI/Title/Title';
import FooterInfoBoardContainer from '../../FooterInfoBoard/FooterInfoBoardContainer';
import ContainerInfoTwoColumnGIB from '../../components/UI/ContainerGIB/ContainerInfoTwoColumnGIB';
import styles from '../../styles/gib.module.scss';
import React, { useCallback, useEffect } from 'react';
import { useWindowWidth } from '../../../../../../hooks/useWindowWidth';
import { Button, Offset } from '../../../../../../shared/UI';
import ContainerGIB from '../../components/UI/ContainerGIB/ContainerGIB';
import ContainerHeaderTimerGIB from '../../components/UI/ContainerGIB/ContainerHeaderTimerGIB';
import ContainerOneBtn from '../../components/UI/ControllerGIB/ContainerOneBtn';
import ContainerInfoBodyGIB from '../../components/UI/ContainerGIB/ContainerInfoBodyGIB';
import ContainerInfoGIB from '../../components/UI/ContainerGIB/ContainerInfoGIB';
import ContainerRollGIB from '../../components/UI/ContainerGIB/ContainerRollGIB';
import { temporaryDisableBtn } from '../../../../../../helpers/helper';
import { useStoreon } from 'storeon/react';
import { SET_ROLL_DICE_QG } from '../../../../../../store/quick-game/quick-game';

interface IMoveBoardQGProps {
  onMove: (params: any) => void;
  title?: string;
  titleBtn?: string;
  action: string;
  timeEndMove: number;
  status?: string;
}
type StateStore = {
};
type EventStore = {
  [SET_ROLL_DICE_QG]: {
    rd1: number;
    rd2: number;
  };
};

export const MoveBoardQG: React.FC<IMoveBoardQGProps> = ({
  onMove,
  action,
  title = 'Время вашего хода',
  titleBtn = 'Походить',
  timeEndMove,
  status,
}: IMoveBoardQGProps) => {
  const { isMobile } = useWindowWidth();
  const { dispatch } =
    useStoreon<StateStore, EventStore>(); 
  const [isClickBtn, setIsClickBtn] = React.useState(false);
  const [hideBtn, setHideBtn] = React.useState(false);
  const getRandomNumber = () => {
    const num = Math.floor(Math.random() * (6 - 1 + 1)) + 1;
    return num;
  }

  const handleClickMove = useCallback(() => {
    dispatch(SET_ROLL_DICE_QG, {
      rd1: getRandomNumber(),
      rd2: getRandomNumber(),
    });
    onMove({
      action,
    });
    if (action === 'move' || action === 'end_move') {
      temporaryDisableBtn(15000, setHideBtn);
    }
    temporaryDisableBtn(15000, setIsClickBtn);
  },[action, onMove, dispatch]);

  useEffect(() => {
    console.log({ status });
    if (status === 'double_move') {
      setIsClickBtn(false);
      setHideBtn(false);
    }
  }, [status]);

  return (
    <ContainerGIB name='MoveBoardQG'>
      {/* header */}
      {title ? (
        <>
          {!isMobile && <Offset mt={30} />}
          {/* -container--timer */}
          <ContainerHeaderTimerGIB >
            <Title className={styles["gib__title"]} title={title} />
            <div>
              (
              <AutoCounter
                disabled={false}
                counter={timeEndMove}
                callback={() => { }}
              />{" "}
              сек.)
            </div>
          </ContainerHeaderTimerGIB>
        </>
      ) : (
        !isMobile &&
        <Offset mt={30} />
      )}
      {/* btn */}
      <ContainerOneBtn>
        <Offset mt={10} />
        {!hideBtn ? <Button
          p={[10, 30]}
          type="fill"
          fillColor="#726CED"
          disabled={isClickBtn}
          onClick={handleClickMove}
        >
          {titleBtn}
        </Button>
          : <Button
            p={[10, 30]}
            type="fill"
            fillColor="transparent"
            borderColor='transparent'
          >
            {'loading ...'}
          </Button>
        }
      </ContainerOneBtn>
      <ContainerInfoTwoColumnGIB></ContainerInfoTwoColumnGIB>

      <Offset mt={10} />
      {/* body */}
      <ContainerInfoBodyGIB
        style={{ background: "#E9ECFF" }}
      >
        <ContainerInfoGIB
          // style={{position: 'absolute'}}
          style={{ padding: 20 }}
        >
          <Icon src={logo} width={[0, 200]} height={"90%"}
            style={{ position: 'relative' }} />
        </ContainerInfoGIB>
        {action === "move" && (
          <ContainerRollGIB>
            <RollDiceContainer
              onClick={handleClickMove}
            />
          </ContainerRollGIB>
        )}
      </ContainerInfoBodyGIB>
      <Offset mt={10} />
      {/* footer */}
      <FooterInfoBoardContainer
      />

      <Offset mt={10} />
    </ContainerGIB>
  );
};
