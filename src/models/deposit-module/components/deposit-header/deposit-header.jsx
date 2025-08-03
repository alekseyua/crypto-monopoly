import { BackArrow, StonksIcon } from '../../../../assets';
import { Button } from '../../../../shared/UI';
import Icon from '../../../../shared/UI/Icon/Icon';
import { Balance } from '../../../../shared/UI/balance/balance';
import { DepositFilter } from '../../UI/deposit-filter/deposit-filter';
import logo from '../../assets/imgs/logo.png'
import cls from './deposit-header.module.css';

export const DepositHeader = () => {
	return (
		<div className='wrapper'>
            <img className={cls.logo} src={logo} alt="" />
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
					<h2>Карты в залоге</h2>
					<div className={cls.auctionFilterBtns}>
						<DepositFilter
							btnText={'Срок выкупа'}
							Icon={StonksIcon}
							iconWidth={20}
							iconHeight={12}
						/>
						<DepositFilter
							btnText={'Россия'}
							iconWidth={20}
							iconHeight={12}
						/>
						<DepositFilter
							btnText={'Все поля'}
							iconWidth={20}
							iconHeight={12}
						/>
					</div>
				</div>
				<div className={cls.btns}>
					<Balance balance={'280'} />
				</div>
			</header>
		</div>
	);
};
