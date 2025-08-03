import { Outlet } from 'react-router-dom';

import cls from './auth.module.css';
import { authImg } from '../../assets';

 const Auth = () => {

	return (
		<main>
			<div className='wrapper'>
				<div className={cls.authContent}>
					<div className={cls.authInfo}>
						<p className={cls.authInfotext}>
							Выигрывайте по-крупному и наслаждайтесь щедрыми призамивместе с
							<b> Land Of Monopoly</b> на всех популярных платформах.
						</p>
						<img src={authImg} alt='Devices'  />
					</div>
					<Outlet />
				</div>
			</div>
		</main>
	);
};
export default Auth;