import React from "react";
import ContainerGIB from "../../UIContainerGIB/ContainerGIB";
import ContainerInfoHeaderGIB from "../../UIContainerGIB/InfoGIB/ContainerInfoHeaderGIB";
import { Button, Offset } from "../../../../../../shared/UI";
import Title from "../../../../../../shared/UI/Title/Title";
import ContainerTwoBtn from "../../ControllerGIB/ContainerTwoBtn";
import Icon from "../../../../../../shared/UI/Icon/Icon";
import { icons } from "../../../../../../assets";
import AutoCounter from "../../../../../../Component/AutoCounter/AutoCounter";
import ContainerInfoFooterGIB from "../../UIContainerGIB/InfoGIB/ContainerInfoFooterGIB";
import ContainerInfoBodyGIB from "../../UIContainerGIB/InfoGIB/ContainerInfoBodyGIB";
import ContainerInfoGIB from "../../UIContainerGIB/InfoGIB/ContainerInfoGIB";
import {
  IActionCard,
  ICard,
  ISpecialCard,
} from "../../../../../../store/quick-game/quick-game.d";
import ContainerInfoTwoColumnGIB from "../../UIContainerGIB/InfoGIB/ContainerInfoTwoColumnGIB";
import InnerBtnContextSpaceBetween from "../../ControllerGIB/InnerBtnContextSpaceBetween";
import Text from "../../../../../../shared/UI/Text/Text";
import GameInfoBoardFooterContainer from "../../FooterGIB/GameInfoBoardFooterContainer";
import { temporaryDisableBtn } from "../../../../../../helpers/helper";
import ContainerOneBtn from "../../ControllerGIB/ContainerOneBtn";

interface IExpressAirlineCruiseProps {
  card: ICard | ISpecialCard;
  game_id: number;
  card_id: number;
  actions: IActionCard;
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
  card,
}: IExpressAirlineCruiseProps) => {
  const [isActionCard, setIsActionCard] = React.useState<boolean>(false);
  const [isClick, setIsClick] = React.useState<boolean>(false);
  const handleBuyCard = function () {
    temporaryDisableBtn(2000, setIsClick);
    handleCard &&
      handleCard({
        action: "buy",
        game_id,
        card_id,
      });
  };

  const handleAuction = function () {
    temporaryDisableBtn(2000, setIsClick);
    setIsActionCard(true);
    handleCard &&
      handleCard({
        action: "start_auction",
        game_id,
        card_id,
      });
  };
  console.log(card as ISpecialCard);
  return (
    <ContainerGIB>
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
            Купить за {(card as ISpecialCard)?.card_info?.base_cost}
            <Icon
              src={icons.qgCurrencySvgWhite}
              width="20"
              height="16"
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
            {(card as ISpecialCard)?.card_info?.name}
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
                  text={(card as ISpecialCard)?.card_info?.one_card_tax + ""}
                  iconRight={<Icon src={icons.qgCurrencySvg} height={"13px"} />}
                />
              </InnerBtnContextSpaceBetween>
            </Button>
            <Button type="transparent" p={10}>
              <InnerBtnContextSpaceBetween>
                <Text text={"Карты из коллекции"} />
                <Text
                  fontWeight={900}
                  text={
                    (card as ISpecialCard)?.card_info?.info?.collection_amount +
                    ""
                  }
                />
              </InnerBtnContextSpaceBetween>
            </Button>
          </ContainerInfoTwoColumnGIB>
          {(!!(card as ISpecialCard)?.card_info?.two_card_tax ||
            !!(card as ISpecialCard)?.card_info?.two_card_tax) && (
            <>
              <Offset mt={10} />

              <ContainerInfoTwoColumnGIB>
                {!!(card as ISpecialCard)?.card_info?.two_card_tax && (
                  <Button type="transparent" p={10}>
                    <InnerBtnContextSpaceBetween>
                      <Text text={"2 карты"} />
                      <Text
                        text={
                          (card as ISpecialCard)?.card_info?.two_card_tax + ""
                        }
                        iconRight={
                          <Icon src={icons.qgCurrencySvg} height={"13px"} />
                        }
                      />
                    </InnerBtnContextSpaceBetween>
                  </Button>
                )}
                {!!(card as ISpecialCard)?.card_info?.three_card_tax && (
                  <Button type="transparent" p={10}>
                    <InnerBtnContextSpaceBetween>
                      <Text text={"3 карты"} />
                      <Text
                        text={
                          (card as ISpecialCard)?.card_info?.three_card_tax + ""
                        }
                        iconRight={
                          <Icon src={icons.qgCurrencySvg} height={"13px"} />
                        }
                      />
                    </InnerBtnContextSpaceBetween>
                  </Button>
                )}
              </ContainerInfoTwoColumnGIB>
            </>
          )}

          {!!(card as ISpecialCard)?.card_info?.four_card_tax && (
            <>
              <Offset mt={10} />
              <ContainerInfoTwoColumnGIB>
                <Button type="transparent" p={10}>
                  <InnerBtnContextSpaceBetween>
                    <Text text={"2 карты"} />
                    <Text
                      text={
                        (card as ISpecialCard)?.card_info?.four_card_tax + ""
                      }
                      iconRight={
                        <Icon src={icons.qgCurrencySvg} height={"13px"} />
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
