import React from 'react';
import styles from './styles/text.module.scss';
import classNames from 'classnames';

interface IProps {
  children?: React.ReactNode;
  text?: string;
  className?: string;
  style?: React.CSSProperties;
  onClick?: () => void;
  id?: string;
  tag?: 'span' | 'p' | 'div';
  fontWeight?: number;
  fontSize?: number; // Optional, if you want to set font size
  center?: boolean; // Optional, if you want to center the Text
  start?: boolean; // Optional, if you want to align text to the start
  iconRight?: React.ReactNode; // Optional, if you want to add an icon on the right
  noWrap?: boolean; // Optional, if you want to prevent text wrapping
  color?: string; // Optional, if you want to set text color
}

const Text: React.FC<IProps> = ({
  text = '',
  className = '',
  style = {},
  onClick = () => { },
  id = '',
  tag = 'div',
  fontWeight,
  center = false,
  start = false, // Optional, if you want to align text to the start
  children,
  color, // Optional, if you want to set text color
  fontSize, // Optional, if you want to set font size
  iconRight = null, // Default to null if no icon is provided
  noWrap = false, // Default to false if noWrap is not specified
}: IProps) => {
  if (color) {
    style.color = color;
  }
  if (fontSize) {
    style.fontSize = fontSize;
  }
  if (noWrap) {
    style.whiteSpace = 'nowrap';
  }
  if (start) {
    style.textAlign = 'start';
    style.justifyContent = 'flex-start';
  } else if (center) {
    style.textAlign = 'center';
    style.justifyContent = 'center';
    style.width = '100%';
  }
  if (fontWeight) {
    style.fontWeight = fontWeight;
  }

  if (children) {
    return (
      <div
        className={classNames(styles.text, className)}
        style={style}
        onClick={onClick}
        id={id}
      >
        {children}
        {iconRight && <span className={styles['text__icon--right']}>{iconRight}</span>}
      </div>
    );
  }
  switch (tag) {
    case 'p':
      return (
        <p
          className={classNames(styles.text, className)}
          style={style}
          onClick={onClick}
          id={id}
        >
          {text}
          {iconRight && <span className={styles['text__icon--right']}>{iconRight}</span>}
        </p>
      );
    case 'div':
      return (
        <div
          className={classNames(styles.text, className)}
          style={style}
          onClick={onClick}
          id={id}
        >
          {text}
          {iconRight && <span className={styles['text__icon--right']}>{iconRight}</span>}
        </div>
      );
    default:
      // Default case for 'span'
      return (
        <span
          className={classNames(styles.text, className)}
          style={style}
          onClick={onClick}
          id={id}
        >
          {text}
          {iconRight && <span className={styles['text__icon--right']}>{iconRight}</span>}
        </span>

      );
  }
}

export default Text