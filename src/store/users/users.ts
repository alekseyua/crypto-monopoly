import api from "../../api/api.js";
import { API_GET_USER } from "../../api/config.js";
import { StoreonStore } from "storeon";
import { v4 } from "uuid";
import { _INIT } from "../auth/auth";
import { deepEqual, getLocaleStore } from "../../helpers/helper";
import { IUser, IUserPayload } from "./user.d";

export const SET_USERS: string = v4();
export const GET_USERS = 'profile/GET_USERS' as const;
export const SET_USERS_NULL: string = v4();


export const users = (store: StoreonStore) => {
    const initUser= {}
    store.on(_INIT, () => ({ user: initUser }));
    store.on(SET_USERS, (_, payload) => ({ user: payload }));
    store.on(SET_USERS_NULL, () => ({ user: initUser }));
    
  store.on(GET_USERS, async (state, payload: IUserPayload, { dispatch }) => {
      const { user }:any= state;
      const callback = payload?.callback;
      const email: string | undefined =
        payload?.email ?? getLocaleStore("email");
      const res = await api.get(API_GET_USER, { email: email?.trim() });
      // if (!deepEqual(res?.data, user)){
        if (typeof callback === "function")
          callback(res as { data: { id: number } });
        if (res?.status === 200) {
          dispatch(SET_USERS, res.data);
        }
      // }
    });
}