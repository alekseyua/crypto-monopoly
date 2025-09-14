import { MIcon } from '../../../../../../assets';
import { Label, WrapperCard } from '../../../../../../shared/UI';
import Icon from '../../../../../../shared/UI/Icon/Icon';
import { IPlayer } from '../../../../../../store/quick-game/quick-game.d';
import { IUser } from '../../../../../../store/users/user.d';
import { UserInGameRoom } from '../../UI';
import cls from './game-room.module.css';
import { useEffect, useState} from 'react';

interface IProps {
	players: IPlayer[];
	idRoom: number;
	user: IUser;	
	gameBet: string;
	gameName: string;
	gameBalance: number;
	playersCount: number;
	handleClickJoinGame: any;
}

export const GameRoom:React.FC<IProps> = ({
	players,
	idRoom,
	user,
	gameBet,
	gameName,
	gameBalance,
	playersCount,
	handleClickJoinGame,
}) => {
	const [listPlayers, setListPlayers] = useState<IPlayer[]>([]);
	useEffect(()=>{
		setListPlayers(players);
	},[players])

	return (
		<WrapperCard className={cls.game}>
			<div className={cls.gameHeader}>
				<h3>{gameName}</h3>
				<div className={cls.gameInfo}>
					<Label
						className={cls.gameRoomLabel}
						text={`Игроков: ${playersCount}`}
					/>
					<Label className={cls.gameRoomLabel} text={`Ставка: ${gameBet} $`} />
					<Label
						className={cls.gameRoomLabel}
						text={
							`<p>
								Баланс игрока: ${gameBalance} 
							</p>`
						}
						iconRight={<Icon src={MIcon} width={'18px'} height={'18px'} />}
					/>
				</div>
			</div>
			<div className={cls.roomUsers}>
				{listPlayers.length && [...listPlayers, ...Array.from(Array(playersCount - listPlayers.length))]	
				?.map((player: IPlayer, index: number) => (
					 <UserInGameRoom 
					 	key={index} 
						user={user} 
						player={player} 
						idRoom={idRoom} 
						handleClickJoinGame={handleClickJoinGame}
						isJoinGame = {players.filter((p: IPlayer)=>+p.user === +user.id).length === 1}
					/>
				))}
			</div>
		</WrapperCard>
	);
};
