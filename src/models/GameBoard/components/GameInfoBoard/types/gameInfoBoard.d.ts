import { ICard } from "../../../../../store/quick-game/quick-game";

export interface IGameInfoBoardAuctionQGProps {
	game_id: number;
	typeCard: 'auction-card' | 'auction-special-card' | 'place-bet';
	cards: ICard[];
	card_id: number;
	startPrice: number;
	cardInfo: ICardInfo;
	highest_bid: number;
	endTime: string | ReactNode;
	highest_bidder: number | null;
	highestBidderData: {
		highest_did: number;
		player_data: {
			player_id: string;
			player_name: string;
		}
	};
	property: any;
	handleCard?: (rest:any) => void;
	typeStyle?: 'buy' | 'auction';
	handleChangeScreen?: (params: { path: string }) => void;
}