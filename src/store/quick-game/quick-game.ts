import { v4 } from "uuid";
import { _INIT } from "../auth/auth"
import { URL_QGS } from "../../api/config.js";
import { StoreonStore } from "storeon";
import { delay, getLocaleStore, isKeyPresentInHash } from "../../helpers/helper";
import type { IUserActions, ICards, IDataQG, ISocket, IPlayer } from './quick-game.d'
import { SET_MESSAGE, SET_MESSAGE_QUICK_GAME } from "../message/message";
import { GET_USERS } from "../users/users";

// list cards for the game
export const RESET_LIST_CARDS_QG = v4();
export const SET_LIST_CARDS_QG = v4();
export const CREATE_NEW_QG = v4();
export const JOIN_QG = v4();
export const GET_LIST_QG = v4();
export const SET_LIST_QG = v4();
export const SET_QG = v4();
export const RESET_QG = v4();
export const UPDATE_LIST_QG = v4();
export const GET_MOVE_QG = v4();
export const GET_ACTION_CARD_QG = v4();
export const SET_SHOW_QG = v4();
export const NULL_SHOW_QG = v4();
export const DISCONNECT_LIST_QG = v4();
export const SET_DATA_PLAYER_QG = v4();

export const RESET_DATA_ACTION_CARD = v4();
export const SET_DATA_ACTION_CARD = v4();

export const GET_STATUS_QG = v4();
export const SEND_ACTION_CARD_QG = v4();
export const MOVE_TO = v4();
export const GET_ACTION_FROM_CARD = v4();
export const RESET_EXCHANGE_DATA = v4();
export const SET_EXCHANGE_DATA = v4();
export const GET_RATE_LIST_PLAYERS = v4();

