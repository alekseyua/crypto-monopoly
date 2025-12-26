import { v4 } from "uuid";
import { _INIT } from "../auth/auth";
import { URL_FEED_QG, URL_QGS } from "../../api/config.js";
import { StoreonStore } from "storeon";
import {
  connectWebSocket,
  getUrlWebsocket,
  isKeyPresentInHash,
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
  IRoleDiceStore,
} from "./quick-game.d";
import {
  SET_FEED_NEWS_MESSAGE_QG,
  SET_MESSAGE,
  SET_MESSAGE_QUICK_GAME,
} from "../message/message";
import { GET_USERS } from "../users/users";
import { NAV_QG_FIELD_PAGE, NAV_QG_SELECT_PAGE } from "../../routers/config-nav";
import {payloadErrorCreateGame, errorGameState} from "./error-game.d";
import { SET_MODAL } from "../modal/modal";

// list cards for the game
export const RESET_LIST_CARDS_QG = v4();
export const SET_LIST_CARDS_QG = v4();
export const CREATE_NEW_QG = 'create/new_qg' as const;
export const JOIN_QG = v4();
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

//set dice roll quick game
export const SET_ROLL_DICE_QG = "set/role_dice" as const;
export const RESET_ROLL_DICE_QG = "reset/role_dice" as const;

// massage create game
export const SET_MESSAGE_ERROR_CREATE_GAME = 'set/message_create_game' as const;

export const enum EStoreQG {
  ROLE_DICE_STORE = 'roleDiceStore',
  MESSAGE_ERROR_CREATE_GAME = 'messageErrorCreateGame',
}
export const quickGame = (store: StoreonStore) => {
  const socket: ISocket = {
    get_games: null,
    feed: null,
  };

  // --------------- INIT -----------------
  store.on(_INIT, () => ({
    // Role Dice Store
    roleDiceStore: {
      rd1: 0,
      rd2: 0,
    } as IRoleDiceStore,

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

  // --------------- Role Dice -----------------
  store.on(RESET_ROLL_DICE_QG, () => ({ [EStoreQG.ROLE_DICE_STORE]: { rd1: 0, rd2: 0 } }));
  store.on(SET_ROLL_DICE_QG, (_, payload: IRoleDiceStore) => ({
    [EStoreQG.ROLE_DICE_STORE]: payload,
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
          if (!!storage?.user?.id) profileID = storage?.user?.id;

          // ===== Messages handling =====
          if (isKeyPresentInHash(res, 'message_popup')) console.table(res.message_popup);
          if (res?.message === "No game with this id") {
            dispatch(RESET_QG);
            dispatch(SET_MESSAGE, [{ title: "Error", desc: res.message }]);
            return payload.redirectTo(NAV_QG_SELECT_PAGE);
          }
          if (res?.error && isKeyPresentInHash(res, 'game_data_creating')) {
            dispatch(SET_MESSAGE_ERROR_CREATE_GAME, res.game_data_creating);
            setTimeout(()=>{
              dispatch(SET_MESSAGE_ERROR_CREATE_GAME, []);
            },3000);
            return;
          }else{
              dispatch(SET_MODAL, { isOpen: false });
          }

          // ===== List games quick =====
          if (isKeyPresentInHash(res, "games_data")) dispatch(SET_LIST_QG, res.games_data);

          // ===== Current game quick =====
          if (isKeyPresentInHash(res, "game_data")) {
            const currentPlayer: IPlayer[] =
              res.game_data?.players.filter((p: any) => +p.user === profileID);
            if (!currentPlayer || !currentPlayer[0]) console.error('Failed to retrieve current player data');

            dispatch(SET_DATA_PLAYER_QG, currentPlayer[0]);
            if (!res.game_data.is_active || !currentPlayer.length) {
              return payload.redirectTo(NAV_QG_SELECT_PAGE);
            } else if (payload?.location?.pathname !== NAV_QG_FIELD_PAGE && res.game_data.is_start) {
              payload.redirectTo(NAV_QG_FIELD_PAGE);
            }

            dispatch(OPEN_WS_FEED_NEWS_QG, { game_id: res.game_data.id });
            dispatch(SET_QG, res.game_data);
            if (res.game_data?.cards?.length) dispatch(SET_LIST_CARDS_QG, res.game_data.cards);

            if (currentPlayer[0].show_dice_roll) {
              dispatch(SET_ROLL_DICE_QG, {
                rd1: currentPlayer[0].dice_roll_1,
                rd2: currentPlayer[0].dice_roll_2,
              });
               
            } else {
              dispatch(RESET_ROLL_DICE_QG);
            }

            if (isKeyPresentInHash(currentPlayer[0]?.popup_data, "show")) {
              dispatch(SET_INFO_MESSAGE_POPUP, currentPlayer[0].popup_data);
            }

            let choose_data: IChooseData | undefined = undefined;
            if (isKeyPresentInHash(currentPlayer[0]?.choose_data, "actions")) {
              choose_data = { ...currentPlayer[0]?.choose_data };
            }

            if (isKeyPresentInHash(currentPlayer[0]?.card_data, "data_actions")) {
              dispatch(SET_DATA_ACTION_CARD, {
                [`${profileID}`]: {
                  auction_data: undefined,
                  data_actions: {
                    actions: currentPlayer[0]?.card_data.data_actions?.actions,
                    card_info: currentPlayer[0]?.card_data.data_actions?.card_info,
                    card: currentPlayer[0]?.card_data.data_actions?.card,
                    card_id: currentPlayer[0]?.card_data.card_id,
                  },
                  choose_data: choose_data,
                  card_id: currentPlayer[0]?.current_card,
                },
              });
            } else if (isKeyPresentInHash(currentPlayer[0]?.auction_data, "id")) {
              dispatch(SET_DATA_ACTION_CARD, {
                [`${profileID}`]: {
                  data_actions: undefined,
                  auction_data: currentPlayer[0]?.auction_data,
                  choose_data: choose_data,
                  card_id: currentPlayer[0]?.current_card,
                },
              });
            } else {
              dispatch(SET_DATA_ACTION_CARD, {
                [`${profileID}`]: {
                  data_actions: undefined,
                  auction_data: undefined,
                  choose_data: choose_data,
                  card_id: currentPlayer[0]?.current_card,
                },
              });
            }

            if (isKeyPresentInHash(currentPlayer[0]?.exchange_data, "price_to")) {
              dispatch(SET_EXCHANGE_DATA, currentPlayer[0]?.exchange_data);
            } else {
              dispatch(SET_EXCHANGE_DATA, {});
            }
          }
        }
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

  store.on(JOIN_QG, (state: any, payload) => {
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
        async (res: any) => {
          if (isKeyPresentInHash(res, "send_data")) {
            dispatch(SET_ACHIVMENT_PLAYER_QG, res.send_data.achievements ?? []);
            dispatch(SET_FEED_NEWS_MESSAGE_QG, res.send_data.messages ?? []);
          }
        });
    connectFeedWS();
  });

  store.on(CLOSE_WSOCKET_FEED, () => {
    if (socket.feed?.readyState === WebSocket.OPEN) socket.feed.close();
  });
};
