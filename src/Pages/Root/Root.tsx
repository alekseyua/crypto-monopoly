import { Outlet, useNavigate } from 'react-router-dom';
import { Header } from '../../layout';
import { useEffect } from 'react';
import withRouter from '../../HOC/withRouter';
import { NAV_MAIN_PAGE, NAV_QG_SELECT_PAGE, NAV_REG_PAGE } from '../../routers/config-nav';
import { getLocaleStore } from '../../helpers/helper';
import ModalContainer from '../../models/Modal/ModalContainer';
import { useStoreon } from 'storeon/react';
import { GET_USERS } from '../../store/users/users';

const Root = () => {
	const navigate = useNavigate();
	const {dispatch, profile } = useStoreon('profile');
		
	useEffect(() => {
		const navigating = () => {
			// navigate('/profile');
			// navigate('/authorization/login');
			if(getLocaleStore('token')){
				// return navigate(NAV_MAIN_PAGE); // defautl
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
		<div className='main-layout'>
			<Header />	
			<ModalContainer />		
			<Outlet />
		</div>
		</>
	);
};

export default withRouter(Root);