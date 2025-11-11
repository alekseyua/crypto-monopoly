import React from 'react';
import ContainerGIB from '../../UIContainerGIB/ContainerGIB';
import ContainerInfoHeaderGIB from '../../UIContainerGIB/InfoGIB/ContainerInfoHeaderGIB';
import ContainerInfoBodyGIB from '../../UIContainerGIB/InfoGIB/ContainerInfoBodyGIB';
import ContainerInfoFooterGIB from '../../UIContainerGIB/InfoGIB/ContainerInfoFooterGIB';
import { Offset } from '../../../../../../shared/UI';
import Title from '../../../../../../shared/UI/Title/Title';
import { icons } from '../../../../../../assets';
import Icon from '../../../../../../shared/UI/Icon/Icon';

interface IProps {
}

const Empty: React.FC<IProps> = () => {
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
