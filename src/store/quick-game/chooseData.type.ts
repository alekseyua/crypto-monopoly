import { IFeatures, IFeaturesSpecial, IInfo, IPriceBuilding } from "./quick-game.type";

interface ICardInfoChooseData {
    info: IInfo;
    features: IFeatures | IFeaturesSpecial;
    prices: IPriceBuilding;
    card_type: string;
}

interface IActionsChooseData {
    pawn: boolean;
    sell: boolean;
    build: boolean;
    redeem: boolean;
    auction: boolean;
    exchange: boolean;
    can_sell_property: boolean;
}

export type { ICardInfoChooseData, IActionsChooseData }