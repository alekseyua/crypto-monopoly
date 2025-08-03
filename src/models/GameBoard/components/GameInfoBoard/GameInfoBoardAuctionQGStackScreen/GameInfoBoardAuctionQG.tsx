import { currency2White, RightArrowIcon } from '../../../../../assets';
import { Button, Offset } from '../../../../../shared/UI';
import Icon from '../../../../../shared/UI/Icon/Icon';
import cls from '../styles/gib.module.scss';
import React from 'react';
import { InfoBoardLabel } from '../UI/Label/info-board-label';
import { getPriceTaxesFromHouses } from '../../../../../helpers/helper';
import { IGameInfoBoardAuctionQGProps } from '../types/gameInfoBoard';


// {
//     "id": 59,
//     "bids": [],
//     "closed": false,
//     "players": [
//         {
//             "id": 4,
//             "balance": "1000.00",
//             "move_number_auction": 1,
//             "current_move_auction": true
//         },
//         {
//             "id": 2,
//             "balance": "1000.00",
//             "move_number_auction": 2,
//             "current_move_auction": true
//         }
//     ],
//     "end_time": "2025-06-18T08:28:10.165071Z",
//     "property": {
//         "id": 160,
//         "card": "Ottawa",
//         "owner": null,
//         "hotels": 0,
//         "houses": 0,
//         "mortgaged": false,
//         "collection": "Canada"
//     },
//     "card_info": {
//         "info": {
//             "name": "Ottawa",
//             "country_name": "Canada"
//         },
//         "prices": {
//             "hotel": 100,
//             "house": 100
//         },
//         "features": {
//             "base_cost": 140,
//             "house_taxes": [
//                 {
//                     "1": 50
//                 },
//                 {
//                     "2": 150
//                 },
//                 {
//                     "3": 450
//                 },
//                 {
//                     "4": 620
//                 },
//                 {
//                     "hotel": 750
//                 }
//             ],
//             "monopoly_tax": 20,
//             "one_card_tax": 10
//         },
//         "card_type": "city",
//         "highest_bid": 10,
//         "start_price": 10
//     },
//     "highest_bid": null,
//     "start_price": "10.00",
//     "highest_bidder": null
// }
export const GameInfoBoardAuctionQG: React.FC<IGameInfoBoardAuctionQGProps> = ({
	game_id,
	card_id,
	cardInfo,
	property,
	startPrice,
	handleCard,
	typeStyle = 'buy',
	handleChangeScreen,
}: IGameInfoBoardAuctionQGProps) => {
	const [amountHouses, setAmountHouses] = React.useState<number>(1);

	return (
		<div className={cls['gib__container']}>
			<div className={cls[typeStyle === 'buy' ? 'gib-bg' : 'gib-bg-auction']}>
				{/* header */}
				<div className={cls[typeStyle === 'buy' ? 'gib__header' : 'gib__header-auction']}>
					<div className={cls[typeStyle === 'buy' ? 'gib__btns-container' : 'gib__btns-container-auction']}>
						<Button>{property.card}</Button>
						<Button>{property.collection}</Button>
					</div>
				</div>

				<div className={cls['gib__cards-info-container']}>
					{/* body */}

					<div className={cls['gib__cards-info-container-wrap]']}>

						<div className={cls['gib__info-card-info-container']}>
							<div className={cls['gib__info-card-info-title']}>
								<p>Характеристики карты</p>
								<p>Торги</p>
							</div>
							<Offset mb={10} />

							<div className={cls['gib__info-card-info-desc-container']}>

								<InfoBoardLabel borderColor='#EDBA60'>
									<div className={cls['gib__info-card-info-desc-label']}>
										<p>Налог</p>
										<p>{0}<Icon className={cls['gib__currency']} src={currency2White} /></p>
									</div>
								</InfoBoardLabel>
								<InfoBoardLabel borderColor='#EDBA60'>
									<div className={cls['gib__info-card-info-desc-label']}>
										<p>Начальная цена <Button type='empty' onClick={() => alert('info ?')}>(?)</Button></p>
										<p>{Math.floor(startPrice)}<Icon className={cls['gib__currency']} src={currency2White} /></p>
									</div>
								</InfoBoardLabel>
								<InfoBoardLabel borderColor='#EDBA60'>
									<div className={cls['gib__info-card-info-desc-label']}>
										<p>С коллекцией</p>
										<p>{}<Icon className={cls['gib__currency']} src={currency2White} /></p>
									</div>
								</InfoBoardLabel>
								<InfoBoardLabel borderColor='#EDBA60'>
									<div className={cls['gib__info-card-info-desc-label']}>
										<p>Это закрытый аукцион<Button type='empty' onClick={() => alert('info ?')}>(?)</Button></p>
										<p>{0}<Icon className={cls['gib__currency']} src={currency2White} /></p>
									</div>
								</InfoBoardLabel>

								<InfoBoardLabel borderColor='#EDBA60'>
									<div className={cls['gib__info-card-info-desc-label']}>
										<div>
											{amountHouses > 1 ? <Button
												onClick={() => setAmountHouses(amountHouses - 1)}
												fillColor='#F1B252'
												textColor='#FFFFFF'
												className={cls['gib__btn-action-house']}
											>-</Button>
												: <Button disabled
													className={cls['gib__btn-action-house']}
													fillColor='#F1B252'
													textColor='#FFFFFF'
												>-</Button>}
											<p className={cls['gib__info-card-info-desc-label--houses']}>
												С {getPriceTaxesFromHouses(amountHouses, cardInfo?.features?.house_taxes)?.name}
											</p>
											{cardInfo?.features?.house_taxes && (amountHouses < cardInfo?.features?.house_taxes?.length) ? <Button
												onClick={() => setAmountHouses(amountHouses + 1)}
												fillColor='#F1B252'
												textColor='#FFFFFF'
												className={cls['gib__btn-action-house']}
											>+</Button>
												: <Button disabled
													fillColor='#F1B252'
													textColor='#FFFFFF'
													className={cls['gib__btn-action-house']}
												>+</Button>}
										</div>
										<div>
											{getPriceTaxesFromHouses(amountHouses, cardInfo?.features?.house_taxes).price}
											<Icon className={cls['gib__currency']} src={currency2White} />
										</div>
									</div>
								</InfoBoardLabel>
								<InfoBoardLabel borderColor={''} p={'0 10px'} fillColor='#FFFAF0'>
									<Button
										type='empty'
										onClick={() => handleChangeScreen && handleChangeScreen({path: 'place-bet'})}
									>
										<div className={cls['gib__info-card-info-desc-label']}>
											<p>Сделать ставку</p>
											<p className={cls['gib__info-card-info-desc-label--btn']}>
												{'>'} {0}<Icon className={cls['gib__currency']} src={currency2White} />
											</p>
										</div>
									</Button>
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
