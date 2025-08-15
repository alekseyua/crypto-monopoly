interface ownerCard {
    "player": IPlayer;
    "can_build": boolean;
    "is_pawn": boolean;
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
    "city": string;

}


interface IHouseTaxes {
    [key: string]: number;
}
interface IDataCardInfo {
    name: string;
    country_name: string;
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
    data_actions: {
        "info": IDataCardInfo,
        "prices": IDataCardPrice,
        "features": IDataCardFeatures
    };
    auction_data: IAuctionData;
    choose_data: {
        actions: {
            buy?: boolean;
            auction?: boolean;
            sell?: boolean;
            exchange?: boolean;
            build?: boolean;
            pawn?: boolean;
            redeem?: boolean;
        }
    };
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

export interface ICardAuctionDataContainer {
    "info": ICardInfoData,
    "prices": ICardPriceData,
    "features": ICardFeaturesData,
    "card_type": string,
    "highest_bid": number,
    "start_price": number
}

export interface ICardAuctionDataPrices {
    "hotel": number,
    "house": number
}
export interface IAuctionData {
    "id": number,
    "bids": [],
    "closed": boolean,
    "players": IPlayerAuctionData[],
    "end_time": string,
    "property": ICardAuctionData,
    "card_info":  ICardAuctionDataContainer;
    "highest_bid": number | null,
    "start_price": string,
    "highest_bidder": null;
}

interface IUserActions {
    [key as string | any]: IDataContainer
    
}

interface ICardData {
    "status": "success" | string,
    "card_id": number,
    "message": string,
    "data_actions": {
        "actions": IActionCard[]
        "card_info": ICardAuctionDataContainer,
        "card_id": number,
    }
}
type ActionTypes = "buy" | "auction";
interface IActionCard {
    [key in ActionType ]?: boolean;
}

interface IDataQG{
    "id": number | null;
    "cards": ICard[];
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
    [key: string] : WebSocket | null | any 
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
  status: statusPlayer
}
type StatusPlayer = 'waiting' | 'move' | 'buy_or_auction' | 'end_move';
type Players = IPlayer[]
export type {
    IExchangeData,
    IDataContainer,
    ICard,
    ISocket,
    IDataQG, 
    IPlayer,
    ownerCard,
    ICardData,
    IActionCard,
    StatusPlayer,
    IUserActions,
}