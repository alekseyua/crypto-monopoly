import { useStoreon } from 'storeon/react';
import Profile from './Profile'
import { CHANGE_FILTER_INVITE_PLAYERS, OPEN_SUB_INVITE_PLAYERS, SWITCH_BTN_FILTER_INVITE_PLAYERS, UPDATE_PHONE_NUMBER_PROFILE, UPDATE_PHOTO_AVATAR_PROFILE } from '../../store/profile/profile';
import { useEffect, useState } from 'react';
import { delay } from '../../helpers/helper';
import { SET_HEADER_NAME_IS_SHOW } from '../../store/header/header';
import { HeaderName, HeaderNameEnum } from '../../store/header/header.d';
import { GET_USERS } from '../../store/users/users';
import { IUser, IUserPayload } from '../../store/users/user.d';
import { IFilterItem, IDashboardProfile, IPayloadUpdatePhotoAvatar, IUpdatePhoneNumber } from '../../store/profile/profile.d';

interface IStateStoreon {
  user: IUser;
  dashboardProfile: IDashboardProfile;
  openSubInvitePlayers: boolean;
  controllerFilterInvitePlayers: IFilterItem[];
  controllerShowFilterInvitePlayers: IFilterItem[];
}
interface EventStoreon {
  [SWITCH_BTN_FILTER_INVITE_PLAYERS]: void;
  [CHANGE_FILTER_INVITE_PLAYERS]: void;
  [OPEN_SUB_INVITE_PLAYERS]: void;
  [UPDATE_PHOTO_AVATAR_PROFILE]: IPayloadUpdatePhotoAvatar;
  [GET_USERS]: IUserPayload;
  [SET_HEADER_NAME_IS_SHOW]: HeaderName;
  [UPDATE_PHONE_NUMBER_PROFILE]: IUpdatePhoneNumber;
}
const ProfileContainer = () => {
  const {
    user,
    dispatch,
    dashboardProfile,
    openSubInvitePlayers,
    controllerFilterInvitePlayers,
    controllerShowFilterInvitePlayers,
  } = useStoreon<IStateStoreon, EventStoreon>(
    "controllerFilterInvitePlayers",
    "openSubInvitePlayers",
    "user",
    "controllerShowFilterInvitePlayers",
    "dashboardProfile"
  );
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [statusCopyRefLink, setStatusCopyRefLink] = useState<boolean>(false);
  const [ isInputNumber, setIsInputNumber ] = useState<boolean>(false);
  const [phoneNumber, setPhoneNumber] = useState<string>('')
  const [error, setError ] = useState({});

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
      dispatch(UPDATE_PHOTO_AVATAR_PROFILE, {photo: file});
    }
  };
  
  const handleAddPhoneOwnInfo = (value: string) => {
    // Implement add phone logic here
    console.log("%cphoneNumber = " + value, "color: red");

    if (value === "input_phone"){
      setIsInputNumber(true);
    }else if (value === "set_phone") {
      // setIsInputNumber(false);
      dispatch(UPDATE_PHONE_NUMBER_PROFILE, { phone_number: phoneNumber, callback: (data: any)=> {
        handleSetError(data);
      } });
    }
  }
  const handleSetError = (error: string) => {
    setError(error);
    setTimeout(() => setError(""), 1600);
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
        error={error}
        setPhoneNumber={setPhoneNumber}
        isInputNumber={isInputNumber}
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
    );
}

export default ProfileContainer;