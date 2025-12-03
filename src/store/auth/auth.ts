import axios from "axios";
import api, { HOST } from "../../api/api";
import { API_GET_TOKEN, API_REFRESH_TOKEN} from "../../api/config";
import { NAV_AUTH_PAGE, NAV_QG_SELECT_PAGE } from "../../routers/config-nav";
import { setErrorTimming } from "../helperStore/helperStore";
import { v4 } from "uuid";
import { StoreonStore } from "storeon";
import { delay, getLocaleStore, removeLocaleStore } from "../../helpers/helper";
import { SET_DATA_PROFILE } from "../profile/profile";
import { GET_USERS } from "../users/users";
import { GET_DUBLICATE_CODE_RECOVERY, SET_ERROR_RECOVERY, SET_RECOVERY_STEP, SET_RECOVERY_TO_STORE } from "./recovery";
import { register } from "module";
import { SET_REG_STEP, SET_REG_TO_STORE } from "./registration";

export const _INIT = '@init';

export const CHECK_AUTH: string = v4();
export const GET_AUTH: string = v4();
export const SET_AUTH_TO_STORE: string = v4();
export const SET_SAVE_AUTH_TO_STORE: string = v4();
export const INC_AUTH_STEP: string = v4();
export const DESC_AUTH_STEP: string = v4();
export const RESET_AUTH: string = v4();
export const RESET_AUTH_STEP: string = v4();
export const RESET_AUTH_STORE: string = v4();
export const SET_ERROR_AUTH: string = v4();
export const SET_AUTH_STEP: string = 'auth/set/step' as const;

type Callback = (
  resolve: () => void,
  reject: (e: Error) => void,
  res: {
    status: number
    data?: {
      email?: string
      state_registration?: number
      state_registration_text?: string
    }
    error?: string
  }
) => Promise<void>;

let globalRedirect: Function | null;
export const authStore = (store: StoreonStore) => {
// auth

    const initAuthStep = 1;
    store.on(_INIT, ()=>({authStep: initAuthStep}));
    store.on(RESET_AUTH_STEP, () => ({ authStep: initAuthStep }));
    store.on(INC_AUTH_STEP, ({authStep}: any)=>({authStep: authStep + 1}));
    store.on(DESC_AUTH_STEP, ({authStep}: any)=>({authStep: authStep - 1}));
    store.on(SET_AUTH_STEP, ({authStep}: any, payload)=>({authStep: payload}));

    
    const initErrorAuth = '';
    store.on(_INIT, ()=>({errorAuth: initErrorAuth}));
    store.on(SET_ERROR_AUTH, (_,payload)=>{
      let error = '';
      if(Array.isArray(payload)) {
        payload.forEach( (err: string) => error += err);
      }else {
        error = payload;
      }
      return {errorAuth: error}
    });
    store.on(RESET_AUTH, (_, data, { dispatch }) => {
      dispatch(RESET_AUTH_STEP);
      dispatch(RESET_AUTH_STORE);
    });
    
    const initAuthData = {
        email: "",
        password: ""
    }
    store.on(_INIT, () => ({authData: initAuthData}))
    store.on(RESET_AUTH_STORE, () => ({ authData: initAuthData }));
    store.on(SET_AUTH_TO_STORE, ({authData}: any,data) => {
      let authDataNew = { ...authData };
        for(let key of Object.keys(data)){
          if (key === 'email') store.dispatch(SET_RECOVERY_TO_STORE, {email: data[key]})
          authDataNew = { ...authDataNew,[key]:data[key]}
        }
        return  {authData: authDataNew}
    })

  store.on(GET_AUTH, async ({ authData }: any, data, { dispatch }) => {
    const redirect = data?.redirect;
    if(typeof redirect === 'function'){
      globalRedirect = redirect;
    }
    const callback: Callback = async (resolve, reject, res) => {
      if (res.status === 200) {
        switch (res?.data?.state_registration) {
          case 0: {
            const email = res.data?.email ?? '';
            console.log({res})
            dispatch(GET_DUBLICATE_CODE_RECOVERY, { email, redirect });
            // dispatch(SET_RECOVERY_TO_STORE, { email });
            dispatch(SET_REG_TO_STORE, { email });
            await delay(300);
            dispatch(SET_REG_STEP, 2);

            // dispatch(SET_AUTH_STEP, 3);
            // dispatch(SET_RECOVERY_STEP, 2);
            setErrorTimming(
              SET_ERROR_RECOVERY,
              res?.data?.state_registration_text,
              dispatch, 
              7000
            );
            reject(new Error("Need confirmation code "));
            break;
          }
          default:
            break;
        }
        resolve();
        return;
      }

      if (res.status === 400 || res.status === 404) {
        setErrorTimming(SET_ERROR_AUTH, res.error, dispatch, 3500);
        reject(new Error("error email"));
      }
    };

    try {
      await new Promise<void>((resolve, reject) => {
        dispatch(GET_USERS, {
          callback: callback.bind(null, resolve, reject),
          email: authData.email
        });
      });
      console.log({authData})
      if (authData?.email && !authData.password.length) {
        return dispatch(INC_AUTH_STEP);
      }
      removeLocaleStore("email");
      removeLocaleStore("refresh");
      removeLocaleStore("token");

      const params = {
        ...authData,
      };

      const res = await api.post(API_GET_TOKEN, params);
      if (res?.status === 400) {
        setErrorTimming(
          SET_ERROR_AUTH,
          res?.data?.error,
          dispatch,
          1500
        );
        dispatch(SET_AUTH_TO_STORE, { password: "" });
        await delay(1500)
        return dispatch(DESC_AUTH_STEP);
      } else if (res?.status === 200) {
        if (res.data.profileData) {
          dispatch(SET_DATA_PROFILE, res.data.profileData)
        }
        // setLocaleStore('email', params.email)
        // setLocaleStore("token", res?.data?.access);
        // setLocaleStore("refresh", res?.data?.refresh);
        if (res?.data?.access) {
          if (typeof globalRedirect === 'function'){
            return globalRedirect(NAV_QG_SELECT_PAGE);
          }else {
            const err = new Error('Not function redirect');
            throw err;
          }
        }
      } else {
        alert("error, contact technical support status = " + res?.status);
      }

    } catch (err) {
      console.error("Caught error:", err);

      // optionally handle navigation or UI here
      // dispatch(SET_ERROR_AUTH, ...)

      // and stop further execution
      return;
    }


  })

    store.on(CHECK_AUTH, async (_,data) => {
        if (!getLocaleStore("refresh")){
            return data.callback(false, NAV_AUTH_PAGE);
        }

        const res: any = await axios.post(HOST + API_REFRESH_TOKEN, {
          refresh: getLocaleStore("refresh"),
        });
        if (res.status === 200) {
            localStorage.setItem("token", res.access);
            return data.callback(true);
        }
        removeLocaleStore('token');
        removeLocaleStore('refresh');
        return false;
    });

    
}