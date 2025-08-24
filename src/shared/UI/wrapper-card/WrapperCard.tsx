import cls from './WrapperCard.module.css';

interface IProps {
	children: React.ReactNode;
	className?: string;
}

export const WrapperCard:React.FC<IProps> = ({ children, className }) => {
	return <div className={`${cls.wrapper} ${className}`}>{children}</div>;
};
