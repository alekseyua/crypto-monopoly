import React from 'react';
import styles from './styles/avatar.module.scss';
import { adjustColorBrightness, getAdaptiveFromBase, getDefaultAvatarSize } from '../../../helpers/helper';
import { icons } from '../../../assets';
import { useWindowWidth } from '../../../hooks/useWindowWidth';

interface IProps {
  avatar?: string | undefined;
  color: string;
  isGrayBlur?: boolean;
  width?: number;
  height?: number;
  left?: string | number;
  resize?: boolean;
}

const AvatarBlock: React.FC<IProps> = ({
  avatar,
  color,
  isGrayBlur = false,
  width,
  height,
  resize,
  left = 0,
}: IProps) => {
  const vw = useWindowWidth().width;

  // width
  const finalWidth = resize 
  ?(width
    ? getAdaptiveFromBase(vw, width)
    : getDefaultAvatarSize(vw))
    : width;

  // height
  const finalHeight = resize ?
    (height
      ? getAdaptiveFromBase(vw, height)
      : getDefaultAvatarSize(vw))
      : height;

  return (
    <div
      className={styles['avatar__container']}
      style={{
        width: finalWidth,
        height: finalHeight,
        left: left,
      }}
    >
      <span
        className={styles['avatar__container--round']}
        style={{
          border: `10px solid ${isGrayBlur ? '#fff' : adjustColorBrightness(color, 30)}`,
          backgroundColor: color,
        }}
      ></span>

      <img
        src={avatar ?? icons.userAvatar}
        alt="avatar"
        className={styles['avatar__container--image']}
        style={{
          filter: isGrayBlur ? 'grayscale(100%)' : '',
        }}
      />
    </div>
  );
};

export default AvatarBlock;
