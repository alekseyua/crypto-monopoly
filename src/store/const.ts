export const enum EStoreQG {
  ROLE_DICE_STORE = 'roleDiceStore',
  MESSAGE_ERROR_CREATE_GAME = 'messageErrorCreateGame',
}


//set dice roll quick game
export const SET_ROLL_DICE_QG = "set/role_dice" as const;
export const RESET_ROLL_DICE = "reset/role_dice" as const;
export const SET_ANIMATION_ROLL_DICE_STARTED = "set/animation_role_dice" as const;
export const SET_ANIMATION_ROLL_DICE_ENDED = "set/animation_role_dice_ended" as const;

// websocket 
export const SET_QUEUE_MESSAGES_WS = "set/queue_messages_ws" as const;
export const SET_QUEUE_MESSAGES_FEED_WS = "set/queue_messages_feed_ws" as const;
export const HANDLE_WEBSOCKET_MESSAGE = 'set/websocket_message' as const;
export const HANDLE_WEBSOCKET_MESSAGE_FEED = 'set/websocket_message_feed' as const;
export const SHOW_FEED_QUEUED_WEBSOCKET_MESSAGES = 'show/feed/queued_websocket_messages' as const;


//profile
export const SET_REDIRECT_TO = 'set/redirect_to' as const;
export const SET_LOCATION = 'set/location' as const;