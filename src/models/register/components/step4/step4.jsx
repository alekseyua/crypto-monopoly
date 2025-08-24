import { useState } from 'react';
import { Button, Input, Label, WrapperCard } from '../../../../shared/UI';
import { useStoreon } from 'storeon/react';
import Icon from '../../../../shared/UI/Icon/Icon';
import { delay } from '../../../../helpers/helper';
import { closeEye, openEye } from '../../../../assets';
import cls from './step4.module.css';

export const Step4 = ({
	handleNextStep,
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
				<Label text={'Придумайте пароль'} type={'gradient'} />
				<Label text={`${regStep} из 6`} />
			</div>
			<div className={cls.cardBody}>
				<div className={cls.inputs}>
					<Input
						value={regData.password}
						onChange={(value) => handleSetRegData({ password: value })}
						label={
							'Пароль должен содержать минимум 8 символов на латинице или цифры, 1 и более символов заглавныеи минимум 1 знак: _-<>{}#№!?*'
						}
						type={showPassword ? 'text' : 'password'}
						id={'password'}
						style={{
									padding: '24px 25px'
								}}
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
						onChange={(value) => handleSetRegData({ repeatPassword: value })}
						id={'repeatPassword'}
						error={errorReg ? errorReg : regData.password !== regData.repeatPassword}
						type={showPasswordConfirm ? 'text' : 'password'}
style={{
									padding: '24px 25px'
								}}
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
					/>
				</div>
				{errorReg && <Label text={errorReg} />}
				<Button
					onClick={() => handleNextStep()}
					type='filled'
					fillColor='#726CED'
					textColor='#fff'
					disabled={
						!(regData.password.trim().length !== 0 && regData.repeatPassword.trim().length !== 0 && regData.password.trim() === regData.repeatPassword.trim())
					}>
					Далее
				</Button>
			</div>
		</WrapperCard>
	);
};
