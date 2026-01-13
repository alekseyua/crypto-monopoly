import { _INIT } from "../auth/auth";
import { StoreonStore } from "storeon";
import {IFilterItem, IDashboardProfile, IPayloadUpdatePhotoAvatar, IProfile, IUpdatePhoneNumber, Payment, PaymentConfirm} from './profile.d';
import api from "../../api/api";
import { API_CHANGE_PHONE_NUMBER, API_CHANGE_PHOTO_AVATAR, API_CONFIRM_PAYMENT, API_TOP_UP_WALLET } from "../../api/config";
import { SET_MODAL } from "../modal/modal";
import { GET_USERS } from "../users/users";

// export const GET_DATA_PROFILE = 'profile/update_data' as const;
export const UPDATE_PHOTO_AVATAR_PROFILE = 'profile/update_photo_avatar' as const;
export const UPDATE_PHONE_NUMBER_PROFILE = 'profile/update_phone_number' as const;

export const SET_DATA_PROFILE = 'profile/set_data' as const;
// export const GET_DASHBOARD_PROFILE = v4();;
export const SWITCH_DASHBOARD_PROFILE = 'profile/switch_dashboard' as const;
export const SWITCH_BTN_FILTER_INVITE_PLAYERS = 'profile/switch_btn+filter_invite_payers' as const;
export const CHANGE_FILTER_INVITE_PLAYERS = 'profile/change_filter_invite_players' as const;
export const OPEN_SUB_INVITE_PLAYERS = 'profile/invite_players' as const;
// wallet
export const TOP_UP_WALLET = "profile/top_up_wallet" as const;
export const CONFIRM_PAYMENT = "profile/confirm_payment" as const;
export const SET_PAYMENT_DATA = 'profile/set_payment_data' as const;

