import React from 'react'
import styles from './styles/gib-footer.module.scss';
import Icon from '../../../../../shared/UI/Icon/Icon';
import { Button } from '../../../../../shared/UI';
import { icons } from '../../../../../assets';
import { Tooltip } from "react-tooltip";


interface IProps{
    capital: number;
    balance: number;
    currentPosition: number;
    handleClickRate:()=> void;
    bgc?: string;
    bgcBtn?: string;
    style?: React.CSSProperties;
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
    <div
      className={styles["gib-footer__container"]}
      style={{
        background: bgc ? bgc : "#E9ECFF",
        ...style,
      }}
    >
      <div
        className={styles["gib-footer__desc-container"]}
        data-tooltip-id="footer-balance-capital"
        // data-tooltip-content={` Баланс: ${balance}  Капитал: ${capital}`}
      >
        <div className={styles["gib-footer__desc-item"]}>
          Б: {balance}
          <Icon src={icons.qgCurrencySvg} width="12px" height="12px" />
        </div>
        <div className={styles["gib-footer__desc-item"]}>
          К: {capital}
          <Icon src={icons.qgCurrencySvg} width="12px" height="12px" />
        </div>
        <Tooltip
          id="footer-balance-capital"
          style={{
            backgroundColor: "#F6F8FF99",
            color: "#000",
            transform: "translateX(-50px)",
            borderRadius: 12,
          }}
        >
          <div className={"tool-tip__balance"}>
            Баланс: {balance}
            <Icon src={icons.qgCurrencySvg} width="12px" height="12px" />
          </div>
          <div className={"tool-tip__balance"}>
            Капитал: {capital}
            <Icon src={icons.qgCurrencySvg} width="12px" height="12px" />
          </div>
        </Tooltip>
      </div>
      <div className={styles["gib-footer__btns-container"]}>
        <Button
          className={styles["gib-footer__btns-btn--position"]}
          type="fill"
          p={10}
          style={{
            backgroundColor: bgcBtn ? bgcBtn : "#D6DBF5",
          }}
          iconRight={<Icon src={icons.rightArrow} width="15px" height="10px" />}
          onClick={handleClickRate}
        >
          Ваше место в игре: {currentPosition}
        </Button>
      </div>
    </div>
  );
}

export default GameInfoBoardFooter