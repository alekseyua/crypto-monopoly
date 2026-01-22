import { Button } from '../../../../shared/UI';
import cls from './auction-card.module.css';

export const AuctionCard = ({
	cardImg,
	collection,
	gameField,
	startPrice,
	lastPrice,
	closedAuction = false,
	cardTitle,
}) => {
	return (
		<div className={`${cls.auctioCard} ${closedAuction ? cls.closedAuction : ''}`}>
			<div className={cls.imgcont}>
				<div className={cls.imgHeader}>
					<div className={cls.time}>20 ч.</div>
					<div className={cls.auctionType}>
						{closedAuction ? 'Закрытый аукцион' : 'Открытый аукцион'}
					</div>
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
						<p className={cls.labelTitle}>Начальная цена</p>
						<p className={cls.labelValue}>{startPrice.toString()} $</p>
					</div>
					<div className={cls.cardLabel}>
						{closedAuction ? (
							'Это закрытый аукцион (?)'
						) : (
							<>
								<p className={cls.labelTitle}>Последняя цена</p>
								<p className={cls.labelValue}>{lastPrice} $</p>
							</>
						)}
					</div>
				</div>
				<div className={cls.cardsBtns}>
					<Button type='gradient' gradientColors={['#E4863F', '#FAD660']}>
						Ставка +1 $
					</Button>
					{!closedAuction && <Button>Своя ставка</Button>}
					<Button>Ознакомиться на поле</Button>
				</div>
			</div>
		</div>
	);
};
