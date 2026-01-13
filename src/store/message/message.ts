import { StoreonStore } from "storeon";
import { v4 } from "uuid";
import { IMassagesFeed } from "../quick-game/quick-game.type";
import { _INIT } from "../auth/auth";

export const SET_MESSAGE = 'message/set_new message' as const;
export const SET_MESSAGE_QUICK_GAME = v4();
export const SET_FEED_NEWS_MESSAGE_QG = v4();

export interface IMessage {
    title: string;
    desc: string;
}
export interface IMessageQG {
    title: string;
    desc: string;
}


export const message = (store: StoreonStore) => {
    
    const initMessages:IMessage[] = [];
    const initMessagesQG:IMessageQG[] = [];
    const initFeedNewsMessages: IMassagesFeed[] = [];

    store.on(_INIT, () => ({
      messages: initMessages,
      messagesQG: initMessagesQG,
      feedNewsMessages: initFeedNewsMessages,
    }));
    store.on(SET_MESSAGE, (state: any, payload: IMessage[]) => ({
      // messages: message
      messages: [...payload, ...state.messages],
    }));

    store.on(SET_MESSAGE_QUICK_GAME, (state: any, payload: {title: string, desc: string}) => ({
        // messages: message
        messagesQG: [payload,...state.messagesQG]
    }));
    
    store.on(
      SET_FEED_NEWS_MESSAGE_QG,
      (state: any, payload: IMassagesFeed[]) => ({
        feedNewsMessages: payload,
      })
    );

}

