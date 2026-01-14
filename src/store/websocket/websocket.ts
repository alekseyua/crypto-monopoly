import { v4 } from "uuid";
import { StoreonStore } from "storeon";
import { IState } from "..";
import { HANDLE_WEBSOCKET_MESSAGE, HANDLE_WEBSOCKET_MESSAGE_FEED, SET_PROCESSING_QUEUE, SET_QUEUE_MESSAGES_FEED_WS, SET_QUEUE_MESSAGES_WS } from "../const";
import { handleWebSocketMessage, handleWebSocketMessageFeed } from "../helperStore/helperStore";
import { _INIT } from "../auth/auth";

export const WEBSOCKET_CONNECT = v4();
export const WEBSOCKET_DISCONNECT = v4();
export const SET_MESSAGE_WEBSOCKET = v4();
export const SET_CONNECTION_WEBSOCKET_STATUS = v4();

export const websocket = (store: StoreonStore<IState>) => {
    store.on(_INIT, () => ({
        queueMessagesWs: [] as any[],
        queueMessagesFeeds: [] as any[],
    }));

    store.on(SET_PROCESSING_QUEUE, (state: IState, payload: boolean) => {
        return {
            ...state,
            isProcessingQueue: payload,
        };
    });

    store.on(SET_QUEUE_MESSAGES_WS, (_: IState, payload: any[]) => ({
        queueMessagesWs: payload,
    })); 
    store.on(SET_QUEUE_MESSAGES_FEED_WS, (_: IState, payload: any[]) => ({
        queueMessagesFeeds: payload,
    })); 

    store.on(HANDLE_WEBSOCKET_MESSAGE, (state: IState, payload: any, {dispatch}) => {
        if (state.isAnimationRollDice || state.isProcessingQueue) {
            // Если анимация в процессе или очередь сообщений обрабатывается, добавляем новое сообщение в очередь
            dispatch(SET_QUEUE_MESSAGES_WS, [...state.queueMessagesWs, payload]);
            return;
        }
        return handleWebSocketMessage(payload, state, dispatch);
    });

    store.on(HANDLE_WEBSOCKET_MESSAGE_FEED, (state: IState, payload: any, {dispatch}) => {
        console.log('HANDLE_WEBSOCKET_MESSAGE_FEED state.isAnimationRollDice ', state.isAnimationRollDice);
        if(state.isAnimationRollDice){
            dispatch(SET_QUEUE_MESSAGES_FEED_WS, [...state.queueMessagesFeeds, payload]);
            return;
        }
        return handleWebSocketMessageFeed(payload, state, dispatch);
    });



}