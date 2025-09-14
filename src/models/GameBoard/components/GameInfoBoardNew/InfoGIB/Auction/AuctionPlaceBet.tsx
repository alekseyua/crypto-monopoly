import { currency2White, icons, RightArrowIcon } from '../../../../../../assets';
import { Button, Input, Offset } from '../../../../../../shared/UI';
import Icon from '../../../../../../shared/UI/Icon/Icon';
// import styles from '../styles/gib.module.scss';
import React, { useEffect } from 'react';
import { InfoBoardLabel } from '../../../GameInfoBoard/UI/Label/info-board-label';
import { getPriceTaxesFromHouses } from '../../../../../../helpers/helper';
import { IGameInfoBoardAuctionQGProps } from '../../../GameInfoBoard/types/gameInfoBoard';
import GameInfoBoardFooterContainer from '../../../GameInfoBoardFooter/GameInfoBoardFooterContainer';
import AutoCounter from '../../../../../../Component/AutoCounter/AutoCounter';
import { IAuctionProps } from './AuctionContainer';
import ContainerGIB from '../../UIContainerGIB/ContainerGIB';
import ContainerTwoBtn from '../../ControllerGIB/ContainerTwoBtn';
import ContainerOneBtn from '../../ControllerGIB/ContainerOneBtn';
import { ICardInfo } from '../../../../../../store/quick-game/quick-game.d';
import ContainerInfoHeaderGIB from '../../UIContainerGIB/InfoGIB/ContainerInfoHeaderGIB';
import ContainerInfoBodyGIB from '../../UIContainerGIB/InfoGIB/ContainerInfoBodyGIB';
import Text from '../../../../../../shared/UI/Text/Text';
import ButtonBack from '../../../../../../shared/UI/Buttons/ButtonBack/ButtonBack';
import ContainerInfoTwoColumnGIB from '../../UIContainerGIB/InfoGIB/ContainerInfoTwoColumnGIB';
import InnerBtnContextSpaceBetween from '../../ControllerGIB/InnerBtnContextSpaceBetween';
import ContainerInfoFooterGIB from '../../UIContainerGIB/InfoGIB/ContainerInfoFooterGIB';


interface IProps {
  cardInfo: ICardInfo;
  endTime: number;
  handleChangeScreen: ({ path }: { path: string }) => void;
  handleCard: (p: any) => void;
  setTimeEndAuction: (p: any) => void;
  startPrice: number;
  highest_bid: number;
  game_id: number;
  card_id: number;
}

export const AuctionPlaceBet: React.FC<IProps> = ({
  endTime,
  cardInfo,
  startPrice,
  handleChangeScreen,
  highest_bid,
  game_id,
  card_id,
  handleCard,
  setTimeEndAuction,
}: // game_id,
// card_id,
// handleCard,
// typeStyle = 'buy',
// showInfoCard,
// highest_bidder,
// highestBidderData,
IProps) => {
  const [currentBet, setCurrentBet] = React.useState<number>(highest_bid);
  // handleChangeScreen && handleChangeScreen({path: 'auction'})
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
        <ContainerTwoBtn>
          <Button
            p={10}
            // fillColor={cards.filter((c:ICard)=> c.id === card_id)[0].bgc_header}
            fillColor="linear-gradient(to right, #E4863F 0%, #E4863F 70%, #FAD660 100%)"
          >
            {cardInfo.info.name}
          </Button>
          <Button p={10} fillColor="#65B99E">
            {cardInfo.info.country_name}
          </Button>
        </ContainerTwoBtn>
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
              setTimeEndAuction={setTimeEndAuction}
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
              // if (!isNaN(numericValue) && numericValue >= startPrice) {
              setCurrentBet(numericValue);
              // }
              //  else {
              //    setCurrentBet(startPrice);
              // }
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
            disabled={!currentBet || currentBet < startPrice}
            className={styles["gib__btn-action-place-bet-auction"]}
            onClick={() =>
              handleCard &&
              handleCard({
                action: "bid_auction",
                game_id,
                card_id,
                bid: currentBet,
              })
            }
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
            disabled={!currentBet || currentBet < startPrice}
            className={styles["gib__btn-action-place-bet-auction"]}
            onClick={() =>
              handleCard &&
              handleCard({
                action: "bid_auction",
                game_id,
                card_id,
                bid: currentBet,
              })
            }
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

    // 		<GameInfoBoardFooterContainer
    // 			bgc={'#FADDAA'}
    // 			bgcBtn={'#F5CC82'}
    // 		/>
    // 	</div>

    // </div>
  );
};
