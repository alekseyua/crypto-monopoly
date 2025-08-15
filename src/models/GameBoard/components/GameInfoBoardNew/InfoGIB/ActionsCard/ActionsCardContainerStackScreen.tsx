import React, { use, useEffect } from 'react'
import ActionsCard from './ActionsCard'
import InfoCard from './InfoCard'
import { ICard } from '../../../../../../store/quick-game/quick-game.d'

interface IProps {
    card: ICard;
    timeEndMove: number; // Optional, assuming it might be used in the future
    handleBack: (p:any) => void; // Assuming this is needed for navigation
	actions: { [key: string]: boolean }
    handleAction: (params: any) => void; // Function to handle actions like sell
}

const ActionsCardContainerStackScreen:React.FC<IProps> = ({
    card,
    actions,
    timeEndMove,
    handleAction,
    handleBack,
}:IProps) => {
    const [ screen, setScreen ] = React.useState<'actions-card' | 'info-card'>('info-card'); 
    const [amountHouses, setAmountHouses] = React.useState<number>(1);

    const handleChangeScreen = (newScreen: 'actions-card' | 'info-card') => {
        setScreen(newScreen);
    }

    console.log('ActionsCardContainerStackScreen', card);
    useEffect(() => {
        if(!card) {
            return handleBack({
                action: 'clean_chose_actions',
            }); // or some loading state
        }
    },[card]);
    if(screen === 'info-card'){
        return <InfoCard 
            handleChangeScreen={handleChangeScreen}
            card={card}
            timeEndMove={timeEndMove} // Assuming timeEndMove is part of the card object
            handleBack={handleBack} // Assuming you want to go back to actions card
            setAmountHouses={setAmountHouses} // If you need to set amountHouses in InfoCard
            amountHouses={amountHouses} // If you need to access amountHouses in InfoCard
        />
    }
    return (
        <ActionsCard
            handleAction={handleAction}
            card_id={card.id}
            card={card}
            actions={actions}
            handleChangeScreen={handleChangeScreen}
            timeEndMove={timeEndMove} // Assuming timeEndMove is part of the card object
            handleBack={handleBack} // Assuming you want to go back to actions card
        />
  )
}

export default ActionsCardContainerStackScreen