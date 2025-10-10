interface IOwnerCard {
  player: IPlayer;
  can_build: boolean;
  is_pawn: boolean;
  hotels: number;
  houses: number;
  // card_info: ICardInfo | ISpecialCardInfo;
}

interface ICard {
  id: number;
  name: string;
  card_number: number;
  type_card: string;
  cost: string;
  owner: IOwnerCard;
  // board: null; // ?????????/
  city: ICardCity | CardCitySpecialCard;
  image: string;
  bgc_header: string;
  players: IPlayer[];
  card_info: ICardInfoCards | ISpecialCardInfoChanceCommunity; // <==================== ??????????????
}

interface ISpecialCard {
  id: number;
  name: string;
  card_number: number;
  type_card: string;
  cost: string;
  owner: IOwnerCard;
  board: null;
  city: "";
  image: string;
  bgc_header: string;
  players: IPlayer[];
  card_info: ISpecialCardInfo;
}

interface ISpecialCardInfoChanceCommunity {
  base_cost: number;
  card_type: string;
  monopoly_tax: number;
  name: string;
  one_card_tax: number;
}

interface ISpecialCardInfo {
  base_cost: number;
  name: string;
  one_card_tax: number;
  two_card_tax: number;
  three_card_tax: number;
  four_card_tax: number;
  monopoly_tax: number;
  card_type: string;
  start_price: number;
  info: ICardInfoData;
}


interface IHouseTaxes {
    [key: string]: number;
}
interface ICardCity {
    name: string;
    country: string;
}
type CardCitySpecialCard = string;

interface IDataCardFeatures {
    base_cost: number;
    house_taxes: IHouseTaxes[];
    monopoly_tax: number;
    one_card_tax: number;
}

interface IDataCardPrice {
    hotel: number;
    house: number;
}

interface IDataActionsStore {
  actions: CardDataDataActionsType | CardDataDataActionsJailType;
  card: IDataActionsCard;
  card_type: string
  card_info: ICardInfo;
  info: ICardInfoData;
  prices: IDataCardPrice;
  features: IDataCardFeatures;
  card_id: number;
  move_end_time_sec: number;
}
interface IDataActions {
  actions: CardDataDataActionsType | CardDataDataActionsJailType;
  card?: IDataActionsCard;
  card_type: string
  card_info?: ICardInfo;

  // info: ICardInfoData;
  // prices: IDataCardPrice;
  // features: IDataCardFeatures;
  // card_id: number;
  // move_end_time_sec: number;
}

interface IDataActionsCard {
  id: number;
  name: string;
}

export interface IDataContainer {
  [key]: {} | number;
  data_actions: IDataActionsStore;
  auction_data: IAuctionData;
  choose_data: IChooseData;
  card_id: number;
}

export interface IPlayerAuctionData {
    "id": number,
    "balance": string,
    "move_number_auction": number,
    "current_move_auction": boolean
}

export interface ICardAuctionData {
    "id": number,
    "card": "Ottawa",
    "owner": null,
    "hotels": number,
    "houses": number,
    "mortgaged": boolean,
    "collection": string
}

export interface ICardInfoData {
  name: string;
  country_name: string;
  collection_amount: string;
}

export interface ICardPriceData {
  hotel: number;
  house: number;
}

export interface ICardFeaturesData {
  base_cost: number;
  house_taxes: IHouseTaxes[];
  monopoly_tax: number;
  one_card_tax: number;
}

export interface ICardInfoCards{
  info: ICardInfoData;
  prices: ICardPriceData;
  features: ICardFeaturesData;
  card_type: string;
}

export interface ICardInfo {
  info: ICardInfoData;
  prices: ICardPriceData;
  features: ICardFeaturesData;
  card_type: string;

  start_price?: number; // ???
  highest_bid?: number; // ???
  base_cost?: number; // ???
}

export interface ICardAuctionDataPrices {
    "hotel": number,
    "house": number
}
interface IHighestBidderDataPlayerData {
    "player_id": string;
    "player_name": string;
}
interface IHighestBidderData {
    "highest_bid": number;
    "player_data": IHighestBidderDataPlayerData
}

export interface IAuctionData {
    "card_id": number;
    "end_time_sec": number;

    "highest_bidder_data": IHighestBidderData

    "id": number,
    "bids": [],
    "closed": boolean,
    "players": IPlayerAuctionData[],
    "end_time": string,
    "property": ICardAuctionData,
    "card_info": ICardInfo;
    "start_price": string,
    "highest_bid": number,
    "highest_bidder": string;
}

interface IUserActions {
    "0":IDataContainer;
    [key as string]: IDataContainer;

}

