import React from 'react';
import ContainerGIB from '../../components/UI/ContainerGIB/ContainerGIB';
import ContainerInfoHeaderGIB from '../../components/UI/ContainerGIB/ContainerInfoHeaderGIB';
import ContainerInfoBodyGIB from '../../components/UI/ContainerGIB/ContainerInfoBodyGIB';
import ContainerInfoFooterGIB from '../../components/UI/ContainerGIB/ContainerInfoFooterGIB';
import { Offset } from '../../../../../../shared/UI';
import Title from '../../../../../../shared/UI/Title/Title';
import { icons } from '../../../../../../assets';
import Icon from '../../../../../../shared/UI/Icon/Icon';

interface IProps {
}

const Empty: React.FC<IProps> = () => {
  return (
    <ContainerGIB name="Empty">
      <Icon
        src={icons.logo}
        width='100%'
        height='100%'
        backgroundFont
      />
      <Offset mt={5} />
      <ContainerInfoHeaderGIB>
        <Offset mt={20} />
      </ContainerInfoHeaderGIB>

      <ContainerInfoBodyGIB>
        <Title
          title={'Сделайте «щипок» пальцами чтобы управлять размером поля'}
          tag='h5'
          style={{padding: 20, fontWeight:300}}
          center
        />

      </ContainerInfoBodyGIB>

      <ContainerInfoFooterGIB>

      </ContainerInfoFooterGIB>

    </ContainerGIB>
  )
}

export default Empty     
