import { AchivmentExcursionIcon, AchivmentPrisonIcon } from '../../assets';
import { AchivmentCard } from '../../models/achivments/UI';
import { Block, Offset } from '../../shared/UI';
import Icon from '../../shared/UI/Icon/Icon';
import { IAchivmentPlayer } from '../../store/quick-game/quick-game.d';
import cls from './styles/achivments-module.module.css';

interface IProps {
	listAchivmentPlayer: IAchivmentPlayer[]
}

const AllAchievements: React.FC<IProps> = ({
	listAchivmentPlayer,
}: IProps) => {
	return (
		<div>
			{/* <AchivmentsHeader /> */}
			<Offset mt={35} />
			<div className={`${cls.AllAchievements}`}>

				{!!listAchivmentPlayer &&
					listAchivmentPlayer.map((a: IAchivmentPlayer) => {
						return (
							<AchivmentCard
								complationRatioLocation={'top'}
								key={a.id}
								block={
									<Block>
										<p className={cls.blockText}>Забрать награду 10 $</p>
									</Block>
								}
								achivmentText={'Зайдите в «‎Тюрьму»‎ как посетитель 10 раз'}
								achivmentTitle={a.achievement.name}
								rangeValue='50%'
								bgc='#ffffff'
							/>
						)
					})
				}

				<AchivmentCard
					complationRatioLocation={'top'}
					block={
						<Block>
							<Icon src={AchivmentExcursionIcon}
								className={cls.achivmentIcon}
								width={40}
								height={40}
							/>
							<p className={cls.blockText}>Уровень 1</p>
						</Block>
					}
					achivmentText={'Зайдите в «‎Тюрьму»‎ как посетитель 10 раз'}
					achivmentTitle={'Экскурсия'}
					rangeValue='50%'
				/>
				<AchivmentCard
					complationRatioLocation={'top'}
					block={
						<Block
							bgColor='linear-gradient(to right, #E4863F 0%, #E4863F 15%, #FAD660 100%)'
							dropShadow='#EFAC4F40'>
							<Icon src={AchivmentPrisonIcon}
								className={cls.achivmentIcon}
								width={56}
								height={38}
							/>
							<p className={cls.blockText}>Уровень 1</p>
						</Block>
					}
					achivmentText={'Пройдите поле «‎Старт»‎ 500к раз'}
					achivmentTitle={'На старт!'}
					rangeValue='30%'
					rangeBg='#FAD660'
				/>
				<AchivmentCard
					complationRatioLocation={'top'}
					block={
						<Block>
							<p className={cls.blockText}>Забрать награду 10 $</p>
						</Block>
					}
					achivmentText={'Зайдите в «‎Тюрьму»‎ как посетитель 10 раз'}
					achivmentTitle={'Экскурсия'}
					rangeValue='50%'
				/>
				<AchivmentCard
					complationRatioLocation={'top'}
					block={
						<Block>
							<Icon src={AchivmentExcursionIcon}
								className={cls.achivmentIcon}
								width={40}
								height={40}
							/>
							<p className={cls.blockText}>Уровень 1</p>
						</Block>
					}
					achivmentText={'Зайдите в «‎Тюрьму»‎ как посетитель 10 раз'}
					achivmentTitle={'Экскурсия'}
					rangeValue='50%'
				/>
				<AchivmentCard
					complationRatioLocation={'top'}
					block={
						<Block
							bgColor='linear-gradient(to right, #E4863F 0%, #E4863F 15%, #FAD660 100%)'
							dropShadow='#EFAC4F40'>
							<Icon src={AchivmentPrisonIcon}
								className={cls.achivmentIcon}
								width={56}
								height={38}
							/>
							<p className={cls.blockText}>Уровень 1</p>
						</Block>
					}
					achivmentText={'Пройдите поле «‎Старт»‎ 500к раз'}
					achivmentTitle={'На старт!'}
					rangeValue='30%'
					rangeBg='#FAD660'
				/>
				<AchivmentCard
					complationRatioLocation={'top'}
					block={
						<Block>
							<p className={cls.blockText}>Забрать награду 10 $</p>
						</Block>
					}
					achivmentText={'Зайдите в «‎Тюрьму»‎ как посетитель 10 раз'}
					achivmentTitle={'Экскурсия'}
					rangeValue='50%'
				/>
				<AchivmentCard
					complationRatioLocation={'top'}
					block={
						<Block>
							<Icon src={AchivmentExcursionIcon}
								className={cls.achivmentIcon}
								width={40}
								height={40}
							/>
							<p className={cls.blockText}>Уровень 1</p>
						</Block>
					}
					achivmentText={'Зайдите в «‎Тюрьму»‎ как посетитель 10 раз'}
					achivmentTitle={'Экскурсия'}
					rangeValue='50%'
				/>
				<AchivmentCard
					complationRatioLocation={'top'}
					block={
						<Block
							bgColor='linear-gradient(to right, #E4863F 0%, #E4863F 15%, #FAD660 100%)'
							dropShadow='#EFAC4F40'>
							<Icon src={AchivmentPrisonIcon}
								className={cls.achivmentIcon}
								width={56}
								height={38}
							/>
							<p className={cls.blockText}>Уровень 1</p>
						</Block>
					}
					achivmentText={'Пройдите поле «‎Старт»‎ 500к раз'}
					achivmentTitle={'На старт!'}
					rangeValue='30%'
					rangeBg='#FAD660'
				/>
				<AchivmentCard
					complationRatioLocation={'top'}
					block={
						<Block>
							<p className={cls.blockText}>Забрать награду 10 $</p>
						</Block>
					}
					achivmentText={'Зайдите в «‎Тюрьму»‎ как посетитель 10 раз'}
					achivmentTitle={'Экскурсия'}
					rangeValue='50%'
				/>
				<AchivmentCard
					complationRatioLocation={'top'}
					block={
						<Block>
							<Icon src={AchivmentExcursionIcon}
								className={cls.achivmentIcon}
								width={40}
								height={40}
							/>
							<p className={cls.blockText}>Уровень 1</p>
						</Block>
					}
					achivmentText={'Зайдите в «‎Тюрьму»‎ как посетитель 10 раз'}
					achivmentTitle={'Экскурсия'}
					rangeValue='50%'
				/>
				<AchivmentCard
					complationRatioLocation={'top'}
					block={
						<Block
							bgColor='linear-gradient(to right, #E4863F 0%, #E4863F 15%, #FAD660 100%)'
							dropShadow='#EFAC4F40'>
							<Icon src={AchivmentPrisonIcon}
								className={cls.achivmentIcon}
								width={56}
								height={38}
							/>
							<p className={cls.blockText}>Уровень 1</p>
						</Block>
					}
					achivmentText={'Пройдите поле «‎Старт»‎ 500к раз'}
					achivmentTitle={'На старт!'}
					rangeValue='30%'
					rangeBg='#FAD660'
				/>
				<AchivmentCard
					complationRatioLocation={'top'}
					block={
						<Block>
							<p className={cls.blockText}>Забрать награду 10 $</p>
						</Block>
					}
					achivmentText={'Зайдите в «‎Тюрьму»‎ как посетитель 10 раз'}
					achivmentTitle={'Экскурсия'}
					rangeValue='50%'
				/>
				<AchivmentCard
					complationRatioLocation={'top'}
					block={
						<Block>
							<Icon src={AchivmentExcursionIcon}
								className={cls.achivmentIcon}
								width={40}
								height={40}
							/>
							<p className={cls.blockText}>Уровень 1</p>
						</Block>
					}
					achivmentText={'Зайдите в «‎Тюрьму»‎ как посетитель 10 раз'}
					achivmentTitle={'Экскурсия'}
					rangeValue='50%'
				/>
				<AchivmentCard
					complationRatioLocation={'top'}
					block={
						<Block
							bgColor='linear-gradient(to right, #E4863F 0%, #E4863F 15%, #FAD660 100%)'
							dropShadow='#EFAC4F40'>
							<Icon src={AchivmentPrisonIcon}
								className={cls.achivmentIcon}
								width={56}
								height={38}
							/>
							<p className={cls.blockText}>Уровень 1</p>
						</Block>
					}
					achivmentText={'Пройдите поле «‎Старт»‎ 500к раз'}
					achivmentTitle={'На старт!'}
					rangeValue='30%'
					rangeBg='#FAD660'
				/>
			</div>
		</div>
	);
};

export default AllAchievements