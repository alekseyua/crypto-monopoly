import { Label } from '../../shared/UI';
import styles from './styles/user-panel.module.scss';
import Icon from '../../shared/UI/Icon/Icon';
import { DropdownArrow, icons } from '../../assets';
import { IUser } from '../../store/users/user';
import UserPanelMainModeLK from '../../Component/UserPanelLK/UserPanelMainModeLK';

interface IProps {
  isMobile?: boolean
  userInfo: any
  isQG: any
  user: IUser;
  handleNavigateTo: any
  handleOpenDropDownMenu: any
  isDropDownMenuOpen: boolean;
}

const UserPanelMobile:React.FC<IProps> = ({ 
  userInfo, 
  user, 
  isMobile,
  handleNavigateTo, 
  isDropDownMenuOpen 
}) => {
  return (
    <div className={`${styles['header-menu-btn__user-panel-container--mobile']}`} >
        {
          !!user.id && userInfo?.map((info:any, i: number) => {
            const { name, price, link, id } = info;
            return (
              <div
                key={i}
                onClick={() => handleNavigateTo(link)}
                className={`${styles["header-menu-btn__container--mobile"]}`}
                style={{
                  top: isDropDownMenuOpen? i * 70 : 0,
                }}
              >
                <div className={styles["header-menu-btn__inner-wrap--mobile"]}>
                  <div>
                    <Icon
                      src={icons[id as keyof typeof icons]}
                      className={styles["header-menu-btn__icon--left"]}
                      // zIndex={10}
                      width={"20"}
                      height={"20"}
                      />
                    <Label
                      type={"transparent"}
                      className={styles["header-menu-btn__title"]}
                      text={name}
                      // iconRight={isQG && info.id === 'balance' && <Icon style={{ transform: isDropDownMenuOpen && 'rotate(180deg) translateY(6px)' }} src={DropdownArrow} width={12} height={12} />}
                    />
                  </div>
                  {id === "balance" && !isMobile && (
                    <Icon
                      className={styles["header-menu-btn__price-icon"]}
                      src={DropdownArrow}
                      width={"12"}
                      height={"12"}
                    />
                  )}
                </div>
                <div className={styles["header-menu-btn__price-container"]}>
                  <div className={styles["header-menu-btn__price"]}>
                    {`${price}`}
                    {id === "jackpot" ? (
                      "$"
                    ) : (
                      <Icon src={icons.qgCurrencySvg} width="15" up={1} />
                    )}
                  </div>
                </div>
              </div>
            );
          })
        }
    </div>
  )
}

export default UserPanelMobile