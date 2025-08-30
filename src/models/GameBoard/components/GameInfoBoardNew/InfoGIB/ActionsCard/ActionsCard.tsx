import React from 'react'
import ContainerGIB from '../../UIContainerGIB/ContainerGIB';
import { Button, Offset } from '../../../../../../shared/UI';
import Title from '../../../../../../shared/UI/Title/Title';
import ContainerOneBtn from '../../ControllerGIB/ContainerOneBtn';
import Text from '../../../../../../shared/UI/Text/Text';
import AutoCounter from '../../../../../../Component/AutoCounter/AutoCounter';
import ContainerInfoGIB from '../../UIContainerGIB/InfoGIB/ContainerInfoGIB';
import { ICard } from '../../../../../../store/quick-game/quick-game.d';
import { adjustColorBrightness } from '../../../../../../helpers/helper';
import ContainerInfoHeaderGIB from '../../UIContainerGIB/InfoGIB/ContainerInfoHeaderGIB';
import ContainerInfoTwoColumnGIB from '../../UIContainerGIB/InfoGIB/ContainerInfoTwoColumnGIB';
import ContainerInfoBodyGIB from '../../UIContainerGIB/InfoGIB/ContainerInfoBodyGIB';
import ContainerInfoFooterGIB from '../../UIContainerGIB/InfoGIB/ContainerInfoFooterGIB';
import GameInfoBoardFooterContainer from '../../FooterGIB/GameInfoBoardFooterContainer';
import ButtonBack from '../../../../../../shared/UI/Buttons/ButtonBack/ButtonBack';
import InnerBtnContextSpaceBetween from '../../ControllerGIB/InnerBtnContextSpaceBetween';

interface IProps {
  handleChangeScreen: (newScreen: 'action-card' | 'action-special-card' | 'actions') => void;
  timeEndMove: number; // Optional, assuming it might be used in the future
  handleBack: (p: any) => void; // Assuming this is needed for navigation
  card: ICard; // Assuming card is an object with properties like owner, city, etc.
  actions: { [key: string]: boolean }
  handleAction: (params: any) => void; // Function to handle actions like sell
  card_id: number; // Assuming this is the ID of the card being acted upon
  showInfoCard: 'action-card' | 'action-special-card' | 'actions';

  name: string;
  colorName: string;
}

const ActionsCard: React.FC<IProps> = ({
  card,
  name,
  card_id,
  actions,
  colorName,
  handleBack,
  timeEndMove,
  handleAction,
  showInfoCard,
  handleChangeScreen,
}: IProps) => {
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
          onClick={() =>
            handleBack({
              action: "clean_chose_actions",
            })
          }
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
        <ContainerInfoHeaderGIB
          p={15}
          style={{
            backgroundColor: "rgb(226 230 255)",
          }}
        >
          <Offset mt={20} />
          {showInfoCard === "action-special-card" ? (
            <ContainerOneBtn>
              <Button
                type="fill"
                fillColor={colorName}
                textColor="#FFFFFF"
                p={12}
              >
                {name || "Город не выбран"}
              </Button>
            </ContainerOneBtn>
          ) : (
            <ContainerInfoTwoColumnGIB>
              <Button
                type="fill"
                fillColor={card?.owner?.player?.color || "#cbc5c5ff"}
                textColor="#FFFFFF"
                p={12}
              >
                {name || "?"}
              </Button>
              <Button
                type="fill"
                fillColor={card?.bgc_header || "#F5F5F5"}
                textColor="#FFFFFF"
                p={12}
              >
                {card?.city?.country || "?"}
              </Button>
            </ContainerInfoTwoColumnGIB>
          )}
          <Offset mt={20} />
        </ContainerInfoHeaderGIB>

        <ContainerInfoBodyGIB p={15}>
          <Offset mt={20} />
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
              disabled={!actions.sell}
              onClick={() =>
                handleAction({
                  action: "sell",
                  card_id,
                })
              }
            >
              <InnerBtnContextSpaceBetween>
                <Text text={"Продать в банк"} />
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
              disabled={!actions.pawn}
              onClick={() =>
                handleAction({
                  action: "pawn",
                  card_id,
                })
              }
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
              disabled={!actions.auction}
              onClick={() =>
                handleAction({
                  action: "start_auction",
                  card_id,
                  idOwnerCard: card.owner.player.id,
                })
              }
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
              disabled={!actions.redeem}
              onClick={() =>
                handleAction({
                  action: "redeem",
                  card_id,
                })
              }
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
              disabled={!actions.exchange}
              onClick={() =>
                handleAction({
                  action: "exchange",
                  card_id,
                  idOwnerCard: card.owner.player.user,
                })
              }
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
              onClick={() =>
                handleAction({
                  action: "clean_chose_actions",
                  card_id,
                })
              }
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