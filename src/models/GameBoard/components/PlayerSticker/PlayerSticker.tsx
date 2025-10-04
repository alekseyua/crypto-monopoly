import classNames from 'classnames'
import React from 'react'
import cls from '../../styles/game-board.module.scss';

interface IPlayerStickerProps {
    direction: string;
    className?: string;
    players: any// IPlayer[];
}

const PlayerSticker: React.FC<IPlayerStickerProps> = ({ 
    direction,
    className,
    players,
}: IPlayerStickerProps) => {
    return (
        <div className={
            classNames({
                [cls['players__container']]: true,
                [cls[`players__container--${direction}`]]: !!direction,
                [`${className}`]: !!className,
            })
        }
        >
            {
                players?.map((player: any, index: any) => (
                    <div key={index} className={cls['players__sticker']}
                        style={{
                            background: player.color
                        }}
                    ></div>
                ))
            }
        </div>
    )
}

export default PlayerSticker