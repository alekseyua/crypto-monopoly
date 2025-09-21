import { currency2White, icons, RightArrowIcon } from '../../../../assets';
import { Button, Offset } from '../../../../shared/UI';
import Icon from '../../../../shared/UI/Icon/Icon';
import styles from './styles/gib.module.scss';
import React from 'react';
import { InfoBoardLabel } from './UI/Label/info-board-label';
import AutoCounter from '../../../../Component/AutoCounter/AutoCounter';
import { getPriceTaxesFromHouses, temporaryDisableBtn } from '../../../../helpers/helper';
import GameInfoBoardFooterContainer from '../GameInfoBoardFooter/GameInfoBoardFooterContainer';
import Title from '../../../../shared/UI/Title/Title';
import { IActionCard } from '../../../../store/quick-game/quick-game.d';

interface IGameInfoBoardBuyOrAuctionProps {
	labelColors?: string[];
	labelTextColors?: string[];
	actions: IActionCard;
	card_cost?: number;
	game_id: number;
	card_id: number;
	timeEndMove: number;
	dataCard: any //IDataContainer;
	handleCard?: ({ game_id, card_id, action }: { action: string, game_id: number, card_id: number }) => void;
}

export const GameInfoBoardBuyOrAuction: React.FC<IGameInfoBoardBuyOrAuctionProps> = ({
	labelColors = ['transparent', '#65B99E'],
	labelTextColors = ['#000000', '#ffffff'],
	card_cost,
	game_id,
	card_id,
	dataCard,
	handleCard,
	actions,
	timeEndMove
}: IGameInfoBoardBuyOrAuctionProps) => {
	const [amountHouses, setAmountHouses] = React.useState<number>(1);
	const [isActionCard, setIsActionCard] = React.useState<boolean>(false);
	const [ isClick, setIsClick ] = React.useState<boolean>(false);

	const handleBuyCard = function () {
		temporaryDisableBtn(2000, setIsClick);
		handleCard && handleCard({
			action: 'buy',
			game_id,
			card_id,
		})
	}
	const handleAuction = function () {
		setIsActionCard(true);
		temporaryDisableBtn(2000, setIsClick);
		!isActionCard && handleCard && handleCard({
			action: 'start_auction',
			game_id,
			card_id,
		});
	}

	return (
    <div className={styles["gib__container"]}>
      <div className={styles["gib-bg"]}>
        {/* header */}
        <div className={styles["gib__header-container"]}>
          <Offset mt={10} />

          <Title
            className={styles["gib__title"]}
            title={"Вам выпала свободная карта."}
            tag="h3"
          />

          <Offset mt={10} />
          <div className={styles["gib__btns-container--btn-two"]}>
            <Button
              onClick={handleBuyCard}
              type="fill"
              fillColor="#726CED"
              disabled={isClick || !actions?.buy}
            >
              Купить за {card_cost}
              <Icon
                width="15px"
                height="15px"
                ml={3}
                src={icons.qgCurrencySvg}
              />
            </Button>
            <Button
              disabled={isClick || (!actions.auction && isActionCard)}
              onClick={handleAuction}
              type="outline"
            >
              Отказ{" "}
              {
                <AutoCounter
                  disabled={isActionCard}
                  counter={timeEndMove}
                  callback={handleAuction}
                />
              }
            </Button>
          </div>
          <Offset mt={10} />
        </div>
        {/* body */}
        <div
          style={{ background: "#E9ECFF" }}
          className={styles["gib__body-container--full"]}
        >
          <div className={styles["gib__body-container-wrap"]}>
            <div className={styles["gib__info-card-labels"]}>
              <InfoBoardLabel labelColor={labelColors[0]} center>
                <div
                  style={{ color: labelTextColors[0] }}
                  className={styles["gib__info-card-label-city-name"]}
                >
                  {dataCard.info?.name}
                </div>
              </InfoBoardLabel>
              <InfoBoardLabel
                labelColor={labelColors[1]}
                borderColor="transparent"
                center
              >
                <div
                  style={{ color: labelTextColors[1] }}
                  className={styles["gib__info-card-label-contry-name"]}
                >
                  {dataCard.info?.country_name}
                </div>
              </InfoBoardLabel>
            </div>
            <div className={styles["gib__info-card-info-container"]}>
              <div className={styles["gib__info-card-info-title"]}>
                <div>Характеристики карты</div>
                <div>Стоимость недвижимости</div>
              </div>
              <div className={styles["gib__info-card-info-desc-container"]}>
                <InfoBoardLabel>
                  <div className={styles["gib__info-card-info-desc-label"]}>
                    <div>Налог</div>
                    <div>
                      {dataCard.features?.one_card_tax}
                      <Icon
                        width="15px"
                        height="15px"
                        ml={3}
                        src={icons.qgCurrencySvg}
                      />
                    </div>
                  </div>
                </InfoBoardLabel>
                <InfoBoardLabel>
                  <div className={styles["gib__info-card-info-desc-label"]}>
                    <div>Стоимость дома</div>
                    <div>
                      {dataCard.prices?.house}
                      <Icon
                        width="15px"
                        height="15px"
                        ml={3}
                        src={icons.qgCurrencySvg}
                      />
                    </div>
                  </div>
                </InfoBoardLabel>
                <InfoBoardLabel>
                  <div className={styles["gib__info-card-info-desc-label"]}>
                    <div>С коллекцией</div>
                    <div>
                      {dataCard.features?.monopoly_tax}
                      <Icon
                        width="15px"
                        height="15px"
                        ml={3}
                        src={icons.qgCurrencySvg}
                      />
                    </div>
                  </div>
                </InfoBoardLabel>
                <InfoBoardLabel>
                  <div className={styles["gib__info-card-info-desc-label"]}>
                    <div>Стоимость отеля</div>
                    <div>
                      {dataCard.prices?.hotel}
                      <Icon
                        width="15px"
                        height="15px"
                        ml={3}
                        src={icons.qgCurrencySvg}
                      />
                    </div>
                  </div>
                </InfoBoardLabel>
                <InfoBoardLabel>
                  <div className={styles["gib__info-card-info-desc-label"]}>
                    <div>
                      {amountHouses > 1 ? (
                        <Button
                          onClick={() => setAmountHouses(amountHouses - 1)}
                          className={styles["gib__btn-action-house"]}
                        >
                          -
                        </Button>
                      ) : (
                        <Button
                          disabled
                          className={styles["gib__btn-action-house"]}
                        >
                          -
                        </Button>
                      )}
                      С{" "}
                      {
                        getPriceTaxesFromHouses(
                          amountHouses,
                          dataCard.features?.house_taxes
                        )?.name
                      }
                      {dataCard.features?.house_taxes &&
                      amountHouses < dataCard.features?.house_taxes?.length ? (
                        <Button
                          onClick={() => setAmountHouses(amountHouses + 1)}
                          className={styles["gib__btn-action-house"]}
                        >
                          +
                        </Button>
                      ) : (
                        <Button
                          disabled
                          className={styles["gib__btn-action-house"]}
                        >
                          +
                        </Button>
                      )}
                    </div>
                    <div>
                      {
                        getPriceTaxesFromHouses(
                          amountHouses,
                          dataCard.features?.house_taxes
                        ).price
                      }
                      <Icon
                        width="15px"
                        height="15px"
                        ml={3}
                        src={icons.qgCurrencySvg}
                      />
                    </div>
                  </div>
                </InfoBoardLabel>
              </div>
            </div>
          </div>
        </div>
        {/* footer */}
        <Offset mt={20} />
        <GameInfoBoardFooterContainer />
      </div>
    </div>
  );
};
