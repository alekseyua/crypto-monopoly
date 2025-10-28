import styles from "./styles/header.module.scss";
import logo from "../../assets/images/logo.png";
import { Button } from "../../shared/UI";

const HeaderAuth: React.FC = () => {
  return (
    <header className={styles["header__container"]}>
      <div className="wrapper">
        <div className={styles.headerCont}>
          <div className={styles.navHeader}>
            <img className={styles["header__logo"]} src={logo} alt="Logo" />
          </div>
			<nav className={styles.nav}>
				<Button variant="rounded" component="link" to="/rules" p={15}>
				Правила игры
				</Button>
				<Button variant="rounded" p={15}>О проекте</Button>
			</nav>
        </div>
      </div>
    </header>
  );
};
export default HeaderAuth;
/**
 * 1) если NAV_ALL_ACHIEVEMENTS то показываем только лого по центру и опускаем вниз закругляя кроя
 * 2) если authorization показываем кнопки о проекте и правила игры
 */
