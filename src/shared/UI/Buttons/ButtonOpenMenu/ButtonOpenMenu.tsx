import React from 'react'
import styles from './styles/button-open-menu.module.scss';
import Icon from '../../Icon/Icon';
import { icons } from '../../../../assets';

interface IProps {
    handlerOpenMenu?: (v: boolean) => void
}
const ButtonOpenMenu:React.FC<IProps> = ({
    handlerOpenMenu
}) => {
  const [isOpen, setIsOpen] = React.useState(false);

  const handleOpenMenuCustom = () => {
    setIsOpen(!isOpen);
    if (handlerOpenMenu) {
      handlerOpenMenu(!isOpen);
    }
  }
  return (
    <div className={styles["button__open-menu"]} onClick={handleOpenMenuCustom}>
      <Icon src={icons.arrowDown} width="15px" height="15px" style={{
        transform: isOpen ? 'rotate(180deg)' : 'rotate(0deg)',
        transition: 'transform 0.3s ease'
      }}/>
    </div>
  );
}

export default ButtonOpenMenu