interface ownerCard {
  player: IPlayer;
  can_build: boolean;
  is_pawn: boolean;
  hotels: number;
  houses: number;
  card_info: ICardInfo | ISpecialCardInfo;
}

interface ICard {
    "id": number;
    "name": string;
    "card_number": number;
    "type_card": string;
    "image": string;
    "bgc_header": string;
    "cost": string;
    "board": null; // ?????????/
    "owner": ownerCard; // ?????????/
    "players": IPlayer[], // ?????????/
    "city": ICardCity;
    "card_info": ICardInfo;
}

interface ISpecialCard {
    "id": number;
    "name": string;
    "card_number": number;
    "type_card": string;
    "cost": string;
    "owner": {
        "player": IPlayer,
        "can_build": boolean;
        "is_pawn": boolean;
        "houses": number;
        "hotels": number;
        "card_info": ISpecialCardInfo
    },
    "board": null,
    "city": "",
    "image": string;
    "bgc_header": string;
    "players": IPlayer[],
    "card_info": ISpecialCardInfo
}

interface ISpecialCardInfo {
    "base_cost": number;
    "name": string;
    "one_card_tax": number;
    "two_card_tax": number;
    "three_card_tax": number;
    "four_card_tax": number;
    "monopoly_tax": number;
    "card_type": string;
    "collection_amount": string;
    "start_price": number;
}


interface IHouseTaxes {
    [key: string]: number;
}
interface ICardCity {
    name: string;
    country: string;
}
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


export interface IDataContainer {
  [key]: {} | number;
  data_actions: {
    info: ICardInfoData;
    prices: IDataCardPrice;
    features: IDataCardFeatures;
    actions: IActionCard;
    card_info: ICardInfo;
    card_id: number;
    card: {
      id: number;
      name: string;
    };
    move_end_time_sec: number;
  };
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
    "name": string;
    "country_name": string;
}

export interface ICardPriceData {
    "hotel": number,
    "house": number
}

export interface ICardFeaturesData {
    "base_cost": number,
    "house_taxes": IHouseTaxes[],
    "monopoly_tax": number,
    "one_card_tax": number
}

export interface ICardInfo {
  info: ICardInfoData;
  prices: ICardPriceData;
  features: ICardFeaturesData;
  card_type: string;
  start_price?: number; // ???
  highest_bid?: number; // ???
  base_cost?: number; // ???
  collection_amount: string;
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

interface ICardData {
    "status": "success" | string,
    "card_id": number,
    "message": string,
    "data_actions": {
        "actions": IActionCard;
        "card_info": ICardInfo,
        "card_id": number,
        card: {}
    }
}
type ActionTypes = "buy" | "auction";

interface IActionCard {
    // [key in ActionTypes]: boolean;
    buy: boolean;
    auction: boolean;
    add_card: boolean;
    pay: boolean;
    add_chance: boolean;
    pay_for_freedom: boolean;
    roll_the_dice: boolean;
    freedom_card: boolean;
}

interface IDataQG {
    "id": number;
    "cards": ICard[] | ISpecialCard[];
    "name": string;
    "players": IPlayer[];
    "current_turn": number;
    "is_start": boolean;
    "bet_amount": string;
    "turn_time": number;
    "start_money": string;
    "max_players": number;
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
  avatar?: string;
  balance: string;
  color: string;
  is_creater: boolean;
  is_start_fast_game: boolean;
  fast_game_id: number;
  is_start_main_game: boolean;
  main_game_id: number | null;
  properties: Property[];
  bankrupt: boolean;
  current_card: number;
  move_number: number;
  current_move: boolean;
  card_data: Record<string, unknown>;
  auction_data: Record<string, unknown>;
  choose_data: ChooseData | Record<string, never>;
  bill_data: BillData;
  status: statusPlayer;
  username: string;
  move_end_time_sec: number;
  messages: IMassagesFeed[];
}

interface IInfoMassagePopup {
    "show": boolean;
    "message": string;
    "type_card": string;
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

export type {
    ICard,
    ISocket,
    IDataQG,
    IPlayer,
    IListQGs,
    ownerCard,
    ICardData,
    IChooseData,
    IActionCard,
    StatusPlayer,
    IUserActions,
    ISpecialCard,
    IExchangeData,
    IMassagesFeed,
    IDataContainer,
    IAchivmentPlayer,
    ISpecialCardInfo,
    IInfoMassagePopup,
    IChooseDataActions,
    IHighestBidderData,
}