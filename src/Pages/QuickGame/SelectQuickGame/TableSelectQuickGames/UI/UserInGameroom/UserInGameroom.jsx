import { EnterIcon, userImg } from '../../../../../../assets';
import Icon from '../../../../../../shared/UI/Icon/Icon';

import cls from './styles/user-in-gameroom.module.css';

export const UserInGameRoom = ({ 
		player, 
		idRoom, 
		profile, 
		isJoinGame,
		handleClickJoinGame,
}) => {
	if(player === profile.id) return;
	console.log({player, isJoinGame})
	return (
		<div className={cls.user} onClick={()=>!isJoinGame && handleClickJoinGame(idRoom)}>
			<div className={cls.imgCont}>
				{player?.id  ? (
					<img src={player?.avatar ? player?.avatar : userImg} alt='avatar' />
				) : (
					<Icon  src={EnterIcon}  width={26} height={26} />
				)}
			</div>
						<p>{player?.user ? player.user : 
								isJoinGame
								? ''
								: <b>Войти</b>
							}</p>
		</div>
	);
};
