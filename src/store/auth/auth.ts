import axios from "axios";
import api, { HOST } from "../../api/api";
import { API_GET_TOKEN, API_REFRESH_TOKEN} from "../../api/config";
import { NAV_AUTH_PAGE, NAV_QG_SELECT_PAGE } from "../../routers/config-nav";
import { setErrorTimming } from "../helperStore/helperStore";
import { v4 } from "uuid";
import { StoreonStore } from "storeon";
import { delay, getLocaleStore, removeLocaleStore } from "../../helpers/helper";
import { SET_DATA_PROFILE } from "../profile/profile";

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

export const authStore = (store: StoreonStore) => {
// auth

    const initAuthStep = 1;
    store.on(_INIT, ()=>({authStep: initAuthStep}));
    store.on(RESET_AUTH_STEP, () => ({ authStep: initAuthStep }));
    store.on(INC_AUTH_STEP, ({authStep}: any)=>({authStep: authStep + 1}));
    store.on(DESC_AUTH_STEP, ({authStep}: any)=>({authStep: authStep - 1}));
    
    const initErrorAuth = '';
    store.on(_INIT, ()=>({errorAuth: initErrorAuth}));
    store.on(SET_ERROR_AUTH, (_,data)=>({errorAuth: data}));
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
        for(let key of Object.keys(data)){
            return {authData: {...authData,[key]:data[key]}}
        }
    })

    store.on(GET_AUTH, async ({authData}: any,data, {dispatch})=>{
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
      if(res.data.profileData){
        dispatch(SET_DATA_PROFILE, res.data.profileData)
      }
      // setLocaleStore('email', params.email)
      // setLocaleStore("token", res?.data?.access);
      // setLocaleStore("refresh", res?.data?.refresh);
      if (res?.data?.access) return data.redirect(NAV_QG_SELECT_PAGE);
    } else {
      alert("error, contact technical support status = " + res?.status);
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