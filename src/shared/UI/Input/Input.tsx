import { forwardRef, useEffect, useRef, useState } from 'react';
import cls from './Input.module.css';

interface IInput {
	id: string,
	type: string,
	iconLeft?: React.ReactElement,
	iconRight?: React.ReactElement | undefined,
	label?: string,
	error?: boolean,
	style?: React.CSSProperties,
	onChange: (value: string) => void,
	placeholder?: string;
	props?: React.InputHTMLAttributes<HTMLInputElement>
	// additional props for input tag
	// ref?: React.Ref<HTMLInputElement> | null;
	className?: string;
	wrapClassName?: string;
	leftText?: string;
	value?: string  | number;
	isSpanWidth?: boolean;
	// disabled?: boolean;
	// readOnly?: boolean;
	// maxLength?: number;
	// minLength?: number;
	// min?: number;
	// max?: number;
	// step?: number;
	// pattern?: string;
	// required?: boolean;
	// autoComplete?: string;
}

export const Input: React.FC<IInput> = forwardRef(function Input({
	style,
	iconLeft,
	label,
	leftText,
	error,
	id,
	type = 'text',
	placeholder = '',
	wrapClassName,
	isSpanWidth,
	className,
	iconRight,
	...props }: IInput,
	ref: any) {
	const inputRef = useRef<HTMLInputElement>(ref || null);
	const spanRef = useRef<HTMLSpanElement>(null);
	const [inputValue, setInputValue] = useState(props.value || '');

	useEffect(() => {
		if (spanRef.current && inputRef.current) {
			const spanWidth = spanRef.current.offsetWidth;
			if (!isSpanWidth){
				inputRef.current.style.width = '100%'
				return;
			};
			inputRef.current.style.width = `${spanWidth + 30}px`; // + padding
		}
	}, [inputValue, isSpanWidth]);

	const handlerChangeInput = (e: React.ChangeEvent<HTMLInputElement>) => {
		const { value } = e.target;
		setInputValue(value);
		props.onChange?.(value);
	}

	return (
		<div ref={inputRef} className={`${wrapClassName? wrapClassName : cls.inputCont}`}>
			{label && <label htmlFor={id} className={`${error ? cls.error : ''}`}>{label}</label>}
			<div className={cls.inputWrap}>
				{iconLeft && iconLeft}
				{leftText && leftText}
				<input 
					className={`${error && cls.error} ${className && className}`} 
					ref={inputRef} 
					type={type} 
					id={id} 
					placeholder={placeholder}
					value={inputValue}
					style={{
						paddingRight: iconRight ? 35 : 25,
						...style
					}}
					{...props}
					onChange={handlerChangeInput}
				/>
				{/* Призрачный span для измерения ширины текста */}
				<span
					ref={spanRef}
					style={{
						position: 'absolute',
						visibility: 'hidden',
						whiteSpace: 'pre',
						fontSize: '14px',
						fontFamily: 'inherit',
						fontWeight: 'inherit',
					}}
				>
					{inputValue || placeholder || ''}
				</span>
				{iconRight && iconRight}
			</div>
		</div>
	);
});
