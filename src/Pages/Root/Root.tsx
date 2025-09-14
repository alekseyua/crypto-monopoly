import { Outlet, useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import withRouter from '../../HOC/withRouter';
import { NAV_ALL_ACHIEVEMENTS, NAV_QG_SELECT_PAGE, NAV_REG_PAGE } from '../../routers/config-nav';
import { getLocaleStore } from '../../helpers/helper';
import ModalContainer from '../../models/Modal/ModalContainer';
import { useStoreon } from 'storeon/react';
import { GET_USERS } from '../../store/users/users';

const Root = () => {
	const navigate = useNavigate();
	const {dispatch, profile } = useStoreon('profile');
		
	useEffect(() => {
		const navigating = () => {
			if(getLocaleStore('token')){
				return navigate(NAV_QG_SELECT_PAGE); // defautl
			}
			return navigate(NAV_REG_PAGE);
		}	
		navigating()
	}, [navigate]);

	useEffect(()=>{
		if(!profile.id){
			dispatch(GET_USERS)
		}
	},[])
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