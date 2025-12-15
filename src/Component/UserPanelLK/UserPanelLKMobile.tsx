import { Link, useNavigate, NavigateFunction } from 'react-router-dom'

import cls from './styles/user-panel-lk.module.scss';
import { NAV_AUTH_PAGE, NAV_PROFILE, NAV_REG_PAGE } from '../../routers/config-nav';
import { icons } from '../../assets';
import React from 'react';
import Icon from '../../shared/UI/Icon/Icon';

interface IProps {
  handleOpenLKMenu: () => void;
  handleLogout: () => void;
  user: any;
  isOpenLKMenu: boolean;
}

const UserPanelLKMobile:React.FC<IProps> = ({ handleOpenLKMenu, handleLogout, user, isOpenLKMenu}) => {
    const navigate: NavigateFunction = useNavigate();
  
  return (
    <div className={cls['header-menu-lk-btn__container--mobile-wrapper']}>

      <div
        className={`${cls['header-menu-lk-btn__container-item--mobile']}`}
          onClick={() => navigate(NAV_PROFILE)}
        >
        <img
          className={cls['header-menu-lk-btn__avatar']}
          src={user.photo ?? icons.userAvatar}
          alt='User'
        />

        <div className={cls['header-menu-lk-btn__username']}>
          {!!user.id? user.username.length > 8 ? user.username.slice(0, 8) + '...' : user.username : 'Войти'}
          {/* {user?.username ?? 'Войти'} */}
        </div>
        
          <div className={`${cls['header-menu-lk-btn__dropdown-container']} ${isOpenLKMenu && cls['active']}`}>
              <Link to={NAV_PROFILE}>Настройки</Link>
              {/* <br /> */}
              {
                // user?.username 
                !!user.id
                ? <Link to={NAV_REG_PAGE} onClick={handleLogout}>Выйти</Link>
                : <Link to={NAV_AUTH_PAGE} >Войти</Link>            
              }
            </div>
      </div>
      <div className={cls['header-menu-lk-btn__theme']} onClick={() => navigate(NAV_PROFILE)}>
        <Icon src={icons.moon} width={10} height={10} />
      </div>
      <div className={cls['header-menu-lk-btn__setting']} onClick={() => navigate(NAV_PROFILE)}>
        <Icon src={icons.setting} width={10} height={10} />
      </div>
    </div>
  )
}

export default UserPanelLKMobile