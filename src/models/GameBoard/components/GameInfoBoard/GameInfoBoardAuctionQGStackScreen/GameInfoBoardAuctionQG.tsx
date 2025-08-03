import { currency2White, RightArrowIcon } from '../../../../../assets';
import { Button, Offset } from '../../../../../shared/UI';
import Icon from '../../../../../shared/UI/Icon/Icon';
import styles from '../styles/gib.module.scss';
import React from 'react';
import { InfoBoardLabel } from '../UI/Label/info-board-label';
import { getPriceTaxesFromHouses } from '../../../../../helpers/helper';
import { IGameInfoBoardAuctionQGProps } from '../types/gameInfoBoard';
import { ICards } from '../../../../../store/quick-game/quick-game.d';
import GameInfoBoardFooterContainer from '../../GameInfoBoardFooter/GameInfoBoardFooterContainer';


export const GameInfoBoardAuctionQG: React.FC<IGameInfoBoardAuctionQGProps> = ({
	game_id,
	card_id,
	cards,
	cardInfo,
	property,
	startPrice,
	handleCard,
	typeStyle = 'buy',
	handleChangeScreen,
}: IGameInfoBoardAuctionQGProps) => {
	const [amountHouses, setAmountHouses] = React.useState<number>(1);
console.log({cardInfo}, cards.filter((c:ICards)=> c.id === card_id)[0].bgc_header);
	return (
		<div className={styles['gib__container']}>
			<div className={styles[typeStyle === 'buy' ? 'gib-bg' : 'gib-bg-auction']}>
				{/* header */}
				<div className={styles[typeStyle === 'buy' ? 'gib__header' : 'gib__header-auction']}>
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
				<div className={styles['gib__body-container']}>

					<div className={styles['gib__body-container-wrap]']}>

						<div className={styles['gib__info-card-info-container']}>
							<div className={styles['gib__info-card-info-title']}>
								<p>Характеристики карты</p>
								<p>Торги</p>
							</div>
							<Offset mb={10} />

							<div className={styles['gib__info-card-info-desc-container']}>

								<InfoBoardLabel borderColor='#EDBA60'>
									<div className={styles['gib__info-card-info-desc-label']}>
										<p>Налог</p>
										<p>{0}<Icon className={styles['gib__currency']} src={currency2White} /></p>
									</div>
								</InfoBoardLabel>
								<InfoBoardLabel borderColor='#EDBA60'>
									<div className={styles['gib__info-card-info-desc-label']}>
										<p>Начальная цена <Button type='empty' onClick={() => alert('info ?')}>(?)</Button></p>
										<p>{Math.floor(startPrice)}<Icon className={styles['gib__currency']} src={currency2White} /></p>
									</div>
								</InfoBoardLabel>
								<InfoBoardLabel borderColor='#EDBA60'>
									<div className={styles['gib__info-card-info-desc-label']}>
										<p>С коллекцией</p>
										<p>{}<Icon className={styles['gib__currency']} src={currency2White} /></p>
									</div>
								</InfoBoardLabel>
								<InfoBoardLabel borderColor='#EDBA60'>
									<div className={styles['gib__info-card-info-desc-label']}>
										<p>Это закрытый аукцион<Button type='empty' onClick={() => alert('info ?')}>(?)</Button></p>
										<p>{0}<Icon className={styles['gib__currency']} src={currency2White} /></p>
									</div>
								</InfoBoardLabel>

								<InfoBoardLabel borderColor='#EDBA60'>
									<div className={styles['gib__info-card-info-desc-label']}>
										<div>
											{amountHouses > 1 ? <Button
												onClick={() => setAmountHouses(amountHouses - 1)}
												fillColor='#F1B252'
												textColor='#FFFFFF'
												className={styles['gib__btn-action-house']}
											>-</Button>
												: <Button disabled
													className={styles['gib__btn-action-house']}
													fillColor='#F1B252'
													textColor='#FFFFFF'
												>-</Button>}
											<p className={styles['gib__info-card-info-desc-label--houses']}>
												С {getPriceTaxesFromHouses(amountHouses, cardInfo?.features?.house_taxes)?.name}
											</p>
											{cardInfo?.features?.house_taxes && (amountHouses < cardInfo?.features?.house_taxes?.length) ? <Button
												onClick={() => setAmountHouses(amountHouses + 1)}
												fillColor='#F1B252'
												textColor='#FFFFFF'
												className={styles['gib__btn-action-house']}
											>+</Button>
												: <Button disabled
													fillColor='#F1B252'
													textColor='#FFFFFF'
													className={styles['gib__btn-action-house']}
												>+</Button>}
										</div>
										<div>
											{getPriceTaxesFromHouses(amountHouses, cardInfo?.features?.house_taxes).price}
											<Icon className={styles['gib__currency']} src={currency2White} />
										</div>
									</div>
								</InfoBoardLabel>
								<InfoBoardLabel borderColor={''} p={'0 10px'} fillColor='#FFFAF0'>
									<Button
										type='empty'
										onClick={() => handleChangeScreen && handleChangeScreen({path: 'place-bet'})}
									>
										<div className={styles['gib__info-card-info-desc-label']}>
											<p>Сделать ставку</p>
											<p className={styles['gib__info-card-info-desc-label--btn']}>
												{'>'} {0}<Icon className={styles['gib__currency']} src={currency2White} />
											</p>
										</div>
									</Button>
								</InfoBoardLabel>

							</div>
						</div>
					</div>



				</div>
					{/* footer */}
				<GameInfoBoardFooterContainer  
					bgc={'#FADDAA'}
					bgcBtn={'#F5CC82'}
				/>
			</div>

		</div>
	);
};
