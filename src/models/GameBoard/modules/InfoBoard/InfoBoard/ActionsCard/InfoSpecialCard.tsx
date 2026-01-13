import React from "react";
import ContainerGIB from "../../components/UI/ContainerGIB/ContainerGIB";
import ContainerInfoHeaderGIB from "../../components/UI/ContainerGIB/ContainerInfoHeaderGIB";
import ContainerInfoBodyGIB from "../../components/UI/ContainerGIB/ContainerInfoBodyGIB";
import ContainerInfoFooterGIB from "../../components/UI/ContainerGIB/ContainerInfoFooterGIB";
import ContainerInfoGIB from "../../components/UI/ContainerGIB/ContainerInfoGIB";
import { IFeaturesSpecial, ISpecialCard } from "../../../../../../store/quick-game/quick-game.type";
import { Button, Offset } from "../../../../../../shared/UI";
import Title from "../../../../../../shared/UI/Title/Title";
import AutoCounter from "../../../../../../Component/AutoCounter/AutoCounter";
import ContainerOneBtn from "../../components/UI/ControllerGIB/ContainerOneBtn";
import { temporaryDisableBtn } from "../../../../../../helpers/helper";
import ContainerInfoTwoColumnGIB from "../../components/UI/ContainerGIB/ContainerInfoTwoColumnGIB";
import InnerBtnContextSpaceBetween from "../../components/UI/ControllerGIB/InnerBtnContextSpaceBetween";
import Text from "../../../../../../shared/UI/Text/Text";
import { icons } from "../../../../../../assets";
import Icon from "../../../../../../shared/UI/Icon/Icon";
import FooterInfoBoardContainer from "../../FooterInfoBoard/FooterInfoBoardContainer";
import { IActionsChooseData, ICardInfoChooseData } from "../../../../../../store/quick-game/chooseData.type";

interface IProps {
  handleChangeScreen: (
    newScreen: "action-card" | "action-special-card" | "actions"
  ) => void;
  handleBack: (p: any) => void; // Optional, assuming you might want to go back
  card: ISpecialCard;
  timeEndMove: number;
  setAmountHouses: (amount: number) => void; // Function to set amount of houses
  amountHouses: number; // Current amount of houses
  handleAction: (p: any) => void;
  actions: IActionsChooseData; //{ [key: string]: boolean }
  cardInfo: ICardInfoChooseData;

}

const InfoSpecialCard: React.FC<IProps> = ({
  card,
  cardInfo,
  timeEndMove,
  handleBack,
  handleChangeScreen,
}: IProps) => {
  const [isClick, setIsClick] = React.useState<boolean>(false);

  const renderActionBtn = () => {
    return (
      <Button
        type="fill"
        fillColor={"rgba(239, 238, 255, 1)"}
        borderColor=""
        p={10}
        onClick={() => handleChangeScreen("actions")}
      >
        <Text start text={"Действия с картой"} />
      </Button>
    );
  };

  return (
    <ContainerGIB name="InfoSpecialCard" >
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
      {/* <Offset mt={15} /> */}
      <ContainerOneBtn>
        <Button
          type="empty"
          borderColor="#E4E4E4"
          p={[7, 11]}
          disabled={isClick}
          onClick={() => {
            temporaryDisableBtn(5000, setIsClick);
            handleBack({
              action: "clean_chose_actions",
            });
          }}
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
        <ContainerInfoHeaderGIB p={"0 15px"}>
          {/* <Offset mt={20} /> */}
          <ContainerOneBtn>
            <Button
              type="fill"
              fillColor={card?.bgc_header || "#F5F5F5"}
              textColor="#FFFFFF"
              p={12}
            >
              {cardInfo.info.name || "Страна не выбран"}
            </Button>
          </ContainerOneBtn>
        </ContainerInfoHeaderGIB>

        <ContainerInfoBodyGIB p={[5, 15]}>
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
                  text={(cardInfo?.features as IFeaturesSpecial).one_card_tax.toString()}
                  iconRight={<Icon src={icons.qgCurrencySvg} height={13} />}
                />
              </InnerBtnContextSpaceBetween>
            </Button>
            <Button type="transparent" p={10}>
              <InnerBtnContextSpaceBetween>
                <Text text={"Карты из коллекции"} style={{ marginRight: 2 }} />
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
          {!!(cardInfo?.features as IFeaturesSpecial).two_card_tax && (
            <>
              <Offset mt={10} />
              <ContainerInfoTwoColumnGIB>
                <Button type="transparent" p={10}>
                  <InnerBtnContextSpaceBetween>
                    <Text text={"2 карты"} />
                    <Text
                      text={
                        (cardInfo?.features as IFeaturesSpecial).two_card_tax + ""
                      }
                      iconRight={
                        <Icon src={icons.qgCurrencySvg} height={13} />
                      }
                    />
                  </InnerBtnContextSpaceBetween>
                </Button>
               { (cardInfo?.features as IFeaturesSpecial).three_card_tax && (cardInfo?.features as IFeaturesSpecial).monopoly_tax
                ? renderActionBtn()
                : <div></div>} 
              </ContainerInfoTwoColumnGIB>
            </>
          )}
          {!!(cardInfo?.features as IFeaturesSpecial).three_card_tax && (
            <>
              <Offset mt={10} />
              <ContainerInfoTwoColumnGIB>
                <Button type="transparent" p={10}>
                  <InnerBtnContextSpaceBetween>
                    <Text text={"3 карты"} />
                    <Text
                      text={
                        (cardInfo?.features as IFeaturesSpecial).three_card_tax + ""
                      }
                      iconRight={
                        <Icon src={icons.qgCurrencySvg} height={13} />
                      }
                    />
                  </InnerBtnContextSpaceBetween>
                </Button>
                <div></div>
              </ContainerInfoTwoColumnGIB>
            </>
          )}

          {!!(cardInfo?.features as IFeaturesSpecial).monopoly_tax && (
            <>
              <Offset mt={10} />
              <ContainerInfoTwoColumnGIB>
                <Button type="transparent" p={10}>
                  <InnerBtnContextSpaceBetween>
                    <Text text={
                      ((cardInfo?.features as IFeaturesSpecial).one_card_tax && (cardInfo?.features as IFeaturesSpecial).two_card_tax && (cardInfo?.features as IFeaturesSpecial).three_card_tax
                        ? '4'
                        : (cardInfo?.features as IFeaturesSpecial).one_card_tax && (cardInfo?.features as IFeaturesSpecial).two_card_tax
                          ? '3'
                          : '2') +
                      " карты"} />
                    <Text
                      text={
                        (cardInfo?.features as IFeaturesSpecial).monopoly_tax + ""
                      }
                      iconRight={
                        <Icon src={icons.qgCurrencySvg} height={13} />
                      }
                    />
                  </InnerBtnContextSpaceBetween>
                </Button>
               { !(cardInfo?.features as IFeaturesSpecial).two_card_tax && !(cardInfo?.features as IFeaturesSpecial).three_card_tax
                ? renderActionBtn()
                : <div></div>}
              </ContainerInfoTwoColumnGIB>
            </>
          )}

          {/* <Offset mt={5} />

          <ContainerInfoTwoColumnGIB>
            <div></div>
            
          </ContainerInfoTwoColumnGIB> */}
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
};

export default InfoSpecialCard;
