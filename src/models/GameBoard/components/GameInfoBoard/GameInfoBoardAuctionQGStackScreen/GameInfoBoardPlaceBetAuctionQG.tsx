import { currency2White, RightArrowIcon } from '../../../../../assets';
import { Button, Input, Offset } from '../../../../../shared/UI';
import Icon from '../../../../../shared/UI/Icon/Icon';
import styles from '../styles/gib.module.scss';
import React from 'react';
import { InfoBoardLabel } from '../UI/Label/info-board-label';
import { getPriceTaxesFromHouses } from '../../../../../helpers/helper';
import { IGameInfoBoardAuctionQGProps } from '../types/gameInfoBoard';
import GameInfoBoardFooterContainer from '../../GameInfoBoardFooter/GameInfoBoardFooterContainer';
import AutoCounter from '../../../../../Component/AutoCounter/AutoCounter';



export const GameInfoBoardPlaceBetAuctionQG: React.FC<IGameInfoBoardAuctionQGProps> = ({
	endTime,
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
		<div className={styles['gib__container']}>
			<div className={styles[typeStyle === 'buy' ? 'gib-bg' : 'gib-bg-auction']}>
				{/* header */}
				<div className={styles[typeStyle === 'buy' ? 'gib__header' : 'gib__header-auction--place-bet']}>

					<div className={styles[typeStyle === 'buy' ? 'gib__btns-container' : 'gib__btns-container--btn-two']}>
						<Button
							// fillColor={cards.filter((c:ICards)=> c.id === card_id)[0].bgc_header}
							fillColor='linear-gradient(to right, #E4863F 0%, #E4863F 70%, #FAD660 100%)'

						>{property.card}</Button>
						<Button
							fillColor='#65B99E'
						>{property.collection}</Button>
					</div>
				</div>

				{/* body */}
				<div className={styles['gib__body-container--auction']}>
					{endTime && (
						<div className={styles['gib__body-container--auction-time']}>
							{/* Окончание торгов: {new Date(endTime).toLocaleTimeString()} */}
							{<AutoCounter counter={endTime} callback={()=>{}} />}

						</div>
					)}
					<div className={styles['gib__body-container-wrap']}>
						<div className={styles['gib__btns-container--btn-back']}>
							<Button
								type='empty'
								onClick={() => handleChangeScreen && handleChangeScreen({ path: 'auction' })}>
								<Icon width={'10px'} height={'10px'} rotate={180} src={RightArrowIcon} />
								Назад
							</Button>
						</div>
						<Offset mb={10} />

						<div className={styles['gib__info-card-info-container']}>

							<div className={styles['gib__info-card-info-desc-container']}>
								<Input
									wrapClassName={styles['gib__input-bet-auction']}
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
									<div className={styles['gib__info-card-info-desc-label--auction']}>
										Ставка должна быть не ниже начальной цены (выше &nbsp;

										<span className={styles['gib__info-card-info-desc-label--auction-inline-value']}>
											{startPrice} <Icon className={styles['gib__currency']} src={currency2White} />
										</span>
										)
									</div>
								</InfoBoardLabel>
								<Button
									fillColor='#FFE4B5'
									disabled={!currentBet || currentBet < startPrice}
									className={styles['gib__btn-action-place-bet-auction']}
									onClick={() => handleCard && handleCard({
										action: 'bid_auction',
										game_id,
										card_id,
										bid: currentBet
									})
									}
								>
									<div className={styles['gib__info-card-info-desc-label--auction']}>
										Сделать ставку
									</div>
									<span className={styles['gib__info-card-info-desc-label--auction-inline-value']}>
										{currentBet} <Icon className={styles['gib__currency']} src={currency2White} />
									</span>
								</Button>
								<InfoBoardLabel borderColor='transparent     '>
									<div className={styles['gib__info-card-info-desc-label']}>
										Сумма вашей ставки и комиссия будет заморожена до конца торгов
									</div>
								</InfoBoardLabel>



								<InfoBoardLabel borderColor='#FFEFD3' fillColor='#FFEFD3'>
									<div className={styles['gib__info-card-info-desc-label']}>
										<p>Правила проведения торгов</p>
									</div>
								</InfoBoardLabel>

							</div>
						</div>
					</div>

					{/* footer */}

				</div>
				<GameInfoBoardFooterContainer
					bgc={'#FADDAA'}
					bgcBtn={'#F5CC82'}
				/>
			</div>

		</div>
	);
};
