import classNames from 'classnames'
import React from 'react'
import cls from '../../styles/game-board.module.scss';
import { Button } from '../../../../shared/UI';
import PlayerSticker from '../PlayerSticker/PlayerSticker';
import { IPlayer } from '../../../../store/quick-game/quick-game.d';
import Icon from '../../../../shared/UI/Icon/Icon';
import { icons } from '../../../../assets';


interface ICircleProps {
    image_card?: string;
    name?: string;
    headerBgc?: string;
    players: IPlayer[];
    cardCost: string;
    isGrayBlur?: boolean; // This prop is not used in the component
}


const Circle: React.FC<ICircleProps> = ({ 
    image_card,
    name,
    headerBgc,
    players,
    cardCost,
    isGrayBlur = false, // This prop is not used in the component
}: ICircleProps) => {
    return (
      <div
        className={classNames({
          [cls["field"]]: true,
          [cls["rightBottom"]]: true,
          [cls["field__circle"]]: true,
        })}
        style={{
          filter: isGrayBlur ? "blur(3px) grayscale(100%)" : "",
        }}
      >
        <div className={`${cls.cornerGradient}`}>
          <div
            style={{
              background: headerBgc,
            }}
            className={classNames({
              [cls["corner"]]: true,
              [cls["rightBottom"]]: true,
            })}
          />
        </div>
        <div className={cls["field__round-container"]}>
          <Button
            className={cls["field__btn-round"]}
            variant="gradient"
            onClick={() => {}}
          >
            {name}
          </Button>
          <strong className={cls["field__btn-round-title"]}>
            + {cardCost}{" "}
            <Icon
              src={icons.qgCurrencySvg}
              width="14"
              height="14"
              ml={2}
              down={2}
              display="inline-block"
            />
          </strong>
          {/* <p className={cls['field__btn-round-title']}>(еще 5 ходов)</p> */}
        </div>
        {players && players?.length > 0 && (
          <PlayerSticker direction="left-sticker" players={players} />
        )}
      </div>
    );
}

export default Circle