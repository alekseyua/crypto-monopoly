import styles from './styles/header.module.scss';
import logo from '../../assets/images/logo.png';
import BurgerContainer from '../../models/Burger/BurgerContainer';
import UserPanelContainer from '../../models/UserPanel/UserPanelContainer';
import { Button } from '../../shared/UI';
import { getLocaleStore } from '../../helpers/helper';
import { NAV_ALL_ACHIEVEMENTS } from '../../routers/config-nav';
import BlockWrapper from '../../shared/UI/Block/BlockWrapper';


const Header:React.FC = () => {
	return (
		<>
			{
				window.location.href.includes(NAV_ALL_ACHIEVEMENTS)
					?<header className={styles['header__container--achivments']}>
									<img className={styles['header__logo--achivments']} src={logo} alt='Logo' />

					</header>
					: <header className={styles['header__container']}>
						<BlockWrapper style={{ padding: '0 40px' }}>
							<div className={styles.headerCont}>
								<div className={styles.navHeader}>
									<img className={styles['header__logo']} src={logo} alt='Logo' />
									{
										window.location.href.includes('/authorization/')
											? null
											: !!getLocaleStore('token') && <BurgerContainer />
									}
								</div>
								{
									window.location.href.includes('/authorization/') 
										? <nav className={styles.nav}>
											<Button variant='rounded' component='link' to='/rules'>
												Правила игры
											</Button>
											{/* <Button variant='rounded'>О проекте</Button> */}
										</nav>
										: <UserPanelContainer />
								}
							</div>
						</BlockWrapper>
					</header>

			}
		</>  
	);
};
export default Header;