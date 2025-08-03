import { _INIT } from "../auth/auth.ts";

export const SET_ERROR = 'set-error';
export const CLEAR_ERROR = "clear-error";

export const error = store => {

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