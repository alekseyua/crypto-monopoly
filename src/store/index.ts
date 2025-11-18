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

// Initial state, reducers and business logic are packed in independent modules

export interface IState {
  authStore: any;
  quickGame: any;
  users: any;
  profile: any;
  message: any;
  registration: any;
  recovery: any;
  referal: any;
  websocket: any;
  modal: any;
  headerStore: any;
  error: any;
  rules: IRule[];
}

export const store = createStoreon < IState >([
  rule,
  users,
  error,
  modal,
  referal,
  headerStore,
  message,
  profile,
  recovery,
  authStore,
  quickGame,
  websocket,
  registration,
]);