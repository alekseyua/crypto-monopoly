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
import { NAV_QG_SELECT_PAGE } from "../../routers/config-nav";

// list cards for the game
export const RESET_LIST_CARDS_QG = v4();
export const SET_LIST_CARDS_QG = v4();
export const CREATE_NEW_QG = v4();
export const JOIN_QG = v4();
export const GET_LIST_QG = v4();
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
    // balance: "",
    color: "",
    // is_creater: false,
    // is_start_fast_game: false,
    // fast_game_id: 0,
    // is_start_main_game: false,
    // main_game_id: null,
    properties: [],
    // bankrupt: false,
    current_card: 0,
    move_number: 0,
    current_move: false,
    card_data: {
      data_actions: {
        // info: {
        //   name: "",
        //   country_name: "",
        //   collection_amount: "",
        // },
        // prices: {
        //   hotel: 0,
        //   house: 0,
        // },
        // features: {
        //   base_cost: 0,
        //   house_taxes: [],
        //   monopoly_tax: 0,
        //   one_card_tax: 0,
        // },
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
        // card_id: 0,
        card: {
          id: 0,
          name: "",
        },
        card_type: "",
        // move_end_time_sec: 0,
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
    // auctions:[],
    // name: "",
    players: [],
    // current_turn: 0,
    // is_start: false,
    // bet_amount: "",
    // turn_time: 0,
    // start_money: "",
    // max_players: 0,
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
  store.on(GET_LIST_QG, async (storage: any, payload, { dispatch }) => {
    const URL = getUrlWebsocket(URL_QGS, payload);
    // const URL = getUrlWebsocket(URL_QGS, { action: 'get_games' });

    if (socket.get_games && socket.get_games?.readyState === WebSocket.OPEN) {
      return socket.get_games.send(JSON.stringify({ action: "get_games" }));
    }

    const connectWS = (profileID?: number) =>
      connectWebSocket(
        (socket.get_games = new WebSocket(URL)),
        async (res: any) => {
          if (!!storage.profile?.id) {
            profileID = storage.profile?.id;
          }
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
            socket.get_games?.close();
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
          // // ===================== achivments player======================
          // if (Object.keys(res).includes('user_data')) {
          //   if (Object.keys(res.user_data).includes('player_data')) {
          //     if (Object.keys(res.user_data.player_data).includes('achievements')) {
          //       dispatch(SET_ACHIVMENT_PLAYER_QG, res.user_data.player_data.achievements)
          //     }else {
          //       dispatch(RESET_ACHIVMENT_PLAYER_QG)
          //     }
          //   }
          // }
          // =============================================================

          // ===================== list games quick ======================
          if (Object.keys(res).includes("games_data")) {
            // список игр
            dispatch(SET_LIST_QG, res.games_data);
          }
          // =============================================================

          // ===================== current game quick ====================
          if (Object.keys(res).includes("game_data")) {
            if(!res.game_data.is_active) {
              return payload.redirectTo(NAV_QG_SELECT_PAGE);
            }
            // одна игра
            if (res.game_data?.cards && res.game_data?.cards.length) {
              dispatch(SET_LIST_CARDS_QG, res.game_data.cards); // список карт в игре
            }
            dispatch(SET_QG, res.game_data);
            const currentPlayer: IPlayer[] =
              res.game_data &&
              res.game_data.players.filter((p: any) => +p.user === profileID);
            dispatch(SET_DATA_PLAYER_QG, currentPlayer[0]); // данные пользователя в игре
            // console.log("%c" + JSON.stringify(currentPlayer[0], null, 4), "color: red");
            if (
              isKeyPresentInHash(currentPlayer[0], "show_dice_roll") &&
              currentPlayer[0].show_dice_roll
            ) {
              dispatch(SET_ROLL_DICE_QG, {
                rd1: currentPlayer[0].dice_roll_1,
                rd2: currentPlayer[0].dice_roll_2,
              });
            } else {
              dispatch(RESET_ROLL_DICE_QG);
            }
            console.log("%cOPEN_FEED_WS" + JSON.stringify({ID: res.game_data.id}, null, 4), "color: red");

            dispatch(OPEN_WS_FEED_NEWS_QG, { game_id: res.game_data.id }); // открываем ws для фида новостей игры

            // set dice roll

            //choose_data
            // ====================== ERROR ============================
            // if (isKeyPresentInHash(currentPlayer[0]?.card_data, "actions")) {
            //   console.log(
            //     "%c ALARM into 'card_data' has a key 'actions'",
            //     "color: red",
            //     " player id",
            //     currentPlayer[0]?.user
            //   );
            // }
            // ====================== info message popup ============================
            if (
              isKeyPresentInHash(currentPlayer[0], "popup_data") &&
              Object.keys(currentPlayer[0]).includes("popup_data")
            ) {
              // кратковременные сообщения
              dispatch(SET_INFO_MESSAGE_POPUP, currentPlayer[0].popup_data);
            }
            // =========================================================
            let choose_data: IChooseData | undefined = undefined;
            if (isKeyPresentInHash(currentPlayer[0]?.choose_data, "actions")) {
              choose_data = {
                actions: currentPlayer[0]?.choose_data?.actions,
                card_id: currentPlayer[0]?.choose_data?.card_id,
                card_type: currentPlayer[0]?.choose_data?.card_type,
                card_info: currentPlayer[0]?.choose_data?.card_info,
              };
            }
            // await delay(1000); // ждем 1 секунду, чтобы данные успели сохраниться
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
          } else {
            dispatch(RESET_QG);
            payload?.redirectTo && payload.redirectTo(NAV_QG_SELECT_PAGE);
          }
          // =============================================================
        }
      );

    // if(!socket.get_games && socket.get_games?.readyState !== WebSocket.OPEN) {
    if (!!!storage?.profile?.id || storage?.profile?.id === undefined) {
      dispatch(GET_USERS, {
        callback: (res: { data: { id: number } }) => {
          connectWS(res?.data?.id);
        },
      }); // данные пользователя в игре
      return;
    }
    connectWS();

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
    return dispatch(GET_LIST_QG, { action: "get_games" });
  });
  store.on(MOVE_TO, (state: any, payload, { dispatch }) => {
    if (socket.get_games && socket.get_games?.readyState === WebSocket.OPEN) {
      return socket.get_games.send(JSON.stringify(payload));
    }
    return dispatch(GET_LIST_QG, { action: "get_games" });
  });

  store.on(JOIN_QG, (state: any, payload, { dispatch }) => {
    if (socket.get_games && socket.get_games?.readyState === WebSocket.OPEN) {
      return socket.get_games.send(JSON.stringify(payload));
    }
    return dispatch(GET_LIST_QG, { action: "get_games" });
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
      }, 10000);
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
    const URL = getUrlWebsocket(URL_FEED_QG, payload);
    if (socket.feed && socket.feed?.readyState === WebSocket.OPEN) {
      return;
    }
    // console.log("open ws feed news quick game", URL);
    const connectFeedWS = () =>
      connectWebSocket((socket.feed = new WebSocket(URL)), async (res: any) => {
        // console.log("feed news quick game", res);
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
      socket.feed.close();
    }
  });

}
