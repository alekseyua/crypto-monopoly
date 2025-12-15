import classNames from 'classnames'
import React from 'react'
import cls from '../../styles/game-board.module.scss';
import { IPlayer } from '../../../../store/quick-game/quick-game.d';
import AvatarBlock from '../../../../shared/UI/AvatarBlock/AvatarBlock';
import { useWindowWidth } from '../../../../hooks/useWindowWidth';
import { getAdaptiveFromBase, getDefaultAvatarSize } from '../../../../helpers/helper';

interface IPlayerStickerProps {
    direction: string;
    className?: string;
    players: IPlayer[];
    reverse?: boolean;
    countRows?: number;
}

const PlayerSticker: React.FC<IPlayerStickerProps> = ({ 
    direction,
    className,
    reverse,
    players,
    countRows,
}: IPlayerStickerProps) => {
    const vw = useWindowWidth().width;
  
    return (
      <div
        className={classNames({
          [cls["players__container"]]: true,
          [cls["players__container--" + countRows]]: countRows,
          [cls["players__container--reverse"]]: reverse,
          [cls[`players__container--${direction}`]]: !!direction,
          [`${className}`]: !!className,
        })}
      >
        {players?.map((player: IPlayer, index: number) => (
          <div
            key={index}
            className={cls["players__sticker"]}
            style={{
              background: player.color,
              width: getAdaptiveFromBase(vw, 15),
              height: getAdaptiveFromBase(vw, 15),
            }}
          >
            <AvatarBlock avatar={player.avatar} color={player.color} width={15} height={15} resize/>
          </div>
        ))}
      </div>
    );
}

export default PlayerSticker