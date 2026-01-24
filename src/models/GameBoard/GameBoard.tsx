import type { ICard, IDataQG, IPlayer, ISpecialCard } from '../../store/quick-game/quick-game.type';
import cls from './styles/game-board.module.scss';
import Parking from './modules/Parking/Parking';
import Police from './modules/Police/Police';
import Jail from './modules/Jail/Jail';
import { GameInfoBoardCorners } from './UI/GameInfoBoardCorners/GameInfoBoardCorners';
import Circle from './modules/Circle/Circle';
import { GameField } from './modules/GameField/GameField';
import { useStoreon } from 'storeon/react';
import { useWindowWidth } from '../../hooks/useWindowWidth';
import BlockSheet from '../../shared/UI/Block/BlockSheet';
import { useZoomPan } from '../../hooks/useZoomPan';
import { useEffect, useRef, useState } from 'react';
import Empty from './modules/InfoBoard/InfoBoard/Empty/Empty';
import Title from '../../shared/UI/Title/Title';

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
  const [containerSize, setContainerSize] = useState({ w: 0, h: 0 });
  const {isMobile, width} = useWindowWidth();
  const containerRef = useRef<HTMLDivElement>(null);
  const contentWidth = width;
  const contentHeight = 400;

  useEffect(() => {
    if (containerRef.current) {
      const { clientWidth, clientHeight } = containerRef.current;
      setContainerSize({ w: clientWidth, h: clientHeight });
    }
  }, []);

  const { scale, position, dragging, eventHandlers } = useZoomPan({
    minScale: 1,
    maxScale: 2,
    contentWidth,
    contentHeight,
    containerWidth: containerSize.w,
    containerHeight: containerSize.h,
    bounceSpeed: 0.15,
  });
  if (!dataPlayerQG) return;
  const cards: (ICard | ISpecialCard)[] = quickGame.cards;
  return (
    <>
      <div
        ref={containerRef}
        style={{
          touchAction: "none",
          cursor: scale > 1 ? (dragging ? "grabbing" : "grab") : "default",
        }}
        {...eventHandlers}
      >
        <div
          style={{
            transform: `translate(${position.x}px, ${position.y}px) scale(${scale})`,
            transformOrigin: "center center",
            transition: dragging ? "none" : "transform 0.1s ease-out",
            // padding: '23px',
          }}
        >
          <div ref={innerRef} className={cls["game-board"]}>
            <div className={cls["game-board__info"]} style={{gridArea: "info"}}>
              <GameInfoBoardCorners isGrayBlur={isChanceGetOrRemoveHouse || !!listSelectUserPreview.length} />
            </div>
            {!isMobile && <div className={cls["game-board__info"]} style={{gridArea: "info", zIndex: 2}}>
              {ActionCard && ActionCard}
              {!ActionCard && <Title
                title={'Жди...'}
                tag='h3'
                center
              />}
            </div>}
            {isMobile && 
            <div className={cls["game-board__info"]}>
              <Empty />
            </div>}

              {cards?.map((card: ICard | ISpecialCard) => {
                if (!card) return null;
                const playerCurrentMoveOnField: IPlayer = card.players.filter((p: IPlayer) => p.current_move)[0];
                if (card.card_number === 11) {
                  return (
                    <div key="jail" className={cls['card__container--jail']}>
                      <Jail
                        isGrayBlur={isChanceGetOrRemoveHouse || !!listSelectUserPreview.length}
                        key={card.card_number}
                        image_card={card.image}
                        name={card.name}
                        headerBgc={card.bgc_header}
                        players={card.players}
                      />
                    </div>
                  );
                }
                if (card.card_number === 21) {
                  return (
                    <div key="parking" className={cls['card__container--parking']}>
                      <Parking
                        isGrayBlur={isChanceGetOrRemoveHouse || !!listSelectUserPreview.length}
                        key={card.card_number}
                        image_card={card.image}
                        name={card.name}
                        headerBgc={card.bgc_header}
                        players={card.players}
                      />
                    </div>
                  );
                }

                if (card.card_number === 31) {
                  return (
                    <div key="police" className={cls['card__container--police']}>
                      <Police
                        isGrayBlur={isChanceGetOrRemoveHouse || !!listSelectUserPreview.length}
                        key={card.card_number}
                        image_card={card.image}
                        name={card.name}
                        headerBgc={card.bgc_header}
                        players={card.players}
                      />
                    </div>
                  );
                }

                if (card.card_number === 1) {
                  return (
                    <div key="circle" className={cls['card__container--circle']}>
                    <Circle
                      isGrayBlur={isChanceGetOrRemoveHouse || !!listSelectUserPreview.length}
                      key={card.card_number}
                      image_card={card.image}
                      name={card.name}
                      headerBgc={card.bgc_header}
                      players={card.players}
                      cardCost={card.cost}
                    />
                    </div>
                  );
                }

                return (
                  <div
                    key={card.card_number}
                    className={cls['card__container']}
                    data-pos={card.card_number}
                  >
                    <GameField
                      key={card.card_number}
                      id={card.id}
                      players={card.players}
                      className={`${"card-field__container--" + card.card_number}`}
                      image_card={card.image}
                      cardCost={card.cost}
                      houses={(card as ICard).houses}
                      hotels={(card as ICard).hotels}
                      isPawn={(card as ICard).is_pawn}
                      type={card.type_card}
                      handleCard={handleCard}
                      playerCurrentMove={playerCurrentMove}
                      playerCurrentMoveOnField={playerCurrentMoveOnField}
                      direction={
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
                      onField={!!playerCurrentMoveOnField}
                      isGrayBlur={
                        (isChanceGetOrRemoveHouse && !!Object.keys(card.owner).length &&
                          card.owner.player.id !== dataPlayerQG.id) ||
                        (!!listSelectUserPreview.length && !!Object.keys(card.owner).length &&
                          !listSelectUserPreview.includes(card.owner.player.id))
                      }
                      activeCardForSelect={
                        (isChanceGetOrRemoveHouse && !!Object.keys(card.owner).length &&
                          card.owner.player.id !== dataPlayerQG.id) ||
                        (!!listSelectUserPreview.length && !!Object.keys(card.owner).length &&
                          listSelectUserPreview.includes(card.owner.player.id))
                      }
                    />
                  </div>
                );

              })}


          </div>
        </div>


      </div>
      {isMobile && <div className={cls['game-board__info--mobile']}>
        {ActionCard && <BlockSheet>
          {ActionCard}
        </BlockSheet>}
      </div>}
    </>
  );
};
