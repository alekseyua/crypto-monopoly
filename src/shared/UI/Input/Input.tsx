import { forwardRef, useEffect, useRef, useState } from 'react';
import styles from './input.module.scss';
import { useStoreon } from 'storeon/react';

interface IInput {
	id: string,
	type: string,
	iconLeft?: React.ReactElement,
	iconRight?: React.ReactElement | undefined,
	label?: string,
	error?: boolean,
	style?: React.CSSProperties,
	styleWrap?: React.CSSProperties,
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
	min?: number;
	max?: number;
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
	min,
	max,
	id,
	styleWrap,
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
	const [ errorInput, setErrorInput ] = useState<string>('');
	const {dispatch } = useStoreon();

	const handleErrorInput = (error='') => {
		let timer = setTimeout(()=>{
			setErrorInput('');
			return ()=> clearTimeout(timer);
		},1600)
		setErrorInput(error);
	}

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
		if(value === ""){
			setInputValue(value);
			props.onChange?.(value);
			return;
		}
		let timer = setTimeout(()=>{
			if(type === 'number' && ( min && +value < +min)){
				handleErrorInput('min value ' + min)// dispatch(SET_MODAL, { isOpen: true, content: 'bla bla bla' });
				return ()=> clearTimeout(timer);
			}
			if(type === 'number' && ( max && +value > +max)){
				handleErrorInput('max value ' + max)// dispatch(SET_MODAL, { isOpen: true, content: 'bla bla bla' });
				return ()=> clearTimeout(timer); 
			}
		},1000);
		setInputValue(value);
		props.onChange?.(value);
	}

	return (
		<div 
			ref={inputRef} 
			className={`${wrapClassName? wrapClassName : styles.inputCont}`}
			>	
			{label && <label htmlFor={id} className={`${error ? styles.error : ''}`}>{label}</label>}
			<div 
				className={styles.inputWrap}
				style={styleWrap}
			>
				{iconLeft && iconLeft}
				{leftText && leftText}
				<input 
					className={`${error && styles.error} ${className && className}`} 
					ref={inputRef} 
					type={type} 
					id={id} 
					placeholder={placeholder}
					value={inputValue}
					style={{
						paddingRight: iconRight ? 35 : 25,
						...style
					}}
					min={min}
					max={max}
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
			{!!errorInput && <div className={styles['input__error-container']}>
				{errorInput}
				</div>}
		</div>
	);
});
