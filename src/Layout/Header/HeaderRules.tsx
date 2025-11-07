

import styles from "./styles/header.module.scss";
import logo from "../../assets/images/logo.png";
import { Button } from "../../shared/UI";
import BlockWrapper from "../../shared/UI/Block/BlockWrapper";
import { NAV_ABOUT, NAV_AUTH_PAGE } from "../../routers/config-nav";

const HeaderRules: React.FC = () => {
  return (
    <header className={styles["header__container"]}>
      <BlockWrapper style={{ padding: '0 40px' }}>

        <div className={styles.headerCont}>
          <div className={styles.navHeader}>
            <img className={styles["header__logo"]} src={logo} alt="Logo" />
          </div>
          <nav className={styles.nav}>
            <Button variant="rounded" component="link" to={NAV_AUTH_PAGE} style={{padding: '15px 35px'}}>
              Войти
            </Button>
            <Button variant="rounded" p={15} to={NAV_ABOUT}>О проекте</Button>
          </nav>
        </div>
      </BlockWrapper>
    </header>
  );
};
export default HeaderRules;
/**
 * 1) если NAV_ALL_ACHIEVEMENTS то показываем только лого по центру и опускаем вниз закругляя кроя
 * 2) если authorization показываем кнопки о проекте и правила игры
 */
