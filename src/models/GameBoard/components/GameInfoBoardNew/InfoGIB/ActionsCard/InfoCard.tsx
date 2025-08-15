import React from 'react';
import ContainerGIB from '../../UIContainerGIB/ContainerGIB';
import ContainerInfoHeaderGIB from '../../UIContainerGIB/InfoGIB/ContainerInfoHeaderGIB';
import ContainerInfoBodyGIB from '../../UIContainerGIB/InfoGIB/ContainerInfoBodyGIB';
import ContainerInfoFooterGIB from '../../UIContainerGIB/InfoGIB/ContainerInfoFooterGIB';
import ContainerInfoGIB from '../../UIContainerGIB/InfoGIB/ContainerInfoGIB';
import { ICard } from '../../../../../../store/quick-game/quick-game.d';
import { Button, Offset } from '../../../../../../shared/UI';
import Title from '../../../../../../shared/UI/Title/Title';
import AutoCounter from '../../../../../../Component/AutoCounter/AutoCounter';
import ContainerOneBtn from '../../ControllerGIB/ContainerOneBtn';
import { adjustColorBrightness, getPriceTaxesFromHouses } from '../../../../../../helpers/helper';
import ContainerInfoTwoColumnGIB from '../../UIContainerGIB/InfoGIB/ContainerInfoTwoColumnGIB';
import InnerBtnContextSpaceBetween from '../../ControllerGIB/InnerBtnContextSpaceBetween';
import Text from '../../../../../../shared/UI/Text/Text';
import { icons } from '../../../../../../assets';
import Icon from '../../../../../../shared/UI/Icon/Icon';
import GameInfoBoardFooterContainer from '../../FooterGIB/GameInfoBoardFooterContainer';

interface IProps {
  handleChangeScreen: (newScreen: 'actions-card' | 'info-card') => void;
  handleBack: (p: any) => void; // Optional, assuming you might want to go back
  card: ICard;
  timeEndMove: number;
  setAmountHouses: (amount: number) => void; // Function to set amount of houses
  amountHouses: number; // Current amount of houses
}

