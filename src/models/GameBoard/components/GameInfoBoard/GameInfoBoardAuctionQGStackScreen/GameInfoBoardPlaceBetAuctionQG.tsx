import { currency2White, RightArrowIcon } from '../../../../../assets';
import { Button, Input, Offset } from '../../../../../shared/UI';
import Icon from '../../../../../shared/UI/Icon/Icon';
import cls from '../styles/gib.module.scss';
import React from 'react';
import { InfoBoardLabel } from '../UI/Label/info-board-label';
import { getPriceTaxesFromHouses } from '../../../../../helpers/helper';
import { IGameInfoBoardAuctionQGProps } from '../types/gameInfoBoard';



export const GameInfoBoardPlaceBetAuctionQG: React.FC<IGameInfoBoardAuctionQGProps> = ({
	game_id,
	card_id,
	cardInfo,
	property,
	startPrice,
	handleCard,
	typeStyle = 'buy',
	highest_bid,
	highest_bidder,
	highestBidderData,
	handleChangeScreen,
}: IGameInfoBoardAuctionQGProps) => {
	const [currentBet, setCurrentBet] = React.useState<number>(highest_bid);
	// handleChangeScreen && handleChangeScreen({path: 'auction'})
	return (
		<div className={cls['gib__container']}>
			<div className={cls[typeStyle === 'buy' ? 'gib-bg' : 'gib-bg-auction']}>
				{/* header */}
				<div className={cls[typeStyle === 'buy' ? 'gib__header' : 'gib__header-auction--place-bet']}>
					<div className={cls[typeStyle === 'buy' ? 'gib__btns-container' : 'gib__btns-container-auction--place-bet']}>
						<Button>{property.card}</Button>
						<Button>{property.collection}</Button>
					</div>
				</div>

				<div className={cls['gib__cards-info-container--place-bet']}>
					{/* body */}

					<div className={cls['gib__cards-info-container-wrap]']}>

						<div className={cls['gib__info-card-info-container']}>
							<Button type='empty' className={cls['gib__info-card-info-btn-back']} onClick={() => handleChangeScreen && handleChangeScreen({ path: 'auction' })}>
								<Icon width={'10px'} height={'10px'} rotate={180} src={RightArrowIcon} />
								Назад
							</Button>
							<Offset mb={10} />

							<div className={cls['gib__info-card-info-desc-container']}>

								<Input
									wrapClassName={cls['gib__input-bet-auction']}
									placeholder='Введите вашу ставку'
									value={currentBet}
									onChange={(value) => {
										const numericValue = parseFloat(value);
										// if (!isNaN(numericValue) && numericValue >= startPrice) {
											setCurrentBet(numericValue);
										// }
										//  else {
											//    setCurrentBet(startPrice);
										// }
									}}
									type='number'
									id='input-bet-auction'
								/>
								<InfoBoardLabel borderColor='transparent'>
									<div className={cls['gib__info-card-info-desc-label--auction']}>
										Ставка должна быть не ниже начальной цены (выше &nbsp;
										
										 <span className={cls['gib__info-card-info-desc-label--auction-inline-value']}>
											{startPrice} <Icon className={cls['gib__currency']} src={currency2White} />
											</span>
											)
									</div>
								</InfoBoardLabel>
								<Button
									fillColor='#FFE4B5'
									disabled={!currentBet || currentBet < startPrice}
									className={cls['gib__btn-action-place-bet-auction']}
									onClick={() => handleCard && handleCard({
										action: 'bid_auction',
										game_id,
										card_id,
										bid: currentBet
									})
									}
								>
									<div className={cls['gib__info-card-info-desc-label--auction']}>
										Сделать ставку
									</div>
									<span className={cls['gib__info-card-info-desc-label--auction-inline-value']}>
											{currentBet} <Icon className={cls['gib__currency']} src={currency2White} />
											</span>
								</Button>
								<InfoBoardLabel borderColor='transparent     '>
									<div className={cls['gib__info-card-info-desc-label']}>
										Сумма вашей ставки и комиссия будет заморожена до конца торгов
									</div>
								</InfoBoardLabel>



								<InfoBoardLabel borderColor='#FFEFD3' fillColor='#FFEFD3'>
									<div className={cls['gib__info-card-info-desc-label']}>
										<p>Правила проведения торгов</p>
									</div>
								</InfoBoardLabel>

							</div>
						</div>
					</div>

					{/* footer */}
					<div className={cls[typeStyle === 'buy' ? 'gib__info-card-footer-container' : 'gib__info-card-footer-container-auction']}>
						<div className={cls['gib__info-card-footer-btn-container']}>
							<p className={cls['gib__info-card-info-desc-label--btn']}>
								Баланс: {0}<Icon className={cls['gib__currency']} src={currency2White} />
							</p>
							<p className={cls['gib__info-card-info-desc-label--btn']}>
								Капитал: {0}<Icon className={cls['gib__currency']} src={currency2White} />
							</p>

						</div>
						<p className={cls['gib__info-card-footer-label']}>
							Ваше место в игре: <strong>1</strong>
							{/* <Icon src={RightArrowIcon} /> */}
						</p>
					</div>

				</div>
			</div>

		</div>
	);
};
