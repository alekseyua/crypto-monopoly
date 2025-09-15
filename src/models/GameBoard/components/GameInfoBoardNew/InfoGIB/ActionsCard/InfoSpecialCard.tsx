import React from 'react';
import ContainerGIB from '../../UIContainerGIB/ContainerGIB';
import ContainerInfoHeaderGIB from '../../UIContainerGIB/InfoGIB/ContainerInfoHeaderGIB';
import ContainerInfoBodyGIB from '../../UIContainerGIB/InfoGIB/ContainerInfoBodyGIB';
import ContainerInfoFooterGIB from '../../UIContainerGIB/InfoGIB/ContainerInfoFooterGIB';
import ContainerInfoGIB from '../../UIContainerGIB/InfoGIB/ContainerInfoGIB';
import { ISpecialCard } from '../../../../../../store/quick-game/quick-game.d';
import { Button, Offset } from '../../../../../../shared/UI';
import Title from '../../../../../../shared/UI/Title/Title';
import AutoCounter from '../../../../../../Component/AutoCounter/AutoCounter';
import ContainerOneBtn from '../../ControllerGIB/ContainerOneBtn';
import { adjustColorBrightness, getPriceTaxesFromHouses, temporaryDisableBtn } from '../../../../../../helpers/helper';
import ContainerInfoTwoColumnGIB from '../../UIContainerGIB/InfoGIB/ContainerInfoTwoColumnGIB';
import InnerBtnContextSpaceBetween from '../../ControllerGIB/InnerBtnContextSpaceBetween';
import Text from '../../../../../../shared/UI/Text/Text';
import { icons } from '../../../../../../assets';
import Icon from '../../../../../../shared/UI/Icon/Icon';
import GameInfoBoardFooterContainer from '../../FooterGIB/GameInfoBoardFooterContainer';

interface IProps {
  handleChangeScreen: (newScreen: 'action-card' | 'action-special-card' | 'actions') => void;
  handleBack: (p: any) => void; // Optional, assuming you might want to go back
  card: ISpecialCard;
  timeEndMove: number;
  setAmountHouses: (amount: number) => void; // Function to set amount of houses
  amountHouses: number; // Current amount of houses
  handleAction: (p: any)=>void;
	actions: { [key: string]: boolean }

}

const InfoSpecialCard: React.FC<IProps> = ({
  card,
  actions,
  timeEndMove,
  handleBack,
  amountHouses,
  handleAction,
  setAmountHouses,
  handleChangeScreen,
}: IProps) => {
  const [isClick, setIsClick] = React.useState<boolean>(false);
  return (
    <ContainerGIB>
      <Offset mt={5} />
      <Title title={"Действия с картой"} tag="h3" fontWeight={500} />
      <Offset mt={15} />
      <ContainerOneBtn>
        <Button
          type="empty"
          borderColor="#E4E4E4"
          p={11}
          disabled={isClick}
          onClick={() =>{
            temporaryDisableBtn(2000, setIsClick);
            handleBack({
              action: "clean_chose_actions",
            })
          }}
        >
          <Text fontWeight={300} fontSize={14} center>
            <>
              До хода
              <AutoCounter counter={timeEndMove} callback={() => {}} />
              секунд
            </>
          </Text>
        </Button>
      </ContainerOneBtn>

      <Offset mt={15} />
      <ContainerInfoGIB
        style={{
          backgroundColor: "rgba(233, 236, 255, 1)",
        }}
      >
        <ContainerInfoHeaderGIB p={"0 15px"}>
          <Offset mt={20} />
          <ContainerOneBtn>
            <Button
              type="fill"
              fillColor={card?.bgc_header || "#F5F5F5"}
              textColor="#FFFFFF"
              p={12}
            >
              {card?.card_info.name || "Страна не выбран"}
            </Button>
          </ContainerOneBtn>
        </ContainerInfoHeaderGIB>

        <ContainerInfoBodyGIB p={"0 15px"}>
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
                  iconRight={<Icon src={icons.qgCurrencySvg} width={"15px"} />}
                />
              </InnerBtnContextSpaceBetween>
            </Button>
            {/* <Button
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
            </Button> */}
            <Button type="transparent" p={10}>
              <InnerBtnContextSpaceBetween>
                <Text text={"С коллекцией"} />
                <Text
                  text={card?.card_info?.monopoly_tax + ""}
                  iconRight={<Icon src={icons.qgCurrencySvg} width={"15px"} />}
                />
              </InnerBtnContextSpaceBetween>
            </Button>
          </ContainerInfoTwoColumnGIB>

          <Offset mt={10} />

          <ContainerInfoTwoColumnGIB>
            <div></div>
            <Button
              type="fill"
              fillColor={"rgba(239, 238, 255, 1)"}
              borderColor=""
              p={10}
              onClick={() => handleChangeScreen("actions")}
            >
              <Text start text={"Действия с картой"} />
            </Button>
          </ContainerInfoTwoColumnGIB>
        </ContainerInfoBodyGIB>

        <ContainerInfoFooterGIB
          p={"0 15px"}
          style={{
            backgroundColor: "rgb(229 228 255)",
          }}
        >
          <GameInfoBoardFooterContainer
            bgc={"transparent"}
            bgcBtn={"rgb(215 217 244)"}
          />
        </ContainerInfoFooterGIB>
      </ContainerInfoGIB>
    </ContainerGIB>
  );
}

export default InfoSpecialCard