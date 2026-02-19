import { icons } from '../../../../../../assets';
import { Button, Input, Offset } from '../../../../../../shared/UI';
import Icon from '../../../../../../shared/UI/Icon/Icon';
import React, { useEffect, useState } from 'react';
import AutoCounter from '../../../../../../Component/AutoCounter/AutoCounter';
import { ICard, IExchangeData, IPlayer, ISpecialCard } from '../../../../../../store/quick-game/quick-game.type';
import AvatarBlock from '../../../../../../shared/UI/AvatarBlock/AvatarBlock';
import Title from '../../../../../../shared/UI/Title/Title';
import Line from '../../../../../../shared/UI/Line/Line';
import CurrencyQG from '../../../../../../shared/UI/CurrencyQG/CurrencyQG';
import { temporaryDisableBtn } from '../../../../../../helpers/helper';
import styles from './styles/exchange.module.scss';
import ContainerGIB from '../../components/UI/ContainerGIB/ContainerGIB';
import ContainerExchange from '../../components/UI/ContainerGIB/ContainerExchange';
import ContainerInfoHeaderGIB from '../../components/UI/ContainerGIB/ContainerInfoHeaderGIB';
import ContainerTwoBtn from '../../components/UI/ControllerGIB/ContainerTwoBtn';
import ContainerInfoBodyGIB from '../../components/UI/ContainerGIB/ContainerInfoBodyGIB';
import ContainerInfoTwoColumnGIB from '../../components/UI/ContainerGIB/ContainerInfoTwoColumnGIB';
import ContainerInfoGIB from '../../components/UI/ContainerGIB/ContainerInfoGIB';
import Text from '../../../../../../shared/UI/Text/Text';

interface IGameInfoBoardShowExchangeProps {
	exchangeData: IExchangeData;
	handleBack: (p: any)=> void;
	cards: (ICard | ISpecialCard)[];
	players?: IPlayer[];
	currentPlayerId: number;
	handleCard: (params: any) => void;
timeEndMove: number;
}

