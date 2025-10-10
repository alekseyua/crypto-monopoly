import { currency2White } from '../../../../assets';
import { Button } from '../../../../shared/UI';
import Icon from '../../../../shared/UI/Icon/Icon';
import styles from './styles/gib.module.scss';
import React from 'react';
import { InfoBoardLabel } from './UI/Label/info-board-label';
import { getPriceTaxesFromHouses, temporaryDisableBtn } from '../../../../helpers/helper';
import AutoCounter from '../../../../Component/AutoCounter/AutoCounter';
import Title from '../../../../shared/UI/Title/Title';
import { CardDataDataActionsType } from '../../../../store/quick-game/quick-game.d';
import GameInfoBoardFooterContainer from '../GameInfoBoardNew/FooterGIB/GameInfoBoardFooterContainer';

interface IBayOrAuctionProps {
	labelColors?: string[];
	labelTextColors?: string[];
	actions: CardDataDataActionsType;
	card_cost?: number;
	game_id: number;
	card_id: number;
	dataCard: any //IDataContainer;
	handleCard?: ({ game_id, card_id, action }: { action: string, game_id: number, card_id: number }) => void;
	timeEndMove: number;
}

export const GameInfoBoardPayOrAddChance: React.FC<IBayOrAuctionProps> = ({
	labelColors = ['transparent', '#65B99E'],
	labelTextColors = ['#000000', '#ffffff'],
	card_cost,
	game_id,
	card_id,
	dataCard,
	handleCard,
	actions,
	timeEndMove,
}: IBayOrAuctionProps) => {
	const [amountHouses, setAmountHouses] = React.useState<number>(1);
	const [ isClick, setIsClick ] = React.useState<boolean>(false);
	
	return (
		<div className={styles['gib__container']}>

			<div className={styles['gib-bg']}>
				{/* header */}
				<div className={styles['gib__header']}>
					<h3 className={styles['gib__title']}> Вам выпала свободная карта. </h3>
					<Title
						className={styles['gib__title']}
						title={'Вам выпала свободная карта.'}
						tag='h3'
					/>
					<div className={styles['gib__btns-container']}>
						<Button
							disabled={isClick || !actions.pay}
							onClick={() => {
								temporaryDisableBtn(2000, setIsClick);
								handleCard && handleCard({
								action: 'pay',
								game_id,
								card_id,
							})}}>Купить за {card_cost}
							<Icon className={styles['gib__currency']} src={currency2White} /></Button>
						<Button
							disabled={isClick || !actions.add_chance}
							// onClick={handleGetChance} 
							type='outline'>Отказ {<AutoCounter counter={timeEndMove} callback={()=>{}} />
							}</Button>
					</div>
				</div>
					{/* body */}
				<div style={{ background: '#E9ECFF' }} className={styles['gib__body-container']}>

					<div className={styles['gib__body-container-wrap']}>
						<div className={styles['gib__info-card-labels']}>
							<InfoBoardLabel labelColor={labelColors[0]}>
								<p
									style={{ color: labelTextColors[0] }}
									className={styles['gib__info-card-label-city-name']}
								>
									{dataCard.info?.name}
								</p>
							</InfoBoardLabel>
							<InfoBoardLabel
								labelColor={labelColors[1]}
								borderColor='transparent'>
								<p
									style={{ color: labelTextColors[1] }}
									className={styles['gib__info-card-label-contry-name']}>
									{dataCard.info?.country_name}
								</p>
							</InfoBoardLabel>
						</div>
						<div className={styles['gib__info-card-info-container']}>
							<div className={styles['gib__info-card-info-title']}>
								<p>Характеристики карты</p>
								<p>Стоимость недвижимости</p>
							</div>
							<div className={styles['gib__info-card-info-desc-container']}>
								<InfoBoardLabel>
									<div className={styles['gib__info-card-info-desc-label']}>
										<p>Налог</p>
										<div>{dataCard.features?.one_card_tax}<Icon className={styles['gib__currency']} src={currency2White} /></div>
									</div>
								</InfoBoardLabel>
								<InfoBoardLabel>
									<div className={styles['gib__info-card-info-desc-label']}>
										<p>Стоимость дома</p>
										<div>
											{dataCard.prices?.house}
											<Icon className={styles['gib__currency']} src={currency2White} />
										</div>
									</div>
								</InfoBoardLabel>
								{/* <InfoBoardLabel>
									<div className={styles['gib__info-card-info-desc-label']}>
										<p>С коллекцией</p>
										<div>{dataCard.features?.monopoly_tax}<Icon className={styles['gib__currency']} src={currency2White} /></div>
									</div>
								</InfoBoardLabel> */}
								<InfoBoardLabel>
									<div className={styles['gib__info-card-info-desc-label']}>
										<p>Стоимость отеля</p>
										<div>
											{dataCard.prices?.hotel}
											<Icon className={styles['gib__currency']} src={currency2White} />
										</div>
									</div>
								</InfoBoardLabel>
								<InfoBoardLabel>
									<div className={styles['gib__info-card-info-desc-label']}>
										<div>
											{amountHouses > 1 ? <Button
												onClick={() => setAmountHouses(amountHouses - 1)}
												className={styles['gib__btn-action-house']}
											>-</Button>
												: <Button disabled
													className={styles['gib__btn-action-house']}
												>-</Button>}
											С {getPriceTaxesFromHouses(amountHouses, dataCard.features?.house_taxes)?.name}
											{dataCard.features?.house_taxes && (amountHouses < dataCard.features?.house_taxes?.length) ? <Button
												onClick={() => setAmountHouses(amountHouses + 1)}
												className={styles['gib__btn-action-house']}
											>+</Button>
												: <Button disabled
													className={styles['gib__btn-action-house']}
												>+</Button>}
										</div>
										<div>
											{getPriceTaxesFromHouses(amountHouses, dataCard.features?.house_taxes).price}
											<Icon className={styles['gib__currency']} src={currency2White} />
										</div>
									</div>
								</InfoBoardLabel>
							</div>
						</div>
					</div>

					{/* footer */}
					<GameInfoBoardFooterContainer />


				</div>
			</div>

		</div>
	);
};