export const quickGame = (store: StoreonStore) => {
  const socket: ISocket = {
    get_games: null,
  }

  function connectWebSocket(socket: WebSocket, callback: (res: any) => any, action: string = 'pending') {
    if (socket === undefined) return
    socket.onopen = () => {
      console.warn("WebSocket open: ");
    }
    socket.onerror = (error: any) => {
      console.error("ReadyState = ", error?.target?.readyState, "WebSocket error: ", error);
      if (error?.target?.readyState === WebSocket.CLOSED) {
        return
      }
      socket.close(); // Закрываем соединение при ошибке
    }
    socket.onclose = (e: CloseEvent) => {
      console.warn("WebSocket close code: ", e?.code, typeof e?.code);
      if (e?.code === 1006) {
        // Попробуем переподключиться через 2 секунды
        // setTimeout(connectWebSocket, 2000);  
        return console.log('close websocket error 1006')
      }
      if (e?.code === 1000) {
        return console.log('close from client websocket code 1000')
      }
      // setTimeout(connectWebSocket, 2000);  
    }
    socket.onmessage = (event: MessageEvent) => {
      // console.log(socket,'%c√action= "get_player_data"', 'color: green', JSON.parse(event.data)?.player_data?.user)
      // if(!getLocaleStore('profile_id') && !isUserId){
      //   socket.send(JSON.stringify({action: 'get_player_data'}))
      //   isUserId = true
      //   return;
      // }
      callback(JSON.parse(event.data));
      if (action === 'close') {
        // принудительно закрываем
        console.log('принудительно закрываем Websocket')
        socket.close();
      }
      return
    }
  }

  function getUrlWebsocket(url: string, payload: any) {
    url += `?token=${getLocaleStore("token")}`;
    if (Object.keys(payload).length) {
      url += `&${Object.keys(payload)?.map(key => `${key}=${payload[key]}`).join('&')}`;  // append query params to the URL if provided in data object.
    }
    return url;

  }

  // list card
  const initListCardQG: ICards[] = [];

  store.on(_INIT, () => ({ listCardQG: initListCardQG }));
  store.on(RESET_LIST_CARDS_QG, () => ({ listCardQG: initListCardQG }));
  store.on(SET_LIST_CARDS_QG, (_, payload) => ({
    listCardQG: [...payload],
  }));
// -------- action card data

  const initDataActionCardQG: IUserActions = {
    '': undefined
  };

  store.on(_INIT, () => ({ dataActionCardQG: initDataActionCardQG }));
  store.on(RESET_DATA_ACTION_CARD, () => ({ dataActionCardQG: initDataActionCardQG }));
  store.on(SET_DATA_ACTION_CARD, (_, payload) => ({
    dataActionCardQG: {...payload}
  }));

  // -------- player data
  const initDataPlayerQG: IPlayer = {
    id: 0,
    user: '',
    balance: "",
    color: "",
    is_creater: false,
    is_start_fast_game: false,
    fast_game_id: 0,
    is_start_main_game: false,
    main_game_id: null,
    properties: [],
    bankrupt: false,
    current_card: 0,
    move_number: 0,
    current_move: false,
    card_data: {},
    auction_data: {},
    choose_data: {},
    status: 'waiting',
    bill_data: {
      balance: 0,
      property: 0,
      capital: 0,
    }
  };

  store.on(_INIT, () => ({ dataPlayerQG: initDataPlayerQG }));
  store.on(SET_DATA_PLAYER_QG, (_, payload) => ({
    dataPlayerQG: { ...payload },
  }));

  const initDataQG: IDataQG = {
    id: null,
    cards: [],
    name: '',
    players: [],
    current_turn: 0,
    is_start: false,
    bet_amount: '',
    turn_time: 0,
    start_money: '',
    max_players: 0,
  };

  store.on(_INIT, () => ({ quickGame: initDataQG }));
  store.on(RESET_QG, () => ({ quickGame: initDataQG }));
  store.on(SET_QG, (_, payload) => ({
    quickGame: { ...payload },
  }));

  interface IListQGs {
  }
  const initListQGs: IListQGs[] = [];
  store.on(_INIT, () => ({ listQGs: initListQGs }));
  store.on(SET_LIST_QG, (_, payload) => ({
    listQGs: [...payload],
  }));

  store.on(UPDATE_LIST_QG,
    (state: any, payload) => {
      const res = [...payload, ...state?.listQGs];
      return {
        ...state,
        listQGs: res
      }
    });

  store.on(DISCONNECT_LIST_QG, async (_, payload, { dispatch }) => {
    socket.get_games?.close();
  })
  store.on(GET_LIST_QG, async (storage: any, payload, { dispatch }) => {
    const URL = getUrlWebsocket(URL_QGS, payload);
    // const URL = getUrlWebsocket(URL_QGS, { action: 'get_games' });

    if (socket.get_games && socket.get_games?.readyState === WebSocket.OPEN) {
      return socket.get_games.send(JSON.stringify({ action: 'get_games' }))
    }

       const connectWS = (profileID?: number) => connectWebSocket(socket.get_games = new WebSocket(URL), async (res: any) => {
        if(!!storage.profile?.id) {
          profileID = storage.profile?.id
        }
        if(res?.message){
          dispatch(SET_MESSAGE_QUICK_GAME, {
            title: `User from id = ${profileID}`,
            desc: res.message
          })
        }
        if (res?.message === "No game with this id") {
          dispatch(RESET_QG)
          dispatch(SET_MESSAGE, {
            title: 'нужно с бека титульное название ошибки',
            desc: res.message
          });
          socket.get_games?.close();
          return payload.redirectTo('/quick-game-select')
        }
        if (res?.error) {
          dispatch(SET_MESSAGE, {
            title: 'нужно с бека титульное название ошибки',
            desc: res.message
          });
          return;
        }
        if (Object.keys(res).includes('games_data')) { // список игр
          dispatch(SET_LIST_QG, res.games_data)
        }
        if (Object.keys(res).includes('game_data')) { // одна игра
          if (res.game_data?.cards && res.game_data?.cards.length) {
            dispatch(SET_LIST_CARDS_QG, res.game_data.cards);// список карт в игре
          }
          dispatch(SET_QG, res.game_data)
          const currentPlayer = res.game_data && res.game_data.players.filter((p: any) => +p.user === profileID);
          dispatch(SET_DATA_PLAYER_QG, currentPlayer[0]);// данные пользователя в игре
//choose_data 
// ====================== ERROR ============================
          if(isKeyPresentInHash(currentPlayer[0]?.card_data, 'actions')){
            console.log("%c ALARM into 'card_data' has a key 'actions'","color: red", ' player id', currentPlayer[0]?.user)
          }
// =========================================================
              let choose_data = undefined;
              if(isKeyPresentInHash(currentPlayer[0]?.choose_data, 'actions')){
                choose_data = {
                  actions: currentPlayer[0]?.choose_data?.actions,
                }
              }
              // await delay(1000); // ждем 1 секунду, чтобы данные успели сохраниться
              if(isKeyPresentInHash(currentPlayer[0]?.card_data, 'data_actions')){
                dispatch(SET_DATA_ACTION_CARD, { // данные по действиям с картой
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

                  }
                })
              } else if(isKeyPresentInHash(currentPlayer[0]?.auction_data, 'id')){
                dispatch(SET_DATA_ACTION_CARD, { // данные по действиям с картой
                  [`${profileID}`]: {
                    data_actions: undefined,
                    auction_data: currentPlayer[0]?.auction_data,
                    choose_data: choose_data,
                    card_id: currentPlayer[0]?.current_card,

                  }
                })
              }else if(!isKeyPresentInHash(currentPlayer[0]?.card_data, 'actions') && !isKeyPresentInHash(currentPlayer[0]?.auction_data, 'id')){
                  dispatch(SET_DATA_ACTION_CARD, {
                    [`${profileID}`]: {
                    data_actions: undefined,
                    auction_data: undefined,
                    choose_data: choose_data,
                    card_id: currentPlayer[0]?.current_card,

                  }
                })
              }
              if(isKeyPresentInHash(currentPlayer[0]?.exchange_data, 'price_to')){
                dispatch(SET_EXCHANGE_DATA, currentPlayer[0]?.exchange_data)
              }else{
                dispatch(SET_EXCHANGE_DATA,{})
              }
        }
    });

    // if(!socket.get_games && socket.get_games?.readyState !== WebSocket.OPEN) {
    if (!!!storage?.profile?.id || storage?.profile?.id === undefined) {
        dispatch(GET_USERS, {
          callback: (res: any) => {
            connectWS(res?.data?.id);
          }
        });// данные пользователя в игре
        return
    }
    connectWS()
 

    // для хода мне нужно знать даные пользователя game_data -> 
    // данные по действиям с картой получаем в card_data
    // информация о карточке в card_data -> data_actions -> card_info

  });

  store.on(CREATE_NEW_QG, (_, payload, { dispatch }) => {

    if (socket.get_games && socket.get_games?.readyState === WebSocket.OPEN) {
      console.log('create_game')
      socket.get_games.send(JSON.stringify(payload));
    }
  });

  store.on(SEND_ACTION_CARD_QG, (store: any, payload, { dispatch }) => {
    console.log('buy card', { status: socket.get_games?.readyState, payload })
    if (socket.get_games && socket.get_games?.readyState === WebSocket.OPEN) {
      const game_id = store.quickGame.id;

      return socket.get_games.send(JSON.stringify({
        game_id,
        ...payload
      }));
    }
    return dispatch(GET_LIST_QG, { action: 'get_games' });
  });
  store.on(MOVE_TO, (state: any, payload, { dispatch }) => {
    if (socket.get_games && socket.get_games?.readyState === WebSocket.OPEN) {
      return socket.get_games.send(JSON.stringify(payload));
    }
    return dispatch(GET_LIST_QG, { action: 'get_games' });
  });

  store.on(JOIN_QG, (state: any, payload, { dispatch }) => {
    if (socket.get_games && socket.get_games?.readyState === WebSocket.OPEN) {
      return socket.get_games.send(JSON.stringify(payload));
    }
    return dispatch(GET_LIST_QG, { action: 'get_games' });
  });

  store.on(GET_MOVE_QG, (store: any, payload) => {
    if (socket.get_games && socket.get_games?.readyState === WebSocket.OPEN) {
      const game_id = store.quickGame.id;
      socket.get_games?.send(JSON.stringify({
        game_id,
        ...payload
      }));
    }
  });
  store.on(GET_ACTION_FROM_CARD, (store: any, payload) => {
    if (socket.get_games && socket.get_games?.readyState === WebSocket.OPEN) {
      const game_id = store.quickGame.id;
      socket.get_games?.send(JSON.stringify({...payload, game_id}));
    }
  });

  store.on(GET_ACTION_CARD_QG, (store: any, payload) => {
    console.log('get_action_card_in_game is ready', { status: socket.get_games?.readyState });
    if (socket.get_games && socket.get_games?.readyState === WebSocket.OPEN) {
      const game_id = store.quickGame.id;
      socket.get_games?.send(JSON.stringify({
        action: 'get_card_action',
        game_id
      }));
    }

  });

  store.on(RESET_EXCHANGE_DATA, (store, payload, {dispatch})=> {
    return dispatch(SET_EXCHANGE_DATA, {})
  })

  store.on(_INIT,()=>({exchangeData: {}}))
  store.on(SET_EXCHANGE_DATA, (store, payload, {dispatch})=> {
    return  ({exchangeData: payload})
  })

  store.on(_INIT,()=>({showRate: false}));
  store.on(GET_RATE_LIST_PLAYERS, (s: any, payload)=>{
    return {showRate: !s.showRate}
  })
}