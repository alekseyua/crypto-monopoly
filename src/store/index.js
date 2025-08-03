import { createStoreon } from 'storeon'
import { authStore } from './auth/auth';
import { quickGame } from './quick-game/quick-game';
import { users } from './users/users';
import { error } from './error/error.js';
import { profile } from './profile/profile';
import { message } from './message/message';
import { registration } from './auth/registration';
import { recovery } from './auth/recovery';
import { referal } from "./auth/referal";
import { websocket } from './websocket/websocket';
import { modal } from './modal/modal';

// Initial state, reducers and business logic are packed in independent modules


export const store = createStoreon([
  users,
  error,
  modal,
  referal,
  message,
  profile,
  recovery,
  authStore,
  quickGame,
  websocket,
  registration,
]);