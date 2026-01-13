// import { isKeyPresentInHash } from "../../../../helpers/helper";
// import { CardDataDataActionsType, ICard, IDataContainer, IPlayer, ISpecialCard } from "../../../../store/quick-game/quick-game.type";

// export const getAction = (function (
//     player: IPlayer,
//     data: IDataContainer
// ): keyPreview {
//     if (isChanceGetOrRemoveHouse) setIsChanceGetOrRemoveHouse(false);
//     const isActions: boolean = isKeyPresentInHash(data, "data_actions");
//     const isAuctions: boolean = isKeyPresentInHash(data, "auction_data");
//     const isChoose: boolean = isKeyPresentInHash(data, "choose_data");
//     const listCards = quickGame.cards;
//     let cardId = data?.card_id;
//     if (isAuctions) cardId = data.auction_data.card_id;
//     let typeCard =
//         cardId && !!listCards.length &&
//         listCards.filter((c: ICard | ISpecialCard) => c.id === cardId)[0]
//             ?.type_card; // тип карты на которой стоим
//     if (isChoose) typeCard = data.choose_data.card_type;
//     const isMovePlayer = player.current_move;

//     const keyAction: "data_actions" | "auction_data" | null = isActions
//         ? "data_actions"
//         : isAuctions
//             ? "auction_data"
//             : null;
//     const dataActions: any = keyAction && data[keyAction];
//     // для экспресса  airline  cruise
//     const listExceptionSpecialCard = ["express", "airline", "cruise"];
//     const isExpressAirlineCruise = listExceptionSpecialCard.includes(
//         typeCard + ""
//     );

//     // Варианты actions
//     //sell,exchange,build,pawn,redeem, auction
//     if (isChoose && isMovePlayer && !isExpressAirlineCruise) {
//         //   показывает действия в игре по клику карточки
//         return {
//             key: "info_board_actions",
//             cardId,
//         };
//     } else if (isChoose && isMovePlayer && isExpressAirlineCruise) {
//         return {
//             key: "info_board_actions_special_card",
//             cardId,
//         };
//     }
//     // показывает действия при шансе && (player.status !== 'waiting' && player.status !== 'move')
//     if (
//         (typeCard === "chance" || typeCard === "community") &&
//         isActions
//     ) {
//         return {
//             key: "info_chance",
//             cardId,
//         };
//     }

//     if (
//         isMovePlayer &&
//         player.status === "end_move" &&
//         !isAuctions &&
//         !isActions
//     ) {
//         // показывает кнопку конца хода
//         return {
//             key: "end_move",
//             cardId: 0,
//         };
//     } else if (isMovePlayer && !isAuctions && !isActions) {
//         return {
//             key: "current_move",
//             cardId: 0,
//         };
//     } else if (!isMovePlayer && !isAuctions && !isActions) {
//         // нет хода и нет данных для действий
//         return {
//             key: "wait-move",
//             cardId: 0,
//         };
//     }

//     if (isAuctions && !isExpressAirlineCruise) {
//         return {
//             key: "start_auction_one_card",
//             cardId,
//         };
//     } else if (isAuctions && isExpressAirlineCruise) {
//         return {
//             key: "start_auction_express_airline_cruise",
//             cardId,
//         };
//     }
//     // для экспресса
//     if (isExpressAirlineCruise)
//         return {
//             key: "buy_or_auction_special_card",
//             cardId,
//         };

//     // для шанса и казны
//     // const listChanceOrCommunityCard = ["chance", "community"];

//     // для обычных карт
//     const actions: CardDataDataActionsType = dataActions.actions;

//     if (
//         isKeyPresentInHash(actions, "buy") &&
//         isKeyPresentInHash(actions, "auction")
//     )
//         return {
//             key: "buy_or_auction_card",
//             cardId,
//         };
//     if (
//         isKeyPresentInHash(actions, "pay_for_freedom") &&
//         isKeyPresentInHash(actions, "roll_the_dice") &&
//         isKeyPresentInHash(actions, "freedom_card")
//     )
//         return {
//             key: "jail",
//             cardId,
//         };
//     if (
//         isKeyPresentInHash(actions, "pay") &&
//         isKeyPresentInHash(actions, "add_card")
//     )
//         return {
//             key: "pay_tax_or_add_card_chance",
//             cardId,
//         };
//     if (isKeyPresentInHash(actions, "move_to"))
//         return {
//             // скорей всего не нужен уже
//             key: "move_to",
//             cardId,
//         };
//     if (isKeyPresentInHash(actions, "move"))
//         return {
//             key: "plus_extra_move",
//             cardId,
//         }; // когда шанс +2 хода у текущего игрока
//     if (isKeyPresentInHash(actions, "another_move"))
//         return {
//             key: "plus_extra_move",
//             cardId,
//         }; // даем пользователю еще один ход. Я считаю скольки их если 3 наберается,то отправляем его в тюрьму
//     if (!isMovePlayer) {
//         return {
//             key: "wait-move",
//             cardId,
//         };
//     }
//     return {
//         key: "wait-move",
//         cardId,
//     };
// });
