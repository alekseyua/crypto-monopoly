import { Outlet } from 'react-router-dom';
import Header from '../../Layout/Header/Header';
import HeaderProfileContainer from '../../models/HeaderProfile/HeaderProfileContainer';
import { useStoreon } from 'storeon/react';
import { HeaderName, HeaderNameEnum } from '../../store/header/header.d';
import HeaderAuth from '../../Layout/Header/HeaderAuth';
import HeaderQuickGame from '../../Layout/Header/HeaderQuickGame/HeaderQuickGame';
import React from 'react';

const WrapRootHeader = () => {
  const {
    headerName,
  }: {
    headerName: HeaderName;
  } = useStoreon("headerName");
  const [isMobile] = React.useState(window.innerWidth <= 768);
  return (
    <>
      {headerName === HeaderNameEnum.MAIN_GAME ? (
        <Header />
      ) : headerName === HeaderNameEnum.QUICK_GAME ? (
        <HeaderQuickGame isMobile={isMobile}/>
      ) : headerName === HeaderNameEnum.AUTH ? (
        <HeaderAuth />
      ) : headerName === HeaderNameEnum.PROFILE ? (
        <HeaderProfileContainer />
      ) : (
        <div style={{ height: "60px" }}>error header</div>
      )}

      <Outlet />
    </>
  );
};

export default (WrapRootHeader);