import styles from "./styles/header.module.scss";
import logo from "../../../assets/images/logo.png";
import BurgerContainer from "../../../models/Burger/BurgerContainer";
import UserPanelContainer from "../../../models/UserPanel/UserPanelContainer";
import Section from "../../../shared/UI/Section/Section";
import UserPanelMainModeNotification from "../../../Component/UserPanelNotification/UserPanelMainModeNotification";
import ButtonOpenMenu from "../../../shared/UI/Buttons/ButtonOpenMenu/ButtonOpenMenu";
import React from "react";
import BlockWrapper from "../../../shared/UI/Block/BlockWrapper";

interface HeaderQuickGameProps {
  isMobile?: boolean;
}

const HeaderQuickGame: React.FC<HeaderQuickGameProps> = ({
  isMobile = false,
}) => {
  const [isDropDownMenuOpen, setIsDropDownMenuOpen] = React.useState(false);
  return (
    <header
      className={
        styles[
          isMobile 
            ? isDropDownMenuOpen
                  ? "header-qg__mobile-container--open"
                  : "header-qg__mobile-container" 
            : "header-qg__container"
        ]
      }
    >
      <BlockWrapper style={{ padding: isMobile? '0 10px' :'0 40px' }}>

        <Section isScroll={false} isShadowBottom={!isDropDownMenuOpen}>
          {isMobile ? (
            <div
              className={
                styles["header-qg__mobile-header-cont"]
              }
            >
              <div className={styles["header-qg__mobile-header-cont--inner"]}>
                <BurgerContainer isMobile />
                <div
                  className={styles["header-qg__mobile-header-cont--inner-right"]}
                >
                  <ButtonOpenMenu
                    handlerOpenMenu={(v: boolean) => setIsDropDownMenuOpen(v)}
                  />
                  <UserPanelMainModeNotification />
                </div>
              </div>
              <UserPanelContainer isMobile />
            </div>
          ) : (
            <div className={styles["header-qg__header-cont"]}>
              <div className={styles["header-qg__header-nav"]}>
                <img
                  className={styles["header-qg__logo"]}
                  src={logo}
                  alt="Logo"
                />
                <BurgerContainer />
              </div>
              <UserPanelContainer />
            </div>
          )}
        </Section>  
      </BlockWrapper>
    </header>
  );
};
export default HeaderQuickGame;
/**
 * 1) если NAV_ALL_ACHIEVEMENTS то показываем только лого по центру и опускаем вниз закругляя кроя
 * 2) если authorization показываем кнопки о проекте и правила игры
 */
