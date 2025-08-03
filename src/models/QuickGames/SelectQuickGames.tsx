import { plus, StonksIcon, ThreeDots } from '../../assets';
import AutoCounter from '../../Component/AutoCounter/AutoCounter';
import { autoRefuseTimer } from '../../helpers/helper';
import { Label, WrapperCard } from '../../shared/UI';
import Icon from '../../shared/UI/Icon/Icon';
import { IProfile } from '../../store/profile/profile.d';
import { GameRoom } from './components';
import cls from './quick-games.module.css';

interface ISelectQGs {
	profile: IProfile;
	listGame: [];
	handleClickJoinGame: any;
	handlerClickCreateGame: any;
}

export const SelectQGs: React.FC<ISelectQGs> = ({
	profile,
	listGame,
	handleClickJoinGame,
	handlerClickCreateGame
}: ISelectQGs) => {
	return (
		<section className={cls.quickGameSection}>
			<WrapperCard className={cls.allRoomsCard}>
				<div className={cls.quickGamesHeader}>
					<div className={cls.flex}>
						<Label type={'gradient'} text={'Свободные комнаты' + 'version deploy 10.10'} />
						<Label 
							className={cls.filtersMenu}
							text={'Своя'} onClick={handlerClickCreateGame} 
							iconRight={<Icon src={plus} />}
						/>
					</div>
					<div className={cls.flex}>
						<Label
							className={cls.filtersMenu}
							text={`
								<p>
									Количество игроков
								</p>`
							}
							iconRight={<Icon src={StonksIcon} />}
						/>
						<Label
							className={cls.filtersMenu}
							text={`
								<p>
									Ставка на игру
								</p>`
							}
							iconRight={<Icon src={ThreeDots} />}
						/>
						<Label
							className={cls.filtersMenu}
							text={`
								<p>
									Баланс в игре
								</p>`
							}
							iconRight={<Icon src={ThreeDots} />}
						/>
					</div>
				</div>
				<div className={cls.allGames}>
					{						
						!!listGame.length ? listGame?.map((game: any) => (
							<GameRoom
								key={game?.id}
								idRoom={game?.id}
								gameName={game?.name} // отсутвствует название игры
								gameBalance={game?.start_money}
								gameBet={game?.bet_amount}
								playersCount={+game?.max_players}
								players={game?.players}
								profile={profile}
								handleClickJoinGame={handleClickJoinGame}
							/>
						)) :
						<p>Нет доступных игр</p>
					}				
				</div>
			</WrapperCard>
		</section>
	);
};
