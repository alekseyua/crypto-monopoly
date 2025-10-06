import classNames from "classnames";
import React from "react";
import { jail } from "../../../../assets";
import cls from "../../styles/game-board.module.scss";
import { IPlayer } from "../../../../store/quick-game/quick-game.d";
import PlayerSticker from "../PlayerSticker/PlayerSticker";
import Text from "../../../../shared/UI/Text/Text";

interface IJailProps {
  image_card?: string;
  name?: string;
  headerBgc?: string;
  players: IPlayer[];
  isGrayBlur?: boolean;
}

const Jail: React.FC<IJailProps> = ({
  image_card,
  name,
  headerBgc,
  players,
  isGrayBlur = false,
}: IJailProps) => {
  return (
    <div
      className={classNames({
        [cls["field"]]: true,
        [cls["leftBottom"]]: true,
        // [cls["jail-grid"]]: true,
      })}
      style={{
        filter: isGrayBlur ? "blur(3px) grayscale(100%)" : "",
      }}
    >
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
          style={{ gridArea: "visited", position: "relative" }}
        >
          {players && players?.length > 0 && (
            <PlayerSticker
              reverse
              direction="right"
              players={players.filter((p: IPlayer) => !p.is_concluded)}
            />
          )}
        </div>
        <div
          className={`${cls["jail__player-sticker-concluded-container"]} ${
            players?.length > 0 &&
            cls["jail__player-sticker-concluded-container--isconcluded"]
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
              reverse
              players={players.filter((p: IPlayer) => p.is_concluded)}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default Jail;
