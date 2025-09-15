import { useCallback } from "react";
import { icons } from "../../../../../../assets";
import { Button, Offset } from "../../../../../../shared/UI";
import Icon from "../../../../../../shared/UI/Icon/Icon";
import Title from "../../../../../../shared/UI/Title/Title";
import { ICard } from "../../../../../../store/quick-game/quick-game.d";
import ContainerOneBtn from "../../ControllerGIB/ContainerOneBtn";
import ContainerTwoBtn from "../../ControllerGIB/ContainerTwoBtn";
import GameInfoBoardFooterContainer from "../../FooterGIB/GameInfoBoardFooterContainer";
import ContainerGIB from "../../UIContainerGIB/ContainerGIB";
import ContainerInfoBodyGIB from "../../UIContainerGIB/InfoGIB/ContainerInfoBodyGIB";
import ContainerInfoFooterGIB from "../../UIContainerGIB/InfoGIB/ContainerInfoFooterGIB";
import ContainerInfoHeaderGIB from "../../UIContainerGIB/InfoGIB/ContainerInfoHeaderGIB";


interface IInfoChanceOrCommunityProps {
  onMove: (params: any) => void;
  title?: string;
  // titleBtns?: string[];
  actions: string[];
  content: string;
  cardIdWhereMoveTo: number | null;
  typeCard: string;
  cards: ICard[];
}

export const InfoChanceOrCommunity: React.FC<IInfoChanceOrCommunityProps> = ({
	onMove,
	actions,
	title = 'Время вашего хода',
	// titleBtns,
  cards,
  typeCard,
	content,
	cardIdWhereMoveTo,
}: IInfoChanceOrCommunityProps) => {
  console.log({cardIdWhereMoveTo})
  const getNameBtn = useCallback(function (name: string) {
    if (name === undefined) return "";
    switch (name) {
      case "move_to":
        return "Перейти";
      case "pay":
        return "Оплатить";
      case "return_house":
        return "Снять дом";
      case "get_house":
        return "получить дом";
      default:
        return "Получить";
    }
  }, []);

  const getInfoCard = function (id: number | null) {
    if (id === null) return null;
    return cards.find((c: ICard) => c.id === id);
  };
  return (
    <ContainerGIB style={{ background: "#E9ECFF" }}>
      <Icon
        src={typeCard === "chance" ? icons.chance : icons.communityOpacity}
        width="100%"
        height="100%"
        style={{
          position: "absolute",
          top: "50%",
          left: " 50%",
          transform: "translate(-50%, -50%) rotate(270deg) scale(4.5)",
          opacity: 0.5,
          zIndex: 1,
        }}
      />
      <ContainerInfoHeaderGIB>
        <ContainerOneBtn>
          <Button p={12} variant="gradient" gradientColors={["#726CED", "#70DCF1"]}>
            {title}
          </Button>
        </ContainerOneBtn>
      </ContainerInfoHeaderGIB>
      <Offset mt={70} />
      <ContainerInfoBodyGIB>
        <Title tag="h2" title={content} center />
        <Offset mt={60} />
        <ContainerTwoBtn
          style={{
            gridTemplateColumns: actions?.length === 2 ? "1fr 1fr" : "1fr",
          }}
        >
          {actions?.length &&
            actions.map((a: string, i: number) => {
              const isActionHouses = a === "return_house" || a === "get_house";
              const card = isActionHouses && getInfoCard(cardIdWhereMoveTo);
              return (
                <div key={i} style={{ zIndex: 2 }}>
                  {!!!cardIdWhereMoveTo && isActionHouses ? (
                    <>
                      <Title
                        tag="h3"
                        title={"Выберите карту что бы " + getNameBtn(a)}
                        center
                      />
                      <Offset mt={20} />
                    </>
                  ) : null}
                  {isActionHouses && card ? (
                    <>
                      <Title
                        tag="h3"
                        title={getNameBtn(a) + " с " + card.name}
                        center
                      />
                      <Offset mt={20} />
                    </>
                  ) : null}
                  <Button
                    key={i}
                    variant="fill"
                    fillColor={"#726CED"}
                    disabled={isActionHouses && !cardIdWhereMoveTo}
                    p={20}
                    onClick={() => {
                      onMove({
                        action: a,
                        card_id: cardIdWhereMoveTo,
                      });
                    }}
                  >
                    {getNameBtn(a)}
                  </Button>
                </div>
              );
            })}
        </ContainerTwoBtn>
      </ContainerInfoBodyGIB>

      <ContainerInfoFooterGIB>
        <GameInfoBoardFooterContainer bgc={"#CFD3ED4D"} />
      </ContainerInfoFooterGIB>
    </ContainerGIB>
  );
};
