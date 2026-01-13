import { moscow } from '../../assets';
import { DepositCard } from './components/auction-card/deposit-card';
import { DepositHeader } from './components/deposit-header/deposit-header';
import cls from './deposit-module.module.css'

export const DepositModule = () => {
	return (
		<div className={cls.depositModule}>
			<DepositHeader />
			<div className='wrapper'>
				<div className={cls.depositCards}>
					{Array.from(Array(10).keys())?.map((i) => (
						<DepositCard
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
