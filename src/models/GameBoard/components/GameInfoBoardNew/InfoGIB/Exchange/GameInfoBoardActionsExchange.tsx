import { Cross, icons } from '../../../../../../assets';
import { Button, Input, Offset } from '../../../../../../shared/UI';
import Icon from '../../../../../../shared/UI/Icon/Icon';
import React, { useEffect, useState } from 'react';
import AutoCounter from '../../../../../../Component/AutoCounter/AutoCounter';
import { IStateExchange } from '../../../../../../Pages/QuickGame/FieldQuickGame/FieldQuickGameContainer';
import { ICard, IPlayer, ISpecialCard } from '../../../../../../store/quick-game/quick-game.d';
import InfoBlock from '../../../../../../shared/UI/InfoBlock/InfoBlock';
import AvatarBlock from '../../../../../../shared/UI/AvatarBlock/AvatarBlock';
import ButtonBack from '../../../../../../shared/UI/Buttons/ButtonBack/ButtonBack';
import Title from '../../../../../../shared/UI/Title/Title';
import Line from '../../../../../../shared/UI/Line/Line';
import CurrencyQG from '../../../../../../shared/UI/CurrencyQG/CurrencyQG';
import CardPlayersPreview from '../../../../../../Component/Cards/CardPlayersPreview/CardPlayersPreview';
import ContainerGIB from '../../UIContainerGIB/ContainerGIB';
import ContainerInfoFooterGIB from '../../UIContainerGIB/InfoGIB/ContainerInfoFooterGIB';
import ContainerInfoHeaderGIB from '../../UIContainerGIB/InfoGIB/ContainerInfoHeaderGIB';
import ContainerInfoTwoColumnGIB from '../../UIContainerGIB/InfoGIB/ContainerInfoTwoColumnGIB';
import ContainerInfoBodyGIB from '../../UIContainerGIB/InfoGIB/ContainerInfoBodyGIB';
import styles from './styles/exchange.module.scss';
import { temporaryDisableBtn } from '../../../../../../helpers/helper';
import GameInfoBoardFooterContainer from '../../FooterGIB/GameInfoBoardFooterContainer';

interface IGameInfoBoardActionsExchangeProps {
  handleCard: (params: any) => void;
  handleBack: (params: any) => void;
  players?: IPlayer[];
  stateExchange: IStateExchange;
  listUserExchange: number[];
  currentPlayerId: number;
  cards: ICard[] | ISpecialCard[];
  handleClickUserPreview: (id: number) => void;
}

