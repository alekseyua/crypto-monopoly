import cls from './achivment-card.module.css';

export const AchivmentCard = ({
	block,
	achivmentTitle,
	achivmentText,
	rangeBg,
	rangeValue,
}) => {
	return (
		<div className={cls.Achivment}>
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
};
