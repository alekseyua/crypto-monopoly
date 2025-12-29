import React from 'react'
import ContainerGIB from '../../components/UI/ContainerGIB/ContainerGIB';
import { Button, Offset } from '../../../../../../shared/UI';
import Title from '../../../../../../shared/UI/Title/Title';
import ContainerOneBtn from '../../components/UI/ControllerGIB/ContainerOneBtn';
import Text from '../../../../../../shared/UI/Text/Text';
import AutoCounter from '../../../../../../Component/AutoCounter/AutoCounter';
import ContainerInfoGIB from '../../components/UI/ContainerGIB/ContainerInfoGIB';
import { temporaryDisableBtn } from '../../../../../../helpers/helper';
import ContainerInfoHeaderGIB from '../../components/UI/ContainerGIB/ContainerInfoHeaderGIB';
import ContainerInfoTwoColumnGIB from '../../components/UI/ContainerGIB/ContainerInfoTwoColumnGIB';
import ContainerInfoBodyGIB from '../../components/UI/ContainerGIB/ContainerInfoBodyGIB';
import ContainerInfoFooterGIB from '../../components/UI/ContainerGIB/ContainerInfoFooterGIB';
import GameInfoBoardFooterContainer from '../../FooterGIB/GameInfoBoardFooterContainer';
import ButtonBack from '../../../../../../shared/UI/Buttons/ButtonBack/ButtonBack';
import InnerBtnContextSpaceBetween from '../../components/UI/ControllerGIB/InnerBtnContextSpaceBetween';
import Icon from '../../../../../../shared/UI/Icon/Icon';
import { icons } from '../../../../../../assets';
import { IActionsChooseData, ICardInfoChooseData } from '../../../../../../store/quick-game/chooseData.type';
import { ICard } from '../../../../../../store/quick-game/quick-game.type';

interface IProps {
  handleChangeScreen: (newScreen: 'action-card' | 'action-special-card' | 'actions') => void;
  handleBack: (p: any) => void; // Assuming this is needed for navigation
  handleAction: (params: any) => void; // Function to handle actions like sell
  card: ICard; // Assuming card is an object with properties like owner, city, etc.
  actions: IActionsChooseData // { [key: string]: boolean }
  card_id: number; // Assuming this is the ID of the card being acted upon
  timeEndMove: number; // Optional, assuming it might be used in the future
  showInfoCard: 'action-card' | 'action-special-card' | 'actions';

  colorName: string;
  cardInfo: ICardInfoChooseData;
}