export const GameInfoBoardActionsExchange: React.FC<IGameInfoBoardActionsExchangeProps> = ({
	handleCard,
	handleBack,
	stateExchange,
	players,
	listUserExchange,
	currentPlayerId,
	handleClickUserPreview,
	cards,
}: IGameInfoBoardActionsExchangeProps) => {
  const [isClick, setIsClick] = useState<boolean>(false);
	const [totalTo, setTotalTo] = useState<number>(0);
	const [totalFrom, setTotalFrom] = useState<number>(0);
	const [isSetInputPriceTo, setIsSetInputPriceTo] = useState<boolean>(false);
	const [isSetInputPriceFrom, setIsSetInputPriceFrom] = useState<boolean>(false);
	const [userForExchange, setUserForExchange] = useState<IPlayer>();
	const currentUser = !!players?.length &&
		players.filter((p: IPlayer) => p.id === +currentPlayerId)[0];

	useEffect(()=>{
		!!players?.length && listUserExchange?.length >= 2 &&
			setUserForExchange(players.filter((p: IPlayer) => p.id === +listUserExchange.filter(id=>id !== currentPlayerId))[0])
	}, [listUserExchange, currentPlayerId, players])

	useEffect(() => {
		if (userForExchange && !stateExchange.player_to_id) {
			handleCard({
				...stateExchange,
				player_to_id: userForExchange.user,
			});
		}
		if(!!!listUserExchange.length){
			setTotalTo(0);
			setTotalFrom(0);
			setIsSetInputPriceTo(false);
			setIsSetInputPriceFrom(false);

		}
	}, [listUserExchange, userForExchange, handleCard, stateExchange]);

	useEffect(() => {
		const total = stateExchange.propertys_from.reduce((acc, cardId) => {
			const card = cards.find(c => +c.id === +cardId);
			return card ? acc + +card.cost : acc;
		}, 0);
		setTotalFrom(stateExchange.price_from + total);
	}, [stateExchange.propertys_from, stateExchange.price_from, cards]);

	useEffect(() => {
    const total = stateExchange.propertys_to.reduce((acc, cardId) => {
      const card = cards.find((c) => +c.id === +cardId);
      return card ? acc + +card.cost : acc;
    }, 0);
    setTotalTo(stateExchange.price_to + total);
  }, [stateExchange.propertys_to, cards, stateExchange.price_to]);
		
	const handleApplyInput = function (key: 'price_from' | 'price_to' | 'price_from_reset' | 'price_to_reset'){
		if(key === 'price_from') {
			setIsSetInputPriceFrom(true);
			setTotalFrom( s => s + +stateExchange[key]);
			return 
		}
		if(key === 'price_from_reset') {
			setIsSetInputPriceFrom(false);
			setTotalFrom(s => s - +stateExchange['price_from']);
			handleCard({
				...stateExchange,
				price_from: 0,
			});	
			return 
		}
		if(key === 'price_to') {
			setIsSetInputPriceTo(true);			
			setTotalTo( s => s + +stateExchange[key]);
			return 
		}
		if(key === 'price_to_reset') {
			setIsSetInputPriceTo(false);
			handleCard({
				...stateExchange,
				price_to: 0,
			});		
			setTotalTo(s => s - +stateExchange['price_to']);
			return 
		}
	}
	return (
    <ContainerGIB style={{ background: "#E9ECFF" }}>
      {/* header */}
      <ContainerInfoHeaderGIB p={15}>
        <ButtonBack
          onClick={() =>
            handleBack({
              action: "clean_chose_actions",
            })
          }
          title={"Назад"}
        />
        <Offset mb={10} />

        <Title title={"Сделка с игроком"} tag="h3" center />
      </ContainerInfoHeaderGIB>

      <Offset mb={20} />

      {/* btns actions */}
      <ContainerInfoTwoColumnGIB>
        <Button
          type="fill"
          fillColor={"#726CED"}
          p={15}
          style={{ borderRadius: 25 }}
          disabled={!(isClick || (!!totalTo || !!totalFrom))}

          onClick={() =>{
            temporaryDisableBtn(2000, setIsClick);
            handleCard({
              action: "exchange",
              ...stateExchange,
            })
          }}
        >
          Предложить
        </Button>

        <Button
          type="fill"
          fillColor={"#D6DBF5"}
          p={15}
          style={{ borderRadius: 25 }}
          disabled={isClick}
          onClick={() =>{
            temporaryDisableBtn(2000, setIsClick);
            handleCard({
              action: "exchange",
            })
          }}
        >
          Отказ (
          {<AutoCounter disabled={false} counter={30} callback={() => {}} />})
        </Button>
      </ContainerInfoTwoColumnGIB>

      <Offset mb={10} />

      {/* body */}
      <ContainerInfoBodyGIB
        style={{
          background: "#D6DBF5",
          borderTopLeftRadius: 25,
          borderTopRightRadius: 25,
          paddingTop: 15,
        }}
      >
        {!!!listUserExchange.length && (
          <>
            <InfoBlock center p={10}>
              Выберите игрока для обмена
            </InfoBlock>
            <Offset mb={10} />

            <ul className={styles["list-player__container-wrapper"]}>
              {!!players?.length &&
                players
                  .filter((p: IPlayer) => p.id !== currentPlayerId)
                  .map((p: IPlayer, index: number) => {
                    return (
                      <li key={index} className={styles["list-player__item"]}>
                        <CardPlayersPreview
                          //isOpenModal={()=>{}}
                          isClickOnCard
                          isMove={p.current_move}
                          num={index + 1}
                          id={p.id}
                          name={p.username}
                          color={p.color}
                          isQG={true}
                          avatar={p?.avatar}
                          //   isOwner={dataPlayerQG.id === p.id}
                          capital={p.bill_data.capital}
                          balance={p.bill_data.balance}
                          //   isGrayBlur={
                          //     !!listSelectUserPreview.length &&
                          //     !listSelectUserPreview.includes(p.id)
                          //   }
                          //   isSelected={listSelectUserPreview.includes(p.id)}
                          handleClickUserPreview={handleClickUserPreview}
                          // handleSettingCard={handleSettingCard}
                        />
                      </li>
                    );
                  })}
              <Offset mb={20} />
            </ul>
          </>
        )}

        <div className={styles["gib__body-container-wrap"]}>
          {!!listUserExchange.length && (
            <Line
              direction={"vertical"}
              location="center"
              style={{ transform: "translateX(-4px)" }}
            />
          )}
          {/* //  <div className={styles['gib__info-card--half-block-line']}></div>} */}

          {!!listUserExchange.length && (
            <>
              {/* player */}
              <ContainerInfoTwoColumnGIB style={{ gap: 35 }}>
                {currentUser && (
                  <div className={styles["gib__user-exchange"]}>
                    <div
                      className={styles["gib__user-exchange--container-avatar"]}
                    >
                      <AvatarBlock
                        color={currentUser.color}
                        width={25}
                        height={25}
                      />
                    </div>
                    <div
                      className={styles["gib__user-exchange--desc-container"]}
                    >
                      <span className={styles["gib__user-exchange--name"]}>
                        {currentUser.username}
                      </span>
                      <span className={styles["gib__user-exchange--name-desc"]}>
                        Предлагаете
                      </span>
                    </div>
                  </div>
                )}
                {userForExchange && (
                  <div className={styles["gib__user-exchange"]}>
                    <div
                      className={styles["gib__user-exchange--container-avatar"]}
                    >
                      <AvatarBlock
                        color={userForExchange.color}
                        width={25}
                        height={25}
                      />
                    </div>
                    <div
                      className={styles["gib__user-exchange--desc-container"]}
                    >
                      <span className={styles["gib__user-exchange--name"]}>
                        {userForExchange.username}
                      </span>
                      <span className={styles["gib__user-exchange--name-desc"]}>
                        Отдает
                      </span>
                    </div>
                  </div>
                )}
              </ContainerInfoTwoColumnGIB>

              <Offset mb={10} />

              {/* form input */}
              <ContainerInfoTwoColumnGIB style={{ gap: 35 }}>
                <div className={styles["gib__user-exchange--input-container"]}>
                  {!isSetInputPriceFrom && (
                    <>
                      +
                      <Icon src={icons.qgCurrencySvg} />
                    </>
                  )}
                  <Input
                    wrapClassName={
                      styles["gib__user-exchange--input-container-input"]
                    }
                    placeholder="Введите сумму..."
                    value={
                      stateExchange.price_from === 0
                        ? ""
                        : stateExchange.price_from
                    }
                    isSpanWidth={isSetInputPriceFrom}
                    onChange={(e) => {
                      let numericValue = parseFloat(e.target.value);
                      if (Number.isNaN(numericValue)) numericValue = 0;
                      handleCard({
                        ...stateExchange,
                        price_from: numericValue,
                      });
                    }}
                    type="number"
                    id="input-seller"
                    leftText={isSetInputPriceFrom ? "+ " : undefined}
                    iconLeft={
                      isSetInputPriceFrom ? (
                        <Icon
                          className={
                            styles["gib__user-exchange--input-currency"]
                          }
                          width="15px"
                          height="15px"
                          src={icons.qgCurrencySvg}
                        />
                      ) : undefined
                    }
                    iconRight={
                      !!stateExchange.price_from && !isSetInputPriceFrom ? (
                        <Icon
                          className={
                            styles["gib__user-exchange--input-success"]
                          }
                          src={icons.checkMarkerWhite}
                          width="12px"
                          height="12px"
                          onClick={() => handleApplyInput("price_from")}
                        />
                      ) : isSetInputPriceFrom ? (
                        <Icon
                          className={styles["gib__user-exchange--input-reset"]}
                          src={Cross}
                          width="17px"
                          height="17px"
                          onClick={() => handleApplyInput("price_from_reset")}
                        />
                      ) : undefined
                    }
                  />
                </div>
                <div className={styles["gib__user-exchange--input-container"]}>
                  {userForExchange && (
                    <>
                      {!isSetInputPriceTo && (
                        <>
                          +
                          <Icon src={icons.qgCurrencySvg} />
                        </>
                      )}
                      <Input
                        wrapClassName={
                          styles["gib__user-exchange--input-container-input"]
                        }
                        placeholder="Введите сумму..."
                        value={
                          stateExchange.price_to === 0
                            ? ""
                            : stateExchange.price_to
                        }
                        isSpanWidth={isSetInputPriceTo}
                        onChange={(e) => {
                          let numericValue = parseFloat(e.target.value);
                          if (Number.isNaN(numericValue)) numericValue = 0;
                          handleCard({
                            ...stateExchange,
                            price_to: numericValue,
                          });
                        }}
                        type="number"
                        id="input-costumer"
                        leftText={isSetInputPriceTo ? "+ " : undefined}
                        iconLeft={
                          isSetInputPriceTo ? (
                            <Icon
                              className={
                                styles["gib__user-exchange--input-currency"]
                              }
                              width="15px"
                              height="15px"
                              src={icons.qgCurrencySvg}
                            />
                          ) : undefined
                        }
                        iconRight={
                          !!stateExchange.price_to && !isSetInputPriceTo ? (
                            <Icon
                              className={
                                styles["gib__user-exchange--input-success"]
                              }
                              src={icons.checkMarkerWhite}
                              width="12px"
                              height="12px"
                              onClick={() => handleApplyInput("price_to")}
                            />
                          ) : isSetInputPriceTo ? (
                            <Icon
                              className={
                                styles["gib__user-exchange--input-reset"]
                              }
                              src={Cross}
                              width="17px"
                              height="17px"
                              onClick={() => handleApplyInput("price_to_reset")}
                            />
                          ) : undefined
                        }
                      />
                    </>
                  )}
                </div>
              </ContainerInfoTwoColumnGIB>

              <Offset mb={10} />

              {/* cards */}
              <ContainerInfoTwoColumnGIB style={{ gap: 35 }}>
                <div className={styles["gib__info-card-exchange-container"]}>
                  {!!stateExchange.propertys_from.length &&
                    stateExchange.propertys_from.map(
                      (card: string, index: number) => (
                        <div key={index}>
                          {cards
                            .filter(
                              (c: ICard | ISpecialCard) => +c.id === +card
                            )
                            .map((c: ICard | ISpecialCard) => {
                              // setTotalFrom(s=> s + +c.cost);
                              return (
                                <div
                                  key={c.id}
                                  className={
                                    styles[
                                      "gib__info-card-exchange-card-container"
                                    ]
                                  }
                                  style={{
                                    background: c.bgc_header,
                                  }}
                                >
                                  <div> {c.name} </div>
                                  <div>
                                    <div>{c.cost} </div>
                                    <div>
                                      <CurrencyQG size={11} color="white" />
                                    </div>
                                  </div>
                                </div>
                              );
                            })}
                        </div>
                      )
                    )}
                </div>
                <div className={styles["gib__info-card-exchange-container"]}>
                  {!!stateExchange.propertys_to.length &&
                    stateExchange.propertys_to.map(
                      (card: string, index: number) => (
                        <div key={index}>
                          {cards
                            .filter(
                              (c: ICard | ISpecialCard) => +c.id === +card
                            )
                            .map((c: ICard | ISpecialCard) => {
                              // setTotalTo(s => s + +c.cost);
                              return (
                                <div
                                  key={c.id}
                                  className={
                                    styles[
                                      "gib__info-card-exchange-card-container"
                                    ]
                                  }
                                  style={{
                                    background: c.bgc_header,
                                  }}
                                >
                                  <div> {c.name} </div>
                                  <div>
                                    <div>{c.cost} </div>
                                    <div>
                                      <CurrencyQG size={11} color="white" />
                                    </div>
                                  </div>
                                </div>
                              );
                            })}
                        </div>
                      )
                    )}
                </div>
              </ContainerInfoTwoColumnGIB>

              {/* total cost */}
              <div
                className={styles["gib__user-exchange-container--total-price"]}
              >
                <ContainerInfoTwoColumnGIB style={{ gap: 35 }}>
                  <div className={styles["gib__info-card-exchange-container"]}>
                    <Line direction="horizontal" />
                    <div className={styles["gib__user-exchange--total-price"]}>
                      Итого: {totalFrom}
                      <CurrencyQG size={10} color="black" />
                    </div>
                  </div>
                  <div className={styles["gib__info-card-exchange-container"]}>
                    <Line direction="horizontal" />
                    <div className={styles["gib__user-exchange--total-price"]}>
                      Итого: {totalTo}
                      <CurrencyQG size={10} color="black" />
                    </div>
                  </div>
                </ContainerInfoTwoColumnGIB>
              </div>
            </>
          )}
        </div>
      </ContainerInfoBodyGIB>

      {/* <Offset mb={10} /> */}

      {/* footer */}
      <ContainerInfoFooterGIB
        style={{
          backgroundColor: "rgb(229 228 255)",
        }}
      >
        <GameInfoBoardFooterContainer
          bgc={"transparent"}
          bgcBtn={"rgb(215 217 244)"}
        />
      </ContainerInfoFooterGIB>
    </ContainerGIB>
  );
};
