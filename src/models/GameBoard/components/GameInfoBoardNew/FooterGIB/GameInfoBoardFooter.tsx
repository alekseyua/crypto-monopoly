import React from 'react'
import styles from './styles/gib-footer.module.scss';
import Icon from '../../../../../shared/UI/Icon/Icon';
import { Button } from '../../../../../shared/UI';
import { icons } from '../../../../../assets';


interface IProps{
    capital: number;
    balance: number;
    currentPosition: number;
    handleClickRate:()=> void;
    bgc?: string;
    bgcBtn?: string;
}
const GameInfoBoardFooter:React.FC<IProps> = ({
    balance,
    capital,
    bgc,
    bgcBtn,
    currentPosition,
    handleClickRate,
}) => {
  return (
   <div className={styles['gib-footer__container']}
    style={{
			background: bgc? bgc : '#E9ECFF',
    }}
   >
        <div className={styles['gib-footer__desc-container']}> 
            <div className={styles['gib-footer__desc-item']}>
                Баланс: {balance}
                <Icon src={icons.qgCurrencySvg} width='12px' height='12px' />
            </div>
            <div className={styles['gib-footer__desc-item']}>
                Капитал: {capital}
                <Icon src={icons.qgCurrencySvg} width='12px' height='12px' />
            </div>
        </div>
        <div className={styles['gib-footer__btns-container']}>
            <Button
                className={styles['gib-footer__btns-btn--position']}
                type='fill'
                p={5}
                style={{
                    backgroundColor: bgcBtn ? bgcBtn : '#D6DBF5'
                }}
                iconRight={<Icon src={icons.rightArrow} width='15px' height='10px' />}
                onClick={handleClickRate}
            >
                Ваше место в игре: {currentPosition} 

            </Button>
        </div>
    </div>
  )
}

export default GameInfoBoardFooter