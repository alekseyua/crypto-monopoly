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
import { ICard } from "../../../../../../store/quick-game/quick-game.d";
import ContainerInfoTwoColumnGIB from "../../UIContainerGIB/InfoGIB/ContainerInfoTwoColumnGIB";
import InnerBtnContextSpaceBetween from "../../ControllerGIB/InnerBtnContextSpaceBetween";
import Text from "../../../../../../shared/UI/Text/Text";


interface IAuctionExpressAirlineCruiseProps {
	card: ICard;
	game_id: number;
	card_id: number;
	actions: {[key:string]: boolean}
	handleCard?: ({ game_id, card_id, action }: { action: string; game_id: number, card_id: number }) => void;
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
	console.log({card})
	const handleBuyCard = function() {
		handleCard && handleCard({
			action: 'buy',
			game_id,
			card_id,
		})
	}

	const handleAuction = function() {
		setIsActionCard(true);
		console.log('handleAuction 2');
		handleCard && handleCard({
			action: 'start_auction',
			game_id,
			card_id,
		});
	}
	return (
    <ContainerGIB>
		{/* -------header---------- */}
		 <ContainerInfoHeaderGIB>
        <Offset mt={20} />
        <Title
          title={'Вам выпала свободная карта.'}
          tag='h3'
          center
        />
        <Offset mt={10} />
		<ContainerTwoBtn>
			<Button
				type="fill"
				p={0}
				disabled={!actions.buy}
				onClick={handleBuyCard}>
				Купить за {card?.card_info?.start_price}
				<Icon src={icons.qgCurrencySvgWhite} width="10" height="10" />
			</Button>
			<Button
			type="outline"
				p={0}
				disabled={!actions.auction && isActionCard}
				onClick={handleAuction}>
				Отказ {<AutoCounter counter={timeEndMove} disabled={isActionCard} callback={handleAuction} />}
			</Button>
		</ContainerTwoBtn>
        <Offset mt={10} />

      </ContainerInfoHeaderGIB>
	{/* ---------body------------- */}
	<ContainerInfoBodyGIB>

      <ContainerInfoGIB
	  	style={{ background: '#E9ECFF' }} // нужно уточнить за цвет
	  >
         <Offset mt={20} />

          <ContainerInfoTwoColumnGIB>
            <Title
              title={'Характеристики карты'}
              tag='h5'
              fontWeight={300}
              center
            />
            <Title
              title={'Покупка недвижимости'}
              tag='h5'
              fontWeight={300}
              center
            />
          </ContainerInfoTwoColumnGIB>
          <Offset mt={10} />

 <ContainerInfoTwoColumnGIB>
            <Button
              type='transparent'
              p={10}
            >
              <InnerBtnContextSpaceBetween>
                <Text
                  text={'Налог'}
                />
                <Text
                  text={card?.card_info?.features?.one_card_tax + ''}
                  iconRight={<Icon src={icons.qgCurrencySvg} width={'15px'} />}
                />
              </InnerBtnContextSpaceBetween>
            </Button>
            <Button
              type='transparent'
              p={10}
            >
              <InnerBtnContextSpaceBetween>
                <Text
                  text={'Карты из коллекции'}
                />
                <Text
                  fontWeight={900}
                  text={'2 из 5 ?'}
                />
              </InnerBtnContextSpaceBetween>
            </Button>
          </ContainerInfoTwoColumnGIB>

	  </ContainerInfoGIB>

	</ContainerInfoBodyGIB>

	{/* ---------footer----------- */}
      <ContainerInfoFooterGIB>

	  </ContainerInfoFooterGIB>
	</ContainerGIB>
	);
};
