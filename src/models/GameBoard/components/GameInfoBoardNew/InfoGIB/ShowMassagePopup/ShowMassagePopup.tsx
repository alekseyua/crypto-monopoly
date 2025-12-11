import React from "react";
import { Button, Offset } from "../../../../../../shared/UI";
import Title from "../../../../../../shared/UI/Title/Title";
import ContainerOneBtn from "../../components/UI/ControllerGIB/ContainerOneBtn";
import GameInfoBoardFooterContainer from "../../FooterGIB/GameInfoBoardFooterContainer";
import ContainerGIB from "../../components/UI/ContainerGIB/ContainerGIB";
import ContainerInfoBodyGIB from "../../components/UI/ContainerGIB/ContainerInfoBodyGIB";
import ContainerInfoFooterGIB from "../../components/UI/ContainerGIB/ContainerInfoFooterGIB";
import ContainerInfoHeaderGIB from "../../components/UI/ContainerGIB/ContainerInfoHeaderGIB";
import { temporaryDisableBtn } from "../../../../../../helpers/helper";

interface IProps {
  handleClick: (params: any) => void;
  title?: string;
  typeCard: string;
}

export const ShowMassagePopup: React.FC<IProps> = ({
  handleClick,
  title,
}: IProps) => {
  const [isClick, setIsClick] = React.useState(false);
  return (
    <ContainerGIB name="ShowMassagePopup" style={{ background: "#E9ECFF" }}>
      <ContainerInfoHeaderGIB>
        <Offset mt={20} />

        <Title title={title} tag="h1" center />
      </ContainerInfoHeaderGIB>
      <Offset mt={30} />
      <ContainerInfoBodyGIB>
        <ContainerOneBtn>
          <Button
            p={15}
            variant="gradient"
            gradientColors={["#726CED", "#70DCF1"]}
            disabled={isClick}
            onClick={() =>{
              temporaryDisableBtn(2000, setIsClick);
              handleClick({
                action: "clean_popup_data",
              })
            }}
          >
            ok
          </Button>
        </ContainerOneBtn>
      </ContainerInfoBodyGIB>

      <ContainerInfoFooterGIB>
        <GameInfoBoardFooterContainer bgc={"#CFD3ED4D"} />
      </ContainerInfoFooterGIB>
    </ContainerGIB>
  );
};
