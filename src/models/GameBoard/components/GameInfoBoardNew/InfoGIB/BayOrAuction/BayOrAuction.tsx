import { icons } from '../../../../../../assets';
import { Button, Offset } from '../../../../../../shared/UI';
import Icon from '../../../../../../shared/UI/Icon/Icon';
import React from 'react';
import AutoCounter from '../../../../../../Component/AutoCounter/AutoCounter';
import { getPriceTaxesFromHouses, temporaryDisableBtn } from '../../../../../../helpers/helper';
import Title from '../../../../../../shared/UI/Title/Title';
import { CardDataDataActionsType } from '../../../../../../store/quick-game/quick-game.type';
import GameInfoBoardFooterContainer from '../../FooterGIB/GameInfoBoardFooterContainer';
import ContainerGIB from '../../components/UI/ContainerGIB/ContainerGIB';
import ContainerInfoHeaderGIB from '../../components/UI/ContainerGIB/ContainerInfoHeaderGIB';
import ContainerTwoBtn from '../../components/UI/ControllerGIB/ContainerTwoBtn';
import ContainerInfoBodyGIB from '../../components/UI/ContainerGIB/ContainerInfoBodyGIB';
import ContainerInfoTwoColumnGIB from '../../components/UI/ContainerGIB/ContainerInfoTwoColumnGIB';
import InnerBtnContextSpaceBetween from '../../components/UI/ControllerGIB/InnerBtnContextSpaceBetween';
import Text from '../../../../../../shared/UI/Text/Text';
import ContainerInfoGIB from '../../components/UI/ContainerGIB/ContainerInfoGIB';
import { useWindowWidth } from '../../../../../../hooks/useWindowWidth';

interface IBayOrAuctionProps {
  labelColors?: string[];
  labelTextColors?: string[];
  actions: CardDataDataActionsType;
  card_cost?: number;
  game_id: number;
  card_id: number;
  timeEndMove: number;
  dataCard: any //IDataContainer;
  handleCard?: ({ game_id, card_id, action }: { action: string, game_id: number, card_id: number }) => void;
}

