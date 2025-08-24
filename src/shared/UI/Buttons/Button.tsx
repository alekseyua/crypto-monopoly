import { Link } from 'react-router-dom';
import cls from './button.module.scss';
import React, { ComponentType } from 'react';
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
    type?: 'filled' | 'outline' | 'rounded' | 'empty' | 'fill' | 'transparent' | 'fill-round' | 'fill-empty';
    error?: boolean;
    style?: React.CSSProperties;
    props?: React.ButtonHTMLAttributes<HTMLButtonElement> | React.AnchorHTMLAttributes<HTMLAnchorElement>;
    variant?: 'primary' | 'secondary' | 'tertiary' | 'gradient' | any | undefined;
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
}

export const Button: React.FC<IButton & PropsComponent> = ({
	to = '/',
	type = 'filled',
	error,
	style={},
	variant = '',
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
	borderColor,
	p,
	...props
}: IButton & PropsComponent) => {
	let buttonStyle:  Record<string, string> = {
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
				style={{
					...buttonStyle,
					pointerEvents: error? 'none' : 'all',
					...style,
                    ...(error? { backgroundColor: 'var(--bg-color-error)' } : {}),
                    ...(disabled? { cursor: 'not-allowed' } : {}),
				}}
				onClick={onClick}
				className={
					classNames({
						[cls.button]: true,
                        [cls[type]]: true,
                        [variant && cls[variant]]: !!variant,
                        [cls.disabled]: disabled,
                        [cls.error]: error,
                        [className]:!!className,
					})
				}
					// `${cls.button} ${cls[type]} ${variant && cls[variant]} ${className} ${disabled && cls.disabled}`}
				{...props}
			>
				{iconLeft && iconLeft }
				{children}
				{iconRight &&  iconRight }

			</button>
		);
	}
	if (component === 'div') {
		return (
			<div
				style={{
					...buttonStyle,
					pointerEvents: error? 'none' : 'all',
					...style,
                    ...(error? { backgroundColor: 'var(--bg-color-error)' } : {}),
                    ...(disabled? { cursor: 'not-allowed' } : {}),
				}}
				onClick={onClick}
				className={
					classNames({
						[cls.button]: true,
                        [cls[type]]: true,
                        [variant && cls[variant]]: !!variant,
                        [cls.disabled]: disabled,
                        [cls.error]: error,
                        [className]:!!className,
					})
				}
					// `${cls.button} ${cls[type]} ${variant && cls[variant]} ${className} ${disabled && cls.disabled}`}
				{...props}
			>
				{iconLeft && iconLeft }
				{children}
				{iconRight &&  iconRight }

			</div>
		);
	}
	
	if (component === 'link') {
		return (
			<Link
				to={to}				
				className={`${cls.button} ${cls[type]} ${cls[variant]} ${className}`}
				{...props}
			>
				{children}
			</Link>
		);
	}
};
