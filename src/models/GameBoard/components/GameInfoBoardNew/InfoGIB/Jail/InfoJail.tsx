import React from "react";
import { icons } from "../../../../../../assets";
import { Button, Offset } from "../../../../../../shared/UI";
import Icon from "../../../../../../shared/UI/Icon/Icon";
import Text from "../../../../../../shared/UI/Text/Text";
import Title from "../../../../../../shared/UI/Title/Title";
import { CardDataDataActionsJailType } from "../../../../../../store/quick-game/quick-game.d";
import ContainerGIB from "../../components/UI/ContainerGIB/ContainerGIB";
import ContainerInfoBodyGIB from "../../components/UI/ContainerGIB/ContainerInfoBodyGIB";
import ContainerInfoHeaderGIB from "../../components/UI/ContainerGIB/ContainerInfoHeaderGIB";
import ContainerInfoTwoColumnGIB from "../../components/UI/ContainerGIB/ContainerInfoTwoColumnGIB";
import { temporaryDisableBtn } from "../../../../../../helpers/helper";


interface IInfoJailProps {
  labelColors?: string[];
  labelTextColors?: string[];
  wait?: boolean;
  buy_or_auction_card?: boolean;

  actions: CardDataDataActionsJailType;
  numberField?: number;
  card_cost?: number;
  game_id: number;
  card_id: number;
  dataCard: any; //IDataContainer;
  handleCard?: ({
    game_id,
    card_id,
    action,
  }: {
    action: string;
    game_id: number;
    card_id: number;
  }) => void;
}

export const InfoJail: React.FC<IInfoJailProps> = ({
	game_id,
	card_id,
	handleCard,
	actions,
}: IInfoJailProps) => {
	const [ isClickBtn, setIsClickBtn ] =  React.useState(false);

	const handlePayFreedom = function () {
		temporaryDisableBtn(2000, setIsClickBtn);
		handleCard && handleCard({
			action: 'pay_for_freedom',
			game_id,
			card_id,
		})
	}

	const handleThrowDice = function () {
		temporaryDisableBtn(2000, setIsClickBtn);
		handleCard && handleCard({
			action: 'roll_the_dice',
			game_id,
			card_id,
		});
	}
	const handleUseFreedomCard = function () {
		temporaryDisableBtn(2000, setIsClickBtn);
		handleCard && handleCard({
			action: 'freedom_card',
			game_id,
			card_id,
		});
	}

	return (
    <ContainerGIB name="InfoJail">
      <Icon src={icons.logo} width="100%" height="100%" backgroundFont />
      <ContainerInfoHeaderGIB>
        <Offset mt={30} />

        <Title title={"Вы в тюрьме"} tag="h3" center />
      </ContainerInfoHeaderGIB>
      {/* -------------- */}
      <Offset mt={30} />
      <ContainerInfoBodyGIB>
        <ContainerInfoTwoColumnGIB>
          <Button
            type="fill"
            p={10}
            disabled={isClickBtn || !actions.pay_for_freedom}
            onClick={handlePayFreedom}
          >
            <Text text={"Заплатить за освобождение"} />
          </Button>
          <Text
            text={"Заплатить за освобождение - оплатить штраф 50 МОНО и выйти из тюрьмы."}
            fontWeight={300}
            fontSize={12}
            color={"rgba(78, 76, 109, 1)"}
          />
        </ContainerInfoTwoColumnGIB>

        <Offset mt={10} />

        <ContainerInfoTwoColumnGIB>
          <Button
            type="fill"
            p={10}
            disabled={isClickBtn || !actions.roll_the_dice}
            onClick={handleThrowDice}
          >
            <Text text={"Кинуть кубики"} />
          </Button>

          <Text
            text={"Кинуть кубики - если вам выпадет дубль вы выйдите из тюрьмы, если за 3 хода вам не выпалит дубль вам придется оплатить штраф 50 МОНО."}
            fontWeight={300}
            fontSize={12}
            color={"rgba(78, 76, 109, 1)"}
          />
        </ContainerInfoTwoColumnGIB>
        <Offset mt={10} />

        <ContainerInfoTwoColumnGIB>
          <Button
            type="fill"
            p={10}
            disabled={isClickBtn || !actions.freedom_card}
            onClick={handleUseFreedomCard}
          >
            <Text text={'Использовать "Карта свободы"'} />
          </Button>

          <Text
            text={"Использовать «Карта свободы» - если у вас есть «Карта свободы» вы можете использовать ее для выхода из тюрьмы."}
            fontWeight={300}
            fontSize={12}
            color={"rgba(78, 76, 109, 1)"}
          />
        </ContainerInfoTwoColumnGIB>
      </ContainerInfoBodyGIB>
    </ContainerGIB>
  );
};
