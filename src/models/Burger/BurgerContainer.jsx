import { useEffect, useState } from 'react'
import { NAV_ABOUT, NAV_ALL_ACHIEVEMENTS, NAV_MAIN_PAGE, NAV_QG_SELECT_PAGE } from '../../routers/config-nav';
import withRouter from '../../HOC/withRouter';
import Burger from './Burger';
import { CREATE_NEW_QG } from '../../store/quick-game/quick-game';
import { useStoreon } from 'storeon/react';

const BurgerContainer = ({location}) => {
  const [openBurger, setOpenBurger] = useState(false);
  const { dispatch, isQG } = useStoreon('isQG');
  const [listMenu, setListMenu ] = useState([
    {
      id: 0, 
      title: 'Основной режим',
      link: NAV_MAIN_PAGE,
      active: false
    },
    {
      id: 1, 
      title: 'Быстрая игра',
      link: NAV_QG_SELECT_PAGE,
      active: false
    },
    {
      id: 2, 
      title: 'Правила игры',
      link: NAV_ALL_ACHIEVEMENTS,
      active: false
    },
    {
      id: 3, 
      title: 'О проекте',
      link: NAV_ABOUT,
      active: false
    },
  ])

  const handleActiveItemMenu = (id) => {
    handleBurger()
    setListMenu(listMenu?.map(item =>{ 
      return item.id === id? {...item, active: true } : {...item, active: false }
    }));
  }

  useEffect(()=>{
    setListMenu( state => { 
        return state?.map( item => item.link === location.pathname? {...item, active: true} : item)
      }
    )
  },[location.pathname])

  const handleBurger = () =>setOpenBurger(state=>!state);

  const handleAddQG = () => {
    // add action
    dispatch(CREATE_NEW_QG)
  }

  return (
    <Burger
      listMenu={listMenu}a
      openBurger={openBurger}
      handleBurger={handleBurger}
      isQG={isQG}
      handleAddQG={handleAddQG}
      handleActiveItemMenu={handleActiveItemMenu}
    />

  )
}
export default withRouter(BurgerContainer)