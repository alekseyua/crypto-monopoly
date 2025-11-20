import React from 'react';
import styles from './styles/avatar.module.scss';
import { adjustColorBrightness } from '../../../helpers/helper';
import { icons } from '../../../assets';

interface IProps {
  avatar?: string | undefined;
  color: string;
  isGrayBlur?: boolean;
  width?: string | number;
  height?: string | number;
  left?: string | number;
}

const AvatarBlock: React.FC<IProps> = ({
  avatar,
  color,
  isGrayBlur = false,
  width,
  height,
  left = 0,
}: IProps) => {
  return (
    <div
      className={styles['avatar__container']}
      style={{
        width: width,
        height: height,
        left: left,
      }}
    >
      <span className={styles['avatar__container--round']}
        style={{
          border: `10px solid ${isGrayBlur ? '#fff' : adjustColorBrightness(color, 30)}`,
          backgroundColor: color
        }}

      ></span>
      <img
        src={avatar ?? icons.userAvatar}
        alt="avatar"
        className={styles['avatar__container--image']}
        style={{
          filter: isGrayBlur ? 'grayscale(100%)' : ''
        }}
      />
    </div>
  )
}

export default AvatarBlock