import { icons } from '../../../../assets';
import { Button, Offset } from '../../../../shared/UI';
import Icon from '../../../../shared/UI/Icon/Icon';
import Title from '../../../../shared/UI/Title/Title';
import GameInfoBoardFooterContainer from '../GameInfoBoardNew/FooterGIB/GameInfoBoardFooterContainer';
import styles from './styles/gib.module.scss';

interface IInfoChanceQGProps {
	onMove: (params: any) => void;
	title?: string;
	titleBtn?: string;
	action: string;
	content: string;
	cardIdWhereMoveTo: number | null;
}

export const InfoChanceQG: React.FC<IInfoChanceQGProps> = ({
	onMove,
	action,
	title = 'Время вашего хода',
	titleBtn = 'Походить',
	content,
	cardIdWhereMoveTo,
}: IInfoChanceQGProps) => {
	return (
		<div className={styles['gib__container']}
		style={{ background: '#E9ECFF' }}
		>
			{/* header */}
			
			{/* btn */}
			<div className={styles['gib__btns-container--btn-one--full']}>
				<Button 
					variant='gradient' 
					gradientColors={['#726CED', '#70DCF1']}
					onClick={() => onMove({
					action,
					card_id: cardIdWhereMoveTo
				})}>{titleBtn}</Button>
			</div>

			<Offset mt={10} />
			{/* body */}
			<div  className={styles['gib__body-container']}>
				<div className={styles['gib__body-container-wrap--full']}>
					{/* <Offset mt={30} /> */}
					<Title
						className={styles['gib__title']}
						title={title}
					/>
					<Icon
						src={icons.chance}
						width='100%'
						height='100%'
						style={{ position: 'absolute', top:'50%', left:' 50%', transform: 'translate(-50%, -50%) rotate(270deg) scale(2.5)',opacity: 0.5 }}
					/>
					<div className={styles['gib__content']}>
						{content}
					</div>
				</div>
			</div>
			<Offset mt={10} />
			{/* footer */}

			<GameInfoBoardFooterContainer
				bgc={'#CFD3ED4D'}
			/>

			<Offset mt={10} />

		</div>
	);
};
