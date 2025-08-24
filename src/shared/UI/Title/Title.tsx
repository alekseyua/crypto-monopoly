import React from 'react';
import styles from './styles/title.module.scss';

interface IProps {

  title?: string;
  className?: string;
  style?: React.CSSProperties;
  onClick?: () => void;
  id?: string;
  tag?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6';
  fontWeight?: number;
  center?: boolean; // Optional, if you want to center the title
}

const Title: React.FC<IProps> = ({
  title = '',
  className = '',
  style = {},
  onClick = () => { },
  id = '',
  tag = 'h2',
  fontWeight,
  center = false,
}: IProps) => {
  if (center) {
    style.textAlign = 'center';
  }
  if (fontWeight) {
    style.fontWeight = fontWeight;
  }
  switch (tag) {

    case 'h1':
      return (
        <h1
          data-testid="title"
          className={className}
          style={style}
          onClick={onClick}
          id={id}
        >
          {title}
        </h1>
      );
    case 'h2':
      return (
        <h2
          data-testid="title"
          className={className}
          style={style}
          onClick={onClick}
          id={id}
        >
          {title}
        </h2>
      );
    case 'h3':
      return (
        <h3
          data-testid="title"
          className={className}
          style={style}
          onClick={onClick}
          id={id}
        >
          {title}
        </h3>
      );
    case 'h4':
      return (
        <h4
          data-testid="title"
          className={className}
          style={style}
          onClick={onClick}
          id={id}
        >
          {title}
        </h4>
      );
    case 'h5':
      return (
        <h5
          data-testid="title"
          className={className}
          style={style}
          onClick={onClick}
          id={id}
        >
          {title}
        </h5>
      );
    case 'h6':
      return (
        <h6
          data-testid="title"
          className={className}
          style={style}
          onClick={onClick}
          id={id}
        >
          {title}
        </h6>
      );
    default:

      return (
        <h2
          data-testid="title"
          className={className}
          style={style}
          onClick={onClick}
          id={id}
        >
          {title}
        </h2>
      );
  }
}

export default Title