import { logo } from '../../../../../../assets';
import AutoCounter from '../../../../../../Component/AutoCounter/AutoCounter';
import Icon from '../../../../../../shared/UI/Icon/Icon';
import RollDiceContainer from '../../../../../../shared/UI/RollDice/RoleDiceContainer';
import Title from '../../../../../../shared/UI/Title/Title';
import GameInfoBoardFooterContainer from '../../FooterGIB/GameInfoBoardFooterContainer';
import ContainerInfoTwoColumnGIB from '../../components/UI/ContainerGIB/ContainerInfoTwoColumnGIB';
import styles from '../../styles/gib.module.scss';
import React from 'react';
import { useWindowWidth } from '../../../../../../hooks/useWindowWidth';
import { Button, Offset } from '../../../../../../shared/UI';
import ContainerGIB from '../../components/UI/ContainerGIB/ContainerGIB';
import ContainerHeaderTimerGIB from '../../components/UI/ContainerGIB/ContainerHeaderTimerGIB';
import ContainerOneBtn from '../../components/UI/ControllerGIB/ContainerOneBtn';
import ContainerInfoBodyGIB from '../../components/UI/ContainerGIB/ContainerInfoBodyGIB';
import ContainerInfoGIB from '../../components/UI/ContainerGIB/ContainerInfoGIB';
import ContainerRollGIB from '../../components/UI/ContainerGIB/ContainerRollGIB';

interface IMoveBoardQGProps {
	onMove: (params: any) => void;
	title?: string;
	titleBtn?: string;
	action: string;
	timeEndMove: number;
}

export const MoveBoardQG: React.FC<IMoveBoardQGProps> = ({
	onMove,
	action,
	title = 'Время вашего хода',
	titleBtn = 'Походить',
	timeEndMove,
}: IMoveBoardQGProps) => {
  const {isMobile} = useWindowWidth();
	  const [ isClick, setIsClick ] =  React.useState(false); 
    
    const handleClickMove = () => {
      onMove({
        action,
      });
      setIsClick(true);
      setTimeout(()=>setIsClick(false),1000);
    }
	return (
    <ContainerGIB name='MoveBoardQG'>
      {/* header */}
      {title ? (
        <>
          {!isMobile  && <Offset mt={30} />}
          {/* -container--timer */}
          <ContainerHeaderTimerGIB > 
            <Title className={styles["gib__title"]} title={title} />
            <div>
              (
              <AutoCounter
                disabled={false}
                counter={timeEndMove}
                callback={() => {}}
                />{" "}
              сек.)
            </div>
          </ContainerHeaderTimerGIB>
        </>
      ) : (
        !isMobile && <Offset mt={30} />
      )}
      {/* btn */}
      <ContainerOneBtn>
        <Offset mt={10} />
        <Button
          p={[10,30]}
          type="fill"
          fillColor="#726CED"
          disabled={isClick}
          onClick={handleClickMove}
        >
          {titleBtn}
        </Button>
      </ContainerOneBtn>
      <ContainerInfoTwoColumnGIB></ContainerInfoTwoColumnGIB>

      <Offset mt={10} />
      {/* body */}
      <ContainerInfoBodyGIB
        style={{ background: "#E9ECFF" }}
        // className={styles["gib__body-container"]}
      >
        <ContainerInfoGIB>
          <Icon src={logo} width={[0, 200]} height={"100%"}/>
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
      <GameInfoBoardFooterContainer 
      // style={{ width: 'calc(100% - 30px)', margin: '0 15px'}}
      />

      <Offset mt={10} />
    </ContainerGIB>
  );
};
