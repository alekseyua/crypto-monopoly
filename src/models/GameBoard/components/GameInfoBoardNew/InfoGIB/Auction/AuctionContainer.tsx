import React from 'react'
import { AuctionInfoCard } from './AuctionInfoCard'
import { IGameInfoBoardAuctionQGProps } from '../../../GameInfoBoard/types/gameInfoBoard'
import { AuctionPlaceBet } from './AuctionPlaceBet'
import { ICard, ICardInfo, IHighestBidderData, ISpecialCardInfo } from '../../../../../../store/quick-game/quick-game.d';
import { AuctionSpecialInfoCard } from './AuctionSpecialInfoCard';
import { AuctionSpecialPlaceBet } from './AuctionSpecialPlaceBet';

export interface IAuctionProps {
  game_id: number;
  showInfoCard: 'auction-card' | 'auction-special-card' | 'place-bet';
  card_id: number;
  startPrice: number;
  cardInfo: ICardInfo | ISpecialCardInfo;
  highest_bid: number;
  endTime: number;
  highest_bidder: string;
  highestBidderData: IHighestBidderData;
  // property: any;
  handleCard: (rest:any) => void;
  typeStyle?: 'buy' | 'auction';
  handleChangeScreen?: (params: { path: string }) => void;
}

const AuctionContainer: React.FC<IAuctionProps> = ({
  endTime,
  game_id,
  card_id,
  cardInfo,
  showInfoCard,
  // property,
  typeStyle,
  handleCard,
  startPrice,
  highest_bid,
  highest_bidder,
  highestBidderData,
}: IAuctionProps) => {
  const [screen, setScreen ] = React.useState<'auction-card' | 'auction-special-card' | 'place-bet'>(showInfoCard)
  const handleChangeScreen = ({path}: {path: string}) => {
    setScreen(path as 'auction-card' | 'place-bet')
  }
  console.log({highest_bid})
  if( screen === 'place-bet'  && showInfoCard === 'auction-card' ) {
    return (
      <AuctionPlaceBet 
        handleCard={handleCard}
        game_id={game_id}
        // showInfoCard={showInfoCard}
        card_id={card_id}
        startPrice={startPrice}
        cardInfo={cardInfo as ICardInfo}
        highest_bid={highest_bid}
        // highest_bidder={  highest_bidder}
        // highestBidderData={  highestBidderData}
        // typeStyle={typeStyle}
        handleChangeScreen={handleChangeScreen}
        endTime={endTime}
        />
      )
    } else
  if( screen === 'place-bet'  && showInfoCard === 'auction-special-card' ) {
    return (
      <AuctionSpecialPlaceBet 
        handleCard={handleCard}
        game_id={game_id}
        // showInfoCard={showInfoCard}
        card_id={card_id}
        startPrice={startPrice}
        cardInfo={cardInfo as ISpecialCardInfo}
        highest_bid={highest_bid}
        // highest_bidder={  highest_bidder}
        // highestBidderData={  highestBidderData}
        // typeStyle={typeStyle}
        handleChangeScreen={handleChangeScreen}
        endTime={endTime}
        />
      )
    }
  if( screen === 'auction-special-card' ) {
    return (
      <AuctionSpecialInfoCard // нужно переделать
        endTime={endTime}
        cardInfo = {cardInfo as ISpecialCardInfo}
        handleChangeScreen={handleChangeScreen}
      />
      )
    }
    
    
    return (
      <AuctionInfoCard
        endTime={endTime}
        cardInfo = {cardInfo as ICardInfo}
        handleChangeScreen={handleChangeScreen}
      />
  )
}

export default AuctionContainer