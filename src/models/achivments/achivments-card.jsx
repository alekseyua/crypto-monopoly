import { useEffect, useRef, useState } from 'react';

import cls from './achivments-card.module.css';
import { Achivment } from './UI';
import { Block, Label, WrapperCard } from '../../shared/UI';
import { useNavigate } from 'react-router-dom';

export const AchivmentsCard = () => {
	const achivmentCardRef = useRef(null);
	const [height, setHeight] = useState(0);
	const navigate = useNavigate()

	useEffect(() => {
		const height =
			2 * achivmentCardRef.current.offsetHeight +
			achivmentCardRef.current.offsetHeight / 1.5;

		setHeight(height);
	}, []);

	return (
		<WrapperCard>
			<div className={cls.cardLabels}>
				<Label text={'Достижения'} type={'gradient'} />
				<Label text={'Все достижения'} onClick={() => navigate('all-achivments')}/>
			</div>
			<div className={cls.AllAchievements} style={{ height }}>
				<Achivment
					ref={achivmentCardRef}
					block={
						<Block>
							<p className={cls.blockText}>Забрать награду 10 $</p>
						</Block>
					}
					achivmentText={'Зайдите в «‎Тюрьму»‎ как посетитель 10 раз'}
					achivmentTitle={'Экскурсия'}
					rangeValue='50%'
				/>
				<Achivment
					block={
						<Block
							bgColor='linear-gradient(to right, #E4863F 0%, #E4863F 15%, #FAD660 100%)'
							dropShadow='#EFAC4F40'>
							<p className={cls.blockText}>Забрать награду 10 $</p>
						</Block>
					}
					achivmentText={'Пройдите поле «‎Старт»‎ 500к раз'}
					achivmentTitle={'На старт!'}
					rangeValue='30%'
					rangeBg='#FAD660'
				/>
				<Achivment
					block={
						<Block>
							<p className={cls.blockText}>Забрать награду 10 $</p>
						</Block>
					}
					achivmentText={'Зайдите в «‎Тюрьму»‎ как посетитель 10 раз'}
					achivmentTitle={'Экскурсия'}
					rangeValue='50%'
				/>
				<div className={cls.AllAchievementsGradient} />
			</div>
		</WrapperCard>
	);
};
