import { Link } from 'react-router-dom'

import cls from './styles/user-panel-lk.module.scss';
import { NAV_AUTH_PAGE, NAV_PROFILE, NAV_REG_PAGE } from '../../routers/config-nav';

const UserPanelLK = ({ handleOpenLKMenu, handleLogout, user, isOpenLKMenu}) => {
  return (
    <div
      className={`${cls['header-menu-lk-btn__container']} ${isOpenLKMenu && cls.active}`}
      onClick={handleOpenLKMenu}
    >
      <img
        className={cls['header-menu-lk-btn__avatar']}
        src={user?.avatar ?? 'https://w7.pngwing.com/pngs/340/946/png-transparent-avatar-user-computer-icons-software-developer-avatar-child-face-heroes-thumbnail.png'}
        alt='User'
      />

      <div className={cls['header-menu-lk-btn__username']}>
        {!!user.id? user.username.length > 8 ? user.username.slice(0, 8) + '...' : user.username : 'Войти'}
        {/* {user?.username ?? 'Войти'} */}
      </div>
      
      {
        isOpenLKMenu && 
          <div className={cls['header-menu-lk-btn__dropdown-container']}>
            <Link to={NAV_PROFILE}>Настройки</Link>
            <br />
            {
              // user?.username 
              !!user.id
                ? <Link to={NAV_REG_PAGE} onClick={handleLogout}>Выйти</Link>
                : <Link to={NAV_AUTH_PAGE} >Войти</Link>            
            }
          </div>
      }
    </div>
  )
}

export default UserPanelLK