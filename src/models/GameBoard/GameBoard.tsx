import type { ICard, IDataQG, IPlayer, ISpecialCard } from '../../store/quick-game/quick-game.d';
import cls from './styles/game-board.module.scss';
import { GameField } from './components/game-field/GameField';
import Parking from './components/Parking/Parking';
import Police from './components/Police/Police';
import Jail from './components/Jail/Jail';
import { GameInfoBoardCorners } from './UI/GameInfoBoardCorners/GameInfoBoardCorners';
import Circle from './components/Circle/Circle';
import { GameFieldNew } from './components/game-field/GameFieldNew';
import { useStoreon } from 'storeon/react';

interface IGameBoard {
  // cards: (ICard | ISpecialCard)[];
  dataPlayerQG: IPlayer;
  playerCurrentMove: IPlayer;
  ActionCard: React.ReactNode;
  handleCard: (id: number) => void;
  listSelectUserPreview: number[];
  innerRef: React.RefObject<HTMLDivElement | null>;
  isChanceGetOrRemoveHouse: boolean;
}
export const GameBoard: React.FC<IGameBoard> = ({
	handleCard,
	ActionCard,
	innerRef,
	dataPlayerQG,
	playerCurrentMove,
	listSelectUserPreview,
	isChanceGetOrRemoveHouse,
}) => {
  const {
    quickGame,
  }: {
    quickGame: IDataQG;
  } = useStoreon("quickGame");
  if (!dataPlayerQG) return;
  const cards: (ICard | ISpecialCard)[] = quickGame.cards;

  return (
    <div ref={innerRef} className={cls["game-board"]}>
      <div className={cls["game-board__info"]}>
        {ActionCard && ActionCard}
        <GameInfoBoardCorners isGrayBlur={isChanceGetOrRemoveHouse || !!listSelectUserPreview.length} />
      </div>

      {cards?.map((card: ICard | ISpecialCard, index: number) => {
        if (card.card_number === 21) {
          // {/* **************** Parcking **************** */ }
          return (
            <Parking
              isGrayBlur={isChanceGetOrRemoveHouse || !!listSelectUserPreview.length}
              key={card.card_number}
              image_card={card.image}
              name={card.name}
              headerBgc={card.bgc_header}
              players={card.players}
            />
          );
        }
        if (card.card_number === 31) {
          // {/* **************** police **************** */ }
          return (
            <Police
              isGrayBlur={isChanceGetOrRemoveHouse || !!listSelectUserPreview.length}
              key={card.card_number}
              image_card={card.image}
              name={card.name}
              headerBgc={card.bgc_header}
              players={card.players}
            />
          );
        }
        if (card.card_number === 11) {
          return (
            <Jail
              isGrayBlur={isChanceGetOrRemoveHouse || !!listSelectUserPreview.length}
              key={card.card_number}
              image_card={card.image}
              name={card.name}
              headerBgc={card.bgc_header}
              players={card.players}
            />
          );
        }
        if (card.card_number === 1) {
          return (
            <Circle
              isGrayBlur={isChanceGetOrRemoveHouse || !!listSelectUserPreview.length}
              key={card.card_number}
              image_card={card.image}
              name={card.name}
              headerBgc={card.bgc_header}
              players={card.players}
              cardCost={card.cost}
            />
          );
        }
        return (
          <GameFieldNew
            key={card.card_number}
            id={card.id}
            players={card.players}
            className={`${"card-field__container--" + card.card_number}`}
            image_card={card.image}
            cardCost={card.cost}
            type={card.type_card}
            handleCard={handleCard}
            playerCurrentMove={playerCurrentMove}
            direction={
              // 1 Circle
              // 11 jail
              // 20 parcing
              // 30 police
              card.card_number >= 2 && card.card_number <= 10
                ? "bottom"
                : card.card_number >= 12 && card.card_number <= 20
                ? "left"
                : card.card_number >= 22 && card.card_number <= 30
                ? "top"
                : "right"
            }
            headerBgc={card.bgc_header}
            name={card.name}
            owner={card.owner}
            onField={
              !!card.players.length &&
              card.players.map((p: IPlayer) => p.current_move)[0]
            }
            isGrayBlur={
              (isChanceGetOrRemoveHouse &&
                card.owner.player.id !== dataPlayerQG.id) ||
              (!!listSelectUserPreview.length &&
                !listSelectUserPreview.includes(card.owner.player.id))
            }
            activeCardForSelect={
              (isChanceGetOrRemoveHouse &&
                card.owner.player.id !== dataPlayerQG.id) ||
              (!!listSelectUserPreview.length &&
                listSelectUserPreview.includes(card.owner.player.id))
            }
            // isPawn={card.owner.player.id }
          />
        );
      })}
    </div>
  );
};
