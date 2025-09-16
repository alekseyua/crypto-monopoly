import { useStoreon } from 'storeon/react';
import Profile from './Profile'
import { CHANGE_FILTER_INVITE_PLAYERS, OPEN_SUB_INVITE_PLAYERS, SWITCH_BTN_FILTER_INVITE_PLAYERS, UPDATE_PHOTO_AVATAR_PROFILE } from '../../store/profile/profile';
import { useEffect, useState } from 'react';
import { delay } from '../../helpers/helper';
import { SET_HEADER_NAME_IS_SHOW } from '../../store/header/header';
import { HeaderNameEnum } from '../../store/header/header.d';
import { GET_USERS } from '../../store/users/users';

const ProfileContainer = () => {
  const { 
    dispatch, user, dashboardProfile, 
    controllerShowFilterInvitePlayers, controllerFilterInvitePlayers,
    openSubInvitePlayers,
  } = useStoreon('controllerFilterInvitePlayers', 'openSubInvitePlayers', 
    'user','controllerShowFilterInvitePlayers', 'dashboardProfile');
  const [showPassword, setShowPassword] = useState(false);
  const [ statusCopyRefLink, setStatusCopyRefLink ] = useState(false);
  useEffect(() => {
    // Fetch user data and set it in the store
      if(!user || (user && Object.keys(user).length === 0)){
        dispatch(GET_USERS, undefined)
      }
      dispatch(SET_HEADER_NAME_IS_SHOW, HeaderNameEnum.PROFILE);
  }, [dispatch, user]);



  const handleChangeAvatar = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      // setImage(URL.createObjectURL(file));
      dispatch(UPDATE_PHOTO_AVATAR_PROFILE, {file});
    }
  };
  
  const handleAddPhoneOwnInfo = () => {
    // Implement add phone logic here
    alert('how add phone????????????????')
  }
  
  const handleShowPassword = async () => {
    setShowPassword(true)
    await delay(1300);
    setShowPassword(false)
  }

  const handleCopyRefLink = (refLink: string) => {
    try {
      navigator.clipboard.writeText(refLink)    
      setStatusCopyRefLink(true)
      setTimeout(() => setStatusCopyRefLink(false), 2000)  // Optional: Show success message for a short time
    } catch (error) {
      setStatusCopyRefLink(false)
    }
  }

  const handleOpenFilterShowInvitePlayers = () => dispatch(SWITCH_BTN_FILTER_INVITE_PLAYERS)
  const handleChangeFilterInvitePlayers = () => dispatch(CHANGE_FILTER_INVITE_PLAYERS)
  const handleOpenSubInvitePlayers = () => dispatch(OPEN_SUB_INVITE_PLAYERS)
    return (
    <Profile
      user={user}
      showPassword={showPassword}
      statusCopyRefLink={statusCopyRefLink}
      dashboardProfile={dashboardProfile}
      handleCopyRefLink={handleCopyRefLink}
      handleChangeAvatar={handleChangeAvatar}
      handleShowPassword={handleShowPassword}
      openSubInvitePlayers={openSubInvitePlayers}
      handleAddPhoneOwnInfo={handleAddPhoneOwnInfo}
      handleOpenSubInvitePlayers={handleOpenSubInvitePlayers}
      controllerFilterInvitePlayers={controllerFilterInvitePlayers}
      handleChangeFilterInvitePlayers={handleChangeFilterInvitePlayers}
      controllerShowFilterInvitePlayers={controllerShowFilterInvitePlayers}
      handleOpenFilterShowInvitePlayers={handleOpenFilterShowInvitePlayers}
    />
  )
}

export default ProfileContainer;