export const BayOrAuction: React.FC<IBayOrAuctionProps> = ({
  labelColors = ['transparent', '#65B99E'],
  labelTextColors = ['#000000', '#ffffff'],
  card_cost,
  game_id,
  card_id,
  dataCard,
  handleCard,
  actions,
  timeEndMove
}: IBayOrAuctionProps) => {
  const [amountHouses, setAmountHouses] = React.useState<number>(1);
  const [isActionCard, setIsActionCard] = React.useState<boolean>(false);
  const [isClick, setIsClick] = React.useState<boolean>(false);
  const { isMobile } = useWindowWidth();

  const handleBuyCard = function () {
    temporaryDisableBtn(5000, setIsClick);
    handleCard && handleCard({
      action: 'buy',
      game_id,
      card_id,
    })
  }
  const handleAuction = function () {
    setIsActionCard(true);
    temporaryDisableBtn(5000, setIsClick);
    !isActionCard && handleCard && handleCard({
      action: 'start_auction',
      game_id,
      card_id,
    });
  }

  return (
    <ContainerGIB name="BayOrAuction" style={{ background: "#ffffffff" }}>
      {/* header */}
      <ContainerInfoHeaderGIB>
        <Offset mt={10} />

        <Title title={"Вам выпала свободная карта."} tag="h3" />

        <Offset mt={10} />
        <ContainerTwoBtn>
          <Button
            onClick={handleBuyCard}
            p={10}
            type="fill"
            fillColor="#726CED"
            disabled={isClick || !actions?.buy}
          >
            Купить за {card_cost}
            <Icon width={15} height={15} ml={3} src={icons.qgCurrencySvg} />
          </Button>
          <Button
            p={10}
            disabled={isClick || (!actions.auction && isActionCard)}
            onClick={handleAuction}
            type="outline"
          >
            Отказ{" "}
            {
              <AutoCounter
                disabled={isActionCard}
                counter={timeEndMove}
                // callback={handleAuction}
              />
            }
          </Button>
        </ContainerTwoBtn>
        {!isMobile && <Offset mt={10} />}
      </ContainerInfoHeaderGIB>
      <Offset mt={10} />
      {/* body */}
      <ContainerInfoBodyGIB
        style={{
          background: "#E9ECFF",
          padding: "15px",
          borderRadius: "10px 10px 0 0",
        }}
      >
        <ContainerTwoBtn>
          <Button variant="transparent" p={10}>
            <Text
              style={{ color: labelTextColors[0] }}
              tag="div"
              fontWeight={600}
              fontSize={16}
            >
              {dataCard.info?.name}
            </Text>
          </Button>
          <Button
            fillColor={labelColors[1]}
            variant="filled"
          // center
          >
            <Text
              style={{ color: labelTextColors[1] }}
              fontWeight={600}
              tag="div"
              fontSize={16}
            >
              {dataCard.info?.country_name}
            </Text>
          </Button>
        </ContainerTwoBtn>

        <ContainerInfoGIB>
          <Offset mt={20} />
          <ContainerInfoTwoColumnGIB>
            <Title
              title={"Характеристики карты"}
              tag="h5"
              fontWeight={300}
              center
            />
            <Title
              title={"Стоимость недвижимости"}
              tag="h5"
              fontWeight={300}
              center
            />
          </ContainerInfoTwoColumnGIB>
          <Offset mt={10} />

          <ContainerInfoTwoColumnGIB>
            <Button type="transparent" p={10}>
              <InnerBtnContextSpaceBetween>
                <Text text={"Налог"} />
                <Text
                  fontWeight={900}
                  text={dataCard?.features?.one_card_tax + ""}
                  iconRight={<Icon src={icons.qgCurrencySvg} width={15} />}
                />
              </InnerBtnContextSpaceBetween>
            </Button>
            <Button type="transparent" p={10}>
              <InnerBtnContextSpaceBetween>
                <Text text={"Карты из коллекции"} style={{ marginRight: 2 }} />
                <Text
                  fontWeight={900}
                  text={dataCard?.info?.collection_amount + ""}
                />
              </InnerBtnContextSpaceBetween>
            </Button>
          </ContainerInfoTwoColumnGIB>
          <Offset mt={10} />

          <ContainerInfoTwoColumnGIB>
            <Button type="transparent" p={10}>
              <InnerBtnContextSpaceBetween>
                <Text text={"С коллекцией"} />
                <Text
                  fontWeight={900}
                  text={dataCard?.features?.monopoly_tax + ""}
                  iconRight={<Icon src={icons.qgCurrencySvg} width={15} />}
                />
              </InnerBtnContextSpaceBetween>
            </Button>
            <Button type="transparent" p={10}>
              <InnerBtnContextSpaceBetween>
                <Text text={"Стоимость дома"} />
                <Text
                  fontWeight={900}
                  text={dataCard?.prices?.house + ""}
                  iconRight={<Icon src={icons.qgCurrencySvg} width={15} />}
                />
              </InnerBtnContextSpaceBetween>
            </Button>
          </ContainerInfoTwoColumnGIB>
          <Offset mt={10} />

          <ContainerInfoTwoColumnGIB>
            <Button type="transparent" p={10}>
              <InnerBtnContextSpaceBetween>
                <Text noWrap>
                  <>
                    {amountHouses > 1 ? (
                      <Button
                        component={"div"}
                        type="fill-round"
                        fillColor="rgba(239, 238, 255, 1)"
                        style={{ width: "22px", marginRight: "10px" }}
                        onClick={() => setAmountHouses(amountHouses - 1)}
                      >
                        -
                      </Button>
                    ) : (
                      <Button
                        disabled
                        component={"div"}
                        type="fill-round"
                        fillColor="rgba(239, 238, 255, 1)"
                        style={{ width: "22px", marginRight: "10px" }}
                      >
                        -
                      </Button>
                    )}
                    С{" "}
                    {dataCard?.features?.house_taxes &&
                      getPriceTaxesFromHouses(
                        amountHouses,
                        dataCard?.features?.house_taxes
                      )?.name}
                    {
                      // dataCard.features?.house_taxes &&
                      amountHouses < dataCard?.features?.house_taxes?.length ? (
                        <Button
                          component={"div"}
                          type="fill-round"
                          fillColor="rgba(239, 238, 255, 1)"
                          style={{ width: "22px", marginLeft: "10px" }}
                          onClick={() => setAmountHouses(amountHouses + 1)}
                        // className={styles['gib__btn-action-house']}
                        >
                          +
                        </Button>
                      ) : (
                        <Button
                          disabled
                          component={"div"}
                          type="fill-round"
                          fillColor="rgba(239, 238, 255, 1)"
                          style={{ width: "22px", marginLeft: "10px" }}
                        // className={styles['gib__btn-action-house']}
                        >
                          +
                        </Button>
                      )
                    }
                  </>
                </Text>
                <Text
                  text={
                    dataCard?.features?.house_taxes &&
                    getPriceTaxesFromHouses(
                      amountHouses,
                      dataCard?.features?.house_taxes
                    )?.price + ""
                  }
                  fontWeight={900}
                  iconRight={<Icon src={icons.qgCurrencySvg} width={15} />}
                />
              </InnerBtnContextSpaceBetween>
            </Button>
            <Button type="transparent" p={10}>
              <InnerBtnContextSpaceBetween>
                <Text text={"Стоимость отеля"} />
                <Text
                  fontWeight={900}
                  text={dataCard?.prices?.hotel + ""}
                  iconRight={<Icon src={icons.qgCurrencySvg} width={15} />}
                />
              </InnerBtnContextSpaceBetween>
            </Button>
          </ContainerInfoTwoColumnGIB>
          <Offset mt={10} />
        </ContainerInfoGIB>
      </ContainerInfoBodyGIB>
      {/* footer */}
      <GameInfoBoardFooterContainer
        style={{
          borderRadius: "0 0 10px 10px",
        }}
      />
    </ContainerGIB>
  );
};
