import { icons } from '../../../../assets';
import { Button, Input, Offset } from '../../../../shared/UI';
import Icon from '../../../../shared/UI/Icon/Icon';
import styles from './styles/old-gib.module.scss';
import React, { useEffect, useState } from 'react';
import AutoCounter from '../../../../Component/AutoCounter/AutoCounter';
import { ICard, IExchangeData, IPlayer, ISpecialCard } from '../../../../store/quick-game/quick-game.d';
import AvatarBlock from '../../../../shared/UI/AvatarBlock/AvatarBlock';
import Title from '../../../../shared/UI/Title/Title';
import Line from '../../../../shared/UI/Line/Line';
import CurrencyQG from '../../../../shared/UI/CurrencyQG/CurrencyQG';
import { temporaryDisableBtn } from '../../../../helpers/helper';
import GameInfoBoardFooterContainer from '../GameInfoBoardNew/FooterGIB/GameInfoBoardFooterContainer';

interface IGameInfoBoardShowExchangeProps {
	exchageData: IExchangeData;
	handleBack: (p: any)=> void;
	cards: (ICard | ISpecialCard)[];
	players?: IPlayer[];
	currentPlayerId: number;
	handleCard: (params: any) => void;
timeEndMove: number;
}

export const GameInfoBoardShowExchange: React.FC<IGameInfoBoardShowExchangeProps> = ({
	exchageData,
	handleBack,
	handleCard,
	players,
	currentPlayerId,
	cards,
	timeEndMove,
}: IGameInfoBoardShowExchangeProps) => {
	const [isClick, setIsClick] = useState<boolean>(false);
	const [totalTo, setTotalTo] = useState<number>(0);
	const [totalFrom, setTotalFrom] = useState<number>(0);
	const userWhoOffer = players?.filter( (p:IPlayer) => p.id === exchageData.player_from_id)[0];
	const userToWhomOffered = players?.filter( (p:IPlayer) => p.id === exchageData.player_to_id)[0];
	useEffect(() => {
			const total = exchageData.propertys_from.reduce((acc, cardId) => {
				const card = cards.find(c => +c.id === +cardId);
				return card ? acc + +card.cost : acc;
			}, 0);
			setTotalFrom(exchageData.price_from + total);
	}, [exchageData, cards]);

	useEffect(() => {
    const total = exchageData?.propertys_to?.reduce((acc, cardId) => {
      const card = cards.find((c) => +c.id === +cardId);
      return card ? acc + +card.cost : acc;
    }, 0);
    setTotalTo(exchageData.price_to + total);
  }, [exchageData.propertys_to, exchageData.price_to, cards]);

	return (
		<div className={styles['gib__container']} data-name='GameInfoBoardShowExchange'>
			<div className={styles['gib-bg-exchange']}>
				{/* header */}
				<div className={styles['gib__header-container']}>
				{/* 	<ButtonBack
						onClick={() => handleBack({
							action: 'clean_chose_actions',
						})}
						title={'Назад'}
					/>
					<Offset mb={10} /> */}

					<Title
						className={styles['gib__title']}
						title={'Сделка с игроком' }
						tag='h3'
					/>
				</div>

				<Offset mb={20} />

				{/* btns actions */}
				{exchageData.player_from_id !== currentPlayerId && <>
					<div className={styles['gib__btns-container']}>
						<div className={styles['gib__btns-container--btn-two']}>
							<Button
								disabled={isClick}
								className={styles['gib__btns--btn-action']}
								onClick={() =>{
									temporaryDisableBtn(2000, setIsClick);
									handleCard({
									action: 'accept_exchange',
									...exchageData
								})}}
							>
								Принять
							</Button>

							<Button
								className={styles['gib__btns--btn-action']}
								disabled={isClick}
								onClick={() => {
									temporaryDisableBtn(2000, setIsClick);
									handleCard({
									action: 'deny_exchange',
								})}}>
								Отказ ({<AutoCounter disabled={false} counter={timeEndMove} callback={() => { }} />} сек.)
							</Button>
						</div>
					</div>
					<Offset mb={10} />
				</>}
				{/* body */}
				<div
					style={{ background: '#E9ECFF' }}
					className={styles['gib__body-container']}
				>
					
					<div className={styles['gib__body-container-wrap']}>
						<Line
							direction={'vertical'}
							location='center'
						/>
						{/* //  <div className={styles['gib__info-card--half-block-line']}></div>} */}

							<>
								{/* player */}
								<div className={styles['gib__body-desc-container--two-section']}>
									{userWhoOffer &&
										<div className={styles['gib__user-exchange']}>
											<div className={styles['gib__user-exchange--container-avatar']}>
												<AvatarBlock
													color={userWhoOffer.color}
													width={25}
													height={25}
												/>
											</div>
											<div className={styles['gib__user-exchange--desc-container']}>
												<span className={styles['gib__user-exchange--name']}>
													{userWhoOffer.username}
												</span>
												<span className={styles['gib__user-exchange--name-desc']}>
													{exchageData.player_from_id !== currentPlayerId? 'Предлагают' : 'Предлагаете'}
												</span>
											</div>
										</div>
									}
									{userToWhomOffered &&
										<div className={styles['gib__user-exchange']}>
											<div className={styles['gib__user-exchange--container-avatar']}>
												<AvatarBlock
													color={userToWhomOffered.color}
													width={25}
													height={25}
												/>
											</div>
											<div className={styles['gib__user-exchange--desc-container']}>
												<span className={styles['gib__user-exchange--name']}>
													{userToWhomOffered.username}
												</span>
												<span className={styles['gib__user-exchange--name-desc']}>
														{exchageData.player_from_id !== currentPlayerId? 'Отдаете' : 'Отдает'}
												</span>
											</div>
										</div>
									}
								</div>

								<Offset mb={10} />

								{/* form input */}
								<div className={styles['gib__body-desc-container--two-section']}>

									<div className={styles['gib__user-exchange--input-container']}>
										{ !!exchageData.price_from && <Input
											wrapClassName={styles['gib__user-exchange--input-container-input']}
											placeholder='Введите сумму...'
											value={exchageData.price_from}
											isSpanWidth={!!exchageData.price_from}
											onChange={()=>{}}
											type='number'
											id='input-seller'
											leftText={exchageData.price_from? '+ ' : undefined}
											iconLeft={exchageData.price_from? <Icon
												className={styles['gib__user-exchange--input-currency']}
												width='15px'
												height='15px'
												src={icons.qgCurrencySvg}
											/> : undefined}
											
										/>}
									</div>
									<div className={styles['gib__user-exchange--input-container']}>
										{
											userToWhomOffered &&
											<>
												{!!exchageData.price_to && <Input
													wrapClassName={styles['gib__user-exchange--input-container-input']}
													placeholder='Введите сумму...'
													value={exchageData.price_to}
													isSpanWidth={!!exchageData.price_to}
													onChange={() => {}} 
													type='number'
													id='input-costumer'
													leftText={exchageData.price_to ? '+ ' : undefined}
													iconLeft={exchageData.price_to ? <Icon
														className={styles['gib__user-exchange--input-currency']}
														width='15px'
														height='15px'
														src={icons.qgCurrencySvg}
													/> : undefined}
													
												/>}
											</>
										}
									</div>

								</div>

								<Offset mb={10} />

								{/* cards */}
								<div className={styles['gib__body-desc-container--two-section']}>
									<div
										className={styles['gib__info-card-exchange-container']}

									>{
											!!exchageData.propertys_from.length &&
											exchageData.propertys_from.map((card: number, index: number) => (
												<div key={index}>
													{
														cards.filter((c: ICard | ISpecialCard) => +c.id === +card).map((c: ICard | ISpecialCard) => {
															// setTotalFrom(s=> s + +c.cost);
															return (
															<div key={c.id}
																className={styles['gib__info-card-exchange-card-container']}
																style={{
																	background: c.bgc_header,
																}}
															>
																	<div> {c.name} </div>
																<div>
																	<div>{c.cost} </div>
																	<div>
																		<CurrencyQG
																			size={11}
																			color='white'
																			/>
																	</div>
																</div>
															</div>
														)})

													}
												</div>
											))
										}</div>
									<div
										className={styles['gib__info-card-exchange-container']}

									>{
											!!exchageData?.propertys_to?.length &&
											exchageData.propertys_to.map((card: number, index: number) => (
												<div key={index}>
													{
														cards.filter((c: ICard | ISpecialCard) => +c.id === +card).map((c: ICard | ISpecialCard) => {
															// setTotalTo(s => s + +c.cost);
															return (
															<div key={c.id}
																className={styles['gib__info-card-exchange-card-container']} 
																style={{
																	background: c.bgc_header,
																}}
															>
																<div> {c.name} </div>
																<div>
																	<div>{c.cost} </div>
																	<div>
																		<CurrencyQG
																			size={11}
																			color='white'
																			/>
																	</div>
																</div>
															</div>
														)})

													}
												</div>
											))
										}</div>
								</div>

								{/* total cost */}
								<div className={styles['gib__body-desc-container--total-price']}>
									<div className={styles['gib__body-desc-container--two-section']}>
										<div
											className={styles['gib__info-card-exchange-container']}
										>
											<Line
												direction='horizontal'
											/>
											<div
												className={styles['gib__body-desc--total-price']}
											>
												Итого: {totalFrom}
												<CurrencyQG
													size={10}
													color='black'
												/>
											</div>
										</div>
										<div
											className={styles['gib__info-card-exchange-container']}
										>
											<Line
												direction='horizontal'
											/>
											<div
												className={styles['gib__body-desc--total-price']}
											>
												Итого: {totalTo}
												<CurrencyQG
													size={10}
													color='black'
												/>
											</div>
										</div>
									</div>
								</div>
							</>
					</div>
				</div>

				<Offset mb={10} />

				{/* footer */}
				<GameInfoBoardFooterContainer />

			</div>

		</div>
	);
};
