import cls from './step3.module.scss';
import { Button, Input, Label, WrapperCard } from '../../../../../shared/UI';
import { useStoreon } from 'storeon/react';
import Icon from '../../../../../shared/UI/Icon/Icon';
import { closeEye, openEye } from '../../../../../assets';

export const Step3 = ({
	handleNextStep,
	handleSetRegData,
	handleShowPassword,
	handleShowPasswordConfirm,
	showPassword,
	showPasswordConfirm,
}) => {
	const { recoveryStep, recoveryData, errorRecovery } = useStoreon('recoveryStep', 'recoveryData', 'errorRecovery')


	return (
		<WrapperCard>
			<div className={cls.labels}>
				<Label p={11} text={'Придумайте пароль'} type={'gradient'} />
				<Label p={11} text={`${recoveryStep} из 3`} />
			</div>
			<div className={cls.cardBody}>
				<div className={cls.inputs}>
					<Input
						value={recoveryData.new_password}
						onChange={(e) => handleSetRegData({ new_password: e.target.value })}
						label={
							'Пароль должен содержать минимум 8 символов на латинице или цифры, 1 и более символов заглавныеи минимум 1 знак: _-<>{}#№!?*'
						}
						className={cls.authInput}
						type={showPassword ? 'text' : 'password'}
						id={'password'}
						iconRight={<Icon
							className={`${cls.inputIcon} ${errorRecovery ? cls.error : ''}`}
								src={showPassword ? openEye : closeEye}
								onClick={handleShowPassword}
								width={20}
								height={20}
							/>
						}

					/>
					<Input
						value={recoveryData.repeatPassword}
						className={cls.authInput}
						onChange={(e) => handleSetRegData({ repeatPassword: e.target.value })}
						id={'repeatPassword'}
						error={errorRecovery ? errorRecovery : recoveryData.repeatPassword !== recoveryData.new_password}
						type={showPasswordConfirm ? 'text' : 'password'}
						label={errorRecovery? errorRecovery : ''}
						iconRight={<Icon
							src={showPasswordConfirm ? openEye : closeEye}
							onClick={handleShowPasswordConfirm}
							className={`${cls.inputIcon} ${errorRecovery ? cls.error : ''}`}
							width={20}
							height={20} />
						}
					/>
				</div>
				{errorRecovery && <Label text={errorRecovery} />}
				<Button
					onClick={() => handleNextStep()}
					p={23}
					type='filled'
					fillColor='#726CED'
					textColor='#fff'
					disabled={
						!(recoveryData?.new_password?.trim().length !== 0 && recoveryData?.repeatPassword?.trim().length !== 0 && recoveryData?.new_password?.trim() === recoveryData?.repeatPassword?.trim())
					}>
					Далее
				</Button>
			</div>
		</WrapperCard>
	);
};
