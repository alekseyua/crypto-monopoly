import { v4 } from "uuid";
import { _INIT } from "../auth/auth";
import { URL_FEED_QG, URL_QGS } from "../../api/config.js";
import { StoreonStore } from "storeon";
import {
  connectWebSocket,
  delay,
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
import { NAV_QG_SELECT_PAGE } from "../../routers/config-nav";

// list cards for the game
export const RESET_LIST_CARDS_QG = v4();
export const SET_LIST_CARDS_QG = v4();
export const CREATE_NEW_QG = v4();
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

export const quickGame = (store: StoreonStore) => {
  const socket: ISocket = {
    get_games: null,
    feed: null,
  };

  const initRoleDice: IRoleDiceStore = {
    rd1: 0,
    rd2: 0,
  };

  store.on(_INIT, () => ({ roleDiceStore: initRoleDice }));
  store.on(RESET_ROLL_DICE_QG, () => ({ roleDiceStore: initRoleDice }));
  store.on(SET_ROLL_DICE_QG, (_, payload: IRoleDiceStore) => ({
    roleDiceStore: payload,
  }));

  // infoMessagePopup
  const initInfoMessagePopup: IInfoMassagePopup = {
    show: true,
    message: "You are get a chance card Move to Tokyo",
    type_card: "chance",
  };

  store.on(_INIT, () => ({ infoMassagePopup: initInfoMessagePopup }));
  store.on(SET_INFO_MESSAGE_POPUP, (state: any, payload) => ({
    infoMassagePopup: { ...payload },
  }));
  // Achivment player
  const initListAchivmentPlayer: IAchivmentPlayer[] = [];

  store.on(_INIT, () => ({ listAchivmentPlayer: initListAchivmentPlayer }));
  store.on(RESET_ACHIVMENT_PLAYER_QG, () => ({
    listAchivmentPlayer: initListAchivmentPlayer,
  }));
  store.on(SET_ACHIVMENT_PLAYER_QG, (_, payload) => ({
    listAchivmentPlayer: [...payload],
  }));
  // list card
  const initListCardQG: ICard[] = [];
  store.on(_INIT, () => ({ listCardQG: initListCardQG }));
  store.on(RESET_LIST_CARDS_QG, () => ({ listCardQG: initListCardQG }));
  store.on(SET_LIST_CARDS_QG, (_, payload) => ({
    listCardQG: [...payload],
  }));
  // -------- action card data

  const initDataActionCardQG: any = {
    "0": undefined,
  };

  store.on(_INIT, () => ({ dataActionCardQG: initDataActionCardQG }));
  store.on(RESET_DATA_ACTION_CARD, () => ({
    dataActionCardQG: initDataActionCardQG,
  }));
  store.on(SET_DATA_ACTION_CARD, (_, payload) => ({
    dataActionCardQG: { ...payload },
  }));

  // -------- player data
  const initDataPlayerQG: IPlayer = {
    id: 0,
    user: "",
    color: "",
    properties: [],
    current_card: 0,
    move_number: 0,
    current_move: false,
    card_data: {
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
          info: {
            name: "",
            country_name: "",
            collection_amount: "",
          },
          prices: {
            hotel: 0,
            house: 0,
          },
          features: {
            base_cost: 0,
            house_taxes: [],
            monopoly_tax: 0,
            one_card_tax: 0,
          },
          card_type: "",
          start_price: 0,
          highest_bid: 0,
          base_cost: 0,
        },
        card: {
          id: 0,
          name: "",
        },
        card_type: "",
      },
      card_id: 0,
    },
    auction_data: {},
    choose_data: {},
    status: "waiting",
    bill_data: {
      balance: 0,
      property: 0,
      capital: 0,
      jackpot: 0,
      rank: 0,
    },
    username: "",
    move_end_time_sec: 0,
    dice_roll_1: 0,
    dice_roll_2: 0,
    is_concluded: true,
    exchange_data: {},
    popup_data: {
      show: false,
      message: "",
      type_card: "",
    },
    show_dice_roll: false,
  };

  store.on(_INIT, () => ({ dataPlayerQG: initDataPlayerQG }));
  store.on(RET_DATA_PLAYER_QG, () => ({ dataPlayerQG: initDataPlayerQG }));
  store.on(SET_DATA_PLAYER_QG, (_, payload) => ({
    dataPlayerQG: { ...payload },
  }));

  const initDataQG: IDataQG = {
    id: 0,
    cards: [],
    is_active: false,
    players: [],
  };
  store.on(_INIT, () => ({ quickGame: initDataQG }));
  store.on(RESET_QG, () => ({ quickGame: initDataQG }));
  store.on(SET_QG, (_, payload) => ({
    quickGame: { ...payload },
  }));

  const initListQGs: IListQGs[] = [];
  store.on(_INIT, () => ({ listQGs: initListQGs }));
  store.on(RET_LIST_QG, () => ({ listQGs: initListQGs }));
  store.on(SET_LIST_QG, (_, payload) => ({
    listQGs: [...payload],
  }));

  store.on(UPDATE_LIST_QG, (state: any, payload) => {
    const res = [...payload, ...state?.listQGs];
    return {
      ...state,
      listQGs: res,
    };
  });

  store.on(DISCONNECT_LIST_QG, async (_, payload, { dispatch }) => {
    socket.get_games?.close();
  });
  store.on(CONNECT_WS_QG, async (storage: any, payload, { dispatch }) => {
    // if(!storage?.user?.id) return;
    const URL = getUrlWebsocket(URL_QGS, payload);
    // ??????
    // if (socket.get_games && socket.get_games?.readyState === WebSocket.OPEN) {
    //   return socket.get_games.send(JSON.stringify({ action: "get_games" }));
    // }

    const connectWS = (profileID?: number) =>
      connectWebSocket(
        (socket.get_games = new WebSocket(URL)),
        async (res: any) => {
          // debugger
          const start = performance.now();

          if (!!storage?.user?.id) {
            profileID = storage?.user?.id;
          }
          // =================== messages временно ============================

          if (res?.message) {
            dispatch(SET_MESSAGE_QUICK_GAME, {
              title: `User from id = ${profileID}`,
              desc: res.message,
            });
          }
          if (res?.message === "No game with this id") {
            dispatch(RESET_QG);
            dispatch(SET_MESSAGE, [
              {
                title: "нужно с бека титульное название ошибки",
                desc: res.message,
              },
            ]);
            // socket.get_games?.close();
            return payload.redirectTo(NAV_QG_SELECT_PAGE);
          }
          if (res?.error) {
            dispatch(SET_MESSAGE, [
              {
                title: "нужно с бека титульное название ошибки",
                desc: res.message,
              },
            ]);
            return;
          }
          // =============================================================
          // ===================== list games quick ======================
          if (isKeyPresentInHash(res, "games_data")) {
            // список игр
            dispatch(SET_LIST_QG, res.games_data);
          }
          // =============================================================
          // ===================== current game quick ====================
          if (isKeyPresentInHash(res, "game_data")) {
            if(!res.game_data.is_active) {
              return payload.redirectTo(NAV_QG_SELECT_PAGE);
            }
            // открываем ws для фида новостей игры
            dispatch(OPEN_WS_FEED_NEWS_QG, { game_id: res.game_data.id }); 
            // одна игра
            dispatch(SET_QG, res.game_data);
            const currentPlayer: IPlayer[] =
              res.game_data &&
              res.game_data.players.filter((p: any) => +p.user === profileID);
            if(!currentPlayer && !currentPlayer[0]) console.error('Failed to retrieve current player data');
            dispatch(SET_DATA_PLAYER_QG, currentPlayer[0]); // данные пользователя в игре
            // список карточек в игре
            if (res.game_data?.cards && res.game_data?.cards.length) {
              dispatch(SET_LIST_CARDS_QG, res.game_data.cards); // список карт в игре
            }
            // значения выпавших кубиков
            if (
              isKeyPresentInHash(currentPlayer[0], "show_dice_roll") &&
              currentPlayer[0].show_dice_roll
            ) {
              dispatch(SET_ROLL_DICE_QG, {
                rd1: currentPlayer[0].dice_roll_1,
                rd2: currentPlayer[0].dice_roll_2,
              });
              await delay(3000);
            } else {
              dispatch(RESET_ROLL_DICE_QG);
            }

            // ====================== info message popup ============================
            if (isKeyPresentInHash(currentPlayer[0], "popup_data")) {
              // кратковременные сообщения
              dispatch(SET_INFO_MESSAGE_POPUP, currentPlayer[0].popup_data);
            }
            // =========================================================
            type PRIORITIES = {
              CHOOSE_DATA: 0,
              AUCTION_DATA: 1,
              CARD_DATA: 2,
              EXCHANGE_DATA: 3
            }
            let choose_data: IChooseData | undefined = undefined;
            if (isKeyPresentInHash(currentPlayer[0]?.choose_data, "actions")) {
              choose_data = {...currentPlayer[0]?.choose_data as IChooseData};
            }
            if (
              isKeyPresentInHash(currentPlayer[0]?.card_data, "data_actions")
            ) {
              dispatch(SET_DATA_ACTION_CARD, {
                // данные по действиям с картой
                [`${profileID}`]: {
                  auction_data: undefined,
                  data_actions: {
                    actions: currentPlayer[0]?.card_data.data_actions?.actions,
                    card_info:
                      currentPlayer[0]?.card_data.data_actions?.card_info,
                    card: currentPlayer[0]?.card_data.data_actions?.card,
                    card_id: currentPlayer[0]?.card_data.card_id,
                  },
                  choose_data: choose_data,
                  card_id: currentPlayer[0]?.current_card,
                },
              });
            } else if (
              isKeyPresentInHash(currentPlayer[0]?.auction_data, "id")
            ) {
              dispatch(SET_DATA_ACTION_CARD, {
                // данные по действиям с картой
                [`${profileID}`]: {
                  data_actions: undefined,
                  auction_data: currentPlayer[0]?.auction_data,
                  choose_data: choose_data,
                  card_id: currentPlayer[0]?.current_card,
                },
              });
            } else if (
              !isKeyPresentInHash(currentPlayer[0]?.card_data, "actions") &&
              !isKeyPresentInHash(currentPlayer[0]?.auction_data, "id")
            ) {
              dispatch(SET_DATA_ACTION_CARD, {
                [`${profileID}`]: {
                  data_actions: undefined,
                  auction_data: undefined,
                  choose_data: choose_data,
                  card_id: currentPlayer[0]?.current_card,
                },
              });
            } else {
              dispatch(SET_DATA_ACTION_CARD, {
                [`${profileID}`]: {
                  data_actions: undefined,
                  auction_data: undefined,
                  choose_data: undefined,
                  card_id: currentPlayer[0]?.current_card,
                },
              });
            }
            if (
              isKeyPresentInHash(currentPlayer[0]?.exchange_data, "price_to")
            ) {
              dispatch(SET_EXCHANGE_DATA, currentPlayer[0]?.exchange_data);
            } else {
              dispatch(SET_EXCHANGE_DATA, {});
            }
          }
          // else {
          //   dispatch(RESET_QG);
          //   payload?.redirectTo && payload.redirectTo(NAV_QG_SELECT_PAGE);
          // }
          // =============================================================
          const duration = performance.now() - start;
          console.log('%c--------------------------------------------','color: Purple')
          console.log(`%cData Processing state: ${duration.toFixed(2)} ms`, 'color: red; font-weight:bold');
          console.log('%c--------------------------------------------', 'color: Purple')

        }
      );

    if (!!!storage?.user?.id || storage?.user?.id === undefined) {

      dispatch(GET_USERS, {
        callback: (res: { data: { id: number } }) => {
          connectWS(res?.data?.id);
        },
      }); // данные пользователя в игре
      return;
    }
    // console.log('%cCONNECT counter ' + socket.get_games?.readyState, 'color: yellow');
    if(socket.get_games?.readyState !== WebSocket.OPEN){
      connectWS(storage?.user?.id);  
    } 

    // для хода мне нужно знать даные пользователя game_data ->
    // данные по действиям с картой получаем в card_data
    // информация о карточке в card_data -> data_actions -> card_info
  });

  store.on(CREATE_NEW_QG, (_, payload, { dispatch }) => {
    if (socket.get_games && socket.get_games?.readyState === WebSocket.OPEN) {
      socket.get_games.send(JSON.stringify(payload));
    }
  });

  store.on(SEND_ACTION_CARD_QG, (store: any, payload, { dispatch }) => {
    if (socket.get_games && socket.get_games?.readyState === WebSocket.OPEN) {
      const game_id = store.quickGame.id;
      return socket.get_games.send(
        JSON.stringify({
          game_id,
          ...payload,
        })
      );
    }
    // return dispatch(CONNECT_WS_QG, { action: "get_games" });
  });
  store.on(MOVE_TO, (state: any, payload, { dispatch }) => {
    if (socket.get_games && socket.get_games?.readyState === WebSocket.OPEN) {
      return socket.get_games.send(JSON.stringify(payload));
    }
    // return dispatch(CONNECT_WS_QG, { action: "get_games" });
  });

  store.on(JOIN_QG, (state: any, payload, { dispatch }) => {
    if (socket.get_games && socket.get_games?.readyState === WebSocket.OPEN) {
      return socket.get_games.send(JSON.stringify(payload));
    }
    // return dispatch(CONNECT_WS_QG, { action: "get_games" });
  });

  store.on(GET_CARD_ACTION_QG, (store: any, payload) => {
    if (socket.get_games && socket.get_games?.readyState === WebSocket.OPEN) {
      const game_id = store.quickGame.id;
      setTimeout(() => {
        socket.get_games?.send(
          JSON.stringify({
            action: "get_card_action",
            game_id,
            ...payload,
          })
        );
      }, 1000);
    }
  });

  store.on(_INIT, () => ({ exchangeData: {} }));
  store.on(SET_EXCHANGE_DATA, (store, payload, { dispatch }) => ({
    exchangeData: payload,
  }));
  store.on(RESET_EXCHANGE_DATA, (store, payload, { dispatch }) =>
    dispatch(SET_EXCHANGE_DATA, {})
  );

  store.on(_INIT, () => ({ showRate: false }));
  store.on(GET_RATE_LIST_PLAYERS, (s: any, payload) => {
    return { showRate: !s.showRate };
  });

  store.on(CLOSE_WSOCKET, () => {
    if (socket.get_games && socket.get_games?.readyState === WebSocket.OPEN) {
      socket.get_games.close();
    }
  });
  // feds news quick game
  store.on(OPEN_WS_FEED_NEWS_QG, (state: any, payload, { dispatch }) => {
    const URL = getUrlWebsocket(URL_FEED_QG, {...payload, action: 'feed'});
    if (socket.feed && socket.feed?.readyState === WebSocket.OPEN) {
      return;
    }
    const connectFeedWS = () =>
      connectWebSocket((socket.feed = new WebSocket(URL)), async (res: any) => {
        if (isKeyPresentInHash(res, "send_data")) {
          if (isKeyPresentInHash(res.send_data, "achievements")) {
            dispatch(SET_ACHIVMENT_PLAYER_QG, res.send_data.achievements);
          } else {
            dispatch(SET_ACHIVMENT_PLAYER_QG, []);
          }
          if (isKeyPresentInHash(res.send_data, "messages")) {
            dispatch(SET_FEED_NEWS_MESSAGE_QG, res.send_data.messages);
          } else {
            dispatch(SET_FEED_NEWS_MESSAGE_QG, []);
          }
        }
    });
    connectFeedWS();
  });
  store.on(CLOSE_WSOCKET_FEED, () => {
    if (socket.feed && socket.feed?.readyState === WebSocket.OPEN) {
      // socket.feed.close();
    }
  });

}
