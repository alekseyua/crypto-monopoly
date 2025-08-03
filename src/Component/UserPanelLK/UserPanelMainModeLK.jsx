import { useEffect, useState } from 'react';
import UserPanelLK from './UserPanelLK';
import { useStoreon } from 'storeon/react';
import { LOGOUT } from '../../store/auth/registration';
import { GET_USERS } from '../../store/users/users';

const UserPanelMainModeLK = ({
  user,
  profile,
}) => {
  const [ isOpenLKMenu, setIsOpenLKMenu ] = useState(false);
  const { dispatch } = useStoreon();

  const handleOpenLKMenu = () => {
    return setIsOpenLKMenu(state=>!state);
  }


  const handleLogout = () => {
    dispatch(LOGOUT);
  }
  return (
    <UserPanelLK
      user={user}
      profile={profile}
      isOpenLKMenu={isOpenLKMenu}
      handleLogout={handleLogout}
      handleOpenLKMenu={handleOpenLKMenu}
    />
  )
}

export default UserPanelMainModeLK;