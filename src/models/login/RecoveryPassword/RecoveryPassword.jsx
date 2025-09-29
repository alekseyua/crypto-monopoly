import { useCallback } from 'react'

import { Step1 } from './Components/step1/step1';
import { Step2 } from './Components/step2/step2';
import { Step3 } from './Components/step3/step3';
const RecoveryPassword = ({
  recoveryStep,
  showPassword,
  handleNextStep,
  handlePrevStep,
  handleSetRecData,
  handleShowPassword,
  showPasswordConfirm,
  handleGetDuplicateCode,
  handleShowPasswordConfirm,
}) => {
  const changeSteps = useCallback(() => {
    switch (recoveryStep) {
      case 1:
        return <Step1 handleSetRegData={handleSetRecData} handleNextStep={handleNextStep} />;
      case 2:
        return <Step2 
          handleNextStep={handleNextStep} 
          handlePrevStep={handlePrevStep} 
          handleSetRegData={handleSetRecData} 
          handleGetDuplicateCode={handleGetDuplicateCode}
          />;
      case 3:
        return <Step3 
          showPassword={showPassword}
          handleNextStep={handleNextStep}
          handleSetRegData={handleSetRecData} 
          handleShowPassword={handleShowPassword}
          showPasswordConfirm={showPasswordConfirm}
          handleShowPasswordConfirm={handleShowPasswordConfirm}
        />;
        default: return <></>
    }
  }, [handleGetDuplicateCode, recoveryStep, showPassword, showPasswordConfirm, handleNextStep, handlePrevStep, handleSetRecData, handleShowPassword,handleShowPasswordConfirm]);

  return <div>
    {changeSteps()}
  </div>
};

export default RecoveryPassword