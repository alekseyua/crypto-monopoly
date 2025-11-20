import styles from "./styles/header.module.scss";
import logo from "../../assets/images/logo.png";
import { Button } from "../../shared/UI";
import BlockWrapper from "../../shared/UI/Block/BlockWrapper";

const HeaderAuth: React.FC = () => {
  return (
    <header className={styles["header__container"]}>
      <BlockWrapper style={{ padding: '0 40px' }}>

        <div className={styles.headerCont}>
          <div className={styles.navHeader}>
            <img className={styles["header__logo"]} src={logo} alt="Logo" />
          </div>
			<nav className={styles.nav}>
				<Button variant="rounded" component="link" to="/rules" p={15}>
				Правила игры
				</Button>
				{/* <Button variant="rounded" p={15}>О проекте</Button> */}
			</nav>
        </div>
      </BlockWrapper>
    </header>
  );
};
export default HeaderAuth;