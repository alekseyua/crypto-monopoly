import cls from './block.module.css';

export const Block = ({
	children,
	bgColor = 'linear-gradient(to right, #726ced, #9d80f4)',
	dropShadow = '#726ced40',
	innerShadow = '#F0EFFF40',
}) => {
	return (
		<div
			style={{
				'--bg-color': bgColor,
				'--drop-shadow-color': dropShadow,
				'--inner-shadow-color': innerShadow,
			}}
			className={cls.Block}>
			{children}
		</div>
	);
};
