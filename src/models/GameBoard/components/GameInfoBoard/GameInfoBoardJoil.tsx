import { currency2White, RightArrowIcon } from '../../../../assets';
import { Button } from '../../../../shared/UI';
import Icon from '../../../../shared/UI/Icon/Icon';
import styles from './styles/gib.module.scss';
import React from 'react';
import { InfoBoardLabel } from './UI/Label/info-board-label';
import AutoCounter from '../../../../Component/AutoCounter/AutoCounter';
import GameInfoBoardFooterContainer from '../GameInfoBoardFooter/GameInfoBoardFooterContainer';
import Title from '../../../../shared/UI/Title/Title';

interface IGameInfoBoardJoilProps {
	labelColors?: string[];
	labelTextColors?: string[];
	wait?: boolean;
	buy_or_auction_card?: boolean;
	actions: { [key: string]: boolean }
	numberField?: number;
	card_cost?: number;
	game_id: number;
	card_id: number;
	dataCard: any //IDataContainer;
	handleCard?: ({ game_id, card_id, action }: { action: string; game_id: number, card_id: number }) => void;
}

export const GameInfoBoardJoil: React.FC<IGameInfoBoardJoilProps> = ({
	labelColors = ['transparent', '#65B99E'],
	labelTextColors = ['#000000', '#ffffff'],
	wait,
	buy_or_auction_card,
	numberField,
	card_cost,
	game_id,
	card_id,
	dataCard,
	handleCard,
	actions,
}: IGameInfoBoardJoilProps) => {

	const handlePayFreedom = function () {
		handleCard && handleCard({
			action: 'pay_for_freedom',
			game_id,
			card_id,
		})
	}

	const handleThrowDice = function () {
		handleCard && handleCard({
			action: 'roll_the_dice',
			game_id,
			card_id,
		});
	}
	const handleUseFreedomCard = function () {
		handleCard && handleCard({
			action: 'freedom_card',
			game_id,
			card_id,
		});
	}

	return (
		<div className={styles['gib__container']}>
			<div className={styles['gib-bg']}>
				{/* header */}
				<div className={styles['gib__header']}>
					<Title
						className={styles['gib__title']}
						title={'Вы в тюрме.'}
						tag='h3'
					/>
					<div className={styles['gib__btns-container']}>
						<Button
							disabled={!actions.pay_for_freedom}
							onClick={handlePayFreedom}>
							Заплатить за освобождение
						</Button>
						<Button
							disabled={!actions.roll_the_dice}
							onClick={handleThrowDice} type='outline'>
							Кинуть кубики
						</Button>
					</div>
					<Button
						disabled={!actions.freedom_card}
						onClick={handleUseFreedomCard} type='outline'>
						Использовать "Карта свободы"
					</Button>
				</div>
				<div style={{ background: '#E9ECFF' }} className={styles['gib__cards-info-container']}>
					{/* body */}

					<div className={styles['gib__cards-info-container-wrap']}>
						{/* <div className={styles['gib__info-card-label']}>
							<InfoBoardLabel labelColor={labelColors[0]}>
								<p
									style={{ color: labelTextColors[0] }}
									className={styles['gib__info-card-label-city-name']}
								>
									{dataCard?.name}
								</p>
							</InfoBoardLabel>
						</div>
						<div className={styles['gib__info-card-info-container']}>
							<div className={styles['gib__info-card-info-title']}>
								<p>Характеристики карты</p>
							</div>
							<div className={styles['gib__info-card-info-desc-container']}>

								<InfoBoardLabel>
									<div className={styles['gib__info-card-info-desc-label']}>
										<p>Налог</p>
										<p>{dataCard?.one_card_tax}<Icon className={styles['gib__currency']} src={currency2White} /></p>
									</div>
								</InfoBoardLabel>
								<InfoBoardLabel>
									<div className={styles['gib__info-card-info-desc-label']}>
										<p>С коллекцией</p>
										<p>{dataCard?.monopoly_tax}<Icon className={styles['gib__currency']} src={currency2White} /></p>
									</div>
								</InfoBoardLabel>
							</div>
						</div> */}
					</div>

					{/* footer */}
					<GameInfoBoardFooterContainer />


				</div>
			</div>

		</div>
	);
};
