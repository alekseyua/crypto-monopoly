import React from 'react';
import styles from './styles/button-back.module.scss';
import { Button } from '../Button';
import Icon from '../../Icon/Icon';
import { RightArrowIcon } from '../../../../assets';

interface IProps {
  onClick: () => void;
  title?: string;
}

const ButtonBack: React.FC<IProps> = ({
  title='',
  onClick,
}: IProps) => {
  return (
    <Button
      className={styles['btn__back-container']}
      type='empty'
      onClick={onClick}
    >
      <Icon width={10} height={10} rotate={180} src={RightArrowIcon} />
      {title}
    </Button>
  )
}

export default ButtonBack