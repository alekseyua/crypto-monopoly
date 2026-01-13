import { Button, WrapperCard } from '../../../../shared/UI';

import cls from './RulesInfoCards.module.scss';
import icon1 from '../../assets/icons/rule-card-icon-1.png';
import icon2 from '../../assets/icons/rule-card-icon-2.png';
import closedBook from '../../assets/imgs/closed-book-main-mode.png';
import closedBook2 from '../../assets/imgs/closed-book-quick-mode.png';

export const RulesInfoCards = () => {
	return (
		<div className={cls.ruleCards}>
			<WrapperCard>
				<div className={cls.quickGameCard}>
					<div>
						<div className={cls.ruleCardHeader}>
							<img className={cls.icon} src={icon1} alt='Icon 1' />
							<h3>Быстрая игра</h3>
						</div>
						<ul className={cls.info}>
							<li>
								Классическая монополия до 10 игроков на одном игровом поле
							</li>
							<li>
								Каждый игрок делает одинаковую ставку на игру (минимум 1 $)
							</li>
							<li>
								Победитель забирает 90% от суммы сделанных ставок (-10%
								комиссия)
							</li>
						</ul>
					</div>
					<div className={cls.ruleCardImgCont}>
						<img src={closedBook2} alt='' />
						<Button to='details' component='link'>
							Подробнее
						</Button>
					</div>
				</div>
			</WrapperCard>
			<WrapperCard>
				<div className={cls.quickGameCard}>
					<div>
						<div className={cls.ruleCardHeader}>
							<img className={cls.icon} src={icon2} alt='Icon 1' />
							<h3>Основной режим</h3>
						</div>
						<ul className={cls.info}>
							<li>
								Бесконечный режим с не ограниченным количеством игровых полей и
								игроков.
							</li>
							<li>Необходимо не менее 100 $ на балансе для начала игры.</li>
							<li>
								Игровые карты покупаются и продаются за счет денег с баланса
								игрока.
							</li>
						</ul>
					</div>
					<div className={cls.ruleCardImgCont}>
						<img src={closedBook} alt='' />
						<Button to='details' component='link'>
							Подробнее
						</Button>
					</div>
				</div>
			</WrapperCard>
		</div>
	);
};
