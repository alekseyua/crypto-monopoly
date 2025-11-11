import { Outlet } from 'react-router-dom';
import Header from '../../Layout/Header/Header';
import HeaderProfileContainer from '../../models/HeaderProfile/HeaderProfileContainer';
import { useStoreon } from 'storeon/react';
import { HeaderNameEnum } from '../../store/header/header.d';
import HeaderAuth from '../../Layout/Header/HeaderAuth';
import HeaderQuickGame from '../../Layout/Header/HeaderQuickGame/HeaderQuickGame';
import React from 'react';
import HeaderRules from '../../Layout/Header/HeaderRules';
import RulesHeader from '../AllGameRules/components/rules-header/rules-header';

interface StateStore{
  headerName: string;
  user: any
}
 
const WrapRootHeader = () => {
  const {
    headerName,
    user,
  } = useStoreon<StateStore>("headerName", 'user');
  const [isMobile] = React.useState(window.innerWidth <= 768);
  console.log({user})
  return (
    <>
      {headerName === HeaderNameEnum.MAIN_GAME ? (
        <Header />
      ) : headerName === HeaderNameEnum.QUICK_GAME ? (
        <HeaderQuickGame isMobile={isMobile} />
      ) : headerName === HeaderNameEnum.AUTH ? (
        <HeaderAuth />
      ) : headerName === HeaderNameEnum.RULES ? (
        Object.keys(user).length ? <HeaderQuickGame isMobile={isMobile} /> : <HeaderRules />
      ) : headerName === HeaderNameEnum.PROFILE ? (
        <HeaderProfileContainer />
      ) : headerName === HeaderNameEnum.RULES_DETAIL ? (
        <RulesHeader />
      ) : (
        <div style={{ height: "60px" }}>error header</div>
      )}

{/* NAV_RULES_PAGE */}
      <Outlet />
    </>
  );
};

export default (WrapRootHeader);