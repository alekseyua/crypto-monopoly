import React from "react";
import ContainerGIB from "../../components/UI/ContainerGIB/ContainerGIB";
import ContainerInfoHeaderGIB from "../../components/UI/ContainerGIB/ContainerInfoHeaderGIB";
import { Button, Offset } from "../../../../../../shared/UI";
import Title from "../../../../../../shared/UI/Title/Title";
import ContainerTwoBtn from "../../components/UI/ControllerGIB/ContainerTwoBtn";
import Icon from "../../../../../../shared/UI/Icon/Icon";
import { icons } from "../../../../../../assets";
import AutoCounter from "../../../../../../Component/AutoCounter/AutoCounter";
import ContainerInfoFooterGIB from "../../components/UI/ContainerGIB/ContainerInfoFooterGIB";
import ContainerInfoBodyGIB from "../../components/UI/ContainerGIB/ContainerInfoBodyGIB";
import ContainerInfoGIB from "../../components/UI/ContainerGIB/ContainerInfoGIB";
import {
  CardDataDataActionsType,
  ICard,
  ISpecialCard,
  ISpecialCardInfo,
} from "../../../../../../store/quick-game/quick-game.d";
import ContainerInfoTwoColumnGIB from "../../components/UI/ContainerGIB/ContainerInfoTwoColumnGIB";
import InnerBtnContextSpaceBetween from "../../components/UI/ControllerGIB/InnerBtnContextSpaceBetween";
import Text from "../../../../../../shared/UI/Text/Text";
import GameInfoBoardFooterContainer from "../../FooterGIB/GameInfoBoardFooterContainer";
import { temporaryDisableBtn } from "../../../../../../helpers/helper";
import ContainerOneBtn from "../../components/UI/ControllerGIB/ContainerOneBtn";

interface IExpressAirlineCruiseProps {
  cardInfo: ISpecialCardInfo;
  game_id: number;
  card_id: number;
  actions: CardDataDataActionsType;
  handleCard?: ({
    game_id,
    card_id,
    action,
  }: {
    action: string;
    game_id: number;
    card_id: number;
  }) => void;
  timeEndMove: number;
}

