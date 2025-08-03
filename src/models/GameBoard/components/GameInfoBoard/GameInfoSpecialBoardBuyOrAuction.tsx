import { currency2White, RightArrowIcon } from '../../../../assets';
import { Button, Offset } from '../../../../shared/UI';
import Icon from '../../../../shared/UI/Icon/Icon';
import styles from './styles/gib.module.scss';
import React, { act } from 'react';
import { InfoBoardLabel } from './UI/Label/info-board-label';
import AutoCounter from '../../../../Component/AutoCounter/AutoCounter';
import GameInfoBoardFooterContainer from '../GameInfoBoardFooter/GameInfoBoardFooterContainer';
import Title from '../../../../shared/UI/Title/Title';

interface IGameInfoSpecialBoardBuyOrAuctionProps {
	labelColors?: string[];
	labelTextColors?: string[];
	wait?: boolean;
	buy_or_auction_card?: boolean;
	numberField?: number;
	card_cost?: number;
	game_id: number;
	card_id: number;
	dataCard: any //IDataContainer;
	actions: {[key:string]: boolean}
	handleCard?: ({ game_id, card_id, action }: { action: string; game_id: number, card_id: number }) => void;
}

export const GameInfoSpecialBoardBuyOrAuction: React.FC<IGameInfoSpecialBoardBuyOrAuctionProps> = ({
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
}: IGameInfoSpecialBoardBuyOrAuctionProps) => {
		const [ isActionCard, setIsActionCard ] = React.useState<boolean>(false);
	
	const handleBuyCard = function() {
		handleCard && handleCard({
			action: 'buy',
			game_id,
			card_id,
		})
	}

	const handleAuction = function() {
		setIsActionCard(true);
		console.log('handleAuction 2');
		handleCard && handleCard({
			action: 'start_auction',
			game_id,
			card_id,
		});
	}
// {
//     "name": "Qantas",
//     "base_cost": 200,
//     "card_type": "airline",
//     "monopoly_tax": 200,
//     "one_card_tax": 25,
//     "two_card_tax": 50,
//     "three_card_tax": 100
// }
	return (
		<div className={styles['gib__container']}>
			<div className={styles['gib-bg']}>
				{/* header */}
				<div className={styles['gib__header-container']}>
					<Title
						className={styles['gib__title']}
						title={'Вам выпала свободная карта.'}
						tag='h3'
					/>
					<Offset mt={10} />
					<div className={styles['gib__btns-container']}>
					<div className={styles['gib__btns-container--btn-two']}>
						<Button 
							disabled={!actions.buy}
							onClick={handleBuyCard}>
								Купить за {card_cost} 
								<Icon className={styles['gib__currency']} src={currency2White}/>
						</Button>
						<Button 
							disabled={!actions.auction && isActionCard}
							onClick={handleAuction} type='outline'>
							Автоотказ {<AutoCounter counter={30} disabled={isActionCard} callback={handleAuction} />}
						</Button>
					</div>
					</div>

					<Offset mt={10} />
				</div>
					{/* body */}
				<div style={{ background: '#E9ECFF' }} className={styles['gib__body-container--full']}>

					<div className={styles['gib__body-container-wrap']}>
						<div className={styles['gib__info-card-label']}>
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
						</div>
					</div>
				</div>
					<Offset mt={10} />

					{/* footer */}
									<GameInfoBoardFooterContainer />
			</div>

		</div>
	);
};
