import { v4 } from "uuid";
import { URL_QGS } from "../../api/config";
import { getLocaleStore } from "../../helpers/helper";
import { _INIT } from "../auth/auth";
import { StoreonStore } from "storeon";
import { SET_LIST_QG, UPDATE_LIST_QG } from "../quick-game/quick-game";

export const WEBSOCKET_CONNECT = v4();
export const WEBSOCKET_DISCONNECT = v4();
export const SET_MESSAGE_WEBSOCKET = v4();
export const SET_CONNECTION_WEBSOCKET_STATUS = v4();

export const websocket = (store:StoreonStore) => {
    let socket: WebSocket | null | any = null;
    // websocket connection logic
    //...
    store.on(_INIT, ()=>({messageSocket: []}))
    store.on(_INIT, ()=>({connectedSocket: false}))
    
    store.on(SET_CONNECTION_WEBSOCKET_STATUS, (_, data) => ({connectedSocket: data}));

    store.on(SET_MESSAGE_WEBSOCKET, (_, data) => ({messageSocket: data}));

    store.on(WEBSOCKET_CONNECT, (_, data={}, {dispatch}) => {
        
        function connectWebSocket(socket: WebSocket) {
            console.log({socket})
            let URL = URL_QGS + `?token=${ getLocaleStore("token") }`;
            if(Object.keys(data).length){
                URL += `&${Object.keys(data)?.map(key => `${key}=${data[key]}`).join('&')}`;  // append query params to the URL if provided in data object.
            }
            
            socket = new WebSocket(URL);
            socket.onopen = () => {
                console.error("WebSocket open: ");
                dispatch(SET_CONNECTION_WEBSOCKET_STATUS, true);
                
            }
            socket.onerror = (error: any) => {
                console.error("ReadyState = ", error?.target?.readyState, "WebSocket error: ", error);
                if(error?.target?.readyState === WebSocket.CLOSED){
                    return dispatch(SET_CONNECTION_WEBSOCKET_STATUS, false);
                }
                dispatch(SET_CONNECTION_WEBSOCKET_STATUS, false);
                socket.close(); // Закрываем соединение при ошибке
            }
            socket.onclose = (e: CloseEvent) => {
                console.error("WebSocket close: ",e, " code close = ", e?.code);
                dispatch(SET_CONNECTION_WEBSOCKET_STATUS, false);
                if(e?.code === 1006){
                    // Попробуем переподключиться через 2 секунды
                    return console.log('close websocket error 1006')
                }
                setTimeout(connectWebSocket, 2000);  
            }
            socket.onmessage = (event: MessageEvent) => {
                dispatch(SET_MESSAGE_WEBSOCKET, JSON.parse(event.data));

                console.log('event.data.game_data', event.data)
                console.log(data?.action ,'event. typeof ', typeof event.data)
                // if(data?.action === 'get_games' && JSON.parse(event?.data)?.game_data !== undefined){
                //     dispatch(SET_LIST_QG, JSON.parse(event.data).game_data);
                // }
                if(data?.action === 'create_game' && JSON.parse(event?.data)?.game_data !== undefined){
                    dispatch(UPDATE_LIST_QG, [JSON.parse(event.data).game_data]);
                }
                if(data?.action === 'join_game' && JSON.parse(event?.data)?.game_data !== undefined){
                    dispatch(UPDATE_LIST_QG, [JSON.parse(event.data).game_data]);
                }
            }
            
            
        }
        if(!socket && socket?.readyState !== WebSocket.OPEN) {
            connectWebSocket(socket);
        }else{
            console.log('samething else')
            connectWebSocket(socket);
        }  

    });

    store.on(WEBSOCKET_DISCONNECT, () => {
        if(socket && socket.readyState === WebSocket.OPEN) {
            console.debug("WebSocket full close: ");

            socket.close();
        }
        socket = null;
    })
}