export const ExpressAirlineCruise: React.FC<IExpressAirlineCruiseProps> = ({
  game_id,
  card_id,
  handleCard,
  actions,
  timeEndMove,
  cardInfo,
}: IExpressAirlineCruiseProps) => {
  const [isActionCard, setIsActionCard] = React.useState<boolean>(false);
  const [isClick, setIsClick] = React.useState<boolean>(false);
  const handleBuyCard = function () {
    temporaryDisableBtn(5000, setIsClick);
    handleCard &&
      handleCard({
        action: "buy",
        game_id,
        card_id,
      });
  };

  const handleAuction = function () {
    temporaryDisableBtn(5000, setIsClick);
    setIsActionCard(true);
    handleCard &&
      handleCard({
        action: "start_auction",
        game_id,
        card_id,
      });
  };
  return (
    <ContainerGIB name="ExpressAirlineCruise">
      {/* -------header---------- */}
      <ContainerInfoHeaderGIB>
        <Offset mt={20} />
        <Title title={"Вам выпала свободная карта."} tag="h3" center />
        <Offset mt={10} />
        <ContainerTwoBtn>
          <Button
            type="fill"
            p={10}
            fillColor="#726CED"
            disabled={isClick || !actions.buy}
            onClick={handleBuyCard}
          >
            Купить за {cardInfo?.base_cost}
            <Icon
              src={icons.qgCurrencySvgWhite}
              width={20}
              height={16}
              ml={5}
            />
          </Button>
          <Button
            type="outline"
            p={10}
            disabled={isClick || (!actions.auction && isActionCard)}
            onClick={handleAuction}
          >
            Отказ{" "}
            {
              <AutoCounter
                counter={timeEndMove}
                disabled={isActionCard}
                callback={() => {}}
              />
            }
          </Button>
        </ContainerTwoBtn>
        <Offset mt={10} />
      </ContainerInfoHeaderGIB>
      {/* ---------body------------- */}
      <ContainerInfoBodyGIB>
        <Offset mt={10} />

        <ContainerOneBtn>
          <Button
            type="fill"
            fillColor="linear-gradient(to right, #E4863F 0%, #E4863F 70%, #FAD660 100%)"
            p={10}
          >
            {cardInfo?.name}
          </Button>
        </ContainerOneBtn>
        <Offset mt={20} />

        {/* ---------body------------- */}
        <ContainerInfoGIB
          style={{ background: "#E9ECFF", padding: "0 15px" }} // нужно уточнить за цвет
        >
          <Offset mt={20} />

          <ContainerInfoTwoColumnGIB>
            <Title
              title={"Характеристики карты"}
              tag="h5"
              fontWeight={300}
              center
            />
            <Title
              title={"Покупка недвижимости"}
              tag="h5"
              fontWeight={300}
              center
            />
          </ContainerInfoTwoColumnGIB>
          <Offset mt={10} />

          <ContainerInfoTwoColumnGIB>
            <Button type="transparent" p={10}>
              <InnerBtnContextSpaceBetween>
                <Text text={"1 карта"} />
                <Text
                  text={cardInfo?.one_card_tax + ""}
                  iconRight={<Icon src={icons.qgCurrencySvg} height={13} />}
                />
              </InnerBtnContextSpaceBetween>
            </Button>
            <Button type="transparent" p={10}>
              <InnerBtnContextSpaceBetween>
                <Text text={"Карты из коллекции"} style={{marginRight: 2}} />
                <Text
                  fontWeight={900}
                  text={
                    cardInfo?.info?.collection_amount +
                    ""
                  }
                />
              </InnerBtnContextSpaceBetween>
            </Button>
          </ContainerInfoTwoColumnGIB>
          {(!!cardInfo?.two_card_tax ||
            !!cardInfo?.two_card_tax) && (
            <>
              <Offset mt={10} />

              <ContainerInfoTwoColumnGIB>
                {!!cardInfo?.two_card_tax && (
                  <Button type="transparent" p={10}>
                    <InnerBtnContextSpaceBetween>
                      <Text text={"2 карты"} />
                      <Text
                        text={
                          cardInfo?.two_card_tax + ""
                        }
                        iconRight={
                          <Icon src={icons.qgCurrencySvg} height={13} />
                        }
                      />
                    </InnerBtnContextSpaceBetween>
                  </Button>
                )}
                {!!cardInfo?.three_card_tax && (
                  <Button type="transparent" p={10}>
                    <InnerBtnContextSpaceBetween>
                      <Text text={"3 карты"} />
                      <Text
                        text={
                          cardInfo?.three_card_tax + ""
                        }
                        iconRight={
                          <Icon src={icons.qgCurrencySvg} height={13} />
                        }
                      />
                    </InnerBtnContextSpaceBetween>
                  </Button>
                )}
              </ContainerInfoTwoColumnGIB>
            </>
          )}

          {!!cardInfo?.four_card_tax && (
            <>
              <Offset mt={10} />
              <ContainerInfoTwoColumnGIB>
                <Button type="transparent" p={10}>
                  <InnerBtnContextSpaceBetween>
                    <Text text={"2 карты"} />
                    <Text
                      text={
                        cardInfo?.four_card_tax + ""
                      }
                      iconRight={
                        <Icon src={icons.qgCurrencySvg} height={13} />
                      }
                    />
                  </InnerBtnContextSpaceBetween>
                </Button>
              </ContainerInfoTwoColumnGIB>
            </>
          )}
        </ContainerInfoGIB>
      </ContainerInfoBodyGIB>
      <Offset mt={10} />

      {/* ---------footer----------- */}
      <ContainerInfoFooterGIB>
        <GameInfoBoardFooterContainer bgc={"#CFD3ED4D"} />
      </ContainerInfoFooterGIB>
    </ContainerGIB>
  );
};
