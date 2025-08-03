import classNames from 'classnames'
import React from 'react'
import { park, police } from '../../../../assets'
import cls from '../../styles/game-board.module.scss';
import PlayerSticker from '../PlayerSticker/PlayerSticker';
import { IPlayer } from '../../../../store/quick-game/quick-game.d';


interface IPoliceProps {
    image_card?: string;
    name?: string;
    headerBgc?: string;
    players: IPlayer[];
    isGrayBlur?: boolean;
}


const Police: React.FC<IPoliceProps> = ({ 
    name,
    players,
    headerBgc,
    isGrayBlur = false,
    image_card,
}: IPoliceProps) => {
    return (
        <div className={
            classNames({
                [cls['field']]: true,
                [cls['rightTop']]: true,
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