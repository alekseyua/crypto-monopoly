import { StoreonStore } from "storeon";
import api from "../../api/api";
import { v4 } from "uuid";
import { _INIT } from "./auth";
import { delay, removeLocaleStore, setLocaleStore, validateEmail } from "../../helpers/helper";
import { setErrorTimming } from "../helperStore/helperStore";
import { API_CONFIRM_EMAIL, API_DUPLICATE_CODE, API_GET_SECRET_QUETION } from "../../api/config";
import { GET_DUBLICATE_CODE_RECOVERY, SET_ERROR_RECOVERY } from "./recovery";
import { IMessage, SET_MESSAGE } from "../message/message";
import { NAV_MAIN_PAGE, NAV_QG_SELECT_PAGE } from "../../routers/config-nav";
import { GET_USERS, SET_USERS_NULL } from "../users/users";
import { RESET_ACHIVMENT_PLAYER_QG, RESET_DATA_ACTION_CARD, RESET_EXCHANGE_DATA, RESET_LIST_CARDS_QG, RESET_QG, RET_DATA_PLAYER_QG, RET_LIST_QG } from "../quick-game/quick-game";



export const RESET_REG_DATA = v4();
export const GET_REG = v4();
export const INC_REG_STEP = v4();
export const INC_REG = v4();
export const DESC_REG_STEP = v4();
export const SET_REG_TO_STORE = v4();
export const CHECK_REG_DATA = v4();
export const SET_ERROR_REG = v4();
export const RESET_REG_STEP = v4();
export const SET_REG_STEP = v4();
export const RESET_REG = v4();
export const RESET_REG_STORE = v4();
export const GET_SECURE_QUESTION = v4();
export const SET_SECURE_QUESTION = v4();
export const GET_DUBLICATE_CODE_REG = v4();

