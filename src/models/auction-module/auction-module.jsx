import { moscow } from '../../assets';
import cls from './auction-module.module.css';
import { AuctionCard } from './components/auction-card/auction-card';
import { AuctionHeader } from './components/auction-header/auction-header';

export const AuctionModule = () => {
	return (
		<div className={cls.AuctionModule}>
			<AuctionHeader />
			<div className='wrapper'>
				<div className={cls.auctionCards}>
					{Array.from(Array(10).keys())?.map((i) => (
						<AuctionCard
							key={i}
							cardImg={moscow}
							cardTitle={'Москва'}
							collection={'Россия'}
							gameField={'№ 454125'}
							startPrice={15}
							lastPrice={25}
						/>
					))}
				</div>
			</div>
		</div>
	);
};
