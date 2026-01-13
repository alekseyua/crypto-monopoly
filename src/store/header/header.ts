import { StoreonStore } from "storeon";
import { _INIT } from "../auth/auth";
import { HeaderName, HeaderNameEnum } from "./header.d";
import { IState } from "..";
import { OPEN_WS_FEED_NEWS_QG, RESET_QG, SET_DATA_ACTION_CARD, SET_DATA_PLAYER_QG, SET_EXCHANGE_DATA, SET_INFO_MESSAGE_POPUP, SET_LIST_CARDS_QG, SET_LIST_QG, SET_MESSAGE_ERROR_CREATE_GAME, SET_QG } from "../quick-game/quick-game";
import { SET_MESSAGE } from "../message/message";
import { NAV_QG_FIELD_PAGE, NAV_QG_SELECT_PAGE } from "../../routers/config-nav";
import { SET_MODAL } from "../modal/modal";
import { isKeyPresentInHash } from "../../helpers/helper";
import { RESET_ROLL_DICE, SET_ROLL_DICE_QG } from "../const";

export const SET_HEADER_NAME_IS_SHOW = 'header/set_name' as const;

export const headerStore = (store: StoreonStore) => {
    const initHeaderName: HeaderName = HeaderNameEnum.MAIN_GAME;
    store.on(_INIT, () => ({ headerName: initHeaderName }));
    store.on(SET_HEADER_NAME_IS_SHOW, (_, payload: HeaderName) => ({
      headerName: payload,
    }));
}


export const getProfileId = (storage: IState, profileID?: number): number =>{
 if (!!storage?.user?.id) {
   return storage.user.id;
 }  
  return profileID || 0;
 }

export const handleWsError = (err: any) => {
  console.error("WebSocket error:", err);
};

export const handleCommonErrors = (res: any, dispatch: any, payload: any): boolean => {
  if (res?.message === "No game with this id") {
    dispatch(RESET_QG);
    dispatch(SET_MESSAGE, [{ title: "Error", desc: res.message }]);
    payload.redirectTo(NAV_QG_SELECT_PAGE);
    return true;
  }

  if (res?.error && isKeyPresentInHash(res, "game_data_creating")) {
    dispatch(SET_MESSAGE_ERROR_CREATE_GAME, res.game_data_creating);
    setTimeout(() => dispatch(SET_MESSAGE_ERROR_CREATE_GAME, []), 3000);
    return true;
  }

  dispatch(SET_MODAL, { isOpen: false });
  return false;
};

export const handlePopupMessages = (res: any) => {
  if (isKeyPresentInHash(res, "message_popup")) {
    console.table(res.message_popup);
  }
};

export const handleGamesList = (res: any, dispatch: any) => {
  if (isKeyPresentInHash(res, "games_data")) {
    dispatch(SET_LIST_QG, res.games_data);
  }
};
// Игрок
const getCurrentPlayer = (game: any, profileID: number) =>
  game.players.find((p: any) => +p.user === profileID);
// Карты
const handleCards = (game: any, dispatch: any) => {
  if (game?.cards?.length) {
    dispatch(SET_LIST_CARDS_QG, game.cards);
  }
};
// Кубики
const handleDice = (player: any, dispatch: any) => {
  if (player.show_dice_roll) {
    dispatch(SET_ROLL_DICE_QG, {
      rd1: player.dice_roll_1,
      rd2: player.dice_roll_2,
    });
  } else {
    dispatch(RESET_ROLL_DICE);
  }
};
// Попапы игрока
const handlePopupData = (player: any, dispatch: any) => {
  if (isKeyPresentInHash(player?.popup_data, "show")) {
    dispatch(SET_INFO_MESSAGE_POPUP, player.popup_data);
  }
};
// Action / Auction / Choose
const handleActionCard = (
  player: any,
  profileID: number,
  dispatch: any
) => {
  const choose_data = isKeyPresentInHash(player?.choose_data, "actions")
    ? { ...player.choose_data }
    : undefined;

  if (isKeyPresentInHash(player?.card_data, "data_actions")) {
    dispatchActionData(dispatch, profileID, {
      data_actions: player.card_data.data_actions,
      card_id: player.card_data.card_id,
      choose_data,
    });
  } else if (isKeyPresentInHash(player?.auction_data, "id")) {
    dispatchActionData(dispatch, profileID, {
      auction_data: player.auction_data,
      choose_data,
      card_id: player.current_card,
    });
  } else {
    dispatchActionData(dispatch, profileID, {
      choose_data,
      card_id: player.current_card,
    });
  }
};
// Exchange
const handleExchange = (player: any, dispatch: any) => {
  if (isKeyPresentInHash(player?.exchange_data, "price_to")) {
    dispatch(SET_EXCHANGE_DATA, player.exchange_data);
  } else {
    dispatch(SET_EXCHANGE_DATA, {});
  }
};


const dispatchActionData = (
  dispatch: any,
  profileID: number,
  data: any
) => {
  dispatch(SET_DATA_ACTION_CARD, {
    [`${profileID}`]: {
      data_actions: data.data_actions,
      auction_data: data.auction_data,
      choose_data: data.choose_data,
      card_id: data.card_id,
    },
  });
};


export const handleCurrentGame = async (
  res: any,
  profileID: number,
  payload: any,
  dispatch: any
) => {
  if (!isKeyPresentInHash(res, "game_data")) return;

  const game = res.game_data;
  const currentPlayer = getCurrentPlayer(game, profileID);

  if (!currentPlayer) return;

  if (!game.is_active) {
    payload.redirectTo(NAV_QG_SELECT_PAGE);
    return;
  }

  if (payload?.location?.pathname !== NAV_QG_FIELD_PAGE && game.is_start) {
    payload.redirectTo(NAV_QG_FIELD_PAGE);
  }

  dispatch(OPEN_WS_FEED_NEWS_QG, { game_id: game.id });
  dispatch(SET_QG, game);

  handleCards(game, dispatch);
  handleDice(currentPlayer, dispatch);
  handlePopupData(currentPlayer, dispatch);
  handleActionCard(currentPlayer, profileID, dispatch);
  handleExchange(currentPlayer, dispatch);

  dispatch(SET_DATA_PLAYER_QG, currentPlayer);
};
