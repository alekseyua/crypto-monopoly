import { Link } from 'react-router-dom';
import styles from './button.module.scss';
import React from 'react';
import classNames from 'classnames';

interface buttonProps{
	component?: 'button';
	onClick: ()=>void;
}

interface divProps{
	component?: 'div';
	onClick?: ()=>void;
}

interface linkProps {
	component?: 'link';
	onClick?: never;
}
type PropsComponent = buttonProps | linkProps | divProps;
interface IButton {
  to?: string | undefined;
  type?:
    | "filled"
    | "outline"
    | "rounded"
    | "empty"
    | "fill"
    | "transparent"
    | "fill-round"
    | "fill-empty"
    | "gradient-invert";
  error?: boolean;
  style?: React.CSSProperties;
  props?:
    | React.ButtonHTMLAttributes<HTMLButtonElement>
    | React.AnchorHTMLAttributes<HTMLAnchorElement>;
  variant?:
    | "primary"
    | "secondary"
    | "tertiary"
    | "gradient"
    | "filled"
    | "outline"
    | "rounded"
    | "empty"
    | "fill"
    | "transparent"
    | "fill-round"
    | "fill-empty"
    | "gradient-invert";
  // onClick: () => void;
  children: React.ReactNode;
  iconLeft?: React.ReactElement;
  disabled?: boolean;
  fillColor?: string;
  borderColor?: string;
  textColor?: string;
  className?: string;
  // component?: 'button' | 'link';
  iconRight?: React.ReactElement;
  gradientColors?: [string, string];
  p?: number | string;
  typeBtn?: "button" | "submit" | "reset" | undefined;
}

export const Button: React.FC<IButton & PropsComponent> = ({
	to = '/',
	type = 'filled',
	error,
	style={},
	variant,
	onClick=()=>{},
	children,
	iconLeft,
	fillColor = '#e9ecff',
	textColor = '#000',
	className = '',
	component = 'button',
	iconRight,
	gradientColors = ['#6fd4f2', '#796fee'],
	disabled,
  typeBtn="button",
	borderColor,
	p,
	...props
}: IButton & PropsComponent) => {
	let buttonStyle: Record<string, string> = {
		'--grad-color-1': gradientColors[0],
		'--grad-color-2': gradientColors[1],
		'--fill-color': fillColor,
		'--text-color': textColor,
	}
	if(p) buttonStyle = {...buttonStyle, padding: `${p}px`};
	if(borderColor) buttonStyle = {...buttonStyle, border: `1px solid ${borderColor}`};
	if (component === 'button') {
		return (
      <button
        type={typeBtn}
        onClick={onClick}
        className={classNames(
          styles.button,
          type && styles[type],
          variant && styles[variant],
          disabled && styles.disabled,
          error && styles.error,
          className
        )}
        // `${styles.button} ${styles[type]} ${variant && styles[variant]} ${className} ${disabled && styles.disabled}`}
        style={{
          pointerEvents: error ? "none" : "all",
          ...style,
          ...(error ? { backgroundColor: "var(--bg-color-error)" } : {}),
          ...(disabled ? { cursor: "not-allowed" } : {}),
          ...buttonStyle,
        }}
        {...props}
      >
        {iconLeft && iconLeft}
        {children}
        {iconRight && iconRight}
      </button>
    );
	}
	if (component === 'div') {
		return (
      <div
        onClick={onClick}
        className={classNames(
          styles.button,
          type && styles[type],
          variant && styles[variant],
          disabled && styles.disabled,
          error && styles.error,
          className
        )}
        style={{
          pointerEvents: error ? "none" : "all",
          ...style,
          ...(error ? { backgroundColor: "var(--bg-color-error)" } : {}),
          ...(disabled ? { cursor: "not-allowed" } : {}),
          ...buttonStyle,
        }}
        // `${styles.button} ${styles[type]} ${variant && styles[variant]} ${className} ${disabled && styles.disabled}`}
        {...props}
      >
        {iconLeft && iconLeft}
        {children}
        {iconRight && iconRight}
      </div>
    );
	}
	
	if (component === 'link') {
		return (
      <Link
        to={to}
        className={classNames(
          styles.button,
          type && styles[type],
          variant && styles[variant],
          disabled && styles.disabled,
          error && styles.error,
          className
        )}
        style={{
          pointerEvents: error ? "none" : "all",
          ...style,
          ...(error ? { backgroundColor: "var(--bg-color-error)" } : {}),
          ...(disabled ? { cursor: "not-allowed" } : {}),
          ...buttonStyle,
        }}
        {...props}
      >
        {children}
      </Link>
    );
	}
};
