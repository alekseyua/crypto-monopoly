import { Link } from "react-router-dom";
import { Button, Label } from "../../shared/UI";
import styles from "./burger.module.scss";

interface IBurger {
  listMenu: any[];
  openBurger: boolean;
  handleBurger: () => void;
  handleActiveItemMenu: (id: number) => void;
}
const BurgerMobile: React.FC<IBurger> = ({
  listMenu,
  openBurger,
  handleBurger,
  handleActiveItemMenu,
}: IBurger) => {
  return (
    <div className={styles.containerBurger}>
      <div className={styles['menu__container-wrap']}>
        <div className={styles['menu__container-inner']}>
          <div
            onClick={handleBurger}
            className={
              openBurger ? styles["burger__btn--active"] : styles["burger__btn"]
            }
          >
            <span></span>
          </div>
            {
            (
              <Label
                text={listMenu.filter((el) => el.active)[0]?.title}
              />
            )}
        </div>
        {openBurger && (
          <div className={`${styles['menu__sub-menu-container']} `}>
            {listMenu?.map((m) => {
              return (
                <div
                  key={m.id}
                  className={`${styles.itemMenu} ${m.active && styles.active} `}
                  onClick={() => handleActiveItemMenu(m.id)}
                >
                  <Link to={m.link}>{m.title}</Link>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};

export default BurgerMobile;
