import { useStoreon } from 'storeon/react';
import Profile from './Profile'
import { CHANGE_FILTER_INVITE_PLAYERS, OPEN_SUB_INVITE_PLAYERS, SWITCH_BTN_FILTER_INVITE_PLAYERS } from '../../store/profile/profile';
import { useEffect, useState } from 'react';
import { delay } from '../../helpers/helper';
import { SET_HEADER_NAME_IS_SHOW } from '../../store/header/header';
import { HeaderNameEnum } from '../../store/header/header.d';

const ProfileContainer = () => {
  const { 
    dispatch, profile, dashboardProfile, 
    controllerShowFilterInvitePlayers, controllerFilterInvitePlayers,
    openSubInvitePlayers,
  } = useStoreon('controllerFilterInvitePlayers', 'openSubInvitePlayers', 
    'profile','controllerShowFilterInvitePlayers', 'dashboardProfile');
  const [showPassword, setShowPassword] = useState(false);
  const [ statusCopyRefLink, setStatusCopyRefLink ] = useState(false);
  useEffect(() => {
    // Fetch user data and set it in the store
      // dispatch(GET_DATA_PROFILE)
      dispatch(SET_HEADER_NAME_IS_SHOW, HeaderNameEnum.PROFILE);
  }, [dispatch])



  const handleChangeAvatar = () => {
    // Implement avatar changing logic here
    alert('change avatar')
  }

  const handleAddPhoneOwnInfo = () => {
    // Implement add phone logic here
    alert('how add phone????????????????')
  }
  
  const handleShowPassword = async () => {
    setShowPassword(true)
    await delay(1300);
    setShowPassword(false)
  }

  const handleCopyRefLink = (refLink) => {
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
      profile={profile}
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