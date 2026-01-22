import React from 'react';
import ContainerGIB from '../../components/UI/ContainerGIB/ContainerGIB';
import ContainerInfoHeaderGIB from '../../components/UI/ContainerGIB/ContainerInfoHeaderGIB';
import ContainerInfoBodyGIB from '../../components/UI/ContainerGIB/ContainerInfoBodyGIB';
import ContainerInfoFooterGIB from '../../components/UI/ContainerGIB/ContainerInfoFooterGIB';
import ContainerInfoGIB from '../../components/UI/ContainerGIB/ContainerInfoGIB';
import { Button, Offset } from '../../../../../../shared/UI';
import Title from '../../../../../../shared/UI/Title/Title';
import AutoCounter from '../../../../../../Component/AutoCounter/AutoCounter';
import ContainerOneBtn from '../../components/UI/ControllerGIB/ContainerOneBtn';
import { getPriceTaxesFromHouses, temporaryDisableBtn } from '../../../../../../helpers/helper';
import ContainerInfoTwoColumnGIB from '../../components/UI/ContainerGIB/ContainerInfoTwoColumnGIB';
import InnerBtnContextSpaceBetween from '../../components/UI/ControllerGIB/InnerBtnContextSpaceBetween';
import Text from '../../../../../../shared/UI/Text/Text';
import { icons } from '../../../../../../assets';
import Icon from '../../../../../../shared/UI/Icon/Icon';
import FooterInfoBoardContainer from '../../FooterInfoBoard/FooterInfoBoardContainer';
import { IActionsChooseData, ICardInfoChooseData } from '../../../../../../store/quick-game/chooseData.type';
import { ICard, IFeatures } from '../../../../../../store/quick-game/quick-game.type';

interface IProps {
  handleChangeScreen: (newScreen: 'action-card' | 'action-special-card' | 'actions') => void;
  handleBack: (p: any) => void; // Optional, assuming you might want to go back
  setAmountHouses: (amount: number) => void; // Function to set amount of houses
  handleAction: (p: any)=>void;
  card: ICard;
  actions: IActionsChooseData;
  cardInfo: ICardInfoChooseData;
  timeEndMove: number;
  amountHouses: number; // Current amount of houses

}

