import { useStoreon } from 'storeon/react'
import withRouter from '../../HOC/withRouter'
import { useEffect } from 'react';
import ProfilePanel from './ProfilePanel';
import { GET_DASHBOARD_PROFILE, SWITCH_DASHBOARD_PROFILE } from '../../store/profile/profile';

const ProfilePanelContainer = ({ navigate }) => {
    const { dashboardProfile, dispatch } = useStoreon('dashboardProfile');

    useEffect(() => {
        dispatch(GET_DASHBOARD_PROFILE)
    }, [dispatch])

    const handleNavigateTo = (type) => {
        if(typeof type === 'number') return navigate(type);
        dispatch(SWITCH_DASHBOARD_PROFILE,type)
    }

    if(!Object.keys(dashboardProfile).length) return <>Loading...</>
    return (
        <ProfilePanel
            dashboardProfile={dashboardProfile}
            handleNavigateTo={handleNavigateTo}
        />
    )
}

export default withRouter(ProfilePanelContainer)