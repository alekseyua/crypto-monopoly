import React from 'react';
import ContainerGIB from '../../ContainerGIB/ContainerGIB';

interface IProps {
    handleChangeScreen: (newScreen: 'actions-card' | 'info-card') => void;
}

const InfoCard:React.FC<IProps> = ({
    handleChangeScreen,
}: IProps) => {
  return (
    <ContainerGIB>
        InfoCard
    </ContainerGIB>
  )
}

export default InfoCard