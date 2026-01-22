import { v4 } from "uuid";
import { _INIT } from "../auth/auth";
import { URL_FEED_QG, URL_QGS } from "../../api/config.js";
import { StoreonStore } from "storeon";
import {
  connectWebSocket,
  getUrlWebsocket,
} from "../../helpers/helper";
import type {
  ICard,
  IDataQG,
  ISocket,
  IPlayer,
  IInfoMassagePopup,
  IAchivmentPlayer,
  IListQGs,
  IChooseData,
} from "./quick-game.type";
import { GET_USERS } from "../users/users";
import {payloadErrorCreateGame, errorGameState} from "./error-game.d";
import { EStoreQG, HANDLE_WEBSOCKET_MESSAGE, HANDLE_WEBSOCKET_MESSAGE_FEED } from "../const";

// list cards for the game
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

// feed news quick game
export const OPEN_WS_FEED_NEWS_QG = v4();
export const CLOSE_WSOCKET_FEED = 'close/ws_feed_qg' as const;



// massage create game
export const SET_MESSAGE_ERROR_CREATE_GAME = 'set/message_create_game' as const;

export const quickGame = (store: StoreonStore) => {
  const socket: ISocket = {
    get_games: null,
    feed: null,
  };

  // --------------- INIT -----------------
  store.on(_INIT, () => ({
    // Message create game
    [EStoreQG.MESSAGE_ERROR_CREATE_GAME]: {} as errorGameState,

    // Info message popup
    infoMassagePopup: {
      show: false,
      message: "",
      type_card: "",
    } as IInfoMassagePopup,

    // Achivment player
    listAchivmentPlayer: [] as IAchivmentPlayer[],

    // List cards
    listCardQG: [] as ICard[],

    // Data action card
    dataActionCardQG: {
      "0": undefined,
    } as Record<string, any>,

    // Player data
    dataPlayerQG: {
      id: 0,
      user: "",
      username: "",
      color: "",
      properties: [],
      current_card: 0,
      move_number: 0,
      current_move: false,
      card_data: {
        card_id: 0,
        data_actions: {
          actions: {
            buy: false,
            auction: false,
            add_card: false,
            pay: false,
            add_chance: false,
            move: false,
            move_to: false,
            pay_tax_or_add_card_chance: false,
            roll_the_dice_freedom: false,
          },
          card_info: {
            info: { name: "", country_name: "", collection_amount: "" },
            prices: { hotel: 0, house: 0 },
            features: { base_cost: 0, house_taxes: [], monopoly_tax: 0, one_card_tax: 0, sell_price: 0 },
            card_type: "",
            start_price: 0,
            highest_bid: 0,
            base_cost: 0,
          },
          card: { id: 0, name: "" },
          card_type: "",
        },
      },
      auction_data: {},
      choose_data: {
        actions: {
          auction: false,
          pawn: false,
          sell: false,
          build: false,
          redeem: false,
          exchange: false,
          can_sell_property: false,
        },
        card_id: 0,
        card_type: "",
        card_info: {
          info: { name: "", country_name: "", collection_amount: "" },
          prices: { hotel: 0, house: 0 },
          features: { base_cost: 0, house_taxes: [], monopoly_tax: 0, one_card_tax: 0, sell_price: 0 },
          card_type: "",
          start_price: 0,
          highest_bid: 0,
          base_cost: 0,
        }
      } as IChooseData,
      status: "waiting",
      bill_data: { balance: 0, property: 0, capital: 0, jackpot: 0, rank: 0 },
      move_end_time_sec: 0,
      dice_roll_1: 0,
      dice_roll_2: 0,
      is_concluded: true,
      exchange_data: {},
      popup_data: { show: false, message: "", type_card: "" },
      show_dice_roll: false,
    } as IPlayer,

    // Quick Game
    quickGame: {
      id: 0,
      cards: [],
      is_active: false,
      players: [],
    } as IDataQG,

    // List of QGs
    listQGs: [] as IListQGs[],

    // Exchange data
    exchangeData: {},

    // Show rate list
    showRate: false,
  }));



  // --------------- Message create game -----------------
  store.on(SET_MESSAGE_ERROR_CREATE_GAME, (_, payload: payloadErrorCreateGame[]) => {
    let error: errorGameState = {};
    payload.forEach((err: payloadErrorCreateGame) => {
      error = { ...error, [err.field]: err.error };
    });
    return {[EStoreQG.MESSAGE_ERROR_CREATE_GAME]: error};
  });

  // --------------- Info message popup -----------------
  store.on(SET_INFO_MESSAGE_POPUP, (state: any, payload) => ({
    infoMassagePopup: { ...payload },
  }));

  // --------------- Achivment player -----------------
  store.on(RESET_ACHIVMENT_PLAYER_QG, () => ({ listAchivmentPlayer: [] }));
  store.on(SET_ACHIVMENT_PLAYER_QG, (_, payload) => ({ listAchivmentPlayer: [...payload] }));

  // --------------- List cards -----------------
  store.on(RESET_LIST_CARDS_QG, () => ({ listCardQG: [] }));
  store.on(SET_LIST_CARDS_QG, (_, payload) => ({ listCardQG: [...payload] }));

  // --------------- Action card data -----------------
  store.on(RESET_DATA_ACTION_CARD, () => ({ dataActionCardQG: { "0": undefined } }));
  store.on(SET_DATA_ACTION_CARD, (_, payload) => ({ dataActionCardQG: { ...payload } }));

  // --------------- Player data -----------------
  store.on(RET_DATA_PLAYER_QG, () => ({ dataPlayerQG: { ...{} } }));
  store.on(SET_DATA_PLAYER_QG, (_, payload) => ({ dataPlayerQG: { ...payload } }));

  // --------------- Quick game -----------------
  store.on(RESET_QG, () => ({ quickGame: { id: 0, cards: [], is_active: false, players: [] } }));
  store.on(SET_QG, (_, payload) => ({ quickGame: { ...payload } }));

  // --------------- List of QGs -----------------
  store.on(RET_LIST_QG, () => ({ listQGs: [] }));
  store.on(SET_LIST_QG, (_, payload) => ({ listQGs: [...payload] }));
  store.on(UPDATE_LIST_QG, (state: any, payload) => ({
    ...state,
    listQGs: [...payload, ...state.listQGs],
  }));

  // --------------- Disconnect WS -----------------
  store.on(DISCONNECT_LIST_QG, async (_, payload, { dispatch }) => {
    socket.get_games?.close();
  });

  // --------------- CONNECT_WS_QG -----------------
  store.on(CONNECT_WS_QG, async (storage: any, payload, { dispatch }) => {
    const URL = getUrlWebsocket(URL_QGS, payload);
    const connectWS = (profileID?: number) =>
      connectWebSocket(
        (socket.get_games = new WebSocket(URL)),
        (err: any) => console.error('WebSocket error:', err),
        async (res: any) => {
          dispatch(HANDLE_WEBSOCKET_MESSAGE, res);
         
        }
        // ended WebSocket onmessage
      );

    if (!storage?.user?.id) {
      dispatch(GET_USERS, { callback: (res: { data: { id: number } }) => connectWS(res?.data?.id) });
      return;
    }
    if (socket.get_games?.readyState !== WebSocket.OPEN) connectWS(storage?.user?.id);
  });

  // --------------- CREATE / JOIN / ACTION -----------------
  store.on(CREATE_NEW_QG, (_, payload, { dispatch }) => {
    if (socket.get_games?.readyState === WebSocket.OPEN) socket.get_games.send(JSON.stringify(payload));
  });

  store.on(SEND_ACTION_CARD_QG, (store: any, payload) => {
    if (socket.get_games?.readyState === WebSocket.OPEN) {
      socket.get_games.send(JSON.stringify({ game_id: store.quickGame.id, ...payload }));
    }
  });

  store.on(MOVE_TO, (state: any, payload) => {
    if (socket.get_games?.readyState === WebSocket.OPEN) socket.get_games.send(JSON.stringify(payload));
  });

  store.on(SEND_MSG_SELECT_GAME, (state: any, payload) => {
    if (socket.get_games?.readyState === WebSocket.OPEN) socket.get_games.send(JSON.stringify(payload));
  });

  store.on(GET_CARD_ACTION_QG, (store: any, payload) => {
    if (socket.get_games?.readyState === WebSocket.OPEN) {
      const game_id = store.quickGame.id;
      setTimeout(() => {
        socket.get_games?.send(JSON.stringify({ action: "get_card_action", game_id, ...payload }));
      }, 0);
    }
  });

  // --------------- Exchange Data -----------------
  store.on(SET_EXCHANGE_DATA, (store, payload) => ({ exchangeData: payload }));
  store.on(RESET_EXCHANGE_DATA, (store, payload, { dispatch }) => dispatch(SET_EXCHANGE_DATA, {}));

  // --------------- Show Rate -----------------
  store.on(GET_RATE_LIST_PLAYERS, (s: any) => ({ showRate: !s.showRate }));

  // --------------- CLOSE WS -----------------
  store.on(CLOSE_WSOCKET, () => { if (socket.get_games?.readyState === WebSocket.OPEN) socket.get_games.close(); });

  // --------------- Feed News WS -----------------
  store.on(OPEN_WS_FEED_NEWS_QG, (state: any, payload, { dispatch }) => {
    const URL = getUrlWebsocket(URL_FEED_QG, { ...payload, action: 'feed' });
    if (socket.feed?.readyState === WebSocket.OPEN) return;

    const connectFeedWS = () =>
      connectWebSocket(socket.feed = new WebSocket(URL),
        (err: any) => console.error('WebSocket feed error:', err),
        (res: any) => {
          dispatch(HANDLE_WEBSOCKET_MESSAGE_FEED, res);          
        });
    connectFeedWS();
  });

  store.on(CLOSE_WSOCKET_FEED, () => {
    if (socket.feed?.readyState === WebSocket.OPEN) socket.feed.close();
  });
};
