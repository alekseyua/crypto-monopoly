import React from "react";
import { icons, logo } from "../../../../../../assets";
import { temporaryDisableBtn } from "../../../../../../helpers/helper";
import { Button, Offset } from "../../../../../../shared/UI";
import Icon from "../../../../../../shared/UI/Icon/Icon";
import Title from "../../../../../../shared/UI/Title/Title";
// import styles from "./styles/gib.module.scss";
import GameInfoBoardFooterContainer from "../../FooterGIB/GameInfoBoardFooterContainer";
import ContainerInfoHeaderGIB from "../../UIContainerGIB/InfoGIB/ContainerInfoHeaderGIB";
import ContainerGIB from "../../UIContainerGIB/ContainerGIB";
import ContainerInfoBodyGIB from "../../UIContainerGIB/InfoGIB/ContainerInfoBodyGIB";
import ContainerOneBtn from "../../ControllerGIB/ContainerOneBtn";

interface IGameInfoBoardMoveToProps {
  moveTo?: any;
  game_id: number;
  handleMoveTo: (params: any) => void;
}
export const MoveTo: React.FC<IGameInfoBoardMoveToProps> = ({
  moveTo,
  game_id,
  handleMoveTo,
}: IGameInfoBoardMoveToProps) => {
  const [isClick, setIsClick] = React.useState(false);
  return (
    <ContainerGIB>
      <Icon src={icons.logo} width="100%" height="100%" backgroundFont />

      {/* header */}
      <ContainerInfoHeaderGIB>
        <Title title={"Вам выпал переход на " + moveTo.name} tag="h3" />
        <Offset mt={10} />
        <ContainerOneBtn>
          <Button
            disabled={isClick}
            p={10}
            onClick={() => {
              temporaryDisableBtn(2000, setIsClick);
              handleMoveTo({
                card_id: moveTo.id,
                action: "move_to",
                game_id,
              });
            }}
            // className={styles['gib__info-card-footer-btn']}
            variant={"gradient"}
          >
            Получить
          </Button>
        </ContainerOneBtn>
        <Offset mt={10} />
      </ContainerInfoHeaderGIB>
      {/* body */}

      <ContainerInfoBodyGIB
        style={{ background: "#E9ECFF" }}
      ></ContainerInfoBodyGIB>
      <Offset mt={10} />
      <GameInfoBoardFooterContainer />
    </ContainerGIB>
  );
};
