import { useState } from 'react';
import { Button, Input, Label, WrapperCard } from '../../../../shared/UI';
import { useStoreon } from 'storeon/react';
import Icon from '../../../../shared/UI/Icon/Icon';
import { delay } from '../../../../helpers/helper';
import { closeEye, icons, openEye } from '../../../../assets';
import cls from './step4.module.scss';

export const Step4 = ({
	handleNextStep,
	handlePrevStep,
	handleSetRegData,
}) => {
	const { regStep, regData, errorReg } = useStoreon('regStep', 'regData', 'errorReg');
	const [showPassword, setShowPassword] = useState(false);
	const [showPasswordConfirm, setShowPasswordConfirm] = useState(false);

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


	return (
		<WrapperCard>
			<div className={cls.labels}>
				{/* <Icon src={icons.rightArrow} rotate={180} onClick={handlePrevStep} /> */}
				<div></div>
				<div className={cls.contLabel}>
					<Label p={11} text={'Придумайте пароль'} type={'gradient'} />
					<Label p={5} text={`${regStep} из 5`} />
				</div>
			</div>
			<div className={cls.cardBody}>
				<div className={cls.inputs}>
					<Input
						value={regData.password}
						onChange={(e) => handleSetRegData({ password: e.target.value })}
						label={
							'Пароль должен содержать минимум 8 символов на латинице или цифры, 1 и более символов заглавныеи минимум 1 знак: _-<>{}#№!?*'
						}
						type={showPassword ? 'text' : 'password'}
						id={'password'}
						className={cls.authInput}
						iconRight={
							// regStep === 3
							// ? 
							< Icon
								className={`${cls.inputIcon} ${errorReg ? cls.error : ''}`}
								src={showPassword ? openEye : closeEye}
								onClick={handleShowPassword}
								width={20}
								height={20}
							/>
							// : null
						}

					/>
					<Input
						value={regData.repeatPassword}
						onChange={(e) => handleSetRegData({ repeatPassword: e.target.value })}
						id={'repeatPassword'}
						error={errorReg ? errorReg : regData.password !== regData.repeatPassword}
						type={showPasswordConfirm ? 'text' : 'password'}
						className={cls.authInput}
						// label={errorReg? errorReg : ''}
						iconRight={
							// regStep === 3 ? 
							<Icon
							src={showPasswordConfirm ? openEye : closeEye}
							onClick={handleShowPasswordConfirm}
							className={`${cls.inputIcon} ${errorReg ? cls.error : ''}`}
							width={20}
							height={20} /> 
							// : null
						}
						onEnter={() => (regData?.password?.trim()?.length !== 0 && regData?.repeatPassword?.trim()?.length !== 0 && regData?.password?.trim() === regData?.repeatPassword?.trim()) && handleNextStep()}

					/>
				</div>
				{errorReg && <Label text={errorReg} />}
				<Button
					onClick={() => handleNextStep()}
					p={23}
					type='fill'
					fillColor='#726CED'
					textColor='#fff'
					disabled={
						!(regData?.password?.trim()?.length !== 0 && regData?.repeatPassword?.trim()?.length !== 0 && regData?.password?.trim() === regData?.repeatPassword?.trim())
					}>
					Далее
				</Button>
			</div>
		</WrapperCard>
	);
};
