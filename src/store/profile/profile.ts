import { _INIT } from "../auth/auth";
import avatar from '../../assets/images/avatar-2.jpeg';
import { StoreonStore } from "storeon";
import {IProfile} from './profile.d';
import { v4 } from "uuid";

export const GET_DATA_PROFILE = v4();
export const SET_DATA_PROFILE = v4();
export const GET_DASHBOARD_PROFILE = v4();;
export const SWITCH_DASHBOARD_PROFILE = v4();;
export const SWITCH_BTN_FILTER_INVITE_PLAYERS = v4();;
export const CHANGE_FILTER_INVITE_PLAYERS = v4();;
export const OPEN_SUB_INVITE_PLAYERS = v4();;

export const profile = (store: StoreonStore) => {
  // profile logic
  //...
  const initOpenSubInvitePlayers = false;

  store.on(_INIT, () => ({
    openSubInvitePlayers: initOpenSubInvitePlayers,
  }));
  store.on(OPEN_SUB_INVITE_PLAYERS, 
    (store: any) => ({openSubInvitePlayers: !store.openSubInvitePlayers}));

  const initControllerShowFilterInvitePlayers = [
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
  const initcontrollerFilterInvitePlayers = [
    {
      title: "Дата приглашения",
      status: true,
    },
    {
      title: "Выплаты",
      status: false,
    },
  ];

  store.on(_INIT, () => ({controllerFilterInvitePlayers: initcontrollerFilterInvitePlayers}));
  store.on(
    CHANGE_FILTER_INVITE_PLAYERS,
    ({ controllerFilterInvitePlayers }:any) => ({
      controllerFilterInvitePlayers: controllerFilterInvitePlayers?.map(
        (el:any) => ({ ...el, status: !el.status })
      ),
    })
  );

  const initProfile: IProfile = {
    id: 0,
    state_registration: 0,
    state_registration_text: '',
    email: '',
    username: '',
    phone_number: null,
    is_confirmed: false,
    referred_by: null,
    referral_code: '',
    balance: 0,
  };
  store.on(_INIT, () => ({ profile: initProfile }));
  const initDashboardProfile = {};
  store.on(_INIT, () => ({ dashboardProfile: initDashboardProfile }));

  store.on(GET_DASHBOARD_PROFILE, () => {
    return {
      dashboardProfile: {
        name: "Sam Venchester",
        button: [
          {
            name: "Общая информация", // Кнопка для перехода в раздел с общей информацией аккаунта (активная кнопка)
            type: "common",
            status: "active",
          },
          {
            name: "Безопасность", // Кнопка для перехода в раздел безопасности аккаунта
            type: "securety",
          },
          {
            name: "Чат поддержки", // Кнопка для перехода в чат с поддержкой, здесь же отображается счетчик новых сообщений от поддержки (дублируется в уведомления на сайте)
            amount_messages: 0,
            type: "chat",
          },
          {
            name: "Аккаунт", // Кнопка-слайдер для перехода между двумя вкладками страницы
            type: "account",
            status: "active",
          },
          {
            name: "Баланс",
            type: "balance",
            status: "disactive", // Кнопка-слайдер для перехода между двумя вкладками страницы
          },
        ],
      },
    };
  });
  
  store.on(SET_DATA_PROFILE, (data: any, payload) => (
    {
      profile: {
        ...data.profile,
        ...payload
      }
    }
    ))
  store.on(GET_DATA_PROFILE, () => {
    // const params = {
    //     url: '',

    // }
    return {
      profile: {
        user: {
          name: "Sam Venchester",
          data_registration: "Приглашен 24.12.2023",
          email: "pavel.balk@mailru",
          phone: null,
          amount_day: "Вы с нами уже <b>3 дня</b> (регистрация 24.12.2023)",
        },
        account_info: {
          account_partnaship: [
            {
              name: "good.max009@gmail.com",
              status: "active",
            },
            {
              name: "Привязать Metal",
              status: "disactive",
            },
            {
              name: "Привязать VK ID",
              status: "disactive",
            },
            {
              name: "Привязать Яндекс ID",
              status: "disactive",
            },
          ],
        },
        invited_players: {
          ref_link: `https://bla-bla-bla.get.mony`,
          players: [
            {
              name: "Sam Venchester",
              data_registration: "Приглашен 20.12.2023",
              earning: "+25$",
              avatar: avatar,
              sub_invite_players: [
                {
                  name: "Sam Venchester_1",
                  earning: "+5$",
                  avatar: avatar,
                },
                {
                  name: "Sam Venchester_2",
                  earning: "+5$",
                  avatar: avatar,
                },
                {
                  name: "Sam Venchester_3",
                  earning: "+5$",
                  avatar: avatar,
                },
                {
                  name: "Sam Venchester_4",
                  earning: "+5$",
                  avatar: avatar,
                },
                {
                  name: "Sam Venchester_5",
                  earning: "+5$",
                  avatar: avatar,
                },
              ],
            },
            {
              name: "Kli_Gench",
              data_registration: "Приглашен 20.12.2023",
              avatar: avatar,
              earning: null,
              sub_invite_players: [],
            },
            {
              name: "Kli_Gench",
              data_registration: "Приглашен 20.12.2023",
              avatar: avatar,
              earning: null,
              sub_invite_players: [],
            },
            {
              name: "Kli_Gench",
              data_registration: "Приглашен 20.12.2023",
              avatar: avatar,
              earning: null,
              sub_invite_players: [],
            },
            {
              name: "Kli_Gench",
              data_registration: "Приглашен 20.12.2023",
              avatar: avatar,
              earning: null,
              sub_invite_players: [],
            },
            {
              name: "Sam Venchester",
              data_registration: "Приглашен 20.12.2023",
              earning: "+25$",
              avatar: avatar,
              sub_invite_players: [
                {
                  name: "Sam Venchester_1",
                  earning: "+5$",
                  avatar: avatar,
                },
                {
                  name: "Sam Venchester_2",
                  earning: "+5$",
                  avatar: avatar,
                },
                {
                  name: "Sam Venchester_3",
                  earning: "+5$",
                  avatar: avatar,
                },
                {
                  name: "Sam Venchester_4",
                  earning: "+5$",
                  avatar: avatar,
                },
                {
                  name: "Sam Venchester_5",
                  earning: "+5$",
                  avatar: avatar,
                },
              ],
            },
            {
              name: "Kli_Gench",
              data_registration: "Приглашен 20.12.2023",
              avatar: avatar,
              earning: null,
              sub_invite_players: [],
            },
            {
              name: "Sam Venchester",
              data_registration: "Приглашен 20.12.2023",
              earning: "+25$",
              avatar: avatar,
              sub_invite_players: [
                {
                  name: "Sam Venchester_1",
                  earning: "+5$",
                  avatar: avatar,
                },
                {
                  name: "Sam Venchester_2",
                  earning: "+5$",
                  avatar: avatar,
                },
                {
                  name: "Sam Venchester_3",
                  earning: "+5$",
                  avatar: avatar,
                },
                {
                  name: "Sam Venchester_4",
                  earning: "+5$",
                  avatar: avatar,
                },
                {
                  name: "Sam Venchester_5",
                  earning: "+5$",
                  avatar: avatar,
                },
              ],
            },
            {
              name: "Kli_Gench",
              data_registration: "Приглашен 20.12.2023",
              avatar: avatar,
              earning: null,
              sub_invite_players: [],
            },
            {
              name: "Kli_Gench",
              data_registration: "Приглашен 20.12.2023",
              avatar: avatar,
              earning: null,
              sub_invite_players: [],
            },
            {
              name: "Kli_Gench",
              data_registration: "Приглашен 20.12.2023",
              avatar: avatar,
              earning: null,
              sub_invite_players: [],
            },
            {
              name: "Kli_Gench",
              data_registration: "Приглашен 20.12.2023",
              avatar: avatar,
              earning: null,
              sub_invite_players: [],
            },
            {
              name: "Sam Venchester",
              data_registration: "Приглашен 20.12.2023",
              earning: "+25$",
              avatar: avatar,
              sub_invite_players: [
                {
                  name: "Sam Venchester_1",
                  earning: "+5$",
                  avatar: avatar,
                },
                {
                  name: "Sam Venchester_2",
                  earning: "+5$",
                  avatar: avatar,
                },
                {
                  name: "Sam Venchester_3",
                  earning: "+5$",
                  avatar: avatar,
                },
                {
                  name: "Sam Venchester_4",
                  earning: "+5$",
                  avatar: avatar,
                },
                {
                  name: "Sam Venchester_5",
                  earning: "+5$",
                  avatar: avatar,
                },
              ],
            },
            {
              name: "Kli_Gench",
              data_registration: "Приглашен 20.12.2023",
              avatar: avatar,
              earning: null,
              sub_invite_players: [],
            },
          ],
          info: {
            title: "Реферальная программа",
            desc: `<p>Это дополнительная возможность заработка для активных игроков и активных «рефероводов».Приглашайте больше участников к нам в игру и получайте дополнительный доход.</p><p>Вы будете получать <b>7%</b> от покупки каждой карточки, дома и отеля от игрока, которого вы пригласили,  и <b>3%</b> от покупок всех приглашенных, которых привел игрок, приглашенный вами.</p>`,
          },
        },
      },
    };
  });

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
                      : { ...el, status: "disactive" }
                  ),
                  ...dashboardProfile.button.slice(2),
                ],
            },
          };
        case "securety":
          return {
            dashboardProfile: {
              ...dashboardProfile,
              button: [
                ...dashboardProfile.button
                .slice(0, 2)
                  ?.map((el:any) =>
                    el.type === payload
                      ? { ...el, status: "active" }
                      : { ...el, status: "disactive" }
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
                ...dashboardProfile.button.slice(0,3),
                ...dashboardProfile.button
                  .slice(3)
                  ?.map((el: any) =>
                    el.type === payload
                      ? { ...el, status: "active" }
                      : { ...el, status: "disactive" }
                  ),
              ],
            },
          };
          case "balance":
            return {
              dashboardProfile: {
                ...dashboardProfile,
                button: [
                  ...dashboardProfile.button.slice(0,3),
                  ...dashboardProfile.button
                    .slice(3)
                    ?.map((el: any) =>
                      el.type === payload
                        ? { ...el, status: "active" }
                        : { ...el, status: "disactive" }
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
};
