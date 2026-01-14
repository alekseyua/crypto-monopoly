import { StoreonStore } from "storeon";
import { EStoreQG, RESET_ROLL_DICE, SET_ANIMATION_ROLL_DICE_STARTED, SET_ANIMATION_ROLL_DICE_ENDED, SET_QUEUE_MESSAGES_WS, SET_ROLL_DICE_QG, SET_PROCESSING_QUEUE } from "../const";
import { IRoleDiceStore } from "../quick-game/quick-game.type";
import { _INIT } from "../auth/auth";
import { IState } from "..";
import { handleWebSocketMessage, handleWebSocketMessageFeed } from "../helperStore/helperStore";

export const diceRoll = (store: StoreonStore<IState>) => {

    store.on(_INIT, () => ({
        // Role Dice Store
        roleDiceStore: {
            rd1: 0,
            rd2: 0,
        } as IRoleDiceStore,
        isAnimationRollDice: false,
    }));

    // --------------- Role Dice -----------------
    store.on(RESET_ROLL_DICE, () => ({ [EStoreQG.ROLE_DICE_STORE]: { rd1: 0, rd2: 0 } }));
    store.on(SET_ROLL_DICE_QG, (_, payload: IRoleDiceStore) => ({
        [EStoreQG.ROLE_DICE_STORE]: payload,
    }));

    store.on(SET_ANIMATION_ROLL_DICE_STARTED, (_:IState, payload: boolean) => ({
        isAnimationRollDice: payload,
    }));

    store.on(SET_ANIMATION_ROLL_DICE_ENDED, (state: IState, payload, {dispatch}) => {
        console.log('ANIMATION ENDED', {state});
        
        // Устанавливаем флаг обработки очереди.
        dispatch(SET_PROCESSING_QUEUE, true);

        // Обработка сообщений из очереди.
        if (state.queueMessagesWs.length > 0) {
            state.queueMessagesWs.forEach((msg) => {
                handleWebSocketMessage(msg, state, dispatch);
            });
        }
        
        // Обработка сообщений ленты.
        state.queueMessagesFeeds.forEach((msg) => {
            handleWebSocketMessageFeed(msg, state, dispatch);
        });

        // Завершаем обработку очереди.
        dispatch(SET_PROCESSING_QUEUE, false);
        
        return {
            isAnimationRollDice: false,  // Завершаем анимацию
            queueMessagesWs: [],         // Очищаем очередь WebSocket сообщений
            queueMessagesFeeds: [],      // Очищаем очередь сообщений ленты
        };
    });

};