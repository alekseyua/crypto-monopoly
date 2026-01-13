import { forwardRef } from 'react';
import styles from './styles/achivment.module.scss';

interface IProps {
	achivmentTitle: string;
	achivmentText: string;
	rangeBg?: string;
	rangeValue?: string;
	block?: React.ReactNode;
	bgc?: string;
	preview?: boolean;
	complationRatioLocation: 'top' | 'bottom'
}

export const AchivmentCard = forwardRef<HTMLDivElement, IProps>(function Achivment({
	achivmentTitle,
	achivmentText,
	rangeBg = 'linear-gradient(to right, #726ced 0%, #9d80f4 30%, #70dcf1 100%)',
	block,
	rangeValue = '100%',
	bgc,
	preview,
	complationRatioLocation,
}, ref) {
	let customStyle = {}
	if(bgc) customStyle = {...customStyle, backgroundColor: bgc}
	return (
		<div ref={ref} className={styles[preview? 'achivment__container--preview' : 'achivment__container']} style={customStyle}>
			{block}
			<div className={styles['achivment__info']}>
				<div className={styles['achivment__info-description']}>
					<span className={styles['achivment__info-description-title']}
					>{achivmentTitle}</span>
					{
						complationRatioLocation === 'top' &&
						<span className={styles['achivment__range-complation-ratio']}>
							10/10
						</span>
					}
				</div>

				<span className={styles['achivment__info-description-text']}>{achivmentText}</span>
				<div className={styles['achivment__range-container']}>
				<div className={styles['achivment__range']}>
					<div
						className={styles['achivment__range-value']}
						style={{
							'--range-bg': rangeBg,
							'--range-width': rangeValue,
						}as React.CSSProperties}>
						
					</div>
				</div>
					{
						complationRatioLocation === 'bottom' &&
							<span className={styles['achivment__range-complation-ratio']}>
								10/10
							</span>
					}
				</div>	
			</div>
		</div>
	);
});

AchivmentCard.displayName = 'AchivmentCard';