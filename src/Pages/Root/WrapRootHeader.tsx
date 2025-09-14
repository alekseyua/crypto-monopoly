import { Outlet } from 'react-router-dom';
import Header from '../../Layout/Header/Header';
import HeaderProfileContainer from '../../models/HeaderProfile/HeaderProfileContainer';
import { useStoreon } from 'storeon/react';
import { HeaderName, HeaderNameEnum } from '../../store/header/header.d';

const WrapRootHeader = () => {
  const {
    headerName,
  }: {
    headerName: HeaderName;
  } = useStoreon("headerName");
  return (
    <>
      {headerName === HeaderNameEnum.MAIN_GAME ? (
        <Header />
      ) : headerName === HeaderNameEnum.QUICK_GAME ? (
        <Header />
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