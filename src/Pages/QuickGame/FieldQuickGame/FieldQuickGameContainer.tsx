import { useStoreon } from "storeon/react";
import { FieldQG } from "./FieldQuickGame";
import { useCallback, useEffect, useRef, useState } from "react";
import {
  SEND_ACTION_CARD_QG,
  DISCONNECT_LIST_QG,
  GET_CARD_ACTION_QG,
  CONNECT_WS_QG,
  MOVE_TO,
  CLOSE_WSOCKET_FEED,
} from "../../../store/quick-game/quick-game";
import { MoveBoardQG } from "../../../models/GameBoard/modules/InfoBoard/InfoBoard/BuyCard/MoveBoardQuickGame";
import { BayOrAuction } from "../../../models/GameBoard/modules/InfoBoard/InfoBoard/BayOrAuction/BayOrAuction";
import { useNavigate } from "react-router-dom";
import {
  CardDataDataActionsJailType,
  CardDataDataActionsType,
  ICard,
  ICardInfo,
  IDataContainer,
  IDataQG,
  IInfoMassagePopup,
  IPlayer,
  ISpecialCard,
  ISpecialCardInfo,
  IUserActions,
} from "../../../store/quick-game/quick-game.type";
import { isKeyPresentInHash } from "../../../helpers/helper";
import { StoreonDispatch } from "storeon";
import { SET_HEADER_NAME_IS_SHOW } from "../../../store/header/header";
import { HeaderNameEnum } from "../../../store/header/header.d";
import { IUser } from "../../../store/users/user.d";
import { IActionsChooseData, ICardInfoChooseData } from "../../../store/quick-game/chooseData.type";
import { GameInfoBoardShowExchange } from "../../../models/GameBoard/modules/InfoBoard/InfoBoard/Exchange/GameInfoBoardShowExchange";
import Wait from "../../../models/GameBoard/modules/InfoBoard/InfoBoard/Wait/Wait";
import { InfoJail } from "../../../models/GameBoard/modules/InfoBoard/InfoBoard/Jail/InfoJail";
import { ExpressAirlineCruise } from "../../../models/GameBoard/modules/InfoBoard/InfoBoard/ExpressAirlineCruise/ExpressAirlineCruise";
import { MoveTo } from "../../../models/GameBoard/modules/InfoBoard/InfoBoard/MoveTo/MoveTo";
import AuctionContainer from "../../../models/GameBoard/modules/InfoBoard/InfoBoard/Auction/AuctionContainer";
import { GameInfoBoardActionsExchange } from "../../../models/GameBoard/modules/InfoBoard/InfoBoard/Exchange/GameInfoBoardActionsExchange";
import ActionsCardContainerStackScreen from "../../../models/GameBoard/modules/InfoBoard/InfoBoard/ActionsCard/ActionsCardContainerStackScreen";
import { ShowMassagePopup } from "../../../models/GameBoard/modules/InfoBoard/InfoBoard/ShowMassagePopup/ShowMassagePopup";
import { InfoChanceOrCommunity } from "../../../models/GameBoard/modules/InfoBoard/InfoBoard/ChanceOrCommunity/InfoChanceOrCommunity";
import Empty from "../../../models/GameBoard/modules/InfoBoard/InfoBoard/Empty/Empty";
import { RESET_ROLL_DICE } from "../../../store/const";

type keyPreview = {
  key:
  | "current_move"
  | "end_move"
  | "info_chance"
  | "buy_or_auction_card"
  | "info_board_actions" // 6 кнопок действий
  | "info_board_actions_special_card" //  кнопок действий
  | "plus_extra_move" // когда шанс +2 хода у текущего игрока
  | "wait-move" // ожидаем ход текущего игрока
  | "buy_or_auction_special_card"
  | "move_to" // на шансе есть возможность перейти на другую карту
  | "pay_or_add_chance"
  | "start_auction_one_card"
  | "start_auction_express_airline_cruise"
  | "jail"
  | "pay_tax_or_add_card_chance"
  | "pay_for_freedom" // Заплатить за освобождение
  cardId: number;
}; // нет данных для действий

