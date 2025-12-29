import classNames from 'classnames'
import React from 'react'
import { park } from '../../../../assets'
import cls from '../../styles/game-board.module.scss';
import PlayerSticker from '../PlayerSticker/PlayerSticker';
import { IPlayer } from '../../../../store/quick-game/quick-game.type';


interface IParkingProps {
    image_card?: string;
    name?: string;
    headerBgc?: string;
    players: IPlayer[];
    isGrayBlur?: boolean;
}


const Parking: React.FC<IParkingProps> = ({ 
    name,
    players,
    headerBgc,
    isGrayBlur = false,
    image_card,
}: IParkingProps) => {
    return (
        <div
            className={
                classNames({
                    [cls['field']]: true,
                    [cls['leftTop']]: true,
                })
            } 
            style={{
                filter: isGrayBlur? 'blur(3px) grayscale(100%)' : ''
            }}	
            >
            <div className={`${cls.cornerGradient}`}>
                <div
                    style={{
                        background: headerBgc
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