const InfoCard: React.FC<IProps> = ({
  card,
  actions,

  cardInfo,
  timeEndMove,
  handleBack,
  amountHouses,
  handleAction,
  setAmountHouses,
  handleChangeScreen,
}: IProps) => {
  const [isClick, setIsClick] = React.useState<boolean>(false);
  return (
    <ContainerGIB name="InfoCard">
      {/* <Offset mt={5} /> */}
      {/* крестик на закрытие */}

      <Button
        type="transparent"
        borderColor='transparent'
        disabled={isClick}
        onClick={() => {
          temporaryDisableBtn(5000, setIsClick);
          handleBack({
            action: "clean_chose_actions",
          });
        }}
      >
        <Icon src={icons.crossBlack} width={20} height={20} style={{ position: 'absolute', right: 20 }} />
      </Button>
      <Title title={"Действия с картой"} tag="h3" fontWeight={500} />
      <Offset mt={5} />
      <ContainerOneBtn>
        <Button
          type="empty"
          borderColor="#E4E4E4"
          p={[5,11]}
        >
          <Text fontWeight={300} fontSize={14} center>
            <>
              До хода
              <AutoCounter counter={timeEndMove} callback={() => {}} />
              секунд
            </>
          </Text>
        </Button>
      </ContainerOneBtn>

      <Offset mt={10} />
      <ContainerInfoGIB
        style={{
          backgroundColor: "rgba(233, 236, 255, 1)",
        }}
      >
        <ContainerInfoHeaderGIB p={15}>
          {/* <Offset mt={20} /> */}
          <ContainerInfoTwoColumnGIB>
            <Button
              type="fill"
              fillColor={card?.owner?.player?.color || "#e2dcdcff"}
              textColor="#FFFFFF"
              p={5}
            >
              {cardInfo.info.name || "Город не выбран"}
            </Button>
            <Button
              type="fill"
              fillColor={card?.bgc_header || "#F5F5F5"}
              textColor="#FFFFFF"
              p={5}
            >
              {cardInfo.info.country_name || "Страна не выбран"}
            </Button>
          </ContainerInfoTwoColumnGIB>
        </ContainerInfoHeaderGIB>

        <ContainerInfoBodyGIB p={[5, 15]}>
          {/* <Offset mt={20} /> */}

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
          <Offset mt={5} />

          <ContainerInfoTwoColumnGIB>
            <Button type="transparent" p={10}>
              <InnerBtnContextSpaceBetween>
                <Text text={"Налог"} />
                <Text
                  text={
                    (cardInfo.features as IFeatures).one_card_tax + ""
                  }
                  iconRight={<Icon src={icons.qgCurrencySvg} width={15} />}
                />
              </InnerBtnContextSpaceBetween>
            </Button>
            <Button type="transparent" p={10}>
              <InnerBtnContextSpaceBetween>
                <Text text={"Карты из коллекции"} style={{ marginRight: 2 }} />
                <Text
                  fontWeight={900}
                  text={
                    cardInfo.info.collection_amount + ""
                  }
                />
              </InnerBtnContextSpaceBetween>
            </Button>
          </ContainerInfoTwoColumnGIB>

          <Offset mt={5} />

          <ContainerInfoTwoColumnGIB>
            <Button type="transparent" p={10}>
              <InnerBtnContextSpaceBetween>
                <Text text={"С коллекцией"} />
                <Text
                  text={
                    (cardInfo.features as IFeatures).monopoly_tax + ""
                  }
                  iconRight={<Icon src={icons.qgCurrencySvg} width={15} />}
                />
              </InnerBtnContextSpaceBetween>
            </Button>
            <Button
              type="transparent"
              p={10}
              disabled={isClick || !(actions?.build)} // Assuming this button is disabled
              // disabled={isClick || !(card?.owner?.can_build && actions?.build)} // Assuming this button is disabled
              // disabled={true}
              onClick={() => {
                temporaryDisableBtn(5000, setIsClick);
                handleAction({
                  action: "build",
                  card_id: card?.id,
                });
              }}
            >
              <InnerBtnContextSpaceBetween>
                <Text text={"Купить дом"} />
                <Text
                  text={cardInfo.prices?.house + ""}
                  iconRight={<Icon src={icons.qgCurrencySvg} width={15} />}
                />
              </InnerBtnContextSpaceBetween>
            </Button>
          </ContainerInfoTwoColumnGIB>
          <Offset mt={5} />

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
                    {(cardInfo.features as IFeatures)
                      ?.house_taxes &&
                      getPriceTaxesFromHouses(
                        amountHouses,
                        (cardInfo.features as IFeatures)
                          ?.house_taxes
                      )?.name}
                    {
                      amountHouses <
                        (cardInfo.features as IFeatures)?.house_taxes
                        ?.length ? (
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
                    (cardInfo.features as IFeatures)?.house_taxes &&
                    getPriceTaxesFromHouses(
                      amountHouses,
                      (cardInfo.features as IFeatures)?.house_taxes
                    )?.price + ""
                  }
                  iconRight={<Icon src={icons.qgCurrencySvg} width={15} />}
                />
              </InnerBtnContextSpaceBetween>
            </Button>
            <Button
              type="transparent"
              p={10}
              disabled={
                isClick ||
                !(
                  // card.owner.can_build &&
                  actions.build &&
                  card.owner.houses === 4
                )
              } // Assuming this button is disabled
              onClick={() => {
                temporaryDisableBtn(5000, setIsClick);
                handleAction({
                  action: "build",
                  card_id: card.id,
                });
              }}
            >
              <InnerBtnContextSpaceBetween>
                <Text text={"Купить отель"} />
                <Text
                  text={cardInfo.prices?.hotel + ""}
                  iconRight={<Icon src={icons.qgCurrencySvg} width={15} />}
                />
              </InnerBtnContextSpaceBetween>
            </Button>
          </ContainerInfoTwoColumnGIB>
          <Offset mt={5 } />

          <ContainerInfoTwoColumnGIB>
            <Button
              type="fill"
              fillColor={"rgba(239, 238, 255, 1)"}
              textColor="#000"
              p={10}
            >
              <InnerBtnContextSpaceBetween>
                <Text
                // text={'Итоговый налог (?)'}
                >
                  Итоговый налог{" "}
                  <Button
                    type="fill-empty"
                    textColor="#FFFFFF"
                    onClick={() => alert("info")}
                    component={"div"}
                  >
                    <Text style={{ display: "flex" }}>(?)</Text>
                  </Button>
                </Text>
                <Text
                  text={"0"}
                  iconRight={<Icon src={icons.qgCurrencySvg} width={15} />}
                />
              </InnerBtnContextSpaceBetween>
            </Button>
            <Button
              type="fill"
              fillColor={"rgba(239, 238, 255, 1)"}
              p={10}
              onClick={() => handleChangeScreen("actions")}
            >
              <Text text={"Действия с картой"} />
            </Button>
          </ContainerInfoTwoColumnGIB>
        </ContainerInfoBodyGIB>

        <ContainerInfoFooterGIB
          p={"0 15px"}
          style={{
            backgroundColor: "rgb(229 228 255)",
          }}
        >
          <FooterInfoBoardContainer
            bgc={"transparent"}
            bgcBtn={"rgb(215 217 244)"}
          />
        </ContainerInfoFooterGIB>
      </ContainerInfoGIB>
    </ContainerGIB>
  );
}

export default InfoCard