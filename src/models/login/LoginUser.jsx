import { Button, Input, Label, WrapperCard } from "../../shared/UI";

import cls from './login.module.scss';
import AuthPartners from "../../Component/AuthPartners/AuthPartners";
import Icon from "../../shared/UI/Icon/Icon";
import { closeEye, icons, openEye } from "../../assets";
import RecoveryPasswordContainer from "./RecoveryPassword/RecoveryPasswordContainer";
import ContainerAuthForm from "../../shared/UI/Auth/ContainerAuthForm";

export const LoginUser = ({
	error,
	authStep,
	// authData,
	email,
	password,
	handleLogin,
	showPassword,
	handleStepBack,
	handleSetAuthData,
	isRecoveryPassword,
	handleShowPassword,
	handlerRedirectRegit,
	handleRecoveryPassword,
}) => {
	return (
		<ContainerAuthForm>

			{
				isRecoveryPassword || authStep === 3
					? < RecoveryPasswordContainer />
					: <WrapperCard>
						<div className={cls.labels}>
							{authStep === 2 ? <Icon src={icons.rightArrow} rotate={180} onClick={handleStepBack}/> : <div></div>}
							<div className={cls.contLabel}>
								<Label p={11} text={'Авторизация'} type={'gradient'} />
								<Label p={5} text={`${authStep} из 2`} />
							</div>
						</div>
						<div className={cls.cardBody}>
							<Input
								className={cls.authInput}
								value={authStep === 2 ? password : email}
								onChange={(e) => handleSetAuthData(authStep === 2 ? { password: e.target.value } : { email: e.target.value })}
								label={error ? error : authStep === 2 ? 'Введите пароль' : 'Почта'}
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
								onEnter={() => (authStep === 1 ? (
									(email.length > 0)
									|| (error)
								)
									: (password.length > 0)) && handleLogin()}

							/>
							<div className={cls.authController}>
								{
									authStep === 2 &&
									<Button
										type='filled'
										onClick={handleRecoveryPassword}
											p={authStep === 2? 12 :23}

									>
										{'Восстановить пароль'}
									</Button>
								}
								<Button
									onClick={handleLogin}
									p={authStep === 2 ? 22 : 23}
									type='fill'
									fillColor={error && authStep === 2 ? 'var(--bg-color-error)' : '#726CED'}
									textColor='#fff'
									error={error}
									disabled={
										authStep === 1 ? !(
											(email.length > 0)
											|| (error)
										)
											: !(password.length > 0)
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
					p={23}
					onClick={handlerRedirectRegit}
				>Зарегистрироваться</Button>
			</WrapperCard>
		</ContainerAuthForm>
	);
};
