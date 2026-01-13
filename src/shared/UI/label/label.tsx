import styles from './label.module.scss';

interface ILabel {
	p?: string;
	text: string | TrustedHTML;
    type?: string;
	style?: React.CSSProperties;
	hover?: boolean;
    error?: boolean;
    center?: boolean;
	variant?: string | undefined | null;
    onClick?: () => void;
    iconLeft?: React.ReactElement;
    className?: string;
    iconRight?: React.ReactElement;
}

export const Label:React.FC<ILabel> = ({ 
		p, 
		text,
		type, 
		style, 
		hover,
		error, 
		center,
		variant, 
		onClick, 
		iconLeft, 
		className, 
		iconRight, 
}) => {
	if(p) style = {...style, padding: p};
	if(hover) style = {...style, cursor: 'pointer'};
	return (
		<div
			onClick={onClick}
			className={`${styles.label} ${variant && styles[variant]} ${type && styles[type]} ${className} ${error ? styles.error : ''}`}
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
