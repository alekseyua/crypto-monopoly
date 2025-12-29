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
import { ICard, ISpecialCard } from "../../../../../../store/quick-game/quick-game.type";
import ContainerInfoTwoColumnGIB from "../../components/UI/ContainerGIB/ContainerInfoTwoColumnGIB";
import InnerBtnContextSpaceBetween from "../../components/UI/ControllerGIB/InnerBtnContextSpaceBetween";
import Text from "../../../../../../shared/UI/Text/Text";
import GameInfoBoardFooterContainer from "../../FooterGIB/GameInfoBoardFooterContainer";


interface IAuctionExpressAirlineCruiseProps {
  card: ISpecialCard;
  game_id: number;
  card_id: number;
  actions: { [key: string]: boolean };
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

export const AuctionExpressAirlineCruise: React.FC<IAuctionExpressAirlineCruiseProps> = ({
	game_id,
	card_id,
	handleCard,
	actions,
	timeEndMove,
	card,
}: IAuctionExpressAirlineCruiseProps) => {
		const [ isActionCard, setIsActionCard ] = React.useState<boolean>(false);
	const handleBuyCard = function() {
		handleCard && handleCard({
			action: 'buy',
			game_id,
			card_id,
		})
	}

	const handleAuction = function() {
		setIsActionCard(true);
		handleCard && handleCard({
			action: 'start_auction',
			game_id,
			card_id,
		});
	}
	return (
    <ContainerGIB name="AuctionExpressAirlineCruise">
      {/* -------header---------- */}
      <ContainerInfoHeaderGIB>
        <Offset mt={20} />
        <Title title={"Вам выпала свободная карта."} tag="h3" center />
        <Offset mt={10} />
        <ContainerTwoBtn>
          <Button
            type="fill"
            p={0}
            disabled={!actions.buy}
            onClick={handleBuyCard}
          >
            Купить за {card?.card_info?.start_price}
            <Icon src={icons.qgCurrencySvgWhite} width={10} height={10} />
          </Button>
          <Button
            type="outline"
            p={0}
            disabled={!actions.auction && isActionCard}
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
        <ContainerInfoGIB
          style={{ background: "#E9ECFF" }} // нужно уточнить за цвет
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
                <Text text={"Налог"} />
                <Text
                  text={card?.card_info?.one_card_tax + ""}
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
                    (card as ISpecialCard)?.card_info?.info?.collection_amount +
                    ""
                  }
                />
              </InnerBtnContextSpaceBetween>
            </Button>
          </ContainerInfoTwoColumnGIB>
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
