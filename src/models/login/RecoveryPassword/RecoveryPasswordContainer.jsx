import RecoveryPassword from './RecoveryPassword'
import { useStoreon } from 'storeon/react';
import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { delay } from '../../../helpers/helper';
import { DESC_RECOVERY_STEP, GET_DUBLICATE_CODE_RECOVERY, GET_RECOVERY_PASSWORD, RESET_RECOVERY, SET_RECOVERY_TO_STORE } from '../../../store/auth/recovery';

const RecoveryPasswordContainer = () => {
  const { dispatch, recoveryStep } = useStoreon("recoveryStep");
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [showPasswordConfirm, setShowPasswordConfirm] = useState(false);

  const handleSetRecData = (data) => dispatch(SET_RECOVERY_TO_STORE, data);
  const handleNextStep = (obj = {}) => dispatch(GET_RECOVERY_PASSWORD, { redirect: navigate, ...obj });
  const handlePrevStep = (obj = {}) => dispatch(DESC_RECOVERY_STEP, obj)


  const handleShowPassword = async () => {
    setShowPassword(true)
    await delay(1300);
    setShowPassword(false)
  }
  const handleShowPasswordConfirm = async () => {
    setShowPasswordConfirm(true)
    await delay(1300);
    setShowPasswordConfirm(false)
  }
  
  useEffect(()=>{
    return () => {
      dispatch(RESET_RECOVERY)
    }
  },[dispatch])
  
  const handleGetDublicateCode =() => {
    dispatch(GET_DUBLICATE_CODE_RECOVERY)
  }

  return (

    <RecoveryPassword
      showPassword={showPassword}
      recoveryStep={recoveryStep}
      handleNextStep={handleNextStep}
      handlePrevStep={handlePrevStep}
      handleSetRecData={handleSetRecData}
      handleShowPassword={handleShowPassword}
      showPasswordConfirm={showPasswordConfirm}
      handleGetDublicateCode={handleGetDublicateCode}
      handleShowPasswordConfirm={handleShowPasswordConfirm}
    />
  );
}

export default RecoveryPasswordContainer