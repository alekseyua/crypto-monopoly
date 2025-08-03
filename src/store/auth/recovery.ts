import { StoreonStore } from "storeon";
import api from "../../api/api";
import { _INIT } from "./auth";
import { v4 } from "uuid";
import { setErrorTimming } from "../helperStore/helperStore";
import { API_CHANGE_CURRENT_PASSWORD, API_CHECK_CODE, API_DUBLICATE_CODE, API_RESEND_CODE } from "../../api/config";
import { delay, removeLocaleStore } from "../../helpers/helper";

export const INC_RECOVERY_STEP = v4();
export const DESC_RECOVERY_STEP = v4();
export const SET_RECOVERY_TO_STORE = v4();
export const RESET_RECOVERY = v4();
export const RESET_RECOVERY_STEP = v4();
export const RESET_RECOVERY_STORE = v4();
export const GET_DUBLICATE_CODE_RECOVERY = v4();
export const GET_RECOVERY_PASSWORD = v4();
export const SET_ISRECOVERY_PASSWORD = v4();
export const SET_ERROR_RECOVERY = "SET_ERROR_RECOVERY";

export const recovery = (store: StoreonStore) => {
    const initIsRecoveryPassword = false;
    store.on(_INIT, () => ({ isRecoveryPassword: initIsRecoveryPassword }));
    store.on(SET_ISRECOVERY_PASSWORD, (_,data) => ({
      isRecoveryPassword: data,
    }));

    const initRecoveryStep = 1;
    store.on(_INIT, () => ({ recoveryStep: initRecoveryStep }));
    store.on(RESET_RECOVERY_STEP, () => ({ recoveryStep: initRecoveryStep }));
    store.on(INC_RECOVERY_STEP, ({recoveryStep}: any) => ({recoveryStep: recoveryStep + 1}));    
    store.on(DESC_RECOVERY_STEP, ({recoveryStep}: any)=>({recoveryStep: recoveryStep - 1}));
    const initErrorRecovery = "";
    store.on(_INIT, () => ({ errorRecovery: initErrorRecovery }));
    store.on(SET_ERROR_RECOVERY, (_, data) => ({ errorRecovery: data }));
    store.on(RESET_RECOVERY, (_, data, {dispatch}) => { 
        dispatch(RESET_RECOVERY_STEP)
        dispatch(RESET_RECOVERY_STORE)
    });

    
    const initRecoveryData = {
      email: "",
      new_password: "",
      code: "",
      repeatPassword: "",
    };
    store.on(_INIT, () => ({ recoveryData: initRecoveryData }));
    store.on(RESET_RECOVERY_STORE, () => ({ recoveryData: initRecoveryData }));
    store.on(SET_RECOVERY_TO_STORE, ({ recoveryData }: any, data) => {
      for (let key of Object.keys(data)) {
        return { recoveryData: { ...recoveryData, [key]: data[key] } };
      }
    });

    store.on(GET_RECOVERY_PASSWORD, async ({ recoveryData, recoveryStep }: any, data, {dispatch}) => {

            if (recoveryStep === 1) {
                removeLocaleStore("email");
                removeLocaleStore("token");
                removeLocaleStore("refresh");
                const res = await api.post(API_RESEND_CODE, recoveryData);
                if (res?.status === 400) {
                  setErrorTimming(
                    SET_ERROR_RECOVERY,
                    res?.data?.error,
                    dispatch,
                    1500
                  );
                  return;
                }
            }
            if(recoveryStep === 2) {
                const res = await api.get(API_CHECK_CODE, recoveryData);
                if(res?.status === 400){
                    setErrorTimming(
                      SET_ERROR_RECOVERY,
                      res?.data?.error,
                      dispatch,
                      2500
                    );
                  return 
                }
            }
            if(recoveryStep === 3) {
                const res = await api.post(API_CHANGE_CURRENT_PASSWORD, recoveryData);
                if (res?.status === 400) {
                  setErrorTimming(
                    SET_ERROR_RECOVERY,
                    res?.data?.error,
                    dispatch,
                    2500
                  );
                  return;
                }

                if (res?.status === 200) {
                  dispatch(SET_ISRECOVERY_PASSWORD, false);
                  dispatch(RESET_RECOVERY_STEP);
                }
            }
            await delay(500);
      dispatch(INC_RECOVERY_STEP);
    });

    store.on(GET_DUBLICATE_CODE_RECOVERY, async ({recoveryData}: any, payload, {dispatch}) => {
                const email = payload?.email;
                let params: {} = {};
                if(email) params = {...params, email};
                const res = await api.post(API_DUBLICATE_CODE, {...recoveryData, ...params});
                if (res?.status === 400) {
                    setErrorTimming(
                        SET_ERROR_RECOVERY,
                        res?.data?.error,
                        dispatch,
                        1500
                    );
                    await delay(1500);
                    return;
                }
    });


};