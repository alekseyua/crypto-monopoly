import { BackArrow } from '../../../../assets';
import { Button } from '../../../../shared/UI';
import cls from './header.module.css';

import logo from '../../../../assets/images/logo.png';
import Icon from '../../../../shared/UI/Icon/Icon';

export const AchivmentsHeader = () => {
	return (
		<div className='wrapper'>
			<img className={cls.logo} src={logo} alt='' />
			<header className={cls.header}>
				<div className={cls.headerTitle}>
					<Button
						to='/quick-game'
						component='link'
						className={cls.backBtn}
						type='filled'
						variant='rounded'>
						<Icon  src={BackArrow}  width={16} height={16} />
					</Button>
					<h2>Карты в залоге</h2>
				</div>
				<div className={cls.btns}>
					{/* <Balance balance={'280'} /> */}
				</div>
			</header>
		</div>
	);
};
