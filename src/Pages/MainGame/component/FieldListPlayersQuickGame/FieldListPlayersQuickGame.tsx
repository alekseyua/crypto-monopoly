import { icons } from '../../../../assets';
import CardPlayersPreview from '../../../../Component/Cards/CardPlayersPreview/CardPlayersPreview';
import { Button, Offset } from '../../../../shared/UI';
import Icon from '../../../../shared/UI/Icon/Icon';
import { IPlayer } from '../../../../store/quick-game/quick-game.d';
import styles from './styles/list-player.module.scss';

interface IFieldListPlayersQGProps {
  players: IPlayer[];
  dataPlayerQG: IPlayer;
  listSelectUserPreview: number[];
  handleClickUserPreview: (id: number) => void;
  handleSettingCard: (status: string) => void;
  handleSorting: () => void;
  isOpenListPlayers: boolean;
  handleClickOpen: () => void;
  isOpenModal: string;
  sortingListPlayers: string;
  heightGameBoard: number;
  isMobile?: boolean;
  setShowFeetHistory: (b: boolean)=>void;
}


const FieldListPlayersQG: React.FC<IFieldListPlayersQGProps> = ({
  players,
  dataPlayerQG,
  listSelectUserPreview,
  handleClickUserPreview,
  handleSettingCard,
  handleClickOpen,
  isOpenModal,
  isOpenListPlayers,
  handleSorting,
  sortingListPlayers,
  heightGameBoard,
  isMobile,
  setShowFeetHistory,
}: IFieldListPlayersQGProps) => {
  return (
    <div className={styles['list-player__container']}
      style={{
        height: !isOpenListPlayers ? 200 : heightGameBoard
      }}
    >
      <div className={styles['list-player__btns-container--btn-two']}>
        <Button
          type='filled'
          fillColor={'#726CED'}
          textColor='#fff'
          p={12}
          className={styles['list-player__btn']}
        // onClick={handleBuyCard}
        >
          {isMobile && <Icon src={icons.rightArrow} width={'12'} height={'12'} className={styles['list-player__btns-icon']} onClick={() => setShowFeetHistory(true)}/>}
          Список игроков
        </Button>
        <Button
          type='filled'
          fillColor={sortingListPlayers === 'rate' ? '#E9ECFF' : '#D6DBF5'}
          textColor='#000'
          p={12}
          onClick={handleSorting}
        // disabled={!actions.auction && isActionCard}
        // onClick={handleAuction} type='outline'>Отказ {<AutoCounter disabled={isActionCard} counter={30} callback={handleAuction} 
        >
          По капиталу
        </Button>
      </div>
      <Offset mb={22} />
      <ul className={styles['list-player__container-wrapper']}>
        {
          isOpenListPlayers && !!players.length &&
          players.map((p: IPlayer, index: number) => {
            return (
              <li key={index} className={styles["list-player__item"]}>
                <CardPlayersPreview
                  isOpenModal={isOpenModal}
                  isMove={p.current_move}
                  num={index + 1}
                  id={p.id}
                  name={p.username}
                  color={p.color}
                  isQG={true}
                  avatar={p?.avatar}
                  isOwner={dataPlayerQG.id === p.id}
                  capital={p.bill_data.capital}
                  balance={p.bill_data.balance}
                  property={p.bill_data.property}
                  isGrayBlur={
                    !!listSelectUserPreview.length &&
                    !listSelectUserPreview.includes(p.id)
                  }
                  isSelected={listSelectUserPreview.includes(p.id)}
                  handleClickUserPreview={handleClickUserPreview}
                  handleSettingCard={handleSettingCard}
                />
              </li>
            );
          })
        }
        <Offset mb={20} />
      </ul>
      {!isMobile && <div className={styles['list-player__btns-container--full']}>
        <Button
          type='filled'
          fillColor='#fff'
          borderColor={'#898989'}
          textColor='#000000'
          p={7}
          onClick={() => handleClickOpen()}

        >
          {isOpenListPlayers ? 'Свернуть' : 'Развернуть'}
        </Button>
      </div>}
    </div>
  )
}

export default FieldListPlayersQG