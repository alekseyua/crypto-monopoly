import { currency2White, RightArrowIcon } from '../../../../assets';
import { Button } from '../../../../shared/UI';
import Icon from '../../../../shared/UI/Icon/Icon';
import styles from './styles/gib.module.scss';
import React from 'react';
import { InfoBoardLabel } from './UI/Label/info-board-label';
import { autoRefuseTimer } from '../../../../helpers/helper';
import AutoCounter from '../../../../Component/AutoCounter/AutoCounter';
import Title from '../../../../shared/UI/Title/Title';
import GameInfoBoardFooterContainer from '../GameInfoBoardFooter/GameInfoBoardFooterContainer';

interface IGameInfoBoardPayTaxOrAddCardChanceProps {
	game_id: number;
	card_id: number;
	actions: { [key: string]: boolean }
	handleCard?: ({ game_id, card_id, action }: { action: string, game_id: number, card_id?: number, chance?: boolean }) => void;
}

export const GameInfoBoardPayTaxOrAddCardChance: React.FC<IGameInfoBoardPayTaxOrAddCardChanceProps> = ({
	game_id,
	card_id,
	handleCard,
	actions,
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
	const getPriceTaxesFromHouses = (amountHouses: number, listHouses: []): {
		price: number;
		name: string;
	} => {
		if (!!!listHouses) return {
			price: 0,
			name: 'Недопустимое количество домов',
		};
		if ((amountHouses < 1 || amountHouses > listHouses.length)) {
			return {
				price: 0,
				name: 'Недопустимое количество домов',
			};
		}
		// Получаем цену для указанного количества домов
		const element = listHouses[--amountHouses];
		const keyElement = Object.keys(element)[0];
		return {
			price: element[keyElement],
			name: `${keyElement} ${keyElement === 'hotel' ? '' : keyElement === 1 + '' ? 'дом' : 'домами'}`,
		};
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
					<div className={styles['gib__btns-container']}>
						<Button disabled={!actions.pay} onClick={handlePayTax} type='outline'> Оплатить (Автоотказ {<AutoCounter counter={30} callback={handlePayTax} />})</Button>
						<Button disabled={!actions.add_card} onClick={handleGetChance}>Получить карту шанса</Button>
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
