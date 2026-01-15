import { v4 } from "uuid";
import { _INIT } from "../auth/auth";
import { URL_FEED_QG, URL_QGS } from "../../api/config.js";
import { StoreonStore, StoreonModule } from "storeon";
import {
  connectWebSocket,
  getUrlWebsocket,
  isKeyPresentInHash,
} from "../../helpers/helper";
import {
  type ICard,
  type IDataQG,
  type ISocket,
  type IPlayer,
  type IInfoMassagePopup,
  type IAchivmentPlayer,
  type IListQGs,
  type IChooseData,
  type IRoleDiceStore,
  EQuickGameStore,
} from "./quick-game.type";
import {
  SET_FEED_NEWS_MESSAGE_QG,
  SET_MESSAGE,
  SET_MESSAGE_QUICK_GAME,
} from "../message/message";
import { GET_USERS } from "../users/users";
import { NAV_QG_FIELD_PAGE, NAV_QG_SELECT_PAGE } from "../../routers/config-nav";
import { payloadErrorCreateGame, errorGameState } from "./error-game.d";
import { SET_MODAL } from "../modal/modal";
import {
  getProfileId,
  handleCommonErrors,
  handleCurrentGame,
  handleGamesList,
  handlePopupMessages,
  handleWsError,
} from "../header/header";
import { IState } from "..";



/* ===================== EVENTS ===================== */
export const RESET_LIST_CARDS_QG = v4();
export const SET_LIST_CARDS_QG = v4();
export const CREATE_NEW_QG = 'create/new_qg' as const;
export const SEND_MSG_SELECT_GAME = v4();
export const CONNECT_WS_QG = v4();
export const SET_LIST_QG = v4();
export const RET_LIST_QG = v4();
export const SET_QG = v4();
export const RESET_QG = v4();
export const UPDATE_LIST_QG = v4();
export const GET_CARD_ACTION_QG = v4();
export const SET_SHOW_QG = v4();
export const NULL_SHOW_QG = v4();
export const DISCONNECT_LIST_QG = v4();
export const SET_DATA_PLAYER_QG = v4();
export const RET_DATA_PLAYER_QG = v4();
export const RESET_DATA_ACTION_CARD = v4();
export const SET_DATA_ACTION_CARD = v4();
export const GET_STATUS_QG = v4();
export const SEND_ACTION_CARD_QG = v4();
export const MOVE_TO = v4();
export const RESET_EXCHANGE_DATA = v4();
export const SET_EXCHANGE_DATA = v4();
export const GET_RATE_LIST_PLAYERS = v4();
export const SET_INFO_MESSAGE_POPUP = v4();
export const SET_ACHIVMENT_PLAYER_QG = v4();
export const RESET_ACHIVMENT_PLAYER_QG = v4();
export const CLOSE_WSOCKET = v4();
export const OPEN_WS_FEED_NEWS_QG = v4();
export const CLOSE_WSOCKET_FEED = 'close/ws_feed_qg' as const;
export const SET_ROLL_DICE_QG = "set/role_dice" as const;
export const RESET_ROLL_DICE = "reset/role_dice" as const;
export const SET_MESSAGE_ERROR_CREATE_GAME = 'set/message_create_game' as const;

