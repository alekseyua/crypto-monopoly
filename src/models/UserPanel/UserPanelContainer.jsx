import { useStoreon } from 'storeon/react'
import withRouter from '../../HOC/withRouter'
import UserPanel from './UserPanel'
import { useEffect, useState } from 'react';
import { GET_USERS } from '../../store/users/users';

const UserPanelContainer = ({ navigate }) => {
    const { user, profile, isQG, dispatch } = useStoreon('user', 'isQG', 'profile');
    const [isDropDownMenuOpen, setIsDropDownMenuOpen ] = useState(false);
    const [userInfo, setUserInfo ] = useState( [
        {
            id: 'jackpot',
            name: 'Куш игры',
            price: 0,            
            link: '/'
        },
        {
            id: 'balance',
            name: 'Баланс',
            price: 0,
            link: '/'
        },
    ])

    const handleNavigateTo = (link) => {
        navigate(link)
    }

    useEffect(()=>{

        // напалняем меню инфой 
        if(user?.username){
            setUserInfo(state => {
                return state?.map(item=> 
                item.id === 'balance'
                ? {
                    ...item, 
                    price: user.balance
                } 
                : {...item} )

            })
        }
    },[user])

    const handleOpenDropDownMenu = () => {
        // Implement dropdown menu logic here
        setIsDropDownMenuOpen(state=>!state);
    }

    return (
        <UserPanel
            user={user}
            profile={profile}
            userInfo={userInfo}
            isQG={isQG}
            handleNavigateTo={handleNavigateTo}
            isDropDownMenuOpen={isDropDownMenuOpen}
            handleOpenDropDownMenu={handleOpenDropDownMenu}
        />
    )
}

export default withRouter(UserPanelContainer)