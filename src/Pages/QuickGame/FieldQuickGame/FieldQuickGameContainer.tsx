import { useStoreon } from 'storeon/react';
import { FieldQG } from './FieldQuickGame';
import { RefObject, useEffect, useRef, useState } from 'react';
import { SEND_ACTION_CARD_QG, DISCONNECT_LIST_QG, GET_ACTION_CARD_QG, GET_LIST_QG, GET_MOVE_QG, MOVE_TO, GET_ACTION_FROM_CARD } from '../../../store/quick-game/quick-game';
import { GameInfoBoard } from '../../../models/GameBoard/components/GameInfoBoard/GameInfoBoard';
import { MoveBoardQG } from '../../../models/GameBoard/components/GameInfoBoard/MoveBoardQuickGame';
import { GameInfoBoardBuyOrAuction } from '../../../models/GameBoard/components/GameInfoBoard/GameInfoBoardBuyOrAuction';
import { data, useNavigate } from 'react-router-dom';
import { ICards, IDataContainer, IPlayer } from '../../../store/quick-game/quick-game.d';
import { GameInfoSpecialBoardBuyOrAuction } from '../../../models/GameBoard/components/GameInfoBoard/GameInfoSpecialBoardBuyOrAuction';
import { GameInfoBoardMoveToMoveTo } from '../../../models/GameBoard/components/GameInfoBoard/GameInfoBoardMoveTo';
import { isKeyPresentInHash } from '../../../helpers/helper';
import { GameInfoBoardPayOrAddChance } from '../../../models/GameBoard/components/GameInfoBoard/GameInfoBoardPayOrAddChance';
import { GameInfoBoardPayTaxOrAddCardChance } from '../../../models/GameBoard/components/GameInfoBoard/GameInfoBoardPayTaxOrAddCardChance';
import GameInfoBoardAuctionQGStackScreen from '../../../models/GameBoard/components/GameInfoBoard/GameInfoBoardAuctionQGStackScreen/GameInfoBoardAuctionQGStackScreen';
import { GameInfoBoardJoil } from '../../../models/GameBoard/components/GameInfoBoard/GameInfoBoardJoil';
import { GameInfoBoardActions } from '../../../models/GameBoard/components/GameInfoBoard/GameInfoBoardActions';
import { GameInfoBoardActionsExchange } from '../../../models/GameBoard/components/GameInfoBoard/GameInfoBoardActionsExchange';
import { GameInfoBoardShowExchange } from '../../../models/GameBoard/components/GameInfoBoard/GameInfoBoardShowExchange';

type keyPreview = {
	key: 'current_move' |
	'end_move' |
	'buy_or_auction_card' |
	'info_board_actions' | // 6 кнопок действий
	'plus_extra_move' | // когда шанс +2 хода у текущего игрока
	'wait-move' | // ожидаем ход текущего игрока
	'wait' |
	'buy_or_auction_special_card' |
	'move_to' | // на шансе есть возможность перейти на другую карту
	'pay_or_add_chance' |
	'start_auction_one_card' |
	'prisoner' |
	'pay_tax_or_add_card_chance' |
	'pay_for_freedom' | // Заплатить за освобождение
	'no data';
	cardId: number;
} // нет данных для действий

interface IFildQG {

}

type ActionTypes = {
	'auction': boolean;
	'buy': boolean;
	'pay': boolean;
	'add_card': boolean;
	'move': boolean;
	'add_chance': boolean;
	'move_to': any;
	'pay_tax_or_add_card_chance': boolean; // оплатить налог или получить карту шанса
	'roll_the_dice_freedom': boolean;//кинуть кубики(без передвижения)
}
export interface IStateExchange {
	propertys_from: string[];
	price_from: number;
	player_to_id: number;
	propertys_to: string[];
	price_to: number;
}

const initStateExchange = {
	propertys_from: [],
	price_from: 0,
	player_to_id: 0,
	propertys_to: [],
	price_to: 0,
};

