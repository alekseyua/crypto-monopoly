import { Outlet, useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import withRouter from '../../HOC/withRouter';
import { NAV_ALL_ACHIEVEMENTS, NAV_AUTH_PAGE, NAV_QG_SELECT_PAGE, NAV_REG_PAGE } from '../../routers/config-nav';
import { getLocaleStore } from '../../helpers/helper';
import ModalContainer from '../../models/Modal/ModalContainer';
import { useStoreon } from 'storeon/react';
import { GET_USERS } from '../../store/users/users';

const Root = () => {
	const navigate = useNavigate();
	const {dispatch, user } = useStoreon('user');
		
	// Загружаем пользователя
	useEffect(() => {
		if (!user.id) {
			dispatch(GET_USERS);
		}
	}, [dispatch, user.id]);

	// Навигация по состоянию пользователя
	useEffect(() => {
		// если user ещё не загружен — ничего не делаем
		const token = getLocaleStore('token');
		if (!token){
			// if (!user.id) return;
			if ((user.state_registration === 5 || user.state_registration === 4 || user.state_registration === 3)) {
			   navigate(NAV_AUTH_PAGE);
			} else {
			   navigate(NAV_REG_PAGE);
		   }
		}
	}, [navigate, user]);


	useEffect(()=>{
		const token = getLocaleStore('token');
		if (token ) {
			console.log('redirect quick game')
			navigate(NAV_QG_SELECT_PAGE);
		}
	},[dispatch]);

	return (
		<>
		<span className='goto'></span>
		<div className={
			window.location.href.includes(NAV_ALL_ACHIEVEMENTS)
			? 'main-layout--children'
			: 'main-layout'}>
			<ModalContainer />		
			<Outlet />
		</div>
		</>
	);
};

export default withRouter(Root);