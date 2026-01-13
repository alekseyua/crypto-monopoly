import { useState } from 'react';
import UserPanelLK from './UserPanelLK';
import { useStoreon } from 'storeon/react';
import { LOGOUT } from '../../store/auth/registration';
import { IUser } from '../../store/users/user.d';
import UserPanelLKMobile from './UserPanelLKMobile';

interface IProps {
  user: IUser;
  isMobile?: boolean;
}

const UserPanelMainModeLK:React.FC<IProps> = ({
  user,
  isMobile,
}) => {
  const [ isOpenLKMenu, setIsOpenLKMenu ] = useState(false);
  const { dispatch } = useStoreon();

  const handleOpenLKMenu = () => {
    return setIsOpenLKMenu(state=>!state);
  }


  const handleLogout = () => {
    dispatch(LOGOUT);
  }
  if(isMobile) {
    return <UserPanelLKMobile
      user={user}
      isOpenLKMenu={isOpenLKMenu}
      handleLogout={handleLogout}
      handleOpenLKMenu={handleOpenLKMenu}
    />;
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