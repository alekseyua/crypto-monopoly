import { Button } from '../../../../shared/UI';
import cls from './deposit-card.module.css';

export const DepositCard = ({
	cardImg,
	collection,
	gameField,
	price,
	cardTitle,
}) => {
	return (
		<div className={`${cls.auctioCard}`}>
			<div className={cls.imgcont}>
				<div className={cls.imgHeader}>
					<div className={cls.time}>4 дня. 22 ч.</div>
					<div className={cls.auctionType}>Время на выкуп</div>
				</div>
				<img src={cardImg} alt='' />
				<div className={cls.cardTitle}>{cardTitle}</div>
			</div>
			<div className={cls.cardBody}>
				<div className={cls.cardLabels}>
					<div className={cls.cardLabel}>
						<p className={cls.labelTitle}>Коллекция</p>
						<p className={cls.labelValue}>{collection}</p>
					</div>
					<div className={cls.cardLabel}>
						<p className={cls.labelTitle}>Игровое поле</p>
						<p className={cls.labelValue}>{gameField}</p>
					</div>
					<div className={cls.cardLabel}>
						<p className={cls.labelTitle}>Цена выкупа сейчас</p>
						<p className={cls.labelValue}>{price} $</p>
					</div>
					<p className={cls.depositInfo}>
						Цена выкупа растет на 10% от цены залога каждый день.
					</p>
				</div>
				<div className={cls.cardsBtns}>
					<Button type='gradient' gradientColors={['#FF7EBC', '#9E87F0']}>
						Выкупить карту за 5,5 $
					</Button>
					<Button>Ознакомиться на поле</Button>
				</div>
			</div>
		</div>
	);
};
