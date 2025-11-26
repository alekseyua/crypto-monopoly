import { useStoreon } from 'storeon/react';
import { LoginUser } from './LoginUser';
import { DESC_AUTH_STEP, GET_AUTH, RESET_AUTH, SET_AUTH_TO_STORE } from '../../store/auth/auth';
import { delay } from '../../helpers/helper';
import { useEffect, useState } from 'react';
import withRouter from '../../HOC/withRouter';
import { NAV_REG_PAGE } from '../../routers/config-nav';
import { SET_ISRECOVERY_PASSWORD } from '../../store/auth/recovery';
import { NavigateFunction } from 'react-router-dom';

interface IProps {
	navigate: NavigateFunction;
}
const LoginUserContainer: React.FC<IProps> = ({ navigate }) => {
	const { dispatch, authData, authStep, errorAuth, isRecoveryPassword } = useStoreon('authData', 'authStep', 'errorAuth', 'isRecoveryPassword')
	const [showPassword, setShowPassword] = useState(false);
	const [error, setError] = useState('');
	// const [isRecoveryPassword, setIsRecoveryPassword] = useState(false)

	const handleRecoveryPassword = () => dispatch(SET_ISRECOVERY_PASSWORD, true);
	const handleLogin = () => dispatch(GET_AUTH, { redirect: navigate });
	const handleSetAuthData = (data: any) => dispatch(SET_AUTH_TO_STORE, data);

	const handleShowPassword = async () => {
		setShowPassword(true)
		await delay(1300);
		setShowPassword(false)
	}


	const handlerRedirectRegit = () => navigate(NAV_REG_PAGE)

	useEffect(() => {
		setError(errorAuth)
	}, [errorAuth])

	useEffect(() => {
		return () => {
			dispatch(RESET_AUTH)
		}
	}, [dispatch])

	const handleStepBack = () => dispatch(DESC_AUTH_STEP)
	return (
		<LoginUser
			error={error}
			authData={authData}
			authStep={authStep}
			handleLogin={handleLogin}
			showPassword={showPassword}
			handleStepBack={handleStepBack}
			isRecoveryPassword={isRecoveryPassword}
			handleSetAuthData={handleSetAuthData}
			handleShowPassword={handleShowPassword}
			handlerRedirectRegit={handlerRedirectRegit}
			handleRecoveryPassword={handleRecoveryPassword}
		/>
	);
};

export default withRouter(LoginUserContainer)