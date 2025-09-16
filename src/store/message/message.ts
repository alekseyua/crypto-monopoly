import { StoreonStore } from "storeon";
import { v4 } from "uuid";
import { IMassagesFeed } from "../quick-game/quick-game.d";

export const SET_MESSAGE = v4();
export const SET_MESSAGE_QUICK_GAME = v4();
export const SET_FEED_NEWS_MESSAGE_QG = v4();

interface IMessage {
    title: string;
    desc: string;
}
export interface IMessageQG {
    title: string;
    desc: string;
}


export const message = (store: StoreonStore) => {
    
    const initMessages:IMessage[] = [];

    store.on('@init', () => ({messages: initMessages}));
    store.on(SET_MESSAGE, (state: any, message: {title: string, desc: string}) => ({
        // messages: message
        messages: [message,...state.messages]
    }));
    
    const initMessagesQG:IMessageQG[] = [];

    store.on('@init', () => ({messagesQG: initMessagesQG}));
    store.on(SET_MESSAGE_QUICK_GAME, (state: any, payload: {title: string, desc: string}) => ({
        // messages: message
        messagesQG: [payload,...state.messagesQG]
    }));
    
    const initFeedNewsMessages: IMassagesFeed[] = [];
    store.on("@init", () => ({ feedNewsMessages: initFeedNewsMessages }));
    store.on(
      SET_FEED_NEWS_MESSAGE_QG,
      (state: any, payload: IMassagesFeed[]) => ({
        feedNewsMessages: payload,
      })
    );

}

