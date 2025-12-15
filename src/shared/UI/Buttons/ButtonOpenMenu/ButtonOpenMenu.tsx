import React from 'react'
import styles from './styles/button-open-menu.module.scss';
import Icon from '../../Icon/Icon';
import { icons } from '../../../../assets';

interface IProps {
    handlerOpenMenu?: (v: boolean) => void;
  isDropDownMenuOpen?: boolean;
}
const ButtonOpenMenu:React.FC<IProps> = ({
    handlerOpenMenu,
  isDropDownMenuOpen,
}) => {
  const handleOpenMenuCustom = () => {
    if (handlerOpenMenu) {
      handlerOpenMenu(!isDropDownMenuOpen);
    }
  }
  return (
    <div className={styles["button__open-menu"]} onClick={handleOpenMenuCustom}>
      <Icon src={icons.arrowDown} width={15} height={15} style={{
        transform: isDropDownMenuOpen ? 'rotate(180deg)' : 'rotate(0deg)',
        transition: 'transform 0.3s ease'
      }}/>
    </div>
  );
}

export default ButtonOpenMenu