import classNames from "classnames";
import React from "react";
import { jail } from "../../../../assets";
import cls from "../../styles/game-board.module.scss";
import { IPlayer } from "../../../../store/quick-game/quick-game.type";
import PlayerSticker from "../PlayerSticker/PlayerSticker";
import { Tooltip } from "react-tooltip";

interface IJailProps {
  image_card?: string;
  name?: string;
  headerBgc?: string;
  players: IPlayer[];
  isGrayBlur?: boolean;
  isActiveCardAction: boolean;
}

const Jail: React.FC<IJailProps> = ({
  headerBgc,
  players,
  isGrayBlur = false,
  isActiveCardAction,
}: IJailProps) => {
  return (
    <div
      className={classNames({
        [cls["field"]]: true,
      })}
      style={{
        filter: isGrayBlur ? "blur(3px) grayscale(100%)" : "",
      }}
      data-tooltip-id={'noSelectJail'}
    >
      {isActiveCardAction && <Tooltip
        id={"noSelectJail"}
        place='top'
        style={{
          backgroundColor: "#D6DBF5",
          color: "#000",
          maxWidth: 200,
          zIndex: 999999,
          borderRadius: 12,
        }}
      >
        <div> Не подходящая карта </div>
      </Tooltip>}
      <div className={`${cls.cornerGradient}`}>
        <div
          style={{
            background: headerBgc,
          }}
          className={classNames({
            [cls["corner"]]: true,
            [cls["leftBottom"]]: true,
          })}
        />
      </div>
      <div className={cls["jail-grid"]}>
        <div
          className={cls["jail__player-sticker-container"]}
        >
          <div className={cls['jail__text-visited--left']}>Just</div>
          <div className={cls['jail__text-visited--bottom']}>Visiting</div>
          {players && players?.length > 0 && (
            <PlayerSticker
              countRows={2}
              reverse
              direction="right"
              players={players.filter((p: IPlayer) => !p.is_concluded)}
            />
          )}

        </div>
        <div
          className={`${cls["jail__player-sticker-concluded-container"]} ${players?.length > 0 &&
            cls["jail__player-sticker-concluded-container--isconcluded"] // пока изменил на постоянное отображение
            }`}
        >
          <img
            className={cls.jailImg}
            src={
              // image_card ??
              jail
            }
            alt="jail"
          />
          {/* <p>{name}</p> */}
          {players && players?.length > 0 && (
            <PlayerSticker
              direction="bottom"
              // reverse
              players={players.filter((p: IPlayer) => p.is_concluded)}
            />
          )}

        </div>
      </div>
    </div>
  );
};

export default Jail;
