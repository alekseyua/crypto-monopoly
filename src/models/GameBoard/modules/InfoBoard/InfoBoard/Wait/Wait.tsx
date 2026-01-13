import React from 'react';
import ContainerGIB from '../../components/UI/ContainerGIB/ContainerGIB';
import ContainerInfoHeaderGIB from '../../components/UI/ContainerGIB/ContainerInfoHeaderGIB';
import ContainerInfoBodyGIB from '../../components/UI/ContainerGIB/ContainerInfoBodyGIB';
import ContainerInfoFooterGIB from '../../components/UI/ContainerGIB/ContainerInfoFooterGIB';
import { IPlayer } from '../../../../../../store/quick-game/quick-game.type';
import { Offset } from '../../../../../../shared/UI';
import Title from '../../../../../../shared/UI/Title/Title';
import { icons } from '../../../../../../assets';
import Icon from '../../../../../../shared/UI/Icon/Icon';
import { useWindowWidth } from '../../../../../../hooks/useWindowWidth';
import Preloader from '../../../../../../Component/Preloader/Preloader';

interface IProps {
  playerCurrentMove: IPlayer | null;
}

const Wait: React.FC<IProps> = ({
  playerCurrentMove,
}: IProps) => {
  const {isMobile} = useWindowWidth();
  if (!playerCurrentMove?.username) return <Preloader />;
  
  return (
    <ContainerGIB name="Wait">
      <Icon
        src={icons.logo}
        width='100%'
        height='100%'
        backgroundFont
      />
      <Offset mt={5} />
      <ContainerInfoHeaderGIB>
        {!isMobile  && <Offset mt={20} />}
       
        <Title
          title={'Ожидайте свой ход'}
          tag='h3'
          center
        />
      </ContainerInfoHeaderGIB>

      <ContainerInfoBodyGIB>

      </ContainerInfoBodyGIB>

      <ContainerInfoFooterGIB>

      <Title
        title={`Сейчас ходит игрок ${playerCurrentMove.username}`}
        tag='h6'
        center
      />
      <Offset mt={30} />
      </ContainerInfoFooterGIB>

    </ContainerGIB>
  )
}

export default Wait