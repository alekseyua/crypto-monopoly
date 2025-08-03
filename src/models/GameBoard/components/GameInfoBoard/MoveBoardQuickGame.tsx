import { logo, RightArrowIcon } from '../../../../assets';
import { Button, Offset } from '../../../../shared/UI';
import Icon from '../../../../shared/UI/Icon/Icon';
import Title from '../../../../shared/UI/Title/Title';
import { GameInfoBoardCorners } from '../../UI/GameInfoBoardCorners/GameInfoBoardCorners';
import GameInfoBoardFooterContainer from '../GameInfoBoardFooter/GameInfoBoardFooterContainer';
import styles from './styles/gib.module.scss';
import { InfoBoardLabel } from './UI/Label/info-board-label';

interface IMoveBoardQGProps {
	onMove: (params: any) => void;
	title?: string;
	titleBtn?: string;
	action: string;
}

export const MoveBoardQG: React.FC<IMoveBoardQGProps> = ({
	onMove,
	action,
	title = 'Время вашего хода',
	titleBtn = 'Походить',
}: IMoveBoardQGProps) => {
	return (
		<div className={styles['gib__container']}>
			{/* header */}
			{title ?
				<div className={styles['gib__header-container']}>
					<Offset mt={30} />
					<Title
						className={styles['gib__title']}
						title={title}
					/>
				</div>
				: <Offset mt={30} />
			}
			{/* btn */}
			<div className={styles['gib__btns-container--btn-one']}>
				<Button onClick={() => onMove({
					action,
				})}>{titleBtn}</Button>
			</div>

			<Offset mt={10} />
			{/* body */}
			<div style={{ background: '#E9ECFF' }} className={styles['gib__body-container']}>
				<div className={styles['gib__body-container-wrap--full']}>
					<Icon
						src={logo}
						width='100%'
						height='100%'
					/>

				</div>
			</div>
			<Offset mt={10} />
			{/* footer */}

			<GameInfoBoardFooterContainer />

			<Offset mt={10} />

		</div>
	);
};
