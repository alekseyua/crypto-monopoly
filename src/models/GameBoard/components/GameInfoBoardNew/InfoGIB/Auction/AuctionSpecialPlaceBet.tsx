import { icons } from "../../../../../../assets";
import { Button, Input, Offset } from "../../../../../../shared/UI";
import Icon from "../../../../../../shared/UI/Icon/Icon";
import React, { useEffect } from "react";
import { temporaryDisableBtn } from "../../../../../../helpers/helper";
import GameInfoBoardFooterContainer from "../../../GameInfoBoardFooter/GameInfoBoardFooterContainer";
import AutoCounter from "../../../../../../Component/AutoCounter/AutoCounter";
import ContainerGIB from "../../UIContainerGIB/ContainerGIB";
import ContainerOneBtn from "../../ControllerGIB/ContainerOneBtn";
import ContainerInfoHeaderGIB from "../../UIContainerGIB/InfoGIB/ContainerInfoHeaderGIB";
import ContainerInfoBodyGIB from "../../UIContainerGIB/InfoGIB/ContainerInfoBodyGIB";
import Text from "../../../../../../shared/UI/Text/Text";
import ButtonBack from "../../../../../../shared/UI/Buttons/ButtonBack/ButtonBack";
import ContainerInfoTwoColumnGIB from "../../UIContainerGIB/InfoGIB/ContainerInfoTwoColumnGIB";
import { ISpecialCardInfo } from "../../../../../../store/quick-game/quick-game.d";
import InnerBtnContextSpaceBetween from "../../ControllerGIB/InnerBtnContextSpaceBetween";
import ContainerInfoFooterGIB from "../../UIContainerGIB/InfoGIB/ContainerInfoFooterGIB";

interface IProps {
  cardInfo: ISpecialCardInfo;
  endTime: number;
  handleChangeScreen: ({ path }: { path: string }) => void;
  handleCard: (p: any) => void;
  startPrice: number;
  highest_bid: number;
  game_id: number;
  card_id: number;
}

export const AuctionSpecialPlaceBet: React.FC<IProps> = ({
  endTime,
  cardInfo,
  startPrice,
  handleChangeScreen,
  highest_bid,
  game_id,
  card_id,
  handleCard,
}: IProps) => {
  const [currentBet, setCurrentBet] = React.useState<number>(highest_bid);
  const [isClick, setIsClick] = React.useState<boolean>(false);
  const styles: any = {};
  useEffect(() => {
    setCurrentBet(highest_bid);
  }, [highest_bid]);
  return (
    <ContainerGIB
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
            {cardInfo.name}
          </Button>
        </ContainerOneBtn>
      </ContainerInfoHeaderGIB>
      <Offset mt={10} />
      {/* ---------body------------- */}
      <ContainerInfoBodyGIB p={0}>
        <Text>
          Окончание торгов:
          {<AutoCounter counter={endTime} callback={() => {}} />}
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
              width="14"
              height="14"
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
            disabled={isClick || (!currentBet || currentBet < startPrice)}
            className={styles["gib__btn-action-place-bet-auction"]}
            onClick={() => {
              temporaryDisableBtn(2000, setIsClick);
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
                iconRight={<Icon src={icons.qgCurrencySvg} width={"15px"} />}
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
            disabled={isClick || (!currentBet || currentBet < startPrice)}
            className={styles["gib__btn-action-place-bet-auction"]}
            onClick={() => {
              temporaryDisableBtn(2000, setIsClick);
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
