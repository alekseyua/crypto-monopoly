import React from 'react'
import ActionsCard from './ActionsCard'
import InfoCard from './InfoCard'
import { ICard } from '../../../../../../store/quick-game/quick-game.d'

interface IProps {
    card: ICard
}

const ActionsCardContainerStackScreen:React.FC<IProps> = ({
    card,
}:IProps) => {
    const [ screen, setScreen ] = React.useState<'actions-card' | 'info-card'>('info-card'); 

    const handleChangeScreen = (newScreen: 'actions-card' | 'info-card') => {
        setScreen(newScreen);
    }

    console.log('ActionsCardContainerStackScreen', card);

    if(screen === 'info-card'){
        return <InfoCard 
            handleChangeScreen={handleChangeScreen}
        />
    }
    return (
        <ActionsCard 
            handleChangeScreen={handleChangeScreen}
        />
  )
}

export default ActionsCardContainerStackScreen