const ActionsCard: React.FC<IProps> = ({
  card,
  card_id,
  actions,
  cardInfo,
  colorName,
  timeEndMove,
  showInfoCard,
  handleBack,
  handleAction,
  handleChangeScreen,
}: IProps) => {
  const [isClick, setIsClick] = React.useState<boolean>(false);
  // console.table((card.card_info as ICardInfoCards).features.sell_price)
  return (
    <ContainerGIB name="ActionsCard">
      {/* <Offset mt={5} /> */}
      {/* крестик на закрытие */}
      <Button
        type="transparent"
        borderColor='transparent'
        disabled={isClick}
        onClick={() => {
          temporaryDisableBtn(5000, setIsClick);
          handleAction({
            action: "clean_chose_actions",
            card_id,
          });
        }}
      >
        <Icon src={icons.crossBlack} width={20} height={20} style={{position: 'absolute', right:20 }}/>
      </Button>
      <Title title={"Действия с картой"} tag="h3" fontWeight={500} />
      <Offset mt={5} />

      <ContainerOneBtn>
        <Button
          type="empty"
          borderColor="#E4E4E4"
          p={[7,11]}
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

      <Offset mt={10} />

      <ContainerInfoGIB
        style={{
          backgroundColor: "rgba(233, 236, 255, 1)",
        }}
      >
        <ContainerInfoHeaderGIB
          p={15}
          style={{
            backgroundColor: "rgb(226 230 255)",
          }}
        >
          {/* <Offset mt={20} /> */}
          {showInfoCard === "action-special-card" ? (
            <ContainerOneBtn>
              <Button
                type="fill"
                fillColor={colorName}
                textColor="#FFFFFF"
                p={12}
              >
                {cardInfo.info.name || "Город не выбран"}
              </Button>
            </ContainerOneBtn>
          ) : (
            <ContainerInfoTwoColumnGIB>
              <Button
                type="fill"
                fillColor={card?.owner?.player?.color || "#cbc5c5ff"}
                textColor="#FFFFFF"
                p={5}
              >
                  {cardInfo.info.name || "?"}
              </Button>
              <Button
                type="fill"
                fillColor={card?.bgc_header || "#F5F5F5"}
                textColor="#FFFFFF"
                p={5}
              >
                {cardInfo.info.country_name || "?"}
              </Button>
            </ContainerInfoTwoColumnGIB>
          )}
          {/* <Offset mt={20} /> */}
        </ContainerInfoHeaderGIB>

        <ContainerInfoBodyGIB p={[5,15]}>
          {/* <Offset mt={20} /> */}
          <ContainerOneBtn>
            <ButtonBack
              onClick={() => handleChangeScreen(showInfoCard)}
              title={"Назад"}
            />
          </ContainerOneBtn>
          <Offset mt={10} />
          <ContainerInfoTwoColumnGIB>
            <Button
              type="fill"
              fillColor={"rgb(215 217 244)"}
              p={10}
              disabled={isClick || !actions.sell}
              onClick={() => {
                temporaryDisableBtn(5000, setIsClick);
                handleAction({
                  action: "sell",
                  card_id,
                });
              }}
            >
              <InnerBtnContextSpaceBetween>
                <Text text={"Продать в банк за " + cardInfo.features.sell_price} iconRight={<Icon src={icons.qgCurrencySvg} width={10} height={10}/>} />
                <Text fontWeight={900} text={""} />
              </InnerBtnContextSpaceBetween>
            </Button>
            <Text
              text={"Продажа карты без возможности выкупа."}
              fontWeight={300}
              fontSize={12}
              color={"rgba(78, 76, 109, 1)"}
            />
          </ContainerInfoTwoColumnGIB>
          <Offset mt={10} />
          <ContainerInfoTwoColumnGIB>
            <Button
              type="fill"
              fillColor={"rgb(215 217 244)"}
              p={10}
              disabled={isClick || !actions.can_sell_property}
              onClick={() => {
                temporaryDisableBtn(5000, setIsClick);
                handleAction({
                  action: "sell_property",
                  card_id,
                });
              }}
            >
              <InnerBtnContextSpaceBetween>
                <Text text={"Продать недвижимость"} />
                <Text fontWeight={900} text={""} />
              </InnerBtnContextSpaceBetween>
            </Button>
            <Button
              component="div"
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
                Продажа недвижимости(?)
              </Text>
            </Button>
          </ContainerInfoTwoColumnGIB>
          <Offset mt={10} />
          <ContainerInfoTwoColumnGIB>
            <Button
              type="fill"
              fillColor={"rgb(215 217 244)"}
              p={10}
              disabled={isClick || !actions.pawn}
              onClick={() => {
                temporaryDisableBtn(5000, setIsClick);
                handleAction({
                  action: "pawn",
                  card_id,
                });
              }}
            >
              <InnerBtnContextSpaceBetween>
                <Text text={"Заложить в банк"} />
                <Text fontWeight={900} text={""} />
              </InnerBtnContextSpaceBetween>
            </Button>
            <Button
              component="div"
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
                Продажа карты, с возможностью выкупа, с комиссией банка (?)
              </Text>
            </Button>
          </ContainerInfoTwoColumnGIB>
          <Offset mt={10} />
          <ContainerInfoTwoColumnGIB>
            <Button
              type="fill"
              fillColor={"rgb(215 217 244)"}
              p={10}
              disabled={isClick || !actions.auction}
              onClick={() => {
                temporaryDisableBtn(5000, setIsClick);
                handleAction({
                  action: "start_auction",
                  card_id,
                  idOwnerCard: card.owner.player.id,
                });
              }}
            >
              <InnerBtnContextSpaceBetween>
                <Text text={"Выставить на аукцион"} />
                <Text fontWeight={900} text={""} />
              </InnerBtnContextSpaceBetween>
            </Button>
            <Button
              component="div"
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
                Продажи карты по вашей цене с комиссией банка (?)
              </Text>
            </Button>
          </ContainerInfoTwoColumnGIB>
          <Offset mt={10} />
          <ContainerInfoTwoColumnGIB>
            <Button
              type="fill"
              fillColor={"rgb(215 217 244)"}
              p={10}
              disabled={isClick || !actions.redeem}
              onClick={() => {
                temporaryDisableBtn(5000, setIsClick);
                handleAction({
                  action: "redeem",
                  card_id,
                });
              }}
            >
              <InnerBtnContextSpaceBetween>
                <Text text={"Выкупить"} />
                <Text fontWeight={900} text={""} />
              </InnerBtnContextSpaceBetween>
            </Button>
            <Button
              component="div"
              type="fill-empty"
              textColor="rgba(78, 76, 109, 1)"
              onClick={() => alert("info")}
            >
              <Text
                fontWeight={300}
                fontSize={12}
                color={"rgba(78, 76, 109, 1)"}
                start
                style={{ display: "flex" }}
              >
                Выкупить с банка (?)
              </Text>
            </Button>
          </ContainerInfoTwoColumnGIB>
          <Offset mt={10} />
          <ContainerInfoTwoColumnGIB>
            <Button
              type="fill"
              fillColor={"rgb(215 217 244)"}
              p={10}
              disabled={isClick || !actions.exchange}
              onClick={() => {
                temporaryDisableBtn(5000, setIsClick);
                handleAction({
                  action: "exchange",
                  card_id,
                  idOwnerCard: card.owner.player.user,
                });
              }}
            >
              <InnerBtnContextSpaceBetween>
                <Text text={"Обменять"} />
                <Text fontWeight={900} text={""} />
              </InnerBtnContextSpaceBetween>
            </Button>
            <Button
              component="div"
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
                Обменять карту с другим игроком (?)
              </Text>
            </Button>
          </ContainerInfoTwoColumnGIB>
          <Offset mt={10} />
          <ContainerInfoTwoColumnGIB>
            <Button
              type="fill"
              fillColor={"rgb(215 217 244)"}
              p={10}
              disabled={isClick}
              onClick={() => {
                temporaryDisableBtn(5000, setIsClick);
                handleAction({
                  action: "clean_chose_actions",
                  card_id,
                });
              }}
            >
              <InnerBtnContextSpaceBetween>
                <Text text={"Выйти"} />
                <Text fontWeight={900} text={""} />
              </InnerBtnContextSpaceBetween>
            </Button>
            <Button
              type="fill-empty"
              textColor="rgba(78, 76, 109, 1)"
              onClick={() => alert("info")}
              component="div"
            >
              <Text
                fontWeight={300}
                fontSize={12}
                color={"rgba(78, 76, 109, 1)"}
                start
              >
                Вернуться на игровое поле (?)
              </Text>
            </Button>
          </ContainerInfoTwoColumnGIB>
          <Offset mt={10} />
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

export default ActionsCard