export const GameInfoBoardShowExchange: React.FC<IGameInfoBoardShowExchangeProps> = ({
	exchangeData,
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
	const userWhoOffer = players?.filter( (p:IPlayer) => p.id === exchangeData.player_from_id)[0];
	const userToWhomOffered = players?.filter( (p:IPlayer) => p.id === exchangeData.player_to_id)[0];
	useEffect(() => {
			const total = exchangeData.propertys_from.reduce((acc, cardId) => {
				const card = cards.find(c => +c.id === +cardId);
				return card ? acc + +card.cost : acc;
			}, 0);
			setTotalFrom(exchangeData.price_from + total);
	}, [exchangeData, cards]);

	useEffect(() => {
    const total = exchangeData?.propertys_to?.reduce((acc, cardId) => {
      const card = cards.find((c) => +c.id === +cardId);
      return card ? acc + +card.cost : acc;
    }, 0);
    setTotalTo(exchangeData.price_to + total);
  }, [exchangeData.propertys_to, exchangeData.price_to, cards]);

	return (
		<ContainerGIB name='GameInfoBoardShowExchange'>
			<ContainerExchange>
				{/* header */}
				<ContainerInfoHeaderGIB>
					<Title
						className={styles['gib__title']}
						title={'Сделка с игроком' }
						tag='h3'
					/>
				</ContainerInfoHeaderGIB>

				<Offset mb={20} />

				{/* btns actions */}
				{exchangeData.player_from_id !== currentPlayerId && <>
					<ContainerTwoBtn>
						<Button
							disabled={isClick}
							p={10}
							className={styles['gib__btns--btn-action']}
							onClick={() =>{
								temporaryDisableBtn(5000, setIsClick);
								handleCard({
								action: 'accept_exchange',
								...exchangeData
							})}}
						>
							Принять
						</Button>

						<Button
							className={styles['gib__btns--btn-action']}
							p={10}
							disabled={isClick}
							onClick={() => {
								temporaryDisableBtn(5000, setIsClick);
								handleCard({
								action: 'deny_exchange',
								...exchangeData

							})}}>
							Отказ ({<AutoCounter disabled={false} counter={timeEndMove} callback={() => { }} />} сек.)
						</Button>
					</ContainerTwoBtn>
					<Offset mb={10} />
				</>}
				{/* body */}
				<ContainerInfoBodyGIB
					style={{ background: '#E9ECFF', padding: 10 }}
				>
					<Line
						direction={'vertical'}
						location='center'
						style={{left: '50%'}}
					/>
					<>
						{/* player */}
						<ContainerInfoTwoColumnGIB>
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
											{exchangeData.player_from_id !== currentPlayerId? 'Предлагают' : 'Предлагаете'}
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
												{exchangeData.player_from_id !== currentPlayerId? 'Отдаете' : 'Отдает'}
										</span>
									</div>
								</div>
							}
						</ContainerInfoTwoColumnGIB>

						<Offset mb={10} />

						{/* form input */}
						<ContainerInfoTwoColumnGIB>

							<div className={styles['gib__user-exchange--input-container']}>
								{ !!exchangeData.price_from && <Input
									wrapClassName={styles['gib__user-exchange--input-container-input']}
									placeholder='Введите сумму...'
									value={exchangeData.price_from}
									isSpanWidth={!!exchangeData.price_from}
									onChange={()=>{}}
									type='number'
									id='input-seller'
									leftText={exchangeData.price_from? '+ ' : undefined}
									iconLeft={exchangeData.price_from? <Icon
										className={styles['gib__user-exchange--input-currency']}
										width={15}
										height={15}
										src={icons.qgCurrencySvg}
									/> : undefined}
									
								/>}
							</div>
							<div className={styles['gib__user-exchange--input-container']}>
								{
									userToWhomOffered &&
									<>
										{!!exchangeData.price_to && <Input
											wrapClassName={styles['gib__user-exchange--input-container-input']}
											placeholder='Введите сумму...'
											value={exchangeData.price_to}
											isSpanWidth={!!exchangeData.price_to}
											onChange={() => {}} 
											type='number'
											id='input-costumer'
											leftText={exchangeData.price_to ? '+ ' : undefined}
											iconLeft={exchangeData.price_to ? <Icon
												className={styles['gib__user-exchange--input-currency']}
												width={15}
												height={15}
												src={icons.qgCurrencySvg}
											/> : undefined}
											
										/>}
									</>
								}
							</div>

						</ContainerInfoTwoColumnGIB>

						<Offset mb={10} />

						{/* cards */}
						<ContainerInfoTwoColumnGIB style={{ height: '-webkit-fill-available'}}>
							<ContainerInfoGIB>
								{
									!!exchangeData.propertys_from.length &&
									exchangeData.propertys_from.map((card: number, index: number) => (
										<div key={index} className={styles['gib__info-card-exchange-card-container--wrap']}>
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
								}
							</ContainerInfoGIB>
							<ContainerInfoGIB>
								{
									!!exchangeData?.propertys_to?.length &&
									exchangeData.propertys_to.map((card: number, index: number) => (
										<div key={index} className={styles['gib__info-card-exchange-card-container--wrap']}>
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
								}
							</ContainerInfoGIB>
						</ContainerInfoTwoColumnGIB>

						{/* total cost */}
						<ContainerInfoTwoColumnGIB style={{marginTop: 50}}>
							<ContainerInfoTwoColumnGIB>
								<ContainerInfoGIB>
									<Line
										direction='horizontal'
									/>
									<Text
										text={'Итого: ' + totalFrom}
										iconRight={<Icon width={10} height={10} ml={3} src={icons.qgCurrencySvg} />}
									/>
								</ContainerInfoGIB>
								<ContainerInfoGIB>
									<Line
										direction='horizontal'
									/>
									<Text
										text={'Итого: ' + totalTo}
										iconRight={<Icon width={10} height={10} ml={3} src={icons.qgCurrencySvg} />}
									/>
								</ContainerInfoGIB>
							</ContainerInfoTwoColumnGIB>
						</ContainerInfoTwoColumnGIB>
					</>
				</ContainerInfoBodyGIB>

				<Offset mb={10} />

				{/* footer */}
				{/* <FooterInfoBoardContainer /> */}

			</ContainerExchange>

		</ContainerGIB>
	);
};
