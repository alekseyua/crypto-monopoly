import React from 'react'
import { GameInfoBoardAuctionQG } from './GameInfoBoardAuctionQG'
import { IGameInfoBoardAuctionQGProps } from '../types/gameInfoBoard'
import { GameInfoBoardPlaceBetAuctionQG } from './GameInfoBoardPlaceBetAuctionQG'

const GameInfoBoardAuctionQGStackScreen: React.FC<IGameInfoBoardAuctionQGProps> = ({
  handleCard,
  game_id,
  card_id,
  startPrice,
  cardInfo,
  property,
  typeStyle,
  highest_bid,
  highest_bidder,
  highestBidderData,
}: IGameInfoBoardAuctionQGProps) => {
  const [screen, setScreen ] = React.useState<'auction' | 'place-bet'>('auction')
  const handleChangeScreen = ({path}: {path: string}) => {
    setScreen(path as 'auction' | 'place-bet')
  }

  if( screen === 'place-bet' ) {
    return (
      <GameInfoBoardPlaceBetAuctionQG 
        handleCard={handleCard}
        game_id={game_id}
        card_id={card_id}
        startPrice={startPrice}
        cardInfo={cardInfo}
        highest_bid={highest_bid}
        highest_bidder={  highest_bidder}
        highestBidderData={  highestBidderData}
        property={property}
        typeStyle={typeStyle}
        handleChangeScreen={handleChangeScreen}
        />
      )
    }
    
    
    return (
      <GameInfoBoardAuctionQG
      handleCard = {handleCard}
      game_id = {game_id}
      card_id = {card_id}
      startPrice = {startPrice}
      cardInfo = {cardInfo}
      property = {property}
      typeStyle = {typeStyle}
      highest_bid={highest_bid}
      highest_bidder={  highest_bidder}
      highestBidderData={  highestBidderData}
      handleChangeScreen={handleChangeScreen}
    />
  )
}

export default GameInfoBoardAuctionQGStackScreen