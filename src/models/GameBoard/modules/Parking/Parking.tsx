import classNames from 'classnames'
import React from 'react'
import { park } from '../../../../assets'
import cls from '../../styles/game-board.module.scss';
import PlayerSticker from '../PlayerSticker/PlayerSticker';
import { IPlayer } from '../../../../store/quick-game/quick-game.type';
import { Tooltip } from 'react-tooltip';


interface IParkingProps {
    image_card?: string;
    name?: string;
    headerBgc?: string;
    players: IPlayer[];
  isActiveCardAction: boolean;
    isGrayBlur?: boolean;
}


const Parking: React.FC<IParkingProps> = ({
    name,
    players,
    isGrayBlur = false,isActiveCardAction
}: IParkingProps) => {
    return (
        <div
            className={
                classNames({
                    [cls['field']]: true,
                })
            }
            style={{
                filter: isGrayBlur ? 'blur(3px) grayscale(100%)' : ''
            }}
            data-tooltip-id={'noSelectParking'}
        >
            {isActiveCardAction && <Tooltip
                id={"noSelectParking"}
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
                        // background: headerBgc
                        background: 'linear-gradient(to bottom left, #99BF61 50%, #5B89D6 50%)'
                    }}
                    className={
                        classNames({
                            [cls['corner']]: true,
                            [cls['leftTop']]: true,
                        })
                    }
                />
            </div>
            <div className={cls.park}>
                <img src={
                    // image_card ??
                    park} alt='parking' />
                <p className={cls['field__btn-round-title']}>{name}</p>
            </div>
            {
                players &&
                players?.length > 0 &&
                <PlayerSticker
                    direction='right-sticker'
                    players={players}
                />
            }
        </div>
    )
}

export default Parking