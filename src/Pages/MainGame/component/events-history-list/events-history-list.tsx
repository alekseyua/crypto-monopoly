import { RightArrowIcon } from '../../../../assets';
import CollapsibleCard from '../../../../shared/UI/collapsible-card/collapsible-card';
import { IMassagesFeed, IPlayer } from '../../../../store/quick-game/quick-game.d';
import { Event } from '../../UI/event/event';
import cls from './events-history-list.module.scss';
interface IEventHistoryList {
  messages: IMassagesFeed[];
  isOpen: boolean;
  handleClick: (action: "up" | "down") => void;
  handleClickOpen: () => void;
  heightGameBoard: number;
  players: IPlayer[];
  setShowFeetHistory: (b: boolean)=>void;
  isMobile?: boolean;
}
export const EventsHistoryList: React.FC<IEventHistoryList> = ({
  isOpen,
  messages,
  handleClick,
  players,
  isMobile,
  heightGameBoard,
  handleClickOpen,
  setShowFeetHistory,
}: IEventHistoryList) => {
  return (
    <div
      className={isMobile? cls['side--mobile'] : cls.side}
      style={{
        height: !isOpen ? 160 : heightGameBoard,
        gridArea: 'history',
      }}
    >
      <CollapsibleCard
        btnClassname={cls.iconBtn}
        title={"История событий"}
        Icon1={RightArrowIcon}
        Icon2={RightArrowIcon}
        isOpen={isOpen}
        handleClickOpen={handleClickOpen}
        handleClick={handleClick}
        setShowFeetHistory={setShowFeetHistory}
        isMobile={isMobile}
      >
        <div className={cls.allEvents} id={"container-list-history"}>
          {!!messages?.length &&
            messages
              // .sort((a, b) => b.id - a.id)
              .map((m: IMassagesFeed, index: number) => (
                <Event
                  key={index}
                  btnColor={"#F9D15E80"}
                  date={new Date(m.date_create).toLocaleString("ru").toString()}
                  dateColor={"#D09337"}
                  fieldColor={m.player_color}
                  withButton={false}
                >
                  <h3>{m.player_name}</h3>
                  <span dangerouslySetInnerHTML={{ __html: m.message }} />
                </Event>
              ))}
        </div>
      </CollapsibleCard>
    </div>
  );
};
