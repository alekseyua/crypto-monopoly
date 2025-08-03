import cls from './WrapperCard.module.css';

export const WrapperCard = ({ children, className }) => {
	return <div className={`${cls.wrapper} ${className}`}>{children}</div>;
};
