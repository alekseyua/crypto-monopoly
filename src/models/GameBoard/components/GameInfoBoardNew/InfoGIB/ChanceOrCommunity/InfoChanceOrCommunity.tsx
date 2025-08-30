import { Button, Offset } from "../../../../../../shared/UI";
import Title from "../../../../../../shared/UI/Title/Title";
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
}

export const InfoChanceOrCommunity: React.FC<IInfoChanceOrCommunityProps> = ({
	onMove,
	actions,
	title = 'Время вашего хода',
	// titleBtns,
	content,
	cardIdWhereMoveTo,
}: IInfoChanceOrCommunityProps) => {
	// console.log({action})
	const getNameBtn = function (name: string) {
			if(name === undefined) return '';
      switch (name) {
        case "move_to":
          return "Перейти";
        case "pay":
          return "Оплатить";
        default:
          return "Получить";
      }
	}
	return (
    <ContainerGIB style={{ background: "#E9ECFF" }}>
      <ContainerInfoHeaderGIB>
        <ContainerOneBtn>
          <Button variant="gradient" gradientColors={["#726CED", "#70DCF1"]}>
            {title}
          </Button>
        </ContainerOneBtn>
      </ContainerInfoHeaderGIB>
      <Offset mt={70} />
      <ContainerInfoBodyGIB>
        <Title tag="h2" title={content} center />
        <Offset mt={30} />
        <ContainerTwoBtn style={{gridTemplateColumns: actions?.length === 2? '1fr 1fr' : '1fr'}}>
          {actions?.length &&
            actions.map((a: string, i: number) => {
              return (
                <Button
                  variant="fill"
                  fillColor={"#726CED"}
                  p={20}
                  onClick={() =>
                    onMove({
                      action: a,
                      card_id: cardIdWhereMoveTo,
                    })
                  }
                >
                  {getNameBtn(a)}
                </Button>
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
