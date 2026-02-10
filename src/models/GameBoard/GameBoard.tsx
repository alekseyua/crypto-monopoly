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
  handleGetOrRemoveHouse: (id: number) => void;
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
  handleGetOrRemoveHouse,
  isChanceGetOrRemoveHouse,
}) => {
  // isChanceGetOrRemoveHouse = true
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
                const canBuildHouse = (card as ICard).owner?.player?.can_build;
                const playerCurrentMoveOnField: IPlayer = (card as ICard).players.filter((p: IPlayer) => p.current_move)[0];
                const isActiveCardActionGetOrRemoveHouse = (isChanceGetOrRemoveHouse && canBuildHouse?.status && !!Object.keys((card as ICard).owner).length 
                // &&
                //           (card as ICard).owner.player.id === dataPlayerQG.id
                )
                const isHasOwnerCard = !!Object.keys((card as ICard).owner).length;
                const isGrayBlur = !!listSelectUserPreview.length 
                                      ? (isHasOwnerCard &&
                                        listSelectUserPreview.includes((card as ICard).owner?.player?.id))
                                      : isChanceGetOrRemoveHouse && canBuildHouse?.status
                                          ? isHasOwnerCard && (card as ICard).owner?.player.id === playerCurrentMove.id
                                          : false;
                          // console.log({isActiveCardAction,listSelectUserPreview}, (card as ICard).owner?.player?.id)
                if ((card as ICard).card_number === 11) {
                  return (
                    <div key="jail" className={cls['card__container--jail']}>
                      <Jail
                        isGrayBlur={isChanceGetOrRemoveHouse || !!listSelectUserPreview.length}
                        key={(card as ICard).card_number}
                        image_card={(card as ICard).image}
                        name={(card as ICard).name}
                        headerBgc={(card as ICard).bgc_header}
                        players={(card as ICard).players}
                        isActiveCardAction={isActiveCardActionGetOrRemoveHouse}
                      />
                    </div>
                  );
                }
                if ((card as ICard).card_number === 21) {
                  return (
                    <div key="parking" className={cls['card__container--parking']}>
                      <Parking
                        isGrayBlur={isChanceGetOrRemoveHouse || !!listSelectUserPreview.length}
                        key={(card as ICard).card_number}
                        image_card={(card as ICard).image}
                        name={(card as ICard).name}
                        headerBgc={(card as ICard).bgc_header}
                        players={(card as ICard).players}
                        isActiveCardAction={isActiveCardActionGetOrRemoveHouse}
                      />
                    </div>
                  );
                }

                if ((card as ICard).card_number === 31) {
                  return (
                    <div key="police" className={cls['card__container--police']}>
                      <Police
                        isGrayBlur={isChanceGetOrRemoveHouse || !!listSelectUserPreview.length}
                        key={(card as ICard).card_number}
                        image_card={(card as ICard).image}
                        name={(card as ICard).name}
                        headerBgc={(card as ICard).bgc_header}
                        players={(card as ICard).players}
                        isActiveCardAction={isActiveCardActionGetOrRemoveHouse}
                      />
                    </div>
                  );
                }

                if ((card as ICard).card_number === 1) {
                  return (
                    <div key="circle" className={cls['card__container--circle']}>
                    <Circle
                      isGrayBlur={isChanceGetOrRemoveHouse || !!listSelectUserPreview.length}
                      key={(card as ICard).card_number}
                      image_card={(card as ICard).image}
                      name={(card as ICard).name}
                      headerBgc={(card as ICard).bgc_header}
                      players={(card as ICard).players}
                      cardCost={(card as ICard).cost}
                      isActiveCardAction={isActiveCardActionGetOrRemoveHouse}
                    />
                    </div>
                  );
                }


                return (
                  <div
                    key={(card as ICard).card_number}
                    className={cls['card__container']}
                    data-pos={(card as ICard).card_number}
                  >
                    <GameField
                      key={(card as ICard).card_number}
                      id={(card as ICard).id}
                      players={(card as ICard).players}
                      className={`${"card-field__container--" + (card as ICard).card_number}`}
                      image_card={(card as ICard).image}
                      cardCost={(card as ICard).cost}
                      houses={(card as ICard).houses}
                      hotels={(card as ICard).hotels}
                      isPawn={(card as ICard).is_pawn}
                      type={(card as ICard).type_card}
                      handleCard={handleCard}
                      handleGetOrRemoveHouse={handleGetOrRemoveHouse}
                      playerCurrentMove={playerCurrentMove}
                      playerCurrentMoveOnField={playerCurrentMoveOnField}
                      direction={
                        (card as ICard).card_number >= 2 && (card as ICard).card_number <= 10
                          ? "bottom"
                          : (card as ICard).card_number >= 12 && (card as ICard).card_number <= 20
                            ? "left"
                            : (card as ICard).card_number >= 22 && (card as ICard).card_number <= 30
                              ? "top"
                              : "right"
                      }
                      headerBgc={(card as ICard).bgc_header}
                      name={(card as ICard).name}
                      owner={(card as ICard).owner}
                      onField={!!playerCurrentMoveOnField}
                      isGrayBlur={(isChanceGetOrRemoveHouse || !!listSelectUserPreview.length) && !isGrayBlur}
                      isActiveCardActionGetOrRemoveHouse={isActiveCardActionGetOrRemoveHouse}
                      can_build={canBuildHouse}
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
