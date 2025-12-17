import { Button, Offset } from '../../../../shared/UI';
import styles from './styles/old-gib.module.scss';
import React from 'react';
import AutoCounter from '../../../../Component/AutoCounter/AutoCounter';
import Title from '../../../../shared/UI/Title/Title';
import { CardDataDataActionsType } from '../../../../store/quick-game/quick-game.d';
import { temporaryDisableBtn } from '../../../../helpers/helper';
import GameInfoBoardFooterContainer from '../GameInfoBoardNew/FooterGIB/GameInfoBoardFooterContainer';

interface IGameInfoBoardPayTaxOrAddCardChanceProps {
	game_id: number;
	card_id: number;
	actions: CardDataDataActionsType;
	handleCard?: ({ game_id, card_id, action }: { action: string, game_id: number, card_id?: number, chance?: boolean, pay?: boolean }) => void;
	timeEndMove: number;
}

export const GameInfoBoardPayTaxOrAddCardChance: React.FC<IGameInfoBoardPayTaxOrAddCardChanceProps> = ({
	game_id,
	card_id,
	handleCard,
	actions,
	timeEndMove,
}: IGameInfoBoardPayTaxOrAddCardChanceProps) => {
	const [isClick, setIsClick] = React.useState<boolean>(false);
	const [isActionCard, setIsActionCard] = React.useState<boolean>(false);
	const handlePayTax = function () {
		temporaryDisableBtn(5000, setIsClick);
		!isActionCard && handleCard && handleCard({
			action: 'pay',
			game_id,
			card_id,
		});
		setIsActionCard(true);
	}
	const handleGetChance = function () {
		temporaryDisableBtn(5000, setIsClick);
		handleCard && handleCard({
			action: 'get_card_action',
			game_id,
			chance: true,
		})
	}

	return (
		<div className={styles['gib__container']} data-name='GameInfoBoardPayTaxOrAddCardChance'>
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
						<Button disabled={isClick || !actions.add_card} onClick={handleGetChance}>Получить карту шанса</Button>
						<Button disabled={isClick || !actions.pay} onClick={handlePayTax} type='outline'> Оплатить ( {<AutoCounter counter={timeEndMove} callback={()=>{}} />})</Button>
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
