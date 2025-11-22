import React from 'react';
import ContainerGIB from '../../UIContainerGIB/ContainerGIB';
import ContainerInfoHeaderGIB from '../../UIContainerGIB/InfoGIB/ContainerInfoHeaderGIB';
import ContainerInfoBodyGIB from '../../UIContainerGIB/InfoGIB/ContainerInfoBodyGIB';
import ContainerInfoFooterGIB from '../../UIContainerGIB/InfoGIB/ContainerInfoFooterGIB';
import { IPlayer } from '../../../../../../store/quick-game/quick-game.d';
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
  const width = useWindowWidth();
      const isMobile = width < 992;
      console.log('%cPLAYER current move ' + playerCurrentMove?.username, 'color: red')
  if (!playerCurrentMove?.username) return <Preloader />;
  
  return (
    <ContainerGIB>
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