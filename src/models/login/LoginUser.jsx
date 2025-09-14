import { Button, Input, Label, WrapperCard } from "../../shared/UI";

import cls from './login.module.css';
import AuthPartners from "../../Component/AuthPartners/AuthPartners";
import Icon from "../../shared/UI/Icon/Icon";
import { closeEye, openEye } from "../../assets";
import RecoveryPasswordContainer from "./RecoveryPassword/RecoveryPasswordContainer";

export const LoginUser = ({
	error,
	authStep,
	authData,
	handleLogin,
	showPassword,
	handleSetAuthData,
	isRecoveryPassword,
	handleShowPassword,
	handlerRedirectRegit,
	handleRecoveryPassword,
}) => {

	return (
		<div className={cls.registerCont}>

			{
				isRecoveryPassword
					? < RecoveryPasswordContainer />
					: <WrapperCard>
						<div className={cls.labels}>
							<Label text={'Авторизация'} type={'gradient'} />
							<Label text={`${authStep} из 2`} />
						</div>
						<div className={cls.cardBody}>
							<Input
								style={{
									padding: '24px 25px'
								}}
								value={authStep === 2 ? authData.password : authData.email}
								onChange={(e) => handleSetAuthData(authStep === 2 ? { password: e.target.value } : { email: e.target.value })}
								label={error ? error : authStep === 2 ? 'Введите пароль' : 'Почта или никнейм'}
								type={authStep === 2 ? showPassword ? 'text' : 'password' : 'text'}
								id={authStep === 2 ? 'password' : 'email'}
								error={error}
								iconRight={authStep === 2
									? < Icon
										className={`${cls.inputIcon}`}
										src={showPassword ? openEye : closeEye}
										onClick={handleShowPassword}
										width={20}
										height={20}
									/>
									: null}
							/>
							<div className={cls.authController}>
								{
									authStep === 2 &&
									<Button
										type='filled'
										onClick={handleRecoveryPassword}
									>
										{'Восстановить пароль'}
									</Button>
								}
								<Button
									onClick={handleLogin}
									p={24}
									type='fill'
									fillColor={error && authStep === 2 ? 'var(--bg-color-error)' : '#726CED'}
									textColor='#fff'
									error={error}
									disabled={
										authStep === 1 ? !(
											(authData.email.length > 0)
											|| (error)
										)
											: !(authData.password.length > 0)
									}
								>
									{'Войти'}
								</Button>
							</div>
						</div>
					</WrapperCard>
			}

			<AuthPartners isAuth />

			<WrapperCard>
				<p className={cls.loginButtonLabel}>Еще не зарегистрированы?</p>
				<Button 
					p={24}
					onClick={handlerRedirectRegit}
				>Зарегистрироваться</Button>
			</WrapperCard>
		</div>
	);
};
