import React, { CSSProperties } from 'react'
import styles from './styles/gib-footer.module.scss';
import { Button } from '../../../../shared/UI';
import Icon from '../../../../shared/UI/Icon/Icon';
import { icons, RightArrowIcon } from '../../../../assets';

interface IProps{
    capital: number;
    balance: number;
    currentPosition: number;
    handleClickRate:()=> void;
    bgc?: string;
    bgcBtn?: string;
    style?: CSSProperties;
}
const GameInfoBoardFooter:React.FC<IProps> = ({
    balance,
    capital,
    bgc,
    style,
    bgcBtn,
    currentPosition,
    handleClickRate,
}) => {
  return (
   <div className={styles['gib-footer__container']}
    style={{
			background: bgc? bgc : '#E9ECFF',
            ...style,
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
                style={{
                    backgroundColor: bgcBtn ? bgcBtn : '#D6DBF5'
                }}
                iconRight={<Icon src={RightArrowIcon} width='15px' height='10px' />}
                onClick={handleClickRate}
            >
                Ваше место в игре: {currentPosition} 

            </Button>
        </div>
    </div>
  )
}

export default GameInfoBoardFooter