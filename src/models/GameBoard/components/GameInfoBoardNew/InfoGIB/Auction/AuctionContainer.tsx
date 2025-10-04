import React, { useState } from 'react'
import { AuctionInfoCard } from './AuctionInfoCard'
import { AuctionPlaceBet } from './AuctionPlaceBet'
import { ICardInfo, ISpecialCardInfo } from '../../../../../../store/quick-game/quick-game.d';
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
  handleCard: (rest:any) => void;
  handleChangeScreen?: (params: { path: string }) => void;
}

const AuctionContainer: React.FC<IAuctionProps> = ({
  endTime,
  game_id,
  card_id,
  cardInfo,
  showInfoCard,
  handleCard,
  startPrice,
  highest_bid,
}: IAuctionProps) => {
  const [screen, setScreen ] = React.useState<'auction-card' | 'auction-special-card' | 'place-bet'>(showInfoCard)
  const handleChangeScreen = ({path}: {path: string}) => {
    setScreen(path as 'auction-card' | 'place-bet')
  }
  const [timeEndAuction, setTimeEndAuction] = useState(endTime);
  if( screen === 'place-bet'  && showInfoCard === 'auction-card' ) {
    return (
      <AuctionPlaceBet
        handleCard={handleCard}
        game_id={game_id}
        card_id={card_id}
        startPrice={startPrice}
        cardInfo={cardInfo as ICardInfo}
        highest_bid={highest_bid}
        handleChangeScreen={handleChangeScreen}
        endTime={timeEndAuction}
        setTimeEndAuction={setTimeEndAuction}
      />
    );
    } else
  if( screen === 'place-bet'  && showInfoCard === 'auction-special-card' ) {
    return (
      <AuctionSpecialPlaceBet
        handleCard={handleCard}
        game_id={game_id}
        card_id={card_id}
        startPrice={startPrice}
        cardInfo={cardInfo as ISpecialCardInfo}
        highest_bid={highest_bid}
        handleChangeScreen={handleChangeScreen}
        endTime={timeEndAuction}
      />
    );
    }
  if( screen === 'auction-special-card' ) {
    return (
      <AuctionSpecialInfoCard // нужно переделать
        endTime={timeEndAuction}
        cardInfo={cardInfo as ISpecialCardInfo}
        handleChangeScreen={handleChangeScreen}
      />
    );
    }
    
    
    return (
      <AuctionInfoCard
        endTime={timeEndAuction}
        cardInfo={cardInfo as ICardInfo}
        handleChangeScreen={handleChangeScreen}
        setTimeEndAuction={setTimeEndAuction}
      />
    );
}

export default AuctionContainer