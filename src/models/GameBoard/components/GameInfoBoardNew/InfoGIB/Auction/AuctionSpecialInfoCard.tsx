import { icons } from '../../../../../../assets';
import { Button, Offset } from '../../../../../../shared/UI';
import Icon from '../../../../../../shared/UI/Icon/Icon';
import React from 'react';
import AutoCounter from '../../../../../../Component/AutoCounter/AutoCounter';
import ContainerGIB from '../../components/UI/ContainerGIB/ContainerGIB';
import ContainerInfoHeaderGIB from '../../components/UI/ContainerGIB/ContainerInfoHeaderGIB';
import ContainerInfoBodyGIB from '../../components/UI/ContainerGIB/ContainerInfoBodyGIB';
import Title from '../../../../../../shared/UI/Title/Title';
import Text from '../../../../../../shared/UI/Text/Text';
import ContainerInfoTwoColumnGIB from '../../components/UI/ContainerGIB/ContainerInfoTwoColumnGIB';
import InnerBtnContextSpaceBetween from '../../components/UI/ControllerGIB/InnerBtnContextSpaceBetween';
import ContainerInfoFooterGIB from '../../components/UI/ContainerGIB/ContainerInfoFooterGIB';
import { ISpecialCardInfo } from '../../../../../../store/quick-game/quick-game.type';
import ContainerOneBtn from '../../components/UI/ControllerGIB/ContainerOneBtn';
import GameInfoBoardFooterContainer from '../../FooterGIB/GameInfoBoardFooterContainer';

interface IProps {
  endTime: number;
  resetTimer: boolean;
  cardInfo: ISpecialCardInfo;
  handleChangeScreen: ({ path }: { path: string }) => void;
}
export const AuctionSpecialInfoCard: React.FC<IProps> = ({
	endTime,
	cardInfo,
	resetTimer,
	handleChangeScreen,
}: IProps) => {
	return (
    <ContainerGIB name="AuctionSpecialInfoCard"
      style={{
        background: "#FFEFD3",
      }}
    >
      {/* -------header---------- */}
      <ContainerInfoHeaderGIB p={0}>
        <Offset mt={10} />

        <ContainerOneBtn>
          <Button
            type="fill"
            fillColor="linear-gradient(to right, #E4863F 0%, #E4863F 70%, #FAD660 100%)"
            p={10}
          >
            {cardInfo.name}
          </Button>
        </ContainerOneBtn>
      </ContainerInfoHeaderGIB>
      <Offset mt={20} />

      {/* ---------body------------- */}
      <ContainerInfoBodyGIB p={0}>
        <Text>
          Окончание торгов:
          {
            <AutoCounter
              counter={endTime}
              callback={() => {}}
              disabled={resetTimer}
            />
          }
        </Text>
        <Offset mt={20} />

        <ContainerInfoTwoColumnGIB>
          <Title
            title={"Характеристики карты"}
            tag="h4"
            fontWeight={300}
            center
          />
          <Title title={"Торги"} tag="h4" fontWeight={300} center />
        </ContainerInfoTwoColumnGIB>
        <Offset mt={10} />

        <ContainerInfoTwoColumnGIB>
          <Button type="transparent" p={10} borderColor="#EDBA60">
            <InnerBtnContextSpaceBetween>
              <Text text={"Налог"} />
              <Text
                text={cardInfo?.one_card_tax + ""}
                iconRight={<Icon src={icons.qgCurrencySvg} width={15} />}
              />
            </InnerBtnContextSpaceBetween>
          </Button>
          <Button
            type="transparent"
            p={10}
            component="div"
            borderColor="#EDBA60"
          >
            <InnerBtnContextSpaceBetween>
              <Button
                type="fill-empty"
                textColor="rgba(78, 76, 109, 1)"
                onClick={() => alert("info")}
              >
                <Text
                  fontWeight={300}
                  fontSize={12}
                  color={"rgba(78, 76, 109, 1)"}
                  start
                >
                  Начальная цена (?)
                </Text>
              </Button>
              <Text
                text={cardInfo?.start_price + ""}
                iconRight={<Icon src={icons.qgCurrencySvg} width={15} />}
              />
            </InnerBtnContextSpaceBetween>
          </Button>
        </ContainerInfoTwoColumnGIB>
        <Offset mt={10} />

        <ContainerInfoTwoColumnGIB>
          <Button type="transparent" p={10} borderColor="#EDBA60">
            <InnerBtnContextSpaceBetween>
              <Text text={"С коллекцией"} />
              <Text
                text={cardInfo?.monopoly_tax + ""}
                iconRight={<Icon src={icons.qgCurrencySvg} width={15} />}
              />
            </InnerBtnContextSpaceBetween>
          </Button>
          <Button
            type="fill"
            fillColor="#FFFAF0"
            borderColor=""
            p={10}
            onClick={() =>
              handleChangeScreen && handleChangeScreen({ path: "place-bet" })
            }
          >
            <InnerBtnContextSpaceBetween>
              <Text>Сделать ставку</Text>
              <Text
                text={"> 0"}
                iconRight={<Icon src={icons.qgCurrencySvg} width={15} />}
              />
            </InnerBtnContextSpaceBetween>
          </Button>
        </ContainerInfoTwoColumnGIB>
        <Offset mt={10} />
      </ContainerInfoBodyGIB>

      {/* ---------footer----------- */}

      <ContainerInfoFooterGIB style={{ padding: 0 }}>
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
