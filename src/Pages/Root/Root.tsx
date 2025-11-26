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
		
	useEffect(() => {
		const navigating = () => {
			console.log({user})
			if (getLocaleStore('token') && (user.state_registration === 3 || user.state_registration === 4)){
				
				return navigate(NAV_QG_SELECT_PAGE); // defautl
			} else if (!getLocaleStore('token') && (user.state_registration === 5 || user.state_registration === 4)){
				return navigate(NAV_AUTH_PAGE);
			}
			return navigate(NAV_REG_PAGE);
		}	
		navigating()
	}, [navigate, user]);

	useEffect(()=>{
		if(!user.id){
			dispatch(GET_USERS)
		}
	},[dispatch, user]);

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