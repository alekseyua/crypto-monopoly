import React from "react";
import { Button, Offset } from "../../../../../../shared/UI";
import Title from "../../../../../../shared/UI/Title/Title";
import ContainerOneBtn from "../../ControllerGIB/ContainerOneBtn";
import GameInfoBoardFooterContainer from "../../FooterGIB/GameInfoBoardFooterContainer";
import ContainerGIB from "../../UIContainerGIB/ContainerGIB";
import ContainerInfoBodyGIB from "../../UIContainerGIB/InfoGIB/ContainerInfoBodyGIB";
import ContainerInfoFooterGIB from "../../UIContainerGIB/InfoGIB/ContainerInfoFooterGIB";
import ContainerInfoHeaderGIB from "../../UIContainerGIB/InfoGIB/ContainerInfoHeaderGIB";
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
    <ContainerGIB style={{ background: "#E9ECFF" }}>
      <ContainerInfoHeaderGIB>
        <Offset mt={30} />

        <Title title={title} tag="h1" center />
      </ContainerInfoHeaderGIB>
      <Offset mt={50} />
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
