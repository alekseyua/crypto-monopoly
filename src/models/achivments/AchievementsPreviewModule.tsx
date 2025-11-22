import { useEffect, useRef, useState } from 'react';

import cls from './achivments-card.module.css';
import { Block, Label, WrapperCard } from '../../shared/UI';
import { useNavigate } from 'react-router-dom';
import { IAchivmentPlayer } from '../../store/quick-game/quick-game.d';
import { AchivmentCard } from './UI';

interface IProps {
	listAchivmentPlayer: IAchivmentPlayer[]
}

export const AchievementsPreviewModule:React.FC<IProps> = ({
	listAchivmentPlayer,
}:IProps) => {
	const achivmentCardRef = useRef<any | null>(null);
	const [height, setHeight] = useState(0);
	const navigate = useNavigate()

	useEffect(() => {
		const height =
			2 * achivmentCardRef.current?.offsetHeight +
			achivmentCardRef.current?.offsetHeight / 1.5 || 0;

		setHeight(height);
	}, [listAchivmentPlayer]);

	return (
		<WrapperCard>
			<div className={cls.cardLabels}>
				<Label text={'Достижения'} type={'gradient'} />
				<Label p={'13px'} center text={'Все достижения'} hover onClick={() => navigate('all-achivments')}/>
			</div>
			<div className={cls.AllAchievements} style={{ height }}>
				{
					!!listAchivmentPlayer.length &&
						listAchivmentPlayer.map( ( a: IAchivmentPlayer) => {
							return (
								<AchivmentCard
									key={a.id}
									ref={achivmentCardRef}
									block={
										<Block>
											<p className={cls.blockText}>Забрать награду 10 $</p>
										</Block>
									}
									achivmentText={'Зайдите в «‎Тюрьму»‎ как посетитель 10 раз'}
									achivmentTitle={a.achievement.name}
									rangeValue='50%'
									preview
									complationRatioLocation = {'top'}

								/>
							)
						})
				}
				<div className={cls.AllAchievementsGradient} />
			</div>
		</WrapperCard>
	);
};
