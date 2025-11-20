import styles from "./styles/header.module.scss";
import logo from "../../../assets/images/logo.png";
import BurgerContainer from "../../../models/Burger/BurgerContainer";
import UserPanelContainer from "../../../models/UserPanel/UserPanelContainer";
import Section from "../../../shared/UI/Section/Section";
import UserPanelMainModeNotification from "../../../Component/UserPanelNotification/UserPanelMainModeNotification";
import ButtonOpenMenu from "../../../shared/UI/Buttons/ButtonOpenMenu/ButtonOpenMenu";
import React from "react";
import BlockWrapper from "../../../shared/UI/Block/BlockWrapper";
import { useStoreon } from "storeon/react";
import { IUser } from "../../../store/users/user.d";
import UserPanelMainModeLK from "../../../Component/UserPanelLK/UserPanelMainModeLK";

interface HeaderQuickGameProps {
  isMobile?: boolean;
}

interface StateStore {
  user: IUser;
}

const HeaderQuickGame: React.FC<HeaderQuickGameProps> = ({
  isMobile = false,
}) => {
  const [isDropDownMenuOpen, setIsDropDownMenuOpen] = React.useState(false);
    const { user } = useStoreon<
      StateStore
    >("user");

  const handleOpenMobileMenu = (status: boolean) =>{
    if (status) return setIsDropDownMenuOpen(status);
    setIsDropDownMenuOpen(s=>!s);
  }
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
      <BlockWrapper style={{ padding: isMobile? '0 0px' :'0 40px' }}>

        <Section isScroll={false} isShadowBottom={!isDropDownMenuOpen}>
          {isMobile ? (
            <div className={styles["header-qg__mobile-bottom-container"]}>
            <div
              className={
                styles["header-qg__mobile-header-cont"]
              }
            >
              <div className={styles["header-qg__mobile-header-cont--inner"]}>
                  <BurgerContainer isMobile handleOpenMobileMenu={handleOpenMobileMenu} />
                <div
                  className={styles["header-qg__mobile-header-cont--inner-right"]}
                >
                  <ButtonOpenMenu
                      handlerOpenMenu={handleOpenMobileMenu}
                      isDropDownMenuOpen={isDropDownMenuOpen}
                  />
                  <UserPanelMainModeNotification />
                </div>
              </div>
              <UserPanelContainer isMobile />

            </div>
              <UserPanelMainModeLK user={user} isMobile />
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