import { icons } from '../../../../../../assets';
import { Button, Offset } from '../../../../../../shared/UI';
import Icon from '../../../../../../shared/UI/Icon/Icon';
import React from 'react';
import GameInfoBoardFooterContainer from '../../../GameInfoBoardFooter/GameInfoBoardFooterContainer';
import AutoCounter from '../../../../../../Component/AutoCounter/AutoCounter';
import ContainerGIB from '../../UIContainerGIB/ContainerGIB';
import ContainerInfoHeaderGIB from '../../UIContainerGIB/InfoGIB/ContainerInfoHeaderGIB';
import ContainerTwoBtn from '../../ControllerGIB/ContainerTwoBtn';
import ContainerInfoBodyGIB from '../../UIContainerGIB/InfoGIB/ContainerInfoBodyGIB';
import Title from '../../../../../../shared/UI/Title/Title';
import Text from '../../../../../../shared/UI/Text/Text';
import ContainerInfoTwoColumnGIB from '../../UIContainerGIB/InfoGIB/ContainerInfoTwoColumnGIB';
import InnerBtnContextSpaceBetween from '../../ControllerGIB/InnerBtnContextSpaceBetween';
import { getPriceTaxesFromHouses } from '../../../../../../helpers/helper';
import ContainerInfoFooterGIB from '../../UIContainerGIB/InfoGIB/ContainerInfoFooterGIB';
import { ICardInfo } from '../../../../../../store/quick-game/quick-game.d';

interface Iprops {
  endTime: number;
  cardInfo: ICardInfo;
  handleChangeScreen: ({ path }: { path: string }) => void;
  setTimeEndAuction?: (s:any) => void;
}
export const AuctionInfoCard: React.FC<Iprops> = ({
  endTime,
  cardInfo,
  handleChangeScreen,
  setTimeEndAuction,
}: Iprops) => {
  const [amountHouses, setAmountHouses] = React.useState<number>(1);
  return (
    <ContainerGIB
      style={{
        background: "#FFEFD3",
      }}
    >
      {/* -------header---------- */}
      <ContainerInfoHeaderGIB p={0}>
        <Offset mt={10} />

        <ContainerTwoBtn>
          <Button
            type="fill"
            fillColor="linear-gradient(to right, #E4863F 0%, #E4863F 70%, #FAD660 100%)"
            p={10}
          >
            {cardInfo?.info?.name}
          </Button>
          <Button type="fill" fillColor="#65B99E" p={10}>
            {cardInfo?.info?.country_name}
          </Button>
        </ContainerTwoBtn>
      </ContainerInfoHeaderGIB>
      <Offset mt={20} />

      {/* ---------body------------- */}
      <ContainerInfoBodyGIB p={0}>
        <Text>
          Окончание торгов:
          {
            <AutoCounter
              counter={endTime}
              callback={() => {}}
              setTimeEndAuction={setTimeEndAuction}
            />
          }
        </Text>
        <Offset mt={20} />

        <ContainerInfoTwoColumnGIB>
          <Title
            title={"Характеристики карты"}
            tag="h4"
            fontWeight={300}
            center
          />
          <Title title={"Торги"} tag="h4" fontWeight={300} center />
        </ContainerInfoTwoColumnGIB>
        <Offset mt={10} />

        <ContainerInfoTwoColumnGIB>
          <Button type="transparent" p={10} borderColor="#EDBA60">
            <InnerBtnContextSpaceBetween>
              <Text text={"Налог"} />
              <Text
                text={cardInfo?.features?.one_card_tax + ""}
                iconRight={<Icon src={icons.qgCurrencySvg} width={"15px"} />}
              />
            </InnerBtnContextSpaceBetween>
          </Button>
          <Button
            type="transparent"
            p={10}
            component="div"
            borderColor="#EDBA60"
          >
            <InnerBtnContextSpaceBetween>
              <Button
                type="fill-empty"
                textColor="rgba(78, 76, 109, 1)"
                onClick={() => alert("info")}
              >
                <Text
                  fontWeight={300}
                  fontSize={12}
                  color={"rgba(78, 76, 109, 1)"}
                  start
                >
                  Начальная цена (?)
                </Text>
              </Button>
              <Text
                text={cardInfo?.start_price + ""}
                iconRight={<Icon src={icons.qgCurrencySvg} width={"15px"} />}
              />
            </InnerBtnContextSpaceBetween>
          </Button>
        </ContainerInfoTwoColumnGIB>
        <Offset mt={10} />

        <ContainerInfoTwoColumnGIB>
          <Button type="transparent" p={10} borderColor="#EDBA60">
            <InnerBtnContextSpaceBetween>
              <Text text={"С коллекцией"} />
              <Text
                text={cardInfo?.features?.monopoly_tax + ""}
                iconRight={<Icon src={icons.qgCurrencySvg} width={"15px"} />}
              />
            </InnerBtnContextSpaceBetween>
          </Button>
        </ContainerInfoTwoColumnGIB>
        <Offset mt={10} />

        <ContainerInfoTwoColumnGIB>
          <Button type="transparent" p={10} borderColor="#EDBA60">
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
                  {cardInfo?.features?.house_taxes &&
                    getPriceTaxesFromHouses(
                      amountHouses,
                      cardInfo?.features?.house_taxes
                    )?.name}
                  {
                    // dataCard.features?.house_taxes &&
                    amountHouses < cardInfo?.features?.house_taxes?.length ? (
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
                  cardInfo?.features?.house_taxes &&
                  getPriceTaxesFromHouses(
                    amountHouses,
                    cardInfo?.features?.house_taxes
                  )?.price + ""
                }
                iconRight={<Icon src={icons.qgCurrencySvg} width={"15px"} />}
              />
            </InnerBtnContextSpaceBetween>
          </Button>
          <Button
            type="fill"
            fillColor="#FFFAF0"
            borderColor=""
            p={10}
            onClick={() =>
              handleChangeScreen && handleChangeScreen({ path: "place-bet" })
            }
          >
            <InnerBtnContextSpaceBetween>
              <Text>Сделать ставку</Text>
              <Text
                text={"> 0"}
                iconRight={<Icon src={icons.qgCurrencySvg} width={"15px"} />}
              />
            </InnerBtnContextSpaceBetween>
          </Button>
        </ContainerInfoTwoColumnGIB>
        <Offset mt={10} />
      </ContainerInfoBodyGIB>

      {/* ---------footer----------- */}

      <ContainerInfoFooterGIB style={{ padding: 0 }}>
        <GameInfoBoardFooterContainer
          bgc={"#FADDAA"}
          bgcBtn={"#F5CC82"}
          style={{
            width: "100%",
          }}
        />
      </ContainerInfoFooterGIB>
    </ContainerGIB>
  );
};
