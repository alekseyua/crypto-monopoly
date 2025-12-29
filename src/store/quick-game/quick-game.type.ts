
// -------- common card info data -------------------------------
export interface IInfo {
  name: string;
  country_name: string;
  collection_amount: string;
}
export interface IFeatures {
  base_cost: number;
  house_taxes: IHouseTaxes[];
  monopoly_tax: number;
  one_card_tax: number;
  sell_price: number;
}
export interface IFeaturesSpecial {
  base_cost: number;
  monopoly_tax: number;
  one_card_tax: number;
  sell_price: number;
}
interface IHouseTaxes {
  [key: string]: number;
}
export interface IPriceBuilding {
  hotel: number;
  house: number;
}
// --------------------------------------------------------------


// =====================================================================================================================
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
  bgc_header: string;
  name: string;
  card_number: number;
  type_card: string;
  cost: string;
  owner: IOwnerCard;
  // board: null; // ?????????/
  city: ICardCity | CardCitySpecialCard;
  image: string;
  players: IPlayer[];
  // card_info: ICardInfoCards | ISpecialCardInfoChanceCommunity; // <==================== ??????????????
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
  info: IInfo;
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
    sell_price: number;

}

interface IDataCardPrice {
    hotel: number;
    house: number;
}

interface IDataActionsStore {
  actions: CardDataDataActionsType | CardDataDataActionsJailType;
  card: IDataActionsCard;
  card_type: string
  card_info: ICardInfo | ISpecialCardInfo;
  info: IInfo;
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
}

interface IDataActionsCard {
  id: number;
  name: string;
}

interface IDataContainer {
  [key: string]: {} | number;
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



export interface ICardInfoCards{
  info: IInfo;
  prices: IPriceBuilding;
  features: IFeatures;
  card_type: string;
}

export interface ICardInfo {
  info: IInfo;
  prices: IPriceBuilding;
  features: IFeatures;
  card_type: string;

  start_price?: number; // ???
  highest_bid?: number; // ???
  base_cost?: number; // ???card_info

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
    [key: string]: IDataContainer;

}

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
  is_active: boolean; //Если он false,уходим с игры 
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

interface IExchangeData {
    player_from_id: number;
    player_to_id: number;
    price_from: number;
    price_to: number;
    propertys_to: number[]
    propertys_from: number[]
}
type statusPlayer = 'end_move' | 'waiting';
interface IPlayer {
  id: number;
  user: string;
  username: string;
  color: string;
  properties: Property[];
  current_card: number;
  move_number: number;
  current_move: boolean;
  card_data: ICardData;
  auction_data: Record<string, unknown>;
  choose_data: IChooseData;
  exchange_data: Record<string, never>;
  bill_data: BillData;
  status: statusPlayer;
  move_end_time_sec: number;
  popup_data: IInfoMassagePopup;
  dice_roll_1: number;
  dice_roll_2: number;
  avatar?: string;
  is_concluded: boolean;
  show_dice_roll: boolean;
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

interface IMassagesFeed {
  id: number;
  game: number;
  player: number;
  player_name: string;
  player_color: string;
  message: string;
  date_create: string;
} 

// delete
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

/* ===================== ENUM ===================== */
export const enum EQuickGameStore {
  ROLE_DICE_STORE = 'roleDiceStore',
  MESSAGE_ERROR_CREATE_GAME = 'messageErrorCreateGame',
  POPUP_MESSAGE = 'infoMassagePopup',
  LIST_ACHIVMENT_PLAYER = 'listAchivmentPlayer',
  LIST_CARD_QG = 'listCardQG',
  DATA_ACTION_CARD_QG = 'dataActionCardQG',
  DATA_PLAYER_QG = 'dataPlayerQG',
  QUICK_GAME = 'quickGame',
  LIST_QGS = 'listQGs',
  EXCHANGE_DATA = 'exchangeData',
  SHOW_RATE = 'showRate',
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
  IHighestBidderData,
  CardDataDataActionsType,
  CardDataDataActionsJailType,
};