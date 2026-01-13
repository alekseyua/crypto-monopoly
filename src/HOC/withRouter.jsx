import { useNavigate, useLocation, useParams } from 'react-router-dom';
import { useEffect } from 'react';
import { goToUp } from '../helpers/helper';

// Создаем HOC withRouter
const withRouter = (Component) => {
  function ComponentWithRouterProps(props) {
    const navigate = useNavigate();
    const location = useLocation();
    const params = useParams();
    const hash = location.hash.replace('#', '');
    useEffect(()=>{
      goToUp()
      
    },[location.pathname])

    return (<Component
        {...props}
        navigate={navigate}
        location={location}
        params={params}
        hash={hash}
      />
    );
  }

  return ComponentWithRouterProps;
};

export default withRouter;