import { GameBoard } from '../../../models/GameBoard/GameBoard';
import { Offset } from '../../../shared/UI';
import BlockWrapper from '../../../shared/UI/Block/BlockWrapper';
import { ICard, IPlayer, ISpecialCard } from '../../../store/quick-game/quick-game.type';
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
  handleGetOrRemoveHouse: (id: number) => void;
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
  handleGetOrRemoveHouse,
  isChanceGetOrRemoveHouse,
}: IQG) => {
  return (
    <section>
      <BlockWrapper>
        <div className={cls["quick-game__container"]}>
          <FieldListPlayersQGContainer
            heightGameBoard={heightGameBoard}
            players={players}
            dataPlayerQG={dataPlayerQG}
            listSelectUserPreview={listSelectUserPreview}
            handleClickUserPreview={handleClickUserPreview}
            isChangeCard={isChangeCard}
          />
          <div style={{ gridArea: 'main', padding: '0 15px'}}>
            <GameBoard
              innerRef={innerRef}
              ActionCard={ActionCard}
              listSelectUserPreview={listSelectUserPreview}
              dataPlayerQG={dataPlayerQG}
              playerCurrentMove={playerCurrentMove}
              isChanceGetOrRemoveHouse={isChanceGetOrRemoveHouse}
              handleCard={handleCard}
              handleGetOrRemoveHouse={handleGetOrRemoveHouse}
            />
          </div>
          <EventsHistoryListContainer heightGameBoard={heightGameBoard} />
        </div>
        <Offset mb={160} />
      </BlockWrapper>
    </section>
  );
};
