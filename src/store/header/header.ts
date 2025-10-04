import { StoreonStore } from "storeon";
import { _INIT } from "../auth/auth";
import { HeaderName, HeaderNameEnum } from "./header.d";

export const SET_HEADER_NAME_IS_SHOW = 'header/set_name' as const;

export const headerStore = (store: StoreonStore) => {
    const initHeaderName: HeaderName = HeaderNameEnum.MAIN_GAME;
    store.on(_INIT, () => ({ headerName: initHeaderName }));
    store.on(SET_HEADER_NAME_IS_SHOW, (_, payload: HeaderName) => ({
      headerName: payload,
    }));
}