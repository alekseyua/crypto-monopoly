import cls from './styles/header.module.scss';
import logo from '../../assets/images/logo.png';
import BurgerContainer from '../../models/Burger/BurgerContainer';
import UserPanelContainer from '../../models/UserPanel/UserPanelContainer';
import { Button } from '../../shared/UI';
import { getLocaleStore } from '../../helpers/helper';


export const Header = () => {
	return (
		<header className={cls.header}>
			<div className='wrapper'>
				<div className={cls.headerCont}>
					<div className={cls.navHeader}>
						<img className={cls.logo} src={logo} alt='Logo' />
						{
							window.location.href.includes('/authorization/')
							? null
							: !!getLocaleStore('token') && <BurgerContainer />
						}
					</div>
					{
						window.location.href.includes('/authorization/')
							? <nav className={cls.nav}>
								<Button variant='rounded' component='link' to='/rules'>
									Правила игры
								</Button>
								<Button variant='rounded'>О проекте</Button>
							</nav> 
							: <UserPanelContainer />
					}
				</div>
			</div>
		</header>
	);
};

					{/* <nav className={cls.nav}>
						<Button variant='rounded' component='link' to='/rules'>
							Правила игры
						</Button>
						<Button variant='rounded'>О проекте</Button>
					</nav> */}