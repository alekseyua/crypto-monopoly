import cls from './mobile-main-game.module.css'
import { GameBoard } from '../../models/GameBoard/GameBoard';

export const MobileMainGame = () => {
	return (
		<section className={cls.mobileGame}>
			<GameBoard />
		</section>
	);
};
