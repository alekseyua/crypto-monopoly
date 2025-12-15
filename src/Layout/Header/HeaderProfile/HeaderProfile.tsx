import { Button, Label } from '../../../shared/UI';
import styles from "./styles/header-profile.module.scss";
import { BackArrow, IconChat } from '../../../assets';
import Icon from '../../../shared/UI/Icon/Icon';
import BlockWrapper from '../../../shared/UI/Block/BlockWrapper';

interface IProps {
  dashboardProfile: any;
  handleNavigateTo: (path: string | number) => void;
  username: string;
} 

const HeaderProfile:React.FC<IProps> = ({ dashboardProfile, handleNavigateTo, username}) => {
  return (
    <BlockWrapper isWithoutBottomIndent>

    <div className={styles["header-profile__container"]}>

      <div className={styles["header-profile__container--left"]}>
        <Button
          type="rounded"
          onClick={() => handleNavigateTo(-1)}
          className={styles.iconBack}
          iconRight={<Icon src={BackArrow} width={20} height={20} />}
          p={10}
          borderColor={"var(--border-color)"}
          fillColor="#E9ECFF"
        >
          {" "}
        </Button>
        <Label className={styles["header-profile__name"]} text={username} />
      </div>
      <div className={styles["header-profile__btns-container"]}>
        <div className={styles["header-profile__btns-container--left"]}>
          {dashboardProfile.button[4].status !== "active" &&
            dashboardProfile.button
              .slice(0, 2)
              ?.map((el: any, index: number) => {
                return (
                  <Button
                    onClick={() => handleNavigateTo(el.type)}
                    key={index}
                    className={styles.containerButton}
                    type={el.status === "active" ? "gradient-invert" : "fill"}
                    p={10}
                  >
                    <div className={styles.innerContainerButtom}>
                      <Label
                        type={"transparent"}
                        className={styles.nameButtonChatBtn}
                        text={el.name}
                      />
                    </div>
                  </Button>
                );
              })}
        </div>
        <div className={styles["header-profile__btns-container--right"]}>
          <div className={styles["header-profile__btns-item--chat"]}>
            {dashboardProfile.button
              .slice(2, 3)
              ?.map((el: any, index: number) => {
                return (
                  <Button
                    onClick={() => handleNavigateTo(el.type)}
                    key={index}
                    className={styles.containerButton}
                    type={el.status === "active" ? "gradient-invert" : "fill"}
                    iconLeft={
                      <Icon src={IconChat} width={20} height={20} />
                    }
                    p={10}
                  >
                    <div className={styles.innerContainerButtom}>
                      <Label
                        type={"transparent"}
                        className={styles.nameButtonChatBtn}
                        text={el.name}
                      />
                    </div>
                  </Button>
                );
              })}
            <Label
              type={"transparent"}
              className={styles.nameButtonChatBtn}
              text={"+0"}
            />
          </div>
          <div className={styles.containerSwitchBtn}>
            {dashboardProfile.button
              .slice(3, 5)
              ?.map((el: any, index: number) => {
                return (
                  <Button
                    onClick={() => handleNavigateTo(el.type)}
                    key={index}
                    className={styles.containerButtonSwitch}
                    type={el.status === "active" ? "gradient-invert" : "fill"}
                  >
                    <div className={styles.innerContainerButtom}>
                      <Label
                        type={"transparent"}
                        className={styles.nameButtonChatBtn}
                        text={el.name}
                      />
                    </div>
                  </Button>
                );
              })}
          </div>
        </div>
      </div>
    </div>
    </BlockWrapper>
  );
}

export default HeaderProfile