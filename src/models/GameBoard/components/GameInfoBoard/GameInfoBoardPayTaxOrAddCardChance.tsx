import { Button, Offset } from '../../../../shared/UI';
import styles from './styles/gib.module.scss';
import React from 'react';
import AutoCounter from '../../../../Component/AutoCounter/AutoCounter';
import Title from '../../../../shared/UI/Title/Title';
import GameInfoBoardFooterContainer from '../GameInfoBoardFooter/GameInfoBoardFooterContainer';
import { IActionCard } from '../../../../store/quick-game/quick-game.d';

interface IGameInfoBoardPayTaxOrAddCardChanceProps {
	game_id: number;
	card_id: number;
	actions: IActionCard;
	handleCard?: ({ game_id, card_id, action }: { action: string, game_id: number, card_id?: number, chance?: boolean }) => void;
	timeEndMove: number;
}

export const GameInfoBoardPayTaxOrAddCardChance: React.FC<IGameInfoBoardPayTaxOrAddCardChanceProps> = ({
	game_id,
	card_id,
	handleCard,
	actions,
	timeEndMove,
}: IGameInfoBoardPayTaxOrAddCardChanceProps) => {
	const [isActionCard, setIsActionCard] = React.useState<boolean>(false);
	const handlePayTax = function () {
		!isActionCard && handleCard && handleCard({
			action: 'pay',
			game_id,
			card_id,
		});
		setIsActionCard(true);
	}
	const handleGetChance = function () {
		handleCard && handleCard({
			action: 'get_card_action',
			game_id,
			chance: true,
		})
	}

	return (
		<div className={styles['gib__container']}>
			<div className={styles['gib-bg']}>
				{/* header */}
				<div className={styles['gib__header']}>
					<Title
						className={styles['gib__title']}
						title={'Вам выпала свободная карта.'}
						tag='h3'
					/>
					<Offset mt={30} />
					<div className={styles['gib__btns-container--btn-two']}>
						<Button disabled={!actions.add_card} onClick={handleGetChance}>Получить карту шанса</Button>
						<Button disabled={!actions.pay} onClick={handlePayTax} type='outline'> Оплатить ( {<AutoCounter counter={timeEndMove} callback={()=>{}} />})</Button>
					</div>
				</div>
				{/* body */}
				<div style={{ background: 'transporent' }} className={styles['gib__body-container']}>


				</div>
				{/* footer */}
				<GameInfoBoardFooterContainer />


			</div>

		</div>
	);
};
