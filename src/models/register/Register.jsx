import { Button, WrapperCard } from '../../shared/UI';
import { Step1 } from './components/Step1/Step1';
import { useCallback } from 'react';
import { Step2 } from './components/step2/step2';
import { Step3 } from './components/step3/step3';
import { Step4 } from './components/step4/step4';
import { Step5 } from './components/step5/step5';
import { useStoreon } from 'storeon/react';
import AuthPartners from '../../Component/AuthPartners/AuthPartners';
import cls from './register.module.css';
import ContainerAuthForm from '../../shared/UI/Auth/ContainerAuthForm';

export const Register = ({
	error,
	regData,
	handleNextStep,
	handlePrevStep,
	handleSetRegData,
	handleRegistration,
	handlerRedirectAuth,
	handleGetDuplicateCode,
}) => {
	const { regStep,  } = useStoreon('regStep')

	const changeSteps = useCallback(() => {
		switch (regStep) {
			case 1:
				return <Step1 handleSetRegData={handleSetRegData} handleNextStep={handleNextStep} />;
			case 2:
				return <Step2 handleSetRegData={handleSetRegData} handlePrevStep={handlePrevStep} handleNextStep={handleNextStep} handleGetDuplicateCode={handleGetDuplicateCode }/>;
				case 3:
				return <Step4 handleSetRegData={handleSetRegData} handleNextStep={handleNextStep} handlePrevStep={handlePrevStep} />;
					case 4:
				return <Step3 handleSetRegData={handleSetRegData} handleNextStep={handleNextStep} handlePrevStep={handlePrevStep} />;
			case 5:
				return <Step5 handleSetRegData={handleSetRegData} handleRegistration={handleRegistration} handleNextStep={handleNextStep} handlePrevStep={handlePrevStep} />;			
			default : return <></>
		}
	}, [regStep, handleGetDuplicateCode, handleNextStep, handlePrevStep,handleRegistration,handleSetRegData]);

	return (
		<ContainerAuthForm>
			{changeSteps()}
			{
				regStep !==5 &&
				<div style={{
					display: 'grid',
						gridTemplateAreas: regStep === 1
										? `'partner'
										   'auth'` 
										: `'auth'
										   'partner'`,
					gridGap: '20px',
				}}>
					<div style={{gridArea: 'partner'}}>
						<AuthPartners regStep={regStep } />
					</div>
					
					<div style={{gridArea: 'auth'}}>
					<WrapperCard>
						<p className={cls.loginButtonLabel}>Уже зарегистрированы?</p>
						<Button 
						p={24} 
						onClick={handlerRedirectAuth}>Войти</Button>
					</WrapperCard>
					</div>

				</div>
}
		</ContainerAuthForm>
	);
};
