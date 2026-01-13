import React, { useEffect } from 'react'
import ActionsCard from './ActionsCard'
import InfoCard from './InfoCard'
import InfoSpecialCard from './InfoSpecialCard';
import { IActionsChooseData, ICardInfoChooseData } from '../../../../../../store/quick-game/chooseData.type';
import { ICard, ISpecialCard } from '../../../../../../store/quick-game/quick-game.type';

type AnyCard = ICard | ISpecialCard;

interface IProps {
    card: AnyCard;
    actions: IActionsChooseData//{ [key: string]: boolean }
    handleBack: (p:any) => void; // Assuming this is needed for navigation
    timeEndMove: number; // Optional, assuming it might be used in the future
    handleAction: (params: any) => void; // Function to handle actions like sell
    showInfoCard: 'action-card' | 'action-special-card' | 'actions';
    cardInfo: ICardInfoChooseData;
}

const ActionsCardContainerStackScreen:React.FC<IProps> = ({
    card,
    cardInfo,
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
            cardInfo={cardInfo as ICardInfoChooseData}
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
            cardInfo={cardInfo}

        />
    }
    return (
        <ActionsCard
            handleAction={handleAction}
            showInfoCard={showInfoCard}
            cardInfo={cardInfo}

            card_id={card.id}
            card={card as ICard}
            colorName={showInfoCard === 'action-special-card'? card.bgc_header : card?.owner?.player?.color}
            actions={actions}
            handleChangeScreen={handleChangeScreen}
            timeEndMove={timeEndMove} // Assuming timeEndMove is part of the card object
            handleBack={handleBack} // Assuming you want to go back to actions card
        />
  )
}

export default ActionsCardContainerStackScreen