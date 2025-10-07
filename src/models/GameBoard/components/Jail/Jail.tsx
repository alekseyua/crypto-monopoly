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
          className={`${cls["jail__player-sticker-concluded-container"]} ${
            players?.length > 0 &&
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


{/* <PlayerSticker
  countRows={2}
  reverse
  direction="right"
  players={[
    {
      id: 0,
      user: "",
      balance: "",
      color: "",
      is_creater: false,
      is_start_fast_game: false,
      fast_game_id: 0,
      is_start_main_game: false,
      main_game_id: null,
      properties: [],
      bankrupt: false,
      current_card: 0,
      move_number: 0,
      current_move: false,
      card_data: {},
      auction_data: {},
      choose_data: {},
      status: "waiting",
      bill_data: {
        balance: 0,
        property: 0,
        capital: 0,
        jackpot: 0,
        rank: 0,
      },
      username: "",
      move_end_time_sec: 0,
      messages: [],
      dice_roll_1: 0,
      dice_roll_2: 0,
      is_concluded: false,
    },
    {
      id: 0,
      user: "",
      balance: "",
      color: "",
      is_creater: false,
      is_start_fast_game: false,
      fast_game_id: 0,
      is_start_main_game: false,
      main_game_id: null,
      properties: [],
      bankrupt: false,
      current_card: 0,
      move_number: 0,
      current_move: false,
      card_data: {},
      auction_data: {},
      choose_data: {},
      status: "waiting",
      bill_data: {
        balance: 0,
        property: 0,
        capital: 0,
        jackpot: 0,
        rank: 0,
      },
      username: "",
      move_end_time_sec: 0,
      messages: [],
      dice_roll_1: 0,
      dice_roll_2: 0,
      is_concluded: false,
    },
    {
      id: 0,
      user: "",
      balance: "",
      color: "",
      is_creater: false,
      is_start_fast_game: false,
      fast_game_id: 0,
      is_start_main_game: false,
      main_game_id: null,
      properties: [],
      bankrupt: false,
      current_card: 0,
      move_number: 0,
      current_move: false,
      card_data: {},
      auction_data: {},
      choose_data: {},
      status: "waiting",
      bill_data: {
        balance: 0,
        property: 0,
        capital: 0,
        jackpot: 0,
        rank: 0,
      },
      username: "",
      move_end_time_sec: 0,
      messages: [],
      dice_roll_1: 0,
      dice_roll_2: 0,
      is_concluded: false,
    },
  ]}
/>; */}