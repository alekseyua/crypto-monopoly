import { StoreonStore } from "storeon";
import { v4 } from "uuid";
import { _INIT } from "../auth/auth";
import { HeaderName, HeaderNameEnum } from "./header.d";

export const SET_HEADER_NAME_IS_SHOW = v4();

export const headerStore = (store: StoreonStore) => {
    const initHeaderName: HeaderName = HeaderNameEnum.MAIN_GAME;
    store.on(_INIT, () => ({ headerName: initHeaderName }));
    store.on(SET_HEADER_NAME_IS_SHOW, (_, payload) => ({
      headerName: payload,
    }));
}