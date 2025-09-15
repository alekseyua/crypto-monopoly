// websocket

export const URL_QGS = 'wss://monopoly-game.fun/ws/game/';
export const URL_FEED_QG = 'wss://monopoly-game.fun/ws/sending/';


export const getProfile = '/api/profile/';

// auth
export const API_GET_TOKEN = "/user/login/";
export const API_RECOVERY_PASSWORD = "/user/code-recovery/";
export const API_CHECK_CODE = "/user/check-code/";
export const API_RESEND_CODE = "/user/password-recovery/";
export const API_CONFIRM_EMAIL = "/user/confirm-email/";
export const API_CHANGE_CURRENT_PASSWORD = "/user/change-password/";
export const API_DUBLICATE_CODE = "/user/register/resend_confirmation_code/";
export const API_GET_REF_CODE = "/user/referral/get_referral_code/";
export const API_GET_USER = "/user/get-user/by-email/";
export const API_REFRESH_TOKEN = "/user/token/refresh/";
export const API_GET_SECRET_QUETION = "/user/secret-questions/";
// quick game 
export const FAST_GAME = "/fastgame/games/";
export const API_GET_QG = FAST_GAME;
export const API_CREATE_QG = FAST_GAME;
export const API_JOIN_QG = "/join/";
export const API_STATUS_QG = "/get_game_status/";

// profile
export const API_TOP_UP_WALLET = "/user/payments/";
export const API_CONFIRM_PAYMENT = "/user/payments/confirm_payment/";