interface IFildQG { }

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
    user,
    dataPlayerQG,
    exchangeData,
    infoMassagePopup,
    dataActionCardQG,
  }: {
    dispatch: StoreonDispatch<any>;
    quickGame: IDataQG;
    user: IUser;
    dataPlayerQG: IPlayer;
    exchangeData: any;
    dataActionCardQG: IUserActions;
    infoMassagePopup: IInfoMassagePopup;
  } = useStoreon(
    "exchangeData",
    "quickGame",
    "user",
    "dataPlayerQG",
    "dataActionCardQG",
    "infoMassagePopup"
  );
  const [heightGameBoard, setHeightGameBoard] = useState<number>(0);
  const [actionCardView, setActionCardView] = useState<React.ReactNode | any>(
    <Empty />
  );
  const refGameBoard: React.RefObject<HTMLDivElement | null> = useRef(null);
  const [isChanceGetOrRemoveHouse, setIsChanceGetOrRemoveHouse] =
    useState<boolean>(false);
  const [isChangeCard, setIsChangeCard] = useState<boolean>(false);
  const [userIdForExchange, setUserIdForExchange] = useState<number | null>(null);
  const [listSelectUserPreview, setListSelectUserPreview] = useState<number[]>([]);
  const [idCardForChanceGetOrRemoveHouse, setIdCardForChanceGetOrRemoveHouse] = useState<number | null>(null);
  const [stateExchange, setStateExchange] =
    useState<IStateExchange>(initStateExchange);
  const navigate = useNavigate();

  const actionCardData =
    dataActionCardQG[(user.id + "") as keyof IUserActions];

  useEffect(() => {
    dispatch(SET_HEADER_NAME_IS_SHOW, HeaderNameEnum.QUICK_GAME);
    return () => dispatch(CLOSE_WSOCKET_FEED);
  }, [dispatch]);


  const redirectTo = useCallback(
    (path: string) => {
      navigate(path);
    },
    [navigate]
  );

  const onMove = useCallback(
    (params: any) => {
      dispatch(SEND_ACTION_CARD_QG, params);
      const listException = ["end_move",
        // "return_house", "get_house"
      ];
      if (listException.includes(params.action)) {
        return setTimeout(() => dispatch(RESET_ROLL_DICE), 3000)
      }; // что бы полностью обнулить данные
      if (params.action === "add_card") {
        return dispatch(GET_CARD_ACTION_QG, { chance: true });
      }
      if (params.action === "get_house") return;
      // dispatch(GET_CARD_ACTION_QG);
    },
    [dispatch]
  );

  const handleCard = (params: any): void => {
    dispatch(SEND_ACTION_CARD_QG, params);
    setStateExchange(initStateExchange);
    setListSelectUserPreview([]);
    setIsChangeCard(false);
  };

  const handleMoveTo = (params: any): void => {
    dispatch(MOVE_TO, params);
    // dispatch(GET_CARD_ACTION_QG);
  };


  useEffect(() => {
    const height = refGameBoard.current?.offsetWidth;
    height && setHeightGameBoard(height);
  }, []);

  // нужно ли переоткрывать ли соединение при смене страницы ???
  useEffect(() => {
    const game_id = quickGame.id;
    game_id && dispatch(CONNECT_WS_QG, { action: "game", game_id, redirectTo });
    return () => dispatch(DISCONNECT_LIST_QG, { action: "game", redirectTo });
  }, [dispatch, quickGame.id, redirectTo]);

  useEffect(() => {
    if (actionCardView?.key === "GameInfoBoardActionsExchange") {
      setActionCardView(
        <GameInfoBoardActionsExchange
          key={"GameInfoBoardActionsExchange"}
          handleBack={handleCard}
          handleCard={handleCardExchange}
          stateExchange={stateExchange}
          players={quickGame.players}
          listUserExchange={listSelectUserPreview}
          currentPlayerId={dataPlayerQG.id}
          cards={quickGame.cards}
          handleClickUserPreview={handleClickUserPreview}
        />
      );
    }
    // eslint-disable-next-line
  }, [listSelectUserPreview, stateExchange]);
      console.log('1--',{idCardForChanceGetOrRemoveHouse})

  useEffect(() => {
    if (actionCardView?.key === "InfoChanceOrCommunity") {
      const keys: string[] = actionCardData?.data_actions?.actions
        ? Object.keys(actionCardData?.data_actions?.actions)
        : [""];
      if (keys.includes("get_house") || keys.includes("return_house")) {
        setIsChanceGetOrRemoveHouse(true);
      }
      const card = quickGame.cards.filter(
        (el: ICard | ISpecialCard) => el.id === dataPlayerQG.current_card
      )[0];
      setActionCardView(
        <InfoChanceOrCommunity
          onMove={onMove}
          typeCard={card.type_card}
          cards={quickGame.cards as ICard[]}
          actions={keys}
          key={"InfoChanceOrCommunity"}
          cardIdWhereMoveTo={
            keys.includes("move_to")
              ? actionCardData?.data_actions?.card?.id
              : idCardForChanceGetOrRemoveHouse
                ? idCardForChanceGetOrRemoveHouse
                : null
          }
          title="Вам выпал шанс."
          content={
            actionCardData?.data_actions?.card?.name
              ? "Вам выпал переход на " +
              actionCardData?.data_actions?.card.name
              : keys.includes("pay") && infoMassagePopup.message
                ? infoMassagePopup.message
                : ""
          }
        />
      );
    }
  }, [
    idCardForChanceGetOrRemoveHouse,
    actionCardData,
    actionCardView.key,
    dataPlayerQG.current_card,
    infoMassagePopup.message, onMove, quickGame.cards
  ]);

  useEffect(() => {
    if (!!!(actionCardData?.card_id && actionCardData?.auction_data?.card_id))
      return;
    if (actionCardView?.key === "AuctionContainer") {
      setActionCardView(
        <AuctionContainer
          handleCard={handleCard}
          key={"AuctionContainer"}
          game_id={quickGame.id}
          card_id={actionCardData?.auction_data.card_id}
          startPrice={+actionCardData?.auction_data?.start_price}
          cardInfo={actionCardData?.auction_data?.card_info}
          highest_bid={actionCardData?.auction_data.highest_bid}
          endTime={actionCardData?.auction_data?.end_time_sec}
          showInfoCard="place-bet"
          resetData={actionCardData?.auction_data?.highest_bid}
        />
      );
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [actionCardData?.auction_data?.highest_bid]);

  useEffect(() => {
    setIdCardForChanceGetOrRemoveHouse(null);

    const logFunc = function (func: Function) {
      return (...args: any[]) => {
        const result = func(...args);
        return result;
      };
    };
    if (
      infoMassagePopup.show && (dataPlayerQG.current_move ||
        isKeyPresentInHash(actionCardData, "auction_data"))
    ) {
      console.log("%cSHOW POPUP MESSAGE", "color: green ; font-weight: bold;");
      return setActionCardView(
        <ShowMassagePopup
          handleClick={handleCard}
          title={infoMassagePopup.message}
          typeCard={infoMassagePopup.type_card}
        />
      );
    }
    const getAction = logFunc(function (
      player: IPlayer,
      data: IDataContainer
    ): keyPreview {
      if (isChanceGetOrRemoveHouse) setIsChanceGetOrRemoveHouse(false);
      const isActions: boolean = isKeyPresentInHash(data, "data_actions");
      const isAuctions: boolean = isKeyPresentInHash(data, "auction_data");
      const isChoose: boolean = isKeyPresentInHash(data, "choose_data");
      const listCards = quickGame.cards;
      let cardId = data?.card_id;
      if (isAuctions) cardId = data.auction_data.card_id;
      let typeCard =
        cardId && !!listCards.length &&
        listCards.filter((c: ICard | ISpecialCard) => c.id === cardId)[0]
          ?.type_card; // тип карты на которой стоим
      if (isChoose) typeCard = data.choose_data.card_type;
      const isMovePlayer = player.current_move;

      const keyAction: "data_actions" | "auction_data" | null = isActions
        ? "data_actions"
        : isAuctions
          ? "auction_data"
          : null;
      const dataActions: any = keyAction && data[keyAction];
      // для экспресса  airline  cruise
      const listExceptionSpecialCard = ["express", "airline", "cruise"];
      const isExpressAirlineCruise = listExceptionSpecialCard.includes(
        typeCard + ""
      );

      // Варианты actions
      //sell,exchange,build,pawn,redeem, auction
      if (isChoose && isMovePlayer && !isExpressAirlineCruise) {
        //   показывает действия в игре по клику карточки
        return {
          key: "info_board_actions",
          cardId,
        };
      } else if (isChoose && isMovePlayer && isExpressAirlineCruise) {
        return {
          key: "info_board_actions_special_card",
          cardId,
        };
      }
      // показывает действия при шансе && (player.status !== 'waiting' && player.status !== 'move')
      if (
        (typeCard === "chance" || typeCard === "community") &&
        isActions
      ) {
        return {
          key: "info_chance",
          cardId,
        };
      }

      if (
        isMovePlayer &&
        player.status === "end_move" &&
        !isAuctions &&
        !isActions
      ) {
        // показывает кнопку конца хода
        return {
          key: "end_move",
          cardId: 0,
        };
      } else if (isMovePlayer && !isAuctions && !isActions) {
        return {
          key: "current_move",
          cardId: 0,
        };
      } else if (!isMovePlayer && !isAuctions && !isActions) {
        // нет хода и нет данных для действий
        return {
          key: "wait-move",
          cardId: 0,
        };
      }

      if (isAuctions && !isExpressAirlineCruise) {
        return {
          key: "start_auction_one_card",
          cardId,
        };
      } else if (isAuctions && isExpressAirlineCruise) {
        return {
          key: "start_auction_express_airline_cruise",
          cardId,
        };
      }
      // для экспресса
      if (isExpressAirlineCruise)
        return {
          key: "buy_or_auction_special_card",
          cardId,
        };

      // для шанса и казны
      // const listChanceOrCommunityCard = ["chance", "community"];

      // для обычных карт
      const actions: CardDataDataActionsType = dataActions.actions;

      if (
        isKeyPresentInHash(actions, "buy") &&
        isKeyPresentInHash(actions, "auction")
      )
        return {
          key: "buy_or_auction_card",
          cardId,
        };
      if (
        isKeyPresentInHash(actions, "pay_for_freedom") &&
        isKeyPresentInHash(actions, "roll_the_dice") &&
        isKeyPresentInHash(actions, "freedom_card")
      )
        return {
          key: "jail",
          cardId,
        };
      if (
        isKeyPresentInHash(actions, "pay") &&
        isKeyPresentInHash(actions, "add_card")
      )
        return {
          key: "pay_tax_or_add_card_chance",
          cardId,
        };
      if (isKeyPresentInHash(actions, "move_to"))
        return {
          // скорей всего не нужен уже
          key: "move_to",
          cardId,
        };
      if (isKeyPresentInHash(actions, "move"))
        return {
          key: "plus_extra_move",
          cardId,
        }; // когда шанс +2 хода у текущего игрока
      if (isKeyPresentInHash(actions, "another_move"))
        return {
          key: "plus_extra_move",
          cardId,
        }; // даем пользователю еще один ход. Я считаю скольки их если 3 наберается,то отправляем его в тюрьму
      if (!isMovePlayer) {
        return {
          key: "wait-move",
          cardId,
        };
      }
      return {
        key: "wait-move",
        cardId,
      };
    });

    if (isKeyPresentInHash(exchangeData, "price_from")) {
      return setActionCardView(
        <GameInfoBoardShowExchange
          exchangeData={exchangeData}
          handleBack={handleCard}
          key={"GameInfoBoardShowExchange"}
          handleCard={handleCardExchange}
          players={quickGame.players}
          currentPlayerId={dataPlayerQG.id}
          cards={quickGame.cards as (ICard | ISpecialCard)[]}
          timeEndMove={dataPlayerQG.move_end_time_sec}
        />
      );
    }
    let dataAction: keyPreview = getAction(dataPlayerQG, actionCardData);
    console.log("%cKEY: " + dataAction?.key, "color: green");

    const showInfoBoard: { [key: string]: () => React.ReactNode } = {
      /** ⏳ Ожидание хода */
      "wait-move": () => (
        <Wait
          playerCurrentMove={
            quickGame.players.find((p: IPlayer) => p.current_move)!
          }
        />
      ),

      /** ➡️ Переход на карту */
      "move_to": () => (
        <MoveTo
          moveTo={actionCardData?.data_actions?.card}
          handleMoveTo={handleMoveTo}
          game_id={quickGame.id}
        />
      ),

      /** 🏠 Покупка или аукцион карты */
      "buy_or_auction_card": () => (
        <BayOrAuction
          actions={actionCardData?.data_actions?.actions as CardDataDataActionsType}
          card_cost={
            (actionCardData?.data_actions?.card_info as ICardInfo)?.features
              ?.base_cost
          }
          handleCard={handleCard}
          game_id={quickGame.id}
          card_id={dataAction.cardId}
          dataCard={actionCardData?.data_actions?.card_info}
          timeEndMove={dataPlayerQG.move_end_time_sec}
        />
      ),

      /** ✈️ Спец-карта */
      "buy_or_auction_special_card": () => (
        <ExpressAirlineCruise
          actions={actionCardData?.data_actions?.actions as CardDataDataActionsType}
          handleCard={handleCard}
          game_id={quickGame.id}
          card_id={dataAction.cardId}
          timeEndMove={dataPlayerQG.move_end_time_sec}
          cardInfo={actionCardData?.data_actions?.card_info as ISpecialCardInfo}
        />
      ),

      /** 🃏 Карта с действиями */
      "info_board_actions": () => (
        <ActionsCardContainerStackScreen
          card={
            quickGame.cards.find(
              (c: ICard | ISpecialCard) =>
                c.id === actionCardData.choose_data.card_id
            )!
          }
          timeEndMove={dataPlayerQG.move_end_time_sec}
          handleBack={handleCard}
          handleAction={handleCardOnFieldAction}
          showInfoCard="action-card"
          actions={actionCardData?.choose_data?.actions as IActionsChooseData}
          cardInfo={
            actionCardData?.choose_data?.card_info as ICardInfoChooseData
          }
        />
      ),

      /** 🃏 Спец-карта с действиями */
      "info_board_actions_special_card": () => (
        <ActionsCardContainerStackScreen
          card={
            quickGame.cards.find(
              (c: ICard | ISpecialCard) =>
                c.id === actionCardData.choose_data.card_id
            )!
          }
          timeEndMove={dataPlayerQG.move_end_time_sec}
          handleBack={handleCard}
          handleAction={handleCardOnFieldAction}
          showInfoCard="action-special-card"
          actions={actionCardData?.choose_data?.actions as IActionsChooseData}
          cardInfo={actionCardData?.choose_data?.card_info}
        />
      ),

      /** 🚓 Тюрьма */
      "jail": () => (
        <InfoJail
          actions={
            actionCardData?.data_actions?.actions as CardDataDataActionsJailType
          }
          card_cost={(actionCardData?.data_actions?.card_info)?.features.base_cost}
          handleCard={handleCard}
          game_id={quickGame.id}
          card_id={dataAction.cardId}
          dataCard={actionCardData?.data_actions?.card_info}
        />
      ),

      /** 🎲 Текущий ход */
      "current_move": () => (
        <MoveBoardQG
          onMove={onMove}
          action="move"
          title="Время вашего хода"
          titleBtn="Походить"
          timeEndMove={dataPlayerQG.move_end_time_sec}
          status={dataPlayerQG.status}

        />
      ),

      /** 🔚 Завершение хода */
      "end_move": () => (
        <MoveBoardQG
          onMove={onMove}
          action="end_move"
          title=""
          titleBtn="Окончить ход"
          timeEndMove={dataPlayerQG.move_end_time_sec}
          status={dataPlayerQG.status}

        />
      ),

      /** 🔨 Дополнительный ход */
      "plus_extra_move": () => (
        <MoveBoardQG
          onMove={onMove}
          action="move"
          title="Вам выпал дополнительный ход"
          titleBtn="Походить"
          timeEndMove={dataPlayerQG.move_end_time_sec}
          status={dataPlayerQG.status}
        />
      ),

      /** 🎯 Аукцион карты */
      "start_auction_one_card": () => (
        <AuctionContainer
          handleCard={handleCard}
          game_id={quickGame.id}
          card_id={actionCardData?.auction_data.card_id}
          startPrice={+actionCardData?.auction_data?.start_price}
          cardInfo={actionCardData?.auction_data?.card_info}
          highest_bid={actionCardData?.auction_data.highest_bid}
          endTime={actionCardData?.auction_data?.end_time_sec}
          showInfoCard="auction-card"
          resetData={actionCardData?.auction_data?.highest_bid}
        />
      ),

      /** 🎯 Аукцион спец-карты */
      "start_auction_express_airline_cruise": () => (
        <AuctionContainer
          handleCard={handleCard}
          game_id={quickGame.id}
          card_id={actionCardData?.auction_data.card_id}
          startPrice={+actionCardData?.auction_data?.start_price}
          cardInfo={actionCardData?.auction_data?.card_info}
          highest_bid={actionCardData?.auction_data.highest_bid}
          endTime={actionCardData?.auction_data?.end_time_sec}
          showInfoCard="auction-special-card"
          resetData={actionCardData?.auction_data?.highest_bid}
        />
      ),

      /** 🎴 Шанс / Общественная казна */
      "info_chance": () => {
        const keys = actionCardData?.data_actions?.actions
          ? Object.keys(actionCardData.data_actions.actions)
          : [];

        if (keys.includes("get_house") || keys.includes("return_house")) {
          setIsChanceGetOrRemoveHouse(true);
        }
        console.log(
          'quickGame'
        )

        return (
          <InfoChanceOrCommunity
            onMove={onMove}
            key={"InfoChanceOrCommunity"}
            typeCard={quickGame.cards.filter(
              (el: ICard | ISpecialCard) => el.id === dataAction.cardId
            )[0].type_card}
            cards={quickGame.cards as ICard[]}
            actions={keys}
            cardIdWhereMoveTo={
              keys.includes("move_to")
                ? actionCardData?.data_actions?.card?.id
                : keys.includes("add_card") && keys.includes("pay")
                  ? dataAction.cardId
                  : idCardForChanceGetOrRemoveHouse ?? null
            }
            title="Вам выпал шанс."
            content={
              actionCardData?.data_actions?.card?.name
                ? `Вам выпал переход на ${actionCardData.data_actions.card.name}`
                : keys.includes("pay") && infoMassagePopup.message
                  ? infoMassagePopup.message
                  : ""
            }
          />
        );
      },
    };

    setActionCardView(showInfoBoard[dataAction.key]?.());

    // eslint-disable-next-line
  }, [actionCardData, dataPlayerQG, exchangeData, infoMassagePopup]);


  const handleCardOnField = (card_id: number): void => {
    // Сделать возможность получения окна с действия по клику карты(продать,купить , обмен и т.д.)
    const listCard = quickGame.cards;
    if (isChangeCard) {
      // если обмен то добовляем или удаляем карту со списка
      const card = listCard.filter(
        (el: ICard | ISpecialCard) => el.id === card_id
      )[0];
      // проверяе собственник карты
      if (!!Object.keys(card.owner).length && card.owner.player.id !== dataPlayerQG.id) {
        if (stateExchange.propertys_to.includes(card.id.toString())) {
          // удаляем карту из списка
          setStateExchange((state) => ({
            ...state,
            propertys_to: state.propertys_to.filter(
              (el) => el !== card.id.toString()
            ),
          }));
        } else {
          // добавляем карту в список
          setStateExchange((state) => ({
            ...state,
            propertys_to: [...state.propertys_to, card.id.toString()],
          }));
        }
      } else {
        if (stateExchange.propertys_from.includes(card.id.toString())) {
          // удаляем карту из списка
          setStateExchange((state) => ({
            ...state,
            propertys_from: state.propertys_from.filter(
              (el) => el !== card.id.toString()
            ),
          }));
        } else {
          // добавляем карту в список
          setStateExchange((state) => ({
            ...state,
            propertys_from: [...state.propertys_from, card.id.toString()],
          }));
        }
      }
    } else if (isChanceGetOrRemoveHouse) {
      setIdCardForChanceGetOrRemoveHouse(card_id);
    } else {
      // только если у игрока current_move = True
      dataPlayerQG?.current_move && dispatch(GET_CARD_ACTION_QG, { card_id });
      setUserIdForExchange(
        listCard.filter((c: ICard | ISpecialCard) => c.id === card_id)[0]?.owner
          ?.player?.id || null
      );
    }
  };

  const handleCardExchange = (params: any): void => {
    if (params?.action === "exchange") {
      handleCard({
        ...params,
        player_to_id: listSelectUserPreview.filter(
          (id: number) => dataPlayerQG.id !== id
        )[0],
      });

      return;
    } else if (params.action === "accept_exchange") {
      handleCard({
        ...params,
      });
      return;
    } else if (params.action === "deny_exchange") {
      handleCard({
        ...params,
      });
      return;
    }
    setStateExchange(params);
  };

  const handleCardOnFieldAction = async (params: any): Promise<void> => {
    if (params.action === "exchange") {
      // debugger;
      if (params?.idOwnerCard && dataPlayerQG.id === params?.idOwnerCard) {
        // свою карту предлагаем для обмена
        setStateExchange((state) => ({
          ...state,
          propertys_from: [...state.propertys_from, params.card_id.toString()],
        }));
      } 
      else if (
        params?.idOwnerCard &&
        dataPlayerQG.id !== params?.idOwnerCard
      ) {
        setStateExchange((state) => ({
          ...state,
          propertys_to: [...state.propertys_to, params.card_id.toString()],
        }));
      }
      // будем показывать форму где выбираем какие с какими карточками менять
      setIsChangeCard(true);
      userIdForExchange && handleClickUserPreview(userIdForExchange);
      setActionCardView(
        <GameInfoBoardActionsExchange
          key={"GameInfoBoardActionsExchange"}
          handleBack={handleCard}
          handleCard={handleCardExchange}
          stateExchange={stateExchange}
          players={quickGame.players}
          listUserExchange={listSelectUserPreview}
          currentPlayerId={dataPlayerQG.id}
          cards={quickGame.cards as ICard[] | ISpecialCard[]}
          handleClickUserPreview={handleClickUserPreview}
        />
      );
      return;
    }
    dispatch(SEND_ACTION_CARD_QG, params);
  };

  // ------------------------------ list preview users
  const handleClickUserPreview = function (id: number) {
    if (isChangeCard) {
      if (!listSelectUserPreview.includes(dataPlayerQG.id)) {
        setListSelectUserPreview((state) => [...state, dataPlayerQG.id, id]);
      } else {
        if (listSelectUserPreview.includes(id) && id !== dataPlayerQG.id) {
          setStateExchange(initStateExchange);
          setListSelectUserPreview([]);
        } else {
          setListSelectUserPreview((state) => [...state, id]);
        }
      }
    } else if (userIdForExchange) {
      setUserIdForExchange(null);
      dataPlayerQG.id !== id &&
        setListSelectUserPreview((state) => [...state, dataPlayerQG.id, id]);
    }
  };

  // setIsChangeCard после заваршения обмена очистить, когда уходим со
  return (
    <FieldQG
      cards={quickGame.cards as (ICard | ISpecialCard)[]}
      players={quickGame.players}
      innerRef={refGameBoard}
      ActionCard={actionCardView}
      dataPlayerQG={dataPlayerQG}
      isChangeCard={isChangeCard}
      heightGameBoard={heightGameBoard}
      playerCurrentMove={dataPlayerQG}
      listSelectUserPreview={listSelectUserPreview}
      isChanceGetOrRemoveHouse={isChanceGetOrRemoveHouse}
      handleCard={handleCardOnField}
      handleClickUserPreview={handleClickUserPreview}
    />
  );
};