// interface ICardData {
//     "status": "success" | string,
//     "card_id": number,
//     "message": string,
//     "data_actions": {
//         "actions": CardDataDataActionsType;
//         "card_info": ICardInfo,
//         "card_id": number,
//         card: {}
//     }
// }

type ActionTypes = "buy" | "auction";

type CardDataDataActionsJailType = {
  pay_for_freedom: boolean;
  roll_the_dice: boolean;
  freedom_card: boolean;
};

type CardDataDataActionsType = {
  auction: boolean;
  buy: boolean;
  pay: boolean;
  add_card: boolean;
  move: boolean;
  add_chance: boolean;
  move_to: boolean;
  pay_tax_or_add_card_chance: boolean; // оплатить налог или получить карту шанса
  roll_the_dice_freedom: boolean; //кинуть кубики(без передвижения)
};

interface IDataQG {
  id: number;
  // auctions:[];
  cards: ICard[] | ISpecialCard[];
  // name: string;
  players: IPlayer[];
  // current_turn: number;
  // is_start: boolean;
  // bet_amount: string;
  // turn_time: number;
  // start_money: string;
  // max_players: number;
}

interface ISocket {
    [key: string]: WebSocket | null | any
}

interface Property {
    id: number;
    card: string;
    owner: string;
    houses: number;
    hotels: number;
    mortgaged: boolean;
    collection: string;
}

interface BillData {
    balance: number;
    property: number;
    capital: number;
    jackpot: number;
    rank: number;
}

interface ChooseActions {
    pawn: boolean;
    sell: boolean;
    build: boolean;
    redeem: boolean;
    auction: boolean;
    exchange: boolean;
}

interface ChooseData {
    actions: ChooseActions;
    card_type: string;
    card_id: number;
}

interface IExchangeData {
    player_from_id: number;
    player_to_id: number;
    price_from: number;
    price_to: number;
    propertys_to: number[]
    propertys_from: nember[]
}

interface IPlayer {
  id: number;
  user: string;
  username: string;
  // balance: string;
  color: string;
  // is_creater: boolean;
  // is_start_fast_game: boolean;
  // fast_game_id: number;
  // is_start_main_game: boolean;
  // main_game_id: number | null;
  properties: Property[];
  // bankrupt: boolean;
  current_card: number;
  move_number: number;
  current_move: boolean;
  card_data: ICardData;
  auction_data: Record<string, unknown>;
  choose_data: IChooseData | Record<string, never>;
  exchange_data: Record<string, never>;
  bill_data: BillData;
  status: statusPlayer;
  move_end_time_sec: number;
  popup_data: IInfoMassagePopup;
  dice_roll_1: number;
  dice_roll_2: number;
  avatar?: string;
  is_concluded: boolean;
}

interface ICardData {
  card_id: number;
  data_actions: IDataActions;
};
interface IInfoMassagePopup {
  show: boolean;
  message: string;
  type_card: string;
}

type nameAchivments = {
    "name" : string;
}
interface IAchivmentPlayer {
    "id": number;
    "achievement": nameAchivments;
    "date_awarded": string;
    "repeat": number;
}


 interface IListQGs {
    id: number;
    name: string;
    start_money: number;
    bet_amount: string;
    max_players: number;
    players: IPlayer[]
  }

type StatusPlayer = 'waiting' | 'move' | 'buy_or_auction' | 'end_move';
type Players = IPlayer[];


interface IMassagesFeed {
  id: number;
  game: number;
  player: number;
  player_name: string;
  player_color: string;
  message: string;
  date_create: string;
}

interface IChooseDataActions {
  auction: boolean;
  pawn: boolean;
  sell: boolean;
  build: boolean;
  redeem: boolean;
  exchange: boolean;
  can_sell_property: boolean;
}

interface IChooseData {
  actions: IChooseDataActions;
  card_id: number;
  card_type: string;
  card_info: ICardInfo;
};

interface IRoleDiceStore {
    rd1: number;
    rd2: number;
}

export type {
  ICard,
  ISocket,
  IDataQG,
  IPlayer,
  IListQGs,
  ICardCity,
  ICardData,
  IOwnerCard,
  IChooseData,
  StatusPlayer,
  IUserActions,
  ISpecialCard,
  IDataActions,
  IExchangeData,
  IMassagesFeed,
  IDataContainer,
  IRoleDiceStore,
  IAchivmentPlayer,
  ISpecialCardInfo,
  IInfoMassagePopup,
  IDataActionsStore,
  IChooseDataActions,
  IHighestBidderData,
  CardDataDataActionsType,
  CardDataDataActionsJailType,
};