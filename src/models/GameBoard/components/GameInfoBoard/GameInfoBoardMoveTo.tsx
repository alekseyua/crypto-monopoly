import React from "react";
import { logo, RightArrowIcon } from "../../../../assets";
import { temporaryDisableBtn } from "../../../../helpers/helper";
import { Button, Offset } from "../../../../shared/UI";
import Icon from "../../../../shared/UI/Icon/Icon";
import Title from "../../../../shared/UI/Title/Title";
import GameInfoBoardFooterContainer from "../GameInfoBoardFooter/GameInfoBoardFooterContainer";
import styles from "./styles/gib.module.scss";

interface IGameInfoBoardMoveToProps {
  labelColors?: string[];
  labelTextColors?: string[];
  moveTo?: any;
  game_id: number;
  handleMoveTo: (params: any) => void;
}
export const GameInfoBoardMoveToMoveTo: React.FC<IGameInfoBoardMoveToProps> = ({
  labelColors = ["transparent", "#65B99E"],
  labelTextColors = ["#000000", "#ffffff"],
  moveTo,
  game_id,
  handleMoveTo,
}: IGameInfoBoardMoveToProps) => {
  const [isClick, setIsClick] = React.useState(false);
  return (
    <div className={styles["gib__container"]}>
      <Icon
        src={logo}
        width="100%"
        height="100%"
        className={styles["gib__background-logo"]}
      />
      <div className={styles["gib-bg"]}>
        {/* header */}
        <div className={styles["gib__header"]}>
          <Title
            className={styles["gib__title"]}
            title={"Вам выпал переход на " + moveTo.name}
            tag="h3"
          />
          <Offset mt={10} />
          <div className={styles["gib__btns-container--btn-one"]}>
            <Button
              disabled={isClick}
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
          </div>
          <Offset mt={10} />
        </div>
        {/* body */}

        <div
          style={{ background: "#E9ECFF" }}
          className={styles["gib__body-container"]}
        ></div>
        <GameInfoBoardFooterContainer />
      </div>
    </div>
  );
};