export const profile = (store: StoreonStore) => {
  // profile logic
  //...
  store.on( UPDATE_PHOTO_AVATAR_PROFILE,
    async (store: any, payload: IPayloadUpdatePhotoAvatar, { dispatch }) => {
      try {
        const formData = new FormData();
        if (payload.photo instanceof File) {
          formData.append("photo", payload.photo); // или formData.append('image', payload.file, payload.file.name);
        } else {
          console.warn("Файл отсутствует или имеет неверный тип");
        }
        const res = await api.post(API_CHANGE_PHOTO_AVATAR, formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        });
        if (res.status === 200) {
          // alert("Аватар успешно обновлен!");
          dispatch(GET_USERS);
        } else {
          alert(
            "Ошибка при обновлении аватара, попробуйте позже " +
              res?.data?.error[0] || ""
          );
        }
      } catch (error) {
        console.error("Error updating avatar:", error);
        alert(
          "Произошла ошибка при обновлении аватара. Пожалуйста, попробуйте еще раз."
        );
      }
    }
  );

  const initOpenSubInvitePlayers: boolean = false;

  store.on(_INIT, () => ({
    openSubInvitePlayers: initOpenSubInvitePlayers,
  }));
  store.on(OPEN_SUB_INVITE_PLAYERS, (store: any) => ({
    openSubInvitePlayers: !store.openSubInvitePlayers,
  }));

  const initControllerShowFilterInvitePlayers: IFilterItem[] = [
    {
      title: "Все приглашенные",
      status: true,
    },
    {
      title: "Закрыть фильтры",
      status: false,
    },
  ];

  store.on(_INIT, () => ({
    controllerShowFilterInvitePlayers: initControllerShowFilterInvitePlayers,
  }));
  store.on(
    SWITCH_BTN_FILTER_INVITE_PLAYERS,
    ({ controllerShowFilterInvitePlayers }: any) => ({
      controllerShowFilterInvitePlayers: controllerShowFilterInvitePlayers?.map(
        (el: any) => ({ ...el, status: !el.status })
      ),
    })
  );
  const initControllerFilterInvitePlayers: IFilterItem[] = [
    {
      title: "Дата приглашения",
      status: true,
    },
    {
      title: "Выплаты",
      status: false,
    },
  ];

  store.on(_INIT, () => ({
    controllerFilterInvitePlayers: initControllerFilterInvitePlayers,
  }));
  store.on( CHANGE_FILTER_INVITE_PLAYERS,
    ({ controllerFilterInvitePlayers }: any) => ({
      controllerFilterInvitePlayers: controllerFilterInvitePlayers?.map(
        (el: any) => ({ ...el, status: !el.status })
      ),
    })
  );

  const initProfile: IProfile = {
    id: 0,
    state_registration: 0,
    state_registration_text: "",
    email: "",
    username: "",
    phone_number: null,
    is_confirmed: false,
    referred_by: null,
    referral_code: "",
    balance: 0,
  };
  store.on(_INIT, () => ({ profile: initProfile }));
  const initDashboardProfile: IDashboardProfile = {
    name: "Sam Venchester",
    button: [
      {
        name: "Общая информация", // Кнопка для перехода в раздел с общей информацией аккаунта (активная кнопка)
        type: "common",
        status: "active",
      },
      {
        name: "Безопасность", // Кнопка для перехода в раздел безопасности аккаунта
        type: "security",
        status: "inactive", // Кнопка-слайдер для перехода между двумя вкладками страницы
      },
      {
        name: "Чат поддержки", // Кнопка для перехода в чат с поддержкой, здесь же отображается счетчик новых сообщений от поддержки (дублируется в уведомления на сайте)
        amount_messages: 0,
        type: "chat",
        status: "inactive", // Кнопка-слайдер для перехода между двумя вкладками страницы
      },
      {
        name: "Аккаунт", // Кнопка-слайдер для перехода между двумя вкладками страницы
        type: "account",
        status: "active",
      },
      {
        name: "Баланс",
        type: "balance",
        status: "inactive", // Кнопка-слайдер для перехода между двумя вкладками страницы
      },
    ],
  };
  store.on(_INIT, () => ({ dashboardProfile: initDashboardProfile }));

  store.on(SET_DATA_PROFILE, (data: any, payload) => ({
    profile: {
      ...data.profile,
      ...payload,
    },
  }));

  store.on(SWITCH_DASHBOARD_PROFILE, ({ dashboardProfile }: any, payload) => {
    if (Object.keys(dashboardProfile).length) {
      switch (payload) {
        case "common":
          return {
            dashboardProfile: {
              ...dashboardProfile,
              button: [
                ...dashboardProfile.button
                  .slice(0, 2)
                  ?.map((el: any) =>
                    el.type === payload
                      ? { ...el, status: "active" }
                      : { ...el, status: "inactive" }
                  ),
                ...dashboardProfile.button.slice(2),
              ],
            },
          };
        case "security":
          return {
            dashboardProfile: {
              ...dashboardProfile,
              button: [
                ...dashboardProfile.button
                  .slice(0, 2)
                  ?.map((el: any) =>
                    el.type === payload
                      ? { ...el, status: "active" }
                      : { ...el, status: "inactive" }
                  ),
                ...dashboardProfile.button.slice(2),
              ],
            },
          };
        case "account":
          return {
            dashboardProfile: {
              ...dashboardProfile,
              button: [
                ...dashboardProfile.button.slice(0, 3),
                ...dashboardProfile.button
                  .slice(3)
                  ?.map((el: any) =>
                    el.type === payload
                      ? { ...el, status: "active" }
                      : { ...el, status: "inactive" }
                  ),
              ],
            },
          };
        case "balance":
          return {
            dashboardProfile: {
              ...dashboardProfile,
              button: [
                ...dashboardProfile.button.slice(0, 3),
                ...dashboardProfile.button
                  .slice(3)
                  ?.map((el: any) =>
                    el.type === payload
                      ? { ...el, status: "active" }
                      : { ...el, status: "inactive" }
                  ),
              ],
            },
          };
        default:
          alert("good day, welcome chat");
          break;
      }
      // return {
      //   dashboardProfile: {
      //     active_button: payload.active_button,
      //   }
      // }
    }
  });

  //  TOP_UP_WALLET
  const initPayment: Payment = {
    id: null,
    amount: "",
    currency: "USDT-TRC20",
    status: "zeroed",
    tx_hash: null,
    created_at: "",
    address: "",
    user: 0,
  };
  store.on(_INIT, () => ({ paymentStore: initPayment }));
  store.on(SET_PAYMENT_DATA, (store: any, payload: Payment) => ({
    paymentStore: payload,
  }));

  store.on(
    TOP_UP_WALLET,
    async (store: any, payload: Payment, { dispatch }) => {
      const res = await api.post(API_TOP_UP_WALLET, payload);
      if (res.status === 200) {
        dispatch(SET_PAYMENT_DATA, res.data.payment_data);
      } else if (res.status === 400) {
        const err = new Error("Server error, try again later");
        console.error(err);
        alert("Ошибка сервера, попробуйте позже " + res?.data?.error[0] || "");
      }
    }
  );

  store.on( CONFIRM_PAYMENT,
    async (store: any, payload: PaymentConfirm, { dispatch }) => {
      const res = await api.get(API_CONFIRM_PAYMENT, payload);
      if (res?.status === 200) {
        dispatch(SET_PAYMENT_DATA, initPayment);
        dispatch(SET_MODAL, { isOpen: false });
        alert("Платеж успешно отправлен!");
      } else if (res?.status === 400) {
        const err = new Error("Server error, try again later");
        console.error(err);
        alert("Ошибка сервера, попробуйте позже " + res?.data?.error[0] || "");
      }
    }
  );

  //
  store.on(UPDATE_PHONE_NUMBER_PROFILE, async (_, payload: IUpdatePhoneNumber) => {
    //post
    const url = API_CHANGE_PHONE_NUMBER;
    try {
      const res = await api.post(url, payload);
      if(res.status === 400){
        if(typeof payload.callback === 'function'){
          payload.callback(res.data)
        }
      }
    } catch (error) {
      if (error instanceof Error) {
        const err = new Error(
          "Catch error update phone number " + (error as Error).message
        );
        console.error(err);
      } else {
        console.error("Unknown error ", error);
      }
    }
  });
};
