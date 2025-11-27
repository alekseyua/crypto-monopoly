import { useStoreon } from 'storeon/react';
import withRouter from '../../HOC/withRouter';
import { Register } from './Register';
import { useEffect, useState } from 'react';
import { NAV_AUTH_PAGE } from '../../routers/config-nav';
import { SET_REF_CODE } from '../../store/auth/referal';
import { DESC_REG_STEP, GET_DUBLICATE_CODE_REG, GET_REG, INC_REG_STEP, RESET_REG, SET_REG_STEP, SET_REG_TO_STORE } from '../../store/auth/registration';
import { NavigateFunction } from 'react-router-dom';

interface IProps {
	navigate: NavigateFunction
}

const RegitUserContainer: React.FC<IProps> = ({ navigate }) => {
	const { dispatch, regData, errorReg, user } = useStoreon('regData', 'errorReg', 'user')
	const [error, setError] = useState('');

	const handleSetRegData = (data: any) => dispatch(SET_REG_TO_STORE, data);
	const handleRegistration = () => dispatch(GET_REG, { redirect: navigate });
	const handlerRedirectAuth = () => navigate(NAV_AUTH_PAGE)
	const handleNextStep = (obj = {}) => dispatch(INC_REG_STEP, obj)
	const handlePrevStep = (obj = {}) => dispatch(DESC_REG_STEP, obj)

	useEffect(() => {
		setError(errorReg)
	}, [errorReg])

	useEffect(()=>{	
		if (user.state_registration === 1){
			dispatch(SET_REG_STEP, 3)
		} else if (user.state_registration === 2) {
			dispatch(SET_REG_STEP, 4)
		}
	}, [user]);

	useEffect(() => {
		// localhost:3000/authorization/register?referal_code=nCulctaV
		const query = new URL(window.location.toString()).searchParams
		if (query.has('referal_code')) {
			dispatch(SET_REF_CODE, query.get('referal_code'));
        }
		return () => {
			dispatch(RESET_REG)
		}
	}, [dispatch])

	const handleGetDuplicateCode =() => {
		dispatch(GET_DUBLICATE_CODE_REG)
	}

	return (
		<Register
			error={error}
			regData={regData}
			handleNextStep={handleNextStep}
			handlePrevStep={handlePrevStep}
			handleSetRegData={handleSetRegData}
			handleRegistration={handleRegistration}
			handlerRedirectAuth={handlerRedirectAuth}
			handleGetDuplicateCode={handleGetDuplicateCode}
		/>
	);
};

export default withRouter(RegitUserContainer)