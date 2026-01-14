import { createStoreon } from 'storeon'
import { authStore } from './auth/auth';
import { quickGame } from './quick-game/quick-game';
import { users } from './users/users';
import { profile } from './profile/profile';
import { message } from './message/message';
import { registration } from './auth/registration';
import { recovery } from './auth/recovery';
import { referal } from "./auth/referal";
import { websocket } from './websocket/websocket';
import { modal } from './modal/modal';
import { headerStore } from './header/header';
import { error } from './error/error';
import { rule } from './rules/rule';

import { IRule } from './rules/rule.type';
import { IUser } from './users/user';
import { EQuickGameStore, IAchivmentPlayer, ICard, IDataQG, IInfoMassagePopup, IListQGs, IPlayer, IRoleDiceStore } from './quick-game/quick-game.type';
import { errorGameState } from './quick-game/error-game.d';
import { diceRoll } from './roll-dice/roll-dice';
import { IDashboardProfile, IFilterItem, IProfile, Payment } from './profile/profile.d';
import { Location } from 'react-router-dom';

// Initial state, reducers and business logic are packed in independent modules

export interface IState {
  user: IUser;
  [EQuickGameStore.ROLE_DICE_STORE]: IRoleDiceStore;
  [EQuickGameStore.MESSAGE_ERROR_CREATE_GAME]: errorGameState;
  [EQuickGameStore.POPUP_MESSAGE]: IInfoMassagePopup;
  [EQuickGameStore.LIST_ACHIVMENT_PLAYER]: IAchivmentPlayer[];
  [EQuickGameStore.LIST_CARD_QG]: ICard[];
  [EQuickGameStore.DATA_ACTION_CARD_QG]: {};
  [EQuickGameStore.DATA_PLAYER_QG]: IPlayer;
  [EQuickGameStore.QUICK_GAME]: IDataQG;
  [EQuickGameStore.LIST_QGS]: IListQGs[];
  [EQuickGameStore.EXCHANGE_DATA]: {};
  [EQuickGameStore.SHOW_RATE]: boolean;
  SET_QUEUE_MESSAGES_WS: any[];
  
  authStore: any;
  isAnimationRollDice: boolean;
  users: any;
  message: any;
  registration: any;
  recovery: any;
  referal: any;
  modal: any;
  headerStore: any;
  error: any;
  rules: IRule[];
  // -----------------
  websocket: any;
  queueMessagesFeeds: any[];
  queueMessagesWs: any[] 
  isProcessingQueue: boolean;
  // -----------------
  profile: IProfile;
  paymentStore: Payment;
  dashboardProfile: IDashboardProfile;
  controllerFilterInvitePlayers: IFilterItem[];
  controllerShowFilterInvitePlayers: IFilterItem[];
  openSubInvitePlayers: boolean;
  redirectTo: any,
  location: Partial<Location> 
}

export const store = createStoreon < IState >([
  rule,
  users,
  error,
  modal,
  referal,
  message,
  profile,
  diceRoll,
  recovery,
  authStore,
  quickGame,
  websocket,
  headerStore,
  registration,
]);