const InfoCard: React.FC<IProps> = ({
  card,
  timeEndMove,
  handleBack,
  setAmountHouses,
  amountHouses,
  handleChangeScreen,
}: IProps) => {
  return (
    <ContainerGIB>
      <Offset mt={5} />
      <Title
        title={'Действия с картой'}
        tag="h3"
        fontWeight={500}
      />
      <Offset mt={15} />
      <ContainerOneBtn>
        <Button
          type='empty'
          borderColor='#E4E4E4'
          p={11}
          onClick={() => handleBack({
            action: 'clean_chose_actions',
          })}
        >
          <Text
            fontWeight={300}
            fontSize={14}
            center
          >
            <>
              До хода
              <AutoCounter counter={timeEndMove} callback={() => { }} />
              секунд
            </>
          </Text>
        </Button>
      </ContainerOneBtn>

      <Offset mt={15} />
      <ContainerInfoGIB
        style={{
          backgroundColor: adjustColorBrightness(card?.owner?.player?.color || '#F5F5F5', 90),
        }}
      >
        <ContainerInfoHeaderGIB>
          <Offset mt={20} />
          <ContainerInfoTwoColumnGIB>
            <Button
              type='fill'
              fillColor={card?.owner?.player?.color || '#F5F5F5'}
              textColor='#FFFFFF'
              p={12}
            >
              {card?.city?.name || 'Город не выбран'}
            </Button>
            <Button
              type='fill'
              fillColor={card?.bgc_header || '#F5F5F5'}
              textColor='#FFFFFF'
              p={12}
            >
              {card?.city?.country || 'Страна не выбран'}
            </Button>
          </ContainerInfoTwoColumnGIB>
        </ContainerInfoHeaderGIB>

        <ContainerInfoBodyGIB>
          <Offset mt={20} />

          <ContainerInfoTwoColumnGIB>
            <Title
              title={'Характеристики карты'}
              tag='h5'
              fontWeight={300}
              center
            />
            <Title
              title={'Покупка недвижимости'}
              tag='h5'
              fontWeight={300}
              center
            />
          </ContainerInfoTwoColumnGIB>
          <Offset mt={10} />

          <ContainerInfoTwoColumnGIB>
            <Button
              type='transparent'
              p={10}
            >
              <InnerBtnContextSpaceBetween>
                <Text
                  text={'Налог'}
                />
                <Text
                  text={'0'}
                  iconRight={<Icon src={icons.qgCurrencySvg} width={'15px'} />}
                />
              </InnerBtnContextSpaceBetween>
            </Button>
            <Button
              type='transparent'
              p={10}
            >
              <InnerBtnContextSpaceBetween>
                <Text
                  text={'Карты из коллекции'}
                />
                <Text
                  fontWeight={900}
                  text={'2 из 5'}
                />
              </InnerBtnContextSpaceBetween>
            </Button>
          </ContainerInfoTwoColumnGIB>

          <Offset mt={10} />

          <ContainerInfoTwoColumnGIB>
            <Button
              type='transparent'
              p={10}
            >
              <InnerBtnContextSpaceBetween>
                <Text
                  text={'С коллекцией'}
                />
                <Text
                  text={'0'}
                  iconRight={<Icon src={icons.qgCurrencySvg} width={'15px'} />}
                />
              </InnerBtnContextSpaceBetween>
            </Button>
            <Button
              type='transparent'
              p={10}
              disabled={true} // Assuming this button is disabled
            >
              <InnerBtnContextSpaceBetween>
                <Text
                  text={'Купить дом'}
                />
                <Text
                  text={'0'}
                  iconRight={<Icon src={icons.qgCurrencySvg} width={'15px'} />}
                />
              </InnerBtnContextSpaceBetween>
            </Button>
          </ContainerInfoTwoColumnGIB>
          <Offset mt={10} />

          <ContainerInfoTwoColumnGIB>
            <Button
              type='transparent'
              p={10}
            >
              <InnerBtnContextSpaceBetween>
                <Text
                  noWrap
                >
                  <>
                    {amountHouses > 1 ? <Button
                      type='fill-round'
                      fillColor='rgba(239, 238, 255, 1)'
                      style={{ width: '22px', marginRight: '10px' }}
                      onClick={() => setAmountHouses(amountHouses - 1)}
                    // className={styles['gib__btn-action-house']}
                    >-</Button>
                      : <Button disabled
                        type='fill-round'
                        fillColor='rgba(239, 238, 255, 1)'
                        style={{ width: '22px', marginRight: '10px' }}
                      // className={styles['gib__btn-action-house']}
                      >-</Button>}
                    С {getPriceTaxesFromHouses(amountHouses, [{ 1: 100 }, { 2: 200 }, { 3: 300 }, { 4: 400 }])?.name}
                    {
                      // dataCard.features?.house_taxes &&
                      (amountHouses < [{ 1: 100 }, { 2: 200 }, { 3: 300 }, { 4: 400 }].length) ? <Button
                        type='fill-round'
                        fillColor='rgba(239, 238, 255, 1)'
                        style={{ width: '22px', marginLeft: '10px' }}
                        onClick={() => setAmountHouses(amountHouses + 1)}
                      // className={styles['gib__btn-action-house']}
                      >+</Button>
                        : <Button disabled
                          type='fill-round'
                          fillColor='rgba(239, 238, 255, 1)'
                          style={{ width: '22px', marginLeft: '10px' }}
                        // className={styles['gib__btn-action-house']}
                        >+</Button>}
                  </>
                </Text>
                <Text
                  text={getPriceTaxesFromHouses(amountHouses, [{ 1: 100 }, { 2: 200 }, { 3: 300 }, { 4: 400 }]).price + ''}
                  iconRight={<Icon src={icons.qgCurrencySvg} width={'15px'} />}
                />
              </InnerBtnContextSpaceBetween>
            </Button>
            <Button
              type='transparent'
              p={10}
              disabled={true} // Assuming this button is disabled
            >
              <InnerBtnContextSpaceBetween>
                <Text
                  text={'Купить отель'}
                />
                <Text
                  text={'0'}
                  iconRight={<Icon src={icons.qgCurrencySvg} width={'15px'} />}
                />
              </InnerBtnContextSpaceBetween>
            </Button>
          </ContainerInfoTwoColumnGIB>
          <Offset mt={10} />

          <ContainerInfoTwoColumnGIB>
            <Button
              type='fill'
              fillColor={card?.owner?.player?.color || '#F5F5F5'}
              textColor='#FFFFFF'
              p={10}
            >
              <InnerBtnContextSpaceBetween>
                <Text
                // text={'Итоговый налог (?)'}
                >
                  Итоговый налог
                  <Button
                    type='fill-empty'
                    textColor='#FFFFFF'
                    onClick={() => alert('info')}
                  >
                    <Text>
                      (?)
                    </Text>

                  </Button>
                </Text>
                <Text
                  text={'0'}
                  iconRight={<Icon src={icons.qgCurrencySvg} width={'15px'} />}
                />
              </InnerBtnContextSpaceBetween>
            </Button>
            <Button
              type='fill'
              fillColor={'rgba(239, 238, 255, 1)'}
              p={10}
              onClick={() => handleChangeScreen('actions-card')}
            >
              <Text
                text={'Действия с картой'}
              />
            </Button>
          </ContainerInfoTwoColumnGIB>
        </ContainerInfoBodyGIB>

        <ContainerInfoFooterGIB
        style={{
          backgroundColor: adjustColorBrightness(card?.owner?.player?.color || '#F5F5F5', 60),
        }}
        >
          <GameInfoBoardFooterContainer 
            bgc={'transparent'}
            bgcBtn={adjustColorBrightness(card?.owner?.player?.color || '#F5F5F5', 30)}
          />
        </ContainerInfoFooterGIB>

      </ContainerInfoGIB>
          <Offset mt={30} />
    </ContainerGIB>
  )
}

export default InfoCard