import React from 'react'
import GameInfoBoardFooter from './GameInfoBoardFooter'
import { useStoreon } from 'storeon/react'
import { GET_RATE_LIST_PLAYERS } from '../../../../../store/quick-game/quick-game';


interface IProps {
  bgc?: string;
  bgcBtn?: string;
  style?: React.CSSProperties;
}

const GameInfoBoardFooterContainer:React.FC<IProps> = ({
  bgc,
  bgcBtn,
  style,

}) => {
    const {dataPlayerQG, dispatch} = useStoreon('dataPlayerQG');

    const handleClickRate = function (){
      dispatch(GET_RATE_LIST_PLAYERS)
    }

  return (
    <GameInfoBoardFooter 
        bgc={bgc}
        style={style}
        bgcBtn={bgcBtn}
        capital={dataPlayerQG?.bill_data?.capital ?? 0}
        balance={dataPlayerQG?.bill_data?.balance ?? 0}
        currentPosition={dataPlayerQG?.bill_data?.rank ?? 0}
        handleClickRate={handleClickRate}
    />
  )
}

export default GameInfoBoardFooterContainer