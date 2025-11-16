import { useStoreon } from 'storeon/react'
import withRouter from '../../../HOC/withRouter'
import React, { useEffect } from 'react';
import HeaderProfile from './HeaderProfile';
import { SWITCH_DASHBOARD_PROFILE } from '../../../store/profile/profile';

interface IProps {
    navigate: (path: string | number) => void;
    hash: string;
}

const HeaderProfileContainer: React.FC<IProps> = ({ navigate, hash }) => {
    const { dashboardProfile, user, dispatch } = useStoreon('dashboardProfile', 'user');

    // useEffect(() => {
    //     dispatch(GET_DASHBOARD_PROFILE)
    // }, [dispatch])

    const handleNavigateTo = (type: string | number) => {
      if (typeof type === "number") return navigate(type);
      console.log("type", type);
      dispatch(SWITCH_DASHBOARD_PROFILE, type);
    };

    useEffect(() => {
      if (hash) {
        dispatch(SWITCH_DASHBOARD_PROFILE, hash);
      }
    }, [hash, dispatch]);

    if(!Object.keys(dashboardProfile).length) return <>Loading...</>
    return (
        <HeaderProfile
            dashboardProfile={dashboardProfile}
            username={user?.username || ''}
            handleNavigateTo={handleNavigateTo}
        />
    )
}

export default withRouter(HeaderProfileContainer)