import { v4 } from "uuid";
import { StoreonStore } from "storeon";

export const WEBSOCKET_CONNECT = v4();
export const WEBSOCKET_DISCONNECT = v4();
export const SET_MESSAGE_WEBSOCKET = v4();
export const SET_CONNECTION_WEBSOCKET_STATUS = v4();

export const websocket = (store: StoreonStore) => {
 
}