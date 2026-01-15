import { plus, StonksIcon, ThreeDots } from '../../../../assets';
import { Label, WrapperCard } from '../../../../shared/UI';
import Icon from '../../../../shared/UI/Icon/Icon';
import { IListQGs } from '../../../../store/quick-game/quick-game.type';
import { IUser } from '../../../../store/users/user';
import { GameRoom } from './components';
import cls from './quick-games.module.scss';

interface IProps {
	user: IUser;
	listGame: IListQGs[];
	handleClickJoinGame: any;
	handlerClickCreateGame: any;
	deleteGameRoom: (id: number) => void;
}

export const TableSelectQuickGames: React.FC<IProps> = ({
	user,
	listGame,
	deleteGameRoom,
	handleClickJoinGame,
	handlerClickCreateGame,
}: IProps) => {
	return (
		<section className={cls.quickGameSection}>
			<WrapperCard className={cls.allRoomsCard}>
				<div className={cls.quickGamesHeader}>
					<div className={cls.flex}>
						<Label type={'gradient'} text={'Свободные комнаты'} />
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
						!!listGame.length ? listGame?.map((game: IListQGs) => (
							<GameRoom
								key={game?.id}
								idRoom={game?.id}
								gameName={game?.name} // отсутвствует название игры
								gameBalance={game?.start_money}
								gameBet={game?.bet_amount}
								playersCount={+game?.max_players}
								players={game?.players}
								user={user}
								handleClickJoinGame={handleClickJoinGame}
								deleteGameRoom={deleteGameRoom}
							/>
						)) :
						<p>Нет доступных игр</p>
					}				
				</div>
			</WrapperCard>
		</section>
	);
};
