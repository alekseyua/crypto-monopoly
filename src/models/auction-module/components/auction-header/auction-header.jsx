import { BackArrow, StonksIcon } from '../../../../assets';
import { Button } from '../../../../shared/UI';
import { Balance } from '../../../../shared/UI/balance/balance';
import Icon from '../../../../shared/UI/Icon/Icon';
import { AuctionFilter } from '../../UI/auction-filter/auction-filter';
import cls from './auction-header.module.css';

export const AuctionHeader = () => {
	return (
		<div className='wrapper'>
			<header className={cls.header}>
				<div className={cls.headerTitle}>
					<Button
						to='/main-mode'
						component='link'
						className={cls.backBtn}
						type='filled'
						variant='rounded'>
						<Icon  src={BackArrow}  width={16} height={16} />
					</Button>
					<h2>Аукцион</h2>
					<div className={cls.auctionFilterBtns}>
						<AuctionFilter
							btnText={'Последняя цена'}
							Icon={StonksIcon}
							iconWidth={20}
							iconHeight={12}
						/>
						<AuctionFilter btnText={'Время на торги'} />
						<AuctionFilter btnText={'Россия'} />
						<AuctionFilter btnText={'Все поля'} />
						<AuctionFilter btnText={'Открытые и закрытие'} />
					</div>
				</div>
				<div className={cls.btns}>
					<Balance balance={'280'} />
					<Button
						variant='rounded'
						type='gradient'
						gradientColors={['#E4863F', '#9D80F4']}>
						Ваши торги
					</Button>
				</div>
			</header>
		</div>
	);
};