export const FieldQGContainer: React.FC<IFildQG> = () => {
	const {
		dispatch,
		quickGame,
		profile,
		messagesQG,
		dataPlayerQG,
		exchangeData,
		dataActionCardQG } = useStoreon(
			'exchangeData',
			'quickGame',
			'profile',
			'dataPlayerQG',
			'dataActionCardQG',
			'messagesQG'
		);
	const [heightGameBoard, setHeightGameBoard ] = useState<number>(0);
	const [actionCardView, setActionCardView] = useState<React.ReactNode | any>(<GameInfoBoard />);
	const refGameBoard:React.RefObject<HTMLDivElement | null> = useRef(null);
	const [isChangeCard, setIsChangeCard] = useState<boolean>(false);
	const [userIdForExchange, setUserIdForExchange ] = useState<number | null>(null);
	const [listSelectUserPreview, setListSelectUserPreview] = useState<number[]>([]);
	const [stateExchange, setStateExchange] = useState<IStateExchange>(initStateExchange)
	const navigate = useNavigate();


		useEffect(()=>{
			const height = refGameBoard.current?.offsetWidth
			height && setHeightGameBoard(height);
		},[])

	// нужно ли переоткрывать ли соединение при смене страницы ???
	useEffect(() => {

		const game_id = quickGame.id;
		game_id && dispatch(GET_LIST_QG, { action: 'game', game_id, redirectTo });
		return () => dispatch(DISCONNECT_LIST_QG, { action: 'game', redirectTo });
	}, [dispatch]);

	const onMove = (params: any) => {
		dispatch(GET_MOVE_QG, params);
		if(params.action === 'end_move') return;
		dispatch(GET_ACTION_CARD_QG);
	}

	const redirectTo = (path: string) => navigate(path);

	const handleCard = (params: any): void => {
		dispatch(SEND_ACTION_CARD_QG, params); 
		setStateExchange(initStateExchange);
		setListSelectUserPreview([]);
		setIsChangeCard(false);
	}

	const handleMoveTo = (params: any): void => {
		console.log('move')
		dispatch(MOVE_TO, params);
		dispatch(GET_ACTION_CARD_QG);
	}

	const handleCardOnField = (card_id: number): void => {
		const listCard = quickGame.cards;
		if (isChangeCard) {
			// если обмен то добовляем или удаляем карту со списка
			const card = listCard.filter((el: ICards) => el.id === card_id)[0];
			// проверяе собственник карты
			if (card.owner.player.id !== dataPlayerQG.id) {
				if (stateExchange.propertys_to.includes(card.id)) {
					// удаляем карту из списка
					setStateExchange(state => ({
						...state,
						propertys_to: state.propertys_to.filter(el => el !== card.id),

					}))
				}
				else {
					// добавляем карту в список
					setStateExchange(state => ({
						...state,
						propertys_to: [...state.propertys_to, card.id]
					}))
				}

			} else {
				if (stateExchange.propertys_from.includes(card.id)) {
					// удаляем карту из списка
					setStateExchange(state => ({
						...state,
						propertys_from: state.propertys_from.filter(el => el !== card.id),
					}))
				}
				else {
					// добавляем карту в список
					setStateExchange(state => ({
						...state,
						propertys_from: [...state.propertys_from, card.id],
					}))
				}
			}

		} else {
			// Сделать возможность получения окна с действия по клику карты(продать,купить , обмен и т.д.)
			// только если у игрока current_move = True
			dataPlayerQG?.current_move && dispatch(GET_ACTION_FROM_CARD, {
				card_id,
				action: 'get_card_action'
			});
			setUserIdForExchange(listCard.filter( (c:ICards) => c.id === card_id)[0]?.owner?.player?.id || null);
		}
	}

	const handleCardExchange = (params: any): void=> {
		if (params?.action === 'exchange'){
			handleCard({
				...params,
				player_to_id: listSelectUserPreview.filter( (id: number )=>dataPlayerQG.id !== id)[0]
			});
			
			return;
		}else if(params.action === 'accept_exchange'){
			handleCard({
				...params,
			});
			return
		}else if(params.action === 'deny_exchange'){
			handleCard({
				...params,
			});
			return
		}
		setStateExchange(params);
	}

	const handleCardOnFieldAction = async (params: any): Promise<void> => {
		if (params.action === 'exchange') {
			// будем показывать форму где выбираем какие с какими карточками менять
			setIsChangeCard(true);
			userIdForExchange && handleClickUserPreview(userIdForExchange);
			setActionCardView(
				<GameInfoBoardActionsExchange
					key={'GameInfoBoardActionsExchange'}
					handleBack={handleCard}
					handleCard={handleCardExchange}
					stateExchange={stateExchange}
					players={quickGame.players}
					listUserExchange={listSelectUserPreview}
					currentPlayerId={dataPlayerQG.id}
					cards={quickGame.cards}
				/>
			)
			return
		}
		dispatch(GET_ACTION_FROM_CARD, params);
	}

	useEffect(() => {
		const logFunc = function (func: Function) {
			return (...args: any[]) => {
				const startTime = performance.now();
				const result = func(...args);
				const endTime = performance.now();
				console.log('Runtime duration ', (endTime - startTime).toFixed(2), 'ms');
				return result;
			}
		}

		const getAction = logFunc(function (player: IPlayer, data: IDataContainer): keyPreview {

			const isActions: boolean = isKeyPresentInHash(data, 'data_actions');
			const isAuctions: boolean = isKeyPresentInHash(data, 'auction_data');
			const isChoose: boolean = isKeyPresentInHash(data, 'choose_data');
			const cardId = data?.card_id;

			//
			console.log('%c----- data ----------', 'color: blue', { isMove: player.current_move }, '\n',
				 {isActions}, {isAuctions}, {isChoose}, '\n',data)


			// Варианты actions
			
			//sell,exchange,build,pawn,redeem, auction
			if (isChoose && player.current_move) { //   показывает действия в игре по клику карточки
				return {
					key: 'info_board_actions',
					cardId
				};
			}

			if (player.current_move && player.status === 'end_move'){ // показывает кнопку конца хода
				return {
					key: 'end_move',
					cardId: 0
				}
			}
			const keyAction: 'data_actions' | 'auction_data' | null = isActions ? 'data_actions' : isAuctions ? 'auction_data' : null;
			if (player.current_move && !isAuctions && !isActions) {
				return {
					key: 'current_move',
					cardId: 0
				}
			}
			if (!player.current_move && !isAuctions && !isActions) {
				// нет хода и нет данных для действий
				return {
					key: 'no data',
					cardId: 0
				}
			}

			if (!keyAction) {
				// нет данных для действий
				return {
					key: 'no data',
					cardId: 0
				}
			}
			const dataActions: any = data[keyAction];


			if (keyAction === 'auction_data') {
				console.log('no dataActions', dataActions)
				return {
					key: 'start_auction_one_card',
					cardId,
				};
			}
			// для экспресса 
			const listExceptionCard = ["express", "airline", "cruise"];
			if (listExceptionCard.includes(quickGame.cards.filter((el: ICards) => el.id === dataActions.card_id)[0].type_card)) return {
				key: 'buy_or_auction_special_card',
				cardId,
			}

			const actions: ActionTypes = dataActions.actions;
			console.log('----- список действий ----------')
			console.log({ ...actions })
			console.log('--------------------------------')



			if (isKeyPresentInHash(actions, 'buy') && isKeyPresentInHash(actions, 'auction')) return {
				key: 'buy_or_auction_card',
				cardId
			};
			if (isKeyPresentInHash(actions, 'pay') && isKeyPresentInHash(actions, 'add_chance')) return {
				key: 'pay_or_add_chance',
				cardId
			};
			if (isKeyPresentInHash(actions, 'pay_for_freedom') && isKeyPresentInHash(actions, 'roll_the_dice') && isKeyPresentInHash(actions, 'freedom_card')) return {
				key: 'prisoner',
				cardId
			};
			if (isKeyPresentInHash(actions, 'pay') && isKeyPresentInHash(actions, 'add_card')) return {
				key: 'pay_tax_or_add_card_chance',
				cardId
			};
			if (isKeyPresentInHash(actions, 'move_to')) return {
				key: 'move_to',
				cardId
			}
			if (isKeyPresentInHash(actions, 'move')) return {
				key: 'plus_extra_move',
				cardId
			}; // когда шанс +2 хода у текущего игрока
			if (isKeyPresentInHash(actions, 'another_move')) return {
				key: 'plus_extra_move',
				cardId
			}; // даем пользователю еще один ход. Я считаю скольки их если 3 наберается,то отправляем его в тюрьму
			if (!player.current_move) {
				return {
					key: 'wait-move',
					cardId
				};
			}
			return {
				key: 'wait',
				cardId,
			};
		})

		if(isKeyPresentInHash(exchangeData, 'price_from')){
			return setActionCardView(<GameInfoBoardShowExchange
					exchageData={exchangeData}
					handleBack={handleCard}
					key={'GameInfoBoardShowExchange'}
					handleCard={handleCardExchange}
					players={quickGame.players}
					currentPlayerId={dataPlayerQG.id}
					cards={quickGame.cards}
				/>);
		}
		let dataAction: keyPreview = getAction(dataPlayerQG, dataActionCardQG[profile.id]) //? 'current_move' : 'wait';
		switch (dataAction.key) {
			case 'wait':
				setActionCardView(<GameInfoBoard wait />);
				break;
			case 'no data':
				setActionCardView(<GameInfoBoard wait />);
				break;
			case 'wait-move':
				setActionCardView(<GameInfoBoard wait />);
				break;
			case 'move_to':
				setActionCardView(<GameInfoBoardMoveToMoveTo
					moveTo={dataActionCardQG[profile.id].data_actions.card}
					handleMoveTo={handleMoveTo}
					game_id={quickGame.id}
				/>);
				break;
			case 'buy_or_auction_card':
				setActionCardView(<GameInfoBoardBuyOrAuction
					actions={dataActionCardQG[profile.id].data_actions?.actions}
					card_cost={dataActionCardQG[profile.id].data_actions?.card_info?.features?.base_cost}
					handleCard={handleCard}
					game_id={quickGame.id}
					card_id={dataAction.cardId}
					dataCard={dataActionCardQG[profile.id].data_actions?.card_info}
				/>)
				break;
			case 'pay_or_add_chance':
				setActionCardView(<GameInfoBoardPayOrAddChance
					actions={dataActionCardQG[profile.id].data_actions?.actions}
					card_cost={dataActionCardQG[profile.id].data_actions?.card_info?.features?.base_cost}
					handleCard={handleCard}
					game_id={quickGame.id}
					card_id={dataAction.cardId}
					dataCard={dataActionCardQG[profile.id].data_actions?.card_info}
				/>)
				break;
			case 'pay_tax_or_add_card_chance':
				setActionCardView(<GameInfoBoardPayTaxOrAddCardChance
					actions={dataActionCardQG[profile.id].data_actions?.actions}
					handleCard={handleCard}
					game_id={quickGame.id}
					card_id={dataAction.cardId}
				/>)
				break;
			case 'buy_or_auction_special_card':
				setActionCardView(<GameInfoSpecialBoardBuyOrAuction
					actions={dataActionCardQG[profile.id].data_actions?.actions}
					card_cost={dataActionCardQG[profile.id].data_actions?.card_info?.base_cost}
					handleCard={handleCard}
					game_id={quickGame.id}
					card_id={dataAction.cardId}
					dataCard={dataActionCardQG[profile.id].data_actions?.card_info}
				/>)
				break;
			case 'info_board_actions':
				setActionCardView(
					<GameInfoBoardActions
						actions={dataActionCardQG[profile.id].choose_data?.actions}
						handleCard={handleCardOnFieldAction}
						game_id={quickGame.id}
						card_id={dataAction.cardId}
					/>
				)
				break;
			case 'prisoner':
				setActionCardView(<GameInfoBoardJoil
					actions={dataActionCardQG[profile.id].data_actions?.actions}
					card_cost={dataActionCardQG[profile.id].data_actions?.card_info?.base_cost}
					handleCard={handleCard}
					game_id={quickGame.id}
					card_id={dataAction.cardId}
					dataCard={dataActionCardQG[profile.id].data_actions?.card_info}
				/>)
				break;

			case 'current_move':
				setActionCardView(<MoveBoardQG
					onMove={onMove}
					action = 'move'
					title='Время вашего хода'
					titleBtn='Походить'
				/>)
				break;
			case 'end_move':
				setActionCardView(<MoveBoardQG
					onMove={onMove}
					action= 'end_move'
					title=''
					titleBtn='Окончить ход'
				/>)
				break;
			case 'start_auction_one_card':

				setActionCardView(
					<GameInfoBoardAuctionQGStackScreen
						handleCard={handleCard}
						game_id={quickGame.id}
						card_id={dataAction.cardId}
						startPrice={+dataActionCardQG[profile.id].auction_data?.start_price}
						cardInfo={dataActionCardQG[profile.id].auction_data?.card_info}
						highestBidderData={dataActionCardQG[profile.id].auction_data.highest_bidder_data}
						highest_bid={dataActionCardQG[profile.id].auction_data.highest_bid}
						highest_bidder={dataActionCardQG[profile.id].auction_data.highest_bidder}
						property={dataActionCardQG[profile.id].auction_data?.property}
						typeStyle={'auction'}
					/>
				)
				break;
			case 'plus_extra_move':
				setActionCardView(<MoveBoardQG
					onMove ={onMove}
					action = 'move'
					title ='Вам выпал дополнительный ход'
					titleBtn='Походить'
				/>)
				break;

			default:
				// setActionCardView(<GameInfoBoard wait/>)
				break;
		}
	}, [dataActionCardQG[dataPlayerQG.user], dataPlayerQG, exchangeData])


	// ------------------------------ list preview users
	const handleClickUserPreview = function (id: number) {
		console.log({userIdForExchange,isChangeCard,id})
		if (isChangeCard) {
			if (!listSelectUserPreview.includes(dataPlayerQG.id)) {
				setListSelectUserPreview(state => ([...state, dataPlayerQG.id, id]))
			} else {
				if (listSelectUserPreview.includes(id) && id !== dataPlayerQG.id) {
					// setListSelectUserPreview(state => (state.filter(el => el !== id)))
					setStateExchange(initStateExchange);
					// setIsChangeCard(false);
					setListSelectUserPreview([]);

				} else {
					setListSelectUserPreview(state => ([...state, id]))
				}
			}
		}else if( userIdForExchange){
			setUserIdForExchange(null);
			(dataPlayerQG.id !== id) && setListSelectUserPreview(state => ([...state, dataPlayerQG.id, id]))
		}
	}


	useEffect(() => {
		
		console.log('%cchange++ data in the field exchange', 'color: red', { listSelectUserPreview },actionCardView)
		if (actionCardView.key === 'GameInfoBoardActionsExchange') {
			setActionCardView(
				<GameInfoBoardActionsExchange
					key={'GameInfoBoardActionsExchange'}
					handleBack={handleCard}
					handleCard={handleCardExchange}
					stateExchange={stateExchange}
					players={quickGame.players}
					listUserExchange={listSelectUserPreview}
					currentPlayerId={dataPlayerQG.id}
					cards={quickGame.cards}
				/>
			)
		}
	}, [listSelectUserPreview, stateExchange]);

	// setIsChangeCard после заваршения обмена очистить, когда уходим со 
	console.log({ exchangeData }, dataPlayerQG.user)
	return (
		<FieldQG
			heightGameBoard={heightGameBoard}
			isChangeCard={isChangeCard}
			innerRef={refGameBoard}
			cards={quickGame.cards}
			ActionCard={actionCardView}
			dataPlayerQG={dataPlayerQG}
			messages={messagesQG}
			handleCard={handleCardOnField}
			players={quickGame.players}
			listSelectUserPreview={listSelectUserPreview}
			handleClickUserPreview={handleClickUserPreview}
		/>
	);
};
