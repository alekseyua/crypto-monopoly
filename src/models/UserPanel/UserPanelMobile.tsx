import { Label } from '../../shared/UI';
import styles from './styles/user-panel.module.scss';
import Icon from '../../shared/UI/Icon/Icon';
import { DropdownArrow, icons } from '../../assets';
import { IUser } from '../../store/users/user';

interface IProps {
  userInfo: any
  isQG: any
  user: IUser;
  handleNavigateTo: any
  handleOpenDropDownMenu: any
  isDropDownMenuOpen: boolean;
}

const UserPanelMobile:React.FC<IProps> = ({ 
  userInfo, 
  isQG, 
  user, 
  handleNavigateTo, 
  handleOpenDropDownMenu, 
  isDropDownMenuOpen 
}) => {
  return (
    <div className={`${styles['header-menu-btn__user-panel-container--mobile']}`} >
        {
          !!user.id && userInfo?.map((info:any, i: number) => {
            // !!user?.username && userInfo?.map( (info, i) => {
            const { name, price, link, id } = info;
            console.log('id = ',id)
            return (
              <div
                key={i}
                onClick={() =>
                  isQG ? handleOpenDropDownMenu() : handleNavigateTo(link)
                }
                className={`${styles["header-menu-btn__container--mobile"]} ${
                  isQG && styles["containerButtonQG"]
                }`}
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
                  {id === "balance" && (
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