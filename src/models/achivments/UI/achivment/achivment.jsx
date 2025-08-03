import { forwardRef } from 'react';
import cls from './achivment.module.css';

export const Achivment = forwardRef(function Achivment({
	achivmentTitle,
	achivmentText,
	rangeBg = 'linear-gradient(to right, #726ced 0%, #9d80f4 30%, #70dcf1 100%)',
	block,
	rangeValue = '100%',
}, ref) {
	return (
		<div ref={ref} className={cls.Achivment}>
			{block}
			<div className={cls.achivmentInfo}>
				<h3>{achivmentTitle}</h3>
				<p>{achivmentText}</p>
				<div className={cls.range}>
					<div
						className={cls.rangeValue}
						style={{
							'--range-bg': rangeBg,
							'--range-width': rangeValue,
						}}></div>
				</div>
			</div>
		</div>
	);
});