/* ===================== MODULE ===================== */
export const quickGame: StoreonModule<IState> = (store) => {
  const socket: ISocket = { get_games: null, feed: null };

  /* ===================== INIT ===================== */
  store.on(_INIT, () => ({
    [EQuickGameStore.ROLE_DICE_STORE]: { rd1: 0, rd2: 0 } as IRoleDiceStore,
    [EQuickGameStore.MESSAGE_ERROR_CREATE_GAME]: {} as errorGameState,
    [EQuickGameStore.POPUP_MESSAGE]: { show: false, message: '', type_card: '' } as IInfoMassagePopup,
    [EQuickGameStore.LIST_ACHIVMENT_PLAYER]: [] as IAchivmentPlayer[],
    [EQuickGameStore.LIST_CARD_QG]: [] as ICard[],
    [EQuickGameStore.DATA_ACTION_CARD_QG]: { '0': undefined } as Record<string, any>,
    [EQuickGameStore.DATA_PLAYER_QG]: {} as IPlayer,
    [EQuickGameStore.QUICK_GAME]: { id: 0, cards: [], is_active: false, players: [] } as IDataQG,
    [EQuickGameStore.LIST_QGS]: [] as IListQGs[],
    [EQuickGameStore.EXCHANGE_DATA]: {},
    [EQuickGameStore.SHOW_RATE]: false,
  }));

  /* ===================== ROLE DICE ===================== */
  store.on(RESET_ROLL_DICE, () => ({
    [EQuickGameStore.ROLE_DICE_STORE]: { rd1: 0, rd2: 0 },
  }));
  store.on(SET_ROLL_DICE_QG, (_, payload: IRoleDiceStore) => ({
    [EQuickGameStore.ROLE_DICE_STORE]: payload,
  }));

  /* ===================== MESSAGE CREATE GAME ===================== */
  store.on(SET_MESSAGE_ERROR_CREATE_GAME, (_, payload: payloadErrorCreateGame[]) => {
    const error: errorGameState = {};
    payload.forEach(({ field, error: msg }) => { error[field] = msg; });
    return { [EQuickGameStore.MESSAGE_ERROR_CREATE_GAME]: error };
  });

  /* ===================== INFO MESSAGE POPUP ===================== */
  store.on(SET_INFO_MESSAGE_POPUP, (_, payload: IInfoMassagePopup) => ({
    [EQuickGameStore.POPUP_MESSAGE]: { ...payload },
  }));

  /* ===================== ACHIVMENT PLAYER ===================== */
  store.on(RESET_ACHIVMENT_PLAYER_QG, () => ({ [EQuickGameStore.LIST_ACHIVMENT_PLAYER]: [] }));
  store.on(SET_ACHIVMENT_PLAYER_QG, (_, payload: IAchivmentPlayer[]) => ({
    [EQuickGameStore.LIST_ACHIVMENT_PLAYER]: [...payload],
  }));

  /* ===================== LIST CARDS ===================== */
  store.on(RESET_LIST_CARDS_QG, () => ({ [EQuickGameStore.LIST_CARD_QG]: [] }));
  store.on(SET_LIST_CARDS_QG, (_, payload: ICard[]) => ({ [EQuickGameStore.LIST_CARD_QG]: [...payload] }));

  /* ===================== DATA ACTION CARD ===================== */
  store.on(RESET_DATA_ACTION_CARD, () => ({ [EQuickGameStore.DATA_ACTION_CARD_QG]: { '0': undefined } }));
  store.on(SET_DATA_ACTION_CARD, (_, payload: Record<string, any>) => ({ [EQuickGameStore.DATA_ACTION_CARD_QG]: { ...payload } }));

  /* ===================== PLAYER DATA ===================== */
  store.on(RET_DATA_PLAYER_QG, () => ({ [EQuickGameStore.DATA_PLAYER_QG]: {} as IPlayer }));
  store.on(SET_DATA_PLAYER_QG, (_, payload: IPlayer) => ({ [EQuickGameStore.DATA_PLAYER_QG]: { ...payload } }));

  /* ===================== QUICK GAME ===================== */
  store.on(RESET_QG, () => ({ [EQuickGameStore.QUICK_GAME]: { id: 0, cards: [], is_active: false, players: [] } }));
  store.on(SET_QG, (_, payload: IDataQG) => ({ [EQuickGameStore.QUICK_GAME]: { ...payload } }));

  /* ===================== LIST QGs ===================== */
  store.on(RET_LIST_QG, () => ({ [EQuickGameStore.LIST_QGS]: [] }));
  store.on(SET_LIST_QG, (_, payload: IListQGs[]) => ({ [EQuickGameStore.LIST_QGS]: [...payload] }));
  store.on(UPDATE_LIST_QG, (state: IState, payload: IListQGs[]) => ({
    ...state,
    [EQuickGameStore.LIST_QGS]: [...payload],
  }));

  /* ===================== EXCHANGE DATA ===================== */
  store.on(SET_EXCHANGE_DATA, (_, payload: any) => ({ [EQuickGameStore.EXCHANGE_DATA]: payload }));
  store.on(RESET_EXCHANGE_DATA, (_, __, { dispatch }) => dispatch(SET_EXCHANGE_DATA, {}));

  /* ===================== SHOW RATE ===================== */
  store.on(GET_RATE_LIST_PLAYERS, (state: IState) => ({
    [EQuickGameStore.SHOW_RATE]: !state.showRate,
  }));

  /* ===================== WS CONNECT ===================== */
  store.on(CONNECT_WS_QG, async (state: IState, payload, { dispatch }) => {
    const URL = getUrlWebsocket(URL_QGS, payload);
    const connectWS = (profileID?: number) =>
      connectWebSocket(
        (socket.get_games = new WebSocket(URL)),
        handleWsError,
        async (res) => {
          const userId = getProfileId(state, profileID);
          if (handleCommonErrors(res, dispatch, payload)) return;
          handlePopupMessages(res);
          handleGamesList(res, dispatch);
          await handleCurrentGame(res, userId, payload, dispatch);
        }
      );

    connectWithUser(state, dispatch, connectWS);
  });

  const connectWithUser = (
    state: IState,
    dispatch: (event: any, payload?: any) => void,
    connectWS: (id?: number) => void
  ) => {
    if (!state.user?.id) {
      dispatch(GET_USERS, { callback: (res: { data: { id: number } }) => connectWS(res.data.id) });
      return;
    }
    if (socket.get_games?.readyState !== WebSocket.OPEN) connectWS(state.user.id);
  };

  /* ===================== WS CLOSE ===================== */
  store.on(CLOSE_WSOCKET, () => {
    if (socket.get_games?.readyState === WebSocket.OPEN) socket.get_games.close();
  });
};
