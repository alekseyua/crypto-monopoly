import { StoreonStore } from "storeon";
import api from "../../api/api";

import { v4 } from "uuid";
import { _INIT } from "./auth";
import { API_GET_REF_CODE } from "../../api/config";
import { NAV_REG_PAGE } from "../../routers/config-nav";
import { SET_MESSAGE } from "../message/message";

export const GET_REF_LINK = v4();
export const SET_REF_CODE = v4();
export const SET_REF_LINK = v4();

export const referal = (store: StoreonStore) => {
       //referal 
        const initRefCode = "";
        store.on(_INIT,()=>({refCode: initRefCode}))
        store.on(SET_REF_CODE, (_,data)=>({refCode: data}))
    
        const initRefLink = "";
        store.on(_INIT,()=>({refLink: initRefLink}))
        store.on(SET_REF_LINK,async (_,data)=>({refLink: data}))
        store.on(GET_REF_LINK,async (_,data,{dispatch})=>{
            const response: any | {
                referral_code: string
            }  = await api.get(API_GET_REF_CODE);

            if(response.status === 200){
              const refLink =window.location.host + NAV_REG_PAGE + "?referal_code=" + response?.data?.referral_code;
              dispatch(SET_REF_LINK,refLink);
              try {
                await navigator.clipboard.writeText(refLink);
                dispatch(SET_MESSAGE, [
                  "Ссылка скопирована в буфер обмена! ",
                  refLink,
                ]);
              } catch (error: any) {
                dispatch(SET_MESSAGE, [
                  "Ошибка при копировании ссылки: " + error.message,
                ]);
                console.error("Ошибка при копировании текста: ", error.message);
              }

            }

        })
    
};