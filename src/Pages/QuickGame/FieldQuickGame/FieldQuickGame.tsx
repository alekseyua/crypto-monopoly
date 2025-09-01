import { GameBoard } from '../../../models/GameBoard/GameBoard';
import { IMessageQG } from '../../../store/message/message';
import { ICard, IMassagesFeed, IPlayer, ISpecialCard } from '../../../store/quick-game/quick-game.d';
import EventsHistoryListContainer from '../../MainGame/component/events-history-list/EventsHistoryListContainer';
import FieldListPlayersQGContainer from '../../MainGame/component/FieldListPlayersQuickGame/FieldListPlayersQuickGameContainer';


import cls from '../styles/quick-game.module.scss';

interface IQG {
  innerRef: React.RefObject<HTMLDivElement | null>;
  cards: (ICard | ISpecialCard)[];
  dataPlayerQG: IPlayer;
  playerCurrentMove: IPlayer;
  ActionCard: React.ReactNode;
  handleCard: (id: number) => void;
  players: IPlayer[];
  listSelectUserPreview: number[];
  handleClickUserPreview: (id: number) => void;
  heightGameBoard: number;
  isChangeCard: boolean;
  isChanceGetOrRemoveHouse: boolean;
}

export const FieldQG: React.FC<IQG> = ({
  cards,
  players,
  innerRef,
  ActionCard,
  handleCard,
  isChangeCard,
  dataPlayerQG,
  heightGameBoard,
  playerCurrentMove,
  listSelectUserPreview,
  handleClickUserPreview,
  isChanceGetOrRemoveHouse,
}: IQG) => {
  return (
    <section className={cls.MainGameSection}>
      <div className="wrapper">
        <div className={cls["quick-game__container"]}>
          <FieldListPlayersQGContainer
            heightGameBoard={heightGameBoard}
            players={players}
            dataPlayerQG={dataPlayerQG}
            listSelectUserPreview={listSelectUserPreview}
            handleClickUserPreview={handleClickUserPreview}
            isChangeCard={isChangeCard}
          />
          <div>
            <GameBoard
              innerRef={innerRef}
              ActionCard={ActionCard}
              listSelectUserPreview={listSelectUserPreview}
              dataPlayerQG={dataPlayerQG}
              playerCurrentMove={playerCurrentMove}
              isChanceGetOrRemoveHouse={isChanceGetOrRemoveHouse}
              handleCard={handleCard}
            />
          </div>
          <EventsHistoryListContainer heightGameBoard={heightGameBoard} />
        </div>
      </div>
    </section>
  );
};
