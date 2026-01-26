import classNames from 'classnames'
import React from 'react'
import { police } from '../../../../assets'
import cls from '../../styles/game-board.module.scss';
import PlayerSticker from '../PlayerSticker/PlayerSticker';
import { IPlayer } from '../../../../store/quick-game/quick-game.type';
import { Tooltip } from 'react-tooltip';


interface IPoliceProps {
    image_card?: string;
    name?: string;
    headerBgc?: string;
    players: IPlayer[];
  isActiveCardAction: boolean;
    isGrayBlur?: boolean;
}


const Police: React.FC<IPoliceProps> = ({
    name,
    players,
    headerBgc,
    isGrayBlur = false,
    isActiveCardAction,
}: IPoliceProps) => {
    return (
        <div className={
            classNames({
                [cls['field']]: true,
            })
        }
            data-tooltip-id={'noSelectPolice'}
            style={{
                filter: isGrayBlur ? 'blur(3px) grayscale(100%)' : ''
            }}
        >
           {isActiveCardAction && <Tooltip
                id={"noSelectPolice"}
                place='bottom'
                style={{
                    backgroundColor: "#D6DBF5",
                    color: "#000",
                    maxWidth: 200,
                    zIndex: 999999,
                    borderRadius: 12,
                }}
            >
                <div> Не подходящая карта </div>
            </Tooltip>}
            <div className={`${cls.cornerGradient}`}>
                <div
                    style={{
                        background: headerBgc
                    }}
                    className={
                        classNames({
                            [cls['corner']]: true,
                            [cls['rightTop']]: true,
                        })
                    }
                />
            </div>
            <div className={cls.police}>
                <img src={
                    // image_card ??
                    police

                } alt='' />
                <p className={cls['field__btn-round-title']}>{name}</p>
            </div>
            {
                players &&
                players?.length > 0 &&
                <PlayerSticker
                    direction='bottom-sticker'
                    players={players}
                />
            }
        </div>
    )
}

export default Police