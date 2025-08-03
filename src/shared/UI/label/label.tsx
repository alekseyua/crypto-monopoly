import cls from './label.module.css';

interface ILabel {
	variant?: string | undefined | null;
	text: string | TrustedHTML;
    type?: string;
    onClick?: () => void;
    className?: string;
    iconRight?: React.ReactElement;
    iconLeft?: React.ReactElement;
    center?: boolean;
    error?: boolean;
	style?: React.CSSProperties;
}

export const Label:React.FC<ILabel> = ({ variant, style, text, type, onClick, className, iconRight, iconLeft, center, error }) => {
	return (
		<div 
			onClick={onClick} 
			className={`${cls.label} ${variant && cls[variant]} ${type && cls[type]} ${className} ${error ? cls.error : ''}`}
		style={{
			textAlign: center? 'center' : 'left',
			...style,
		}}
		>
			{iconLeft && iconLeft}
			<span dangerouslySetInnerHTML={{ __html: text }} />
			{iconRight && iconRight}
		</div>
	);
};
