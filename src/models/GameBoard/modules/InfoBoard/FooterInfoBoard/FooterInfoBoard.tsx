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
    style?: React.CSSProperties;
}
const FooterInfoBoard:React.FC<IProps> = ({
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
      {/* <div
        className={styles["gib-footer__desc-container"]}
        data-tooltip-id="footer-balance-capital"
        // data-tooltip-content={` Баланс: ${balance}  Капитал: ${capital}`}
      >
        <div className={styles["gib-footer__desc-item"]}>
          Б: {balance}
          <Icon src={icons.qgCurrencySvg} width={12} height={12} />
        </div>
        <div className={styles["gib-footer__desc-item"]}>
          К: {capital}
          <Icon src={icons.qgCurrencySvg} width={12} height={12} />
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
            <Icon src={icons.qgCurrencySvg} width={12} height={12} />
          </div>
          <div className={"tool-tip__balance"}>
            Капитал: {capital}
            <Icon src={icons.qgCurrencySvg} width={12} height={12} />
          </div>
        </Tooltip>
      </div> */}
      <div></div>
      <div className={styles["gib-footer__btns-container"]}>
        <Button
          className={styles["gib-footer__btns-btn--position"]}
          type="fill"
          p={[6]}
          style={{
            backgroundColor: bgcBtn ? bgcBtn : "#D6DBF5",
            justifyContent: 'flex-start',
          }}
          iconRight={<Icon src={icons.rightArrow} width={15} height={10} />}
          onClick={handleClickRate}
        >
          Ваше место в игре: {currentPosition}
        </Button>
      </div>
    </div>
  );
}

export default FooterInfoBoard