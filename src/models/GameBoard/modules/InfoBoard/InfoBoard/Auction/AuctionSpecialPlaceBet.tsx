import { icons } from "../../../../../../assets";
import { Button, Input, Offset } from "../../../../../../shared/UI";
import Icon from "../../../../../../shared/UI/Icon/Icon";
import React, { useEffect } from "react";
import { temporaryDisableBtn } from "../../../../../../helpers/helper";
import AutoCounter from "../../../../../../Component/AutoCounter/AutoCounter";
import ContainerOneBtn from "../../components/UI/ControllerGIB/ContainerOneBtn";
import ContainerInfoHeaderGIB from "../../components/UI/ContainerGIB/ContainerInfoHeaderGIB";
import ContainerInfoBodyGIB from "../../components/UI/ContainerGIB/ContainerInfoBodyGIB";
import Text from "../../../../../../shared/UI/Text/Text";
import ButtonBack from "../../../../../../shared/UI/Buttons/ButtonBack/ButtonBack";
import ContainerInfoTwoColumnGIB from "../../components/UI/ContainerGIB/ContainerInfoTwoColumnGIB";
import { ISpecialCardInfo } from "../../../../../../store/quick-game/quick-game.type";
import InnerBtnContextSpaceBetween from "../../components/UI/ControllerGIB/InnerBtnContextSpaceBetween";
import ContainerInfoFooterGIB from "../../components/UI/ContainerGIB/ContainerInfoFooterGIB";
import FooterInfoBoardContainer from "../../FooterInfoBoard/FooterInfoBoardContainer";
import ContainerGIB from "../../components/UI/ContainerGIB/ContainerGIB";

interface IProps {
  cardInfo: ISpecialCardInfo;
  endTime: number;
  handleChangeScreen: ({ path }: { path: string }) => void;
  handleCard: (p: any) => void;
  startPrice: number;
  highest_bid: number;
  game_id: number;
  card_id: number;
  resetTimer: boolean;
}

export const AuctionSpecialPlaceBet: React.FC<IProps> = ({
  game_id,
  card_id,
  endTime,
  cardInfo,
  startPrice,
  resetTimer,
  highest_bid,
  handleCard,
  handleChangeScreen,
}: IProps) => {
  const [currentBet, setCurrentBet] = React.useState<number>(highest_bid);
  const [isClick, setIsClick] = React.useState<boolean>(false);
  const styles: any = {};
  useEffect(() => {
    setCurrentBet(highest_bid);
  }, [highest_bid]);
  return (
    <ContainerGIB name="AuctionSpecialPlaceBet"
      style={{
        background: "#FFEFD3",
      }}
    >
      {/* -------header---------- */}
      <ContainerInfoHeaderGIB p={0}>
        <ContainerOneBtn>
          <Button
            p={10}
            // fillColor={cards.filter((c:ICard)=> c.id === card_id)[0].bgc_header}
            fillColor="linear-gradient(to right, #E4863F 0%, #E4863F 70%, #FAD660 100%)"
          >
            {cardInfo.info.name}
          </Button>
        </ContainerOneBtn>
      </ContainerInfoHeaderGIB>
      <Offset mt={10} />
      {/* ---------body------------- */}
      <ContainerInfoBodyGIB p={0}>
        <Text>
          Окончание торгов:
          {
            <AutoCounter
              counter={endTime}
              callback={() => {}}
              disabled={resetTimer}
            />
          }
        </Text>
        <Offset mt={20} />
        <ContainerOneBtn>
          <ButtonBack
            onClick={() =>
              handleChangeScreen && handleChangeScreen({ path: "auction" })
            }
            title={"Назад"}
          />
        </ContainerOneBtn>
        <Offset mt={10} />

        <ContainerInfoTwoColumnGIB>
          <Input
            wrapClassName={styles["gib__input-bet-auction"]}
            placeholder="Введите вашу ставку"
            value={currentBet}
            onChange={(e) => {
              const numericValue = parseFloat(e.target.value);
              setCurrentBet(numericValue);
            }}
            type="number"
            id="input-bet-auction"
          />
          <Text
            fontSize={12}
            color="#4E4C6D"
            style={{ display: "inline-block" }}
          >
            Ставка должна быть не ниже начальной цены (выше&nbsp;
            {startPrice}
            <Icon
              src={icons.qgCurrencySvgWhite}
              width={14}
              height={14}
              ml={4}
              display="inline-block"
            />
            )
          </Text>
        </ContainerInfoTwoColumnGIB>
        <Offset mt={10} />

        <ContainerInfoTwoColumnGIB>
          <Button
            fillColor="#FFE4B5"
            p={10}
            disabled={isClick || !currentBet || currentBet <= startPrice}
            className={styles["gib__btn-action-place-bet-auction"]}
            onClick={() => {
              temporaryDisableBtn(5000, setIsClick);
              handleCard &&
                handleCard({
                  action: "bid_auction",
                  game_id,
                  card_id,
                  bid: currentBet,
                });
            }}
          >
            <InnerBtnContextSpaceBetween>
              <Text text={"Сделать ставку"} />
              <Text
                text={currentBet + ""}
                iconRight={<Icon src={icons.qgCurrencySvg} width={15} />}
              />
            </InnerBtnContextSpaceBetween>
          </Button>
          <Text fontSize={12} color="#4E4C6D">
            Сумма вашей ставки и комиссия будет заморожена до конца торгов
          </Text>
        </ContainerInfoTwoColumnGIB>
        <Offset mt={10} />

        <ContainerInfoTwoColumnGIB>
          <Button
            fillColor="#FFE4B5"
            p={10}
            disabled={isClick || !currentBet || currentBet < startPrice}
            className={styles["gib__btn-action-place-bet-auction"]}
            onClick={() => {
              temporaryDisableBtn(5000, setIsClick);
              handleCard &&
                handleCard({
                  action: "bid_auction",
                  game_id,
                  card_id,
                  bid: currentBet,
                });
            }}
          >
            <Text fontSize={12} color="#4E4C6D">
              Правила проведения торгов
            </Text>
          </Button>
        </ContainerInfoTwoColumnGIB>
      </ContainerInfoBodyGIB>
      {/* ---------footer----------- */}

      <ContainerInfoFooterGIB>
        <FooterInfoBoardContainer
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
