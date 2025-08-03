export interface IGameInfoBoardAuctionQGProps {
	game_id: number;
	card_id: number;
	startPrice: number;
	cardInfo: ICardAuctionDataContainer;
	highest_bid: number;
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