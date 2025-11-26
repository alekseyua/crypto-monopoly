import { EnterIcon, userImg } from "../../../../../../assets";
import Icon from "../../../../../../shared/UI/Icon/Icon";
import { IPlayer } from "../../../../../../store/quick-game/quick-game.d";
import { IUser } from "../../../../../../store/users/user.d";
import cls from "./styles/user-in-gameroom.module.css";

interface IProps {
  player: IPlayer;
  idRoom: number;
  user: IUser;
  isJoinGame: boolean;
  handleClickJoinGame: any;
}

export const UserInGameRoom: React.FC<IProps> = ({
  player,
  idRoom,
  user,
  isJoinGame,
  handleClickJoinGame,
}) => {
  if (+player === +user.id) return;
  return (
    <div
      className={cls.user}
      onClick={() => !isJoinGame && handleClickJoinGame(idRoom)}
    >
      <div className={cls.imgCont}>
        {player?.id ? (
          <img src={player?.avatar ? player?.avatar : userImg} alt="avatar" />
        ) : (
          <Icon src={EnterIcon} width={"26px"} height={"26px"} />
        )}
      </div>
      <p>{player?.username ? player.username : isJoinGame ? "" : <b>Войти</b>}</p>
    </div>
  );
};
