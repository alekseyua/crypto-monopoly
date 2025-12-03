import { useStoreon } from 'storeon/react';
import { logo } from '../../../../../../assets';
import AutoCounter from '../../../../../../Component/AutoCounter/AutoCounter';
import Icon from '../../../../../../shared/UI/Icon/Icon';
import RollDiceContainer from '../../../../../../shared/UI/RollDice/RoleDiceContainer';
import Title from '../../../../../../shared/UI/Title/Title';
import GameInfoBoardFooterContainer from '../../FooterGIB/GameInfoBoardFooterContainer';
import ContainerInfoTwoColumnGIB from '../../UIContainerGIB/InfoGIB/ContainerInfoTwoColumnGIB';
// import styles from '../../styles/gib.module.scss';
import styles from '../../../GameInfoBoard/styles/old-gib.module.scss'
import React from 'react';
import { useWindowWidth } from '../../../../../../hooks/useWindowWidth';
import { IPlayer } from '../../../../../../store/quick-game/quick-game.d';
import { Button, Offset } from '../../../../../../shared/UI';

interface IMoveBoardQGProps {
	onMove: (params: any) => void;
	title?: string;
	titleBtn?: string;
	action: string;
	timeEndMove: number;
}

type EventsStore = null;

type StateStore = {
  dataPlayerQG: IPlayer;
};


export const MoveBoardQG: React.FC<IMoveBoardQGProps> = ({
	onMove,
	action,
	title = 'Время вашего хода',
	titleBtn = 'Походить',
	timeEndMove,
}: IMoveBoardQGProps) => {
    const width = useWindowWidth();
    const isMobile = width < 992;
	  const [ isClick, setIsClick ] =  React.useState(false); 
    const { dataPlayerQG } = useStoreon<StateStore, EventsStore>(
      "dataPlayerQG",
    );
    
    const handleClickMove = () => {
      onMove({
        action,
      });
      setIsClick(true);
      setTimeout(()=>setIsClick(false),1000);
    }
	return (
    <div className={styles["gib__container"]} data-name='MoveBoardQG'>
      {/* header */}
      {title ? (
        <>
          {!isMobile  && <Offset mt={30} />}
          {/* -container--timer */}
          <div className={styles["gib__header-container--timer"]} style={{width: '100%'}}> 
            <Title className={styles["gib__title"]} title={title} />
            (
            <AutoCounter
              disabled={false}
              counter={timeEndMove}
              callback={() => {}}
            />{" "}
            сек.)
          </div>
        </>
      ) : (
        !isMobile && <Offset mt={30} />
      )}
      {/* btn */}
      <div className={styles["gib__btns-container--btn-one"]}>
        <Button
          disabled={isClick}
          onClick={handleClickMove}
        >
          {titleBtn}
        </Button>
      </div>
      <ContainerInfoTwoColumnGIB></ContainerInfoTwoColumnGIB>

      <Offset mt={10} />
      {/* body */}
      <div
        style={{ background: "#E9ECFF" }}
        className={styles["gib__body-container"]}
      >
        <div className={styles["gib__body-container-wrap--full"]}>
          <Icon src={logo} width="100%" height="100%" />
        </div>
        {action === "move" && (
          <div
            style={{
              width: "100%",
              height: "100%",
              position: "absolute",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <RollDiceContainer
              roleDice1={dataPlayerQG.dice_roll_1}
              roleDice2={dataPlayerQG.dice_roll_2}
              onClick={handleClickMove}
            />
          </div>
        )}
      </div>
      <Offset mt={10} />
      {/* footer */}
      <GameInfoBoardFooterContainer style={{ width: 'calc(100% - 30px)', margin: '0 15px'}}/>

      <Offset mt={10} />
    </div>
  );
};
