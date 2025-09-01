import { RightArrowIcon } from '../../../../assets';
import CollapsibleCard from '../../../../shared/UI/collapsible-card/collapsible-card';
import { IMassagesFeed, IPlayer } from '../../../../store/quick-game/quick-game.d';
import { Event } from '../../UI/event/event';
import cls from './events-history-list.module.css';
interface IEventHistoryList {
  messages: IMassagesFeed[];
  isOpen: boolean;
  handleClick: (action: "up" | "down") => void;
  handleClickOpen: () => void;
  heightGameBoard: number;
  players: IPlayer[];
}
export const EventsHistoryList: React.FC<IEventHistoryList> = ({
  isOpen,
  messages,
  handleClick,
  players,
  heightGameBoard,
  handleClickOpen,
}: IEventHistoryList) => {
  return (
    <div
      className={cls.side}
      style={{
        height: !isOpen ? 200 : heightGameBoard,
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
      >
        <div className={cls.allEvents} id={"container-list-history"}>
          {!!messages?.length &&
            messages
              .sort((a, b) => b.id - a.id)
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
                  <p>{m.message}</p>
                </Event>
              ))}
        </div>
      </CollapsibleCard>
    </div>
  );
};
