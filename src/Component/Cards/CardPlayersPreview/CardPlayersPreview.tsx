import React from 'react';
import styles from './styles/CardPlayersPreview.module.scss';
import Icon from '../../../shared/UI/Icon/Icon';
import { icons } from '../../../assets';
import AvatarBlock from '../../../shared/UI/AvatarBlock/AvatarBlock';
import ModalContainer from '../../Modal/ModalContainer';
import Title from '../../../shared/UI/Title/Title';
import { rgbToRgba } from '../../../helpers/helper';
import { Tooltip } from 'react-tooltip';
interface IPropsCardPlayersPreview {
  num: number;
  name: string;
  avatar: string | undefined;
  capital: number;
  balance: number;
  property: number;
  id: number;
  isQG: boolean;
  color: string;
  isOwner?: boolean;
  isSelected?: boolean;
  isGrayBlur?: boolean;
  isOpenModal?: string;
  isMove: boolean;
  isClickOnCard?: boolean;
  handleSettingCard?: (status: string) => void;
  handleClickUserPreview: (id: number) => void;
}
const CardPlayersPreview: React.FC<IPropsCardPlayersPreview> = ({
  id,
  num,
  isQG,
  name,
  color,
  avatar,
  capital,
  balance,
  property,
  isClickOnCard,
  isMove,
  isSelected = false,
  isGrayBlur = false,
  isOwner = false,
  isOpenModal,
  handleSettingCard,
  handleClickUserPreview,
}: IPropsCardPlayersPreview) => {
  return (
    <div
      className={styles["card-players-preview__container"]}
      style={{
        filter: isGrayBlur ? "blur(3px)" : "",
      }}
      onClick={() =>
        isClickOnCard && handleClickUserPreview && handleClickUserPreview(+id)
      }
    >
      <ModalContainer
        isShow={!isClickOnCard && !!(isOpenModal && +isOpenModal === +id)}
        addClass={styles["card-players-preview__modal-wrap"]}
      >
        <div className={styles["card-players-preview__modal-container"]}>
          <div
            className={styles["card-players-preview__modal-desc"]}
            onClick={() => {
              if (!(isOwner || isGrayBlur) && !isSelected) {
                handleClickUserPreview(id);
                handleSettingCard && handleSettingCard("");
              }
            }}
          >
            <Title
              tag="h6"
              title={"Предложить сделку"}
              style={{
                color: !isSelected ? "#726CED" : "#000000",
              }}
            />
            <Icon
              src={!isSelected ? icons.documentBlue : icons.documentBlack}
              width="15px"
              height="15px"
            />
          </div>
          <div
            className={styles["card-players-preview__modal-desc"]}
            onClick={() => {
              // (isOwner || isGrayBlur) &&
              if (isSelected) {
                handleClickUserPreview(id);
                handleSettingCard && handleSettingCard("");
              }
            }}
          >
            <Title
              tag="h6"
              title={"Игнорировать сделки"}
              style={{
                color: isSelected ? "#FF3A3A" : "#000000",
              }}
            />
            <Icon
              src={isSelected ? icons.eyeRed : icons.eyeBlack}
              width="15px"
              height="15px"
            />
          </div>
        </div>
      </ModalContainer>
      <div
        className={styles["card-players-preview__header"]}
        style={{
          backgroundColor: isGrayBlur
            ? ""
            : isSelected
            ? "rgba(233, 236, 255, 0.7)"
            : color,
        }}
      >
        <span
          className={styles["card-players-preview__num"]}
          style={{
            color: isGrayBlur
              ? ""
              : isSelected
              ? "rgba(0, 0, 0, 1)"
              : "rgba(255, 255, 255, 1)",
          }}
        >
          {num}
        </span>

        <AvatarBlock
          color={color}
          avatar={avatar}
          isGrayBlur={isGrayBlur}
          width={65}
          height={65}
          left={25}
        />
      </div>
      {/* body */}
      <div
        className={
          styles[
            isMove
              ? "card-players-preview__body--move"
              : "card-players-preview__body"
          ]
        }
        style={{
          background: isSelected
            ? color
            : isMove
            ? `linear-gradient(to right, ${rgbToRgba(
                color,
                0.1
              )} 10%, rgba(233, 236, 255, 0.2) 20%)`
            : "rgba(233, 236, 255, 0.2)",
        }}
        // style={{
        //     background: `linear-gradient(to right, ${adjustColorBrightness(color, 50)} 10%, rgba(233, 236, 255, 0.2) 20%)`
        // }}
      >
        <div className={styles["card-players-preview__desc-container"]}>
          <div className={styles["card-players-preview__name"]}>{name}</div>
          <div
            className={
              styles["card-players-preview__container-balance-capital"]
            }
            data-tooltip-id="preview-balance-capital"
          >
            <div className={styles["card-players-preview__balance-capital"]}>
              <div>
                <span>Б: </span>
                <span>{balance} </span>
              </div>
              <Icon
                width="12px"
                height="12px"
                down={1}
                src={icons.qgCurrencySvg}
              />
            </div>
            <div className={styles["card-players-preview__balance-capital"]}>
              <div>
                <span>И: </span>
                <span>{property} </span>
              </div>
              <Icon
                width="12px"
                height="12px"
                down={1}
                src={icons.qgCurrencySvg}
              />
            </div>
            <div className={styles["card-players-preview__balance-capital"]}>
              <div>
                <span>К: </span>
                <span>{capital} </span>
              </div>
              <Icon
                width="12px"
                height="12px"
                down={1}
                src={icons.qgCurrencySvg}
              />
              {/* <img src={currency2White} alt="currency" width={10} height={10}/> */}
            </div>

            <Tooltip
              id="preview-balance-capital"
              style={{
                backgroundColor: "rgba(201, 202, 207, 0.93)",
                color: "#000",
                transform: "translateX(-50px)",
                borderRadius: 12,
                zIndex: 9999,
              }}
            >
              <div className={"tool-tip__balance"}>
                Баланс: {balance}
                <Icon src={icons.qgCurrencySvg} width="12px" height="12px" />
              </div>
              <div className={"tool-tip__balance"}>
                Имущество: {property}
                <Icon src={icons.qgCurrencySvg} width="12px" height="12px" />
              </div>
              <div className={"tool-tip__balance"}>
                Капитал: {capital}
                <Icon src={icons.qgCurrencySvg} width="12px" height="12px" />
              </div>
            </Tooltip>
          </div>
        </div>
        {!isClickOnCard && (
          <div
            className={styles["card-players-preview__settings-or-exit"]}
            onClick={() =>
              handleSettingCard && handleSettingCard(isOwner ? "exit" : id + "")
            }
          >
            <Icon
              src={
                isOwner
                  ? isSelected
                    ? ""
                    : icons.exitIcon
                  : isSelected
                  ? icons.crossBlack
                  : icons.actions
              }
              width={"40px"}
            />
          </div>
        )}
      </div>
      {/* footer */}
    </div>
  );
};

export default CardPlayersPreview