export const LOGOUT = v4();
export const registration = (store: StoreonStore) => {
  // registration

  const initSecureQuestions: [] = [];
  store.on(_INIT, () => ({ secureQuestions: initSecureQuestions }));
  store.on(SET_SECURE_QUESTION, (_, data) => ({ secureQuestions: data }));
  store.on(GET_SECURE_QUESTION, async (_, data, { dispatch }) => {
    const res = await api.get(API_GET_SECRET_QUETION);
    return dispatch(SET_SECURE_QUESTION, res?.data);
  });

  const initErrorReg = "";
  store.on(_INIT, () => ({ errorReg: initErrorReg }));
  store.on(SET_ERROR_REG, (_, data) => ({ errorReg: data }));

  const initRegStep = 1;
  store.on(_INIT, () => ({ regStep: initRegStep }));
  store.on(INC_REG, ({ regStep } :any) => ({ regStep: regStep + 1 }));
  store.on(RESET_REG_STEP, () => ({ regStep: initRegStep }));
  store.on(SET_REG_STEP, (_, payload: number) => ({ regStep: payload }));
  store.on(RESET_REG, (_, data, { dispatch }) => {
    dispatch(RESET_REG_STEP);
    dispatch(RESET_REG_STORE);
  });
  store.on(INC_REG_STEP, ({ regStep, regData }: any, data, { dispatch }) => {
    for (let key of Object.keys(regData)) {
      if (regStep === 1 && key === "email") {
        if (!validateEmail(regData.email)) {
          setErrorTimming(SET_ERROR_REG, "EMAIL  invalid", dispatch, 1500);
          return;
        }
      }
    }
    let key = "";
    if (regStep === 1) key = "email";
    if (regStep === 2) key = "code";
    if (regStep === 3) key = "password";
    if (regStep === 4) key = "username";
    if (regStep === 5) key = "secureQuestion";
    // if(regStep === 6) key = "refFrend";

    if (key === "") {
      setErrorTimming(SET_ERROR_REG, "Step not found", dispatch, 1500);
      return;
    }

    const callback = (status: boolean) => {
      if (status) {
        return dispatch(INC_REG);
      }
      return;
    };
    dispatch(CHECK_REG_DATA, {
      [key]: regData[key],
      key,
      callback,
      ...regData,
      ...data,
    });
  });
  store.on(DESC_REG_STEP, ({ regStep }: any, data, { dispatch }) => {
    if (regStep === 2) dispatch(SET_REG_TO_STORE, { email: "" });
    return { regStep: regStep - 1 };
  });

  type EventMapDuplicateCode = {
    [SET_MESSAGE]: IMessage[];
    [SET_ERROR_RECOVERY]: string;
  }
  type DuplicateCodeDispatch = {
    dispatch: <T extends keyof EventMapDuplicateCode>(
      type: T,
      payload: EventMapDuplicateCode[T]
    )=>void
  }
  store.on(
    GET_DUBLICATE_CODE_REG,
    async ({ regData }: any, data, { dispatch }: DuplicateCodeDispatch) => {
      const res = await api.post(API_DUPLICATE_CODE, regData);
      console.log({ res });
      if (res?.status === 400) {
        setErrorTimming(SET_ERROR_RECOVERY, res?.error, dispatch, 1500);
        return;
      }
     !!res?.data?.detail.length &&
        dispatch(SET_MESSAGE, [{ title: "Дубликат кода", desc: res?.data?.detail[0] }]);
    }
  );
  const initRegData = {
    email: "",
    code: "",
    username: "",
    password: "",
    repeatPassword: "",
    refFrend: "",
    secureQuestion: [],
  };
  store.on(_INIT, () => ({ regData: initRegData }));
  store.on(RESET_REG_STORE, () => ({ regData: initRegData }));
  store.on(RESET_REG_DATA, () => ({ regData: initRegData }));

  store.on(SET_REG_TO_STORE, ({ regData, regStep }: any, data, { dispatch }) => {
    for (let key of Object.keys(data)) {
      if (regStep === 4 && key === "repeatPassword") {
        data[key] !== regData.password &&
          setErrorTimming(
            SET_ERROR_REG,
            "repeat password not equil password",
            dispatch,
            1500
          );
      }

      return { regData: { ...regData, [key]: data[key] } };
    }
  });
  store.on(GET_REG, async (_, data, { dispatch }) => {
    dispatch(RESET_REG_STEP);
    dispatch(RESET_REG_DATA);
    return data.redirect(NAV_QG_SELECT_PAGE);
    // return data.redirect(NAV_MAIN_PAGE);
  });

  store.on(CHECK_REG_DATA, async ({ refCode }: any, data, { dispatch }) => {
    let params = {
      ...data,
    };

    let urlRegStep = "";
    if (data?.key === "email") {
      urlRegStep = "/user/register/";
      // delete save token for new registration
    //   localStorage.removeItem("token");
    //   localStorage.removeItem("refresh");
      // добавляем в запрос реф код
      if (refCode) params = { ...params, referral_code: refCode };
    }
    if (data?.key === "code") urlRegStep = API_CONFIRM_EMAIL;
    if (data?.key === "username") urlRegStep = "/user/change-username/";
    if (data?.key === "password") urlRegStep = "/user/set-password/";
    if (data?.key === "secureQuestion")
      urlRegStep = "/user/set-secret-questions/";
    // if (data?.key === "refFrend") urlRegStep = "????";

    params = { ...params, key: "" };
    const res = await api.post(urlRegStep, params);
    console.log({res})
    if (res?.status === 400) {
      if (res?.data?.error?.length) {
        setErrorTimming(SET_ERROR_REG, res?.data?.error, dispatch, 2000);
        const callback = async (res: any) =>{
            await delay(2000);
            switch (res?.data?.state_registration) {
                case 0:                    
                    dispatch(SET_REG_STEP, 2);
                    dispatch(GET_DUBLICATE_CODE_RECOVERY, { email: params.email });
                    break;
                case 1:                    
                    dispatch(SET_REG_STEP, 3);                    
                    break;
                case 2:                    
                    dispatch(SET_REG_STEP, 4);
                    break;
                case 3:                    
                    dispatch(SET_REG_STEP, 5);                    
                    break;            
                default:
                    break;
            }

            setErrorTimming(
              SET_ERROR_REG,
              res?.data?.state_registration_text,
              dispatch,
              3500
            );
        }
        if(data?.key === "email") dispatch(GET_USERS, {callback, email: params.email})
      }
    } else if(res?.status === 200){
      if (data?.key === "code") {
        setLocaleStore("token", res?.data?.access_token);
        setLocaleStore("refresh", res?.data?.refresh_token);
        params?.email && setLocaleStore("email", params.email);
        
      }
      if (data?.key === "secureQuestion") {
        dispatch(RESET_REG_STEP);
        return data.callbackReg();
      }
      dispatch(SET_MESSAGE, [
        {
          title: `Регистрация шаг ${data?.key}`,
          desc: res?.data?.detail,
        },
      ]);
      return data.callback(true);
    } else {
        alert('error, contact technical support ' + res?.status)
    }
    // data.callback()
    return data.callback(false);
  });

  store.on(LOGOUT, (_, data, { dispatch }) => {
    removeLocaleStore("email");
    removeLocaleStore("token");
    removeLocaleStore("refresh");
    dispatch(SET_USERS_NULL);
    dispatch(RESET_ACHIVMENT_PLAYER_QG);
    dispatch(RESET_LIST_CARDS_QG);
    dispatch(RESET_DATA_ACTION_CARD);
    dispatch(RET_DATA_PLAYER_QG);
    dispatch(RESET_QG);
    dispatch(RET_LIST_QG);
    dispatch(RESET_EXCHANGE_DATA);


    return {
      authStep: 1,
      errorAuth: '',
      authData: {
        email: "",
        password: "",
      },
      regStep: initRegStep,
      errorReg: initErrorReg,
      regData: initRegData,
    };
  }); 
}