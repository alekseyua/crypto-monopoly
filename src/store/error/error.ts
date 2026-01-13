import { StoreonStore } from "storeon";
import { _INIT } from "../auth/auth";

export const SET_ERROR = 'set-error' as const;
export const CLEAR_ERROR = "clear-error" as const;

export interface IError {

}

export const error = (store: StoreonStore) => {

    // initialize error state
    store.on(_INIT, () => ({ error: null }));

    // set error state
    store.on(SET_ERROR, (_, error) => ({ error }));

    // clear error state
    store.on(CLEAR_ERROR, () => ({ error: null }));

    // error handling
    store.on(SET_ERROR, (_, error) => {
        console.error(error);
    });
}