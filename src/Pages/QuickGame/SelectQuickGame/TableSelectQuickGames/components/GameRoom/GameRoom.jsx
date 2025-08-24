import { MIcon } from '../../../../../../assets';
import { Label, WrapperCard } from '../../../../../../shared/UI';
import Icon from '../../../../../../shared/UI/Icon/Icon';
import { UserInGameRoom } from '../../UI';
import cls from './game-room.module.css';
import {use, useEffect, useState} from 'react';

export const GameRoom = ({
	players,
	idRoom,
	profile,
	gameBet,
	gameName,
	gameBalance,
	playersCount,
	handleClickJoinGame,
}) => {
	const [listPlayers, setListPlayers ] = useState([]);
	useEffect(()=>{
		setListPlayers(players);
	},[players])
	console.log({listPlayers},playersCount,
		// [...players, ...Array.from(Array(playersCount - players.length).fill(players.filter(p=>p.is_creater)[0].user)?.map((p)=>{
		// 			console.log({p})
		// 			return p
		// 		}))]
			)
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
						iconRight={<Icon src={MIcon} width={18} height={18} />}
					/>
				</div>
			</div>
			<div className={cls.roomUsers}>
				{/* {Array.from(Array(playersCount + 1 - players.length).keys())?.map((user, index) => ( */}
{/*  TODO:
	players.filter(p=>p.is_creater)[0].user .user ?????? проверка по user так как туда засунут id пользователя
*/}
				{listPlayers.length && [...listPlayers, ...Array.from(Array(playersCount - listPlayers.length)
					// .fill(listPlayers.filter(p=>p.is_creater)[0]?.user)
					// ?.map((p)=>{
					// 	console.log({p})
					// 	return p	
					// })	
				)]	
				?.map((player, index) => (
					 <UserInGameRoom 
					 	key={index} 
						profile={profile} 
						player={player} 
						idRoom={idRoom} 
						handleClickJoinGame={handleClickJoinGame}
						isJoinGame = {players.filter(p=>p.user === profile.id).length === 1}
					/>
				))}
				{/* {Array.from(Array(playersCount-1).keys())?.map((_, index) => <div className={cls.empPlace} key={index + playersCount}/>)} */}
			</div>
		</WrapperCard>
	);
};
