import React, { useEffect } from 'react'
import ActionsCard from './ActionsCard'
import InfoCard from './InfoCard'
import { ICard, IChooseDataActions, ISpecialCard } from '../../../../../../store/quick-game/quick-game.d'
import InfoSpecialCard from './InfoSpecialCard';

type AnyCard = ICard | ISpecialCard;

interface IProps {
    card: AnyCard;
	actions: IChooseDataActions//{ [key: string]: boolean }
    handleBack: (p:any) => void; // Assuming this is needed for navigation
    timeEndMove: number; // Optional, assuming it might be used in the future
    handleAction: (params: any) => void; // Function to handle actions like sell
    showInfoCard: 'action-card' | 'action-special-card' | 'actions';
}

const ActionsCardContainerStackScreen:React.FC<IProps> = ({
    card,
    actions,
    handleBack,
    timeEndMove,
    handleAction,
    showInfoCard,
}:IProps) => {
    const [ screen, setScreen ] = React.useState<'action-card' | 'action-special-card' | 'actions'>(showInfoCard); 
    const [amountHouses, setAmountHouses] = React.useState<number>(1);

    const handleChangeScreen = (newScreen: 'action-card' | 'action-special-card' | 'actions') => {
        setScreen(newScreen);
    }

    useEffect(()=>{
        setScreen(showInfoCard)
    },[showInfoCard, card])

    if(screen === 'action-card'){
        return <InfoCard 
            handleChangeScreen={handleChangeScreen}
            card={card as ICard}
            timeEndMove={timeEndMove} // Assuming timeEndMove is part of the card object
            handleBack={handleBack} // Assuming you want to go back to actions card
            setAmountHouses={setAmountHouses} // If you need to set amountHouses in InfoCard
            amountHouses={amountHouses} // If you need to access amountHouses in InfoCard
            handleAction={handleAction}
            actions={actions}
        />
    }
    if(screen === 'action-special-card'){
        return <InfoSpecialCard 
            handleChangeScreen={handleChangeScreen}
            card={card as ISpecialCard}
            timeEndMove={timeEndMove} // Assuming timeEndMove is part of the card object
            handleBack={handleBack} // Assuming you want to go back to actions card
            setAmountHouses={setAmountHouses} // If you need to set amountHouses in InfoCard
            amountHouses={amountHouses} // If you need to access amountHouses in InfoCard
            handleAction={handleAction}
            actions={actions}
        />
    }
    return (
        <ActionsCard
            handleAction={handleAction}
            showInfoCard={showInfoCard}
            card_id={card.id}
            card={card as ICard}
            name={showInfoCard === 'action-special-card'? card.name : card.name}
            colorName={showInfoCard === 'action-special-card'? card.bgc_header : card?.owner?.player?.color}
            actions={actions}
            handleChangeScreen={handleChangeScreen}
            timeEndMove={timeEndMove} // Assuming timeEndMove is part of the card object
            handleBack={handleBack} // Assuming you want to go back to actions card
        />
  )
}

export default ActionsCardContainerStackScreen