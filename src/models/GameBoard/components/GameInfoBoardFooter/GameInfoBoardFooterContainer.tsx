import React from 'react'
import GameInfoBoardFooter from './GameInfoBoardFooter'
import { useStoreon } from 'storeon/react'
import { GET_RATE_LIST_PLAYERS } from '../../../../store/quick-game/quick-game';

const GameInfoBoardFooterContainer = () => {
    const {dataPlayerQG, dispatch} = useStoreon('dataPlayerQG');

    const handleClickRate = function (){
      dispatch(GET_RATE_LIST_PLAYERS)
    }

  return (
    <GameInfoBoardFooter 
        capital={dataPlayerQG.bill_data.capital}
        balance={dataPlayerQG.bill_data.balance}
        currentPosition={dataPlayerQG.bill_data.rank}
        handleClickRate={handleClickRate}
    />
  )
}

export default GameInfoBoardFooterContainer