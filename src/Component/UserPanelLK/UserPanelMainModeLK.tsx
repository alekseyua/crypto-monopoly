import { useEffect, useState } from 'react';
import UserPanelLK from './UserPanelLK';
import { useStoreon } from 'storeon/react';
import { LOGOUT } from '../../store/auth/registration';
import { GET_USERS } from '../../store/users/users';
import { IUser } from '../../store/users/user.d';

interface IProps {
  user: IUser;
}

const UserPanelMainModeLK:React.FC<IProps> = ({
  user,
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
      isOpenLKMenu={isOpenLKMenu}
      handleLogout={handleLogout}
      handleOpenLKMenu={handleOpenLKMenu}
    />
  )
}

export default UserPanelMainModeLK;