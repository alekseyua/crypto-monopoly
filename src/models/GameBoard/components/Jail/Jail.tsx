import classNames from 'classnames'
import React from 'react'
import { jail } from '../../../../assets'
import cls from '../../styles/game-board.module.scss';
import { IPlayer } from '../../../../store/quick-game/quick-game.d';
import PlayerSticker from '../PlayerSticker/PlayerSticker';


interface IJailProps {
    image_card?: string;
    name?: string;
    headerBgc?: string;
    players: IPlayer[];
    isGrayBlur?: boolean;
}


const Jail: React.FC<IJailProps> = ({ 
    image_card,
    name,
    headerBgc,
    players,
    isGrayBlur = false,
}: IJailProps) => {
    return (
        <div className={
            classNames({
                [cls['field']]: true,
                [cls['leftBottom']]: true,
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
                            [cls['leftBottom']]: true,
                        })
                    }
                />
            </div>
            <img className={cls.jailImg} src={
                // image_card ??
                jail} alt='' />
            {/* <p>{name}</p> */}
            {
                players &&
                players?.length > 0 &&
                <PlayerSticker
                    direction='top-sticker'
                    players={players}
                />
            }
        </div>
    )
}

export default Jail