import { AchivmentExcursionIcon, AchivmentPrisonIcon } from '../../assets';
import { Block } from '../../shared/UI';
import Icon from '../../shared/UI/Icon/Icon';
import cls from './achivments-module.module.css';
import { AchivmentsHeader } from './components/header/header';
import { AchivmentCard } from './UI/achivment-card/achivment-card';

 const AchivmentsModule = () => {
	return (
		<div>
			<AchivmentsHeader />
			<div className={`${cls.AllAchievements} wrapper`}>
				<AchivmentCard
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
					block={
						<Block>
							<Icon  src={AchivmentExcursionIcon} 
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
					block={
						<Block
							bgColor='linear-gradient(to right, #E4863F 0%, #E4863F 15%, #FAD660 100%)'
							dropShadow='#EFAC4F40'>
							<Icon  src={AchivmentPrisonIcon} 
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
					block={
						<Block>
							<Icon  src={AchivmentExcursionIcon} 
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
					block={
						<Block
							bgColor='linear-gradient(to right, #E4863F 0%, #E4863F 15%, #FAD660 100%)'
							dropShadow='#EFAC4F40'>
							<Icon  src={AchivmentPrisonIcon} 
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
					block={
						<Block>
							<Icon  src={AchivmentExcursionIcon} 
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
					block={
						<Block
							bgColor='linear-gradient(to right, #E4863F 0%, #E4863F 15%, #FAD660 100%)'
							dropShadow='#EFAC4F40'>
							<Icon  src={AchivmentPrisonIcon} 
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
					block={
						<Block>
							<Icon  src={AchivmentExcursionIcon} 
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
					block={
						<Block
							bgColor='linear-gradient(to right, #E4863F 0%, #E4863F 15%, #FAD660 100%)'
							dropShadow='#EFAC4F40'>
							<Icon  src={AchivmentPrisonIcon} 
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
					block={
						<Block>
							<Icon  src={AchivmentExcursionIcon} 
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
					block={
						<Block
							bgColor='linear-gradient(to right, #E4863F 0%, #E4863F 15%, #FAD660 100%)'
							dropShadow='#EFAC4F40'>
							<Icon  src={AchivmentPrisonIcon} 
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

export default AchivmentsModule