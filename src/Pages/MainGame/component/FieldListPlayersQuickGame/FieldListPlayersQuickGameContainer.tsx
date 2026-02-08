import { useEffect, useState } from 'react';
import { IPlayer } from '../../../../store/quick-game/quick-game.type';
import FieldListPlayersQG from './FieldListPlayersQuickGame'
import { useStoreon } from 'storeon/react';
import { SEND_ACTION_CARD_QG } from '../../../../store/quick-game/quick-game';
import { useWindowWidth } from '../../../../hooks/useWindowWidth';
import { Button } from '../../../../shared/UI';

interface IFieldListPlayersQGProps {
  players: IPlayer[];
  dataPlayerQG: IPlayer;
  listSelectUserPreview: number[];
  handleClickUserPreview: (id:number) => void;
  heightGameBoard: number;
  isChangeCard: boolean;
}

const FieldListPlayersQGContainer: React.FC<IFieldListPlayersQGProps> = ({
  players,
  isChangeCard,
  dataPlayerQG,
  heightGameBoard,
  listSelectUserPreview,
  handleClickUserPreview,
}: IFieldListPlayersQGProps) => {
  const {isMobile} = useWindowWidth();
  const [showFeetHistory, setShowFeetHistory] = useState<boolean>(isMobile);
  const {showRate, dispatch} = useStoreon('showRate',);
  const [isOpenListPlayers, setIsOpenListPlayers ] = useState<boolean>(true);
  const [listPlayers, setListPlayers ] = useState<IPlayer[]>([...players].sort((a : IPlayer,b : IPlayer): any => b.bill_data.capital - a.bill_data.capital));
  const [sortingListPlayers, setSortingListPlayers ] = useState<'rate'| 'capital'>('capital');
  const [isOpenModal, setIsOpenModal ] = useState<string>('');
  const handleClickOpen = function (){
    setIsOpenListPlayers(s=>!s)
  }
  const handleSettingCard = function (status: string){
   if (status === 'exit') {
			return dispatch(SEND_ACTION_CARD_QG, {
        action: 'end_game',
   })
		}
    isChangeCard && 
      setIsOpenModal(status);
  }
  useEffect(()=>{
    // при клике в футоре инфо окна  разворачивать список игроков отсортированных по капиталу
    setIsOpenListPlayers(true);
    // setSortingListPlayers('capital');
  },[showRate])

  useEffect(()=>{
    if(sortingListPlayers === 'capital'){
      const sort = players.sort((a : IPlayer,b : IPlayer): any => b.bill_data.capital - a.bill_data.capital);
      setListPlayers(sort)
    }else{
      const sort = players.sort((a : IPlayer,b : IPlayer): any => b.move_number - a.move_number);
      setListPlayers(sort)
    }
  },[sortingListPlayers , players])

  const handleSorting = function(sortValue: 'rate' | 'capital'){
    const whatSort =sortValue === 'capital'? 'rate' : 'capital';
    setSortingListPlayers(whatSort);
    if(whatSort === 'capital'){
      const sort = players.sort((a : IPlayer,b : IPlayer): any => b.bill_data.capital - a.bill_data.capital);
      setListPlayers(sort)
    }else{
      const sort = players.sort((a : IPlayer,b : IPlayer): any => b.move_number - a.move_number);
      setListPlayers(sort)
    }
  }
  if (isMobile && showFeetHistory) {
      return <Button
        onClick={() => setShowFeetHistory(false)}
        fillColor='#726CED'
        type='filled'
        p={12}
        textColor='#fff'
      >Список игроков</Button>
  }
  if(!showFeetHistory){
    return (
      <FieldListPlayersQG
        isMobile={isMobile}
        setShowFeetHistory={setShowFeetHistory}
        sortingListPlayers={sortingListPlayers}
        handleSorting={handleSorting}
        heightGameBoard={heightGameBoard}
        players={listPlayers}
        dataPlayerQG={dataPlayerQG}
        listSelectUserPreview={listSelectUserPreview}
        handleClickUserPreview={handleClickUserPreview}
        handleSettingCard={handleSettingCard}
        isOpenListPlayers={isOpenListPlayers}
        handleClickOpen={handleClickOpen}
        isOpenModal={isOpenModal}
      />
    )
  }
}

export default FieldListPlayersQGContainer