import { delay, isKeyPresentInHash } from "../../helpers/helper"
import { NAV_QG_FIELD_PAGE, NAV_QG_SELECT_PAGE } from "../../routers/config-nav";
import { SET_FEED_NEWS_MESSAGE_QG, SET_MESSAGE } from "../message/message";
import { SET_MODAL } from "../modal/modal";
import { RESET_QG, SET_ACHIVMENT_PLAYER_QG, SET_LIST_QG, SET_MESSAGE_ERROR_CREATE_GAME } from "../quick-game/quick-game";
 import {IPlayer} from "../quick-game/quick-game.type";
import { IChooseData } from "../quick-game/quick-game.type";
import { SET_DATA_PLAYER_QG } from "../quick-game/quick-game";
import { OPEN_WS_FEED_NEWS_QG } from "../quick-game/quick-game";
import { SET_QG } from "../quick-game/quick-game";
import { SET_LIST_CARDS_QG } from "../quick-game/quick-game";
import { RESET_ROLL_DICE, SET_ROLL_DICE_QG } from "../const";
import { SET_INFO_MESSAGE_POPUP } from "../quick-game/quick-game";
import { SET_DATA_ACTION_CARD } from "../quick-game/quick-game";
import { SET_EXCHANGE_DATA } from "../quick-game/quick-game";
import { IState } from "..";

export const setErrorTimming = async (action: string, err: string | undefined, dispatch: any, time = 500) => {
    dispatch(action, err)
    await delay(time);
    dispatch(action, '')
}
let profileID: number | undefined = undefined;

export const handleWebSocketMessageFeed = (msg : any, store: IState , dispatch: any) => {
  if (isKeyPresentInHash(msg, "send_data")) {
    dispatch(SET_ACHIVMENT_PLAYER_QG, msg.send_data.achievements ?? []);
    dispatch(SET_FEED_NEWS_MESSAGE_QG, msg.send_data.messages ?? []);
  }
}
export const handleWebSocketMessage = (msg : any, store: IState , dispatch: any) => {
     if (!!store?.user?.id) profileID = store?.user?.id;

          // ===== Messages handling =====
          if (isKeyPresentInHash(msg, 'message_popup')) console.table(msg.message_popup);
          if (msg?.message === "No game with this id") {
            dispatch(RESET_QG);
            dispatch(SET_MESSAGE, [{ title: "Error", desc: msg.message }]);
            // return payload?.redirectTo(NAV_QG_SELECT_PAGE);
            return store?.redirectTo(NAV_QG_SELECT_PAGE);

          }else if(msg.type === "game" && msg?.message && msg?.message === ""){
            dispatch(SET_MESSAGE, [{ title: "Temp message mony", desc: msg.message }]);
          }
          if (msg?.error && isKeyPresentInHash(msg, 'game_data_creating')) {
            dispatch(SET_MESSAGE_ERROR_CREATE_GAME, msg.game_data_creating);
            setTimeout(()=>{
              dispatch(SET_MESSAGE_ERROR_CREATE_GAME, []);
            },3000);
            return;
          }else{
              dispatch(SET_MODAL, { isOpen: false });
          }

          // ===== List games quick =====
          if (isKeyPresentInHash(msg, "games_data")) dispatch(SET_LIST_QG, msg.games_data);

          // ===== Current game quick =====
          if (isKeyPresentInHash(msg, "game_data")) {
            const currentPlayer: IPlayer[] =
              msg.game_data?.players.filter((p: any) => +p.user === profileID);
            if (!currentPlayer || !currentPlayer[0]) console.error('Failed to retrieve current player data');

            dispatch(SET_DATA_PLAYER_QG, currentPlayer[0]);
            if (!msg.game_data.is_active || !currentPlayer.length) {
              return store.redirectTo(NAV_QG_SELECT_PAGE);
            } else if (store?.location?.pathname !== NAV_QG_FIELD_PAGE && msg.game_data.is_start) {
              store.redirectTo(NAV_QG_FIELD_PAGE);
            }

            dispatch(OPEN_WS_FEED_NEWS_QG, { game_id: msg.game_data.id });
            dispatch(SET_QG, msg.game_data);
            if (msg.game_data?.cards?.length) dispatch(SET_LIST_CARDS_QG, msg.game_data.cards);

            if (currentPlayer[0].show_dice_roll) {
              dispatch(SET_ROLL_DICE_QG, {
                rd1: currentPlayer[0].dice_roll_1,
                rd2: currentPlayer[0].dice_roll_2,
              });
               
            } else {
              dispatch(RESET_ROLL_DICE);
            }

            if (isKeyPresentInHash(currentPlayer[0]?.popup_data, "show")) {
              dispatch(SET_INFO_MESSAGE_POPUP, currentPlayer[0].popup_data);
            }

            let choose_data: IChooseData | undefined = undefined;
            if (isKeyPresentInHash(currentPlayer[0]?.choose_data, "actions")) {
              choose_data = { ...currentPlayer[0]?.choose_data };
            }

            if (isKeyPresentInHash(currentPlayer[0]?.card_data, "data_actions")) {
              dispatch(SET_DATA_ACTION_CARD, {
                [`${profileID}`]: {
                  auction_data: undefined,
                  data_actions: {
                    actions: currentPlayer[0]?.card_data.data_actions?.actions,
                    card_info: currentPlayer[0]?.card_data.data_actions?.card_info,
                    card: currentPlayer[0]?.card_data.data_actions?.card,
                    card_id: currentPlayer[0]?.card_data.card_id,
                  },
                  choose_data: choose_data,
                  card_id: currentPlayer[0]?.current_card,
                },
              });
            } else if (isKeyPresentInHash(currentPlayer[0]?.auction_data, "id")) {
              dispatch(SET_DATA_ACTION_CARD, {
                [`${profileID}`]: {
                  data_actions: undefined,
                  auction_data: currentPlayer[0]?.auction_data,
                  choose_data: choose_data,
                  card_id: currentPlayer[0]?.current_card,
                },
              });
            } else {
              dispatch(SET_DATA_ACTION_CARD, {
                [`${profileID}`]: {
                  data_actions: undefined,
                  auction_data: undefined,
                  choose_data: choose_data,
                  card_id: currentPlayer[0]?.current_card,
                },
              });
            }

            if (isKeyPresentInHash(currentPlayer[0]?.exchange_data, "price_to")) {
              dispatch(SET_EXCHANGE_DATA, currentPlayer[0]?.exchange_data);
            } else {
              dispatch(SET_EXCHANGE_DATA, {});
            }
          }
}